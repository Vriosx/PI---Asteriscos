import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AbrirChamadoScreen({ route, navigation }) {
  const [telefone, setTelefone] = useState('');
  const [erroTelefone, setErroTelefone] = useState('');
  const [modeloForno, setModeloForno] = useState('');
  const [endereco, setEndereco] = useState('');

  // Recebe os dados do QR Code Scanner
  React.useEffect(() => {
    if (route.params) {
      setModeloForno(route.params.modelo || '');
      setEndereco(route.params.endereco || '');
    }
  }, [route.params]);

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
    // Valida se o modelo e endereço foram preenchidos (via QR code)
    if (!modeloForno || !endereco) {
      Alert.alert(
        'Dados do Forno',
        'Por favor, escaneie o QR Code do forno primeiro',
        [{ text: 'OK' }]
      );
      return;
    }

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
    navigation.navigate('ChamadoCliente2', {
      modelo: modeloForno,
      endereco: endereco,
      telefone: telefone
    });
  };

  return (
    <View style={styles.container}>
      {/* Ícone da câmera no canto superior direito */}
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => navigation.navigate('QRCodeScanner')}
      >
        <Ionicons name="camera-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Abrir Chamado</Text>
      <Text style={styles.subtitle}>Escaneie o QR Code e informe o telefone</Text>

      {/* Informações do Forno (somente leitura) */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Dados do Forno</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Modelo:</Text>
          <Text style={styles.infoValue}>
            {modeloForno || 'Não identificado'}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Endereço:</Text>
          <Text style={styles.infoValue}>
            {endereco || 'Não identificado'}
          </Text>
        </View>

        {(!modeloForno || !endereco) && (
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={() => navigation.navigate('QRCodeScanner')}
          >
            <Ionicons name="camera-outline" size={20} color="#4E89AE" />
            <Text style={styles.scanButtonText}>Escanear QR Code</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Telefone para entrada manual */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Contato</Text>
        <TextInput
          style={[styles.input, erroTelefone && styles.inputError]}
          placeholder="Telefone para contato"
          placeholderTextColor="#888"
          value={telefone}
          onChangeText={formatarTelefone}
          keyboardType="phone-pad"
          maxLength={15}
        />
        {erroTelefone ? <Text style={styles.error}>{erroTelefone}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Abrir Chamado"
          color="#4E89AE"
          onPress={handleAbrirChamado}
          disabled={!modeloForno || !endereco}
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
  title: { 
    fontSize: 30, 
    color: '#FFFFFF', 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#A0A0A0', 
    marginBottom: 30 
  },
  cameraButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: '#4E89AE',
    padding: 10,
    borderRadius: 50,
  },
  infoSection: {
    backgroundColor: '#1A2A3A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  inputSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 16,
    color: '#A0A0A0',
    width: 80,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    fontWeight: '500',
  },
  input: {
    height: 50, 
    width: '100%', 
    backgroundColor: '#333333',
    color: '#FFFFFF', 
    paddingHorizontal: 15, 
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  inputError: {
    borderColor: '#FF5C5C',
  },
  error: {
    color: '#FF5C5C',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 5,
  },
  buttonContainer: { 
    width: '100%', 
    marginTop: 30, 
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4E89AE',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  scanButtonText: {
    color: '#4E89AE',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});