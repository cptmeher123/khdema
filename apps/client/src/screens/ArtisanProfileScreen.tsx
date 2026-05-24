import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { COLORS, ARTISANS } from '../shared';

const REVIEWS = [
  { name: 'Sarra B.', text: 'Très professionnel, travail soigné. Revient très vite.', rating: 5 },
  { name: 'Amine T.', text: 'Prix honnête, ponctuel. Je recommande.', rating: 4 },
];

export const ArtisanProfileScreen = ({ navigation, route }: any) => {
  const { artisanId } = route.params;
  const a = ARTISANS.find(x => x.id === artisanId) || ARTISANS[0];

  const openWhatsApp = () => {
    const phone = a.phone?.replace(/\s/g, '').replace('+', '');
    Linking.openURL(`https://wa.me/${phone}`);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{a.name.split(' ').map(n => n[0]).join('')}</Text>
        </View>
        <Text style={styles.name}>{a.name}</Text>
        <Text style={styles.meta}>{a.service} · {a.zone}</Text>
        <View style={styles.badges}>
          {a.verified && <Text style={styles.badgeGreen}>✓ Vérifié Khdema</Text>}
          <Text style={[styles.badge, { color: a.available ? COLORS.green : COLORS.textSub }]}>
            {a.available ? 'Disponible' : 'Occupé'}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { label: 'Note', value: a.rating.toString() },
          { label: 'Avis', value: a.reviews.toString() },
          { label: 'Exp.', value: `${a.years}ans` },
        ].map(s => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Price */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>TARIF ESTIMÉ</Text>
        <View style={styles.card}>
          <Text style={styles.price}>{a.price}</Text>
          <Text style={styles.priceNote}>Paiement en espèces après travail · Prix final selon diagnostic</Text>
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>AVIS CLIENTS</Text>
        {REVIEWS.map((r, i) => (
          <View key={i} style={[styles.card, { marginBottom: 10 }]}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{r.name}</Text>
              <Text>{'⭐'.repeat(r.rating)}</Text>
            </View>
            <Text style={styles.reviewText}>{r.text}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.whatsappBtn} onPress={openWhatsApp}>
          <Text style={styles.whatsappText}>💬 WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookBtn}
          onPress={() => navigation.navigate('Booking', { artisanId: a.id })}>
          <Text style={styles.bookText}>Réserver maintenant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: COLORS.bg },
  backBtn:      { margin: 16, width: 36, height: 36, backgroundColor: COLORS.surfaceHigh, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  backIcon:     { color: COLORS.text, fontSize: 16 },
  hero:         { alignItems: 'center', paddingBottom: 20 },
  avatar:       { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.accent + '33', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText:   { color: COLORS.accent, fontSize: 24, fontWeight: '700' },
  name:         { fontSize: 22, fontWeight: '700', color: COLORS.text },
  meta:         { fontSize: 13, color: COLORS.textSub, marginTop: 4 },
  badges:       { flexDirection: 'row', gap: 8, marginTop: 10 },
  badge:        { fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, backgroundColor: COLORS.surfaceHigh },
  badgeGreen:   { fontSize: 12, color: COLORS.green, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, backgroundColor: COLORS.green + '22', fontWeight: '600' },
  statsRow:     { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 20 },
  statCard:     { flex: 1, backgroundColor: COLORS.surfaceHigh, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: 14, alignItems: 'center' },
  statValue:    { fontSize: 18, fontWeight: '700', color: COLORS.accent },
  statLabel:    { fontSize: 11, color: COLORS.textSub, marginTop: 2 },
  section:      { paddingHorizontal: 20, marginBottom: 20 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: COLORS.textSub, letterSpacing: 1.2, marginBottom: 10 },
  card:         { backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16 },
  price:        { fontSize: 22, fontWeight: '700', color: COLORS.accent },
  priceNote:    { fontSize: 12, color: COLORS.textSub, marginTop: 4 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  reviewName:   { fontSize: 13, fontWeight: '600', color: COLORS.text },
  reviewText:   { fontSize: 13, color: COLORS.textSub },
  actions:      { flexDirection: 'row', gap: 10, padding: 20, paddingBottom: 40 },
  whatsappBtn:  { flex: 1, backgroundColor: COLORS.green + '22', borderRadius: 14, borderWidth: 1, borderColor: COLORS.green + '44', padding: 14, alignItems: 'center' },
  whatsappText: { color: COLORS.green, fontWeight: '700' },
  bookBtn:      { flex: 2, backgroundColor: COLORS.accent, borderRadius: 14, padding: 14, alignItems: 'center' },
  bookText:     { color: '#000', fontWeight: '700', fontSize: 15 },
});
