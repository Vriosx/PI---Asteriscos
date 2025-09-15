import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DetalheChamadoScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modelo do forno</Text>
      <Text style={styles.status}>Aberto 🔴</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Responsável:</Text>
        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#999" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Contato:</Text>
        <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor="#999" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Endereço:</Text>
        <TextInput style={styles.input} placeholder="Endereço" placeholderTextColor="#999" />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Defeito relatado:</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Descrição"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
        <Ionicons name="sync-outline" size={24} color="#fff" />
        <Text style={styles.btnText}>Atualizar status</Text>
      </TouchableOpacity>

      {/* POP-UP */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Atualizar status</Text>
            
            <TouchableOpacity style={styles.statusBtn}>
              <View style={[styles.dot, { backgroundColor: "orange" }]} />
              <Text style={styles.statusText}>Em andamento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statusBtn}>
              <View style={[styles.dot, { backgroundColor: "green" }]} />
              <Text style={styles.statusText}>Concluído</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "gray" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00111A", padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  status: { color: "#f55", marginVertical: 10 },
  inputGroup: { marginBottom: 10 },
  label: { color: "#fff", marginBottom: 4 },
  input: {
    backgroundColor: "#0D1B2A",
    color: "#fff",
    padding: 8,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#0077ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  btnText: { color: "#fff", fontWeight: "bold", marginLeft: 8 },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#0D1B2A",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: { color: "#fff", fontSize: 18, marginBottom: 15 },
  statusBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  statusText: { fontWeight: "bold" },
});
