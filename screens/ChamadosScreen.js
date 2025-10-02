import React, { useState, useMemo } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  TextInput,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import chamadosJSON from "../Dados/chamados.json";

export default function ChamadosScreen({ navigation }) {
  const [chamados, setChamados] = useState(chamadosJSON);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");

  // Filtros e busca
  const chamadosFiltrados = useMemo(() => {
    return chamados.filter(chamado => {
      const matchesSearch = 
        chamado.forno.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chamado.defeito.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chamado.responsavel.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        filterStatus === "todos" || 
        chamado.status.toLowerCase() === filterStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [chamados, searchQuery, filterStatus]);

  // Estatísticas
  const estatisticas = useMemo(() => {
    const total = chamados.length;
    const abertos = chamados.filter(c => c.status === "Aberto").length;
    const fechados = chamados.filter(c => c.status === "Fechado").length;
    return { total, abertos, fechados };
  }, [chamados]);

  const atualizarStatus = (id, novoStatus) => {
    setChamados(prev =>
      prev.map(chamado =>
        chamado.id === id ? { ...chamado, status: novoStatus } : chamado
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Aberto": return "#EF4444";
      case "Em Andamento": return "#F59E0B";
      case "Fechado": return "#10B981";
      default: return "#6B7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Aberto": return "alert-circle-outline";
      case "Em Andamento": return "time-outline";
      case "Fechado": return "checkmark-circle-outline";
      default: return "help-circle-outline";
    }
  };

  const renderChamado = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        index === 0 && styles.firstCard,
        index === chamadosFiltrados.length - 1 && styles.lastCard
      ]}
      onPress={() =>
        navigation.navigate("DetalheChamado", {
          chamado: item,
          atualizarStatus
        })
      }
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
          <Ionicons name="flame-outline" size={20} color="#F97316" />
          <Text style={styles.nome} numberOfLines={1}>{item.forno}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons 
            name={getStatusIcon(item.status)} 
            size={14} 
            color="#FFF" 
          />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#94A3B8" />
          <Text style={styles.textoSecundario} numberOfLines={1}>
            {item.endereco}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="alert-circle-outline" size={16} color="#94A3B8" />
          <Text style={styles.textoSecundario} numberOfLines={2}>
            {item.defeito}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={16} color="#94A3B8" />
          <Text style={styles.textoSecundario}>
            {item.responsavel} • {item.contato}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.priorityTag}>
          <Ionicons name="flag-outline" size={12} color="#94A3B8" />
          <Text style={styles.priorityText}>
            {item.prioridade || "Média"}
          </Text>
        </View>
        <Text style={styles.dataText}>
          {new Date(item.data).toLocaleDateString('pt-BR')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ status, label, icon }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filterStatus === status && styles.filterButtonActive
      ]}
      onPress={() => setFilterStatus(status)}
    >
      <Ionicons 
        name={icon} 
        size={16} 
        color={filterStatus === status ? "#FFF" : "#94A3B8"} 
      />
      <Text style={[
        styles.filterButtonText,
        filterStatus === status && styles.filterButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Meus Chamados</Text>
          <Text style={styles.subtitle}>
            {estatisticas.total} chamado{estatisticas.total !== 1 ? 's' : ''} no total
          </Text>
        </View>
        <TouchableOpacity style={styles.newButton}>
          <Ionicons name="add-circle-outline" size={22} color="#4E89AE" />
        </TouchableOpacity>
      </View>

      {/* Estatísticas */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
      >
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{estatisticas.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={[styles.statCard, styles.statCardOpen]}>
          <Text style={styles.statNumber}>{estatisticas.abertos}</Text>
          <Text style={styles.statLabel}>Abertos</Text>
        </View>
        <View style={[styles.statCard, styles.statCardClosed]}>
          <Text style={styles.statNumber}>{estatisticas.fechados}</Text>
          <Text style={styles.statLabel}>Fechados</Text>
        </View>
      </ScrollView>

      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#94A3B8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por forno, defeito ou responsável..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <FilterButton status="todos" label="Todos" icon="grid-outline" />
        <FilterButton status="aberto" label="Abertos" icon="alert-circle-outline" />
        <FilterButton status="em andamento" label="Andamento" icon="time-outline" />
        <FilterButton status="fechado" label="Fechados" icon="checkmark-circle-outline" />
      </View>

      {/* Lista de Chamados */}
      {chamadosFiltrados.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={64} color="#475569" />
          <Text style={styles.emptyText}>Nenhum chamado encontrado</Text>
          <Text style={styles.emptySubtext}>
            {searchQuery || filterStatus !== "todos" 
              ? "Tente ajustar os filtros ou busca"
              : "Comece criando um novo chamado"
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={chamadosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderChamado}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  newButton: {
    padding: 8,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 100,
    alignItems: "center",
  },
  statCardOpen: {
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  statCardClosed: {
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  statNumber: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
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
  filtersContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  filterButtonActive: {
    backgroundColor: "#4E89AE",
    borderColor: "#4E89AE",
  },
  filterButtonText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  filterButtonTextActive: {
    color: "#FFF",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4E89AE",
  },
  firstCard: {
    marginTop: 0,
  },
  lastCard: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  nome: { 
    color: "#FFF", 
    fontSize: 18, 
    fontWeight: "bold", 
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { 
    color: "#FFF", 
    fontWeight: "600", 
    fontSize: 12,
    marginLeft: 4,
  },
  cardContent: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  textoSecundario: { 
    color: "#94A3B8", 
    fontSize: 14, 
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#334155",
    paddingTop: 12,
  },
  priorityTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#334155",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  dataText: {
    color: "#64748B",
    fontSize: 12,
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