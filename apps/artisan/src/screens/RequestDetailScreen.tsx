import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { COLORS } from '../shared';

const JOBS: Record<number, any> = {
  1: { id: 1, client: 'Sarra B.', service: 'Plomberie', zone: 'Ariana Soghra', address: 'Rue Abou Bakr Esseddik, Ariana', time: "Aujourd'hui · 14h–16h", desc: "Fuite sous l'évier de la cuisine. L'eau coule depuis 2 jours.", phone: '21622345678' },
  2: { id: 2, client: 'Amine T.', service: 'Plomberie', zone: 'El Menzah', address: 'Av. Mohamed V, El Menzah', time: "Aujourd'hui soir", desc: 'Robinet cassé salle de bain, eau qui coule en permanence.', phone: '21625678901' },
};

export const RequestDetailScreen = ({ navigation, route }: any) => {
  const { jobId } = route.params;
  const job = JOBS[jobId] || JOBS[1];
  const [accepted, setAccepted] = useState(false);

  if (accepted) return (
    <View style={styles.successContainer}>
      <View style={styles.successIcon}><Text style={{ fontSize: 36 }}>✓</Text></View>
      <Text style={styles.successTitle}>Travail accepté !</Text>
      <Text style={styles.successSub}>Le client est notifié. Rends-toi à l'adresse au créneau convenu.</Text>
      <View style={styles.recap}>
        <Text style={styles.recapLabel}>ADRESSE</Text>
        <Text style={styles.recapAddress}>{job.address}</Text>
        <Text style={styles.recapTime}>{job.time}</Text>
      </View>
      <TouchableOpacity style={styles.whatsappBtn}
        onPress={() => Linking.openURL(`https://wa.me/${job.phone}`)}>
        <Text style={styles.whatsappText}>💬 Contacter via WhatsApp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.primaryBtnText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Détail de la demande</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Client card */}
        <View style={styles.clientCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{job.client[0]}</Text></View>
          <View>
            <Text style={styles.clientName}>{job.client}</Text>
            <Text style={styles.clientMeta}>Client vérifié · 3 travaux passés</Text>
          </View>
        </View>

        {/* Job details */}
        <Text style={styles.sectionLabel}>DÉTAILS DU TRAVAIL</Text>
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.detailLabel}>SERVICE</Text>
              <Text style={styles.detailValue}>{job.service}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.detailLabel}>CRÉNEAU</Text>
              <Text style={styles.detailValue}>{job.time}</Text>
            </View>
          </View>
          <Text style={styles.detailLabel}>DESCRIPTION</Text>
          <Text style={styles.description}>"{job.desc}"</Text>
        </View>

        {/* Address */}
        <Text style={styles.sectionLabel}>ADRESSE</Text>
        <View style={[styles.card, { flexDirection: 'row', gap: 12, alignItems: 'center' }]}>
          <Text style={{ fontSize: 20 }}>📍</Text>
          <View>
            <Text style={styles.detailValue}>{job.address}</Text>
            <Text style={styles.detailLabel}>{job.zone} · ~2.3 km</Text>
          </View>
        </View>

        {/* Cash reminder */}
        <View style={styles.cashNotice}>
          <Text style={styles.cashText}>💰 Paiement en espèces après le travail</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.declineBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.declineText}>Refuser</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptBtn} onPress={() => setAccepted(true)}>
            <Text style={styles.acceptText}>✓ Accepter le travail</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.bg },
  successContainer: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center', padding: 32 },
  header:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  backBtn:          { width: 36, height: 36, backgroundColor: COLORS.surfaceHigh, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  backIcon:         { color: COLORS.text, fontSize: 16 },
  title:            { fontSize: 16, fontWeight: '700', color: COLORS.text },
  clientCard:       { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, marginBottom: 20 },
  avatar:           { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.blue + '33', alignItems: 'center', justifyContent: 'center' },
  avatarText:       { color: COLORS.blue, fontSize: 20, fontWeight: '700' },
  clientName:       { fontSize: 16, fontWeight: '700', color: COLORS.text },
  clientMeta:       { fontSize: 12, color: COLORS.textSub },
  sectionLabel:     { fontSize: 11, fontWeight: '700', color: COLORS.textSub, letterSpacing: 1.2, marginBottom: 10 },
  card:             { backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, marginBottom: 16 },
  detailRow:        { flexDirection: 'row', marginBottom: 12 },
  detailLabel:      { fontSize: 10, color: COLORS.textSub, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  detailValue:      { fontSize: 14, fontWeight: '600', color: COLORS.text },
  description:      { fontSize: 14, color: COLORS.text, lineHeight: 22, fontStyle: 'italic', marginTop: 4 },
  cashNotice:       { backgroundColor: COLORS.accent + '11', borderWidth: 1, borderColor: COLORS.accent + '33', borderRadius: 14, padding: 14, marginBottom: 24 },
  cashText:         { fontSize: 13, color: COLORS.accent },
  actions:          { flexDirection: 'row', gap: 10 },
  declineBtn:       { flex: 1, backgroundColor: 'transparent', borderRadius: 14, borderWidth: 1, borderColor: COLORS.red + '44', padding: 14, alignItems: 'center' },
  declineText:      { color: COLORS.red, fontWeight: '700' },
  acceptBtn:        { flex: 2, backgroundColor: COLORS.accent, borderRadius: 14, padding: 14, alignItems: 'center' },
  acceptText:       { color: '#000', fontWeight: '700', fontSize: 15 },
  successIcon:      { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.green + '22', borderWidth: 2, borderColor: COLORS.green, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitle:     { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  successSub:       { fontSize: 14, color: COLORS.textSub, textAlign: 'center', marginBottom: 24 },
  recap:            { width: '100%', backgroundColor: COLORS.surfaceHigh, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, marginBottom: 16 },
  recapLabel:       { fontSize: 11, color: COLORS.textSub, marginBottom: 6, fontWeight: '700', letterSpacing: 1 },
  recapAddress:     { fontSize: 14, color: COLORS.text, fontWeight: '600' },
  recapTime:        { fontSize: 12, color: COLORS.textSub, marginTop: 4 },
  whatsappBtn:      { width: '100%', backgroundColor: COLORS.green + '22', borderRadius: 14, borderWidth: 1, borderColor: COLORS.green + '44', padding: 14, alignItems: 'center', marginBottom: 12 },
  whatsappText:     { color: COLORS.green, fontWeight: '700' },
  primaryBtn:       { width: '100%', backgroundColor: COLORS.accent, borderRadius: 14, padding: 14, alignItems: 'center' },
  primaryBtnText:   { color: '#000', fontWeight: '700', fontSize: 15 },
});
