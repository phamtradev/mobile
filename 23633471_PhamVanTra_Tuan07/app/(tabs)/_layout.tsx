import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color }) => <IconSymbol color={color} name="house.fill" size={28} />,
        }}
      />
      <Tabs.Screen
        name="interaction"
        options={{
          title: 'Tương tác',
          tabBarIcon: ({ color }) => <IconSymbol color={color} name="paperplane.fill" size={28} />,
        }}
      />
      <Tabs.Screen name="homework" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}
