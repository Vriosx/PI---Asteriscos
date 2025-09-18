import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export default function DetalheChamadoScreen({ route }) {
  const { DetalheChamado } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(DetalheChamado.status);

  const atualizarStatus = (novoStatus) => {
    setStatus(novoStatus);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>{DetalheChamado.forno}</Text>
      <Text style={[
        styles.status,
        { color: status === "Aberto" ? "red" : status === "Em andamento" ? "orange" : "green" }
      ]}>
        {status}
      </Text>

      {/* Informações */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Forno:</Text>
        <Text style={styles.value}>{DetalheChamado.forno}</Text>

        <Text style={styles.label}>Defeito:</Text>
        <Text style={styles.value}>{DetalheChamado.defeito}</Text>

        <Text style={styles.label}>Responsável:</Text>
        <Text style={styles.value}>{DetalheChamado.responsavel}</Text>

        <Text style={styles.label}>Contato:</Text>
        <Text style={styles.value}>{DetalheChamado.contato}</Text>

        <Text style={styles.label}>Endereço:</Text>
        <Text style={styles.value}>{DetalheChamado.endereco}</Text>

        <Text style={styles.label}>Defeito detalhado:</Text>
        <Text style={styles.value}>{DetalheChamado.detalhe}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Atualizar status</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar status</Text>

            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: "orange" }]}
              onPress={() => atualizarStatus("Em andamento")}
            >
              <Text style={styles.statusButtonText}>Em andamento</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: "green" }]}
              onPress={() => atualizarStatus("Concluído")}
            >
              <Text style={styles.statusButtonText}>Concluído</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: "gray" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.statusButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001428", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", color: "#fff", textAlign: "center" },
  status: { textAlign: "center", marginBottom: 20, fontSize: 16 },
  infoBox: { backgroundColor: "#0d2b45", padding: 15, borderRadius: 10, marginBottom: 20 },
  label: { color: "#bbb", marginTop: 10, fontWeight: "bold" },
  value: { color: "#fff", marginBottom: 5 },
  button: { backgroundColor: "#1e90ff", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },

  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  statusButton: { padding: 12, borderRadius: 8, marginVertical: 5, width: "100%", alignItems: "center" },
  statusButtonText: { color: "#fff", fontWeight: "bold" }
});
