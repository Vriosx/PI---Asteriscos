import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  ScrollView, 
  StatusBar,
  Alert,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DetalheChamadoScreen({ route, navigation }) {
  const { chamado, atualizarStatus } = route.params;
  const [status, setStatus] = useState(chamado.status);
  const [modalVisible, setModalVisible] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Aberto": return "#EF4444";
      case "Em andamento": return "#F59E0B";
      case "Concluído": return "#10B981";
      default: return "#6B7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Aberto": return "alert-circle";
      case "Em andamento": return "time";
      case "Concluído": return "checkmark-circle";
      default: return "help-circle";
    }
  };

  const handleStatusChange = (novoStatus) => {
    Alert.alert(
      "Confirmar Alteração",
      `Deseja alterar o status para "${novoStatus}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: () => {
            setStatus(novoStatus);
            atualizarStatus(chamado.id, novoStatus);
            setModalVisible(false);
            
            // Feedback de sucesso
            Alert.alert(
              "Status Atualizado!",
              `Chamado marcado como ${novoStatus.toLowerCase()}.`,
              [{ text: "OK", onPress: () => navigation.goBack() }]
            );
          }
        }
      ]
    );
  };

  const handleContactPress = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert("Erro", "Não foi possível realizar a chamada.");
    });
  };

  const InfoRow = ({ icon, label, value, isPhone = false }) => (
    <View style={styles.infoRow}>
      <View style={styles.infoLabelContainer}>
        <Ionicons name={icon} size={18} color="#4E89AE" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      {isPhone ? (
        <TouchableOpacity onPress={() => handleContactPress(value)}>
          <Text style={[styles.infoValue, styles.phoneValue]}>{value}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.infoValue} numberOfLines={3}>{value}</Text>
      )}
    </View>
  );

  const StatusBadge = ({ status }) => (
    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
      <Ionicons name={getStatusIcon(status)} size={16} color="#FFF" />
      <Text style={styles.statusBadgeText}>{status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Chamado</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Principal */}
        <View style={styles.mainCard}>
          <View style={styles.titleContainer}>
            <Ionicons name="flame" size={28} color="#F97316" />
            <Text style={styles.equipmentName}>{chamado.forno}</Text>
          </View>
          
          <View style={styles.statusContainer}>
            <StatusBadge status={status} />
            <Text style={styles.idText}>ID: #{chamado.id}</Text>
          </View>

          {chamado.data && (
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color="#94A3B8" />
              <Text style={styles.dateText}>
                Aberto em {new Date(chamado.data).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          )}
        </View>

        {/* Informações do Chamado */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Chamado</Text>
          <View style={styles.infoCard}>
            <InfoRow 
              icon="alert-circle-outline" 
              label="Defeito Reportado" 
              value={chamado.defeito} 
            />
            
            {chamado.detalhe && (
              <InfoRow 
                icon="document-text-outline" 
                label="Detalhes Adicionais" 
                value={chamado.detalhe} 
              />
            )}

            <InfoRow 
              icon="speedometer-outline" 
              label="Prioridade" 
              value={chamado.prioridade || "Média"} 
            />
          </View>
        </View>

        {/* Informações de Contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações de Contato</Text>
          <View style={styles.infoCard}>
            <InfoRow 
              icon="person-outline" 
              label="Responsável" 
              value={chamado.responsavel} 
            />
            
            <InfoRow 
              icon="call-outline" 
              label="Contato" 
              value={chamado.contato} 
              isPhone={true}
            />
            
            <InfoRow 
              icon="location-outline" 
              label="Endereço" 
              value={chamado.endereco} 
            />
          </View>
        </View>

        {/* Histórico (se disponível) */}
        {chamado.historico && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Histórico</Text>
            <View style={styles.infoCard}>
              <Text style={styles.historicoText}>{chamado.historico}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Botão de Ação */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="sync-outline" size={20} color="#FFF" />
          <Text style={styles.actionButtonText}>Atualizar Status</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Atualização de Status */}
      <Modal 
        animationType="fade" 
        transparent={true} 
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Atualizar Status</Text>
              <Text style={styles.modalSubtitle}>Selecione o novo status do chamado</Text>
            </View>

            <View style={styles.statusOptions}>
              <TouchableOpacity 
                style={[styles.statusOption, { backgroundColor: '#F59E0B20', borderColor: '#F59E0B' }]}
                onPress={() => handleStatusChange("Em andamento")}
              >
                <Ionicons name="time" size={24} color="#F59E0B" />
                <Text style={[styles.statusOptionText, { color: '#F59E0B' }]}>Em Andamento</Text>
                <Text style={styles.statusOptionDescription}>Chamado está sendo atendido</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.statusOption, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}
                onPress={() => handleStatusChange("Concluído")}
              >
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={[styles.statusOptionText, { color: '#10B981' }]}>Concluído</Text>
                <Text style={styles.statusOptionDescription}>Chamado finalizado com sucesso</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0F172A",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1E293B',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  mainCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4E89AE',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  equipmentName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusBadgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  idText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#94A3B8',
    fontSize: 14,
    marginLeft: 6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoValue: {
    color: '#94A3B8',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
  phoneValue: {
    color: '#4E89AE',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  historicoText: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  actionButton: {
    backgroundColor: '#4E89AE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#4E89AE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
  },
  statusOptions: {
    marginBottom: 20,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
  },
  statusOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
    flex: 1,
  },
  statusOptionDescription: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
    marginLeft: 12,
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#334155',
  },
  cancelButtonText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
});