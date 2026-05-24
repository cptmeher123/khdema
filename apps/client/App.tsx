import { registerRootComponent } from 'expo';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>خدمة Khdema</Text>
      <Text style={styles.sub}>Client App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F', alignItems: 'center', justifyContent: 'center' },
  title:     { fontSize: 32, fontWeight: '700', color: '#E8A249' },
  sub:       { fontSize: 14, color: '#8A857C', marginTop: 8 },
});

registerRootComponent(App);
export default App;
