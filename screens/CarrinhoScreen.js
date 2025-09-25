import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function CarrinhoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>

      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>Timer Fischer Forno Elétrico 120Min Eos</Text>
          <Text style={styles.text}>Preço: 25,20</Text>
          <Text style={styles.text}>Qtd: 1</Text>
        </View>
      </View>

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
  btnText: { color: "#fff", fontWeight: "bold" },
});
