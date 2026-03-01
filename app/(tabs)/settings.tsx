import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Text, Switch, Separator } from '~/components/nativewindui';
import { GradientHeader } from '~/components/GradientHeader';
import { DemoSection } from '~/components/DemoSection';
import { useColorScheme } from '~/lib/useColorScheme';
import { Moon, Sun, Palette, Info, ExternalLink, Github } from 'lucide-react-native';

const ACCENT_COLORS = [
    { name: 'Electric Blue', hsl: '217, 92%, 60%', hex: '#3B82F6' },
    { name: 'Violet', hsl: '265, 90%, 65%', hex: '#8B5CF6' },
    { name: 'Rose', hsl: '340, 82%, 60%', hex: '#F43F5E' },
    { name: 'Emerald', hsl: '160, 84%, 40%', hex: '#10B981' },
    { name: 'Amber', hsl: '38, 92%, 50%', hex: '#F59E0B' },
];

export default function SettingsScreen() {
    const { isDarkColorScheme } = useColorScheme();
    const [selectedAccent, setSelectedAccent] = React.useState(0);

    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerClassName="pb-8"
        >
            <GradientHeader
                title="Settings"
                subtitle="Customize your Cross Bits experience"
            />

            {/* ── Appearance ── */}
            <DemoSection title="Appearance" description="Theme preferences">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                        {isDarkColorScheme ? (
                            <Moon size={20} color="hsl(217, 92%, 60%)" />
                        ) : (
                            <Sun size={20} color="hsl(38, 92%, 50%)" />
                        )}
                        <View>
                            <Text variant="heading">Dark Mode</Text>
                            <Text variant="caption1" color="secondary">
                                {isDarkColorScheme ? 'Active' : 'Inactive'} — follows system
                            </Text>
                        </View>
                    </View>
                    <Switch checked={isDarkColorScheme} onCheckedChange={() => { }} />
                </View>
            </DemoSection>

            {/* ── Accent Color ── */}
            <DemoSection title="Accent Color" description="Choose your primary accent">
                <View className="flex-row items-center gap-3">
                    <Palette size={18} color="hsl(230, 10%, 55%)" />
                    <Text variant="subhead" color="secondary">
                        Select accent
                    </Text>
                </View>
                <View className="mt-3 flex-row gap-3">
                    {ACCENT_COLORS.map((c, i) => (
                        <Pressable
                            key={c.name}
                            onPress={() => setSelectedAccent(i)}
                            className="items-center gap-1.5"
                        >
                            <View
                                className={`h-10 w-10 rounded-full border-2 ${selectedAccent === i ? 'border-foreground' : 'border-transparent'
                                    }`}
                                style={{ backgroundColor: c.hex }}
                            />
                            <Text variant="caption2" color="secondary">
                                {c.name.split(' ')[0]}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </DemoSection>

            {/* ── About ── */}
            <DemoSection title="About" description="Library information">
                <View className="gap-4">
                    <View className="flex-row items-center gap-3">
                        <Info size={18} color="hsl(217, 92%, 60%)" />
                        <View className="flex-1">
                            <Text variant="heading">Cross Bits UI</Text>
                            <Text variant="caption1" color="secondary">
                                v1.0.0 · 8 components · Expo + NativeWind
                            </Text>
                        </View>
                    </View>
                    <Separator />
                    <View className="gap-3">
                        <Pressable className="flex-row items-center gap-3 active:opacity-70">
                            <Github size={16} color="hsl(230, 10%, 55%)" />
                            <Text variant="subhead" color="secondary">
                                Source Code
                            </Text>
                            <ExternalLink size={12} color="hsl(230, 10%, 45%)" />
                        </Pressable>
                        <Pressable className="flex-row items-center gap-3 active:opacity-70">
                            <ExternalLink size={16} color="hsl(230, 10%, 55%)" />
                            <Text variant="subhead" color="secondary">
                                Documentation
                            </Text>
                            <ExternalLink size={12} color="hsl(230, 10%, 45%)" />
                        </Pressable>
                    </View>
                </View>
            </DemoSection>
        </ScrollView>
    );
}
