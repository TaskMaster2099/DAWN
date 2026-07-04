import React, {useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    Text
} from 'react-native';
import { useAudioPlayer } from 'expo-audio';

function SongScreen({onNavigate}) {
    const songs = {
        1: useAudioPlayer(require('../assets/audio/rickroll.mp3')),
        2: useAudioPlayer(require('../assets/audio/gut-genug.mp3')),
        3: useAudioPlayer(require('../assets/audio/washing.mp3')),
        4: useAudioPlayer(require('../assets/audio/hey-kids.mp3')),
        5: useAudioPlayer(require('../assets/audio/adventure.mp3')),
        6: useAudioPlayer(require('../assets/audio/rasputin.mp3')),
        7: useAudioPlayer(require('../assets/audio/coraline.mp3')),
    }

    const activePlayerRef = useRef(null)

    const [isPaused, setIsPaused] = useState(false)
    const [isLooping, setIsLooping] = useState(false)

    const handlePress = (songKey) => {
        const nextPlayer = songs[songKey]

        if (nextPlayer) {
            if (activePlayerRef.current && activePlayerRef.current !== nextPlayer) {
                activePlayerRef.current.loop = false
                activePlayerRef.current.pause()
                activePlayerRef.current.seekTo(0)
            }

            nextPlayer.loop = isLooping
            nextPlayer.seekTo(0)
            nextPlayer.play()
            activePlayerRef.current = nextPlayer

            setIsPaused(false)
        }
    }

    const handlePause = () => {
        const currentPlayer = activePlayerRef.current

        if (!currentPlayer) return

        if (isPaused) {
            currentPlayer.play()
            setIsPaused(false)
        } else {
            currentPlayer.pause()
            setIsPaused(true)
        }
    }

    const handleLoop = () => {
        const nextLoopState = !isLooping
        setIsLooping(nextLoopState)

        if (activePlayerRef.current) {
            activePlayerRef.current.loop = nextLoopState
        }
    }

    const handleClose = () => {
        onNavigate('Home')
    }

    return(
        <View style={styles.container}>
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
                onPress={handlePause}
                style={({pressed}) => [
                    styles.pauseIcon,
                    {backgroundColor: pressed ? '#3c9b95' : '#4ecdc4'}
                ]}
            >
                <Text style={styles.pauseText}>
                    {isPaused ? 'Play' : 'Pause'}
                </Text>
            </Pressable>
            <Pressable
                onPress={handleLoop}
                style={({pressed}) => [
                    styles.loopIcon,
                    {backgroundColor: isLooping ? '#4ecdc4' : '#3c9b95'}
                ]}
            >
                <Text style={styles.loopText}>
                    {isLooping ? 'Loop On' : 'Loop Off'}
                </Text>
            </Pressable>
            <Pressable
                onPress={() => handlePress('1')}
                style={({pressed}) => [
                    styles.songIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.songText}>RickRoll</Text>
            </Pressable>
            <Pressable
                onPress={() => handlePress('2')}
                style={({pressed}) => [
                    styles.songIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.songText}>Gut Genug</Text>
            </Pressable>
            <Pressable
                onPress={() => handlePress('3')}
                style={({pressed}) => [
                    styles.songIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.songText}>Washing</Text>
            </Pressable>
            <Pressable
                onPress={() => handlePress('4')}
                style={({pressed}) => [
                    styles.songIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.songText}>Hey Kids</Text>
            </Pressable>
            <Pressable
                onPress={() => handlePress('5')}
                style={({pressed}) => [
                    styles.songIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.songText}>Adventure</Text>
            </Pressable>
            <Pressable
                onPress={() => handlePress('6')}
                style={({pressed}) => [
                    styles.songIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.songText}>Rasputin</Text>
            </Pressable>
            <Pressable
                onPress={() => handlePress('7')}
                style={({pressed}) => [
                    styles.songIcon,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.songText}>Coraline</Text>
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 8
    },
    pauseText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    pauseIcon: {
        width: 80,
        height: 40,
        position: 'absolute',
        bottom: 30,
        left: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    loopText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    loopIcon: {
        width: 100,
        height: 40,
        position: 'absolute',
        bottom: 30,
        right: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
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