import React, {useState} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Pressable,
    Text
} from 'react-native';
import Clock from './Clock';
import Alarm from './Alarm';

function TestScreen({onNavigate, is24Hour, setIs24Hour, showAlarm, setShowAlarm}) {

    const handleClose = () => {
        onNavigate('Home')
    };

    const handle24Hour = () => {
        setIs24Hour(!is24Hour)
    };

    const handleAddAlarm = () => {
        setShowAlarm(true)
    };

    return (
        <View style={styles.container}>
            <Clock use24Hour={is24Hour}/>

            {showAlarm && <Alarm />}

            <Pressable
                onPress={handleAddAlarm}
                style={({pressed}) => [
                    styles.alarmIcon,
                    {backgroundColor: pressed ? '#acacac' : '#ffffff'}
                ]}
            >
                <Text style={styles.alarmText}>Add Alarm</Text>
            </Pressable>
            <Pressable
                onPress={handleClose}
                style={({pressed}) => [
                    styles.closeIcon,
                    {backgroundColor: pressed ? '#3c9b95' : '#4ecdc4'}
                ]}
            >
                <Text style={styles.closeText}>Back</Text>
            </Pressable>
            <Pressable
                onPress={handle24Hour}
                style={({pressed}) => [
                    styles.settingsIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.settingsText}>24-Hour</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alarmIcon: {
        width: 120,
        height: 40,
        position: 'absolute',
        bottom: 350,
        left: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    alarmText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20
    },
    closeIcon: {
        width: 80,
        height: 40,
        position: 'absolute',
        top: 20,
        left: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    closeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    settingsIcon: {
        width: 100,
        height: 40,
        position: 'absolute',
        top: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    settingsText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default TestScreen;