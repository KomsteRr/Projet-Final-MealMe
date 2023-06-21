import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, Image, Alert} from 'react-native';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    body: {
        marginTop: 65
    },
    returnBackwrd: {
        flexDirection: "row",
    },
    returnBackwrd_txt: {
        fontSize: 20,
        fontWeight: "bold",

        marginTop: 7,
        marginLeft: -5,
    },
    profilBorder: {
        top: 35,
        height: 120,
        width: 120,

        alignSelf: "center",

        borderColor: "#1e8f57",
        borderRadius: 100,
        borderWidth: 3,
    },
    txt: {
        fontSize: 25,
        marginVertical: 10
    },
    container_txt: {
        marginVertical: 85,
        marginHorizontal: 15
    },
})

export default function Profile( { navigation, route } ) {
    const {logToken} = route.params;

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();

    async function getData() {
        const config = {
            headers: {
                "Content-Type": "applications/json",
                Authorization: `Bearer ${logToken}`
            }
        }

        await axios.get("http://127.0.0.1:8989/user/profil", config)
            .then((res) => {
                console.log(res.data);
                setUsername(res.data.result.username);
                setEmail(res.data.result.email);
                setRole(res.data.result.role);
            })
            .catch((err) => {
                Alert.alert("Erreur", err.response.data.message);
            })
    }

    function returnBackwrd() {
        navigation.navigate('Acceuil');
    }

    useEffect(() => {
        getData();
    })

    return (
        <View style={styles.body}>
            <TouchableOpacity style={styles.returnBackwrd} onPress={returnBackwrd} >
                <Icon name="chevron-left" size={40} color={"black"} />
                <Text style={styles.returnBackwrd_txt} >Retour</Text>
            </TouchableOpacity>
            <View style={styles.profil}>
                <Image source={require("./Img/PPDEMO.png")} style={styles.profilBorder} />
            </View>
            <View style={styles.container_txt}>
                <Text style={styles.txt}>Identifiant : {username}</Text>
                <Text style={styles.txt}>Email : {email}</Text>
                <Text style={styles.txt}>Mot de passe : {role}</Text>
            </View>
        </View>
    );
}

