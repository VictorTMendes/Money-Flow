import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, TextInput, Alert, FlatList } from 'react-native';
import { GlobalContext } from './../GlobalState';
import Constants from 'expo-constants';

let nextId = 0;

export default function AdicionarConta({ navigation}) {
    const { accountInfo, setAccountInfo, totalValue, setTotalValue } = useContext(GlobalContext);
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')

    const handleTitleChange = (text) => {
        setTitle(text)
    }

    const handleValueChange = (text) => {
        if (!isNaN(text) || text === '') {
            setValue(text)
        }
    }

    const handleSave = () => {
        if (title && value) {
          const newAccount = { id: nextId++, title, value: parseFloat(value) }; // Converte o valor para número
          setAccountInfo((prev) => [...prev, newAccount]); // Adiciona o novo objeto ao array
          setTitle(''); // Limpa o campo de título
          setValue(''); // Limpa o campo de valor
        } else {
          Alert.alert("Erro", "Por favor, preencha todos os campos.");
        }
      };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>Título: {item.title}</Text>
            <Text style={styles.itemText}>Valor: R${item.value}</Text>
        </View>
    )

    const handleDelete = (id) => {
        setAccountInfo((prev) => prev.filter(item => item.id !== id));
    };


    return(
        <View style={[styles.container, {paddingTop: Constants.statusBarHeight}]}>
            <View style={styles.mainContainer}>
                <View style={styles.cabecalho}>
                    <Text style={styles.titulo}>Informações da conta</Text>
                </View>
                <View style={styles.infoContaNova}>
                    <Text style={styles.pergunta}>Título:</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Escolha um nome'
                        placeholderTextColor='#6B6B6B'
                        underlineColorAndroid="transparent"
                        value={title}
                        onChangeText={handleTitleChange}
                    />
                     <Text style={styles.pergunta}>Valor:</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Somente números'
                        placeholderTextColor='#6B6B6B'
                        underlineColorAndroid="transparent"
                        value={value}
                        onChangeText={handleValueChange}
                        keyboardType='numeric'
                    />
                </View>
            </View>

            <View style={styles.areaBtn}>

                <TouchableOpacity title="Voltar" onPress={() => navigation.goBack()} style={styles.buttonSave}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity title="Salvar" onPress={handleSave} style={styles.buttonSave}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>

            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#2c2c2d',
        justifyContent: 'center',
        alignItems: ''
    },
    mainContainer:{
        backgroundColor: '#3B3B3B',
        margin: 20,
        padding:10,
        borderRadius: 20
    },
    cabecalho:{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#5E5E5E',
        display: 'flex',
        alignItems: 'center'
    },
    titulo:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        paddingBottom: 10
    }, 
    infoContaNova:{
        padding:20
    },
    pergunta:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    input:{
        backgroundColor: '#2C2C2D',
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        color: '#fff'
    },
    list: {
        marginTop: 20,
      },
      item: {
        backgroundColor: '#4B4B4B',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
      },
      itemText: {
        color: '#fff',
      },
      list: {
    marginTop: 20,
  },
  item: {
    backgroundColor: '#4B4B4B',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  itemText: {
    color: '#fff',
  },
  areaBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonSave:{
    backgroundColor: '#e7fc00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 150,
    height: 40
  },
  buttonText:{
    fontWeight: 'bold',
    fontSize: 16
  }

})