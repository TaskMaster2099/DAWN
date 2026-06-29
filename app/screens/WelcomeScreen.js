import React from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Pressable
} from 'react-native';

function WelcomeScreen({onNavigate}) {
    const handleLogin = () => {
        onNavigate('Test')
    };

    return (
        <ImageBackground
            resizeMode='contain'
            style={styles.background}
            source={require('../assets/splash-icon.png')}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/favicon.png')}/>
                <Text>Wake Up Without Worries</Text>
            </View>
            <Pressable
                onPress={handleLogin}
                style={({pressed}) => [
                    styles.loginButton,
                    {backgroundColor: pressed ? '#a2383d' : '#fc5c65'}
                ]}
            >
                <Text style={styles.loginText}>Login</Text>
            </Pressable>
            <View style={styles.registerButton}></View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    loginButton: {
        width: '95%',
        height: 70,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    loginText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25
    },
    registerButton: {
        width: '95%',
        height: 70,
        borderRadius: 10,
        backgroundColor: '#4ecdc4'
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: 'absolute',
        top: 15,
        alignItems: 'center'
    }
})

export default WelcomeScreen;