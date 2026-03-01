import * as React from 'react';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Button, Progress, Text } from '~/components/nativewindui';

export default function ProgressScreen() {
  const [value, setValue] = React.useState(33);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const animateProgress = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    let next = 0;
    setValue(next);

    timerRef.current = setInterval(() => {
      next += 5;
      setValue(next);

      if (next >= 100 && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 80);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Progress' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-6 p-4">
        <View className="gap-3">
          <Text variant="title3">Preset values</Text>
          <Progress value={0} />
          <Progress value={33} />
          <Progress value={66} />
          <Progress value={100} />
        </View>

        <View className="gap-3">
          <Text variant="title3">Animated value: {value}%</Text>
          <Progress value={value} />
          <Button label="Animate 0 → 100" onPress={animateProgress} />
        </View>
      </ScrollView>
    </>
  );
}
