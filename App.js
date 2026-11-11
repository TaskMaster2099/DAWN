import React, {useState, useEffect} from 'react';
import {
  Button,
  Alert,
  Platform
} from 'react-native';
import {Linking} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationBar} from 'expo-navigation-bar';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from './app/screens/WelcomeScreen';
import TestScreen from './app/screens/TestScreen';
import RingingScreen from './app/screens/RingingScreen';

import {
  scheduleDailyAlarm,
  cancelAlarm,
  prepareAlarmPermissions,
  convertTo24Hour
} from './app/screens/Notification';

import DawnAlarm from './modules/dawn-alarm/src';

// Temporary testing value: 60 seconds.
const PUZZLE_TIMEOUT_MS = 60 * 1000;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [currentAlarmId, setCurrentAlarmId] = useState(null);
  const [is24Hour, setIs24Hour] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [alarmsLoaded, setAlarmsLoaded] = useState(false);

  // Handle links opened by tapping the Android alarm notification.
  useEffect(() => {
    const handleDeepLink = (url) => {
      console.log('Dawn received URL:', url);

      if (!url || !url.startsWith('dawn://alarm/ringing')) {
        return;
      }

      // Extract the alarm ID.
      const query = url.split('?')[1] || '';
      const params = query.split('&');

      const alarmIdParam = params.find(param =>
        param.startsWith('alarmId=')
      );

      const alarmId = alarmIdParam
        ? decodeURIComponent(alarmIdParam.substring(8))
        : null;

      console.log('Opening Ringing screen. Alarm ID:', alarmId);

      setCurrentAlarmId(alarmId);
      setCurrentScreen('Ringing');

      if (Platform.OS === 'android') {
        try {
          DawnAlarm.pauseAlarmForPuzzle(
            alarmId || 'manual',
            PUZZLE_TIMEOUT_MS
          );
        } catch (error) {
          console.error('Unable to pause alarm:', error);
          Alert.alert(
            'Alarm error',
            'Unable to start the puzzle countdown. The alarm will continue ringing.'
          );
        }
      }
    };

    // Handle Dawn launching from a closed state.
    Linking.getInitialURL().then(handleDeepLink);

    // Handle Dawn already running.
    const subscription = Linking.addEventListener('url', event => {
      handleDeepLink(event.url);
    });

    return () => subscription.remove();
  }, []);

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
  };

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
  };

  // Existing Expo notification navigation (primarily for iOS).
  useEffect(() => {
    const lastResponse = Notifications.getLastNotificationResponse();

    if (lastResponse) {
      setCurrentScreen('Test');
      Notifications.clearLastNotificationResponse();
    }

    const subscription =
      Notifications.addNotificationResponseReceivedListener(() => {
        setCurrentScreen('Test');
      });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const loadAlarms = async () => {
      try {
        const savedAlarms = await AsyncStorage.getItem('alarms');

        if (savedAlarms !== null) {
          setAlarms(JSON.parse(savedAlarms));
        }
      } catch (error) {
        console.error('Error loading alarms:', error);
      } finally {
        setAlarmsLoaded(true);
      }
    };

    loadAlarms();
  }, []);

  useEffect(() => {
    if (!alarmsLoaded) return;

    AsyncStorage.setItem('alarms', JSON.stringify(alarms))
      .catch(error => console.error('Error saving alarms:', error));
  }, [alarms, alarmsLoaded]);

  useEffect(() => {
    NavigationBar.setStyle('light');
  }, []);

  useEffect(() => {
    try {
      console.log('Native module test:', DawnAlarm.hello());
    } catch (error) {
      console.error('Native module test failed:', error);
    }
  }, []);

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

  const handleDismissAlarm = () => {
    try {
      if (Platform.OS === 'android') {
        DawnAlarm.dismissAlarm(currentAlarmId || 'manual');
      }

      setCurrentAlarmId(null);
      setCurrentScreen('Home');
    } catch (error) {
      Alert.alert('Unable to stop alarm.', error.message);
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#000000" />

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
          />
        )}

        {currentScreen === 'Ringing' && (
          <RingingScreen
            alarmId={currentAlarmId}
            onDismiss={handleDismissAlarm}
          />
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