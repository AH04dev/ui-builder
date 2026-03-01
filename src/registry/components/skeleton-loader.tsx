// native-bits: SkeletonLoader
// Copy this file into your React Native project
// Dependencies: react-native-reanimated, react-native-linear-gradient

import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

interface SkeletonLoaderProps {
    width?: number | string;
    height?: number;
    borderRadius?: number;
    baseColor?: string;
    highlightColor?: string;
    style?: ViewStyle;
}

export default function SkeletonLoader({
    width = '100%',
    height = 20,
    borderRadius = 8,
    baseColor = '#1F2937',
    highlightColor = '#374151',
    style,
}: SkeletonLoaderProps) {
    const translateX = useSharedValue(-1);

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1,
            false
        );
    }, []);

    const shimmerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value * 200 }],
    }));

    return (
        <View
            style={[
                styles.container,
                {
                    width: width as number,
                    height,
                    borderRadius,
                    backgroundColor: baseColor,
                },
                style,
            ]}
        >
            <Animated.View style={[StyleSheet.absoluteFillObject, shimmerStyle]}>
                <LinearGradient
                    colors={['transparent', highlightColor, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFillObject, { width: 200 }]}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});
