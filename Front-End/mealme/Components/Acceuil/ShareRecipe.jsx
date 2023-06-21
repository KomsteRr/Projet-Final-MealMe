import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ItemIng from "./ItemIng";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        width,
        height: height/1.3,
    },
    part_title: {
        fontSize: 20,
        textDecorationLine: "underline",
        textDecorationColor: "#1e8f57",
        marginVertical: 2.5,
        marginHorizontal: 5
    },
    ingredientPart: {
        height: height / 2.6
    },
    button: {
        marginVertical: 10,
        marginBottom: -5,
        height: "15%",
        width: "65%",
        borderRadius: 25,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "row"
    },
    recipePart: {
        height: height / 2.2

    },
    textarea: {
        width: width / 1.05,
        height: height / 3.5,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: "center",
        borderRadius: 15,
        backgroundColor: "lightgray",
        textAlignVertical: "top"
    },
    divider: {
        width: "99%",
        height: 5,
        borderRadius: 25,
        alignSelf: "center",
        marginTop: 15,
        backgroundColor: "darkgreen"
    }
})

export default function ShareRecipe() {

    const [ingredients, setIngredients] = useState([]);
    const [ingList, setIngList] = useState([]);
    const [ingArray, setIngArray] = useState([]);
    const [recipe, setRecipe] = useState();

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
                "Content-Type": "applications/json",
                Authorization: `Bearer ${logToken}`
            }
        }

        await axios.get("http://127.0.0.1:8989/recipes/ingredientsList", config)
            .then((res) => {
                // console.log(res.data.result);
                setIngList(res.data.result);
            })
            .catch((err) => {
                // Alert.alert("Erreur", err.response.data.message);
            })

        return ingList;
    }

    function onUpdateIngArray(newData) {
        setIngArray([...ingArray, newData]);
    }

    function addIngredient() {
        const arr = [... ingredients];

        // console.log(ingList);

        arr.push(<ItemIng key={arr.length} ingList={ingList} onUpdateIngArray={onUpdateIngArray} getIngredient={getIngredients()} />);


        setIngredients(arr);

        this.scrollIng.scrollToEnd({animated: true});
    }

    useEffect(() => {        
        getData()
        getIngredients();
    }, [])
    
    setScrollIng = (element) => {
        this.scrollIng = element;
    }

    async function Share() {
        const recipeName = await askName();
        const nbPerson = await askNbPerson();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logToken}`
            }
        };

        const body = JSON.stringify({
            "recipeName": recipeName,
            "recipeIngredients": ingArray,
	        "recipeRecipe": recipe,
            "nbPerson": nbPerson
        });

        console.log(body);

        await axios.post("http://127.0.0.1:8989/recipes/share", body, config)
            .then((res) => {
                Alert.alert(res.data.message);

                this.recipeInpt.clear();
                setIngredients([]);
            })
            .catch((err) => {
                Alert.alert("Erreur", err.response.data.message);
            });

    }

    function askName() {
        return new Promise((res) => {
            Alert.prompt(
                'Nom de la recette',
                null,
                [
                    {
                        text: "Valider",
                        onPress: (value) => res(value)
                    }
                ]
            )
        })
    }

    function askNbPerson() {
        return new Promise((res) => {
            Alert.prompt(
                'Nombre de personne',
                'Pour combien de personne la recette est ?',
                [
                    {
                        text: 'valider',
                        onPress: (value) => res(value)
                    }
                ]
            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.ingredientPart}>
                <Text style={styles.part_title}>Liste d'ingredients</Text>
                    <ScrollView style={styles.ingredientPart} ref={this.setScrollIng}>
                        {ingredients.map((item, index) => {
                            return (
                                item
                            )
                        })}
                    </ScrollView>
                <View style={styles.divider} />
                <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? '#176e43' : '#1e8f57' }, styles.button ]}
                    onPress={() => {addIngredient()}}
                >
                    <Text style={{fontSize: 20}}>Ajouter un ingredient</Text>
                </Pressable>
            </View>
            <View style={styles.divider} />
            <View style={styles.recipePart}>
                <Text style={styles.part_title}>Texte de la recette</Text>
                <TextInput
                    style={styles.textarea}
                    multiline={true}
                    onChangeText={text => {setRecipe(text)}}
                    ref={recipeInpt => { this.recipeInpt = recipeInpt }}
                />
                <Pressable style={({ pressed }) => [{ backgroundColor: pressed ? '#176e43' : '#1e8f57' }, styles.button ]} onPress={() => {Share()}}>
                    <Text style={{fontSize: 20}} >Proposer la recette</Text>
                </Pressable>
            </View>
        </View>
    )
}