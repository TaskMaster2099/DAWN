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
    const [tempTime, setTempTime] = useState('')
    const [isInputVisible, setIsInputVisible] = useState(false)

    const handleCancel = () => {
        setShowAlarm(false);
    };

    const handleSetTime = () => {
        setTempTime(alarmTime)
        setIsInputVisible(true)
    }

    const handleConfirmTime = () => {
        setAlarmTime(tempTime)
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
                        <Text style={styles.modalTitle}>Enter Time</Text>

                        <TextInput
                            style={styles.inputField}
                            placeholder="e.g., 0730"
                            placeholderTextColor="#888"
                            keyboardType="number-pad"
                            value={tempTime}
                            onChangeText={setTempTime}
                            maxLength={4}
                        />

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
        color: '#000000',
        letterSpacing: 4
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
    inputField: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        marginBottom: 20
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
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