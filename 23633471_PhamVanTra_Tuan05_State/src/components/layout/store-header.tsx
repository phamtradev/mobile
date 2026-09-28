import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';

interface StoreHeaderProps {
    title?: string;
    /** Số sản phẩm trong giỏ, hiện thành chấm nhỏ trên icon giỏ hàng. */
    cartCount?: number;
}

/**
 * Giờ 1 — Bài tập 1: Header ứng dụng BookStore.
 *
 * Trục chính là trục ngang nên justifyContent đẩy logo sang trái và cụm icon
 * sang phải. Trục chéo là trục dọc nên alignItems center căn giữa theo chiều cao.
 * Không dùng marginTop hay paddingTop để căn giữa theo chiều dọc.
 */
export default function StoreHeader({ title = 'BookStore', cartCount = 0 }: StoreHeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>{title}</Text>

            {/* Hai icon nằm trong một View con dùng row + gap, nên khoảng cách
                giữa chúng không phụ thuộc vào marginLeft của từng icon. */}
            <View style={styles.actions}>
                <Pressable style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Tìm kiếm">
                    <Ionicons name="search" size={22} color={Brand.onNavy} />
                </Pressable>

                <Pressable style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Giỏ hàng">
                    <Ionicons name="cart-outline" size={22} color={Brand.onNavy} />

                    {cartCount > 0 ? (
                        <View style={styles.cartDot}>
                            <Text style={styles.cartDotText}>{cartCount}</Text>
                        </View>
                    ) : null}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 56,
        paddingHorizontal: Spacing.three,
        backgroundColor: Brand.navy,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    logo: {
        fontSize: 20,
        fontWeight: '700',
        color: Brand.onNavy,
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
    },

    iconButton: {
        width: MinTouchTarget,
        height: MinTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',
        // relative để chấm số lượng định vị theo chính nút này
        position: 'relative',
    },

    cartDot: {
        position: 'absolute',
        top: 6,
        right: 4,
        minWidth: 18,
        height: 18,
        paddingHorizontal: 4,
        borderRadius: 9,
        backgroundColor: Brand.sale,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cartDotText: {
        fontSize: 11,
        fontWeight: '700',
        color: Brand.onNavy,
    },
});
