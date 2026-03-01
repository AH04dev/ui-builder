// native-bits: RotateIn
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

interface RotateInProps {
    children: ReactNode;
    degrees?: number;
    duration?: number;
    delay?: number;
}

export default function RotateIn({
    children,
    degrees = 360,
    duration = 800,
    delay = 0,
}: RotateInProps) {
    const rotation = useSharedValue(-degrees);
    const scale = useSharedValue(0.5);
    const opacity = useSharedValue(0);

    useEffect(() => {
        const easing = Easing.bezierFn(0.16, 1, 0.3, 1);
        rotation.value = withDelay(delay, withTiming(0, { duration, easing }));
        scale.value = withDelay(delay, withTiming(1, { duration, easing }));
        opacity.value = withDelay(delay, withTiming(1, { duration: duration * 0.5, easing }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { rotate: `${rotation.value}deg` },
            { scale: scale.value },
        ],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
