import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from "react-native";
import { FullWindowOverlay } from "react-native-screens";
import auth from "@react-native-firebase/auth";

export function CreateAccountScreen() {
    // Estados
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailInUse, setEmailInUse] = useState(false);

    // Validaciones
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isCorrectPassword = password === confirmPassword;
    const isFormValid =
        emailRegex.test(email) &&
        password &&
        confirmPassword &&
        isCorrectPassword &&
        password.length > 7;

    // Resetear el error si el email cambia
    useEffect(() => {
        setEmailInUse(false);
    }, [email]);

    // Función para crear usuario
    const handleCreateUser = async () => {
        setIsLoading(true);
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            Alert.alert("¡Éxito!", "Usuario creado con éxito.");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setEmailInUse(true);
            } else if (error.code === "auth/invalid-email") {
                Alert.alert("Error", "El formato del correo electrónico no es válido.");
            } else {
                console.error(error);
                Alert.alert("Error", error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Carga */}
            {isLoading && (
                <FullWindowOverlay style={styles.overlay}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </FullWindowOverlay>
            )}

            {/* Encabezado */}
            <View style={styles.header}>
                <Text style={styles.title}>Regístrate</Text>
                <Text style={styles.description}>Crea tu cuenta para continuar</Text>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
                {/* Input de Email */}
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {emailInUse && (
                    <Text style={styles.errorMessage}>
                        Este correo está en uso, intenta con otro
                    </Text>
                )}
                {!emailRegex.test(email) && email.length > 0 && (
                    <Text style={styles.errorMessage}>Correo no válido</Text>
                )}

                {/* Input de Contraseña */}
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Contraseña"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {/* Confirmación de Contraseña */}
                <TextInput
                    style={[
                        styles.input,
                        { borderColor: isCorrectPassword ? "#FFFFFF" : "#EF3727" },
                    ]}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder="Repite tu contraseña"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {/* Mensajes de error */}
                {password.length > 0 && password.length < 7 && (
                    <Text style={styles.errorMessage}>
                        La contraseña es muy corta. Debe tener al menos 8 caracteres.
                    </Text>
                )}
                {!isCorrectPassword && confirmPassword.length > 0 && (
                    <Text style={styles.errorMessage}>Las contraseñas no coinciden.</Text>
                )}

                {/* Botón */}
                <TouchableOpacity
                    style={[
                        styles.btnSignIn,
                        (!isFormValid || isLoading) && styles.buttonDisabled,
                    ]}
                    disabled={!isFormValid || isLoading}
                    onPress={handleCreateUser}
                >
                    <Text style={styles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 10,
    },
    description: {
        color: "#A9A9A9",
        fontSize: 16,
    },
    form: {
        width: 350,
        alignItems: "center",
    },
    input: {
        width: "100%",
        height: 45,
        color: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#A9A9A9",
        marginVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    btnSignIn: {
        width: "90%",
        height: 40,
        marginTop: 20,
        backgroundColor: "#4ADE80",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        shadowColor: "#000000",
        shadowRadius: 3,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
    },
    buttonDisabled: {
        backgroundColor: "#83a67f",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
    },
    overlay: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    errorMessage: {
        color: "#EF3727",
        marginTop: 5,
        fontSize: 14,
    },
});
