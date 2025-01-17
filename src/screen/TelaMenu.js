import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { GlobalContext } from './../GlobalState';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailsScreen({ navigation }) {
  const { inputValue } = useContext(GlobalContext); // Acessar o Contexto
  const { accountInfo } = useContext(GlobalContext);
  const totalValue = accountInfo.reduce((acc, item) => acc + item.value, 0);
  const { totalPaid } = useContext(GlobalContext);

  const { receivedAmount } = useContext(GlobalContext)
  const [ totalReceived, setTotalReceived] = useState(0)

  useEffect(() => {
    const total = receivedAmount.reduce((acc, amount) => acc + amount, 0);
    setTotalReceived(total);
  }, [receivedAmount]);

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
    </View>
)



  return (
    <View style={[styles.area, {paddingTop: Constants.statusBarHeight}]}>
        <View style={styles.scrollViewContent}>
      <Text style={styles.text}>Olá, {inputValue}!</Text>
      <Text style={styles.textDesc}>Aqui está seu resumo do mês.</Text>

      <View style={styles.blocos}>

        <View style={styles.blocoGastos}>
          <View style={styles.areaTG}>
            <Image 
            source={require('./../img/dolar.png')}
            style={styles.imageGastos}
            />
            <Text style={styles.tituloGastos}>Total de gastos</Text>
          </View>
          <Text style={styles.totalGastos}>R${totalPaid.toFixed(2)}</Text>
        </View>

        <View style={styles.blocoContas}>
          <View style={styles.areaTG}>
            <Image 
            source={require('./../img/carteira.png')}
            style={styles.imageContas}
            />
            <Text style={styles.tituloContas}>Recebimentos</Text>
          </View>
          <Text style={styles.totalRecebimentos}>R${totalReceived.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.blocoAdd}>
        <Text style={styles.tituloAdd}>Apareceu uma nova conta para pagar?</Text>
        <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('Adicionar')}>
          <Text style={styles.textButton}>Adicionar nova conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.blocoGeral}>
        <View style={styles.cabecalhoFinancas}>
          <Text style={styles.titleFinancas}>Finanças</Text>
          <TouchableOpacity style={styles.buttonFinancas} onPress={() => navigation.navigate('Geral')}>
            <Text style={styles.textVermais}>Ver mais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areaGeral}>

            <FlatList
                data={accountInfo}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.list}
            />



        </View>
      </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonFooter} onPress={() => navigation.navigate('TotalRecebido')}>
          <Image 
          source={require('./../img/mais.png')}
          style={styles.imageHome}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFooterSelecionado}>
          <Image 
          source={require('./../img/casa.png')}
          style={styles.imageHome}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFooter} onPress={() => navigation.navigate('Perfil')}>
          <Image 
          source={require('./../img/do-utilizador.png')}
          style={styles.imageHome}
          />
        </TouchableOpacity>
      </View>
      
    </View>
    

  );
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: '#2c2c2d',
    },
    text:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
        width: 250,
        paddingLeft: 30
    },
    textDesc:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 5,
        width: 280,
        paddingLeft: 30
    },
    blocoGastos:{
      marginLeft: 20,
      marginBottom: 20,
      marginTop: 20,
      backgroundColor: '#E7FC00',
      width: 170,
      borderRadius: 10
    },
    areaTG:{
      flexDirection: 'row',
      margin: 10,
      alignItems: 'center'
    },
    imageGastos:{
      backgroundColor: '#D1E400',
      padding: 2,
      borderRadius: 10
    },
    tituloGastos:{
      fontWeight: 'bold',
      fontSize: 16,
      paddingLeft: 5
    },
    totalGastos:{
      paddingLeft: 15,
      paddingTop: 5,
      fontWeight: 'bold',
      fontSize: 20,
      paddingBottom: 20,
    },
    totalRecebimentos:{
      paddingLeft: 15,
      paddingTop: 5,
      fontWeight: 'bold',
      fontSize: 20,
      paddingBottom: 20,
      color: '#fff'
    },
    blocoContas:{
      margin: 20,
      backgroundColor: '#3B3B3B',
      width: 170,
      borderRadius: 10
    },
    imageContas:{
      backgroundColor: '#2C2C2D',
      padding: 4,
      borderRadius: 10,
    },
    tituloContas:{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      paddingLeft: 5
    },
    infoPagas:{
      color: '#fff',
      fontWeight: 'bold',
      paddingLeft: 15,
    },
    infoPendentes:{
      color: '#fff',
      fontWeight: 'bold',
      paddingLeft: 15,
      paddingBottom: 20
    },
    blocos:{
      flexDirection: 'row'
    },
    blocoAdd:{
      backgroundColor: '#3B3B3B',
      marginTop: 5,
      marginLeft: 20,
      marginRight: 20,
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      borderRadius: 20
    },
    tituloAdd:{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      borderBottomWidth:2,
      borderBottomColor: '#5E5E5E',
      paddingBottom: 20
    },
    buttonAdd:{
      marginTop: 20,
      backgroundColor: '#D9D9D9',
      paddingTop:15,
      paddingLeft:20,
      paddingRight: 20,
      paddingBottom: 15,
      borderRadius: 40
    },
    textButton:{
      fontWeight: 'bold',
      fontSize: 18
    },
    blocoGeral:{
      margin: 20,
      backgroundColor: '#3B3B3B',
      padding: 15,
      borderRadius: 20,
      marginBottom: 100,
      height: 400
    },
    cabecalhoFinancas:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: '#5E5E5E',
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight:10,
      paddingBottom: 20
    },
    titleFinancas:{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16
    },
    buttonFinancas:{
      backgroundColor: '#E7FC00',
      padding:5,
      borderRadius: 10
    },
    contas:{
      backgroundColor: '#2C2C2D',
      marginTop: 20,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 20,
      alignItems: 'center'
    },
    textConta:{
      color: '#fff',
      padding: 5,
      fontWeight: 'bold'
    },
    contentSituacao:{
      padding: 5,
      alignItems: 'center'
    },
    textSituacao:{
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12,
      borderBottomWidth: 2,
      borderBottomColor: '#5E5E5E',
      padding: 4
    },
    pago: {
      fontWeight: 'bold',
      color: '#69ED60',
      fontSize: 12
    },
    pendente:{
      fontWeight: 'bold',
      color: '#D2552B',
      fontSize: 12
    },
    scrollViewContent:{
      paddingBottom: 60
    },
    footer:{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#515151',
      paddingVertical: 10,
      borderTopColor: '#ccc',
      marginBottom: 30,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 20
    },
    buttonFooterSelecionado:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E7FC00',
      padding: 10,
      borderRadius: 20
    },
    imageHome: {
      height: 24,
      width: 24
    },
    list: {
      marginTop: 20,
      height: 250
    },
    item: {
      backgroundColor: '#2C2C2D',
      padding: 15,
      marginVertical: 5,
      borderRadius: 10,
      flexDirection: 'row'
    },
    itemText: {
      color: '#fff',
      fontWeight: 'bold'
    },
    pagoText: {
      color: '#000',
      fontWeight: 'bold',
    },
    areaPago: {
      justifyContent: 'center',
      marginLeft: 150,
      paddingLeft: 5,
      paddingRight: 5,
      borderRadius: 10
    },
    imageCheck: {
      height: 20,
      width: 20
    }
});
