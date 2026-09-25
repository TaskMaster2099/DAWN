import React, {useState, useEffect} from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

// Function that handles clock and time
function Clock({use24Hour}) {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    // Update the date and time every second
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
                hour12: !use24Hour
            });
            
            setCurrentDate(dateString)
            setCurrentTime(timeString)
        }
    
        updateDateTime();

        const timerId = setInterval(updateDateTime, 1000);

        return () => clearInterval(timerId);
    }, [use24Hour]);

    // Screen rendering
    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Text style={styles.timeText}>{currentTime}</Text>
        </View>
    );
}

// Preset graphical styles for components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        top: 100
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