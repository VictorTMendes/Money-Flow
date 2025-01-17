import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image, FlatList } from 'react-native';
import { GlobalContext } from './../GlobalState';
import Constants from 'expo-constants';

export default function TotalRecebido({ navigation }) {
    const { receivedAmount, setReceivedAmount } = useContext(GlobalContext);
    const [amount, setAmount] = useState('');

    const handleAdd = () => {
        if (amount) {
            setReceivedAmount((prev) => [...prev, parseFloat(amount)]);
            setAmount('');
            navigation.goBack(); // Volta para a tela anterior após adicionar
        } else {
            Alert.alert("Erro", "Por favor, insira um valor.");
        }
    };

    const handleRemoveAll = () => {
        setReceivedAmount([]);
        navigation.goBack()
    };

    const handleRemove = (index) => {
        setReceivedAmount((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <View style={[styles.area, { paddingTop: Constants.statusBarHeight }]}>

            <View style={styles.cabecalho}>
                <TouchableOpacity style={styles.btnVoltar} onPress={() => navigation.navigate('Menu')}>
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

            <View style={styles.areaTitle}>
                <Text style={styles.title}>Adicionar Recebimento</Text>

            </View>
            <TextInput
                style={styles.input}
                placeholder='Somente números'
                placeholderTextColor='#6B6B6B'
                underlineColorAndroid="transparent"
                value={amount}
                onChangeText={setAmount}
                keyboardType='numeric'
            />
            <TouchableOpacity onPress={handleAdd} style={styles.button}>
                <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRemoveAll} style={[styles.button, styles.deleteButton]}>
                <Text style={styles.buttonText}>Remover Todos</Text>
            </TouchableOpacity>

            <FlatList
                data={receivedAmount}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.receivedItem}>
                        <Text style={styles.receivedText}>R$ {item.toFixed(2)}</Text>
                        <TouchableOpacity onPress={() => handleRemove(index)} style={styles.removeButton}>
                            <Text style={styles.buttonText}>Remover</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        padding: 20,
        backgroundColor: '#2c2c2d',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#3B3B3B',
        padding: 20,
        marginBottom: 20,
        borderRadius: 5,
        color: '#fff',
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
      },
      areaTitle:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#5E5E5E'
      },
      title:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
      },
      receivedItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4B4B4B',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    receivedText: {
        color: '#fff',
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: '#FF3B30',
        padding: 5,
        borderRadius: 5,
    },
});
