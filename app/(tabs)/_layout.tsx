import { Tabs } from 'expo-router';
import { LayoutGrid, PlayCircle, Settings } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'hsl(230, 25%, 7%)',
          borderTopColor: 'hsl(230, 20%, 14%)',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: 'hsl(217, 92%, 60%)',
        tabBarInactiveTintColor: 'hsl(230, 10%, 45%)',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Components',
          tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="playground"
        options={{
          title: 'Playground',
          tabBarIcon: ({ color, size }) => <PlayCircle color={color} size={size - 2} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size - 2} />,
        }}
      />
    </Tabs>
  );
}
