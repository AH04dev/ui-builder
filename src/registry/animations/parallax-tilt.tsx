// native-bits: ParallaxTilt
// Copy this file into your React Native project
// Dependencies: react-native-reanimated, react-native-gesture-handler

import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface ParallaxTiltProps {
  children: ReactNode;
  intensity?: number;
  perspective?: number;
}

export default function ParallaxTilt({
  children,
  intensity = 10,
  perspective = 650,
}: ParallaxTiltProps) {
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((event) => {
      tiltY.value = (event.translationX / 120) * intensity;
      tiltX.value = (-event.translationY / 120) * intensity;
    })
    .onFinalize(() => {
      tiltX.value = withSpring(0);
      tiltY.value = withSpring(0);
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective },
      { rotateX: `${tiltX.value}deg` },
      { rotateY: `${tiltY.value}deg` },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, style]}>{children}</Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});
