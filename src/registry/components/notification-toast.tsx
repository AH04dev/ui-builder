// native-bits: NotificationToast
// Copy this file into your React Native project
// Dependencies: react-native-reanimated, react-native-gesture-handler

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';
import {
    GestureDetector,
    Gesture,
} from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface NotificationToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onDismiss?: () => void;
    position?: 'top' | 'bottom';
    visible: boolean;
}

const colors = {
    success: { bg: '#064E3B', border: '#10B981', icon: '✓' },
    error: { bg: '#7F1D1D', border: '#EF4444', icon: '✕' },
    warning: { bg: '#78350F', border: '#F59E0B', icon: '⚠' },
    info: { bg: '#1E3A5F', border: '#3B82F6', icon: 'ℹ' },
};

export default function NotificationToast({
    message,
    type = 'info',
    duration = 3000,
    onDismiss,
    position = 'top',
    visible,
}: NotificationToastProps) {
    const translateY = useSharedValue(position === 'top' ? -100 : 100);
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(0);
    const scheme = colors[type];

    useEffect(() => {
        if (visible) {
            translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
            opacity.value = withTiming(1, { duration: 200 });

            if (duration > 0) {
                translateY.value = withDelay(
                    duration,
                    withSpring(position === 'top' ? -100 : 100, { damping: 20 })
                );
                opacity.value = withDelay(
                    duration,
                    withTiming(0, { duration: 200 }, () => {
                        if (onDismiss) runOnJS(onDismiss)();
                    })
                );
            }
        }
    }, [visible]);

    const swipeGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX;
        })
        .onEnd((e) => {
            if (Math.abs(e.translationX) > SCREEN_WIDTH * 0.3) {
                translateX.value = withTiming(
                    e.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
                    { duration: 200 },
                    () => {
                        if (onDismiss) runOnJS(onDismiss)();
                    }
                );
            } else {
                translateX.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value },
        ],
        opacity: opacity.value,
    }));

    if (!visible) return null;

    return (
        <GestureDetector gesture={swipeGesture}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        [position]: position === 'top' ? 60 : 40,
                        backgroundColor: scheme.bg,
                        borderColor: scheme.border,
                    },
                    animatedStyle,
                ]}
            >
                <Text style={[styles.icon, { color: scheme.border }]}>{scheme.icon}</Text>
                <Text style={styles.message}>{message}</Text>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        zIndex: 9999,
    },
    icon: {
        fontSize: 18,
        fontWeight: '700',
        marginRight: 12,
    },
    message: {
        flex: 1,
        color: '#F0F0F5',
        fontSize: 14,
        fontWeight: '500',
    },
});
