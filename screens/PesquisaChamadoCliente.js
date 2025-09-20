import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert } from 'react-native';

export default function Tela5({ navigation }) {
  const [telefone, setTelefone] = useState('');

  // Função para aplicar máscara de telefone
  const handleChange = (text) => {
    // Remove tudo que não é número
    let cleaned = text.replace(/\D/g, '');

    // Limita a 11 dígitos
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

    let masked = '';
    if (cleaned.length > 0) masked += '(' + cleaned.slice(0, 2);
    if (cleaned.length >= 3) masked += ') ' + cleaned.slice(2, 7);
    if (cleaned.length >= 8) masked += '-' + cleaned.slice(7);

    setTelefone(masked);
  };

  const handleSearch = () => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!telefone) {
      Alert.alert('Erro', 'Digite o número de telefone!');
      return;
    }

    if (!regex.test(telefone)) {
      Alert.alert('Erro', 'Número de telefone inválido! Use o formato (11) 99406-0265.');
      return;
    }

    console.log(`Telefone válido: ${telefone}`);
    // Redireciona para NotificacaoCliente
    navigation.navigate('NotificacaoCliente');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logoImage} />
      <Text style={styles.title}>Pesquisar chamado</Text>

      <TextInput
        style={styles.input}
        placeholder="Telefone cadastrado no chamado"
        placeholderTextColor="#A0A0A0"
        value={telefone}
        onChangeText={handleChange}
        keyboardType="numeric"
      />

      <Button title="Confirmar" color="#4E89AE" onPress={handleSearch} />
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
});
