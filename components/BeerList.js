import React from 'react';
import BeerListItem from './BeerListItem'
import { BEER_DATA } from '../beer-data'
import Header from './Header'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { fetchWants, saveWants, fetchFavourites, saveFavourites } from '../storage/Storage'

class BeerList extends React.PureComponent {
    state = {
        selected: (new Map()),
        wants: (new Map()),
        favourites : (new Map()),
        beerData : BEER_DATA
    };
    async componentDidMount(){
        let wants = await fetchWants()
        this.setState({wants})
        let favourites = await fetchFavourites()
        this.setState({favourites})
    }
    
      _keyExtractor = (item, index) => item.id;
    
      _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
          // copy the map rather than modifying state.
          const selected = new Map(state.selected);
          selected.set(id, !selected.get(id)); // toggle
          return {selected};
        });
      };

    _onWantChanged = async (id) => {
        this.setState((state) => {
            const wants = new Map(state.wants);
            wants.set(id, !wants.get(id)); // toggle
            return {wants};
        },
        () => {
            saveWants(new Map(this.state.wants))
        });
    }

      _onFavouriteChanged = async (id) => {
        this.setState((state) => {
            const favourites = new Map(state.favourites);
            favourites.set(id, !favourites.get(id)); // toggle
            return {favourites};
          },
          () => {
            saveFavourites(new Map(this.state.favourites))
            if (this.state.favourites.get(id) && this.state.wants.get(id)) {
                // cant be a want and a fav at the same time
                this._onWantChanged(id)
            }
          });
      }
    
      _renderItem = ({item}) => (
        <BeerListItem
          id={item.id}
          onPressItem={this._onPressItem}
          selected={!!this.state.selected.get(item.id)}
          onWantChanged={this._onWantChanged}
          want={!!this.state.wants.get(item.id)}
          onFavouriteChanged={this._onFavouriteChanged}
          favourite={!!this.state.favourites.get(item.id)}
          name={item.name}
          bar={item.barCode}
          brewery={item.brewery}
          style={item.style}
          notes={item.notes}
          colour={item.colour}
        />
      );

      _renderHeader = () => {
          return <Header
            filterResult={this._filterResult}
            beerData={BEER_DATA}
            wants={this.state.wants}
            favourites={this.state.favourites}
            beerCount={this.state.beerData.length}
          />
      }

      _filterResult = (filteredBeerData) => {
          this.setState({beerData : filteredBeerData})
      }

      render() {
        return (
          <FlatList
            data={this.state.beerData}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListHeaderComponent={this._renderHeader}
            stickyHeaderIndices={[0]}
          />
        );
      }
}
export default BeerList;