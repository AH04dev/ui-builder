// native-bits: BottomSheetHandle
// Copy this file into your React Native project
// Dependencies: react-native-reanimated, react-native-gesture-handler

import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface BottomSheetHandleProps {
  snapPoints: number[];
  initialIndex?: number;
  onSnap?: (index: number) => void;
}

export default function BottomSheetHandle({
  snapPoints,
  initialIndex = 0,
  onSnap,
}: BottomSheetHandleProps) {
  const safeIndex = useMemo(() => {
    if (initialIndex < 0) return 0;
    if (initialIndex > snapPoints.length - 1) return snapPoints.length - 1;
    return initialIndex;
  }, [initialIndex, snapPoints.length]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.grab} />
      <View style={styles.row}>
        {snapPoints.map((point, index) => (
          <Pressable
            key={point}
            onPress={() => onSnap?.(index)}
            style={[styles.dot, index === safeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgba(12,20,38,0.98)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingTop: 10,
    paddingBottom: 14,
    alignItems: 'center',
    gap: 10,
  },
  grab: {
    width: 48,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.24)',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.24)',
  },
  dotActive: {
    backgroundColor: '#30D5FF',
  },
});
