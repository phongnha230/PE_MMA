import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/features/auth/hooks/useAuth';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        {children}
      </AuthProvider>
    </SafeAreaProvider>
  );
};
