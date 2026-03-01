import * as React from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Badge,
    Avatar,
    Text,
    Switch,
} from '~/components/nativewindui';
import { GradientHeader } from '~/components/GradientHeader';
import { DemoSection } from '~/components/DemoSection';

type Variant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Variant[] = ['default', 'secondary', 'destructive', 'outline', 'ghost'];
const SIZES: Size[] = ['sm', 'md', 'lg'];

export default function PlaygroundScreen() {
    const [variant, setVariant] = React.useState<Variant>('default');
    const [size, setSize] = React.useState<Size>('md');
    const [showAvatar, setShowAvatar] = React.useState(true);
    const [showBadge, setShowBadge] = React.useState(true);

    return (
        <ScrollView
            className="flex-1 bg-background"
            contentContainerClassName="pb-8"
        >
            <GradientHeader
                title="Playground"
                subtitle="Mix & match components — tweak props live"
            />

            {/* ── Preview Card ── */}
            <DemoSection title="Live Preview" description="See your component composition">
                <Card className="border-accent/20">
                    <CardHeader>
                        <View className="flex-row items-center gap-3">
                            {showAvatar && (
                                <Avatar
                                    alt="Jane Doe"
                                    fallback="JD"
                                    size="md"
                                    src="https://i.pravatar.cc/120?img=47"
                                />
                            )}
                            <View className="flex-1">
                                <View className="flex-row items-center gap-2">
                                    <CardTitle>CrossBits Card</CardTitle>
                                    {showBadge && <Badge label="New" />}
                                </View>
                                <CardDescription>Composed preview component</CardDescription>
                            </View>
                        </View>
                    </CardHeader>
                    <CardContent>
                        <Text color="secondary">
                            This card combines Avatar, Badge, Button, and Card to show how CrossBits components
                            work together.
                        </Text>
                    </CardContent>
                    <CardFooter className="gap-3">
                        <View className="flex-1">
                            <Button label="Cancel" variant="outline" size={size} />
                        </View>
                        <View className="flex-1">
                            <Button label="Accept" variant={variant} size={size} />
                        </View>
                    </CardFooter>
                </Card>
            </DemoSection>

            {/* ── Variant Selector ── */}
            <DemoSection title="Button Variant" description="Choose a button variant">
                <View className="flex-row flex-wrap gap-2">
                    {VARIANTS.map((v) => (
                        <Pressable
                            key={v}
                            onPress={() => setVariant(v)}
                            className={`rounded-full border px-4 py-2 ${variant === v
                                    ? 'border-accent bg-accent/15'
                                    : 'border-glass-border bg-glass'
                                }`}
                        >
                            <Text
                                variant="caption1"
                                className={variant === v ? 'font-bold text-accent' : 'text-muted-foreground'}
                            >
                                {v}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </DemoSection>

            {/* ── Size Selector ── */}
            <DemoSection title="Button Size" description="Choose a button size">
                <View className="flex-row gap-2">
                    {SIZES.map((s) => (
                        <Pressable
                            key={s}
                            onPress={() => setSize(s)}
                            className={`rounded-full border px-5 py-2 ${size === s
                                    ? 'border-accent bg-accent/15'
                                    : 'border-glass-border bg-glass'
                                }`}
                        >
                            <Text
                                variant="caption1"
                                className={size === s ? 'font-bold text-accent' : 'text-muted-foreground'}
                            >
                                {s.toUpperCase()}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </DemoSection>

            {/* ── Toggles ── */}
            <DemoSection title="Composition" description="Toggle sub-components">
                <View className="gap-4">
                    <View className="flex-row items-center justify-between">
                        <Text>Show Avatar</Text>
                        <Switch checked={showAvatar} onCheckedChange={setShowAvatar} />
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text>Show Badge</Text>
                        <Switch checked={showBadge} onCheckedChange={setShowBadge} />
                    </View>
                </View>
            </DemoSection>
        </ScrollView>
    );
}
