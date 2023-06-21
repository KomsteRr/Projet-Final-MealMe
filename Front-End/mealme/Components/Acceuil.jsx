import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, ScrollView, StyleSheet, View } from "react-native";
import Home1 from "./Acceuil/Home1";
import Favoris from "./Acceuil/Favoris";
import ShareRecipe from "./Acceuil/ShareRecipe";
import SearchRecipe from "./Acceuil/SearchRecipe";
import Pagination from "./Acceuil/Pagination";
import { VariableContext } from "./Acceuil/AcceuilGlobalVar";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        // height,
        width,
        marginVertical: 65
    },
    slides: {
        height: height/1.2,
        marginBottom: -50
    }
})

export default function Acceuil( { navigation } ) {
    
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const { ScrollIndex } = useContext(VariableContext);
    const [logToken, setLogToken] = useState();
    const [username, setUsername] = useState();


    async function getData() {
        try {
            setLogToken(await AsyncStorage.getItem("@logToken"));
            setUsername(await AsyncStorage.getItem("@username"));
            
            console.log(username);
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        getData();
    })

    function handleOnScroll(event) {
        Animated.event([
            {
                nativeEvent: {
                    contentOffset: {
                        x: scrollX,
                    }
                }
            }
        ], {
            useNativeDriver: false,
        })(event);
    }

    const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
        // console.log('viewableItems', viewableItems);
        setIndex(viewableItems[0].index);
      }).current;
    
      const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
      }).current;

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                style={styles.slides}
                ref={(node) => this.scroll = node}
            >
                <Home1 scrollX={scrollX} navigation={navigation}/>
                <Favoris navigation={navigation} />
                <SearchRecipe navigation={navigation} />
                <ShareRecipe />
            </ScrollView>
            <Pagination scrollX={scrollX} index={index}/>
        </View>
    )
}