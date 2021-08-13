import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements'


import Salah from './components/Salah';

export default function App() {
  const [DaySaveTime, setDaySaveTime] = useState(false)
  const storeData = async (value:boolean) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value.toString())
    } catch (e) {
      // saving error
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
        setDaySaveTime(JSON.parse(value.toLowerCase()));
      } else {
        storeData(DaySaveTime);
      }
    } catch(e) {
      // error reading value
      storeData(DaySaveTime);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.appFontSize}>{`${moment().format("dddd DD/MM/YYYY")}\n`}</Text>
      <Salah daySaveTime={DaySaveTime} />
      <StatusBar style="auto" />
      <CheckBox iconRight title='توقيت صيفي' checked={DaySaveTime} onPress={() => {storeData(!DaySaveTime);setDaySaveTime(!DaySaveTime)}} />
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
