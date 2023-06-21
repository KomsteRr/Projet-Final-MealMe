import React, { useState } from "react";
import { Text, Image, View, StyleSheet, Pressable, TextInput, Button, Alert, Dimensions } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MMLogo from './Img/mealme.png';

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        width: 300,
        height: 130,
        marginVertical: 15
    },
    br: {
        marginVertical: 70
    },
    Inpt: {
        borderColor: '#1e8f57',
        borderRadius: 20,
        borderWidth: 1,
        width: "65%",
        height: "10%",
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        paddingHorizontal: 15
    },
    submit: {
        borderRadius: 25,
        width: "55%",
        height: "15%",
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20
    }
})

export default function Login( { navigation } ) {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    async function storeData(token, username) {
        try {
            await AsyncStorage.setItem("@logToken", token);
            await AsyncStorage.setItem("@username", username);
        } catch (err) {
            throw err;
        }
    }

    async function handleSubmit() {
        // Alert.alert('info form', `Username: ${username}, Password: ${password}`);

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const body = JSON.stringify({
            "username": username,
            "password": password
        });

        await axios.post("http://127.0.0.1:8989/user/login", body, config)
            .then((res) => {
                if (res.data.message == "authentification réussie") {
                    // console.log(res.data.token);

                    storeData(res.data.token, username);

                    // console.log("username = " + username);

                    navigation.navigate("Acceuil");
                    
                } else {
                    Alert.alert("Une Erreur est survenue", "verifier que votre mot de passe et identifiant soit correcte")
                }
            })
            .catch((err) => {
                Alert.alert("Erreur", err.response.data.message);
            });


        //Front Dev connection
        // if (username == "Dev" && password == "dev") {
        //     navigation.navigate('Acceuil');
        // } else {
        //     Alert.alert("Identifiant/Mot de passe", "Identifiant ou Mot de passe incorrect ou innexistant");
        // }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.br} />

            <Image alt="MealMe Logo" source={MMLogo} style={styles.logo} />
            <View>
                <TextInput alt="Input Username" style={styles.Inpt} placeholder="Nom d'utilisateur" onChangeText={setUsername} />
                <TextInput alt="Input Password" style={styles.Inpt} placeholder="Mot de passe" onChangeText={setPassword} secureTextEntry={true} />
                <Button title="Mot de passe oublié" color={'black'} onPress={() => {Alert.alert('RIP', 'fonctionnalité en cour de dev')}} />

                <Pressable alt="Boutton de validation" style={({ pressed }) => [{ backgroundColor: pressed ? '#176e43' : '#1e8f57' }, styles.submit ]} onPress={handleSubmit}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>Connection</Text>
                </Pressable>
            </View>
        </View>
    )
}