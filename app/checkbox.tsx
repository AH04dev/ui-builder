import * as React from 'react';
import { View } from 'react-native';
import { Checkbox, Separator, Text } from '~/components/nativewindui';
import { ShowcaseLayout } from '~/components/ShowcaseLayout';
import { DemoSection } from '~/components/DemoSection';

type ChecklistItem = { id: string; label: string };

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

  const completed = Object.values(state).filter(Boolean).length;

  return (
    <ShowcaseLayout title="Checkbox" subtitle="Accessible checkbox via rn-primitives">
      <DemoSection
        title="Task List"
        description={`${completed} of ${ITEMS.length} completed`}
      >
        {ITEMS.map((item, index) => (
          <View key={item.id}>
            <View className="flex-row items-center justify-between py-3">
              <Text className={state[item.id] ? 'line-through text-muted-foreground' : ''}>
                {item.label}
              </Text>
              <Checkbox
                checked={state[item.id]}
                onCheckedChange={(checked) =>
                  setState((prev) => ({ ...prev, [item.id]: checked }))
                }
              />
            </View>
            {index < ITEMS.length - 1 && <Separator />}
          </View>
        ))}
      </DemoSection>
    </ShowcaseLayout>
  );
}
