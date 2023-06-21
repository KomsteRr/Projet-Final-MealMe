import React, { useState, useEffect } from "react";
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ItemIng from "./ItemIng";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        height: height / 1.3,
        width,
    },
    button: {
        marginVertical: 10,
        marginBottom: -5,
        height: "5%",
        width: "65%",
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "row"
    },
    buttonSearch: {
        marginVertical: 10,
        marginBottom: -5,
        height: "10%",
        width: "65%",
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "row"
    },
    ing_part: {
        height: height / 1.5,
    },
    divider: {
        width: "95%",
        height: 5,
        borderRadius: 25,
        alignSelf: "center",
        marginTop: 15,
        backgroundColor: "darkgreen"
    }
})

export default function SearchRecipe( { navigation } ) {

    const [SearchIng, setSearchIng] = useState([]);
    // const [recipes, setRecipes] = useState([]);

    const [ingList, setIngList] = useState([]);
    const [ingArray, setIngArray] = useState([]);

    const [logToken, setLogToken] = useState();

    async function getData() {
        try {
            setLogToken(await AsyncStorage.getItem("@logToken"));
        } catch (err) {
            throw err;
        }
    }

    async function getIngredients() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logToken}`
            }
        }

        await axios.get("http://127.0.0.1:8989/recipes/ingredientsList", config)
            .then((res) => {
                setIngList(res.data.result);
            })
            .catch((err) => {
                // Alert.alert("Erreur", err.response.data.message);
            })

        return ingList;
    }

    function onUpdateIngArray(newData) {
        setIngArray([...ingArray, newData.name]);
    }

    function addSearchIng() {
        const arr = [... SearchIng];

        arr.push(<ItemIng key={arr.length} ingList={ingList} onUpdateIngArray={onUpdateIngArray} getIngredient={getIngredients()} />);


        setSearchIng(arr);

        this.ScrollSearch.scrollToEnd({animated: true});
    }

    function redirect(recipes) {
        navigation.navigate("RecipeSearch", {"data": recipes});
    }

    async function SearchRecipe() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logToken}`
            }
        }

        const body = JSON.stringify({
            ingredientsList: ingArray
        })

        await axios.post("http://127.0.0.1:8989/recipes/search", body, config)
            .then((res) => {
                if (res.status == 200 && res.data.result[0] != false) {
                    redirect(res.data.result);
                } else {
                    Alert.alert("Erreur", "Aucune recette trouvé");
                }
            })
            .catch((err) => {
                Alert.alert("Erreur", err.response.data.message);
            })
    }

    useEffect(() => {
        getData();
        getIngredients();
    }, [])

    setScrollSearch = (element) => {
        this.ScrollSearch = element;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.ing_part} ref={this.setScrollSearch}>
                {SearchIng.map((item) => {
                        return (
                            item
                        )
                    })}
            </ScrollView>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#176e43' : '#1e8f57' }, styles.button ]}
                onPress={() => {addSearchIng()}}
            >
                <Text style={{fontSize: 20}}>Ajouter un ingredient</Text>
            </Pressable>
            <Text style={styles.divider} />
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#176e43' : '#1e8f57' }, styles.buttonSearch ]}
                onPress={() => {SearchRecipe()}}
            >
                <Text style={{fontSize: 20}} >Rechercher</Text>
            </Pressable>
        </View>
    )
}