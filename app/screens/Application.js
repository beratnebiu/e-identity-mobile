import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import moment from "moment";

import {documentType, applicationStatus} from "../services/global";

const getFonts = () =>
    Font.loadAsync({
        langar: require("../assets/fonts/Langar/Langar-Regular.ttf"),
        ubuntu: require("../assets/fonts/Ubuntu/Ubuntu-Regular.ttf"),
    });

export default function Application({data}) {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    let status = '';

    switch (data.status) {
        case 0:
            status = 'gray'
            break;
        case 1:
            status = '#218003'
            break;
        case 2:
            status = '#ab2800'
            break;
        case 3:
            status = 'transparent'
            break;
    }

    return (
        fontsLoaded ?
            <View style={styles.container}>

                <View style={{flexDirection: 'row', flex: 4}}>

                    <View style={styles.applicationColumn}>
                        <Text style={styles.applicationTypeText}>{documentType(data.type)}</Text>
                    </View>

                    <View style={styles.applicationColumn}>
                        <Text style={styles.propertyTitle}>APPLICATION DATE</Text>
                        <Text style={styles.propertyValue}>{moment(data.applicationDate).format('DD-MM-YYYY')}</Text>
                        <Text style={styles.propertyTitle}>STATUS</Text>
                        <Text style={styles.propertyValue}>{applicationStatus(data.status)}</Text>
                        <View style={[styles.indicator, {backgroundColor: status}]}></View>
                    </View>

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
        flexDirection: 'column',
        height: 80,
        margin: 10,
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
    applicationTypeText: {
        fontFamily: 'ubuntu'
    },
    applicationColumn: {
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
        height: 20,
        width: 20,
        top: 20,
        right: 6,
        borderRadius: 100
    }
});
