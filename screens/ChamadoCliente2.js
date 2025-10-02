import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { addChamado } from '../Dados/ChamadoMock';

export default function AbrirChamadoDetalheScreen({ navigation }) {
  const [assunto, setAssunto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imageUri, setImageUri] = useState(null); 
  const [hasPermission, setHasPermission] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(cameraPermission.granted && mediaLibraryPermission.granted);
    })();
  }, []);

  const handleImagePick = async () => {
    if (!hasPermission) {
      Alert.alert(
        'Permissão Necessária', 
        'Você precisa conceder permissão para acessar a galeria de fotos!',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Configurações', onPress: () => Linking.openSettings() }
        ]
      );
      return;
    }

    Alert.alert(
      'Selecionar Imagem',
      'Escolha a fonte da imagem',
      [
        {
          text: 'Galeria',
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.8,
            });

            if (!result.canceled) {
              setImageUri(result.assets[0].uri);
            }
          }
        },
        {
          text: 'Câmera',
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.8,
            });

            if (!result.canceled) {
              setImageUri(result.assets[0].uri);
            }
          }
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const handleSubmit = async () => {
    if (!assunto.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, informe o assunto do chamado!');
      return;
    }

    if (!descricao.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, descreva o problema detalhadamente!');
      return;
    }

    if (descricao.trim().length < 10) {
      Alert.alert('Descrição Insuficiente', 'A descrição deve ter pelo menos 10 caracteres para melhor entendimento.');
      return;
    }

    setIsLoading(true);

    try {
      // Simula processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Adiciona no mock de chamados
      addChamado({
        assunto: assunto.trim(),
        descricao: descricao.trim(),
        imagem: imageUri || null,
        data: new Date().toISOString(),
        status: 'aberto'
      });

      Alert.alert(
        'Sucesso!',
        'Chamado aberto com sucesso. Nossa equipe entrará em contato em breve.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('NotificacaoCliente')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o chamado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const characterCount = descricao.length;
  const maxCharacters = 500;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Abrir Chamado</Text>
          <Text style={styles.subtitle}>Descreva detalhadamente o problema encontrado</Text>
        </View>

        <View style={styles.formContainer}>
          {/* Campo Assunto */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Assunto <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Problema com conexão de internet"
              placeholderTextColor="#94A3B8"
              value={assunto}
              onChangeText={setAssunto}
              maxLength={100}
            />
            <Text style={styles.characterCount}>
              {assunto.length}/100
            </Text>
          </View>

          {/* Campo Descrição */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Descrição Detalhada <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}  
              placeholder="Descreva o problema com todos os detalhes relevantes..."
              placeholderTextColor="#94A3B8"
              value={descricao}
              onChangeText={setDescricao}
              multiline={true} 
              textAlignVertical="top"
              maxLength={maxCharacters}
            />
            <View style={styles.descriptionFooter}>
              <Text style={styles.helpText}>
                Mínimo 10 caracteres
              </Text>
              <Text style={[
                styles.characterCount,
                characterCount > maxCharacters - 50 && styles.characterCountWarning
              ]}>
                {characterCount}/{maxCharacters}
              </Text>
            </View>
          </View>

          {/* Upload de Imagem */}
          <View style={styles.imageSection}>
            <Text style={styles.label}>Anexar Imagem (Opcional)</Text>
            <Text style={styles.imageHelpText}>
              Uma imagem pode ajudar na identificação do problema
            </Text>
            
            <TouchableOpacity 
              style={styles.imagePicker} 
              onPress={handleImagePick}
            >
              {imageUri ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={removeImage}
                  >
                    <Ionicons name="close-circle" size={24} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="camera-outline" size={40} color="#4E89AE" />
                  <Text style={styles.imagePlaceholderText}>
                    Toque para adicionar uma imagem
                  </Text>
                  <Text style={styles.imagePlaceholderSubtext}>
                    Galeria ou Câmera
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Enviar */}
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!assunto.trim() || !descricao.trim() || descricao.trim().length < 10) && 
            styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!assunto.trim() || !descricao.trim() || descricao.trim().length < 10 || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <Ionicons name="paper-plane-outline" size={20} color="#FFF" />
              <Text style={styles.submitButtonText}>Enviar Chamado</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Informações adicionais */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#4E89AE" />
          <Text style={styles.infoText}>
            Nossa equipe responderá seu chamado em até 24 horas úteis
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A'
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 10,
  },
  title: { 
    fontSize: 28, 
    color: '#FFF', 
    fontWeight: 'bold', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#94A3B8' 
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: { 
    color: '#E2E8F0', 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8 
  },
  required: {
    color: '#EF4444',
  },
  input: { 
    height: 50, 
    width: '100%', 
    backgroundColor: '#1E293B', 
    color: '#FFF', 
    paddingHorizontal: 16, 
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: '#334155',
    fontSize: 16,
  },
  textArea: { 
    height: 140, 
    paddingTop: 16,
    paddingBottom: 16,
    textAlignVertical: 'top' 
  },
  characterCount: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  characterCountWarning: {
    color: '#F59E0B',
  },
  descriptionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  helpText: {
    color: '#64748B',
    fontSize: 12,
  },
  imageSection: {
    marginBottom: 20,
  },
  imageHelpText: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 16,
  },
  imagePicker: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 160,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#334155',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagePlaceholderText: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    textAlign: 'center',
  },
  imagePlaceholderSubtext: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    height: 200,
    width: '100%',
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 4,
  },
  submitButton: {
    backgroundColor: '#4E89AE',
    flexDirection: 'row',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#4E89AE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: '#475569',
    shadowOpacity: 0,
  },
  submitButtonText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16,
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4E89AE',
  },
  infoText: {
    color: '#94A3B8',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
});