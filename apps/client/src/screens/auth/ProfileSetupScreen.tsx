import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { COLORS, ZONES } from '../../shared';
import { useAuth } from '../../context/AuthContext';

export const ProfileSetupScreen = () => {
  const { completeProfile } = useAuth();
  const [name, setName] = useState('');
  const [zone, setZone] = useState('');
  const [error, setError] = useState('');

  const isValid = name.trim().length >= 2 && zone !== '';

  const handleDone = () => {
    if (!isValid) {
      setError('Remplis tous les champs');
      return;
    }
    completeProfile(name.trim(), zone);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

        <View style={styles.logoWrap}>
          <Text style={styles.logoAr}>خدمة</Text>
        </View>

        <Text style={styles.title}>Bienvenue ! 👋</Text>
        <Text style={styles.subtitle}>Dis-nous comment t'appeler et où tu habites.</Text>

        <Text style={styles.label}>Ton prénom</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={t => { setName(t); setError(''); }}
          placeholder="Ex: Sarra"
          placeholderTextColor={COLORS.textDim}
          autoCapitalize="words"
          autoFocus
        />

        <Text style={styles.label}>Ta zone</Text>
        <View style={styles.zoneGrid}>
          {ZONES.slice(0, 8).map(z => (
            <TouchableOpacity key={z} onPress={() => { setZone(z); setError(''); }}
              style={[styles.zoneChip, zone === z && styles.zoneChipActive]}>
              <Text style={[styles.zoneText, zone === z && styles.zoneTextActive]}>{z}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.btn, !isValid && styles.btnDisabled]}
          onPress={handleDone}
          disabled={!isValid}
        >
          <Text style={styles.btnText}>Commencer →</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.bg },
  inner:           { flexGrow: 1, padding: 28 },
  logoWrap:        { alignItems: 'center', marginTop: 20, marginBottom: 36 },
  logoAr:          { fontSize: 32, fontWeight: '700', color: COLORS.accent },
  title:           { fontSize: 26, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  subtitle:        { fontSize: 14, color: COLORS.textSub, lineHeight: 22, marginBottom: 32 },
  label:           { fontSize: 11, fontWeight: '700', color: COLORS.textSub, letterSpacing: 1, marginBottom: 10 },
  input:           { backgroundColor: COLORS.surfaceHigh, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, padding: 16, fontSize: 16, color: COLORS.text, marginBottom: 24 },
  zoneGrid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  zoneChip:        { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, backgroundColor: COLORS.surfaceHigh, borderWidth: 1, borderColor: COLORS.border },
  zoneChipActive:  { backgroundColor: COLORS.accent + '22', borderColor: COLORS.accent },
  zoneText:        { fontSize: 13, color: COLORS.textSub },
  zoneTextActive:  { color: COLORS.accent, fontWeight: '600' },
  error:           { fontSize: 13, color: COLORS.red, marginBottom: 12 },
  btn:             { backgroundColor: COLORS.accent, borderRadius: 16, padding: 16, alignItems: 'center' },
  btnDisabled:     { opacity: 0.4 },
  btnText:         { color: '#000', fontWeight: '700', fontSize: 16 },
});
