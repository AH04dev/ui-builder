// native-bits: InputField
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { ReactNode, useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    interpolateColor,
} from 'react-native-reanimated';

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    icon?: ReactNode;
    error?: string;
    secureTextEntry?: boolean;
    style?: ViewStyle;
}

export default function InputField({
    label,
    value,
    onChangeText,
    icon,
    error,
    secureTextEntry = false,
    style,
}: InputFieldProps) {
    const [isFocused, setIsFocused] = useState(false);
    const focus = useSharedValue(0);
    const hasValue = value.length > 0;

    const handleFocus = () => {
        setIsFocused(true);
        focus.value = withTiming(1, { duration: 200 });
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!hasValue) {
            focus.value = withTiming(0, { duration: 200 });
        }
    };

    const labelStyle = useAnimatedStyle(() => {
        const active = hasValue || isFocused ? 1 : focus.value;
        return {
            transform: [
                { translateY: interpolate(active, [0, 1], [0, -24]) },
                { scale: interpolate(active, [0, 1], [1, 0.8]) },
            ],
            color: interpolateColor(
                active,
                [0, 1],
                ['#6B7280', error ? '#EF4444' : '#10B981']
            ),
        };
    });

    const borderStyle = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            focus.value,
            [0, 1],
            [error ? '#EF4444' : '#374151', error ? '#EF4444' : '#10B981']
        ),
    }));

    return (
        <View style={[styles.wrapper, style]}>
            <Animated.View style={[styles.container, borderStyle]}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <View style={styles.inputWrapper}>
                    <Animated.Text style={[styles.label, labelStyle]}>
                        {label}
                    </Animated.Text>
                    <TextInput
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        secureTextEntry={secureTextEntry}
                        style={styles.input}
                        placeholderTextColor="#4B5563"
                    />
                </View>
            </Animated.View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { marginBottom: 16 },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#111118',
    },
    icon: { marginRight: 12 },
    inputWrapper: { flex: 1, justifyContent: 'center' },
    label: {
        position: 'absolute',
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        fontSize: 16,
        color: '#F0F0F5',
        paddingVertical: 4,
    },
    error: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 16,
    },
});
