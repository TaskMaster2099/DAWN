import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Pressable,
    Text
} from 'react-native';
import Clock from './Clock';

function TestScreen({onNavigate}) {
    const handleClose = () => {
        onNavigate('Home')
    };

    return (
        <View style={styles.container}>
            <Clock style={styles.clock}/>
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
                // onPress={handleClose}
                style={({pressed}) => [
                    styles.deleteIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    clock: {
        
    },
    container: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    deleteIcon: {
        width: 80,
        height: 40,
        position: 'absolute',
        top: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default TestScreen;