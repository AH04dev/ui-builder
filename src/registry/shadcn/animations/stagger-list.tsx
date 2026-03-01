// native-bits: StaggerList
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withDelay,
    withTiming,
    withSpring,
    Easing,
} from 'react-native-reanimated';

interface StaggerListProps {
    children: ReactNode[];
    staggerDelay?: number;
    animation?: 'fadeInUp' | 'scaleIn' | 'slideRight';
    duration?: number;
}

function StaggerItem({
    child,
    index,
    staggerDelay,
    animation,
    duration,
}: {
    child: ReactNode;
    index: number;
    staggerDelay: number;
    animation: string;
    duration: number;
}) {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(animation === 'fadeInUp' ? 30 : 0);
    const translateX = useSharedValue(animation === 'slideRight' ? 50 : 0);
    const scale = useSharedValue(animation === 'scaleIn' ? 0.8 : 1);

    useEffect(() => {
        const delay = index * staggerDelay;
        const easing = Easing.bezierFn(0.16, 1, 0.3, 1);

        opacity.value = withDelay(delay, withTiming(1, { duration, easing }));

        if (animation === 'fadeInUp') {
            translateY.value = withDelay(delay, withTiming(0, { duration, easing }));
        } else if (animation === 'slideRight') {
            translateX.value = withDelay(delay, withTiming(0, { duration, easing }));
        } else if (animation === 'scaleIn') {
            scale.value = withDelay(delay, withSpring(1, { damping: 12 }));
        }
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value },
            { scale: scale.value },
        ],
    }));

    return <Animated.View style={animatedStyle}>{child}</Animated.View>;
}

export default function StaggerList({
    children,
    staggerDelay = 100,
    animation = 'fadeInUp',
    duration = 400,
}: StaggerListProps) {
    return (
        <View>
            {React.Children.map(children, (child, index) => (
                <StaggerItem
                    key={index}
                    child={child}
                    index={index}
                    staggerDelay={staggerDelay}
                    animation={animation}
                    duration={duration}
                />
            ))}
        </View>
    );
}
