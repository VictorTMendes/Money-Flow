// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para armazenar dados
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('Dados armazenados com sucesso');
    } catch (error) {
        console.error('Erro ao armazenar dados', error);
    }
};

// Função para recuperar dados
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.error('Erro ao recuperar dados', error);
    }
};

// Função para remover dados
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Dados removidos com sucesso');
    } catch (error) {
        console.error('Erro ao remover dados', error);
    }
};