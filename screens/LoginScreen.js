import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {initializeApp,} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential} from "firebase/auth";
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {StatusBar} from "expo-status-bar";
import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import 'firebase/firestore';
import {FullWindowOverlay} from "react-native-screens";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function LoginScreen() {


    /*useEffect(() => {
        // Si no funciona en app des comentar este
        // Este bloque se ejecuta cuando el componente se monta
        GoogleSignin.configure({
            webClientId: '390079309516-9isa00bmlngp3a126s4j37apv9sdr32n.apps.googleusercontent.com', // Aquí pon tu Web Client ID de la consola de Google
            offlineAccess: true,
        });
    }, []);*/
    const navigation = useNavigation();


    const signInWithGoogle = async () => {
        setIsLoading(true);
        Keyboard.dismiss();
        try {
            await GoogleSignin.signOut();

            const {data} = await GoogleSignin.signIn();
            const idToken = data.idToken
            const googleCredential = GoogleAuthProvider.credential(idToken);
            const result = await signInWithCredential(auth, googleCredential); // Guardar en firebase
            console.log('Usuario autenticado con Google');
            navigation.popTo('Home');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('El usuario canceló el inicio de sesión');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('El inicio de sesión ya está en progreso');
            } else {
                console.log('Error al iniciar sesión con Google', error.message);
            }
        }finally {
            setIsLoading(false);
        }
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    let passUse;


    useEffect(() => {
        setErrorPass(password === passUse);
    }, [password]);

    const handleSignIn = () => {

        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //const user = userCredential.user; Asi tomo information del user
                navigation.navigate('Home');
            }).catch(error => {
            if (error.code === 'auth/invalid-credential') {
                setErrorPass(true);
                console.log('Error de contraseña');
            }

        }).finally(() =>
            setIsLoading(false)
        );
    }

    return (
        <View style={styles.container}>
            {isLoading && (
                <FullWindowOverlay style={styles.overlay}>
                    <ActivityIndicator size="large" color="#FFFF"/>
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
                {
                    errorPass && (
                        <Text style={styles.errorMessage}>Contraseña incorrecta</Text>
                    )
                }
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <View style={styles.separator}>
                    <View style={styles.line}/>
                    <Text style={styles.separatorText}>O</Text>
                    <View style={styles.line}/>
                </View>
                <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            source={require('../assets/google-logo.png')}
                            style={{width: 35, height: 35, marginRight: 8}}
                        />
                        <Text style={{color: '#555', fontSize: 16, fontWeight: 'bold'}}>Continuar con Google</Text>
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
        shadowOffset: {width: 0, height: 2},
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
        shadowOffset: {width: 0, height: 2},
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
        shadowOffset: {width: 0, height: 2},
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
        shadowOffset: {width: 0, height: 2},
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
        zIndex: 999
    },
    errorMessage: {
        color: '#EF3727',
        marginTop: 5,
        fontSize: 14
    }
});

