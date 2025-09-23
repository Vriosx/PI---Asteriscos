import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AbrirChamadoScreen({ navigation }) {
  const [telefone, setTelefone] = useState('');
  const [erroTelefone, setErroTelefone] = useState('');
  const [modeloForno, setModeloForno] = useState('Modelo autocompletado pelo QR code');
  const [endereco, setEndereco] = useState('Endereço autocompletado por QR code');

  // Regex para validar telefone brasileiro
  const validarTelefone = (tel) => {
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return regex.test(tel);
  };

  // Função para aplicar máscara enquanto digita
  const formatarTelefone = (text) => {
    let numero = text.replace(/\D/g, '');
    if (numero.length > 11) numero = numero.slice(0, 11);

    if (numero.length > 6) {
      numero = `(${numero.slice(0, 2)}) ${numero.slice(2, 7)}-${numero.slice(7)}`;
    } else if (numero.length > 2) {
      numero = `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
    } else if (numero.length > 0) {
      numero = `(${numero}`;
    }

    setTelefone(numero);
    setErroTelefone(''); // limpa o erro enquanto digita
  };

  const handleAbrirChamado = () => {
    if (!telefone.trim()) {
      setErroTelefone('Telefone é obrigatório');
      return;
    }

    if (!validarTelefone(telefone)) {
      setErroTelefone('Formato inválido. Ex.: (xx) xxxxx-xxxx');
      return;
    }

    // Se passou, limpa o erro e navega
    setErroTelefone('');
    navigation.navigate('ChamadoCliente2');
  };

  // Função chamada ao voltar do QRCodeScanner
  const handleQRCodeResult = (data) => {
    try {
      const jsonData = JSON.parse(data);
      setModeloForno(jsonData.modelo || modeloForno);
      setEndereco(jsonData.endereco || endereco);
    } catch (e) {
      console.log('Erro ao ler QRCode', e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Ícone da câmera no canto superior direito */}
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => navigation.navigate('QRCodeScanner', { onScan: handleQRCodeResult })}
      >
        <Ionicons name="camera-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Abrir Chamado</Text>
      <Text style={styles.subtitle}>Por favor, confirme as informações abaixo</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo do forno"
        value={modeloForno}
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço da instalação"
        value={endereco}
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone para contato"
        value={telefone}
        onChangeText={formatarTelefone}
        keyboardType="phone-pad"
        maxLength={15}
      />
      {erroTelefone ? <Text style={styles.error}>{erroTelefone}</Text> : null}

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
    backgroundColor: '#06101B',
    padding: 20,
    paddingTop: 50,
  },
  title: { fontSize: 30, color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#A0A0A0', marginBottom: 20 },
  input: {
    height: 40, width: '100%', backgroundColor: '#333333',
    color: '#FFFFFF', paddingHorizontal: 10, marginVertical: 10, borderRadius: 5
  },
  error: {
    color: '#FF5C5C',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 10,
  },
  buttonContainer: { width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center' },
  cameraButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 10,
  }
});
