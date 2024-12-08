import {Text, View, StyleSheet} from "react-native";
import React from "react";

export function HomeScreen() {
    return (
        <View style={styles.homeContainer}>
            <Text style={styles.homeText}>¡Bienvenido a la página principal OK!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
    },
})