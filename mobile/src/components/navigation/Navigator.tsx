import { FeedScreen } from '@mobile/screens/FeedScreen';
import { ProfileScreen } from '@mobile/screens/ProfileScreen';
import { RootParamList } from '@mobile/types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootParamList>();

export function Navigator() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}
