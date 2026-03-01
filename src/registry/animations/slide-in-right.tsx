// native-bits: SlideInRight
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

interface SlideInRightProps {
    children: ReactNode;
    offset?: number;
    duration?: number;
    delay?: number;
}

export default function SlideInRight({
    children,
    offset = 100,
    duration = 500,
    delay = 0,
}: SlideInRightProps) {
    const translateX = useSharedValue(offset);
    const opacity = useSharedValue(0);

    useEffect(() => {
        const easing = Easing.bezierFn(0.16, 1, 0.3, 1);
        translateX.value = withDelay(delay, withTiming(0, { duration, easing }));
        opacity.value = withDelay(delay, withTiming(1, { duration: duration * 0.6, easing }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateX: translateX.value }],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
