// native-bits: FloatingActionButton
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'react-native-linear-gradient';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FloatingActionButtonProps {
    icon: ReactNode;
    onPress?: () => void;
    gradientColors?: [string, string];
    size?: number;
    position?: { bottom: number; right: number };
    style?: ViewStyle;
}

export default function FloatingActionButton({
    icon,
    onPress,
    gradientColors = ['#10B981', '#06B6D4'],
    size = 56,
    position = { bottom: 24, right: 24 },
    style,
}: FloatingActionButtonProps) {
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotate: `${rotation.value}deg` },
        ],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.9, { damping: 12, stiffness: 300 });
        rotation.value = withSpring(90, { damping: 12, stiffness: 100 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 12, stiffness: 300 });
        rotation.value = withSpring(0, { damping: 12, stiffness: 100 });
    };

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
                styles.container,
                { bottom: position.bottom, right: position.right },
                animatedStyle,
                style,
            ]}
        >
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.button,
                    { width: size, height: size, borderRadius: size / 2 },
                ]}
            >
                {icon}
            </LinearGradient>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
