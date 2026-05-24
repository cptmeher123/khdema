import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { COLORS } from '../../shared';

const TUNISIAN_PREFIXES = ['20','21','22','23','24','25','26','27','28','29','50','51','52','53','54','55','56','57','58','59','90','91','92','93','94','95','96','97','98','99'];

export const PhoneScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const isValid = phone.length === 8 && TUNISIAN_PREFIXES.includes(phone.slice(0, 2));

  const handleContinue = () => {
    if (!isValid) {
      setError('Numéro invalide. Ex: 22 345 678');
      return;
    }
    setError('');
    navigation.navigate('OTP', { phone: `+216 ${phone}` });
  };

  const formatDisplay = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0,2)} ${digits.slice(2)}`;
    return `${digits.slice(0,2)} ${digits.slice(2,5)} ${digits.slice(5)}`;
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

        {/* Logo */}
        <View style={styles.logoWrap}>
          <Text style={styles.logoAr}>خدمة</Text>
          <Text style={styles.logoLat}>Khdema</Text>
        </View>

        <Text style={styles.title}>Ton numéro de téléphone</Text>
        <Text style={styles.subtitle}>On t'envoie un code pour confirmer. Pas de mot de passe.</Text>

        {/* Phone input */}
        <View style={styles.inputRow}>
          <View style={styles.prefix}>
            <Text style={styles.prefixFlag}>🇹🇳</Text>
            <Text style={styles.prefixCode}>+216</Text>
          </View>
          <TextInput
            style={styles.input}
            value={formatDisplay(phone)}
            onChangeText={t => setPhone(t.replace(/\D/g, '').slice(0, 8))}
            keyboardType="phone-pad"
            placeholder="22 345 678"
            placeholderTextColor={COLORS.textDim}
            maxLength={10}
            autoFocus
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.btn, !isValid && styles.btnDisabled]}
          onPress={handleContinue}
          disabled={!isValid}
        >
          <Text style={styles.btnText}>Envoyer le code →</Text>
        </TouchableOpacity>

        <Text style={styles.legal}>
          En continuant, tu acceptes nos conditions d'utilisation. Tes données ne sont jamais vendues.
        </Text>

        {/* Dev hint */}
        <View style={styles.devHint}>
          <Text style={styles.devHintText}>🛠 Dev: n'importe quel code à 4 chiffres marche</Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: COLORS.bg },
  inner:       { flexGrow: 1, padding: 28, justifyContent: 'center' },
  logoWrap:    { alignItems: 'center', marginBottom: 48 },
  logoAr:      { fontSize: 36, fontWeight: '700', color: COLORS.accent },
  logoLat:     { fontSize: 16, color: COLORS.textSub, marginTop: 4, letterSpacing: 3 },
  title:       { fontSize: 24, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  subtitle:    { fontSize: 14, color: COLORS.textSub, lineHeight: 22, marginBottom: 32 },
  inputRow:    { flexDirection: 'row', backgroundColor: COLORS.surfaceHigh, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', marginBottom: 12 },
  prefix:      { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, borderRightWidth: 1, borderRightColor: COLORS.border, backgroundColor: COLORS.surface },
  prefixFlag:  { fontSize: 20 },
  prefixCode:  { fontSize: 15, color: COLORS.text, fontWeight: '600' },
  input:       { flex: 1, padding: 16, fontSize: 20, color: COLORS.text, letterSpacing: 2, fontWeight: '600' },
  error:       { fontSize: 13, color: COLORS.red, marginBottom: 12 },
  btn:         { backgroundColor: COLORS.accent, borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 8 },
  btnDisabled: { opacity: 0.4 },
  btnText:     { color: '#000', fontWeight: '700', fontSize: 16 },
  legal:       { fontSize: 11, color: COLORS.textDim, textAlign: 'center', marginTop: 24, lineHeight: 18 },
  devHint:     { marginTop: 32, backgroundColor: COLORS.surfaceHigh, borderRadius: 10, padding: 12, borderWidth: 1, borderColor: COLORS.border },
  devHintText: { fontSize: 11, color: COLORS.textSub, textAlign: 'center' },
});
