import React, {useState, useEffect} from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

function Clock({use24Hour}) {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const dateString = now.toLocaleDateString([], {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });

            const timeString = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: !use24Hour
            });
            
            setCurrentDate(dateString)
            setCurrentTime(timeString)
        }
    
        updateDateTime();

        const timerId = setInterval(updateDateTime, 1000);

        return () => clearInterval(timerId);
    }, [use24Hour]);

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Text style={styles.timeText}>{currentTime}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateText: {
        fontSize: 20,
        color: '#cacaca',
        margin: 5,
        letterSpacing: 1
    },
    timeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default Clock;