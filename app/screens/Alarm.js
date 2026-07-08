import React, {useState, useEffect} from 'react';
import {
    Text,
    StyleSheet,
    Pressable,
    View,
    Modal,
    TextInput
} from 'react-native';

function Alarm({setShowAlarm}) {
    const [alarmTime, setAlarmTime] = useState('')
    const [isInputVisible, setIsInputVisible] = useState(false)

    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [period, setPeriod] = useState('AM')

    const handleCancel = () => {
        setShowAlarm(false);
    };

    const handleSetTime = () => {
        setIsInputVisible(true)
    }

    const handleConfirmTime = () => {
        if (!hour || !minute) {
            alert("Please enter both hours and minutes.")
            return
        } else if (parseInt(hour) < 1 || parseInt(hour) > 12 || !Number.isInteger(parseInt(hour))) {
            alert("Please enter a valid hour (1-12).")
            return
        } else if (parseInt(minute) < 0 || parseInt(minute) > 59 || !Number.isInteger(parseInt(minute))) {
            alert("Please enter a valid minute (0-59).")
            return
        }
        
        const formattedHour = hour.padStart(2, '0')
        const formattedMinute = minute.padStart(2, '0')
        const finalTimeString = `${formattedHour}:${formattedMinute} ${period}`

        setAlarmTime(finalTimeString)
        setIsInputVisible(false)
    }

    const handleSave = () => {
        if (!alarmTime) {
            alert("Please set a time before saving.")
            return
        }
        setShowAlarm(false)
    }

    return(
        <View style={styles.container}>

            <Modal
                transparent={true}
                visible={isInputVisible}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Set Time</Text>

                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.inputField}
                                placeholder="12"
                                placeholderTextColor="#888"
                                keyboardType="number-pad"
                                maxLength={2}
                                value={hour}
                                onChangeText={setHour}
                            />

                            <Text style={styles.colon}>:</Text>

                            <TextInput
                                style={styles.inputField}
                                placeholder="00"
                                placeholderTextColor="#888"
                                keyboardType="number-pad"
                                maxLength={2}
                                value={minute}
                                onChangeText={setMinute}
                            />

                            <View style={styles.periodContainer}>
                                <Pressable
                                    onPress={() => setPeriod('AM')}
                                    style={[styles.periodButton, period === 'AM' && styles.activePeriodButton]}
                                >
                                    <Text style={[styles.periodText, period === 'AM' && styles.activePeriodText]}>AM</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => setPeriod('PM')}
                                    style={[styles.periodButton, period === 'PM' && styles.activePeriodButton]}
                                >
                                    <Text style={[styles.periodText, period === 'PM' && styles.activePeriodText]}>PM</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.modalButtons}>
                            <Pressable
                                onPress={() => setIsInputVisible(false)}
                                style={({pressed}) => [
                                    styles.modalButton,
                                    {backgroundColor: pressed ? '#aaaaaa' : '#d2d2d2'}
                                ]}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                onPress={handleConfirmTime}
                                style={({pressed}) => [
                                    styles.modalButton,
                                    {backgroundColor: pressed ? '#3c9b95' : '#4ecdc4'}
                                ]}
                            >
                                <Text style={[styles.modalButtonText, {color: '#fff'}]}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.alarmIcon}>
                <Text style={styles.alarmText}>New Alarm</Text>
                <Pressable
                    onPress={handleCancel}
                    style={({pressed}) => [
                        styles.cancelIcon,
                        {backgroundColor: pressed ? '#aaaaaa' : '#d2d2d2'}
                    ]}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable
                    onPress={handleSetTime}
                    style={({pressed}) => [
                        styles.setTimeIcon,
                        {backgroundColor: pressed ? '#aaaaaa' : '#d2d2d2'}
                    ]}
                >
                    <Text style={styles.setTimeText}>
                        {alarmTime ? alarmTime : "Set Time"}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={handleSave}
                    style={({pressed}) => [
                        styles.saveIcon,
                        {backgroundColor: pressed ? '#aaaaaa' : '#d2d2d2'}
                    ]}
                >
                    <Text style={styles.saveText}>Save</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    },
    alarmIcon: {
        width: 300,
        height: 500,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
        bottom: 0
    },
    alarmText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        margin: 10
    },
    cancelIcon: {
        width: 100,
        height: 40,
        position: 'absolute',
        bottom: 15,
        left: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    cancelText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    saveIcon: {
        width: 100,
        height: 40,
        position: 'absolute',
        bottom: 15,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    saveText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    setTimeIcon: {
        width: 200,
        height: 80,
        top: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    setTimeText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBox: {
        width: 250,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000'
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40
    },
    inputField: {
        width: 60,
        height: 60,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    colon: {
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#000',
        bottom: 2.5
    },
    periodContainer: {
        marginLeft: 10,
        justifyContent: 'space-between',
        height: 60
    },
    periodButton: {
        width: 50,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    activePeriodButton: {
        backgroundColor: '#3c9b95',
    },
    periodText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    activePeriodText: {
        color: '#fff',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    modalButtonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000'
    }
})

export default Alarm;