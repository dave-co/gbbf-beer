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
            <View style={styles.container}>
              <Text style={{marginLeft : 5, color: textColor}}>{this.props.name}</Text>
              <View style={styles.infoRow}>
                  <Text style={styles.info}>{this.props.brewery}</Text>
                  <Text style={styles.info}>{this.props.style}</Text>
                  <Text style={styles.info}>{this.props.bar}</Text>
              </View>
              {this.props.selected && (<View style={styles.notes}><Text>{this.props.notes}</Text></View>)}
            </View> 
          </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        width: Dimensions.get('window').width
    },
    info : {
        flex : 1
    },
    notes : {
        marginLeft : 10
    },
    infoRow : {
        flexDirection : 'row',
        marginLeft : 10
    }
})

export default BeerListItem