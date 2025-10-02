import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Text, 
  Image, 
  Alert, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Tela5({ navigation }) {
  const [telefone, setTelefone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchMethod, setSearchMethod] = useState('telefone'); // 'telefone' ou 'protocolo'

  // Função para aplicar máscara de telefone
  const handleTelefoneChange = (text) => {
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

  // Função para validar telefone
  const isValidTelefone = (phone) => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(phone);
  };

  // Função para validar protocolo (exemplo: ABC123)
  const isValidProtocolo = (protocolo) => {
    const regex = /^[A-Z0-9]{6,10}$/;
    return regex.test(protocolo.toUpperCase());
  };

  const handleSearch = async () => {
    if (!telefone.trim()) {
      Alert.alert('Campo Obrigatório', `Digite o ${searchMethod === 'telefone' ? 'número de telefone' : 'número do protocolo'}!`);
      return;
    }

    if (searchMethod === 'telefone' && !isValidTelefone(telefone)) {
      Alert.alert('Telefone Inválido', 'Use o formato (11) 99406-0265 com DDD.');
      return;
    }

    if (searchMethod === 'protocolo' && !isValidProtocolo(telefone)) {
      Alert.alert('Protocolo Inválido', 'Digite um número de protocolo válido (ex: ABC123).');
      return;
    }

    setIsLoading(true);

    try {
      // Simular busca na API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`${searchMethod === 'telefone' ? 'Telefone' : 'Protocolo'} válido: ${telefone}`);
      
      // Redireciona para NotificacaoCliente com os dados da busca
      navigation.navigate('NotificacaoCliente', {
        searchTerm: telefone,
        searchMethod: searchMethod
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a busca. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearInput = () => {
    setTelefone('');
  };

  const toggleSearchMethod = () => {
    setSearchMethod(prev => prev === 'telefone' ? 'protocolo' : 'telefone');
    setTelefone('');
  };

  const SearchMethodButton = ({ method, icon, label, description }) => (
    <TouchableOpacity
      style={[
        styles.methodButton,
        searchMethod === method && styles.methodButtonActive
      ]}
      onPress={() => setSearchMethod(method)}
    >
      <View style={styles.methodButtonContent}>
        <View style={[
          styles.methodIconContainer,
          searchMethod === method && styles.methodIconContainerActive
        ]}>
          <Ionicons 
            name={icon} 
            size={20} 
            color={searchMethod === method ? '#FFF' : '#4E89AE'} 
          />
        </View>
        <View style={styles.methodTextContainer}>
          <Text style={[
            styles.methodLabel,
            searchMethod === method && styles.methodLabelActive
          ]}>
            {label}
          </Text>
          <Text style={styles.methodDescription}>
            {description}
          </Text>
        </View>
        {searchMethod === method && (
          <Ionicons name="checkmark-circle" size={20} color="#4E89AE" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Consultar Chamado</Text>
          <Text style={styles.subtitle}>
            Acompanhe o status do seu chamado
          </Text>
        </View>

        {/* Search Method Selection */}
        <View style={styles.methodSection}>
          <Text style={styles.sectionTitle}>Como deseja consultar?</Text>
          
          <SearchMethodButton
            method="telefone"
            icon="call-outline"
            label="Por Telefone"
            description="Use o número cadastrado"
          />
          
          <SearchMethodButton
            method="protocolo"
            icon="document-text-outline"
            label="Por Protocolo"
            description="Número do seu chamado"
          />
        </View>

        {/* Search Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>
            {searchMethod === 'telefone' ? 'Número de Telefone' : 'Número do Protocolo'}
            <Text style={styles.required}> *</Text>
          </Text>
          
          <View style={styles.inputContainer}>
            <Ionicons 
              name={searchMethod === 'telefone' ? "call-outline" : "document-outline"} 
              size={20} 
              color="#94A3B8" 
            />
            <TextInput
              style={styles.input}
              placeholder={
                searchMethod === 'telefone' 
                  ? '(11) 99406-0265' 
                  : 'Digite o protocolo (ex: ABC123)'
              }
              placeholderTextColor="#94A3B8"
              value={telefone}
              onChangeText={searchMethod === 'telefone' ? handleTelefoneChange : setTelefone}
              keyboardType={searchMethod === 'telefone' ? "phone-pad" : "default"}
              autoCapitalize={searchMethod === 'protocolo' ? "characters" : "none"}
              maxLength={searchMethod === 'telefone' ? 15 : 10}
            />
            {telefone.length > 0 && (
              <TouchableOpacity onPress={clearInput}>
                <Ionicons name="close-circle" size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
          
          <Text style={styles.helpText}>
            {searchMethod === 'telefone' 
              ? 'Digite o número com DDD no formato correto'
              : 'O protocolo foi enviado para seu e-mail/whatsapp'
            }
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={[
              styles.searchButton,
              (!telefone.trim() || isLoading) && styles.searchButtonDisabled
            ]}
            onPress={handleSearch}
            disabled={!telefone.trim() || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <>
                <Ionicons name="search-outline" size={20} color="#FFF" />
                <Text style={styles.searchButtonText}>
                  {isLoading ? 'Buscando...' : 'Consultar Chamado'}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.helpButton}
            onPress={() => Alert.alert('Ajuda', 'Entre em contato conosco se tiver dificuldades para encontrar seu chamado.')}
          >
            <Ionicons name="help-circle-outline" size={16} color="#4E89AE" />
            <Text style={styles.helpButtonText}>Precisa de ajuda?</Text>
          </TouchableOpacity>
        </View>

        {/* Information Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={20} color="#4E89AE" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Encontre seu chamado rapidamente</Text>
            <Text style={styles.infoText}>
              {searchMethod === 'telefone' 
                ? 'Use o mesmo número de telefone informado na abertura do chamado'
                : 'O número do protocolo foi enviado para você após a abertura do chamado'
              }
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 180,
    height: 100,
    marginBottom: 24,
  },
  title: { 
    fontSize: 32, 
    color: '#FFF', 
    fontWeight: 'bold', 
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 16, 
    color: '#94A3B8',
    textAlign: 'center',
  },
  methodSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  methodButton: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  methodButtonActive: {
    borderColor: '#4E89AE',
    backgroundColor: '#1E293B',
  },
  methodButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodIconContainerActive: {
    backgroundColor: '#4E89AE',
  },
  methodTextContainer: {
    flex: 1,
  },
  methodLabel: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  methodLabelActive: {
    color: '#4E89AE',
  },
  methodDescription: {
    color: '#94A3B8',
    fontSize: 14,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputLabel: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    marginLeft: 12,
    marginRight: 8,
    padding: 0,
  },
  helpText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  actionsSection: {
    marginBottom: 30,
  },
  searchButton: {
    backgroundColor: '#4E89AE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#4E89AE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  searchButtonDisabled: {
    backgroundColor: '#475569',
    shadowOpacity: 0,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  helpButtonText: {
    color: '#4E89AE',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4E89AE',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
});