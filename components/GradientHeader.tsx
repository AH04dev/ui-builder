import * as React from 'react';
import { View } from 'react-native';
import { Text } from '~/components/nativewindui';
import { cn } from '~/lib/utils';

type GradientHeaderProps = {
    title: string;
    subtitle?: string;
    className?: string;
};

export function GradientHeader({ title, subtitle, className }: GradientHeaderProps) {
    return (
        <View className={cn('relative overflow-hidden px-5 pb-6 pt-4', className)}>
            {/* Decorative accent circles */}
            <View className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10" />
            <View className="absolute -left-4 top-12 h-20 w-20 rounded-full bg-accent-secondary/10" />

            <Text variant="title1" className="text-accent">
                {title}
            </Text>
            {subtitle && (
                <Text variant="subhead" color="secondary" className="mt-1">
                    {subtitle}
                </Text>
            )}
        </View>
    );
}
