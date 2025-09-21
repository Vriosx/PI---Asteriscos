import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { getChamados } from '../Dados/ChamadoMock';

export default function Tela4() {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    setChamados(getChamados());
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notificações</Text>

      {chamados.length === 0 && (
        <Text style={{ color:'#aaa', textAlign:'center', marginVertical:20 }}>Nenhum chamado aberto</Text>
      )}

      {chamados.map(c => (
        <View key={c.id} style={styles.notificationCard}>
          <Text style={styles.cardTitle}>{c.assunto}</Text>
          <Text style={styles.cardText}>{c.descricao}</Text>
          {c.imagem && <Image source={{ uri: c.imagem }} style={{ width: '100%', height: 150, borderRadius: 8, marginTop: 5 }} />}
          <Text style={styles.time}>{c.hora}</Text>
        </View>
      ))}
      <View style={styles.notificationCard}>
          <Text style={styles.cardTitle}>Atualização</Text>
          <Text style={styles.cardText}>Chamado atualizado para Em Andamento</Text>
        </View>

      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.bottomButtonText}>Ver mais</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#06101B', padding:20 },
  title: { fontSize:24, color:'#fff', fontWeight:'bold', marginBottom:20 },
  notificationCard: { backgroundColor:'#333', padding:15, borderRadius:8, marginBottom:15 },
  cardTitle: { fontSize:16, color:'#fff', fontWeight:'bold' },
  cardText: { fontSize:14, color:'#A0A0A0', marginVertical:5 },
  time: { fontSize:12, color:'#A0A0A0', textAlign:'right' },
  bottomButton: { marginTop:20, backgroundColor:'#4E89AE', paddingVertical:10, borderRadius:5, alignItems:'center' },
  bottomButtonText: { color:'#fff', fontSize:16 }
});
