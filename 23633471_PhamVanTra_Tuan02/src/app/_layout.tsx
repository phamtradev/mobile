import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Brand } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="courses"
          options={{ headerShown: true, title: 'Course Catalog', headerTintColor: Brand.primary }}
        />
        <Stack.Screen
          name="students"
          options={{ headerShown: true, title: 'Student Directory', headerTintColor: Brand.primary }}
        />
      </Stack>
    </ThemeProvider>
  );
}
