// native-bits: Bounce
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { ReactNode, useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing,
} from 'react-native-reanimated';

interface BounceProps {
    children: ReactNode;
    height?: number;
    duration?: number;
}

export default function Bounce({
    children,
    height = 20,
    duration = 600,
}: BounceProps) {
    const translateY = useSharedValue(0);

    useEffect(() => {
        translateY.value = withRepeat(
            withSequence(
                withTiming(-height, {
                    duration: duration / 2,
                    easing: Easing.out(Easing.ease),
                }),
                withTiming(0, {
                    duration: duration / 2,
                    easing: Easing.in(Easing.ease),
                })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
