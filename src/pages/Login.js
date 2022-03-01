import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../Dados/Firebase';


export default function Login(){
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  async function logar(){
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( (value) => {
     navigation.navigate('Home', { user: value.user.email })
     //Navegando usuario para Home e levando o email do usuario para a tela home

    })
    .catch( (error) => {
        alert('Ops algo deu errado!');
        return;
        //Der algum erro mostrar o alert e barrar aqui.
    })

    setEmail('');
    setPassword('');
  }

  return(
    <KeyboardAvoidingView style={styles.container}>
    <KeyboardAvoidingView style={styles.container1}>
      <View style={styles.ViewLogo}>
      <Image source={require('../image/logo.png')} style={styles.logo}></Image>
      </View>
      <Text style={styles.texto}>Email</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setEmail(texto) }
      value={email}
      />

      <Text style={styles.texto}>Senha</Text>
      <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      onChangeText={(texto) => setPassword(texto) }
      secureTextEntry={true}
      value={password}
      />

      <Button
      title="Acessar"
      onPress={logar}
      />

      <TouchableOpacity style={{marginTop: 25 }} onPress={ () => navigation.navigate('Cadastro')}>
        <Text style={{textAlign: 'center' }}>Criar uma conta</Text>
      </TouchableOpacity>


    </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#3b5998',
  },
  container1:{
    flex:1,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: '#3b5998'
  },
  ViewLogo: {
    alignItems: 'center'
  },
  logo: {
    height: 50,
    width: 50,
    justifyContent: 'center'
  },
  texto: {
    fontSize: 20,
  },
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  }
});