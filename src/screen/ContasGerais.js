import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { GlobalContext } from './../GlobalState';
import Constants from 'expo-constants';

let nextId = 1

export default function ContasGerais({ navigation}) {
    const { accountInfo, setAccountInfo, setTotalPaid } = useContext(GlobalContext);

    useEffect(() => {
        const total = accountInfo
            .filter(item => item.isPaid)
            .reduce((acc, item) => acc + item.value, 0);
            setTotalPaid(total)
    }, [accountInfo])

    const handleEdit = (item) => {
        navigation.navigate('Editar', { item })
    }

    const handleDelete = (id) => {
        setAccountInfo((prev) => prev.filter(item => item.id !== id));
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.boxItem}>
            <Text style={styles.itemText}>Título: {item.title} </Text>
            <Text style={styles.itemText}>Valor: R${item.value}</Text>
        </View>
        <View style={styles.areaPago}>
        {item.isPaid && <Text style={styles.pagoText}>
          <Image 
          source={require('./../img/verificar.png')}
          style={styles.imageCheck}
          />
          </Text>}
        </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress ={() => handleEdit(item)} style={styles.button}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )


    return(
        <View style={[styles.area, {paddingTop: Constants.statusBarHeight}]}>
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

            <View style={styles.container}>
                <Text style={styles.title}>Finanças</Text>
            </View>

            <FlatList
                data={accountInfo}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    area:{
        flex: 1,
        backgroundColor: '#2c2c2d',
    },
    list: {
       marginBottom: 20
      },
      item: {
        backgroundColor: '#4B4B4B',
        padding: 20,
        marginVertical: 5,
        borderRadius: 10,
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      itemText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 5
      },
      cabecalho:{
        height: 30,
        marginBottom: 10,
        marginLeft: 15,
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
      buttonContainer:{
        flexDirection: 'row',
      },
      button:{
        margin: 10,
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'center',
        backgroundColor: '#E7FC00',
        borderRadius: 10,
      },
      pagoText: {
        color: '#00FF00',
        fontWeight: 'bold',
      },
      areaPago: {
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 10
      },
      imageCheck: {
        height: 20,
        width: 20
      },
      container:{
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
      }
})