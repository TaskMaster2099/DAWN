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
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/favicon.png')}/>
                <Text style={{color: '#000000'}}>Wake Up Without Worries</Text>
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
            <Pressable
                // onPress={handleLogin}
                style={({pressed}) => [
                    styles.registerButton,
                    {backgroundColor: pressed ? '#3c9b95' : '#4ecdc4'}
                ]}
            >
                <Text style={styles.registerText}>Register</Text>
            </Pressable>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#d4d4d4'
    },
    loginButton: {
        width: '40%',
        height: 70,
        bottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
    loginText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25
    },
    registerButton: {
        width: '40%',
        height: 70,
        bottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
    registerText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 25
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: 'absolute',
        top: '5%',
        alignItems: 'center'
    }
})

export default WelcomeScreen;