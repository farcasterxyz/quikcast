import { FullscreenLoader } from '@mobile/components/loader/FullscreenLoader';
import { Navigator } from '@mobile/components/navigation/Navigator';
import { AuthProvider } from '@mobile/contexts/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <Suspense fallback={<FullscreenLoader />}>
            <AuthProvider>
              <Navigator />
            </AuthProvider>
          </Suspense>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
