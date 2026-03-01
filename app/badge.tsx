import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Badge, Text } from '~/components/nativewindui';

export default function BadgeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Badge' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-4 p-4">
        <Text variant="title3">Badge variants</Text>
        <View className="flex-row flex-wrap gap-3">
          <Badge label="Default" />
          <Badge label="Secondary" variant="secondary" />
          <Badge label="Destructive" variant="destructive" />
          <Badge label="Outline" variant="outline" />
        </View>
      </ScrollView>
    </>
  );
}
