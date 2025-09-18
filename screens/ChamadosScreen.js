import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const chamados = [
  {
    id: 1,
    forno: "Forno Elétrico X",
    defeito: "Não esquenta direito",
    status: "Aberto",
    responsavel: "João",
    contato: "(11) 99999-9999",
    endereco: "Rua Brooklin, 279",
    detalhe: "O forno demora mais de 20 minutos para aquecer corretamente."
  },
  {
    id: 2,
    forno: "Forno Fischer",
    defeito: "Timer quebrado",
    status: "Finalizado",
    responsavel: "Maria",
    contato: "(11) 98888-8888",
    endereco: "Rua Augusta, 150",
    detalhe: "O timer não está funcionando e precisa ser substituído."
  }
];

export default function ChamadosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus chamados</Text>

      {chamados.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => navigation.navigate('DetalheChamado', { chamado: item })}
        >
          <Text style={styles.nome}>{item.forno}</Text>
          <Text>{item.endereco}</Text>
          <Text>{item.defeito}</Text>
          <View style={[
            styles.status,
            { backgroundColor: item.status === "Aberto" ? "red" : "green" }
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#001428", padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "#0d2b45", padding: 15, borderRadius: 10, marginBottom: 15 },
  nome: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  status: { marginTop: 10, padding: 5, borderRadius: 5, alignSelf: "flex-start" },
  statusText: { color: "#fff", fontWeight: "bold" }
});
