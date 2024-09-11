import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigation';

export default function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
