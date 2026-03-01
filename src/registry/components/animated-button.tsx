// native-bits: AnimatedButton
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'react-native-linear-gradient';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps {
    title: string;
    onPress?: () => void;
    variant?: 'solid' | 'outline' | 'ghost';
    gradientColors?: [string, string];
    disabled?: boolean;
    style?: ViewStyle;
}

export default function AnimatedButton({
    title,
    onPress,
    variant = 'solid',
    gradientColors = ['#10B981', '#06B6D4'],
    disabled = false,
    style,
}: AnimatedButtonProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    };

    if (variant === 'solid') {
        return (
            <AnimatedPressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                style={[animatedStyle, disabled && { opacity: 0.5 }, style]}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.solidButton}
                >
                    <Text style={styles.solidText}>{title}</Text>
                </LinearGradient>
            </AnimatedPressable>
        );
    }

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            style={[
                animatedStyle,
                variant === 'outline' ? styles.outlineButton : styles.ghostButton,
                disabled && { opacity: 0.5 },
                style,
            ]}
        >
            <Text
                style={[
                    styles.buttonText,
                    { color: variant === 'outline' ? gradientColors[0] : '#9CA3AF' },
                ]}
            >
                {title}
            </Text>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    solidButton: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    solidText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    outlineButton: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#10B981',
        alignItems: 'center',
    },
    ghostButton: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
