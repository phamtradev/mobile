import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from '@/navigation/main-tabs';
import type { RootStackParamList } from '@/navigation/types';
import BookDetailScreen from '@/screens/book-detail-screen';
import CheckoutScreen from '@/screens/checkout-screen';
import { Brand } from '@/constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Stack ngoài cùng.
 *
 * MainTabs là một màn hình của stack, nên BookDetail và Checkout đẩy chồng lên
 * trên và che cả thanh tab — đúng hành vi mong muốn cho màn chi tiết và màn
 * thanh toán.
 */
export default function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Brand.navy },
                headerTintColor: Brand.onNavy,
                headerTitleStyle: { fontWeight: '700' },
            }}
        >
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen
                name="BookDetail"
                component={BookDetailScreen}
                options={{ title: 'Chi tiết sách' }}
            />
            <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{ title: 'Thanh toán' }}
            />
        </Stack.Navigator>
    );
}
