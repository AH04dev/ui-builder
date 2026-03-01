// native-bits: SpringReveal
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { ReactNode, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface SpringRevealProps {
  children: ReactNode;
  axis?: 'x' | 'y';
  from?: number;
}

export default function SpringReveal({ children, axis = 'y', from = 24 }: SpringRevealProps) {
  const translate = useSharedValue(from);

  useEffect(() => {
    translate.value = withSpring(0, { damping: 13, stiffness: 150 });
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: axis === 'y' ? [{ translateY: translate.value }] : [{ translateX: translate.value }],
    opacity: translate.value === 0 ? 1 : 0.2,
  }));

  return <Animated.View style={style}>{children}</Animated.View>;
}
