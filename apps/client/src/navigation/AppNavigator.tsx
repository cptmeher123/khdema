import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { COLORS } from '../shared';

import { HomeScreen } from '../screens/HomeScreen';
import { ArtisanListScreen } from '../screens/ArtisanListScreen';
import { ArtisanProfileScreen } from '../screens/ArtisanProfileScreen';
import { BookingScreen } from '../screens/BookingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, string> = {
  Home: '🏠', Search: '🔍', History: '🕐', Profile: '👤',
};

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border, height: 72 },
      tabBarActiveTintColor: COLORS.accent,
      tabBarInactiveTintColor: COLORS.textDim,
      tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>{TAB_ICONS[route.name]}</Text>,
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
    <Tab.Screen name="Search" component={ArtisanListScreen} options={{ title: 'Chercher' }} initialParams={{}} />
    <Tab.Screen name="History" component={HomeScreen} options={{ title: 'Mes travaux' }} />
    <Tab.Screen name="Profile" component={HomeScreen} options={{ title: 'Profil' }} />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={HomeTabs} />
      <Stack.Screen name="ArtisanList" component={ArtisanListScreen} />
      <Stack.Screen name="ArtisanProfile" component={ArtisanProfileScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
