// native-bits: ToggleSwitch
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolateColor,
} from 'react-native-reanimated';

interface ToggleSwitchProps {
    value: boolean;
    onToggle: (value: boolean) => void;
    activeColor?: string;
    inactiveColor?: string;
    size?: 'sm' | 'md' | 'lg';
    style?: ViewStyle;
}

const sizes = {
    sm: { track: { width: 40, height: 24 }, thumb: 18, padding: 3 },
    md: { track: { width: 52, height: 30 }, thumb: 24, padding: 3 },
    lg: { track: { width: 64, height: 36 }, thumb: 28, padding: 4 },
};

export default function ToggleSwitch({
    value,
    onToggle,
    activeColor = '#10B981',
    inactiveColor = '#374151',
    size = 'md',
    style,
}: ToggleSwitchProps) {
    const progress = useSharedValue(value ? 1 : 0);
    const dims = sizes[size];

    React.useEffect(() => {
        progress.value = withSpring(value ? 1 : 0, { damping: 15, stiffness: 200 });
    }, [value]);

    const trackStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            progress.value,
            [0, 1],
            [inactiveColor, activeColor]
        ),
    }));

    const thumbStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withSpring(
                    value
                        ? dims.track.width - dims.thumb - dims.padding * 2
                        : 0,
                    { damping: 15, stiffness: 200 }
                ),
            },
        ],
    }));

    return (
        <Pressable onPress={() => onToggle(!value)} style={style}>
            <Animated.View
                style={[
                    styles.track,
                    { width: dims.track.width, height: dims.track.height, borderRadius: dims.track.height / 2, padding: dims.padding },
                    trackStyle,
                ]}
            >
                <Animated.View
                    style={[
                        styles.thumb,
                        { width: dims.thumb, height: dims.thumb, borderRadius: dims.thumb / 2 },
                        thumbStyle,
                    ]}
                />
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    track: {
        justifyContent: 'center',
    },
    thumb: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
});
