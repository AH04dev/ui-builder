import * as React from 'react';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Switch, Text } from '~/components/nativewindui';

export default function SwitchScreen() {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <>
      <Stack.Screen options={{ title: 'Switch' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-4 p-4">
        <Text variant="title3">Controlled Switch</Text>
        <View className="flex-row items-center justify-between rounded-2xl border border-border bg-card p-4">
          <View className="pr-4">
            <Text variant="heading">Enable notifications</Text>
            <Text variant="subhead" color="secondary">
              {enabled ? 'Notifications are enabled' : 'Notifications are disabled'}
            </Text>
          </View>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </View>
      </ScrollView>
    </>
  );
}
