// native-bits: FadeInUp
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { ReactNode, useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withDelay,
    withTiming,
    Easing,
} from 'react-native-reanimated';

interface FadeInUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    distance?: number;
}

export default function FadeInUp({
    children,
    delay = 0,
    duration = 600,
    distance = 30,
}: FadeInUpProps) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(distance);

    useEffect(() => {
        opacity.value = withDelay(
            delay,
            withTiming(1, { duration, easing: Easing.bezierFn(0.16, 1, 0.3, 1) })
        );
        translateY.value = withDelay(
            delay,
            withTiming(0, { duration, easing: Easing.bezierFn(0.16, 1, 0.3, 1) })
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
