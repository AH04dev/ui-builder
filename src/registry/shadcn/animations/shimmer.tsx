// native-bits: Shimmer
// Copy this file into your React Native project
// Dependencies: react-native-reanimated, react-native-linear-gradient

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

interface ShimmerProps {
    width?: number;
    height?: number;
    baseColor?: string;
    highlightColor?: string;
    borderRadius?: number;
}

export default function Shimmer({
    width = 200,
    height = 48,
    baseColor = '#1F2937',
    highlightColor = 'rgba(102,126,234,0.2)',
    borderRadius = 14,
}: ShimmerProps) {
    const translateX = useSharedValue(-width);

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(width, {
                duration: 1500,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            false
        );
    }, []);

    const shimmerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View
            style={[
                styles.container,
                { width, height, borderRadius, backgroundColor: baseColor },
            ]}
        >
            <Animated.View style={[StyleSheet.absoluteFillObject, shimmerStyle]}>
                <LinearGradient
                    colors={['transparent', highlightColor, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width, height }}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        position: 'relative',
    },
});
