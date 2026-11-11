import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';

export default function RingingScreen({alarmId, onDismiss}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WAKE UP!</Text>

      <Text style={styles.message}>
        Complete your puzzle to dismiss the alarm.
      </Text>

      <Text style={styles.placeholder}>
        Puzzle components will go here.
      </Text>

      <Button
        title="GO HOME"
        onPress={onDismiss}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  title: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 15
  },
  message: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40
  },
  placeholder: {
    color: '#777777',
    fontSize: 16,
    marginBottom: 40
  }
});