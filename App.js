import React from 'react';
import BeerList from './components/BeerList.js'
import { BEER_DATA } from './beer-data'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  let data = BEER_DATA
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <BeerList data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
