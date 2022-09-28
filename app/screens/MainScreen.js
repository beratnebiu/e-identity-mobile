import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Document from "./Document";
import Application from "./Application.js";

import {getDocumentsAndApplications} from "../../Api";

const { height } = Dimensions.get('window');
const getFonts = () =>
    Font.loadAsync({
        langar: require("../assets/fonts/Langar/Langar-Regular.ttf"),
        ubuntu: require("../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    });

export default function MainScreen({ route, navigation }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('docs');
    const [user, setUser] = useState({});
    const [data, setData] = useState({});

    useEffect(() => {
        getData();
    }, [activeTab]);

    const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');

        try {
            const response = await getDocumentsAndApplications(token);
            if (response.success) {
                setUser(JSON.parse(user));
                setData(response.body.data);
            } else {
                if (response.hasOwnProperty('auth')) {
                    return logout();
                }

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
                )
            }
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
       await AsyncStorage.removeItem('token');
       await AsyncStorage.removeItem('user');
       navigation.navigate('LoginScreen');
    }

    return (
        fontsLoaded && Object.keys(user).length && Object.keys(data).length ?
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.logo}>e-identity</Text>
                    <Text
                        style={styles.logout}
                        onPress={() => {
                            logout()
                        }}
                    >Logout</Text>
                </View>

                <ScrollView
                    style={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {
                        activeTab == 'docs' ?
                            (
                                <>
                                    {
                                        data[0].length ? (
                                            data[0].map(document =>  <Document key={document.id} user={user} data={document} navigation={navigation}/>)
                                        ) : (
                                            <Text style={styles.empty}>No Documents</Text>
                                        )
                                    }
                                </>
                            )
                        :
                            (
                                <>
                                    {
                                        data[1].length ? (
                                            data[1].map(application =>  <Application key={application.id} data={application} />)
                                        ) : (
                                            <Text style={styles.empty}>No Applications</Text>
                                        )
                                    }
                                </>
                            )
                    }
                </ScrollView>

                <View style={styles.footer}>
                    <Text
                        style={[styles.tab, activeTab == 'docs' ? styles.activeTab : {}]}
                        onPress={() => setActiveTab('docs')}
                    >
                        DOCUMENTS
                    </Text>
                    <Text
                        style={[styles.tab, activeTab == 'apps' ? styles.activeTab : {}]}
                        onPress={() => setActiveTab('apps')}
                    >
                        APPLICATIONS
                    </Text>
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
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#dcdcdc',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scrollContent: {
        width: '100%',
        height: height - 105
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        backgroundColor: '#dcdcdc',
    },
    logo: {
        fontFamily: 'langar',
        fontSize: 32,
        fontWeight: '500',
        color: '#a24343'
    },
    logout: {
        position: 'absolute',
        right: 10,
        fontFamily: 'ubuntu',
        fontSize: 15,
        fontWeight: '500',
    },
    tab: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'ubuntu',
        fontWeight: '500',
        borderColor: '#a14343',
        borderTopWidth: 1,
        paddingTop: 15,
        color: '#a14343'
    },
    activeTab: {
        backgroundColor: '#a14343',
        color: '#FFF'
    },
    empty: {
        color: 'gray',
        textAlign: 'center',
        marginTop: 270,
        fontFamily: 'ubuntu',
        fontSize: 15
    }
});
