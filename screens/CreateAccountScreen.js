import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React, {useState} from "react";

export function CreateAccountScreen() {

    const [email, setEmail] = useState("");
    const [_password, _setPassword] = useState("");
    const [password, setPassword] = useState("");

    let isCorrectPassword = _password === password;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    const isFormValid = emailRegex.test(email) && password && _password && isCorrectPassword;

    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.title}>Registrate</Text>
                <Text style={ styles.description}>Crea tu cuenta para continuar</Text>
            </View>
            <View style = {styles.form}>
                <TextInput
                style = {styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Correo electronico"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
                autoCapitalize="none"
                />
                <TextInput
                    style = {styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Contraseña"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect="none"
                />
                <TextInput
                    style = {[styles.input, {borderColor: isCorrectPassword ? '#FFFFFF': '#EF3727'}]}
                    onChangeText={_setPassword}
                    value={_password}
                    placeholder="Repite tu contraseña"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect="none"
                />
                {!isCorrectPassword && (
                    <Text style={{ color: '#EF3727', marginTop: 5, fontSize: 14 }}>
                        Las contraseñas no coinciden.
                    </Text>
                )}
                <TouchableOpacity
                    style={styles.btnSignIn} disabled={
                    !isFormValid
                }
                onPress={() => {
                        console.log("cuenta para continuar");
                }}
                >
                    <Text style={styles.buttonText}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center',
        marginBottom: 40
    },
    title: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 10
    },
    description: {
        color: '#A9A9A9',
        fontSize: 16,
    },
    form: {
        width: 350,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 45,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#A9A9A9',
        marginVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {width: 10, height: 10},

    },
    btnSignIn: {
        width: '90%',
        height: 40,
        marginTop: 20,
        backgroundColor: '#4ADE80',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000000",
        borderRadius: 8,
        shadowRadius: 3,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.3
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    }

})