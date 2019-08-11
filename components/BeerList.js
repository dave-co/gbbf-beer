import React from 'react';
import BeerListItem from './BeerListItem'
import { BEER_DATA } from '../beer-data'
import Header from './Header'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { fetchWants, saveWants, fetchFavourites, saveFavourites, fetchRatings, saveRatings, fetchTried, saveTried, fetchExtraBeers, saveExtraBeers } from '../storage/Storage'

class BeerList extends React.PureComponent {
    state = {
        selected: (new Map()),
        wants: (new Map()),
        favourites : (new Map()),
        tried : (new Map()),
        ratings : (new Map()),
        extraBeers : (new Map()),
        beerData : BEER_DATA
    };
    async componentDidMount(){
        let wants = await fetchWants()
        this.setState({wants})
        let favourites = await fetchFavourites()
        this.setState({favourites})
        let tried = await fetchTried()
        this.setState({tried})
        let ratings = await fetchRatings()
        this.setState({ratings})
        let extraBeers = await fetchExtraBeers()
        this.setState({extraBeers})
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

    _onTriedChanged = async (id) => {
        this.setState((state) => {
            const tried = new Map(state.tried);
            tried.set(id, !tried.get(id)); // toggle
            return {tried};
        },
        () => {
            saveTried(new Map(this.state.tried))
            if(this.state.tried.get(id) && this.state.wants.get(id)){
                // can't be want and tried at the same time
                this._onWantChanged(id)
            }
        });
    }

    _onRatingChanged = async (id, rating) => {
        this.setState((state) => {
            const ratings = new Map(state.ratings)
            ratings.set(id, rating)
            return {ratings};
        },
        () => {
            saveRatings(new Map(this.state.ratings))
        })
    }

    _onAddBeer = (beer) => {
        var maxId = 5000
        for (const [key, value] of this.state.extraBeers.entries()) {
            if (value && value.id && parseInt(value.id, 10) > maxId) {
                maxId = parseInt(value.id, 10)
            }
        }
        maxId += 1
        beer.id = maxId.toString()
        this.setState((state) => {
            const extraBeers = new Map(state.extraBeers)
            extraBeers.set(beer.id, beer)
            return {extraBeers};
        },
        () => {
            saveExtraBeers(new Map(this.state.extraBeers))
        })
    }

    _onDeleteManualEntry = (id) => {
        if(this.state.extraBeers.has(id)){
            this.setState((state) => {
                const extraBeers = new Map(state.extraBeers)
                extraBeers.delete(id)
                return {extraBeers};
            },
            () => {
                saveExtraBeers(new Map(this.state.extraBeers))
            })
        }
    }

    _onExport = () => {
        let exportData = {}
        let exportWants = []
        let exportTrieds = []
        for( let triedId of this.state.tried ) {
            let tried = {}
            tried.id = triedId[0]
            if(triedId[1] == true){
                tried = this._hydrateBeer(tried)
                tried.favourite = this._isFavourite(tried.id)
                tried.rating = this._getRating(tried.id)
                exportTrieds.push(tried) 
            }
        }
        exportData.trieds = exportTrieds
        for( let wantId of this.state.wants ){
            let want = {}
            want.id = wantId[0]
            if(wantId[1] == true){
                want = this._hydrateBeer(want)
                exportWants.push(want)
            }
        }
        exportData.wants = exportWants
        console.log(exportData)
        // console.log has max line output length of 4100 chars including timestamp, log level and tags
        // so we need to split it over multiple lines
        var str = JSON.stringify(exportData)
        let i = 0
        do {
            let sub = str.substr(i, 4000)
            console.log(sub)
            i += 4000
        } while (i < str.length)
    }

    _isFavourite = (id) => {
        for( let entry of this.state.favourites ) {
            if ( entry[0] == id && entry[1] == true) return true
        }
        return false
    }

    _getRating = (id) => {
        for( let entry of this.state.ratings ){
            if( entry[0] == id ) return entry[1]
        }
        return undefined
    }

    _hydrateBeer = (toHydrate) => {
        let beer = BEER_DATA.filter(b => {return toHydrate.id === b.id})
        if(beer.length > 0){
            toHydrate.name = beer[0].name
            toHydrate.brewery = beer[0].brewery
            toHydrate.notes = beer[0].notes
            toHydrate.abv = beer[0].abv
            toHydrate.colour = beer[0].colour
            toHydrate.style = beer[0].style
            toHydrate.category = beer[0].category
            toHydrate.barCode = beer[0].barCode
            toHydrate.barName = beer[0].barName
            toHydrate.dispenseMethod = beer[0].dispenseMethod
            toHydrate.country = beer[0].country
        }
        return toHydrate
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
          onTriedChanged={this._onTriedChanged}
          tried={this.state.tried.get(item.id)}
          onRatingChanged={this._onRatingChanged}
          rating={this.state.ratings.get(item.id)}
          name={item.name}
          bar={item.barCode}
          brewery={item.brewery}
          style={item.style}
          notes={item.notes}
          colour={item.colour}
          category={item.category}
          dispenseMethod={item.dispenseMethod}
          country={item.country}
          isManualEntry={item.isManualEntry}
          onDeleteManualEntry={this._onDeleteManualEntry}
        />
      );

      _renderHeader = () => {
          return <Header
            filterResult={this._filterResult}
            selectItem={this._onPressItem}
            beerData={BEER_DATA.concat(Array.from( this.state.extraBeers.values() ))}
            wants={this.state.wants}
            favourites={this.state.favourites}
            tried={this.state.tried}
            beerCount={this.state.beerData.length}
            onAddBeer={this._onAddBeer}
            onExport={this._onExport}
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