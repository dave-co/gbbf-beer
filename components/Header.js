import React from 'react';
import BeerEntry from './BeerEntry'
import { StyleSheet, Text, View, TextInput, Dimensions, CheckBox, AsyncStorage } from 'react-native';
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
            abv: [0, 100]
        }
        this.loadLocalData();
    }

    luckyDip = () => {
        let luckyBeer;
        const maxTries = 100;
        let i = 0;
        while (!luckyBeer && i < maxTries) {
            i++;
            const beer = this.props.beerData[this.getRandomBeerIndex()];
            if (!beer.tried && !beer.favourites) {
                luckyBeer = beer;
            }
        }
        this.props.selectItem(luckyBeer.id);
        this.props.filterResult([luckyBeer]);
    }

    getRandomBeerIndex = () => {
        return Math.floor(Math.random() * this.props.beerData.length);
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
                        placeholder='Search...'
                        onChangeText={(text) => this._onChangeSearch(text)}
                        value={this.state.text}
                    />
                    <CheckBox
                        value={this.state.nameSearch}
                        onValueChange={() => this._onChangeSearchField({nameSearch : !this.state.nameSearch})}
                    />
                    <Text style={styles.label}>Name</Text>
                    <CheckBox
                        value={this.state.notesSearch}
                        onValueChange={() => this._onChangeSearchField({notesSearch : !this.state.notesSearch})}
                    />
                    <Text style={styles.label}>Notes</Text>
                    <CheckBox
                        value={this.state.brewerySearch}
                        onValueChange={() => this._onChangeSearchField({brewerySearch : !this.state.brewerySearch})}
                    />
                    <Text style={styles.label}>Brewery</Text>
                    <CheckBox
                        value={this.state.barSearch}
                        onValueChange={() => this._onChangeSearchField({barSearch : !this.state.barSearch})}
                    />
                    <Text style={styles.label}>Bar</Text>
                    <CheckBox
                        value={this.state.styleSearch}
                        onValueChange={() => this._onChangeSearchField({styleSearch : !this.state.styleSearch})}
                    />
                    <Text style={styles.label}>Style</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.abv}>
                        <MultiSlider
                            values={[this.state.abv[0], this.state.abv[1]]}
                            sliderLength={250}
                            onValuesChange={this._onChangeAbv}
                            onValuesChangeFinish={this._onChangeAbvFinish}
                            touchDimensions={{height: 5000, width: 5000, borderRadius: 5000, slipDisplacement: 0}}
                            optionsArray={[0, 3, 4, 5, 6, 7, 8, 10, 12, 15, 100]}
                            step={1}
                        />
                    </View>
                    <Text style={styles.abvLabel}>{`ABV ${this.state.abv[0]} - ${this.state.abv[1] == 100 ? 'Antifreeze' : this.state.abv[1]}`}</Text>
                </View>
                <View style={styles.row}>
                    <CheckBox 
                        value={this.state.wants}
                        onValueChange={() => this._onChangeToggle({wants : !this.state.wants})}
                    />
                    <Text style={styles.label}>Wants</Text>
                    <CheckBox 
                        value={this.state.favourites}
                        onValueChange={() => this._onChangeToggle({favourites : !this.state.favourites})}
                    />
                    <Text style={styles.label}>Favourites</Text>
                    <CheckBox 
                        value={this.state.tried}
                        onValueChange={() => this._onChangeToggle({tried : !this.state.tried})}
                    />
                    <Text style={styles.label}>Tried</Text>
                    <Text style={styles.luckyDip} onPress={() => this.luckyDip()}>{'\u2728'}Lucky Dip</Text>
                    <Text style={styles.beerCount} onPress={() => this.props.onExport()}>{this.props.beerCount} beers</Text>
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
        marginLeft: 5
    },
    beerCount : {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 5
    },
    label : {
        marginTop: 5
    },
    abv : {
        marginTop: 5,
        marginLeft : 15,
        marginRight : 10
    },
    abvLabel: {
        marginLeft: 5,
        marginTop: 18
    },
    luckyDip: {
        marginTop: 5,
        marginLeft: 5
    }
})

export default Header