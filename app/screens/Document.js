import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import moment from "moment";

import {documentType} from "../services/global";

const getFonts = () =>
    Font.loadAsync({
        langar: require("../assets/fonts/Langar/Langar-Regular.ttf"),
        ubuntu: require("../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    });

export default function Document({ navigation, user, data }) {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const status = data.status ? '#218003' : '#ab2800';

    return (
        fontsLoaded ?
            <TouchableHighlight
                onPress={() => {
                    navigation.navigate('DocumentDetailsScreen', {user: user, data: data});
                }}
                style={{margin: 10, borderRadius: 4}}
                activeOpacity={0.8}
                underlayColor="#DDDDDD"
            >
                <View style={styles.container}>

                    <View style={styles.left}>
                        <View style={styles.image}>
                            <Image
                                style={styles.imageContent}
                                source={{uri: `http://192.168.43.129:3000/mobile/getPhoto/${data.photo}`}}
                            />
                            <View style={[styles.indicator, {backgroundColor: status}]}></View>
                        </View>
                        <View style={{marginTop: 6}}>
                            <Text style={styles.documentId}>{data.id}</Text>
                        </View>
                    </View>

                    <View style={styles.right}>

                        <View style={styles.documentType}>
                            <Text style={styles.documentTypeText}>{documentType(data.type)}</Text>
                        </View>

                        <View style={{flexDirection: 'row', flex: 4}}>

                            <View style={styles.documentColumn}>
                                <Text style={styles.propertyTitle}>NAME</Text>
                                <Text style={styles.propertyValue}>{user.name}</Text>
                                <Text style={styles.propertyTitle}>LAST NAME</Text>
                                <Text style={styles.propertyValue}>{user.lastName}</Text>
                            </View>

                            <View style={styles.documentColumn}>
                                <Text style={styles.propertyTitle}>RELEASE DATE</Text>
                                <Text style={styles.propertyValue}>{moment(data.releaseDate).format('DD-MM-YYYY')}</Text>
                                <Text style={styles.propertyTitle}>EXPIRE DATE</Text>
                                <Text style={styles.propertyValue}>{moment(data.expireDate).format('DD-MM-YYYY')}</Text>
                            </View>

                        </View>

                    </View>
                </View>
            </TouchableHighlight>
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
        flexDirection: 'row',
        height: 125,
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 5,
    },
    left: {
        flex: 1,
        alignItems: 'center',
    },
    right: {
        flex: 2
    },
    image: {
        height: 85,
        width: 85,
        borderColor: '#dcdcdc',
        borderRadius: 100,
        borderWidth: 1,
    },
    imageContent: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    documentId: {
        fontFamily: 'ubuntu',
        fontSize: 12
    },
    documentType: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    documentTypeText: {
        fontFamily: 'ubuntu'
    },
    documentColumn: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    propertyTitle: {
        fontFamily: 'ubuntu',
        fontSize: 8,
        color: '#969696',
        marginBottom: 5
    },
    propertyValue: {
        fontFamily: 'ubuntu',
        fontSize: 12,
        marginBottom: 5
    },
    indicator: {
        position: 'absolute',
        height: 15,
        width: 15,
        bottom: 3,
        right: 6,
        borderRadius: 100
    }
});
