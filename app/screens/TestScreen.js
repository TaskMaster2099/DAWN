import React, {useState} from 'react';
import {
    Image,
    StyleSheet,
    View,
    Pressable,
    Text,
    FlatList
} from 'react-native';
import Clock from './Clock';
import Alarm from './Alarm';

function TestScreen({onNavigate, is24Hour, setIs24Hour, alarms, setAlarms}) {
    const [showAlarm, setShowAlarm] = useState(false);

    const handleClose = () => {
        onNavigate('Home')
    };

    const handle24Hour = () => {
        setIs24Hour(!is24Hour)
    };

    const handleAddAlarm = () => {
        setShowAlarm(true)
    };

    const handleNewAlarm = (timeString) => {
        setAlarms((prevAlarms) => [...prevAlarms, timeString])
    }

    const handleDeleteAlarm = (indexToDelete) => {
        setAlarms((prevAlarms) =>
            prevAlarms.filter((_, index) => index !== indexToDelete)
        )
    }

    return (
        <View style={styles.container}>
            <Clock use24Hour={is24Hour}/>
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

            {showAlarm && <Alarm setShowAlarm={setShowAlarm} onNewAlarm={handleNewAlarm}/>}

            <View style={styles.alarmsListContainer}>
                <Text style={styles.listTitle}>Saved Alarms:</Text>
                {alarms.length === 0 ? (
                    <Text style={styles.noAlarmsText}>No alarms set yet</Text>
                ) : (
                    <FlatList
                        data={alarms}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                            <View style={styles.alarmRow}>
                                <Text style={styles.alarmRowText}>{item}</Text>
                                <Pressable
                                    onPress={() => handleDeleteAlarm(index)}
                                    style={({pressed}) => [
                                        styles.deleteButton,
                                        {backgroundColor: pressed ? '#bd3a42' : '#fc5c65'}
                                    ]}
                                >
                                    <Text style={styles.deleteButtonText}>X</Text>
                                </Pressable>
                            </View>
                        )}
                    />
                )}
            </View>
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
    alarmsListContainer: {
        width: '80%',
        height: 400,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    listTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    noAlarmsText: {
        color: '#cacaca',
        fontSize: 16
    },
    alarmRow: {
        backgroundColor: '#444444',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 5,
        width: 200,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    alarmRowText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    deleteButton: {
        width: 25,
        height: 25,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButtonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    alarmIcon: {
        width: 120,
        height: 40,
        position: 'absolute',
        top: 200,
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