import { router } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BookCard from '@/components/book-card';
import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';
import { books } from '@/data/books';
import { useAuth } from '@/store/auth-store';

export default function HomeScreen() {
    const { isRestoring, isLoggedIn, user, logout } = useAuth();

    if (isRestoring) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Brand.navy} />
                <Text style={styles.centerText}>Đang khôi phục phiên đăng nhập…</Text>
            </View>
        );
    }

    const openCheckout = () =>
        router.push(isLoggedIn ? '/checkout' : { pathname: '/login', params: { returnTo: 'checkout' } });

    return (
        <SafeAreaView style={styles.safe} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.greetingRow}>
                    <View style={styles.greetingText}>
                        <Text style={styles.greeting}>
                            {isLoggedIn ? `Chào ${user?.name}` : 'Chào bạn đọc'}
                        </Text>
                        <Text style={styles.subtitle}>
                            {isLoggedIn ? user?.email : 'Đăng nhập để đánh giá sách và thanh toán'}
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => (isLoggedIn ? logout() : router.push('/login'))}
                        style={({ pressed }) => [styles.authButton, pressed && styles.pressed]}
                        accessibilityRole="button">
                        <Text style={styles.authButtonText}>{isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}</Text>
                    </Pressable>
                </View>

                <Pressable
                    onPress={openCheckout}
                    style={({ pressed }) => [styles.checkout, pressed && styles.checkoutPressed]}
                    accessibilityRole="button">
                    <Text style={styles.checkoutText}>Tới trang thanh toán</Text>
                </Pressable>

                <Text style={styles.sectionTitle}>Sách nổi bật</Text>
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three },
    centerText: { fontSize: 14, color: Brand.textMuted },
    content: { padding: Spacing.three },

    greetingRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, marginBottom: Spacing.three },
    greetingText: { flex: 1 },
    greeting: { fontSize: 20, fontWeight: '700', color: Brand.text },
    subtitle: { fontSize: 13, color: Brand.textMuted, marginTop: 2 },

    authButton: {
        minHeight: MinTouchTarget,
        paddingHorizontal: Spacing.three,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Brand.navy,
        borderRadius: Spacing.two,
    },
    authButtonText: { fontSize: 14, fontWeight: '600', color: Brand.navy },
    pressed: { backgroundColor: Brand.indigoLight },

    checkout: {
        minHeight: MinTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Spacing.two,
        backgroundColor: Brand.navy,
        marginBottom: Spacing.four,
    },
    checkoutPressed: { backgroundColor: Brand.indigo },
    checkoutText: { fontSize: 15, fontWeight: '700', color: Brand.onNavy },

    sectionTitle: { fontSize: 17, fontWeight: '700', color: Brand.text, marginBottom: Spacing.three },
});
