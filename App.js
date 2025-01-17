import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalProvider } from './src/GlobalState.js'; // Import do Contexto
import TelaInicial from './src/screen/TelaInicial'; // Tela de boas-vindas
import TelaMenu from './src/screen/TelaMenu'; // Tela principal
import AdicionarConta from './src/screen/AdicionarConta';
import ContasGerais from './src/screen/ContasGerais';
import Perfil from './src/screen/Perfil';
import Editar from './src/screen/EditarConta';
import TotalRecebido from './src/screen/Saldo.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GlobalProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Inicial" component={TelaInicial} options={{ headerShown: false }} />
                    <Stack.Screen name="Menu" component={TelaMenu} options={{ headerShown: false }} />
                    <Stack.Screen name="Adicionar" component={AdicionarConta} options={{ headerShown: false }} />
                    <Stack.Screen name="Geral" component={ContasGerais} options={{ headerShown: false }} />
                    <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
                    <Stack.Screen name="Editar" component={Editar} options={{ headerShown: false }} />
                    <Stack.Screen name="TotalRecebido" component={TotalRecebido} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </GlobalProvider>
    );
}