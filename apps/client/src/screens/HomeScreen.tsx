import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SERVICES, ARTISANS } from '@khdema/shared';

export const HomeScreen = ({ navigation }: any) => {
  const available = ARTISANS.filter(a => a.available);

  return (
    <ScrollView style={styles.container}>
      {/* Greeting */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Marhba, Sarra 👋</Text>
          <Text style={styles.title}>De quoi as-tu besoin ?</Text>
        </View>
      </View>

      {/* Location */}
      <Text style={styles.location}>📍 Ariana Soghra ▾</Text>

      {/* Service Categories */}
      <Text style={styles.sectionLabel}>SERVICES</Text>
      <View style={styles.categoryGrid}>
        {SERVICES.map(s => (
          <TouchableOpacity
            key={s.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('ArtisanList', { serviceId: s.id })}
          >
            <Text style={styles.categoryIcon}>{s.labelAr}</Text>
            <Text style={styles.categoryLabel}>{s.label}</Text>
            <Text style={[styles.categoryCount, { color: s.color }]}>{s.count} artisans</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Available Now */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>DISPONIBLES MAINTENANT</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ArtisanList', {})}>
          <Text style={styles.seeAll}>Voir tout</Text>
        </TouchableOpacity>
      </View>

      {available.slice(0, 2).map(a => (
        <TouchableOpacity
          key={a.id}
          style={styles.artisanCard}
          onPress={() => navigation.navigate('ArtisanProfile', { artisanId: a.id })}
        >
          <View style={styles.artisanInfo}>
            <Text style={styles.artisanName}>{a.name}</Text>
            <Text style={styles.artisanSub}>{a.service} · {a.zone}</Text>
            <Text style={styles.artisanRating}>⭐ {a.rating} ({a.reviews} avis)</Text>
          </View>
          <View style={styles.artisanRight}>
            {a.verified && <Text style={styles.verified}>✓ Vérifié</Text>}
            <Text style={styles.price}>{a.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.bg },
  header:          { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingBottom: 8 },
  greeting:        { fontSize: 12, color: COLORS.textSub },
  title:           { fontSize: 22, fontWeight: '700', color: COLORS.text, marginTop: 2 },
  location:        { fontSize: 13, color: COLORS.textSub, paddingHorizontal: 20, marginBottom: 20 },
  sectionLabel:    { fontSize: 11, fontWeight: '700', color: COLORS.textSub, letterSpacing: 1.2, paddingHorizontal: 20, marginBottom: 12 },
  sectionHeader:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 },
  seeAll:          { fontSize: 12, color: COLORS.accent },
  categoryGrid:    { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 28 },
  categoryCard:    { flex: 1, backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 14, alignItems: 'center' },
  categoryIcon:    { fontSize: 18, marginBottom: 6 },
  categoryLabel:   { fontSize: 11, fontWeight: '600', color: COLORS.text },
  categoryCount:   { fontSize: 10, marginTop: 4 },
  artisanCard:     { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.surface, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, marginHorizontal: 20, marginBottom: 10 },
  artisanInfo:     { flex: 1 },
  artisanName:     { fontSize: 15, fontWeight: '600', color: COLORS.text },
  artisanSub:      { fontSize: 12, color: COLORS.textSub, marginTop: 2 },
  artisanRating:   { fontSize: 12, color: COLORS.textSub, marginTop: 6 },
  artisanRight:    { alignItems: 'flex-end', justifyContent: 'space-between' },
  verified:        { fontSize: 11, color: COLORS.green, fontWeight: '600' },
  price:           { fontSize: 13, fontWeight: '700', color: COLORS.accent },
});
