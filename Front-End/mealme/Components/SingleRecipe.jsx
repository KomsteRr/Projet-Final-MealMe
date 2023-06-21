import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        height,
        width,
        marginTop: 50,
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
    RecipeImage: {
        height: 100,
        width: 100
    },
    topInfo: {
        flexDirection: "row",
    },
    topInfoTitle: {
        marginLeft: 5,

        fontSize: 25,
        fontWeight: "bold",

        textDecorationLine: 'underline',
        textDecorationColor: "#1e8f57",
        textDecorationStyle: "double"
    },
    topInfoNbPerson: {
        position: "absolute",
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
        right: 15
        // marginVertical: 10,
    },
    topInfoNbPersonNumber: {
        paddingHorizontal: 2.5,
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 4
    },
    recipeIngredients: {
        marginTop: 25,
        marginLeft: 10
    },
    catTitre: {
        fontSize: 30,
        fontWeight: "bold",

        textDecorationColor: "#1e8f57",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    ingredients: {
        flexDirection: "row",

        marginTop: 6,
        marginLeft: 5,

        fontSize: 15,
        fontWeight: "600",
        fontStyle: "italic",
    },
    recipe: {
        marginTop: 10,
        marginRight: 10,

        textAlign: "justify",
    },
    favBtn: {
        position: "absolute",
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
        right: 15
    }
})

export default function SingleRecipe( { route, navigation } ) {
    const [logToken, setLogToken] = useState();
    const [isfav, setIsFav] = useState(false);
    const [favList, setFavList] = useState([]);
    const { data } = route.params;

    async function getData() {
        try {
            setLogToken(await AsyncStorage.getItem("@logToken"));
            await checkFavs();
        } catch (err) {
            throw err;
        }
    }

    function returnBackwrd() {
        navigation.navigate('Acceuil');
    }

    async function checkFavs() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logToken}`
            }
        }

        await axios.get("http://127.0.0.1:8989/recipes/favList", config)
        .then((res) => {
            if (res.status == 200) {
                setFavList(res.data.result.favlist);

                for (const id of favList) {
                    if (id == data.id) {
                        setIsFav(true);
                        break;
                    }
                }

            }
        })
        .catch((err) => {
            if (err.response.data.message != "vous devez être connecté") {
                if (err.response.data.message != "Aucun favoris trouvé") {
                    Alert.alert("Erreur", err.response.data.message);
                }
            }
        });
    }

    function isFav(fav) {
        if (fav) {
            return (
                <TouchableOpacity style={styles.favBtn} onPress={removeFromFav}>
                    <Icon name="heart" size={50} color={"red"} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.favBtn} onPress={addToFav}>
                    <Icon name="heart-outline" size={50} color={"red"} />
                </TouchableOpacity>
            );
        }
    }
    
    async function removeFromFav() {
        let arr = favList;
        let arr2 = [];

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logToken}`
            }
        }

        for (let index = 0; index < arr.length; index++) {
            if (arr[index] != data.id) {
                if (!(((arr[index] == "," && arr[index - 1] == data.id )) || (arr[index] == "," && arr[index + 1] == data.id ))) {
                    arr2 += arr[index];
                }
            }
        }
        
        const body = JSON.stringify({
            favlist: arr2
        })

        await axios.post("http://127.0.0.1:8989/recipes/setFav", body, config)
            .then((res) => {
                navigation.navigate("SingleRecipe", {"data": data});
            })
            .catch((err) => {
                if (err.response.data.message != "vous devez être connecté") {
                    if (err.response.data.message != "Aucun favoris trouvé") {
                        Alert.alert("Erreur", err.response.data.message);
                    }
                }
            })
    }

    async function addToFav() {
        let arr = favList;
        let arr2 = [];

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${logToken}`
            }
        }
        
        for (let index = 0; index < arr.length - 1; index++) {
            arr2 += arr[index];      
        }

        if (arr.length == 2) {
            arr2 += data.id + "]";
        } else {
            arr2 += "," + data.id + "]";
        }
        
        const body = JSON.stringify({
            favlist: arr2,
            favId: data.id
        })

        await axios.post("http://127.0.0.1:8989/recipes/setFav", body, config)
            .then((res) => {
                Alert.alert("succes", res.data.message);
                navigation.navigate("SingleRecipe", {"data": data});
            })
            .catch((err) => {
                if (err.response.data.message != "vous devez être connecté") {
                    if (err.response.data.message != "Aucun favoris trouvé") {
                        Alert.alert("Erreur", err.response.data.message);
                    }
                }
            })

    }

    useEffect(() => {
        getData();
    })

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.returnBackwrd} onPress={returnBackwrd} >
                <Icon name="chevron-left" size={40} color={"black"} />
                <Text style={styles.returnBackwrd_txt} >Retour</Text>
            </TouchableOpacity>

            {isFav(isfav)}

            <View style={styles.topInfo} >
                <Text style={styles.topInfoTitle} >{data.name}</Text>

                <View style={styles.topInfoNbPerson}>
                    <Text style={styles.topInfoNbPersonNumber}>{data.nbPerson}</Text>
                    <Icon name="account-group" size={25} color={"darkblue"} />
                </View>
            </View>

            <View style={styles.recipeIngredients}>
                <Text style={styles.catTitre}>Ingredients</Text>

                <View style={{marginTop: 5, marginBottom: 5}}>
                    {
                        JSON.parse(data.ingredients).map(function(ingredient, index) {
                            return (
                                <View style={{flexDirection: "row"}} key={index}>
                                    <Icon name="fridge-outline" size={30} color={"#2b5541"} />
                                    <Text style={styles.ingredients}>{ingredient.name} : {ingredient.quantity}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <Text style={styles.catTitre}>Recette</Text>

                <Text style={styles.recipe}>{data.recipe.replace(/\\n/g,'\n')}</Text>
            </View>

            <View style={{height: 50}} />
        </ScrollView>
    );
}