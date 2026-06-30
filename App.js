import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import WelcomeScreen from './app/screens/WelcomeScreen';
import TestScreen from './app/screens/TestScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
  }, []);

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
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}