// native-bits: Flip
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

interface FlipProps {
    children: ReactNode;
    direction?: 'horizontal' | 'vertical';
    duration?: number;
    delay?: number;
}

export default function Flip({
    children,
    direction = 'horizontal',
    duration = 800,
    delay = 0,
}: FlipProps) {
    const rotation = useSharedValue(90);
    const opacity = useSharedValue(0);

    useEffect(() => {
        const easing = Easing.bezierFn(0.16, 1, 0.3, 1);
        rotation.value = withDelay(delay, withTiming(0, { duration, easing }));
        opacity.value = withDelay(delay, withTiming(1, { duration: duration * 0.4, easing }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            direction === 'horizontal'
                ? { rotateY: `${rotation.value}deg` }
                : { rotateX: `${rotation.value}deg` },
        ],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
