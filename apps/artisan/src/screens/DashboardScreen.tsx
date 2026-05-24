import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { COLORS } from '../shared';

const JOBS = [
  { id: 1, client: 'Sarra B.', service: 'Plomberie', zone: 'Ariana Soghra', time: "14h–16h", desc: "Fuite sous l'évier", urgent: false },
  { id: 2, client: 'Amine T.', service: 'Plomberie', zone: 'El Menzah',     time: "Aujourd'hui soir", desc: 'Robinet cassé salle de bain', urgent: true },
];

export const DashboardScreen = ({ navigation }: any) => {
  const [available, setAvailable] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour, Mohamed 👋</Text>
          <Text style={styles.title}>Nouvelles demandes</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MS</Text>
          {available && <View style={styles.onlineDot} />}
        </View>
      </View>

      {/* Availability toggle */}
      <View style={[styles.toggleCard, available && styles.toggleCardActive]}>
        <View>
          <Text style={styles.toggleTitle}>Statut</Text>
          <Text style={[styles.toggleStatus, { color: available ? COLORS.green : COLORS.textSub }]}>
            {available ? '● Disponible pour des travaux' : '○ Non disponible'}
          </Text>
        </View>
        <Switch value={available} onValueChange={setAvailable}
          trackColor={{ false: COLORS.border, true: COLORS.green }}
          thumbColor="#fff" />
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { label: 'Ce mois', value: '8', sub: 'travaux' },
          { label: 'En attente', value: '2', sub: 'demandes' },
          { label: 'Note', value: '4.8', sub: '★' },
        ].map((s, i) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={[styles.statValue, { color: [COLORS.accent, COLORS.blue, COLORS.green][i] }]}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Incoming requests */}
      <Text style={styles.sectionLabel}>DEMANDES REÇUES</Text>
      {JOBS.map(j => (
        <TouchableOpacity key={j.id} style={styles.jobCard}
          onPress={() => navigation.navigate('RequestDetail', { jobId: j.id })}>
          <View style={styles.jobTop}>
            <View style={styles.clientInfo}>
              <View style={styles.clientAvatar}><Text style={styles.clientAvatarText}>{j.client[0]}</Text></View>
              <View>
                <Text style={styles.clientName}>{j.client}</Text>
                <Text style={styles.clientService}>{j.service}</Text>
              </View>
            </View>
            {j.urgent && <Text style={styles.urgentBadge}>🔴 Urgent</Text>}
          </View>
          <Text style={styles.jobDesc}>"{j.desc}"</Text>
          <View style={styles.jobBottom}>
            <Text style={styles.jobMeta}>📍 {j.zone}  🕐 {j.time}</Text>
            <View style={styles.jobActions}>
              <TouchableOpacity style={styles.declineBtn}><Text style={styles.declineText}>✕</Text></TouchableOpacity>
              <TouchableOpacity style={styles.acceptBtn}
                onPress={() => navigation.navigate('RequestDetail', { jobId: j.id })}>
                <Text style={styles.acceptText}>✓ Voir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.bg },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  greeting:        { fontSize: 12, color: COLORS.textSub },
  title:           { fontSize: 22, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  avatar:          { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.accent + '33', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  avatarText:      { color: COLORS.accent, fontWeight: '700' },
  onlineDot:       { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, backgroundColor: COLORS.green, borderRadius: 5, borderWidth: 2, borderColor: COLORS.bg },
  toggleCard:      { marginHorizontal: 20, backgroundColor: COLORS.surfaceHigh, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  toggleCardActive:{ borderColor: COLORS.green + '66' },
  toggleTitle:     { fontSize: 14, fontWeight: '600', color: COLORS.text },
  toggleStatus:    { fontSize: 12, marginTop: 2 },
  statsRow:        { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 24 },
  statCard:        { flex: 1, backgroundColor: COLORS.surfaceHigh, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: 14, alignItems: 'center' },
  statValue:       { fontSize: 20, fontWeight: '700' },
  statLabel:       { fontSize: 10, color: COLORS.textSub, marginTop: 2 },
  sectionLabel:    { fontSize: 11, fontWeight: '700', color: COLORS.textSub, letterSpacing: 1.2, paddingHorizontal: 20, marginBottom: 12 },
  jobCard:         { backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, marginHorizontal: 20, marginBottom: 12 },
  jobTop:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  clientInfo:      { flexDirection: 'row', alignItems: 'center', gap: 10 },
  clientAvatar:    { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.blue + '33', alignItems: 'center', justifyContent: 'center' },
  clientAvatarText:{ color: COLORS.blue, fontWeight: '700' },
  clientName:      { fontSize: 13, fontWeight: '600', color: COLORS.text },
  clientService:   { fontSize: 11, color: COLORS.textSub },
  urgentBadge:     { fontSize: 11, color: COLORS.red, backgroundColor: COLORS.red + '22', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, fontWeight: '600' },
  jobDesc:         { fontSize: 13, color: COLORS.textSub, fontStyle: 'italic', marginBottom: 10 },
  jobBottom:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jobMeta:         { fontSize: 11, color: COLORS.textSub },
  jobActions:      { flexDirection: 'row', gap: 8 },
  declineBtn:      { backgroundColor: COLORS.red + '22', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  declineText:     { color: COLORS.red, fontWeight: '600' },
  acceptBtn:       { backgroundColor: COLORS.green + '22', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  acceptText:      { color: COLORS.green, fontWeight: '600', fontSize: 12 },
});
