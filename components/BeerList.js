import React from 'react';
import BeerListItem from './BeerListItem'
import Header from './Header'
import { StyleSheet, Text, View, FlatList } from 'react-native';

class BeerList extends React.PureComponent {
    state = {selected: (new Map())};
    
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
    
      _renderItem = ({item}) => (
        <BeerListItem
          id={item.id}
          onPressItem={this._onPressItem}
          selected={!!this.state.selected.get(item.id)}
          name={item.name}
        />
      );

      _renderHeader = () => {
          return <Header />
      }
    
      render() {
        return (
          <FlatList
            data={this.props.data}
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