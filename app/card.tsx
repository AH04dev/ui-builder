import { View } from 'react-native';
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
import { ShowcaseLayout } from '~/components/ShowcaseLayout';
import { DemoSection } from '~/components/DemoSection';

export default function CardScreen() {
  return (
    <ShowcaseLayout title="Card" subtitle="Elevated container with header, content, and footer slots">
      <DemoSection title="Basic Card" description="Title + description + body text">
        <Card>
          <CardHeader>
            <CardTitle>Cross Bits UI Card</CardTitle>
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
      </DemoSection>

      <DemoSection title="Action Card" description="Footer with action buttons">
        <Card>
          <CardHeader>
            <CardTitle>Confirm Action</CardTitle>
            <CardDescription>Use footer actions for contextual choices.</CardDescription>
          </CardHeader>
          <CardContent>
            <Text color="secondary">This action cannot be undone.</Text>
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
      </DemoSection>

      <DemoSection title="Accent Card" description="Custom border accent">
        <Card className="border-accent/30">
          <CardHeader>
            <CardTitle className="text-accent">Featured</CardTitle>
            <CardDescription>Accent-bordered card for emphasis.</CardDescription>
          </CardHeader>
          <CardContent>
            <Text color="secondary">
              Use the border-accent utility to highlight important cards.
            </Text>
          </CardContent>
        </Card>
      </DemoSection>
    </ShowcaseLayout>
  );
}
