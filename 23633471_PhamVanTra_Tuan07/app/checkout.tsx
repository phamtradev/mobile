import { Redirect, router } from 'expo-router';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';
import { books, formatPrice } from '@/data/books';
import { useAuth } from '@/store/auth-store';

const order = books.slice(0, 2);
const total = order.reduce((sum, book) => sum + book.price, 0);

export default function CheckoutScreen() {
    const { isRestoring, isLoggedIn, user } = useAuth();

    if (isRestoring) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Brand.navy} />
            </View>
        );
    }

    if (!isLoggedIn) {
        return <Redirect href={{ pathname: '/login', params: { returnTo: 'checkout' } }} />;
    }

    const placeOrder = () => {
        Alert.alert('Đặt hàng thành công', `Đơn hàng ${formatPrice(total)} đã được ghi nhận.`, [
            { text: 'Về trang chủ', onPress: () => router.replace('/') },
        ]);
    };

    return (
        <SafeAreaView style={styles.safe} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Xác nhận đơn hàng</Text>
                <Text style={styles.subtitle}>Thanh toán với tài khoản {user?.email}</Text>

                <View style={styles.card}>
                    {order.map((book) => (
                        <View key={book.id} style={styles.row}>
                            <View style={styles.rowText}>
                                <Text style={styles.bookTitle}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                            </View>
                            <Text style={styles.price}>{formatPrice(book.price)}</Text>
                        </View>
                    ))}

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tổng cộng</Text>
                        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
                    </View>
                </View>

                <Pressable
                    onPress={placeOrder}
                    style={({ pressed }) => [styles.submit, pressed && styles.submitPressed]}
                    accessibilityRole="button">
                    <Text style={styles.submitText}>Đặt hàng</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    content: { padding: Spacing.three },

    title: { fontSize: 20, fontWeight: '700', color: Brand.text },
    subtitle: { fontSize: 13, color: Brand.textMuted, marginTop: Spacing.one, marginBottom: Spacing.four },

    card: {
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.three,
        backgroundColor: Brand.surface,
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, marginBottom: Spacing.three },
    rowText: { flex: 1 },
    bookTitle: { fontSize: 15, fontWeight: '600', color: Brand.text },
    bookAuthor: { fontSize: 13, color: Brand.textMuted },
    price: { fontSize: 14, color: Brand.text },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: Brand.border,
        paddingTop: Spacing.three,
    },
    totalLabel: { fontSize: 15, fontWeight: '700', color: Brand.text },
    totalValue: { fontSize: 16, fontWeight: '700', color: Brand.navy },

    submit: {
        minHeight: MinTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Spacing.two,
        backgroundColor: Brand.navy,
        marginTop: Spacing.four,
    },
    submitPressed: { backgroundColor: Brand.indigo },
    submitText: { fontSize: 15, fontWeight: '700', color: Brand.onNavy },
});
