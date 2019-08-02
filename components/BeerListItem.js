import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class BeerListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };
    
    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View>
              <Text style={{color: textColor}}>{this.props.name}</Text>
            </View>
          </TouchableOpacity>
        );
    }
}
export default BeerListItem