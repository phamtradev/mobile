import { Redirect, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { bookService } from '@/services/book.service';
import { useAuth } from '@/store/auth-store';
import { BookResponse } from '@/types';

const PRICE = 79000;

const formatPrice = (value: number) => `${value.toLocaleString('vi-VN')} đ`;

export default function CheckoutScreen() {
    const { isHydrating, isLoggedIn, user } = useAuth();
    const [books, setBooks] = useState<BookResponse[]>([]);

    useEffect(() => {
        if (!isLoggedIn) return;
        bookService
            .getBooks()
            .then((data) => setBooks(data.slice(0, 2)))
            .catch(() => setBooks([]));
    }, [isLoggedIn]);

    if (isHydrating) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isLoggedIn) {
        return <Redirect href={{ pathname: '/login', params: { returnTo: 'checkout' } }} />;
    }

    const total = books.length * PRICE;

    const placeOrder = () =>
        Alert.alert('Đặt hàng thành công', `Đơn hàng ${formatPrice(total)} đã được ghi nhận.`, [
            { text: 'Về trang chủ', onPress: () => router.replace('/') },
        ]);

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.content}>
                <Text style={styles.title}>Xác nhận đơn hàng</Text>
                <Text style={styles.subtitle}>Thanh toán với tài khoản {user?.email}</Text>

                <View style={styles.card}>
                    {books.map((book) => (
                        <View key={book.id} style={styles.row}>
                            <View style={styles.rowText}>
                                <Text style={styles.bookTitle}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>{book.author}</Text>
                            </View>
                            <Text style={styles.price}>{formatPrice(PRICE)}</Text>
                        </View>
                    ))}

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tổng cộng</Text>
                        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
                    </View>
                </View>

                <Pressable style={styles.submit} onPress={placeOrder} accessibilityRole="button">
                    <Text style={styles.submitText}>Đặt hàng</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    content: { padding: 16 },

    title: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
    subtitle: { fontSize: 13, color: '#64748b', marginTop: 4, marginBottom: 24 },

    card: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    row: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
    rowText: { flex: 1 },
    bookTitle: { fontSize: 15, fontWeight: '600', color: '#0f172a' },
    bookAuthor: { fontSize: 13, color: '#64748b' },
    price: { fontSize: 14, color: '#0f172a' },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 16,
    },
    totalLabel: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
    totalValue: { fontSize: 16, fontWeight: '700', color: '#1e3a8a' },

    submit: {
        minHeight: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#1e3a8a',
        marginTop: 24,
    },
    submitText: { color: '#fff', fontWeight: '700' },
});
