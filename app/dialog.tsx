import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Text,
} from '~/components/nativewindui';

export default function DialogScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Dialog' }} />
      <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-4 p-4">
        <Text>
          Dialog is powered by `@rn-primitives/dialog` and styled via NativeWind.
        </Text>
        <View className="items-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button label="Open dialog" />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Delete draft?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Your local draft will be removed permanently.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button label="Cancel" variant="outline" />
                </DialogClose>
                <DialogClose asChild>
                  <Button label="Delete" variant="destructive" />
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>
      </ScrollView>
    </>
  );
}
