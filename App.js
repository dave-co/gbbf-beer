import React from 'react';
import BeerList from './components/BeerList.js'
import { BEER_DATA } from './beer-data'
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
  let data = BEER_DATA
  return (
    <View style={styles.container}>
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
    marginTop: StatusBar.currentHeight
  },
});
