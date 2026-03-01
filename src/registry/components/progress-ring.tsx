// native-bits: ProgressRing
// Copy this file into your React Native project
// Dependencies: react-native-reanimated, react-native-svg

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
    progress: number; // 0-100
    size?: number;
    strokeWidth?: number;
    gradientColors?: [string, string];
    animated?: boolean;
    showLabel?: boolean;
}

export default function ProgressRing({
    progress,
    size = 120,
    strokeWidth = 8,
    gradientColors = ['#10B981', '#06B6D4'],
    animated = true,
    showLabel = true,
}: ProgressRingProps) {
    const animatedProgress = useSharedValue(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const target = Math.min(Math.max(progress, 0), 100) / 100;
        if (animated) {
            animatedProgress.value = withTiming(target, {
                duration: 1200,
                easing: Easing.bezierFn(0.16, 1, 0.3, 1),
            });
        } else {
            animatedProgress.value = target;
        }
    }, [progress]);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * (1 - animatedProgress.value),
    }));

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                <Defs>
                    <SvgGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0%" stopColor={gradientColors[0]} />
                        <Stop offset="100%" stopColor={gradientColors[1]} />
                    </SvgGradient>
                </Defs>

                {/* Background circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                {/* Progress circle */}
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#ring-gradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animatedProps={animatedProps}
                    rotation={-90}
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>

            {showLabel && (
                <View style={styles.label}>
                    <Text style={styles.labelText}>{Math.round(progress)}%</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#F0F0F5',
    },
});
