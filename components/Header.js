import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text : ''
        }
    }

    _onChangeSearch = (text) => {
        this.setState({text})
        this.props.search(text)
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
                    {/* <Text>test</Text> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row : {
        flexDirection: 'row'
    }
})

export default Header