import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const produtos = [
  { id: "1", nome: "Timer Fischer Forno Elétrico 120Min Eos", preco: 25.20, img: "https://via.placeholder.com/80" },
  { id: "2", nome: "Timer Fischer Forno Elétrico 120Min Eos", preco: 25.20, img: "https://via.placeholder.com/80" },
  { id: "3", nome: "Timer Fischer Forno Elétrico 120Min Eos", preco: 25.20, img: "https://via.placeholder.com/80" },
];

export default function ComprarPecasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comprar peças</Text>

      <View style={styles.searchRow}>
        <TextInput placeholder="Buscar peças" placeholderTextColor="#999" style={styles.searchInput} />
        <Ionicons name="cart-outline" size={28} color="#fff" />
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
              <TouchableOpacity style={styles.btnAdd}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Adicionar ao carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00111A", padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  searchInput: {
    backgroundColor: "#0D1B2A",
    flex: 1,
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginRight: 10,
  },
  card: {
    backgroundColor: "#0D1B2A",
    flexDirection: "row",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  img: { width: 80, height: 80, marginRight: 10 },
  nome: { color: "#fff", fontWeight: "bold", marginBottom: 5 },
  preco: { color: "#0f0", marginBottom: 8 },
  btnAdd: { backgroundColor: "#0077ff", padding: 8, borderRadius: 6, alignItems: "center" },
});
