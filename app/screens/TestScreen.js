import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Pressable,
    Text
} from 'react-native';

function TestScreen({onNavigate}) {
    const handleClose = () => {
        onNavigate('Home')
    };

    return (
        <View style={styles.container}>
            <Image
                resizeMode='contain'
                style={styles.image}
                source={require('../assets/icon.png')}
            />
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
    image: {
        width: '100%',
        height: '100%'
    },
    container: {
        backgroundColor: '#000',
        flex: 1
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