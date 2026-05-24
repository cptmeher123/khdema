import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../../shared';
import { useAuth } from '../../context/AuthContext';

export const OTPScreen = ({ navigation, route }: any) => {
  const { phone } = route.params;
  const { login } = useAuth();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setResendTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (val: string, idx: number) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    setError('');
    if (val && idx < 3) inputs.current[idx + 1]?.focus();
    if (next.every(d => d !== '') && idx === 3) verify(next.join(''));
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) inputs.current[idx - 1]?.focus();
  };

  const verify = (code: string) => {
    if (code.length === 4) { login(phone); }
    else { setError('Code incorrect.'); setOtp(['', '', '', '']); inputs.current[0]?.focus(); }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.inner}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Code de confirmation</Text>
        <Text style={styles.subtitle}>Envoyé au <Text style={styles.phone}>{phone}</Text></Text>
        <View style={styles.otpRow}>
          {otp.map((digit, idx) => (
            <TextInput key={idx} ref={r => { if (r) inputs.current[idx] = r; }}
              style={[styles.otpBox, digit && styles.otpBoxFilled, error && styles.otpBoxError]}
              value={digit} onChangeText={val => handleChange(val, idx)}
              onKeyPress={e => handleKeyPress(e, idx)}
              keyboardType="number-pad" maxLength={1} autoFocus={idx === 0} selectTextOnFocus />
          ))}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Pas reçu ? </Text>
          {resendTimer > 0 ? <Text style={styles.resendTimer}>{resendTimer}s</Text> :
            <TouchableOpacity onPress={() => { setResendTimer(30); setOtp(['','','','']); inputs.current[0]?.focus(); }}>
              <Text style={styles.resendBtn}>Renvoyer</Text>
            </TouchableOpacity>}
        </View>
        <TouchableOpacity style={[styles.btn, otp.some(d => !d) && styles.btnDisabled]}
          onPress={() => verify(otp.join(''))} disabled={otp.some(d => !d)}>
          <Text style={styles.btnText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: COLORS.bg },
  inner:        { flex: 1, padding: 28, paddingTop: 60 },
  back:         { width: 36, height: 36, backgroundColor: COLORS.surfaceHigh, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  backText:     { color: COLORS.text, fontSize: 16 },
  title:        { fontSize: 26, fontWeight: '700', color: COLORS.text, marginBottom: 10 },
  subtitle:     { fontSize: 14, color: COLORS.textSub, marginBottom: 40 },
  phone:        { color: COLORS.text, fontWeight: '600' },
  otpRow:       { flexDirection: 'row', gap: 14, justifyContent: 'center', marginBottom: 16 },
  otpBox:       { width: 64, height: 72, backgroundColor: COLORS.surfaceHigh, borderRadius: 16, borderWidth: 1.5, borderColor: COLORS.border, fontSize: 28, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  otpBoxFilled: { borderColor: COLORS.accent, backgroundColor: COLORS.accent + '11' },
  otpBoxError:  { borderColor: COLORS.red, backgroundColor: COLORS.red + '11' },
  error:        { fontSize: 13, color: COLORS.red, textAlign: 'center', marginBottom: 16 },
  resendRow:    { flexDirection: 'row', justifyContent: 'center', marginBottom: 32 },
  resendLabel:  { fontSize: 13, color: COLORS.textSub },
  resendTimer:  { fontSize: 13, color: COLORS.textDim },
  resendBtn:    { fontSize: 13, color: COLORS.accent, fontWeight: '600' },
  btn:          { backgroundColor: COLORS.accent, borderRadius: 16, padding: 16, alignItems: 'center' },
  btnDisabled:  { opacity: 0.4 },
  btnText:      { color: '#000', fontWeight: '700', fontSize: 16 },
});
