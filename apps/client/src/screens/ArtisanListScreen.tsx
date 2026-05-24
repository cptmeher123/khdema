import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, ARTISANS, SERVICES } from '@khdema/shared';

const FILTERS = ['Disponible', 'Mieux notés', 'Prix ↑', 'Vérifié'];

export const ArtisanListScreen = ({ navigation, route }: any) => {
  const { serviceId } = route.params || {};
  const [activeFilter, setActiveFilter] = useState('Disponible');
  const svc = SERVICES.find(s => s.id === serviceId);

  let artisans = serviceId
    ? ARTISANS.filter(a => a.service === svc?.label)
    : ARTISANS;

  if (activeFilter === 'Disponible') artisans = artisans.filter(a => a.available);
  if (activeFilter === 'Mieux notés') artisans = [...artisans].sort((a, b) => b.rating - a.rating);
  if (activeFilter === 'Vérifié') artisans = artisans.filter(a => a.verified);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{svc?.label || 'Tous les artisans'}</Text>
          <Text style={styles.subtitle}>{artisans.length} artisans · Ariana</Text>
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f} onPress={() => setActiveFilter(f)}
            style={[styles.filterChip, activeFilter === f && styles.filterActive]}>
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.list} contentContainerStyle={{ padding: 20, gap: 12 }}>
        {artisans.map(a => (
          <TouchableOpacity key={a.id} style={styles.card}
            onPress={() => navigation.navigate('ArtisanProfile', { artisanId: a.id })}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.name}>{a.name}</Text>
                <Text style={styles.meta}>{a.service} · {a.years} ans d'exp.</Text>
              </View>
              <View style={styles.cardRight}>
                {a.verified && <Text style={styles.verified}>✓ Vérifié</Text>}
                <Text style={[styles.status, { color: a.available ? COLORS.green : COLORS.textDim }]}>
                  {a.available ? '● Disponible' : '○ Occupé'}
                </Text>
              </View>
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.zone}>📍 {a.zone}</Text>
              <Text style={styles.rating}>⭐ {a.rating} ({a.reviews})</Text>
              <Text style={styles.price}>{a.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.bg },
  header:          { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  backBtn:         { width: 36, height: 36, backgroundColor: COLORS.surfaceHigh, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  backIcon:        { color: COLORS.text, fontSize: 16 },
  title:           { fontSize: 18, fontWeight: '700', color: COLORS.text },
  subtitle:        { fontSize: 12, color: COLORS.textSub },
  filters:         { maxHeight: 48, marginBottom: 8 },
  filterChip:      { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: COLORS.surfaceHigh, borderWidth: 1, borderColor: COLORS.border },
  filterActive:    { backgroundColor: COLORS.accent + '22', borderColor: COLORS.accent },
  filterText:      { fontSize: 12, color: COLORS.textSub },
  filterTextActive:{ color: COLORS.accent, fontWeight: '600' },
  list:            { flex: 1 },
  card:            { backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16 },
  cardTop:         { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  cardRight:       { alignItems: 'flex-end', gap: 4 },
  cardBottom:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name:            { fontSize: 15, fontWeight: '700', color: COLORS.text },
  meta:            { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
  verified:        { fontSize: 11, color: COLORS.green, fontWeight: '600' },
  status:          { fontSize: 11 },
  zone:            { fontSize: 12, color: COLORS.textSub },
  rating:          { fontSize: 12, color: COLORS.textSub },
  price:           { fontSize: 13, fontWeight: '700', color: COLORS.accent },
});
