import React from 'react';
import { View, Button, StyleSheet, TextInput, Text } from 'react-native';

export default function Tela2({ navigation }) {
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
        value="Digitado pelo cliente"
        editable={true} 
      />

      
      <Button
        title="Abrir Chamado"
        color="#4E89AE"
        onPress={() => navigation.navigate('AbrirChamado')} 
      />

      
      <Text style={styles.link} onPress={() => console.log("Acessar chamados existentes")}>
        Já tem um chamado? Clique aqui
      </Text>
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
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 20,
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
