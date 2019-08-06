import React from 'react';
import BeerEntry from './BeerEntry'
import { StyleSheet, Text, View, TextInput, Dimensions, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text : '',
            nameSearch : true,
            notesSearch : false,
            brewerySearch : false,
            barSearch : false,
            styleSearch : false,
            abv_0_3 : true,
            abv_3_4 : true,
            abv_4_5 : true,
            abv_5_6 : true,
            abv_6_7 : true,
            abv_7up : true,
            wants : false,
            favourites : false,
            tried : false,
            showBeerEntry :false,
            abv: [0, 15]
        }
        this.loadLocalData();
    }

    _onChangeAbv = (abv) => {
        this.setState({abv});
    }

    _onChangeAbvFinish = (abv) => {
        this.setState({abv}, () => this._applySearchAndFilter());
    }

    async saveLocalData(state) {
        try {
            await AsyncStorage.setItem("appState", JSON.stringify(state));
        } catch (error) {
            console.log('error saving data');
        }
    }

    async loadLocalData() {
        try {
            let data = await AsyncStorage.getItem("appState");
            let appState = JSON.parse(data);
            this.setState({...appState}, () => this._applySearchAndFilter());
          } catch (error) {
            console.log('error loading data', error);
          }
    }

    componentDidUpdate() {
        this.saveLocalData(this.state);
    }

    _onChangeSearch = (text) => {
        this.setState({text}, () => this._applySearchAndFilter());
    }

    _onChangeToggle = (toggle) => {
        this.setState(toggle, () => this._applySearchAndFilter())
    }

    _onChangeSearchField = (searchField) => {
        this.setState(searchField, () => this._applySearchAndFilter())
    }

    _applySearchAndFilter() {
        let filtered = this.props.beerData
        if (this.state.text && this.state.text !== "") {
            filtered = filtered.filter(beer => {
                if(this.state.nameSearch && beer.name.toLowerCase().includes(this.state.text.toLowerCase())) {
                    return true
                } else if (this.state.notesSearch && beer.notes.toLowerCase().includes(this.state.text.toLowerCase())) {
                    return true
                } else if (this.state.brewerySearch && beer.brewery.toLowerCase().includes(this.state.text.toLowerCase())) {
                    return true
                } else if (this.state.barSearch && beer.barName.toLowerCase().includes(this.state.text.toLowerCase())) {
                    return true
                } else if (this.state.styleSearch && beer.style && beer.style.toLowerCase().includes(this.state.text.toLowerCase())) {
                    return true
                }
                return false
            })
        }

        if (this.state.wants || this.state.favourites || this.state.tried) {
            filtered = filtered.filter(beer => {
                if(this.state.wants && this.props.wants.get(beer.id)){
                    return true
                } else if (this.state.favourites && this.props.favourites.get(beer.id)) {
                    return true
                } else if(this.state.tried && this.props.tried.get(beer.id)) {
                    return true
                }
                return false
            })
        }

        filtered = filtered.filter(beer => {
            return beer.abv && parseFloat(beer.abv) >= this.state.abv[0] && parseFloat(beer.abv) <= this.state.abv[1];
        });

        this.props.filterResult(filtered)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <TextInput 
                        style={styles.lineStart}
                        placeholder='Search...'
                        onChangeText={(text) => this._onChangeSearch(text)}
                        value={this.state.text}
                    />
                    <CheckBox
                        title="Name"
                        checked={this.state.nameSearch}
                        onPress={() => this._onChangeSearchField({nameSearch : !this.state.nameSearch})}
                        textStyle={{fontSize: 10}}
                        size={18}
                        containerStyle={{padding: 1}}
                    />
                    <CheckBox
                        title="Notes"
                        checked={this.state.notesSearch}
                        onPress={() => this._onChangeSearchField({notesSearch : !this.state.notesSearch})}
                        textStyle={{fontSize: 10}}
                        size={18}
                        containerStyle={{padding: 1}}
                    />
                    <CheckBox
                        title="Brewery"
                        checked={this.state.brewerySearch}
                        onPress={() => this._onChangeSearchField({brewerySearch : !this.state.brewerySearch})}
                        textStyle={{fontSize: 10}}
                        size={18}
                        containerStyle={{padding: 1}}
                    />
                    <CheckBox
                        title="Bar"
                        checked={this.state.barSearch}
                        onPress={() => this._onChangeSearchField({barSearch : !this.state.barSearch})}
                        textStyle={{fontSize: 10}}
                        size={18}
                        containerStyle={{padding: 1}}
                    />
                    <CheckBox
                        title="Style"
                        checked={this.state.styleSearch}
                        onPress={() => this._onChangeSearchField({styleSearch : !this.state.styleSearch})}
                        textStyle={{fontSize: 10}}
                        size={18}
                        containerStyle={{padding: 1}}
                    />
                </View>
                <View style={styles.row}>
                    <MultiSlider
                        values={[this.state.abv[0], this.state.abv[1]]}
                        sliderLength={300}
                        onValuesChange={this._onChangeAbv}
                        onValuesChangeFinish={this._onChangeAbvFinish}
                        touchDimensions={{height: 1000, width: 1000,borderRadius: 1000, slipDisplacement: 0}}
                        optionsArray={[0, 3, 4, 5, 6, 7, 8, 10, 12, 15, 18]}
                        step={1}
                    />
                    <Text style={styles.text}>{`ABV ${this.state.abv[0]} - ${this.state.abv[1]}`}</Text>
                </View>
                <View style={styles.row}>
                    <CheckBox 
                        title="Wants"
                        style={styles.lineStart}
                        checked={this.state.wants}
                        onPress={() => this._onChangeToggle({wants : !this.state.wants})}
                        textStyle={{fontSize: 10}}
                        size={18}
                        containerStyle={{padding: 1}}
                    />
                    <CheckBox 
                        title="Favourites"
                        checked={this.state.favourites}
                        onPress={() => this._onChangeToggle({favourites : !this.state.favourites})}
                        textStyle={{fontSize: 10}}
                        size={18}
                        containerStyle={{padding: 1}}
                    />
                    <CheckBox 
                        title="Tried"
                        checked={this.state.tried}
                        onPress={() => this._onChangeToggle({tried : !this.state.tried})}
                        textStyle={{fontSize: 10}}
                        size={18}
                        containerStyle={{padding: 1}}
                    />
                    {this.state.showBeerEntry 
                        ? <Text style={styles.addRemove} onPress={() => this.setState({showBeerEntry : !this.state.showBeerEntry})}>{'\u2796'}Close</Text> 
                        : <Text style={styles.addRemove} onPress={() => this.setState({showBeerEntry : !this.state.showBeerEntry})}>{'\u2795'}Add Beer</Text>}
                    <Text style={styles.beerCount}>{this.props.beerCount} beers</Text>
                </View>
                {this.state.showBeerEntry && (
                    <View style={styles.row}>
                        <BeerEntry onAddBeer={this.props.onAddBeer}/>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white'
    },
    row : {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    beerCount : {
        marginTop: 5,
        marginLeft:'auto', 
        marginRight : 5
    },
    lineStart : {
        marginLeft : 5,
        width: 100
    },
    label : {
        marginTop: 5
    },
    addRemove : {
        marginTop: 5,
        marginLeft : 15
    }
})

export default Header