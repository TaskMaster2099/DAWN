import React from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Text
} from 'react-native';
import { useAudioPlayer } from 'expo-audio';

function SongScreen({onNavigate}) {
    const player = useAudioPlayer(require('../assets/audio/washing.mp3'))

    const handlePress = () => {
        if (player) {
            player.seekTo(0)
            player.play()
        }
    }

    const handleClose = () => {
        onNavigate('Home')
    }

    return(
        <View style={styles.container}>
            <Pressable
                onPress={handlePress}
                style={({pressed}) => [
                    styles.songIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.songText}>Play Song</Text>
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
    songText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    songIcon: {
        width: '40%',
        height: 70,
        bottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
    closeText: {
        color: '#fff',
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
    }
})

export default SongScreen;