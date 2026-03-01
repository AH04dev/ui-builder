import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';
import { Button, Text } from '~/components/nativewindui';

export default function ButtonScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Button' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-4 p-4">
        <Text variant="title3">Variants</Text>
        <Button label="Default" variant="default" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Destructive" variant="destructive" />
        <Button label="Outline" variant="outline" />
        <Button label="Ghost" variant="ghost" />

        <Text variant="title3" className="mt-4">
          Sizes
        </Text>
        <Button label="Small" size="sm" />
        <Button label="Medium" size="md" />
        <Button label="Large" size="lg" />
      </ScrollView>
    </>
  );
}
