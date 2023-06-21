import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InsetShadow from 'react-native-inset-shadow';
import { VariableContext } from "./AcceuilGlobalVar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width,
        height,
    },
    greeting_div: {
        flexDirection: "row",

        top: 10,
        left: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 4,
        },
        shadowOpacity: 0.43,
        shadowRadius: 10,

        elevation: 15,
    },
    greeting_txt: {
        fontSize: 35
    },
    greeting_username: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#1e8f57"
    },
    subGreeting_div:{
        top: 5,
        left: 30
    },
    subGreeting_txt: {
        fontSize: 20,
        fontStyle: "italic",
        color: "black",

        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 4,
        },
        shadowOpacity: 0.43,
        shadowRadius: 10,

        elevation: 15,
    },
    profil: {
        position: "absolute",
        right: 30,

        height: height / 15,
        width: width / 7
    },
    profilButton: {
        borderRadius: 100,

        shadowColor: "#000",
        shadowOffset: {
            width: -5,
            height: 8,
        },
        // shadowOpacity: 0.43,
        shadowRadius: 5,
        elevation: 10,
    },
    profilBorder: {
        top: 5,
        height: 70,
        width: 70,

        alignSelf: "center",

        borderColor: "#1e8f57",
        borderRadius: 100,
        borderWidth: 3,
    },
    adviceTitle_div: {
        top: height/10,
        left: 10
    },
    adviceTitle_txt: {
        fontSize: 22,
        fontStyle: "italic",

        textDecorationLine: "underline",
        textDecorationColor: "#1e8f57"
    },
    adviceContent_div: {
        height: height / 1.8,
        width: width / 1.15,

        top: 100,

        alignSelf: "center",

        borderRadius: 15,
    },
    adviceContent_txt: {
        width: width / 1.25,

        fontStyle: "italic",
        textAlign: "justify",

        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
    }
})

export default function Home1( { navigation, scrollX } ) {

    const { setScrollIndex } = useContext(VariableContext);
    const [userName, setUserName] = useState();
    const [logToken, setLogToken] = useState();

    async function getData() {
        try {
            setUserName(await AsyncStorage.getItem("@username"));
            setLogToken(await AsyncStorage.getItem("@logToken"));
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        getData();
    }, [userName])

    function gotoProfile() {
        navigation.navigate("Profile", {"logToken": logToken});
    }

    return (
        <View style={styles.container}>
            <View style={styles.greeting_div}>
                <Text style={styles.greeting_txt}>Bonjour, </Text>
                <Text style={styles.greeting_username}>{userName}</Text>
            </View>
            
            <View style={styles.subGreeting_div}>
                <Text style={styles.subGreeting_txt} >Prêt à faire à manger ?</Text>
            </View>
            
            <View style={styles.profil}>
                <Pressable onPress={gotoProfile} style={({ pressed }) => [{ shadowOpacity: pressed ? 0 : 0.43 }, styles.profilButton]}>
                    <Image source={require("../Img/PPDEMO.png")} style={styles.profilBorder} />
                </Pressable>
            </View>

            <View style={styles.adviceTitle_div}>
                <Text style={styles.adviceTitle_txt}>Voici quelques conseils diététiques</Text>
            </View>

            <InsetShadow
                containerStyle={styles.adviceContent_div}
                shadowRadius={8}
                shadowOffset={15}
                elevation={25}
                shadowOpacity={0.7}
            >
                <Text style={styles.adviceContent_txt}>Assurez-vous d'inclure une grande variété d'aliments dans votre alimentation quotidienne. Cela garantit que vous obtenez une gamme complète de nutriments essentiels.</Text>
                <Text style={styles.adviceContent_txt}>Contrôlez les portions de vos repas en utilisant des assiettes plus petites ou en mesurant les quantités. Évitez les excès et prenez le temps de manger lentement pour mieux ressentir la satiété.</Text>
                <Text style={styles.adviceContent_txt}>Optez pour des aliments entiers et non transformés autant que possible. Les fruits, les légumes, les céréales complètes, les protéines maigres et les sources de graisses saines devraient constituer la base de votre alimentation.</Text>
                <Text style={styles.adviceContent_txt}>Buvez suffisamment d'eau tout au long de la journée. L'eau aide à maintenir une bonne hydratation, favorise la digestion et aide à contrôler l'appétit.</Text>

            </InsetShadow>
        </View>
    )
}