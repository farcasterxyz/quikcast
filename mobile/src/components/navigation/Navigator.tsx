import { useAuth } from '@mobile/contexts/AuthProvider';
import { FeedScreen } from '@mobile/screens/FeedScreen';
import { LandingScreen } from '@mobile/screens/LandingScreen';
import { ProfileScreen } from '@mobile/screens/ProfileScreen';
import { RootParamList } from '@mobile/types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootParamList>();

export function Navigator() {
  const { currentUser } = useAuth();

  return (
    <Stack.Navigator>
      {currentUser ? (
        <>
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ route }) => {
              const { displayName } = route.params as RootParamList['Profile'];
              return {
                headerTitle: displayName,
              };
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
