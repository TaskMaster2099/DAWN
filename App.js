import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
  Platform
} from 'react-native';
import {createAudioPlayer} from 'expo-audio';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationBar} from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from './app/screens/WelcomeScreen';
import TestScreen from './app/screens/TestScreen';
import SongScreen from './app/screens/SongScreen';
import {
  scheduleDailyAlarm,
  cancelAlarm,
  prepareAlarmPermissions,
  convertTo24Hour
} from './app/screens/Notification';
import DawnAlarm from './modules/dawn-alarm/src';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

// Main App function that handles navigation and alarm triggering
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [is24Hour, setIs24Hour] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [alarmsLoaded, setAlarmsLoaded] = useState(false);

  const handleNewAlarm = async (timeString) => {
    try {
      const id = Date.now().toString();
      let notificationId = null;

      if (Platform.OS === 'android') {
        const exactAlarmGranted = await prepareAlarmPermissions();

        if (!exactAlarmGranted) {
          throw new Error(
            'Please allow Dawn to schedule exact alarms in your Android settings.'
          );
        }

        const {hour, minute} = convertTo24Hour(timeString);

        DawnAlarm.scheduleDailyAlarm(hour, minute, id);

      } else {
      notificationId = await scheduleDailyAlarm(timeString, id);
      }

      const newAlarm = {
        id,
        time: timeString,
        notificationId
      };

      setAlarms(previous => [...previous, newAlarm]);

      return true;

    } catch (error) {
      Alert.alert('Unable to set alarm.', error.message);
      return false;
    }
  }

  const handleDeleteAlarm = async (alarmId) => {
    try {
      const alarm = alarms.find(item => item.id === alarmId);

      if (Platform.OS === 'android') {
        DawnAlarm.cancelScheduledAlarm(alarmId);
      } else if (alarm?.notificationId) {
        await cancelAlarm(alarm.notificationId);
      }

      setAlarms(previous =>
        previous.filter(item => item.id !== alarmId)
      );

    } catch (error) {
      Alert.alert('Unable to delete alarm.', error.message);
    }
  }

  useEffect(() => {
    const lastResponse = Notifications.getLastNotificationResponse()

    if (lastResponse) {
      setCurrentScreen('Test')

      Notifications.clearLastNotificationResponse()
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        setCurrentScreen('Test')
      }
    )

    return () => subscription.remove()
  }, [])

  useEffect(() => {
    const loadAlarms = async () => {
      try {
        const savedAlarms = await AsyncStorage.getItem('alarms')

        if (savedAlarms !== null) {
          setAlarms(JSON.parse(savedAlarms))
        }
      } catch (error) {
        console.error('Error loading alarms:', error)
      } finally {
        setAlarmsLoaded(true)
      }
    }

    loadAlarms()
  }, [])

  useEffect(() => {
    if (!alarmsLoaded) return

    AsyncStorage.setItem('alarms', JSON.stringify(alarms))
    .catch(error => console.error('Error saving alarms:', error))
  }, [alarms, alarmsLoaded])

  // Preset navigation bar style
  useEffect(() => {
    NavigationBar.setStyle('light')
  }, [])

  useEffect(() => {
    try {
      console.log('Native module test:', DawnAlarm.hello())
    } catch (error) {
      console.error('Native module test failed:', error)
    }
  }, [])

  const testStartAlarm = () => {
    try {
      DawnAlarm.startAlarm();
      Alert.alert('Success', 'Native alarm service started!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const testStopAlarm = () => {
    try {
      DawnAlarm.stopAlarm();
      Alert.alert('Success', 'Native alarm service stopped!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Screen rendering
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
            onNewAlarm={handleNewAlarm}
            onDeleteAlarm={handleDeleteAlarm}
            // setAlarms={setAlarms}
          />
        )}
        {currentScreen === 'Song' && (
          <SongScreen onNavigate={setCurrentScreen} />
        )}

        <Button
          title="TEST START ALARM"
          onPress={testStartAlarm}
        />

        <Button
          title="TEST STOP ALARM"
          onPress={testStopAlarm}
        />
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
