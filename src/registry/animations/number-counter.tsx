// native-bits: NumberCounter
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React, { useEffect, useState } from 'react';
import { Text, TextStyle } from 'react-native';

interface NumberCounterProps {
  from?: number;
  to: number;
  duration?: number;
  style?: TextStyle;
}

export default function NumberCounter({
  from = 0,
  to,
  duration = 900,
  style,
}: NumberCounterProps) {
  const [current, setCurrent] = useState(from);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const progress = Math.min(1, (Date.now() - start) / duration);
      const next = Math.round(from + (to - from) * progress);
      setCurrent(next);
      if (progress >= 1) {
        clearInterval(tick);
      }
    }, 16);

    return () => clearInterval(tick);
  }, [from, to, duration]);

  return <Text style={style}>{current.toLocaleString()}</Text>;
}
