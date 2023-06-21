import React, { useState, useEffect } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InsetShadow from 'react-native-inset-shadow';
import ItemSearch from "./ItemSearch";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("screen");

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

export default function RecipeSearch( { navigation, route } ) {

    const { data } = route.params;

    const [searchRecipe, setSearchRecipe] = useState([]);

    useEffect(() => {
        console.log(data);
        setSearchRecipe(data[0]);
    }, [])

    function renderItem() {
        if (searchRecipe == null) {
            return (<Text style={styles.NoFav} key={1}>Aucun Recette</Text>)
        } else {
            return (
                searchRecipe.map((datas, index) => <ItemSearch key={index} navigation={navigation} data={datas} />)
            )
        }
    }

    function returnBackwrd() {
        navigation.navigate('Acceuil');
    }

    return (
        <View style={styles.body}>
            <TouchableOpacity style={styles.returnBackwrd} onPress={returnBackwrd} >
                <Icon name="chevron-left" size={40} color={"black"} />
                <Text style={styles.returnBackwrd_txt} >Retour</Text>
            </TouchableOpacity>
            <InsetShadow
                containerStyle={styles.container}
                shadowRadius={20}
                shadowOffset={25}
                elevation={25}
                shadowOpacity={0.5}
                color="rgba(128,128,128,1)"
                right={false}
                left={false}
                bottom={false}
            >
                <ScrollView>
                    <View>
                        {renderItem()}
                    </View>
                </ScrollView>
            </InsetShadow>
        </View>
    )
}