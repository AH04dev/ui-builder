// native-bits: ScalePop
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { ReactNode, useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withDelay,
    withSpring,
} from 'react-native-reanimated';

interface ScalePopProps {
    children: ReactNode;
    delay?: number;
    damping?: number;
    stiffness?: number;
}

export default function ScalePop({
    children,
    delay = 0,
    damping = 12,
    stiffness = 100,
}: ScalePopProps) {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        scale.value = withDelay(
            delay,
            withSpring(1, { damping, stiffness })
        );
        opacity.value = withDelay(
            delay,
            withSpring(1, { damping: 20 })
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
