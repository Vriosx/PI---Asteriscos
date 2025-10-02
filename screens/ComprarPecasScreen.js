import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ScrollView,
  Alert,
  Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import produtos from "../Dados/pecas.json";
import { useCarrinho } from "./CarrinhoContext";

export default function ComprarPecasScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const { carrinho, adicionarAoCarrinho } = useCarrinho();

  // Categorias únicas dos produtos
  const categorias = useMemo(() => {
    const cats = [...new Set(produtos.map(item => item.categoria))];
    return ["todos", ...cats];
  }, []);

  // Produtos filtrados por busca e categoria
  const produtosFiltrados = useMemo(() => {
    return produtos.filter((item) => {
      const matchesSearch = item.nome.toLowerCase().includes(search.toLowerCase()) ||
                           item.descricao?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "todos" || item.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  // Estatísticas do carrinho
  const totalItens = useMemo(() => {
    return carrinho.reduce((total, item) => total + (item.quantidade || 1), 0);
  }, [carrinho]);

  const handleAddToCart = (produto) => {
    if (produto.estoque === 0) {
      Alert.alert("Sem Estoque", "Este produto está temporariamente indisponível.");
      return;
    }

    adicionarAoCarrinho(produto);
    
    // Feedback visual
    Alert.alert("Sucesso!", `${produto.nome} adicionado ao carrinho.`, [
      { text: "Continuar Comprando", style: "cancel" },
      { 
        text: "Ver Carrinho", 
        onPress: () => navigation.navigate('Carrinho')
      }
    ]);
  };

  const CategoryButton = ({ category, label }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category && styles.categoryButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderProduto = ({ item }) => (
    <View style={styles.card}>
      {/* Badge de estoque */}
      {item.estoque === 0 && (
        <View style={styles.outOfStockBadge}>
          <Text style={styles.outOfStockText}>ESGOTADO</Text>
        </View>
      )}
      
      {item.estoque > 0 && item.estoque <= 5 && (
        <View style={styles.lowStockBadge}>
          <Text style={styles.lowStockText}>ÚLTIMAS UNIDADES</Text>
        </View>
      )}

      <View style={styles.cardHeader}>
        <View style={styles.produtoInfo}>
          <Text style={styles.nome} numberOfLines={2}>{item.nome}</Text>
          <Text style={styles.descricao} numberOfLines={2}>
            {item.descricao || "Peça de alta qualidade"}
          </Text>
        </View>
        
        {item.imagem ? (
          <Image source={{ uri: item.imagem }} style={styles.produtoImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="cog-outline" size={24} color="#4E89AE" />
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <View style={styles.priceContainer}>
          <Text style={styles.preco}>R$ {Number(item.valor).toFixed(2)}</Text>
          <View style={styles.stockContainer}>
            <Ionicons 
              name="cube-outline" 
              size={14} 
              color={item.estoque > 5 ? "#10B981" : item.estoque > 0 ? "#F59E0B" : "#EF4444"} 
            />
            <Text style={[
              styles.estoque,
              item.estoque === 0 && styles.estoqueZero,
              item.estoque > 0 && item.estoque <= 5 && styles.estoqueBaixo
            ]}>
              {item.estoque} em estoque
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.btnAdd,
            item.estoque === 0 && styles.btnAddDisabled
          ]}
          onPress={() => handleAddToCart(item)}
          disabled={item.estoque === 0}
        >
          <Ionicons 
            name={item.estoque === 0 ? "close-circle-outline" : "cart-outline"} 
            size={16} 
            color="#FFF" 
          />
          <Text style={styles.btnText}>
            {item.estoque === 0 ? "Sem Estoque" : "Adicionar"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.categoryTag}>
          <Ionicons name="pricetag-outline" size={12} color="#94A3B8" />
          <Text style={styles.categoryText}>{item.categoria}</Text>
        </View>
        {item.freteGratis && (
          <View style={styles.freeShippingTag}>
            <Ionicons name="rocket-outline" size={12} color="#10B981" />
            <Text style={styles.freeShippingText}>Frete Grátis</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Peças e Componentes</Text>
          <Text style={styles.subtitle}>
            {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Ionicons name="cart-outline" size={24} color="#FFF" />
          {totalItens > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItens}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#94A3B8" />
        <TextInput
          placeholder="Buscar por nome, descrição..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categorias */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categorias.map((category) => (
          <CategoryButton 
            key={category}
            category={category}
            label={category === "todos" ? "Todos" : category}
          />
        ))}
      </ScrollView>

      {/* Lista de Produtos */}
      {produtosFiltrados.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color="#475569" />
          <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
          <Text style={styles.emptySubtext}>
            Tente ajustar sua busca ou filtro
          </Text>
        </View>
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderProduto}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          numColumns={1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0F172A",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: { 
    color: "#FFF", 
    fontSize: 28, 
    fontWeight: "bold" 
  },
  subtitle: { 
    color: "#94A3B8", 
    fontSize: 14, 
    marginTop: 4 
  },
  cartButton: {
    position: "relative",
    padding: 8,
  },
  cartBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: "#FFF",
    fontSize: 16,
    marginLeft: 12,
    marginRight: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  categoryButtonActive: {
    backgroundColor: "#4E89AE",
    borderColor: "#4E89AE",
  },
  categoryButtonText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
  },
  categoryButtonTextActive: {
    color: "#FFF",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4E89AE",
    position: "relative",
    overflow: "hidden",
  },
  outOfStockBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  outOfStockText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  lowStockBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#F59E0B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  lowStockText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  produtoInfo: {
    flex: 1,
    marginRight: 12,
  },
  nome: { 
    color: "#FFF", 
    fontSize: 18, 
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 24,
  },
  descricao: { 
    color: "#94A3B8", 
    fontSize: 14,
    lineHeight: 20,
  },
  produtoImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#334155",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  priceContainer: {
    flex: 1,
  },
  preco: { 
    color: "#00FF99", 
    fontSize: 20, 
    fontWeight: "bold",
    marginBottom: 4,
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  estoque: { 
    color: "#94A3B8", 
    fontSize: 12,
    marginLeft: 4,
  },
  estoqueZero: {
    color: "#EF4444",
  },
  estoqueBaixo: {
    color: "#F59E0B",
  },
  btnAdd: {
    backgroundColor: "#0077b6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: "center",
  },
  btnAddDisabled: {
    backgroundColor: "#475569",
  },
  btnText: { 
    color: "#fff", 
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#334155",
    paddingTop: 12,
  },
  categoryTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  freeShippingTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B98120",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#10B981",
  },
  freeShippingText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    color: "#CBD5E0",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});