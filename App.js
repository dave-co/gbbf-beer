import React from 'react';
import BeerList from './components/BeerList.js'
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
  StatusBar.setHidden(true);
  return (
    <View style={styles.container}>
      <BeerList />
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
