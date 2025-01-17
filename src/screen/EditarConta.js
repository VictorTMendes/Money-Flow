import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, FlatList, Alert, TextInput, Switch } from 'react-native';
import { GlobalContext } from './../GlobalState';
import Constants from 'expo-constants';

export default function EditarContas({ route, navigation}) {
    const { accountInfo, setAccountInfo } = useContext(GlobalContext);
    const { item } = route.params;

    const [ title, setTitle ] = useState(item.value)
    const [ value, setValue ] = useState(item.value.toString())
    const [isPaid, setIsPaid] = useState(item.isPaid || false)

    const handleSave = () => {
        if (title && value) {
            const updatedAccount = { ...item, title, value: parseFloat(value), isPaid}
            setAccountInfo((prev) => prev.map(acc => (acc.id === item.id ? updatedAccount : acc)))
            navigation.goBack()
        } else {
            Alert.alert("Erro", "Por favor preencha todos os campos.")
        }
    }

    const handleDelete = () => {
        Alert.alert(
            "Excluir item",
            "Você tem certeza que deseja excluir este item?",
            [
                { text: "Cancelar", style: "cancel"},
                {
                    text: "Excluir",
                    onPress: () => {
                        setAccountInfo((prev) => prev.filter(acc => acc.id !== item.id))
                        navigation.navigate('Geral')
                    }
                }
            ]
        )
    }

    return (
        <View style={[styles.area, {paddingTop: Constants.statusBarHeight}]}>

            <View style={styles.cabecalho}>
                <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.navigate('Geral')}>
                    <View>
                        <Image 
                        source={require('./../img/angulo-esquerdo.png')}
                        style={styles.imageBtn}
                        />
                    </View>
                    <View>
                        <Text style={styles.txtVoltar}>Voltar</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Editar Conta</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
            />

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Pago:</Text>
                <Switch 
                value={isPaid}
                onValueChange={setIsPaid}
                />
            </View>

            <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={[styles.button, styles.deleteButton]}>
                <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2c2c2d',
        display: 'flex',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#3B3B3B',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
        color: '#fff',
        fontSize: 16
    },
    button: {
        backgroundColor: '#E7FC00',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        marginTop: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchText: {
        color: '#fff',
        marginRight: 10,
    },
    cabecalho:{
        height: 30,
        marginBottom: 10
      },
      btnVoltar:{
        height:20,
        marginTop: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
      },
      imageBtn:{
        width: 20,
        height: 20
      },
      txtVoltar:{
        color: '#E7FC00',
        paddingLeft: 5
      }
});

