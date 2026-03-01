// native-bits: GlassCard
// Copy this file into your React Native project
// Dependencies: react-native-reanimated, expo-blur

import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

interface GlassCardProps {
    children: ReactNode;
    intensity?: number;
    tint?: 'light' | 'dark';
    borderColor?: string;
    style?: ViewStyle;
}

export default function GlassCard({
    children,
    intensity = 40,
    tint = 'dark',
    borderColor = 'rgba(255,255,255,0.1)',
    style,
}: GlassCardProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View
            style={[animatedStyle, style]}
            onTouchStart={() => {
                scale.value = withSpring(0.98, { damping: 20 });
            }}
            onTouchEnd={() => {
                scale.value = withSpring(1, { damping: 15 });
            }}
        >
            <View style={[styles.container, { borderColor }]}>
                <BlurView
                    intensity={intensity}
                    tint={tint}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={styles.content}>{children}</View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
    },
    content: {
        padding: 20,
    },
});
