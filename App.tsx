import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment'

import Salah from './components/Salah';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.appFontSize}>{`${moment().format("dddd DD/MM/YYYY")}\n`}</Text>
      <Salah saveTime />
      <StatusBar style="auto" />
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
  appFontSize: {
    fontSize: 40,
    fontWeight: "bold"
}
});
