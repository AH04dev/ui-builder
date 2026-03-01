// native-bits: SwipeDismiss
// Copy this file into your React Native project
// Dependencies: react-native-reanimated, react-native-gesture-handler

import React, { ReactNode } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface SwipeDismissProps {
  children: ReactNode;
  threshold?: number;
  onDismiss?: () => void;
}

export default function SwipeDismiss({
  children,
  threshold = 80,
  onDismiss,
}: SwipeDismissProps) {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onFinalize(() => {
      if (Math.abs(translateX.value) > threshold) {
        translateX.value = withTiming(Math.sign(translateX.value) * 420, { duration: 180 });
        opacity.value = withTiming(0, { duration: 180 }, () => {
          if (onDismiss) {
            runOnJS(onDismiss)();
          }
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={style}>{children}</Animated.View>
    </GestureDetector>
  );
}
