import React, { useState, useEffect, useCallback } from "react";
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View, RefreshControl } from "react-native";
import InsetShadow from 'react-native-inset-shadow';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemFav from "./ItemFav";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        width,
        height: height / 1.25,
    },
    NoFav: {
        fontSize: 12,
        alignSelf: "center",
        textAlign: "center",
        top: 250,
        fontWeight: "bold",
        fontSize: 25
    }
})

export default function Favoris( { navigation } ) {

    const [username, setUsername] = useState();
    const [logToken, setLogToken] = useState();
    const [favRecipe, setFavRecipe] = useState([]);

    useFocusEffect(() => {
        getFavs();
    })

    async function getData() {
        try {
            setLogToken(await AsyncStorage.getItem("@logToken"));
            setUsername(await AsyncStorage.getItem("@username"));
            return true;
        } catch (err) {
            throw err;
        }
    }

    async function getFavs() {
        const config = {
            headers: {
                "Content-Type": "applications/json",
                Authorization: `Bearer ${logToken}`
            }
        }

        // console.log(config);
    
        await axios.get("http://127.0.0.1:8989/recipes/favorites", config)
            .then((res) => {
                // console.log("result :");
                console.log(res.data);
                if (res.status == 200) {
                    setFavRecipe(res.data.result);
                    console.log("TESTTTT");
                    console.log(favRecipe);
                }
            })
            .catch((err) => {
                if (err.response.data.message == "Aucun favoris trouvé") {
                    setFavRecipe(null);
                } else if (err.response.data.message != "vous devez être connecté") {
                    Alert.alert("Erreur", err.response.data.message);
                }
            });
    }

    useEffect(() => {
        getData();
        getFavs();
    }, [logToken]);

    function renderItem() {
        if (favRecipe == null) {
            return (<Text style={styles.NoFav} key={1}>Aucun Favori</Text>)
        } else {
            return (
                favRecipe.map((datas, index) => <ItemFav key={index} navigation={navigation} data={datas} />)
            )
        }
    }

    return (
        <InsetShadow
            containerStyle={styles.container}
            shadowRadius={20}
            shadowOffset={25}
            elevation={25}
            shadowOpacity={0.5}
            color="rgba(128,128,128,1)"
            right={false}
            left={false}
            top={false}
        >
            <ScrollView>
                <View>
                    {/* <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} />
                    <ItemFav navigation={navigation} data={data} /> */}
                    {/* <ItemFav navigation={navigation} data={data} /> */}
                    {renderItem()}
                </View>
            </ScrollView>
        </InsetShadow>
    )
}