import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Avatar, Text } from '~/components/nativewindui';

export default function AvatarScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Avatar' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-4 p-4">
        <Text variant="title3">Avatar sizes</Text>
        <View className="flex-row items-end gap-4">
          <Avatar
            alt="Alex Morgan"
            fallback="AM"
            size="sm"
            src="https://i.pravatar.cc/80?img=12"
          />
          <Avatar
            alt="Jordan Lee"
            fallback="JL"
            size="md"
            src="https://i.pravatar.cc/120?img=21"
          />
          <Avatar alt="Chris Park" fallback="CP" size="lg" />
        </View>
      </ScrollView>
    </>
  );
}
