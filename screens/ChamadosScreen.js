import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import chamadosJSON from "../Dados/chamados.json";

export default function ChamadosScreen({ navigation }) {
  const [chamados, setChamados] = useState(chamadosJSON);

  // Função para atualizar o status de um chamado
  const atualizarStatus = (id, novoStatus) => {
    setChamados(prev =>
      prev.map(chamado =>
        chamado.id === id ? { ...chamado, status: novoStatus } : chamado
      )
    );
  };

  const renderChamado = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DetalheChamado", {
          chamado: item,
          atualizarStatus
        })
      }
    >
      <View style={styles.cardHeader}>
        <Ionicons name="flame-outline" size={22} color="#fff" />
        <Text style={styles.nome}>{item.forno}</Text>
      </View>

      <Text style={styles.textoSecundario}>
        <Ionicons name="location-outline" size={16} color="#bbb" /> {item.endereco}
      </Text>
      <Text style={styles.textoSecundario}>
        <Ionicons name="alert-circle-outline" size={16} color="#bbb" /> {item.defeito}
      </Text>

      <Text style={styles.textoSecundario}>
        <Ionicons name="person-outline" size={16} color="#bbb" /> {item.responsavel} | {item.contato}
      </Text>

      <View
        style={[
          styles.status,
          { backgroundColor: item.status === "Aberto" ? "#e63946" : "#2a9d8f" },
        ]}
      >
        <Ionicons
          name={item.status === "Aberto" ? "time-outline" : "checkmark-circle-outline"}
          size={16}
          color="#fff"
        />
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Meus chamados</Text>

      <FlatList
        data={chamados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChamado}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001428", padding: 20 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "#0d2b45", padding: 15, borderRadius: 12, marginBottom: 15, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  nome: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 8 },
  textoSecundario: { color: "#bbb", marginTop: 2, fontSize: 14 },
  status: { flexDirection: "row", alignItems: "center", marginTop: 10, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, alignSelf: "flex-start" },
  statusText: { color: "#fff", fontWeight: "bold", marginLeft: 5, fontSize: 14 },
});
