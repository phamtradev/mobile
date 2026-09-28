import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

interface FloatingCartButtonProps {
    count: number;
    onPress?: () => void;
    /** Đẩy nút lên khi màn hình có thanh tab bar cố định phía dưới. */
    bottomOffset?: number;
}

const SIZE = 56;

/**
 * Giờ 3 — Bài tập 2: nút giỏ hàng nổi ở góc dưới phải.
 *
 * Bài này có hai tầng containing block lồng nhau:
 *
 * Nút tròn dùng position absolute nên định vị theo View cha ngoài cùng của
 * màn hình. Vì vậy nút phải là con trực tiếp của View đó, đặt ngang hàng với
 * ScrollView chứ không nằm trong ScrollView — nếu nằm trong, nút sẽ cuộn theo
 * nội dung và không còn nổi nữa.
 *
 * Chấm số lượng cũng dùng absolute nhưng định vị theo chính nút tròn, vì nút
 * tròn đã có position relative. Cùng một thuộc tính absolute nhưng mốc tính
 * khác nhau, do containing block khác nhau.
 */
export default function FloatingCartButton({
    count,
    onPress,
    bottomOffset = 24,
}: FloatingCartButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`Giỏ hàng, ${count} sản phẩm`}
            style={({ pressed }) => [
                styles.button,
                { bottom: bottomOffset },
                pressed && styles.pressed,
            ]}
        >
            <Ionicons name="cart" size={26} color={Brand.onNavy} />

            {count > 0 ? (
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{count > 99 ? '99+' : count}</Text>
                </View>
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        right: 20,
        width: SIZE,
        height: SIZE,
        // Chia đôi cạnh để ra hình tròn. Đổi SIZE là bán kính đổi theo,
        // không phải sửa hai chỗ.
        borderRadius: SIZE / 2,
        backgroundColor: Brand.indigo,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    pressed: { backgroundColor: Brand.navy },

    countBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        minWidth: 22,
        height: 22,
        paddingHorizontal: Spacing.one,
        borderRadius: 11,
        backgroundColor: Brand.sale,
        borderWidth: 2,
        borderColor: Brand.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },

    countText: { fontSize: 11, fontWeight: '700', color: Brand.onNavy },
});
