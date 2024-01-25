import { FullscreenLoader } from '@components/loader/FullscreenLoader';
import { Navigator } from '@components/navigation/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <SafeAreaProvider>
          <Suspense fallback={<FullscreenLoader />}>
            <Navigator />
          </Suspense>
        </SafeAreaProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
