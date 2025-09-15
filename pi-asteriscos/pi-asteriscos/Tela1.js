import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default function Tela1({ navigation }) {
  return (
    <View style={styles.container}>
    
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.logoImage}
      />
      
      <Text style={styles.logoText}>ASTERISCO</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o email"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        secureTextEntry
      />
      
      <Button
        title="Entrar"
        color="#4E89AE"
        onPress={() => navigation.navigate('Chamado')} 
      />
      
      <TouchableOpacity onPress={() => console.log("Recuperação de senha")}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06101B',
    padding: 20,
  },
  logoImage: {
    width: 150,  
    height: 90, 
    marginBottom: 20, 
  },
  logoText: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: '#333333',
    color: '#FFFFFF',
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  forgotPassword: {
    color: '#A0A0A0',
    marginTop: 20,
    textDecorationLine: 'underline', 
  },
});
