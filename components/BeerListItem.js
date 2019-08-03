import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions  } from 'react-native';

class BeerListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };
    
    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View style={styles.row}>
              <Text style={{color: textColor}}>{this.props.name}</Text>
            </View>
          </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    row : {
        width: Dimensions.get('window').width
    }
})

export default BeerListItem