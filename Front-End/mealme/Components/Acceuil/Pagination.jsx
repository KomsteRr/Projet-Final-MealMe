import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
import React, { useState } from 'react'

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center", 
        // backgroundColor: "lightgreen",
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3, 
        backgroundColor: '#ccc'
    }
})

const dots = [0, 1, 2, 3];

export default function Pagination({scrollX}) {
    
    return (
        <View style={styles.container}>
        {dots.map((idx) => {
            const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
            
            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [12, 30, 12],
                extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.7, 1, 0.7],
                extrapolate: 'clamp',
            });

            const backgroundColor = scrollX.interpolate({
                inputRange,
                outputRange: ["#ccc", "#404040", "#ccc"],
                extrapolate: 'clamp',
            });

            return <Animated.View key={idx.toString()} style={[styles.dot, {width: dotWidth, backgroundColor, opacity}]} />;

        })}
    </View>
  )
} 