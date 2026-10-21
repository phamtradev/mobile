import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Brand } from '@/constants/theme';
import { AuthProvider } from '@/store/auth-store';

export default function RootLayout() {
    return (
        <AuthProvider>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: Brand.navy },
                    headerTintColor: Brand.onNavy,
                    headerTitleStyle: { fontWeight: '700' },
                    headerShadowVisible: false,
                    contentStyle: { backgroundColor: Brand.page },
                }}>
                <Stack.Screen name="index" options={{ title: 'BookStore' }} />
                <Stack.Screen name="login" options={{ title: 'Tài khoản' }} />
                <Stack.Screen name="checkout" options={{ title: 'Thanh toán' }} />
                <Stack.Screen name="books/[id]" options={{ title: 'Chi tiết sách' }} />
            </Stack>
        </AuthProvider>
    );
}
