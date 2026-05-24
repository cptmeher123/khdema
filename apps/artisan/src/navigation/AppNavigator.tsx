import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { COLORS } from '../shared';
import { useAuth } from '../context/AuthContext';

import { PhoneScreen } from '../screens/auth/PhoneScreen';
import { OTPScreen } from '../screens/auth/OTPScreen';
import { ArtisanSetupScreen } from '../screens/auth/ArtisanSetupScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { RequestDetailScreen } from '../screens/RequestDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, string> = { Dashboard: '🏠', Jobs: '💼', Profile: '👤' };

const ArtisanTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border, height: 72 },
      tabBarActiveTintColor: COLORS.accent,
      tabBarInactiveTintColor: COLORS.textDim,
      tabBarIcon: () => <Text style={{ fontSize: 20 }}>{TAB_ICONS[route.name]}</Text>,
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Demandes' }} />
    <Tab.Screen name="Jobs" component={DashboardScreen} options={{ title: 'Mes jobs' }} />
    <Tab.Screen name="Profile" component={DashboardScreen} options={{ title: 'Profil' }} />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Phone" component={PhoneScreen} />
    <Stack.Screen name="OTP" component={OTPScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ArtisanTabs" component={ArtisanTabs} />
    <Stack.Screen name="RequestDetail" component={RequestDetailScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { artisan, isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {!artisan && <AuthStack />}
      {artisan?.isNewUser && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ArtisanSetup" component={ArtisanSetupScreen} />
        </Stack.Navigator>
      )}
      {isAuthenticated && <MainStack />}
    </NavigationContainer>
  );
};
