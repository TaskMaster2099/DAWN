import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import WelcomeScreen from './app/screens/WelcomeScreen';
import TestScreen from './app/screens/TestScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
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