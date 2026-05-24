import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { COLORS, ZONES } from '../../shared';
import { useAuth } from '../../context/AuthContext';

const SERVICES = [
  { id: 'plumber',     label: 'Plombier',    labelAr: 'سبّاك',   emoji: '🔧' },
  { id: 'electrician', label: 'Électricien', labelAr: 'كهربائي', emoji: '⚡' },
  { id: 'painter',     label: 'Peintre',     labelAr: 'صبّاغ',   emoji: '🖌️' },
];

export const ArtisanSetupScreen = () => {
  const { completeProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [zone, setZone] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (step === 0 && name.trim().length < 2) { setError('Entre ton prénom complet'); return; }
    if (step === 1 && !service) { setError('Choisis ton métier'); return; }
    setError('');
    setStep(s => s + 1);
  };

  const handleDone = () => {
    if (!zone) { setError('Choisis ta zone principale'); return; }
    completeProfile(name.trim(), service, zone);
  };

  const svc = SERVICES.find(s => s.id === service);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

        {/* Progress */}
        <View style={styles.progressRow}>
          {[0,1,2].map(i => (
            <View key={i} style={[styles.progressDot, i <= step && styles.progressDotActive]} />
          ))}
        </View>

        {step === 0 && (
          <>
            <Text style={styles.stepLabel}>ÉTAPE 1 / 3</Text>
            <Text style={styles.title}>Comment tu t'appelles ?</Text>
            <Text style={styles.subtitle}>Ton nom sera visible par les clients.</Text>
            <Text style={styles.label}>Prénom et nom</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={t => { setName(t); setError(''); }}
              placeholder="Ex: Mohamed Sassi"
              placeholderTextColor={COLORS.textDim}
              autoCapitalize="words"
              autoFocus
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={[styles.btn, name.trim().length < 2 && styles.btnDisabled]}
              onPress={handleNext} disabled={name.trim().length < 2}>
              <Text style={styles.btnText}>Suivant →</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 1 && (
          <>
            <Text style={styles.stepLabel}>ÉTAPE 2 / 3</Text>
            <Text style={styles.title}>Ton métier</Text>
            <Text style={styles.subtitle}>Choisis ta spécialité principale.</Text>
            <View style={styles.serviceGrid}>
              {SERVICES.map(s => (
                <TouchableOpacity key={s.id} onPress={() => { setService(s.id); setError(''); }}
                  style={[styles.serviceCard, service === s.id && styles.serviceCardActive]}>
                  <Text style={styles.serviceEmoji}>{s.emoji}</Text>
                  <Text style={[styles.serviceLabel, service === s.id && styles.serviceLabelActive]}>{s.label}</Text>
                  <Text style={styles.serviceAr}>{s.labelAr}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={[styles.btn, !service && styles.btnDisabled]}
              onPress={handleNext} disabled={!service}>
              <Text style={styles.btnText}>Suivant →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(0)} style={styles.backBtn}>
              <Text style={styles.backText}>← Retour</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.stepLabel}>ÉTAPE 3 / 3</Text>
            <Text style={styles.title}>Ta zone de travail</Text>
            <Text style={styles.subtitle}>
              Tu travailles comme <Text style={{ color: COLORS.accent }}>{svc?.label}</Text>. Dans quelle zone ?
            </Text>
            <View style={styles.zoneGrid}>
              {ZONES.slice(0, 8).map(z => (
                <TouchableOpacity key={z} onPress={() => { setZone(z); setError(''); }}
                  style={[styles.zoneChip, zone === z && styles.zoneChipActive]}>
                  <Text style={[styles.zoneText, zone === z && styles.zoneTextActive]}>{z}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.completeNotice}>
              <Text style={styles.completeText}>
                ✓ Tu pourras compléter ton profil (photo, tarif, description) plus tard.
              </Text>
            </View>

            <TouchableOpacity style={[styles.btn, !zone && styles.btnDisabled]}
              onPress={handleDone} disabled={!zone}>
              <Text style={styles.btnText}>Commencer à recevoir des demandes 🎉</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)} style={styles.backBtn}>
              <Text style={styles.backText}>← Retour</Text>
            </TouchableOpacity>
          </>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:          { flex: 1, backgroundColor: COLORS.bg },
  inner:              { flexGrow: 1, padding: 28 },
  progressRow:        { flexDirection: 'row', gap: 8, marginBottom: 32, marginTop: 12 },
  progressDot:        { flex: 1, height: 4, borderRadius: 2, backgroundColor: COLORS.border },
  progressDotActive:  { backgroundColor: COLORS.accent },
  stepLabel:          { fontSize: 11, fontWeight: '700', color: COLORS.textSub, letterSpacing: 1.2, marginBottom: 10 },
  title:              { fontSize: 26, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  subtitle:           { fontSize: 14, color: COLORS.textSub, lineHeight: 22, marginBottom: 28 },
  label:              { fontSize: 11, fontWeight: '700', color: COLORS.textSub, letterSpacing: 1, marginBottom: 10 },
  input:              { backgroundColor: COLORS.surfaceHigh, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, fontSize: 16, color: COLORS.text, marginBottom: 24 },
  serviceGrid:        { gap: 12, marginBottom: 24 },
  serviceCard:        { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: COLORS.surfaceHigh, borderRadius: 16, borderWidth: 1.5, borderColor: COLORS.border, padding: 18 },
  serviceCardActive:  { borderColor: COLORS.accent, backgroundColor: COLORS.accent + '11' },
  serviceEmoji:       { fontSize: 28 },
  serviceLabel:       { fontSize: 16, fontWeight: '700', color: COLORS.text, flex: 1 },
  serviceLabelActive: { color: COLORS.accent },
  serviceAr:          { fontSize: 16, color: COLORS.textSub },
  zoneGrid:           { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  zoneChip:           { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, backgroundColor: COLORS.surfaceHigh, borderWidth: 1, borderColor: COLORS.border },
  zoneChipActive:     { backgroundColor: COLORS.accent + '22', borderColor: COLORS.accent },
  zoneText:           { fontSize: 13, color: COLORS.textSub },
  zoneTextActive:     { color: COLORS.accent, fontWeight: '600' },
  error:              { fontSize: 13, color: COLORS.red, marginBottom: 16 },
  completeNotice:     { backgroundColor: COLORS.green + '11', borderWidth: 1, borderColor: COLORS.green + '33', borderRadius: 14, padding: 14, marginBottom: 20 },
  completeText:       { fontSize: 13, color: COLORS.green, lineHeight: 20 },
  btn:                { backgroundColor: COLORS.accent, borderRadius: 16, padding: 16, alignItems: 'center', marginBottom: 12 },
  btnDisabled:        { opacity: 0.4 },
  btnText:            { color: '#000', fontWeight: '700', fontSize: 15 },
  backBtn:            { alignItems: 'center', padding: 12 },
  backText:           { color: COLORS.textSub, fontSize: 14 },
});
