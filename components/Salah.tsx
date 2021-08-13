import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import salawat from '../assets/Salawat.json'
import moment from 'moment'

export default function Salah(props:any) {
    let PrayerTime = {
        fajer: "",
        sunrise: "",
        dhuhur: "",
        asr: "",
        maghreb: "",
        Ishaa: "",
      }

    const getData=()=>{
        const day = ("0" + (new Date().getDate())).slice(-2);
        const month = ("0" + (new Date().getMonth() + 1)).slice(-2)
        const year = new Date().getFullYear();
        let a = salawat.filter((b) => {
            return (b.month == month && b.day == day)
        });
        return a[0];
        
    }
    
    let _ = getData();

    if(props.daySaveTime.toString()=="true") {
        PrayerTime = {
            fajer: moment(`${_.fajer}`, 'hh:mm').add(1,'h').format("hh:mm"),
            sunrise: moment(`${_.sunrise}`, 'hh:mm').add(1,'h').format("hh:mm"),
            dhuhur: moment(`${_.dhuhur}`, 'hh:mm').add(1,'h').format("hh:mm"),
            asr: moment(`${_.asr} pm`, 'hh:mm a').add(1,'h').format("HH:mm"),
            maghreb: moment(`${_.maghreb} pm`, 'hh:mm a').add(1,'h').format("HH:mm"),
            Ishaa: moment(`${_.Ishaa} pm`, 'hh:mm a').add(1,'h').format("HH:mm"),
          }
    } else {
        PrayerTime = {
            fajer: moment(`${_.fajer}`, 'hh:mm').add(0,'h').format("hh:mm"),
            sunrise: moment(`${_.sunrise}`, 'hh:mm').add(0,'h').format("hh:mm"),
            dhuhur: moment(`${_.dhuhur}`, 'hh:mm').add(0,'h').format("hh:mm"),
            asr: moment(`${_.asr} pm`, 'hh:mm a').add(0,'h').format("HH:mm"),
            maghreb: moment(`${_.maghreb} pm`, 'hh:mm a').add(0,'h').format("HH:mm"),
            Ishaa: moment(`${_.Ishaa} pm`, 'hh:mm a').add(0,'h').format("HH:mm"),
          }
    }
    return (
        <View >
            <Text style={styles.appFontSize}>الفجر: {PrayerTime.fajer}</Text>
            <Text style={styles.appFontSize}>الشروق: {PrayerTime.sunrise}</Text>
            <Text style={styles.appFontSize}>{moment().format("dddd") == 'Friday' 
                    ? `الظهر: ${PrayerTime.dhuhur}\nالجمعة: ${moment(PrayerTime.dhuhur, 'hh:mm').add(20,'m').format("HH:mm")}` 
                    : `الظهر: ${PrayerTime.dhuhur}` }</Text>
            <Text style={styles.appFontSize}>العصر: {PrayerTime.asr}</Text>
            <Text style={styles.appFontSize}>المغرب: {PrayerTime.maghreb}</Text>
            <Text style={styles.appFontSize}>العشاء: {PrayerTime.Ishaa}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    appFontSize: {
        fontSize: 40,
        textAlign: "right"
    }
})
