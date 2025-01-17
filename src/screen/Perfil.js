import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { GlobalContext } from './../GlobalState';
import Constants from 'expo-constants';
import { getData } from './../../StoreData'

export default function Perfil({ navigation}) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = await getData('user');
            if (user) {
                setUserData(user); // Define os dados do usuário recuperados
            }
        };

        fetchData();
    }, []);

    const { inputValue } = useContext(GlobalContext)
    const { totalPaid } = useContext(GlobalContext);
    const { receivedAmount, expenses } = useContext(GlobalContext)
    const { setTotalReceived } = useContext(GlobalContext)

    const totalReceived = receivedAmount.reduce((acc, curr) => acc + curr, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);
    const balance = totalReceived - totalPaid

    const balanceImage = balance >= 0 
        ? require('./../img/caret-up.png') // Imagem para saldo positivo
        : require('./../img/acento-circunflexo.png');
    

    useEffect(() => {
        const total = receivedAmount.reduce((acc, amount) => acc + amount, 0);
        setTotalReceived(total);
      }, [receivedAmount]);

    const valuetest = (() => {
        if(totalExpenses > totalReceived){
            return <Image 
                    source={require('./../img/caret-up.png')}
                    />
        } else if (totalExpenses < totalReceived){
            return <Image 
                    source={require('./../img/acento-circunflexo.png')}
                    />
        }
    })



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

            <View style={styles.areaPerfil}>
                <View style={styles.areaTitulo}>
                    <Text style={styles.title}>Perfil</Text>
                </View>

                <View style={styles.perfil}>
                    <View style={styles.areaImagem}>
                        <Image 
                        source={require('./../img/perfil.png')}
                        style={styles.imagem}
                        />
                    </View>
                    {userData ? (
                        <>
                            <Text style={styles.txtNome}> {userData.inputValue}</Text>
                        </>
                    ) : (
                        <Text> Não encontrado</Text>
                    )}
                </View>

                <View style={styles.container}>
                    <View style={styles.areaValor}>
                        <View style={styles.txtValor}>
                            <Text style={styles.valores}>Valor recebido: R$ {totalReceived.toFixed(2)}</Text>
                            <Text style={styles.valores}>Valor gasto: R$ {totalPaid.toFixed(2)}</Text>
                        </View>
                        <View style={styles.balanceText}>
                            <Image source={balanceImage} />
                    </View>
                    </View>
                </View>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    area:{
        flex: 1,
        padding: 20,
        backgroundColor: '#2c2c2d'
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
    areaPerfil:{
        backgroundColor: '#3B3B3B',
        borderRadius: 20
    },
    title:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
    areaTitulo:{
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#5E5E5E',
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20
    },
    areaImagem:{
        margin: 20,
        backgroundColor: '#E7FC00',
        padding: 10,
        borderRadius: 50
    },
    imagem:{
        width: 24,
        height: 24
    },
    txtNome:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    perfil:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    valores:{
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    container:{
        margin: 20
    },
    areaValor:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});