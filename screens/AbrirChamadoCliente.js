import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

export default function AbrirChamadoScreen({ navigation }) {
  const [telefone, setTelefone] = useState('');

  // Regex para validar telefone brasileiro
  const validarTelefone = (tel) => {
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return regex.test(tel);
  };

  // Função para aplicar máscara enquanto digita
  const formatarTelefone = (text) => {
    // Remove tudo que não é número
    let numero = text.replace(/\D/g, '');

    if (numero.length > 11) numero = numero.slice(0, 11);

    // Formata para (xx) xxxxx-xxxx
    if (numero.length > 6) {
      numero = `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
    } else if (numero.length > 2) {
      numero = `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
    } else if (numero.length > 0) {
      numero = `(${numero}`;
    }

    setTelefone(numero);
  };

  const handleAbrirChamado = () => {
    if (!telefone.trim()) {
      Alert.alert('Aviso', 'O telefone não pode estar em branco!');
      return;
    }

    if (!validarTelefone(telefone)) {
      Alert.alert('Erro', 'Por favor, insira um telefone válido. Ex.: (11) 99406-0265');
      return;
    }

    // Navega para a tela de ChamadoCliente2
    navigation.navigate('ChamadoCliente2');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrir Chamado</Text>
      <Text style={styles.subtitle}>Por favor, confirme as informações abaixo</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo do forno"
        value="Modelo autocompletado pelo QR code"
        editable={false} 
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço da instalação"
        value="Endereço autocompletado por QR code"
        editable={false} 
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone para contato"
        value={telefone}
        onChangeText={formatarTelefone}
        keyboardType="phone-pad"
        maxLength={15} // Limite do formato (xx) xxxxx-xxxx
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Abrir Chamado"
          color="#4E89AE"
          onPress={handleAbrirChamado} 
        />
      </View>
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
  title: { fontSize: 30, color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#A0A0A0', marginBottom: 20 },
  input: {
    height: 40, width: '100%', backgroundColor: '#333333',
    color: '#FFFFFF', paddingHorizontal: 10, marginVertical: 10, borderRadius: 5
  },
  buttonContainer: { width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center' },
});
