// native-bits: SegmentedControl
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  const activeIndex = Math.max(0, options.findIndex((item) => item === value));
  const width = 100 / options.length;

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(activeIndex * width) }],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.indicator, { width: `${width}%` }, indicatorStyle]} />
      {options.map((item) => (
        <Pressable key={item} style={styles.tab} onPress={() => onChange(item)}>
          <Text style={[styles.label, item === value && styles.labelActive]}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    padding: 4,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    borderRadius: 9,
    backgroundColor: '#30D5FF',
  },
  tab: {
    flex: 1,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#A8B4CC',
    fontSize: 13,
    fontWeight: '600',
  },
  labelActive: {
    color: '#061523',
  },
});
