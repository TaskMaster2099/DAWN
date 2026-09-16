import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Alert
} from 'react-native';
import {createAudioPlayer} from 'expo-audio';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import WelcomeScreen from './app/screens/WelcomeScreen';
import TestScreen from './app/screens/TestScreen';
import SongScreen from './app/screens/SongScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [is24Hour, setIs24Hour] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const playerRef = useRef(null);
  const lastTriggeredMin = useRef('');
  
  const triggerAlarmSound = async (alarmTime) => {
    try {
      if (playerRef.current) {
        playerRef.current.release()
      }

      const player = createAudioPlayer(require('./app/assets/audio/alarm.mp3'))
      playerRef.current = player

      player.loop = true
      player.play()

      Alert.alert(
        "Alarm!",
        `It is now ${alarmTime}`,
        [
          {
            text: "Dismiss",
            onPress: () => stopAlarmSound()
          }
        ],
        {cancelable: false}
      )
    } catch (error) {
      console.error("Audio playback error:", error)
    }
  }

  const stopAlarmSound = () => {
    if (playerRef.current) {
      try {
        playerRef.current.pause()
        playerRef.current.release()
        playerRef.current = null
      } catch (error) {
        console.error("Audio stopping error:", error)
      }
    }
  }

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light')
  }, [])
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (alarms.length === 0) return

      const now = new Date()
      let hours = now.getHours()
      const minutes = String(now.getMinutes()).padStart(2, '0')

      const period = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12
      const formattedHours = String(hours).padStart(2, '0')

      const currentTimeString = `${formattedHours}:${minutes} ${period}`

      if (lastTriggeredMin.current === currentTimeString) return

      const cleanCurrentTime = currentTimeString.replace(/^0/, '')

      const matchFound = alarms.some(alarm => {
        const cleanAlarmTime = alarm.replace(/^0/, '')
        return cleanAlarmTime === cleanCurrentTime
      })

      if (matchFound) {
        lastTriggeredMin.current = currentTimeString
        triggerAlarmSound(currentTimeString)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [alarms]);

  return (
    <SafeAreaProvider>
      <StatusBar style='light' backgroundColor='#000000'/>

      <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}}>
        {currentScreen === 'Home' && (
          <WelcomeScreen onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'Test' && (
          <TestScreen
            onNavigate={setCurrentScreen}
            is24Hour={is24Hour}
            setIs24Hour={setIs24Hour}
            alarms={alarms}
            setAlarms={setAlarms}
          />
        )}
        {currentScreen === 'Song' && (
          <SongScreen onNavigate={setCurrentScreen} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}