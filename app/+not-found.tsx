import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from '~/components/nativewindui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center gap-4 bg-background p-6">
        <Text variant="title3">This screen does not exist.</Text>
        <Link href="/" asChild>
          <Button label="Go home" />
        </Link>
      </View>
    </>
  );
}
