import * as React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/nativewindui';
import { cn } from '~/lib/utils';

type DemoSectionProps = {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
};

export function DemoSection({ title, description, children, className }: DemoSectionProps) {
    return (
        <View className={cn('mx-4 mb-4', className)}>
            <View className="mb-3">
                <Text variant="title3" className="text-foreground">
                    {title}
                </Text>
                {description && (
                    <Text variant="caption1" color="secondary" className="mt-0.5">
                        {description}
                    </Text>
                )}
            </View>
            <View className="rounded-2xl border border-glass-border bg-glass p-4">
                {children}
            </View>
        </View>
    );
}
