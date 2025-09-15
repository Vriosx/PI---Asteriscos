import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default function Tela5({ navigation }) {
  const [numeroChamado, setNumeroChamado] = useState('');

  const handleSearch = () => {
    console.log(`Buscando o chamado com o número: ${numeroChamado}`);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.logoImage} 
      />
      <Text style={styles.title}>Pesquisar chamado</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o número cadastrado no chamado"
        placeholderTextColor="#A0A0A0"
        value={numeroChamado}
        onChangeText={setNumeroChamado}
      />

      <Button 
        title="Confirmar"
        color="#4E89AE"
        onPress={handleSearch} 
      />

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
  title: {
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
  link: {
    color: '#A0A0A0',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
