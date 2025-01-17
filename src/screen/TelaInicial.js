import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { GlobalContext } from './../GlobalState';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';


export default function HomeScreen({ navigation }) {
  const { inputValue, setInputValue } = useContext(GlobalContext); // Acessar o Contexto

  return (
    <View style={[styles.area, {paddingTop: Constants.statusBarHeight}]}>
        <StatusBar style='light' />
        <Text style={styles.textMenu}>Olá,</Text>
        <Text style={styles.textMenu}>Estamos muito felizes em ter você conosco!</Text>

        <View style={styles.blocoMenu}>
          <Text style={styles.textBloco}>Se está procurando uma forma de organizar sua vida financeira, está no lugar certo!</Text>
        </View>

        <View style={styles.blocoImage}>
          <Image 
          source={require('./../img/economizar.png')}
          style={styles.imageMenu}
          />
        </View>

        <View style={styles.questionArea}>
          <Text style={styles.textQuestion}>Para começar, qual seu nome?</Text>
          <TextInput 
          style={styles.input}
          placeholder='Digite seu primeiro nome...'
          placeholderTextColor='#6B6B6B'
          underlineColorAndroid="transparent"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>

        </View>




      </View>
  );
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: '#2c2c2d',
        padding: 30
      },
      textMenu: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
        width: 250
      }, 
      blocoMenu: {
        marginTop: 30,
        backgroundColor: '#e7fc00',
        padding: 20,
        borderRadius: 15
      },
      textBloco: {
        fontWeight: 'bold',
        fontSize: 18
      },
      blocoImage: {
        height: 200,
        alignItems: 'center',
        height: 200,
        marginTop: 30
      },
      imageMenu: {
        marginTop: 30, 
      },
      questionArea: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
      },
      textQuestion: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22
      },
      input:{
        height: 45,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        color: '#fff',
        margin: 40,
        padding: 10,
        fontSize: 20,
        width: 350,
        backgroundColor: '#3B3B3B'
      },
      button: {
        backgroundColor: '#e7fc00',
        height: 40,
        width: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
      },
      buttonText: {
        fontWeight: 'bold',
        fontSize: 18
      }
});
