import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { BookCard } from '@/components/book-card';
import { bookService } from '@/services/book.service';
import { useAuth } from '@/store/auth-store';
import { BookResponse } from '@/types';

export default function HomeScreen() {
    const { isHydrating, isLoggedIn, user, logout } = useAuth();

    const [search, setSearch] = useState('');
    const [books, setBooks] = useState<BookResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async (keyword: string) => {
        setLoading(true);
        setError(null);
        try {
            setBooks(await bookService.getBooks(keyword.trim() || undefined));
        } catch {
            setError('Không tải được danh sách sách. Kiểm tra lại server json-server.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => load(search), 350);
        return () => clearTimeout(timer);
    }, [search, load]);

    if (isHydrating) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const openCheckout = () =>
        router.push(
            isLoggedIn ? '/checkout' : { pathname: '/login', params: { returnTo: 'checkout' } },
        );

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.greeting}>
                        {isLoggedIn ? `Chào ${user?.name}` : 'Chào bạn đọc'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {isLoggedIn ? user?.email : 'Đăng nhập để bình luận và thanh toán'}
                    </Text>
                </View>

                <Pressable
                    onPress={() => (isLoggedIn ? logout() : router.push('/login'))}
                    style={styles.authButton}
                    accessibilityRole="button">
                    <Text style={styles.authButtonText}>
                        {isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
                    </Text>
                </Pressable>
            </View>

            <TextInput
                value={search}
                onChangeText={setSearch}
                style={styles.search}
                placeholder="Tìm theo tên sách hoặc tác giả"
                placeholderTextColor="#94a3b8"
                autoCorrect={false}
                accessibilityLabel="Ô tìm kiếm sách"
            />

            <Pressable style={styles.checkout} onPress={openCheckout} accessibilityRole="button">
                <Text style={styles.checkoutText}>Tới trang thanh toán</Text>
            </Pressable>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : error ? (
                <View style={styles.center}>
                    <Text style={styles.error}>{error}</Text>
                    <Pressable onPress={() => load(search)} style={styles.retry}>
                        <Text style={styles.retryText}>Thử lại</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={books}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <BookCard book={item} />}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={styles.empty}>Không có sách nào khớp từ khoá.</Text>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, gap: 12 },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    headerText: { flex: 1 },
    greeting: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
    subtitle: { fontSize: 13, color: '#64748b', marginTop: 2 },
    authButton: {
        minHeight: 44,
        justifyContent: 'center',
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#1e3a8a',
        borderRadius: 8,
    },
    authButtonText: { fontSize: 14, fontWeight: '600', color: '#1e3a8a' },

    search: {
        minHeight: 46,
        marginHorizontal: 16,
        marginTop: 16,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        backgroundColor: '#fff',
        color: '#0f172a',
    },

    checkout: {
        minHeight: 46,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#1e3a8a',
    },
    checkoutText: { color: '#fff', fontWeight: '700' },

    list: { paddingHorizontal: 16, paddingBottom: 24 },
    empty: { textAlign: 'center', color: '#64748b', marginTop: 24 },
    error: { textAlign: 'center', color: '#dc2626' },
    retry: {
        paddingHorizontal: 16,
        minHeight: 44,
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#1e3a8a',
    },
    retryText: { color: '#fff', fontWeight: '700' },
});
