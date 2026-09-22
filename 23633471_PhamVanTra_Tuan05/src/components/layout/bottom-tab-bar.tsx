import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

export type TabKey = 'home' | 'category' | 'cart' | 'account';

interface TabDefinition {
    key: TabKey;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconActive: keyof typeof Ionicons.glyphMap;
}

export const TABS: TabDefinition[] = [
    { key: 'home', label: 'Trang chủ', icon: 'home-outline', iconActive: 'home' },
    { key: 'category', label: 'Danh mục', icon: 'grid-outline', iconActive: 'grid' },
    { key: 'cart', label: 'Giỏ hàng', icon: 'cart-outline', iconActive: 'cart' },
    { key: 'account', label: 'Tài khoản', icon: 'person-outline', iconActive: 'person' },
];

export const TAB_BAR_HEIGHT = 64;

interface BottomTabBarProps {
    active: TabKey;
    onChange?: (key: TabKey) => void;
    /** Số sản phẩm hiện trên tab Giỏ hàng. */
    cartCount?: number;
    /**
     * true thì thanh tab dùng position absolute dán đáy màn hình.
     * false thì thanh nằm trong luồng layout, là con cuối của View flex 1.
     */
    floating?: boolean;
}

/**
 * Giờ 5 — Bài tập 1: thanh tab dưới cùng, chỉ dựng layout tĩnh.
 *
 * Mỗi mục đặt flex 1 nên bốn mục chia đều bề rộng bất kể nhãn dài ngắn khác
 * nhau. Nếu để bề rộng tự co theo chữ thì "Trang chủ" sẽ rộng hơn "Giỏ hàng"
 * và thanh tab trông lệch.
 *
 * Bên trong mỗi mục lại là một trục dọc: icon trên, chữ dưới, canh giữa
 * theo cả hai trục. Đây là ví dụ điển hình của flex container lồng nhau —
 * cha xếp ngang, con xếp dọc.
 *
 * Hai cách đặt thanh tab, chọn theo tình huống:
 *
 * floating false đặt thanh trong luồng layout, là cách nên dùng mặc định.
 * Nội dung phía trên dùng flex 1 nên tự động dừng ngay trên thanh tab, không
 * cần tính toán gì thêm.
 *
 * floating true dán thanh bằng absolute, dùng khi cần nội dung chạy phía dưới
 * thanh tab, ví dụ thanh trong suốt hoặc có hiệu ứng mờ. Đổi lại, phần nội
 * dung phải tự chừa paddingBottom bằng chiều cao thanh, nếu không phần tử
 * cuối danh sách sẽ bị che.
 */
export default function BottomTabBar({
    active,
    onChange,
    cartCount = 0,
    floating = false,
}: BottomTabBarProps) {
    return (
        <View style={[styles.bar, floating && styles.floating]}>
            {TABS.map((tab) => {
                const isActive = tab.key === active;
                const color = isActive ? Brand.indigo : Brand.textMuted;

                return (
                    <Pressable
                        key={tab.key}
                        onPress={() => onChange?.(tab.key)}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: isActive }}
                        accessibilityLabel={tab.label}
                        style={styles.item}
                    >
                        <View style={styles.iconWrap}>
                            <Ionicons
                                name={isActive ? tab.iconActive : tab.icon}
                                size={22}
                                color={color}
                            />

                            {tab.key === 'cart' && cartCount > 0 ? (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{cartCount}</Text>
                                </View>
                            ) : null}
                        </View>

                        <Text style={[styles.label, { color }]} numberOfLines={1}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        height: TAB_BAR_HEIGHT,
        flexDirection: 'row',
        backgroundColor: Brand.surface,
        borderTopWidth: 1,
        borderTopColor: Brand.border,
    },

    floating: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },

    item: {
        // Bốn mục chia đều bề rộng.
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.half,
    },

    iconWrap: { position: 'relative' },

    badge: {
        position: 'absolute',
        top: -4,
        right: -10,
        minWidth: 16,
        height: 16,
        paddingHorizontal: 3,
        borderRadius: 8,
        backgroundColor: Brand.sale,
        alignItems: 'center',
        justifyContent: 'center',
    },

    badgeText: { fontSize: 10, fontWeight: '700', color: Brand.onNavy },

    label: { fontSize: 11 },
});
