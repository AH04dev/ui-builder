import { Tabs } from 'expo-router';
import { Layers } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Components',
          tabBarIcon: ({ color }) => <Layers color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
