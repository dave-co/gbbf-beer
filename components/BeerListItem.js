import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, CheckBox  } from 'react-native';

class BeerListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    _parseStyle = (beerStyle) => {
        if (beerStyle) {
            if (beerStyle === 'Bitter or Best Bitter') {
                return 'Bitter'
            } else if (beerStyle === 'Strong Ale or Barley Wine') {
                return 'Strong Ale'
            }
        }
        return beerStyle
    }

    _onWantChanged = () => {
        this.props.onWantChanged(this.props.id)
    }
    
    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        const beerStyle = this._parseStyle(this.props.style)
        const colourStyle = 'colour_' + this.props.colour
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View style={styles.container}>
              <Text style={{marginLeft : 5, color: textColor}}>{this.props.name}</Text>
              <View style={styles.infoRow}>
                  <Text style={styles.infoWide}>{this.props.brewery}</Text>
                  <Text style={styles.info}>{beerStyle}</Text>
                  <View style={[styles.colourBase, styles[colourStyle]]} />
                  <Text style={styles.info}>{this.props.bar}</Text>
              </View>
              {this.props.selected && (
                <View style={styles.notes}>
                    <Text>{this.props.notes}</Text>
                </View>
              )}
              {this.props.selected && (
                <View style={styles.controls}>
                    <CheckBox  
                        value={this.props.want}
                        onValueChange={this._onWantChanged}
                    /><Text style={styles.label}>Want</Text>
                </View>
              )}
            </View> 
          </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    colourBase : {
        flex : 1,
        height : 15,
        marginRight : 10
    },
    colour_1 : {
        backgroundColor : '#FBF59D'
    },
    colour_2 : {
        backgroundColor : '#FCB040'
    },
    colour_3 : {
        backgroundColor : '#A95B26'
    },
    colour_4 : {
        backgroundColor : '#8A2B1A'
    },
    colour_5 : {
        backgroundColor : '#50120E'
    },
    colour_6 : {
        backgroundColor : '#000000'
    },
    container : {
        width: Dimensions.get('window').width
    },
    info : {
        flex : 1
    },
    infoWide : {
        flex : 2
    },
    notes : {
        marginLeft : 10
    },
    controls : {
        flexDirection : 'row',
        marginLeft : 10
    },
    label : {
        marginTop: 5
    },
    infoRow : {
        flexDirection : 'row',
        marginLeft : 10
    }
})

export default BeerListItem