import { View } from 'react-native';
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
import { ShowcaseLayout } from '~/components/ShowcaseLayout';
import { DemoSection } from '~/components/DemoSection';

export default function DialogScreen() {
  return (
    <ShowcaseLayout title="Dialog" subtitle="Modal dialog powered by rn-primitives">
      <DemoSection title="Confirmation Dialog" description="Classic confirm/cancel pattern">
        <Text color="secondary" className="mb-4">
          Tap the button below to open a modal dialog with overlay backdrop.
        </Text>
        <View className="items-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button label="Open Dialog" />
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
      </DemoSection>

      <DemoSection title="Info Dialog" description="Non-destructive informational modal">
        <View className="items-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button label="Show Info" variant="secondary" />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>About CrossBits</DialogTitle>
              <DialogDescription>
                CrossBits is a premium React Native component library built with Expo, NativeWind,
                and rn-primitives. It ships with dark-first design, haptic feedback, and full
                web support.
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button label="Got it" />
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>
      </DemoSection>
    </ShowcaseLayout>
  );
}
