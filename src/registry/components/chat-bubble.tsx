// native-bits: ChatBubble
// Copy this file into your React Native project
// Dependencies: react-native-reanimated

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ChatBubbleProps {
  sender: 'self' | 'bot' | 'other';
  message: string;
  time?: string;
}

export default function ChatBubble({ sender, message, time }: ChatBubbleProps) {
  const self = sender === 'self';

  return (
    <Animated.View entering={FadeIn.duration(260)} style={[styles.bubble, self ? styles.self : styles.other]}>
      <Text style={[styles.message, self && styles.messageSelf]}>{message}</Text>
      {time ? <Text style={[styles.time, self && styles.timeSelf]}>{time}</Text> : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '82%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginVertical: 4,
  },
  self: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 6,
    backgroundColor: 'rgba(48,213,255,0.22)',
  },
  other: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  message: {
    color: '#E7EEFF',
    fontSize: 14,
    lineHeight: 20,
  },
  messageSelf: {
    color: '#D9F8FF',
  },
  time: {
    marginTop: 4,
    color: '#9EB0D6',
    fontSize: 11,
  },
  timeSelf: {
    color: '#BDEEFF',
  },
});
