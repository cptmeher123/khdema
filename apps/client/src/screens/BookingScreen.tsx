import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { COLORS, ARTISANS, TIME_SLOTS } from '@khdema/shared';

const DATES = ["Aujourd'hui", 'Demain', 'Jeu 23', 'Ven 24', 'Sam 25'];

export const BookingScreen = ({ navigation, route }: any) => {
  const { artisanId } = route.params;
  const a = ARTISANS.find(x => x.id === artisanId) || ARTISANS[0];

  const [step, setStep] = useState(0);
  const [date, setDate] = useState(DATES[0]);
  const [slot, setSlot] = useState(TIME_SLOTS[2]);
  const [desc, setDesc] = useState('');

  if (step === 2) return (
    <View style={styles.successContainer}>
      <View style={styles.successIcon}>
        <Text style={{ fontSize: 36 }}>✓</Text>
      </View>
      <Text style={styles.successTitle}>Demande envoyée !</Text>
      <Text style={styles.successSub}>{a.name} va confirmer d'ici 30 minutes.</Text>
      <Text style={styles.successNote}>Tu recevras une notification + message WhatsApp</Text>
      <View style={styles.recap}>
        <Text style={styles.recapLabel}>RÉCAPITULATIF</Text>
        <Text style={styles.recapText}>{a.service} · {date} · {slot}</Text>
        <Text style={styles.recapNote}>{desc || 'Pas de description'}</Text>
        <Text style={styles.recapNote}>Paiement : espèces après travail</Text>
      </View>
      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.primaryBtnText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step === 0 ? navigation.goBack() : setStep(0)} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{step === 0 ? 'Choisir un créneau' : 'Décrire le problème'}</Text>
          <Text style={styles.subtitle}>Étape {step + 1}/2</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${(step + 1) / 2 * 100}%` }]} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        {step === 0 ? (
          <>
            {/* Artisan recap */}
            <View style={styles.artisanRecap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{a.name.split(' ').map(n => n[0]).join('')}</Text>
              </View>
              <View>
                <Text style={styles.artisanName}>{a.name}</Text>
                <Text style={styles.artisanMeta}>{a.service} · {a.price}</Text>
              </View>
            </View>

            <Text style={styles.sectionLabel}>DATE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }} contentContainerStyle={{ gap: 8 }}>
              {DATES.map(d => (
                <TouchableOpacity key={d} onPress={() => setDate(d)}
                  style={[styles.dateChip, date === d && styles.dateChipActive]}>
                  <Text style={[styles.dateText, date === d && styles.dateTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionLabel}>CRÉNEAU HORAIRE</Text>
            <View style={styles.slotGrid}>
              {TIME_SLOTS.map(s => (
                <TouchableOpacity key={s} onPress={() => setSlot(s)}
                  style={[styles.slotCard, slot === s && styles.slotActive]}>
                  <Text style={[styles.slotText, slot === s && styles.slotTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(1)}>
              <Text style={styles.primaryBtnText}>Suivant →</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.sectionLabel}>DÉCRIS LE PROBLÈME</Text>
            <TextInput
              style={styles.textarea}
              multiline placeholder="Ex: Fuite sous l'évier de la cuisine..."
              placeholderTextColor={COLORS.textDim}
              value={desc} onChangeText={setDesc}
            />

            <Text style={styles.sectionLabel}>ADRESSE</Text>
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>📍 Rue Abou Bakr Esseddik, Ariana</Text>
            </View>

            <View style={styles.cashNotice}>
              <Text style={styles.cashText}>💰 Paiement en espèces directement à l'artisan après le travail.</Text>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => setStep(2)}>
              <Text style={styles.primaryBtnText}>Envoyer la demande</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:        { flex: 1, backgroundColor: COLORS.bg },
  successContainer: { flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center', padding: 32 },
  header:           { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  backBtn:          { width: 36, height: 36, backgroundColor: COLORS.surfaceHigh, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  backIcon:         { color: COLORS.text, fontSize: 16 },
  title:            { fontSize: 17, fontWeight: '700', color: COLORS.text },
  subtitle:         { fontSize: 11, color: COLORS.textSub },
  progressBg:       { height: 3, backgroundColor: COLORS.border, marginHorizontal: 20, marginBottom: 8, borderRadius: 2 },
  progressFill:     { height: '100%', backgroundColor: COLORS.accent, borderRadius: 2 },
  sectionLabel:     { fontSize: 11, fontWeight: '700', color: COLORS.textSub, letterSpacing: 1.2, marginBottom: 10 },
  artisanRecap:     { flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, padding: 14, marginBottom: 20 },
  avatar:           { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.accent + '33', alignItems: 'center', justifyContent: 'center' },
  avatarText:       { color: COLORS.accent, fontWeight: '700' },
  artisanName:      { fontSize: 14, fontWeight: '600', color: COLORS.text },
  artisanMeta:      { fontSize: 12, color: COLORS.textSub },
  dateChip:         { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, backgroundColor: COLORS.surfaceHigh, borderWidth: 1, borderColor: COLORS.border },
  dateChipActive:   { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  dateText:         { fontSize: 12, fontWeight: '600', color: COLORS.textSub },
  dateTextActive:   { color: '#000' },
  slotGrid:         { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  slotCard:         { width: '47%', backgroundColor: COLORS.surfaceHigh, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, padding: 14, alignItems: 'center' },
  slotActive:       { backgroundColor: COLORS.accent + '22', borderColor: COLORS.accent },
  slotText:         { fontSize: 13, fontWeight: '600', color: COLORS.textSub },
  slotTextActive:   { color: COLORS.accent },
  textarea:         { backgroundColor: COLORS.surfaceHigh, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, color: COLORS.text, fontSize: 14, padding: 14, minHeight: 120, textAlignVertical: 'top', marginBottom: 20 },
  addressBox:       { backgroundColor: COLORS.surfaceHigh, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 14, marginBottom: 20 },
  addressText:      { fontSize: 13, color: COLORS.textSub },
  cashNotice:       { backgroundColor: COLORS.accent + '11', borderWidth: 1, borderColor: COLORS.accent + '33', borderRadius: 14, padding: 14, marginBottom: 24 },
  cashText:         { fontSize: 13, color: COLORS.accent },
  primaryBtn:       { backgroundColor: COLORS.accent, borderRadius: 14, padding: 16, alignItems: 'center' },
  primaryBtnText:   { color: '#000', fontWeight: '700', fontSize: 15 },
  successIcon:      { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.green + '22', borderWidth: 2, borderColor: COLORS.green, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successTitle:     { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  successSub:       { fontSize: 14, color: COLORS.textSub, textAlign: 'center', marginBottom: 8 },
  successNote:      { fontSize: 13, color: COLORS.textSub, marginBottom: 32, textAlign: 'center' },
  recap:            { width: '100%', backgroundColor: COLORS.surfaceHigh, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, marginBottom: 24 },
  recapLabel:       { fontSize: 11, color: COLORS.textSub, marginBottom: 8, fontWeight: '700', letterSpacing: 1 },
  recapText:        { fontSize: 14, color: COLORS.text, fontWeight: '600' },
  recapNote:        { fontSize: 12, color: COLORS.textSub, marginTop: 4 },
});
