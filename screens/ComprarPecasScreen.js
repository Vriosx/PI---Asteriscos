import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import produtos from "../Dados/pecas.json";
import { useCarrinho } from "./CarrinhoContext";

export default function ComprarPecasScreen() {
  const [search, setSearch] = useState("");
  const { carrinho, adicionarAoCarrinho } = useCarrinho();

  const produtosFiltrados = produtos.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comprar Peças</Text>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Buscar peças"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons
          name="cart-outline"
          size={28}
          color={carrinho.length > 0 ? "limegreen" : "#fff"}
        />
      </View>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {Number(item.valor).toFixed(2)}</Text>
              <Text style={styles.estoque}>Estoque: {item.estoque}</Text>

              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => adicionarAoCarrinho(item)}
              >
                <Text style={styles.btnText}>Adicionar ao carrinho</Text>
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
  nome: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  preco: { color: "#00ff99", fontSize: 14, marginBottom: 5 },
  estoque: { color: "#aaa", marginBottom: 6 },
  btnAdd: {
    backgroundColor: "#0077b6",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
