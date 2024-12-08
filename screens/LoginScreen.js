import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {Alert, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";

const { width } = Dimensions.get('window');

export function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig); // Inicializa la aplicación de Firebase
    const auth = getAuth(app); // Obtiene la instancia de autenticación

    const handleCreateUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuario creado con éxito
                console.log("User successfully created!");
                const user = userCredential.user;
                console.log(user);
                Alert.alert("¡Éxito!", "Usuario creado con éxito.");
            }).catch(error => {
            console.log(error);
            Alert.alert("Error", error.message);
        });
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuario autenticado con éxito
                console.log("User signed in successfully!");
                const user = userCredential.user;
                console.log(user);
                Alert.alert("¡Bienvenido!", "Inicio de sesión exitoso.");
                navigation.navigate('Home');
            }).catch(error => {
            console.log(error);
            Alert.alert("Error", error.message);
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Contraseña"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <View style={styles.separator}>
                    <View style={styles.line} />
                    <Text style={styles.separatorText}>O</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Google login')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/google-logo.png')} // Imagen del logo de Google
                            style={{ width: 35, height: 35, marginRight: 8 }}
                        />
                        <Text style={{ color: '#555', fontSize: 16, fontWeight: 'bold' }}>Continuar con Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createAccountButton} onPress={() => (
                    navigation.navigate('CreateAccount')
                )}>
                    <Text style={styles.createAccountText}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 10,
    },
    subtitle: {
        color: '#A9A9A9',
        fontSize: 16,
    },
    form: {
        width: 350,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#1E1E1E',
        width: '100%',
        height: 50,
        marginVertical: 10,
        color: '#FFFFFF',
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    button: {
        backgroundColor: '#4ADE80',
        width: '100%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        shadowColor: '#4ADE80',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    buttonText: {
        color: '#000000',
        fontWeight: '700',
        fontSize: 16,
    },
    separator: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#A9A9A9',
    },
    separatorText: {
        color: '#A9A9A9',
        marginHorizontal: 10,
        fontSize: 14,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        width: '100%',
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        padding: 10,
    },
    createAccountButton: {
        marginTop: 20,
        backgroundColor: '#1E1E1E',
        width: '100%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#4ADE80',
        shadowColor: '#4ADE80',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    createAccountText: {
        color: '#4ADE80',
        fontWeight: '700',
        fontSize: 16,
    },


});