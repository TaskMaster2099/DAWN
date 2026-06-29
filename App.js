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
          <TestScreen onNavigate={setCurrentScreen} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}