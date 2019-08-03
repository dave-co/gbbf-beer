import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text : ''
        }
    }

    render(){
        return (
            <View >
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                        placeholder='Search...'
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />
                    {/* <Text>test</Text> */}
                </View>
            </View>
        )
    }
}
export default Header