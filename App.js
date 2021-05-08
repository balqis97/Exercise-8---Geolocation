import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect, components } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import WeatherInfo from './components/WeatherInfo'

const WEATHER_API_KEY = '97ca6b78d5aaf7203766db2c7482a5eb'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App(){
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitSystem, setUnitSystem] = useState('metric')

  useEffect(() => {
    load()
  },[])
  async function load (){
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted' ){
          setErrorMessage('Acces to location is need to run the app')
          return
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const {latitude, longitude} = location.coords

        const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`

        const response = await fetch(weatherUrl)

        const result = await response.json()

        if(response.ok){
          setCurrentWeather(result)
        } else {
          setErrorMessage(result.message)
        }

      } catch (error){
        setErrorMessage(error.message)
      }
  }
  if(currentWeather){
    return( 
        <View style={styles.container}> 
           <StatusBar style="auto" />
            <View style={styles.main}>
              <WeatherInfo currentWeather={currentWeather}/>
            </View>
        </View>
    )
  } else{
      return(
        <View style={styles.container}> 
          <Text>{errorMessage}</Text>
          <StatusBar style="auto" />
      </View>
      )
   } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#add8e6',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
})