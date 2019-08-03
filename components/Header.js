import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, CheckBox } from 'react-native';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text : '',
            abv_0_3 : true,
            abv_3_4 : true,
            abv_4_5 : true,
            abv_5_6 : true,
            abv_6_7 : true,
            abv_7up : true,
        }
    }

    _onChangeSearch = (text) => {
        this.setState({text}, () => this._applySearchAndFilter())
        // this.props.search(text)
    }

    _onChangeAbv = (abv) => {
        this.setState(abv, () => this._applySearchAndFilter())
    }

    _applySearchAndFilter(){
        let filtered = this.props.beerData
        if (this.state.text && this.state.text !== "") {
            searchText = this.state.text.toLowerCase()
            filtered = filtered.filter(beer => {
                if(beer.name.toLowerCase().includes(searchText)) {
                    return true
                }
                return false
            })
        }
        if (!this.state.abv_0_3) {
            filtered = filtered.filter(beer => {
                if (beer.abv && parseFloat(beer.abv) < 3) {
                    return false
                }
                return true
            })
        }
        if (!this.state.abv_3_4) {
            filtered = filtered.filter(beer => {
                if (beer.abv && parseFloat(beer.abv) >= 3 && parseFloat(beer.abv) < 4) {
                    return false
                }
                return true
            })
        }
        if (!this.state.abv_4_5) {
            filtered = filtered.filter(beer => {
                if (beer.abv && parseFloat(beer.abv) >= 4 && parseFloat(beer.abv) < 5) {
                    return false
                }
                return true
            })
        }
        if (!this.state.abv_5_6) {
            filtered = filtered.filter(beer => {
                if (beer.abv && parseFloat(beer.abv) >= 5 && parseFloat(beer.abv) < 6) {
                    return false
                }
                return true
            })
        }
        if (!this.state.abv_6_7) {
            filtered = filtered.filter(beer => {
                if (beer.abv && parseFloat(beer.abv) >= 6 && parseFloat(beer.abv) < 7) {
                    return false
                }
                return true
            })
        }
        if (!this.state.abv_7up) {
            filtered = filtered.filter(beer => {
                if (beer.abv && parseFloat(beer.abv) >= 7) {
                    return false
                }
                return true
            })
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
                    <Text>test</Text>
                </View>
                <View style={styles.row}>
                    <Text>ABV</Text>
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