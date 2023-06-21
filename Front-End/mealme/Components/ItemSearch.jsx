import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        width,
        height: "auto",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    recipe_logo: {
        width: width / 6,
        height: width / 6,
        // flexDirection: "row",
        position: "absolute",
        // alignItems: "center",
        marginVertical: 30,
        marginLeft: 10,
        borderRadius: 55,
        // backgroundColor: "black"
        backgroundColor: "transparent"
    },
    recipe_title: {
        fontSize: 25,
        fontWeight: "bold",
        flexDirection: "column",
        alignSelf: "center",
    },
    recipe_shortDesc: {
        marginHorizontal: "20%",

        height: height / 10
    },
    recipe_howManyPP: {
        alignSelf: "flex-end",
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        marginHorizontal: 10
    },
    middle_Text: {
        paddingHorizontal: 2.5,
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 4
    },
    divider: {
        width: "99%",
        height: 7,
        borderRadius: 25,
        alignSelf: "center",
        marginTop: 15,
        backgroundColor: "darkgreen"
    }
})

export default function ItemSearch( { navigation, data } ) {

    function gotoItem() {
        navigation.navigate("SingleRecipe", {"data": data});
    }

  return (
    <Pressable  style={({ pressed }) => [{ backgroundColor: pressed ? '#e3e5e8' : 'transparent' }, styles.container]} onPress={gotoItem}>
        {/* <View style={styles.divider} /> */}
        <Text style={styles.recipe_title}>{data.name}</Text>
        <View style={styles.recipe_logo}>
            <Icon name="pot-steam" size={65} color={"gray"} />
        </View>
        <View style={styles.recipe_howManyPP}>
            <Text style={styles.middle_Text}>{data.nbPerson}</Text>
            <Icon name="account-group" size={25} color={"darkblue"} />
        </View>
        <View style={styles.recipe_shortDesc}>
            <Text style={{textAlign: "justify"}} >{data.recipe.replace(/\\n/g,'\n')}</Text>
        </View>
        <View style={styles.divider} />
    </Pressable>
  )
}
