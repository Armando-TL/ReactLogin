import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginScreen} from "./screens/LoginScreen";
import {HomeScreen} from "./screens/HomeScreen";
import {CreateAccountScreen} from "./screens/CreateAccountScreen";


const Stack = createNativeStackNavigator();

export default function App() {
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
