import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const chamados = [
    {
      id: "1",
      responsavel: "Nome responsável",
      endereco: "Rua Brooklin, 279",
      descricao: "Não esquenta direito",
      status: "Aberto",
    },
    {
      id: "2",
      responsavel: "Nome responsável",
      endereco: "Rua Brooklin, 278",
      descricao: "Não esquenta direito",
      status: "Finalizado",
    },
  ];

  const renderChamado = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.responsavel}>{item.responsavel}</Text>

      <View style={styles.row}>
        <Ionicons name="location" size={16} color="#fff" />
        <Text style={styles.text}>{item.endereco}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="alert-circle-outline" size={16} color="#fff" />
        <Text style={styles.text}>{item.descricao}</Text>
      </View>

      <View
        style={[
          styles.statusContainer,
          item.status === "Aberto" ? styles.aberto : styles.finalizado,
        ]}
      >
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus chamados</Text>

      <FlatList
        data={chamados}
        keyExtractor={(item) => item.id}
        renderItem={renderChamado}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      {/* Barra inferior */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00111A",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#0D1B2A",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    position: "relative",
  },
  responsavel: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  text: {
    color: "#fff",
    marginLeft: 6,
  },
  statusContainer: {
    position: "absolute",
    top: 15,
    right: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aberto: {
    backgroundColor: "#ffcccc",
  },
  finalizado: {
    backgroundColor: "#ccffcc",
  },
  statusText: {
    fontWeight: "bold",
    color: "#000",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00111A",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
  },
});
