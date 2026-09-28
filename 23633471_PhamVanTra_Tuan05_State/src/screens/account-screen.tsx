import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import StoreHeader from '@/components/layout/store-header';
import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation/types';
import { useAuth } from '@/store/adapters/use-auth';
import { useCart } from '@/store/adapters/use-cart';
import { useWishlist } from '@/store/adapters/use-wishlist';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

/**
 * Bài 4 — tab Tài khoản hiển thị khác nhau tuỳ isLoggedIn.
 *
 * Hai nhánh tách hẳn ở đầu hàm thay vì rải các dấu ba ngôi khắp JSX. Hai
 * trạng thái này gần như không chung gì ngoài header, nên gộp lại chỉ làm
 * cả hai khó đọc.
 */
export default function AccountScreen() {
    const navigation = useNavigation<Navigation>();
    const { user, token, isLoggedIn, signIn, signOut } = useAuth();
    const cart = useCart();
    const wishlist = useWishlist();

    if (!isLoggedIn) {
        return (
            <View style={styles.screen}>
                <StoreHeader title="Tài khoản" cartCount={cart.totalCount} />

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.guestCard}>
                        <View style={styles.guestIcon}>
                            <Ionicons name="person-outline" size={32} color={Brand.indigo} />
                        </View>

                        <Text style={styles.guestTitle}>Bạn chưa đăng nhập</Text>
                        <Text style={styles.guestText}>
                            Đăng nhập để xem đơn hàng, đồng bộ giỏ hàng và danh sách yêu thích
                            giữa các thiết bị.
                        </Text>

                        <Pressable
                            onPress={signIn}
                            accessibilityRole="button"
                            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
                        >
                            <Text style={styles.primaryButtonText}>Đăng nhập</Text>
                        </Pressable>
                    </View>

                    <View style={styles.note}>
                        <Text style={styles.noteTitle}>Ghi chú của tuần này</Text>
                        <Text style={styles.noteText}>
                            Nút đăng nhập hiện dùng dữ liệu giả để kiểm chứng store auth. Tuần 7
                            sẽ thay bằng lời gọi API thật, và chỉ hàm signIn trong adapter phải
                            sửa — màn hình này giữ nguyên.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <StoreHeader title="Tài khoản" cartCount={cart.totalCount} />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.profile}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user?.name.split(' ').slice(-2).map((part) => part[0]).join('')}
                        </Text>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.email}>{user?.email}</Text>
                        <Text style={styles.studentId}>Mã số sinh viên: {user?.studentId}</Text>
                    </View>
                </View>

                <View style={styles.stats}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{cart.totalCount}</Text>
                        <Text style={styles.statLabel}>Trong giỏ</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={styles.statDivider} />
                        <Text style={styles.statValue}>{wishlist.count}</Text>
                        <Text style={styles.statLabel}>Yêu thích</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={styles.statDivider} />
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Đơn hàng</Text>
                    </View>
                </View>

                <View style={styles.block}>
                    <Text style={styles.blockTitle}>Sách yêu thích</Text>

                    {wishlist.items.length === 0 ? (
                        <Text style={styles.emptyText}>
                            Chưa có cuốn nào. Mở chi tiết một cuốn sách và chạm biểu tượng trái tim.
                        </Text>
                    ) : (
                        wishlist.items.map((book) => (
                            <Pressable
                                key={book.id}
                                onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
                                accessibilityRole="button"
                                style={({ pressed }) => [styles.wishRow, pressed && styles.wishPressed]}
                            >
                                <Ionicons name="heart" size={18} color={Brand.sale} />

                                <View style={styles.wishInfo}>
                                    <Text style={styles.wishTitle} numberOfLines={1}>
                                        {book.title}
                                    </Text>
                                    <Text style={styles.wishAuthor} numberOfLines={1}>
                                        {book.author}
                                    </Text>
                                </View>

                                <Pressable
                                    onPress={() => wishlist.removeBook(book.id)}
                                    accessibilityRole="button"
                                    accessibilityLabel={`Bỏ ${book.title} khỏi yêu thích`}
                                    hitSlop={8}
                                >
                                    <Ionicons name="close" size={18} color={Brand.textMuted} />
                                </Pressable>
                            </Pressable>
                        ))
                    )}
                </View>

                <View style={styles.block}>
                    <Text style={styles.blockTitle}>Phiên đăng nhập</Text>
                    <Text style={styles.tokenLabel}>Token đang lưu trong store:</Text>
                    <Text style={styles.tokenValue}>{token}</Text>
                </View>

                <Pressable
                    onPress={signOut}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.signOutButton, pressed && styles.pressed]}
                >
                    <Text style={styles.signOutText}>Đăng xuất</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },
    content: { padding: Spacing.three, gap: Spacing.three },

    guestCard: {
        marginTop: Spacing.four,
        padding: Spacing.four,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        alignItems: 'center',
        gap: Spacing.two,
    },
    guestIcon: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Brand.indigoLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.two,
    },
    guestTitle: { fontSize: 18, fontWeight: '700', color: Brand.text },
    guestText: { fontSize: 14, lineHeight: 20, color: Brand.textMuted, textAlign: 'center' },

    primaryButton: {
        alignSelf: 'stretch',
        marginTop: Spacing.three,
        minHeight: MinTouchTarget,
        borderRadius: Spacing.two,
        backgroundColor: Brand.indigo,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: { fontSize: 16, fontWeight: '700', color: Brand.onNavy },
    pressed: { opacity: 0.85 },

    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Brand.indigoLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: { fontSize: 20, fontWeight: '700', color: Brand.indigo },
    profileInfo: { flex: 1, gap: Spacing.half },
    name: { fontSize: 17, fontWeight: '700', color: Brand.text },
    email: { fontSize: 13, color: Brand.textMuted },
    studentId: { fontSize: 13, color: Brand.textMuted },

    stats: {
        flexDirection: 'row',
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        paddingVertical: Spacing.three,
    },
    statItem: { flex: 1, alignItems: 'center', gap: Spacing.half, position: 'relative' },
    statDivider: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: StyleSheet.hairlineWidth,
        backgroundColor: Brand.border,
    },
    statValue: { fontSize: 20, fontWeight: '700', color: Brand.text },
    statLabel: { fontSize: 12, color: Brand.textMuted },

    note: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.indigoBorder,
        backgroundColor: Brand.indigoLight,
        gap: Spacing.one,
    },
    noteTitle: { fontSize: 14, fontWeight: '700', color: Brand.indigo },
    noteText: { fontSize: 13, lineHeight: 19, color: Brand.indigo },

    block: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        gap: Spacing.two,
    },
    blockTitle: { fontSize: 15, fontWeight: '700', color: Brand.text },
    emptyText: { fontSize: 13, lineHeight: 19, color: Brand.textMuted },

    wishRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        paddingVertical: Spacing.two,
    },
    wishPressed: { opacity: 0.6 },
    wishInfo: { flex: 1, gap: Spacing.half },
    wishTitle: { fontSize: 14, fontWeight: '600', color: Brand.text },
    wishAuthor: { fontSize: 12, color: Brand.textMuted },

    tokenLabel: { fontSize: 13, color: Brand.textMuted },
    tokenValue: { fontSize: 13, color: Brand.indigo, fontFamily: 'monospace' },

    signOutButton: {
        minHeight: MinTouchTarget,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.sale,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutText: { fontSize: 16, fontWeight: '700', color: Brand.sale },
});
