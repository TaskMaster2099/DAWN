import React, {useState, useEffect} from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

function Alarm(props) {
    return(
        <View style={styles.container}>
            <View style={styles.alarmIcon}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },
    alarmIcon: {
        width: 100,
        height: 100,
        backgroundColor: '#fff'
    }
})

export default Alarm;