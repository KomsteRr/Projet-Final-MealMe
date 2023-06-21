import React, { useState } from "react";
import { Alert, Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import MMLogo from './Img/mealme.png';
import axios from "axios";

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
        height: "8%",
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        paddingHorizontal: 15
    },
    submit: {
        borderRadius: 25,
        width: "55%",
        height: "10%",
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 20
    }
})

export default function Register( { navigation } ) {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    async function register() {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const body = JSON.stringify({
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            email: email
        })

        await axios.post("http://127.0.0.1:8989/user/register", body, config)
            .then((res) => {
                Alert.alert(res.data.message, "Vous allez être redirigé vers la page de connection");
                navigation.navigate('Login');
            })
            .catch((err) => {
                Alert.alert("Erreur", err.response.data.message);
            })
    }

    async function handleSubmit() {
        if (password != confirmPassword) {
            Alert.alert("Erreur", "Veuillez faire en sorte que votre mot de passe soit identique");
        } else {
            await register();
        }

        // Alert.alert('Info Creation Compte', `Username: ${username}, email: ${email}, password: ${password}, confirmPassword: ${confirmPassword}`)
    }

    return(
        <View>
            <Text style={styles.br} />
            
            <Image alt="MealMe Logo" source={MMLogo} style={styles.logo} />
            <View>
                <TextInput alt="Input Username" style={styles.Inpt} placeholder="Nom d'utilisateur" onChangeText={setUsername} />
                <TextInput alt="Input Email" style={styles.Inpt} placeholder="Adresse mail" onChangeText={setEmail} textContentType={"emailAddress"} inputMode={"email"} />
                <TextInput alt="Input Password" style={styles.Inpt} placeholder="Mot de passe" onChangeText={setPassword} secureTextEntry={true} />
                <TextInput alt="Input Confirm Password" style={styles.Inpt} placeholder="Confirmer le mot de passe" onChangeText={setConfirmPassword} secureTextEntry={true} />
                
                <Button title="Deja un compte ?" onPress={() => {navigation.navigate('Login')}} />
                
                <Pressable alt="Boutton de creation de compte" style={({ pressed }) => [{ backgroundColor: pressed ? '#176e43' : '#1e8f57' }, styles.submit ]} onPress={handleSubmit}>
                    <Text style={{alignSelf: 'center', fontSize: 20}}>Créer le compte</Text>
                </Pressable>
            </View>
        </View>
    );
    
}