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
            abv_0_3 : true,
            abv_3_4 : true,
            abv_4_5 : true,
            abv_5_6 : true,
            abv_6_7 : true,
            abv_7up : true,
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

    _onChangeAbv = (abv) => {
        this.setState(abv, () => this._applySearchAndFilter())
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

        this.props.filterResult(filtered)
    }

    render(){
        return (
            <View >
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
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>ABV</Text>
                    <CheckBox 
                        value={this.state.abv_0_3}
                        onValueChange={() => this._onChangeAbv({abv_0_3 : !this.state.abv_0_3})}
                    />
                    <Text style={styles.label}>{"<3"}</Text>
                    <CheckBox 
                        value={this.state.abv_3_4}
                        onValueChange={() => this._onChangeAbv({abv_3_4 : !this.state.abv_3_4})}
                    />
                    <Text style={styles.label}>3 - 4</Text>
                    <CheckBox 
                        value={this.state.abv_4_5}
                        onValueChange={() => this._onChangeAbv({abv_4_5 : !this.state.abv_4_5})}
                    />
                    <Text style={styles.label}>4 - 5</Text>
                    <CheckBox 
                        value={this.state.abv_5_6}
                        onValueChange={() => this._onChangeAbv({abv_5_6 : !this.state.abv_5_6})}
                    />
                    <Text style={styles.label}>5 - 6</Text>
                    <CheckBox 
                        value={this.state.abv_6_7}
                        onValueChange={() => this._onChangeAbv({abv_6_7 : !this.state.abv_6_7})}
                    />
                    <Text style={styles.label}>6 - 7</Text>
                    <CheckBox 
                        value={this.state.abv_7up}
                        onValueChange={() => this._onChangeAbv({abv_7up : !this.state.abv_7up})}
                    />
                    <Text style={styles.label}>7+</Text>
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
    label : {
        marginTop: 5
    }
})

export default Header