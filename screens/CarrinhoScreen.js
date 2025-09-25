import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useCarrinho } from "./CarrinhoContext";

export default function CarrinhoScreen() {
  const { carrinho } = useCarrinho();

  const total = carrinho.reduce(
    (soma, item) => soma + Number(item.valor) * (item.quantidade || 1),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      {carrinho.length === 0 ? (
        <Text style={styles.text}>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={carrinho}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.text}>Preço: R$ {Number(item.valor).toFixed(2)}</Text>
                <Text style={styles.text}>Qtd: {item.quantidade}</Text>
              </View>
            </View>
          )}
        />
      )}

      {carrinho.length > 0 && (
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Gerar OS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00111A", padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  card: {
    backgroundColor: "#0D1B2A",
    flexDirection: "row",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  nome: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  text: { color: "#ccc", fontSize: 14 },
  totalBox: {
    backgroundColor: "#0D1B2A",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  totalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
  btn: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
