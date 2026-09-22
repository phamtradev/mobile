import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import StoreHeader from '@/components/layout/store-header';
import { cartCount, cartItems } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';

interface MenuEntry {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    hint: string;
}

const MENU: MenuEntry[] = [
    { icon: 'receipt-outline', label: 'Đơn hàng của tôi', hint: '3 đơn đang giao' },
    { icon: 'heart-outline', label: 'Sách yêu thích', hint: '12 đầu sách' },
    { icon: 'location-outline', label: 'Sổ địa chỉ', hint: '2 địa chỉ đã lưu' },
    { icon: 'card-outline', label: 'Phương thức thanh toán', hint: 'Thẻ và ví điện tử' },
    { icon: 'settings-outline', label: 'Cài đặt', hint: 'Thông báo, ngôn ngữ' },
];

const STATS = [
    { label: 'Đơn hàng', value: '18' },
    { label: 'Đánh giá', value: '7' },
    { label: 'Điểm thưởng', value: '240' },
];

/**
 * Màn hình Tài khoản.
 *
 * Hàng thống kê là ví dụ gọn nhất của flex 1 chia đều: ba ô cùng flex 1 nên
 * rộng bằng nhau bất kể con số bên trong dài ngắn khác nhau.
 */
export default function AccountScreen({ extraBottomSpace = 0 }: { extraBottomSpace?: number }) {
    return (
        <View style={styles.screen}>
            <StoreHeader title="Tài khoản" cartCount={cartCount(cartItems)} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: Spacing.four + extraBottomSpace },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.profile}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>PT</Text>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>Phạm Văn Trà</Text>
                        <Text style={styles.email}>23633471@sv.truong.edu.vn</Text>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color={Brand.textMuted} />
                </View>

                <View style={styles.stats}>
                    {STATS.map((stat, index) => (
                        <View key={stat.label} style={styles.statItem}>
                            {index > 0 ? <View style={styles.statDivider} /> : null}
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.menu}>
                    {MENU.map((entry, index) => (
                        <View key={entry.label}>
                            {index > 0 ? <View style={styles.separator} /> : null}

                            <View style={styles.menuRow}>
                                <View style={styles.menuIcon}>
                                    <Ionicons name={entry.icon} size={20} color={Brand.indigo} />
                                </View>

                                <View style={styles.menuText}>
                                    <Text style={styles.menuLabel}>{entry.label}</Text>
                                    <Text style={styles.menuHint}>{entry.hint}</Text>
                                </View>

                                <Ionicons name="chevron-forward" size={18} color={Brand.textMuted} />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },
    scroll: { flex: 1 },
    content: { padding: Spacing.three, gap: Spacing.three },

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

    stats: {
        flexDirection: 'row',
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        paddingVertical: Spacing.three,
    },
    statItem: {
        // Ba ô chia đều bề rộng bất kể con số dài ngắn.
        flex: 1,
        alignItems: 'center',
        gap: Spacing.half,
        position: 'relative',
    },
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

    menu: {
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        overflow: 'hidden',
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        padding: Spacing.three,
    },
    menuIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Brand.indigoLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: { flex: 1, gap: Spacing.half },
    menuLabel: { fontSize: 15, fontWeight: '600', color: Brand.text },
    menuHint: { fontSize: 12, color: Brand.textMuted },

    separator: {
        height: StyleSheet.hairlineWidth,
        marginLeft: Spacing.three,
        backgroundColor: Brand.border,
    },
});
