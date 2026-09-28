import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatPrice } from '@/data/books';
import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';

interface CartSummaryProps {
    total: number;
    itemCount: number;
    onCheckout?: () => void;
}

/**
 * Thanh tổng tiền cố định đáy màn hình giỏ hàng.
 *
 * Thanh này nằm ngoài ScrollView. Nhờ vậy nó luôn hiện, và người dùng không
 * phải cuộn hết danh sách mới thấy được nút thanh toán.
 */
export default function CartSummary({ total, itemCount, onCheckout }: CartSummaryProps) {
    return (
        <View style={styles.bar}>
            <View style={styles.totals}>
                <Text style={styles.label}>Tạm tính · {itemCount} sản phẩm</Text>
                <Text style={styles.amount}>{formatPrice(total)}</Text>
            </View>

            <Pressable
                onPress={onCheckout}
                accessibilityRole="button"
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            >
                <Text style={styles.buttonText}>Thanh toán</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: Spacing.three,
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Brand.surface,
        borderTopWidth: 1,
        borderTopColor: Brand.border,
    },

    // flex 1 để phần chữ nuốt chỗ thừa, nút giữ bề rộng theo nội dung.
    totals: { flex: 1, gap: Spacing.half },
    label: { fontSize: 13, color: Brand.textMuted },
    amount: { fontSize: 20, fontWeight: '700', color: Brand.price },

    button: {
        minHeight: MinTouchTarget,
        paddingHorizontal: Spacing.four,
        borderRadius: Spacing.two,
        backgroundColor: Brand.indigo,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPressed: { backgroundColor: Brand.navy },
    buttonText: { fontSize: 16, fontWeight: '700', color: Brand.onNavy },
});
