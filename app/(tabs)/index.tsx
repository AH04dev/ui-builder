import * as React from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Text, Badge } from '~/components/nativewindui';
import {
  MousePointerClick,
  CreditCard,
  CheckSquare,
  MessageSquare,
  Loader,
  ToggleRight,
  Tag,
  UserCircle,
  Search,
} from 'lucide-react-native';

type ComponentItem = {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
  category: 'Inputs' | 'Display' | 'Overlays';
  accent: string;
};

const COMPONENTS: ComponentItem[] = [
  {
    title: 'Button',
    href: '/button',
    description: 'Pressable with variants & haptics',
    icon: MousePointerClick,
    category: 'Inputs',
    accent: '#3B82F6',
  },
  {
    title: 'Checkbox',
    href: '/checkbox',
    description: 'Accessible toggling primitive',
    icon: CheckSquare,
    category: 'Inputs',
    accent: '#3B82F6',
  },
  {
    title: 'Switch',
    href: '/switch',
    description: 'iOS-style toggle switch',
    icon: ToggleRight,
    category: 'Inputs',
    accent: '#3B82F6',
  },
  {
    title: 'Card',
    href: '/card',
    description: 'Elevated container with slots',
    icon: CreditCard,
    category: 'Display',
    accent: '#8B5CF6',
  },
  {
    title: 'Badge',
    href: '/badge',
    description: 'Status labels and tags',
    icon: Tag,
    category: 'Display',
    accent: '#8B5CF6',
  },
  {
    title: 'Avatar',
    href: '/avatar',
    description: 'Image with initials fallback',
    icon: UserCircle,
    category: 'Display',
    accent: '#8B5CF6',
  },
  {
    title: 'Progress',
    href: '/progress',
    description: 'Animated progress indicator',
    icon: Loader,
    category: 'Display',
    accent: '#8B5CF6',
  },
  {
    title: 'Dialog',
    href: '/dialog',
    description: 'Modal dialog with overlay',
    icon: MessageSquare,
    category: 'Overlays',
    accent: '#EC4899',
  },
];

export default function ComponentsScreen() {
  const [search, setSearch] = React.useState('');

  const filtered = COMPONENTS.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="pb-8"
    >
      {/* ── Hero Section ── */}
      <View className="relative overflow-hidden px-5 pb-2 pt-14">
        {/* Decorative circles */}
        <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/8" />
        <View className="absolute -left-6 top-20 h-24 w-24 rounded-full bg-accent-secondary/8" />
        <View className="absolute right-10 top-32 h-16 w-16 rounded-full bg-accent/5" />

        <View className="flex-row items-center gap-3">
          <Text variant="largeTitle" className="text-accent">
            Cross
          </Text>
          <Text variant="largeTitle" className="text-foreground">
            Bits
          </Text>
        </View>
        <Text variant="subhead" color="secondary" className="mt-1">
          Premium React Native Components
        </Text>

        <View className="mt-3 flex-row items-center gap-2">
          <Badge label={`${COMPONENTS.length} Components`} variant="outline" />
          <Badge label="Dark First" variant="outline" />
        </View>
      </View>

      {/* ── Search Bar ── */}
      <View className="px-4 py-4">
        <View className="flex-row items-center gap-3 rounded-2xl border border-glass-border bg-glass px-4 py-3">
          <Search size={18} color="hsl(230, 10%, 45%)" />
          <TextInput
            placeholder="Search components..."
            placeholderTextColor="hsl(230, 10%, 45%)"
            value={search}
            onChangeText={setSearch}
            className="flex-1 text-foreground"
            style={{ fontSize: 15, outline: 'none' } as any}
          />
        </View>
      </View>

      {/* ── Component Grid ── */}
      <View className="flex-row flex-wrap px-3">
        {filtered.map((comp) => {
          const Icon = comp.icon;
          return (
            <View key={comp.title} className="w-1/2 p-1.5">
              <Link href={comp.href as any} asChild>
                <Pressable className="rounded-2xl border border-glass-border bg-glass p-4 active:border-accent active:bg-glass/80">
                  <View
                    className="mb-3 h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: comp.accent + '18' }}
                  >
                    <Icon size={20} color={comp.accent} />
                  </View>
                  <Text variant="heading" className="text-foreground">
                    {comp.title}
                  </Text>
                  <Text variant="caption1" color="secondary" className="mt-0.5" numberOfLines={2}>
                    {comp.description}
                  </Text>
                  <View className="mt-2">
                    <Text
                      variant="caption2"
                      style={{ color: comp.accent }}
                      className="font-semibold"
                    >
                      {comp.category}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}