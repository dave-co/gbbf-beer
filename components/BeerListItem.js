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

    _onFavouriteChanged = () => {
        this.props.onFavouriteChanged(this.props.id)
    }

    _onTriedChanged = () => {
        console.log('about to change from' + this.props.tried)
        if(this.props.tried){
            // tried is being deselected, so remove the rating
            this._onRatingChanged(0)
        }
        this.props.onTriedChanged(this.props.id)
    }

    _onRatingChanged = (rating) => {
        console.log(rating)
        this.props.onRatingChanged(this.props.id, rating)
    }
    
    render() {
        const textColor = this.props.selected ? 'red' : 'black';
        const beerStyle = this._parseStyle(this.props.style)
        const colourStyle = 'colour_' + this.props.colour
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View style={styles.container}>
              <View style={styles.titleRow}>
                  <Text style={{flex : 4, color: textColor}}>{this.props.name}</Text>
                  {this.props.want && (
                      <Text style={[styles.flags, styles.want]}>Want</Text>
                  )}
                  {this.props.favourite && (
                      <Text style={[styles.flags, styles.favourite]}>Favourite</Text>
                  )}
                  {(!this.props.favourite && this.props.tried) && (
                      <Text style={[styles.flags, styles.tried]}>Tried</Text>
                  )}
              </View>
              {this.props.category === "International" &&(
                  <View style={styles.infoRow}>
                      <Text style={styles.infoWide}>{this.props.brewery}</Text>
                      <Text style={styles.info}>{this.props.dispenseMethod}</Text>
                      <Text style={styles.info}>{this.props.country}</Text>
                      <Text style={styles.info}>{this.props.bar}</Text>
                  </View>
              )}
              {this.props.category === "Real Ale" && (
                  <View style={styles.infoRow}>
                      <Text style={styles.infoWide}>{this.props.brewery}</Text>
                      <Text style={styles.info}>{beerStyle}</Text>
                      <View style={[styles.colourBase, styles[colourStyle]]} />
                      <Text style={styles.info}>{this.props.bar}</Text>
                  </View>
              )}
              {this.props.selected && (
                <View style={styles.notes}>
                    <Text>{this.props.notes}</Text>
                </View>
              )}
              {this.props.selected && (
                <View style={styles.controls}>
                    <CheckBox  
                        disabled={this.props.favourite || this.props.tried}
                        value={this.props.want}
                        onValueChange={this._onWantChanged}
                    />
                    <Text style={styles.label}>Want</Text>
                    <CheckBox  
                        value={this.props.favourite}
                        onValueChange={this._onFavouriteChanged}
                    />
                    <Text style={styles.label}>Favourite</Text>
                    <CheckBox  
                        value={this.props.tried}
                        onValueChange={this._onTriedChanged}
                    />
                    <Text style={styles.label}>Tried</Text>
                    {this.props.tried && (
                        <View style={styles.ratings}>
                            <Text onPress={() => this._onRatingChanged(1)} style={[styles.label, this.props.rating >= 1 ? styles.ratingSelected : styles.ratingNotSelected]}>{'\u2B50'}</Text>
                            <Text onPress={() => this._onRatingChanged(2)} style={[styles.label, this.props.rating >= 2 ? styles.ratingSelected : styles.ratingNotSelected]}>{'\u2B50'}</Text>
                            <Text onPress={() => this._onRatingChanged(3)} style={[styles.label, this.props.rating >= 3 ? styles.ratingSelected : styles.ratingNotSelected]}>{'\u2B50'}</Text>
                            <Text onPress={() => this._onRatingChanged(4)} style={[styles.label, this.props.rating >= 4 ? styles.ratingSelected : styles.ratingNotSelected]}>{'\u2B50'}</Text>
                            <Text onPress={() => this._onRatingChanged(5)} style={[styles.label, this.props.rating >= 5 ? styles.ratingSelected : styles.ratingNotSelected]}>{'\u2B50'}</Text>
                        </View>
                    )}
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
        width: Dimensions.get('window').width,
        borderWidth : 0.5,
        borderRadius : 5,
        borderColor : 'lightgray'
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
    flags : {
        flex : 1,
        textAlign: 'center',
        borderWidth : 1,
        borderRadius : 5
    },
    want : {
        borderColor : 'lightseagreen'
    },
    favourite : {
        borderColor : 'maroon'
    },
    tried : {
        borderColor : 'darkorchid'
    },
    label : {
        marginTop: 5
    },
    titleRow : {
        flexDirection : 'row',
        marginLeft : 5
    },
    infoRow : {
        flexDirection : 'row',
        marginLeft : 10
    },
    ratings : {
        flexDirection : 'row'
    },
    ratingSelected : {
        opacity : 1
    },
    ratingNotSelected : {
        opacity : 0.3
    }
})

export default BeerListItem