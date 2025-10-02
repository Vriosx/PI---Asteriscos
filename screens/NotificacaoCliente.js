import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StatusBar,
  RefreshControl,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getChamados } from '../Dados/ChamadoMock';

export default function Tela4() {
  const [chamados, setChamados] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    loadData();
    animateIn();
  }, []);

  const animateIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const loadData = () => {
    const chamadosData = getChamados();
    setChamados(chamadosData);
    
    // Simular notificações de sistema
    const systemNotifications = [
      {
        id: '1',
        type: 'status_update',
        title: 'Status Atualizado',
        message: 'Seu chamado #001 foi marcado como Em Andamento',
        time: 'Há 5 minutos',
        icon: 'sync-circle',
        color: '#F59E0B',
        read: false
      },
      {
        id: '2',
        type: 'new_feature',
        title: 'Nova Funcionalidade',
        message: 'Agora você pode acompanhar seu técnico em tempo real',
        time: 'Há 2 horas',
        icon: 'rocket-outline',
        color: '#4E89AE',
        read: true
      },
      {
        id: '3',
        type: 'reminder',
        title: 'Lembrete',
        message: 'Não se esqueça de avaliar o atendimento do seu último chamado',
        time: 'Ontem',
        icon: 'notifications-outline',
        color: '#10B981',
        read: true
      }
    ];
    
    setNotifications(systemNotifications);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1500);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'status_update': return 'sync-circle';
      case 'new_feature': return 'rocket-outline';
      case 'reminder': return 'notifications-outline';
      default: return 'information-circle';
    }
  };

  const NotificationCard = ({ notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationCard,
        !notification.read && styles.unreadNotification
      ]}
      onPress={() => markAsRead(notification.id)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationHeader}>
        <View style={[styles.iconContainer, { backgroundColor: notification.color + '20' }]}>
          <Ionicons 
            name={notification.icon} 
            size={20} 
            color={notification.color} 
          />
        </View>
        <View style={styles.notificationTitleContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        {!notification.read && (
          <View style={styles.unreadBadge} />
        )}
      </View>
      <Text style={styles.notificationMessage}>{notification.message}</Text>
    </TouchableOpacity>
  );

  const ChamadoCard = ({ chamado }) => (
    <View style={styles.chamadoCard}>
      <View style={styles.chamadoHeader}>
        <View style={styles.chamadoTitleContainer}>
          <Ionicons name="document-text-outline" size={18} color="#4E89AE" />
          <Text style={styles.chamadoTitle}>{chamado.assunto}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: chamado.status === 'Aberto' ? '#EF4444' : '#10B981' }
        ]}>
          <Text style={styles.statusText}>{chamado.status}</Text>
        </View>
      </View>
      
      <Text style={styles.chamadoDescription} numberOfLines={2}>
        {chamado.descricao}
      </Text>
      
      {chamado.imagem && (
        <Image 
          source={{ uri: chamado.imagem }} 
          style={styles.chamadoImage} 
        />
      )}
      
      <View style={styles.chamadoFooter}>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={14} color="#94A3B8" />
          <Text style={styles.chamadoTime}>{chamado.hora}</Text>
        </View>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>Ver detalhes</Text>
          <Ionicons name="chevron-forward" size={14} color="#4E89AE" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notificações</Text>
          <Text style={styles.subtitle}>
            {unreadCount > 0 
              ? `${unreadCount} não lida${unreadCount !== 1 ? 's' : ''}`
              : 'Todas as notificações'
            }
          </Text>
        </View>
        
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Ionicons name="checkmark-done-outline" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4E89AE']}
            tintColor="#4E89AE"
          />
        }
      >
        {/* Seção de Notificações do Sistema */}
        {notifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notificações do Sistema</Text>
            {notifications.map(notification => (
              <NotificationCard 
                key={notification.id} 
                notification={notification} 
              />
            ))}
          </View>
        )}

        {/* Seção de Chamados Ativos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seus Chamados Ativos</Text>
          
          {chamados.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={48} color="#475569" />
              <Text style={styles.emptyText}>Nenhum chamado aberto</Text>
              <Text style={styles.emptySubtext}>
                Quando você abrir um chamado, ele aparecerá aqui
              </Text>
            </View>
          ) : (
            chamados.map(chamado => (
              <ChamadoCard key={chamado.id} chamado={chamado} />
            ))
          )}
        </View>

        {/* Card Informativo */}
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#4E89AE" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Atendimento Garantido</Text>
            <Text style={styles.infoText}>
              Nossa equipe está sempre disponível para ajudar você
            </Text>
          </View>
        </View>

        {/* Botão Ver Mais */}
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Carregar mais notificações</Text>
          <Ionicons name="arrow-down-outline" size={16} color="#FFF" />
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1E293B',
  },
  title: { 
    fontSize: 28, 
    color: '#FFF', 
    fontWeight: 'bold' 
  },
  subtitle: { 
    color: '#94A3B8', 
    fontSize: 14, 
    marginTop: 4 
  },
  clearButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#334155',
  },
  unreadNotification: {
    borderLeftColor: '#4E89AE',
    backgroundColor: '#1E293B',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationTitleContainer: {
    flex: 1,
  },
  notificationTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  notificationTime: {
    color: '#94A3B8',
    fontSize: 12,
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4E89AE',
    marginLeft: 8,
    marginTop: 4,
  },
  notificationMessage: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  chamadoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4E89AE',
  },
  chamadoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  chamadoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  chamadoTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  chamadoDescription: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  chamadoImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  chamadoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chamadoTime: {
    color: '#94A3B8',
    fontSize: 12,
    marginLeft: 4,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#4E89AE',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#CBD5E0',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4E89AE',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  bottomButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});