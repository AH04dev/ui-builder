import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Text,
} from '~/components/nativewindui';

export default function CardScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Card' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>CrossBits UI Card</CardTitle>
            <CardDescription>
              Card primitives give you consistent spacing and hierarchy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text>
              This content area can hold text, charts, forms, or any React Native view.
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Card</CardTitle>
            <CardDescription>Use footer actions for contextual choices.</CardDescription>
          </CardHeader>
          <CardContent>
            <Text color="secondary">Try both actions below.</Text>
          </CardContent>
          <CardFooter className="gap-3">
            <View className="flex-1">
              <Button label="Cancel" variant="outline" />
            </View>
            <View className="flex-1">
              <Button label="Continue" />
            </View>
          </CardFooter>
        </Card>
      </ScrollView>
    </>
  );
}
