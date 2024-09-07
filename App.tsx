import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MainNavigator from './src/navigation/MainNavigation';
import { View } from 'react-native';
export default function App() {
  return (
    <View>
      <MainNavigator />
      <StatusBar style="auto" />
    </View>
  );
}
