import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeedScreen } from '@screens/FeedScreen';

const Stack = createNativeStackNavigator();

export function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
