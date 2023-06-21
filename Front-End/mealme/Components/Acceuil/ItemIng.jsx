import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: height / 200,
    },
    dropdown: {
        width: width / 2,
        backgroundColor: "lightgray",
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 25,
        // borderWidth: 3,
        // borderColor: "lightgreen",
    },
    number: {
        width: width / 2.5,
        backgroundColor: "lightgray",
        paddingHorizontal: 15,
        marginHorizontal: 15,
        borderRadius: 25,
        // borderWidth: 3,
        // borderColor: "lightgreen",
    },
})

export default function ItemIng( { ingList, onUpdateIngArray } ) {
    const [data, setData] = useState([]);
    const [test, setTest] = useState([{"name": "Loading", "id": "loading"}]);

    const [qtt, setQtt] = useState();
    const [Ing, setIng] = useState();

    function returnValue() {
        let ingr = {
            name: Ing,
            quantity: qtt
        };

        onUpdateIngArray(ingr);
    }
    useEffect(() => {
        if (ingList != null && data.length == 0) {
          setData(ingList);
        }

      }, [ingList, data]);
      

  return (
    <View style={styles.container}>
        <Dropdown
            data={data}
            search
            searchPlaceholder='Chercher un ingredient'
            placeholder='Choisir un ingredient'
            onChange={item => {setIng(item.name); returnValue();}}
            labelField="name"
            valueField="id"
            style={styles.dropdown}
        />
        <TextInput
        style={styles.number}
            inputMode='decimal'
            onChangeText= {number => {setQtt(number); returnValue();}}
        />
        
    </View>
  )
}
