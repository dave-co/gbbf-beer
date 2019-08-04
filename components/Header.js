import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, CheckBox, AsyncStorage } from 'react-native';

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
            favourites : false
        }
        this.loadLocalData();
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

    _applySearchAndFilter(){
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
        if (!this.state.abv_0_3) {
            filtered = filtered.filter(beer => { return !(beer.abv && parseFloat(beer.abv) < 3)})
        }
        if (!this.state.abv_3_4) {
            filtered = filtered.filter(beer => { return !(beer.abv && parseFloat(beer.abv) >= 3 && parseFloat(beer.abv) < 4)})
        }
        if (!this.state.abv_4_5) {
            filtered = filtered.filter(beer => { return !(beer.abv && parseFloat(beer.abv) >= 4 && parseFloat(beer.abv) < 5)})
        }
        if (!this.state.abv_5_6) {
            filtered = filtered.filter(beer => { return !(beer.abv && parseFloat(beer.abv) >= 5 && parseFloat(beer.abv) < 6)})
        }
        if (!this.state.abv_6_7) {
            filtered = filtered.filter(beer => { return !(beer.abv && parseFloat(beer.abv) >= 6 && parseFloat(beer.abv) < 7)})
        }
        if (!this.state.abv_7up) {
            filtered = filtered.filter(beer => { return !(beer.abv && parseFloat(beer.abv) >= 7)})
        }

        if (this.state.wants || this.state.favourites) {
            filtered = filtered.filter(beer => {
                if(this.state.wants && this.props.wants.get(beer.id)){
                    return true
                } else if (this.state.favourites && this.props.favourites.get(beer.id)) {
                    return true
                }
                return false
            })
        }

        this.props.filterResult(filtered)
    }

    render(){
        return (
            <View >
                <View style={styles.row}>
                    <TextInput 
                        style={styles.lineStart}
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
                    <Text style={[styles.lineStart, styles.label]}>ABV</Text>
                    <CheckBox 
                        value={this.state.abv_0_3}
                        onValueChange={() => this._onChangeToggle({abv_0_3 : !this.state.abv_0_3})}
                    />
                    <Text style={styles.label}>{"<3"}</Text>
                    <CheckBox 
                        value={this.state.abv_3_4}
                        onValueChange={() => this._onChangeToggle({abv_3_4 : !this.state.abv_3_4})}
                    />
                    <Text style={styles.label}>3 - 4</Text>
                    <CheckBox 
                        value={this.state.abv_4_5}
                        onValueChange={() => this._onChangeToggle({abv_4_5 : !this.state.abv_4_5})}
                    />
                    <Text style={styles.label}>4 - 5</Text>
                    <CheckBox 
                        value={this.state.abv_5_6}
                        onValueChange={() => this._onChangeToggle({abv_5_6 : !this.state.abv_5_6})}
                    />
                    <Text style={styles.label}>5 - 6</Text>
                    <CheckBox 
                        value={this.state.abv_6_7}
                        onValueChange={() => this._onChangeToggle({abv_6_7 : !this.state.abv_6_7})}
                    />
                    <Text style={styles.label}>6 - 7</Text>
                    <CheckBox 
                        value={this.state.abv_7up}
                        onValueChange={() => this._onChangeToggle({abv_7up : !this.state.abv_7up})}
                    />
                    <Text style={styles.label}>7+</Text>
                </View>
                <View style={styles.row}>
                    <CheckBox 
                        style={styles.lineStart}
                        value={this.state.wants}
                        onValueChange={() => this._onChangeToggle({wants : !this.state.wants})}
                    />
                    <Text style={styles.label}>Wants</Text>
                    <CheckBox 
                        value={this.state.favourites}
                        onValueChange={() => this._onChangeToggle({favourites : !this.state.favourites})}
                    />
                    <Text style={styles.label}>Favourites</Text>
                    <Text style={styles.beerCount}>{this.props.beerCount} beers</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row : {
        width: Dimensions.get('window').width,
        flexDirection: 'row'
    },
    beerCount : {
        marginLeft:'auto', 
        marginRight : 5
    },
    lineStart : {
        marginLeft : 5 
    },
    label : {
        marginTop: 5
    }
})

export default Header