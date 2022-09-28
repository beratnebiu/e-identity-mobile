import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import {login} from "../../Api";

const getFonts = () =>
    Font.loadAsync({
        langar: require("../assets/fonts/Langar/Langar-Regular.ttf"),
        ubuntu: require("../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    });

export default function App({ navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async () => {
        const params = {
            email: email,
            password: password
        }

        try {
            const response = await login(params);
            if (response.success) {
                await AsyncStorage.setItem('token', response.body.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.body.user));
                navigation.navigate('MainScreen');
            } else {
                Alert.alert(
                    "Error",
                    response.message,
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                    ],
                    {
                        cancelable: true,
                    }
                );
            }
        } catch (err) {
           console.error(err);
        }
    }

    return (
        fontsLoaded ?
            <View style={styles.container}>
                <Text style={styles.logo}>e-identity</Text>
                <Text style={styles.logoDescription}>Electronic Document System</Text>
                <View style={{marginTop: 30}}>
                    <TextInput
                        style={styles.input}
                        placeholder="E-Mail"
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Text
                        style={styles.button}
                        onPress={onLogin}
                    >LOGIN</Text>
                </View>
            </View>
        :
            <AppLoading
                startAsync={getFonts}
                onFinish={() => {
                    setFontsLoaded(true);
                }}
                onError={console.warn}
            />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#a24343',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight
    },
    logo: {
        fontFamily: 'langar',
        fontSize: 40,
        fontWeight: '500',
        color: '#c3b2b2'
    },
    logoDescription: {
        fontFamily: 'langar',
        color: '#0c0c0c',
        fontSize: 17,
    },
    input: {
        width: 220,
        height: 35,
        margin: 5,
        paddingLeft: 12,
        fontFamily: 'ubuntu',
        backgroundColor: '#f3f3f369',
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    button: {
        width: 220,
        height: 35,
        marginLeft: 5,
        marginTop: 15,
        paddingTop: 10,
        borderRadius: 2,
        fontFamily: 'ubuntu',
        textAlign: 'center',
        backgroundColor: '#802727',
        color: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    }
});
