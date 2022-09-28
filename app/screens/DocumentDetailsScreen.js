import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    TouchableHighlight,
    Alert
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import moment from "moment";

import {documentType} from "../services/global";
import {setApplication} from "../../Api";

const { height } = Dimensions.get('window');
const getFonts = () =>
    Font.loadAsync({
        langar: require("../assets/fonts/Langar/Langar-Regular.ttf"),
        ubuntu: require("../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    });

export default function DocumentDetailsScreen({route, navigation}) {
    const { user, data } = route.params;
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const status = data.status ? '#218003' : '#ab2800';

    const makeApplication = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const params = {
                type: data.type,
                id: user.id
            }

            const response = await setApplication(token, params);
            if (response.hasOwnProperty('auth')) {
                return logout();
            }

            Alert.alert(
                "Information",
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
        fontsLoaded ?
            <View style={{paddingTop: StatusBar.currentHeight}}>
                <View style={styles.header}>
                    <Text style={styles.logo}>e-identity</Text>
                    <Text
                        style={styles.logout}
                        onPress={() => {
                            logout()
                        }}
                    >Logout</Text>
                </View>

                <View style={styles.container}>

                    <Text style={styles.title}>{documentType(data.type)}</Text>

                    <View style={styles.image}>
                        <Image
                            style={styles.imageContent}
                            source={{uri: `http://192.168.43.129:3000/mobile/getPhoto/${data.photo}`}}
                        />
                        {
                            data.status ? (
                                <TouchableHighlight
                                    onPress={() => {
                                        Alert.alert(
                                            "Document Application",
                                            "Are you sure that you want to create application for that document?",
                                            [
                                                {
                                                    text: "Cancel"
                                                },
                                                {
                                                    text: "OK",
                                                    onPress: () => makeApplication()
                                                }
                                            ]
                                        )
                                    }}
                                    style={styles.applicationTouch}
                                    activeOpacity={0.8}
                                    underlayColor="#DDDDDD"
                                >
                                    <View style={styles.application}>
                                        <Text style={styles.applicationIcon}>+</Text>
                                    </View>
                                </TouchableHighlight>
                            ) : <></>
                        }
                        <View style={[styles.indicator, {backgroundColor: status}]}></View>
                    </View>

                    <ScrollView
                        style={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={styles.content}>

                            <View style={{flex: 1}}>

                                <Text style={styles.propertyTitle}>ID</Text>
                                <Text style={styles.propertyValue}>{data.id}</Text>

                                <Text style={styles.propertyTitle}>NAME</Text>
                                <Text style={styles.propertyValue}>{user.name}</Text>

                                <Text style={styles.propertyTitle}>LAST NAME</Text>
                                <Text style={styles.propertyValue}>{user.lastName}</Text>

                                <Text style={styles.propertyTitle}>DATE OF BIRTH</Text>
                                <Text style={styles.propertyValue}>{moment(user.birthdate).format('DD-MM-YYYY')}</Text>

                                <Text style={styles.propertyTitle}>GENDER</Text>
                                <Text style={styles.propertyValue}>{user.gender}</Text>

                                <Text style={styles.propertyTitle}>EMBG</Text>
                                <Text style={styles.propertyValue}>{user.embg}</Text>

                            </View>

                            <View style={{flex: 1}}>

                                <Text style={styles.propertyTitle}>RELEASE DATE</Text>
                                <Text style={styles.propertyValue}>{moment(data.releaseDate).format('DD-MM-YYYY')}</Text>

                                <Text style={styles.propertyTitle}>EXPIRATION DATE</Text>
                                <Text style={styles.propertyValue}>{moment(data.expireDate).format('DD-MM-YYYY')}</Text>

                                <Text style={styles.propertyTitle}>NATIONALITY</Text>
                                <Text style={styles.propertyValue}>{user.nationality}</Text>

                                <Text style={styles.propertyTitle}>BORNPLACE</Text>
                                <Text style={styles.propertyValue}>{user.bornplace}</Text>

                                <Text style={styles.propertyTitle}>SETTLEMENT</Text>
                                <Text style={styles.propertyValue}>{user.settlement}</Text>

                                <Text style={styles.propertyTitle}>ADDRESS</Text>
                                <Text style={styles.propertyValue}>{user.address}</Text>

                            </View>

                        </View>

                        {
                            data.type == 'driving_license' ? (
                                <View>
                                    <Text style={[styles.propertyValue, {marginTop: 30, marginBottom: 50, color: '#a24343'}]}>DOCUMENT INFORMATION</Text>

                                    <Text style={styles.propertyTitle}>BLOOD GROUP</Text>
                                    <Text style={styles.propertyValue}>{data.information.bloodGroup || ''}</Text>

                                    <Text style={styles.propertyTitle}>CATEGORIES</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>A1</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>A</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>B</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>C1</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>C</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>D1</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>D</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>BE</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>C1E</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>CE</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>D1E</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>DE</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>F</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>G</Text>
                                            <Text style={[styles.propertyValue, {color: '#969696'}]}>M</Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.A1 || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.A || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.B || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.C1 || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.C || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.D1 || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.D || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.BE || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.C1E || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.CE || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.D1E || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.DE || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.F || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.G || 'N/A'}</Text>
                                            <Text style={[styles.propertyValue, {color: '#000'}]}>{data.information.categories.M || 'N/A'}</Text>
                                        </View>
                                    </View>

                                </View>
                            ) : (
                                <></>
                            )
                        }

                    </ScrollView>

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
    container: {
        height: height - 80,
        margin: 10,
        padding: 20,
        borderRadius: 4,
        backgroundColor: '#FFF',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 5,
    },
    title: {
        width: '100%',
        fontFamily: 'ubuntu',
        fontSize: 20,
        color: '#969696',
        marginBottom: 20,
        textAlign: 'center',
        borderColor: '#dcdcdc',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    image: {
        height: 200,
        width: 200,
        borderColor: '#dcdcdc',
        borderRadius: 100,
        borderWidth: 1,
    },
    imageContent: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    scrollContent: {
        width: '100%',
        marginTop: 20,
        borderColor: '#dcdcdc',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    content: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
    },
    propertyTitle: {
        fontFamily: 'ubuntu',
        fontSize: 12,
        color: '#969696',
        marginBottom: 6,
        textAlign: 'center'
    },
    propertyValue: {
        fontFamily: 'ubuntu',
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center'
    },
    indicator: {
        position: 'absolute',
        height: 25,
        width: 25,
        bottom: 20,
        right: 15,
        borderRadius: 100
    },
    applicationTouch: {
        position: 'absolute',
        height: 40,
        width: 40,
        bottom: 15,
        left: 5,
        borderRadius: 100
    },
    application: {
        backgroundColor: '#dcdcdc',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    applicationIcon: {
        fontSize: 35,
        color: '#a24343',
        marginTop: -3
    }
});
