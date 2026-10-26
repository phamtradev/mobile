import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "@/store/auth-store";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f8fafc" },
          contentStyle: { backgroundColor: "#f8fafc" },
        }}>
        <Stack.Screen name="index" options={{ title: "Book nook" }} />
        <Stack.Screen name="login" options={{ title: "Welcome" }} />
        <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
        <Stack.Screen name="books/[id]" options={{ title: "Book details" }} />
      </Stack>
    </AuthProvider>
  );
}
