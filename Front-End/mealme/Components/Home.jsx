import React, { useEffect } from "react";
import {View, Text, Image, ScrollView, TextInput, StyleSheet, Button, Pressable, Alert, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MMLogo from "./Img/mealme.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

export default function Home( { navigation } ) {
    const styles = StyleSheet.create({
        logo: {
            alignSelf: 'center',
            width: 300,
            height: 130,
            marginVertical: 150
        },
        form: {
            marginVertical: -70,
        },
        Btn: {
            // backgroundColor: '#1e8f57',
            borderRadius: 25,
            width: "55%",
            height: "15%",
            alignSelf: 'center',
            justifyContent: 'center',
            marginVertical: 30
        }

    });

    function redirect_login() {
        navigation.navigate('Login');
    }

    function redirect_signin() {
        // Alert.alert("test", 'test2');
        navigation.navigate('Register');
    }

    async function CleanStorage() {
        await AsyncStorage.removeItem("@username");
        await AsyncStorage.removeItem("@logToken");
    }

    useEffect(() => {
        CleanStorage();
    })

    return (
        <View style={styles.container}>
            <Image source={MMLogo} style={styles.logo} alt="MealMe Logo" />
            <View style={styles.form}>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#176e43' : '#1e8f57' }, styles.Btn ]} alt="Boutton de connection" onPress={redirect_login}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>Connection</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#176e43' : '#1e8f57' }, styles.Btn ]} alt="Boutton d'inscritpion" onPress={redirect_signin}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>Inscription</Text>
                </Pressable>
            </View>
        </View>

    )
}