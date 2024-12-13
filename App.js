import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginScreen} from "./screens/LoginScreen";
import {HomeScreen} from "./screens/HomeScreen";
import {CreateAccountScreen} from "./screens/CreateAccountScreen";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

const Stack = createNativeStackNavigator();


export default function App() {
    useEffect(() => {
        // Este bloque se ejecuta cuando el componente se monta
        GoogleSignin.configure({
            webClientId: '390079309516-9isa00bmlngp3a126s4j37apv9sdr32n.apps.googleusercontent.com', // Aquí pon tu Web Client ID de la consola de Google
            offlineAccess: true,
        });
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerStyle: {backgroundColor: '#1E1E1E'},
                        headerTintColor: '#fff',
                        headerTitleStyle: {fontWeight: 'bold'},
                        title: 'Inicio',
                    }}
                />
                <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccountScreen}
                    options={{
                        headerStyle: {backgroundColor: '#1E1E1E'},
                        headerTintColor: '#fff',
                        headerTitleStyle: {fontWeight: 'bold'},
                        title: 'Crear cuenta',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
