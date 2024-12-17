import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { FullWindowOverlay } from "react-native-screens";
import auth from "@react-native-firebase/auth";

export function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorPass, setErrorPass] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isFormValid = emailRegex.test(email) && password.length > 7;
    const inputsEmpty = email.length > 0 && password.length > 0;

    useEffect(() => {
        setErrorPass(false);
    }, [password]);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email, password);
            navigation.popTo('Home');
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                setErrorPass(true);
                console.log('Error de contraseña');
            } else {
                console.log("Exception in method handleSignIn: " + error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setIsLoading(true);
        Keyboard.dismiss();
        try {
            await GoogleSignin.signOut();
            const { data } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
            await auth().signInWithCredential(googleCredential);
            console.log('Usuario autenticado con Google');
            navigation.popTo('Home');
        } catch (error) {
            handleGoogleSignInError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignInError = (error) => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('El usuario canceló el inicio de sesión');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('El inicio de sesión ya está en progreso');
        } else {
            console.log('Error al iniciar sesión con Google', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && (
                <FullWindowOverlay style={styles.overlay}>
                    <ActivityIndicator size="large" color="#FFFF" />
                </FullWindowOverlay>
            )}
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
                {!emailRegex.test(email) && email.length > 0 && (
                    <Text style={styles.errorMessage}>Correo no válido</Text>
                )}
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Contraseña"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                {errorPass && (
                    <Text style={styles.errorMessage}>Contraseña incorrecta</Text>
                )}
                <TouchableOpacity style={[styles.button, !isFormValid && (styles.buttonDisabled)]} onPress={handleSignIn} disabled={!isFormValid}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <View style={styles.separator}>
                    <View style={styles.line} />
                    <Text style={styles.separatorText}>O</Text>
                    <View style={styles.line} />
                </View>
                <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
                    <View style={styles.googleButtonContent}>
                        <Image source={require('../assets/google-logo.png')} style={styles.googleLogo} />
                        <Text style={styles.googleButtonText}>Continuar con Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('CreateAccount')}>
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
    buttonDisabled : {
        backgroundColor: "#83a67f",
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
    googleButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    googleLogo: {
        width: 35,
        height: 35,
        marginRight: 8,
    },
    googleButtonText: {
        color: '#555',
        fontSize: 16,
        fontWeight: 'bold',
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
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        width: '110%',
        height: '110%',
        zIndex: 999,
    },
    errorMessage: {
        color: '#EF3727',
        marginTop: 5,
        fontSize: 14,
    },
});
