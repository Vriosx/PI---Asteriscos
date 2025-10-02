import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { useCarrinho } from "./CarrinhoContext";
import { Ionicons } from "@expo/vector-icons";

export default function CarrinhoScreen() {
  const { carrinho, removerItem, alterarQuantidade } = useCarrinho();

  const total = carrinho.reduce(
    (soma, item) => soma + Number(item.valor) * (item.quantidade || 1),
    0
  );

  const handleGerarOS = () => {
    if (carrinho.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione itens ao carrinho antes de gerar uma OS.");
      return;
    }
    Alert.alert(
      "Gerar Ordem de Serviço",
      `Deseja gerar OS para ${carrinho.length} item(ns) no valor total de R$ ${total.toFixed(2)}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => console.log("OS gerada") }
      ]
    );
  };

  const aumentarQuantidade = (index) => {
    const item = carrinho[index];
    alterarQuantidade(index, item.quantidade + 1);
  };

  const diminuirQuantidade = (index) => {
    const item = carrinho[index];
    if (item.quantidade > 1) {
      alterarQuantidade(index, item.quantidade - 1);
    } else {
      removerItem(index);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.itemInfo}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.preco}>R$ {Number(item.valor).toFixed(2)}</Text>
        </View>
        
        <View style={styles.quantidadeContainer}>
          <TouchableOpacity 
            style={styles.quantidadeBtn}
            onPress={() => diminuirQuantidade(index)}
          >
            <Ionicons name="remove" size={16} color="#FFF" />
          </TouchableOpacity>
          
          <View style={styles.quantidadeDisplay}>
            <Text style={styles.quantidadeText}>{item.quantidade}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.quantidadeBtn}
            onPress={() => aumentarQuantidade(index)}
          >
            <Ionicons name="add" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.subtotal}>
          Subtotal: R$ {(Number(item.valor) * item.quantidade).toFixed(2)}
        </Text>
        
        <TouchableOpacity 
          style={styles.removerBtn}
          onPress={() => removerItem(index)}
        >
          <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Carrinho de Compras</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{carrinho.length}</Text>
        </View>
      </View>

      {carrinho.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={64} color="#4A5568" />
          <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
          <Text style={styles.emptySubtext}>Adicione itens para continuar</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={carrinho}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />

          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <View style={styles.totalLine}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
              </View>
              
              <View style={styles.resumo}>
                <Text style={styles.resumoText}>
                  {carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.btn, total === 0 && styles.btnDisabled]}
              onPress={handleGerarOS}
              disabled={total === 0}
            >
              <Ionicons name="document-text-outline" size={20} color="#FFF" />
              <Text style={styles.btnText}>Gerar Ordem de Serviço</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0F172A", 
    padding: 20 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
    marginTop: 10,
  },
  title: { 
    color: "#FFF", 
    fontSize: 24, 
    fontWeight: "bold" 
  },
  badge: {
    backgroundColor: "#1E40AF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#CBD5E0",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptySubtext: {
    color: "#718096",
    fontSize: 14,
    marginTop: 8,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  nome: { 
    color: "#FFF", 
    fontSize: 16, 
    fontWeight: "bold",
    marginBottom: 4,
  },
  preco: { 
    color: "#3B82F6", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  quantidadeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    borderRadius: 8,
    padding: 4,
  },
  quantidadeBtn: {
    backgroundColor: "#475569",
    borderRadius: 6,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  quantidadeDisplay: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  quantidadeText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#334155",
    paddingTop: 12,
  },
  subtotal: {
    color: "#CBD5E0",
    fontSize: 14,
    fontWeight: "500",
  },
  removerBtn: {
    padding: 6,
  },
  footer: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  totalContainer: {
    marginBottom: 16,
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  totalLabel: {
    color: "#CBD5E0",
    fontSize: 18,
    fontWeight: "600",
  },
  totalValue: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  resumo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resumoText: {
    color: "#94A3B8",
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnDisabled: {
    backgroundColor: "#475569",
    shadowOpacity: 0,
  },
  btnText: { 
    color: "#FFF", 
    fontWeight: "bold", 
    fontSize: 16,
    marginLeft: 8,
  },
});