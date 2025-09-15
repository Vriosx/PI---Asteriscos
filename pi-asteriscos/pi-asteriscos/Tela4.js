import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Tela4() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>

      <View style={styles.notificationCard}>
        <Text style={styles.cardTitle}>Seu chamado</Text>
        <Text style={styles.cardText}>
          #2025-001 foi atualizado para Em andamento.
        </Text>
        <Text style={styles.time}>Há 1h</Text>
      </View>

      <View style={styles.notificationCard}>
        <Text style={styles.cardTitle}>Chamado concluído</Text>
        <Text style={styles.cardText}>Avalie o atendimento</Text>
        <Text style={styles.time}>Há 3h</Text>
      </View>

      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06101B',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    color: '#A0A0A0',
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'right',
  },
  bottomButton: {
    marginTop: 20,
    backgroundColor: '#4E89AE',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
