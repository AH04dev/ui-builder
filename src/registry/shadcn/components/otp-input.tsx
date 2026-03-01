// native-bits: OtpInput
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { useRef, useState } from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface OtpInputProps {
  length?: number;
  onFilled?: (code: string) => void;
  autoFocus?: boolean;
  inputProps?: TextInputProps;
}

export default function OtpInput({
  length = 6,
  onFilled,
  autoFocus = true,
  inputProps,
}: OtpInputProps) {
  const [value, setValue] = useState('');
  const glow = useSharedValue(0);
  const inputRef = useRef<TextInput>(null);

  const onChange = (text: string) => {
    const normalized = text.replace(/\D/g, '').slice(0, length);
    setValue(normalized);
    glow.value = withTiming(normalized.length > 0 ? 1 : 0, { duration: 150 });

    if (normalized.length === length && onFilled) {
      onFilled(normalized);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + glow.value * 0.65,
  }));

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChange}
        keyboardType="number-pad"
        autoFocus={autoFocus}
        maxLength={length}
        style={styles.hiddenInput}
        {...inputProps}
      />

      <View style={styles.row}>
        {Array.from({ length }).map((_, index) => {
          const digit = value[index] ?? '';
          const active = index === value.length;

          return (
            <Animated.View key={index} style={[styles.cell, active && styles.cellActive, animatedStyle]}>
              <Animated.Text style={styles.cellText}>{digit}</Animated.Text>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  cell: {
    width: 44,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellActive: {
    borderColor: '#30D5FF',
  },
  cellText: {
    color: '#F8FAFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
