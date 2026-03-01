import { Link } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { Separator, Text } from '~/components/nativewindui';

const COMPONENTS = [
  {
    title: 'Button',
    href: '/button',
    description: 'Pressable with variants and haptics',
  },
  {
    title: 'Card',
    href: '/card',
    description: 'Elevated container with header/footer',
  },
  {
    title: 'Checkbox',
    href: '/checkbox',
    description: 'Accessible checkbox via rn-primitives',
  },
  {
    title: 'Dialog',
    href: '/dialog',
    description: 'Modal dialog with overlay',
  },
  {
    title: 'Progress',
    href: '/progress',
    description: 'Progress indicator bar',
  },
  {
    title: 'Switch',
    href: '/switch',
    description: 'iOS-style toggle switch',
  },
  {
    title: 'Badge',
    href: '/badge',
    description: 'Status labels and tags',
  },
  {
    title: 'Avatar',
    href: '/avatar',
    description: 'Profile image with initials fallback',
  },
];

export default function ComponentsScreen() {
  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="py-4">
      {COMPONENTS.map((comp, i) => (
        <View key={comp.title}>
          <Link href={comp.href as any} asChild>
            <Pressable className="flex-row items-center justify-between px-4 py-3 active:bg-muted">
              <View className="flex-1 pr-4">
                <Text variant="heading">{comp.title}</Text>
                <Text variant="subhead" color="secondary">
                  {comp.description}
                </Text>
              </View>
              <Text color="secondary">›</Text>
            </Pressable>
          </Link>
          {i < COMPONENTS.length - 1 && <Separator className="ml-4" />}
        </View>
      ))}
    </ScrollView>
  );
}
