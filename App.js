import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from './app/screens/LoginScreen';
import MainScreen from './app/screens/MainScreen';
import DocumentDetailsScreen from "./app/screens/DocumentDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const [screen, setScreen] = useState('LoginScreen');

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setScreen('MainScreen');
            } else {
                setScreen('LoginScreen');
            }
        }

        checkAuth();
    })

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={screen}>
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="DocumentDetailsScreen"
                    component={DocumentDetailsScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
