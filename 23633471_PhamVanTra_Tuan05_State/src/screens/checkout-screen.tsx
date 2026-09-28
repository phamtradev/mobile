import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';
import { formatPrice } from '@/data/books';
import type { RootStackParamList } from '@/navigation/types';

type CheckoutRoute = RouteProp<RootStackParamList, 'Checkout'>;

/**
 * Bài 2 — màn hình Thanh toán, khung tối giản.
 *
 * Đề chỉ yêu cầu hiển thị tổng tiền nhận qua route.params, phần còn lại
 * để tuần 9 hoàn thiện. Màn hình này cố ý không đọc store: nó nhận số tiền
 * đã chốt tại thời điểm bấm Thanh toán, nên nếu người dùng quay lại và sửa
 * giỏ hàng thì con số ở đây không tự đổi theo.
 */
export default function CheckoutScreen() {
    const { params } = useRoute<CheckoutRoute>();

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
                    <Text style={styles.amount}>{formatPrice(params.total)}</Text>
                    <Text style={styles.meta}>Cho {params.itemCount} sản phẩm</Text>
                </View>

                <View style={styles.paramsBox}>
                    <Text style={styles.paramsTitle}>Tham số nhận qua route.params</Text>
                    <Text style={styles.paramsLine}>total: {params.total}</Text>
                    <Text style={styles.paramsLine}>itemCount: {params.itemCount}</Text>
                </View>

                <View style={styles.note}>
                    <Text style={styles.noteTitle}>Phần còn lại của màn hình</Text>
                    <Text style={styles.noteText}>
                        Địa chỉ giao hàng, phương thức thanh toán và bước xác nhận đơn sẽ được
                        hoàn thiện ở tuần 9, sau khi có API đặt hàng.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },
    content: { padding: Spacing.three, gap: Spacing.three },

    card: {
        padding: Spacing.four,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        gap: Spacing.one,
    },
    label: { fontSize: 14, color: Brand.textMuted },
    amount: { fontSize: 32, fontWeight: '700', color: Brand.price },
    meta: { fontSize: 14, color: Brand.textMuted },

    paramsBox: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.indigoBorder,
        backgroundColor: Brand.indigoLight,
        gap: Spacing.half,
    },
    paramsTitle: { fontSize: 14, fontWeight: '700', color: Brand.indigo },
    paramsLine: { fontSize: 13, color: Brand.indigo, fontFamily: 'monospace' },

    note: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        gap: Spacing.one,
    },
    noteTitle: { fontSize: 14, fontWeight: '700', color: Brand.text },
    noteText: { fontSize: 13, lineHeight: 19, color: Brand.textMuted },
});
