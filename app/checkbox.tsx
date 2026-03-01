import * as React from 'react';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Checkbox, Separator, Text } from '~/components/nativewindui';

type ChecklistItem = {
  id: string;
  label: string;
};

const ITEMS: ChecklistItem[] = [
  { id: 'tokens', label: 'Configure theme tokens' },
  { id: 'button', label: 'Build button variants' },
  { id: 'screens', label: 'Create showcase screens' },
  { id: 'deploy', label: 'Prepare web deployment' },
];

export default function CheckboxScreen() {
  const [state, setState] = React.useState<Record<string, boolean>>({
    tokens: true,
    button: true,
    screens: false,
    deploy: false,
  });

  return (
    <>
      <Stack.Screen options={{ title: 'Checkbox' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="py-2">
        {ITEMS.map((item, index) => (
          <View key={item.id}>
            <View className="flex-row items-center justify-between px-4 py-3">
              <Text>{item.label}</Text>
              <Checkbox
                checked={state[item.id]}
                onCheckedChange={(checked) =>
                  setState((prev) => ({ ...prev, [item.id]: checked }))
                }
              />
            </View>
            {index < ITEMS.length - 1 && <Separator className="ml-4" />}
          </View>
        ))}
      </ScrollView>
    </>
  );
}
