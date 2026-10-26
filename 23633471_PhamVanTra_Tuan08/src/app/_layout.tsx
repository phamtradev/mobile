import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from '@/store/auth-store';

export default function RootLayout() {
    return (
        <AuthProvider>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: '#1e3a8a' },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: { fontWeight: '700' },
                    headerShadowVisible: false,
                    contentStyle: { backgroundColor: '#f8fafc' },
                }}>
                <Stack.Screen name="index" options={{ title: 'BookStore' }} />
                <Stack.Screen name="login" options={{ title: 'Tài khoản' }} />
                <Stack.Screen name="checkout" options={{ title: 'Thanh toán' }} />
                <Stack.Screen name="books/[id]" options={{ title: 'Chi tiết sách' }} />
            </Stack>
        </AuthProvider>
    );
}
