import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AbrirChamadoScreen({ navigation }) {
  const [assunto, setAssunto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imageUri, setImageUri] = useState(null); 
  const [hasPermission, setHasPermission] = useState(null); 

  useEffect(() => {
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraPermission.granted && mediaLibraryPermission.granted);
    })();
  }, []);

  const handleImagePick = async () => {
    if (!hasPermission) {
      alert('Você precisa de permissões para acessar a galeria!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri); 
    }
  };

  const handleSubmit = () => {
    if (!assunto.trim() || !descricao.trim()) {
      Alert.alert('Erro', 'Preencha o assunto e a descrição do chamado!');
      return;
    }

    console.log('Chamado enviado!');
    // Redireciona para a tela de Notificações do cliente
    navigation.navigate('NotificacaoCliente');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrir Chamado</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o assunto"
        value={assunto}
        onChangeText={setAssunto}
      />

      <TextInput
        style={[styles.input, styles.textArea]}  
        placeholder="Digite a descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline={true} 
        textAlignVertical="top" 
      />

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePick}>
          <View style={styles.imageWrapper}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Image source={require('../assets/Camera.png')} style={styles.image} />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.imageText}>Se possível, anexe uma imagem</Text>
      </View>

      <Button 
        title="Enviar" 
        color="#4E89AE" 
        onPress={handleSubmit}  
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
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  textArea: {
    height: 120, 
    textAlignVertical: 'top', 
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageWrapper: {
    width: 300, 
    height: 150, 
    borderRadius: 12, 
    borderWidth: 3, 
    borderColor: '#4E89AE', 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A', 
  },
  image: {
    width: '60%', 
    height: '100%', 
    borderRadius: 8, 
  },
  imageText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  link: {
    color: '#A0A0A0',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
