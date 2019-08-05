import React from 'react';
import { StyleSheet, Text, View, TextInput, CheckBox, Picker, Button } from 'react-native';

class BeerEntry extends React.PureComponent {
    state = {
        id : '',
        category : 'Real Ale',
        name : '',
        brewery : '',
        abv : '',
        barCode : '',
        isManualEntry : true
    }

    _reset = () => {
        this.setState({
            id : '',
            category : 'Real Ale',
            name : '',
            brewery : '',
            abv : '',
            barCode : ''
        })
    }

    _onAddBeer = () => {
        this.props.onAddBeer(Object.assign({}, this.state))
    }

    render(){
        return (
            <View>
                <Picker
                    prompt={'Category...'}
                    selectedValue={this.state.category}
                    style={{height: 20, width: 200}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({category: itemValue})
                    }>
                    <Picker.Item label="Real Ale" value="Real Ale" />
                    <Picker.Item label="International" value="International" />
                </Picker>
                <TextInput 
                    style={styles.lineStart}
                    placeholder='Beer Name...'
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                />
                <TextInput 
                    style={styles.lineStart}
                    placeholder='Brewery...'
                    onChangeText={(brewery) => this.setState({brewery})}
                    value={this.state.brewery}
                />
                <TextInput 
                    style={styles.lineStart}
                    placeholder='ABV...'
                    onChangeText={(abv) => this.setState({abv})}
                    value={this.state.abv}
                />
                <TextInput 
                    style={styles.lineStart} 
                    placeholder='Bar Code...'
                    onChangeText={(barCode) => this.setState({barCode})}
                    value={this.state.barCode}
                />
                <View style={styles.row}>
                    <View style={styles.button}>
                        <Button 
                            onPress={this._onAddBeer} 
                            title="Add"
                            color="darkslateblue"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            onPress={this._reset}
                            title="Reset"
                            color="maroon"
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row : {
        flexDirection: 'row'
    },
    button : {
        flex : 1,
        marginTop : 10,
        marginLeft : 10,
        marginBottom : 10
    },
    lineStart : {
        marginLeft : 5 
    }
})

export default BeerEntry