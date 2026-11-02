import React from 'react';
import { AppProvider } from '@/core/providers/AppProvider';
import { RootNavigator } from '@/core/navigation/RootNavigator';

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
