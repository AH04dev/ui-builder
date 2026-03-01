import { View } from 'react-native';
import { Button, Text } from '~/components/nativewindui';
import { ShowcaseLayout } from '~/components/ShowcaseLayout';
import { DemoSection } from '~/components/DemoSection';

export default function ButtonScreen() {
  return (
    <ShowcaseLayout title="Button" subtitle="Pressable with variants, sizes, and haptic feedback">
      <DemoSection title="Variants" description="Five built-in button styles">
        <View className="gap-3">
          <Button label="Default" variant="default" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Destructive" variant="destructive" />
          <Button label="Outline" variant="outline" />
          <Button label="Ghost" variant="ghost" />
        </View>
      </DemoSection>

      <DemoSection title="Sizes" description="Small, medium, and large">
        <View className="gap-3">
          <Button label="Small" size="sm" />
          <Button label="Medium" size="md" />
          <Button label="Large" size="lg" />
        </View>
      </DemoSection>

      <DemoSection title="Combinations" description="Mix variants with sizes">
        <View className="flex-row flex-wrap gap-2">
          <Button label="SM Outline" variant="outline" size="sm" />
          <Button label="SM Destructive" variant="destructive" size="sm" />
          <Button label="LG Secondary" variant="secondary" size="lg" />
        </View>
      </DemoSection>
    </ShowcaseLayout>
  );
}
