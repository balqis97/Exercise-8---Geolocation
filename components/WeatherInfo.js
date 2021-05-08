import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function WeatherInfo({currentWeather}) {
    const {
        main: {temp},
        weather: [details],
        name,
     } = currentWeather
     const{icon, main, description} = details
     const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View>
            <Text style={styles.text1}>Hello balqis ! </Text> 
            <View style={styles.weatherinfo}>
        
                <Text style={styles.textName}> {name} </Text>
                <Image style= {styles.weathericon} source={{ uri: iconUrl }} />
                <Text style= {styles.textTemp}> {temp}° </Text>
                <Text style={styles.weatherdesc}>{description}</Text>
                <Text style={styles.textMain}>{main}</Text>
            
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    text1: {
        fontSize: 15,
        fontWeight: '500'
        
    },
    weatherinfo: {
      alignItems: 'center',
    },
    textName: {
        fontSize: 60,
        fontWeight: '800',
        marginTop:20
    },
    weatherdesc:{
        textTransform: 'capitalize',
    },
    weathericon: {
      width: 100,
      height: 100  
    },
    textTemp:{
        fontSize: 50,
        marginLeft: 25,
        color: 'blue'
    },
    textMain:{
        fontSize: 30,
        fontWeight: '600',
        marginTop: 20
    }
})