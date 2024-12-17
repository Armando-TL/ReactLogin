import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

export function HomeScreen() {
    const navigation = useNavigation();

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await auth().signOut();
            console.log("Sesión cerrada");
            navigation.navigate("Login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.homeContainer}>
                <Text style={styles.homeText}>¡Bienvenido a la página principal OK!</Text>
            </View>
            <View style={styles.menu}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    accessibilityLabel="Cerrar sesión"
                >
                    <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    homeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    homeText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
    },
    menu: {
        padding: 20,
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#FF6347", // Tomate (rojo claro)
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        elevation: 3, // Sombra en Android
        shadowColor: "#000", // Sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    logoutButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
