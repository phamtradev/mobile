import { StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';

/**
 * Giờ 3 — Bài tập 1: nhãn giảm giá hoặc nhãn Mới.
 *
 * Badge khai báo position absolute cùng top và left, nên nó được nhấc ra khỏi
 * luồng layout và không đẩy ảnh bìa đi đâu cả.
 *
 * Khác biệt cần nhớ so với web: trong React Native, position mặc định đã là
 * 'relative', không phải 'static'. Vì vậy mọi View đều sẵn sàng làm containing
 * block, và viết position 'relative' ở View cha chỉ để ghi rõ ý định chứ không
 * bật thêm gì.
 *
 * Hệ quả là lỗi thường gặp không phải quên relative, mà là đặt badge nhầm View
 * cha. Badge tính mốc theo cha trực tiếp của nó, nên bỏ badge vào View bọc cả
 * thẻ sách thì nó dính góc thẻ, không phải góc ảnh bìa.
 */
export default function DiscountBadge({ book }: { book: Book }) {
    if (book.isNew) {
        return (
            <View style={[styles.badge, styles.newBadge]}>
                <Text style={styles.text}>Mới</Text>
            </View>
        );
    }

    if (book.discountPercent === undefined) return null;

    return (
        <View style={[styles.badge, styles.saleBadge]}>
            <Text style={styles.text}>-{book.discountPercent}%</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: 6,
        left: 6,
        paddingHorizontal: Spacing.two,
        paddingVertical: Spacing.half,
        borderRadius: Spacing.one,
    },

    saleBadge: { backgroundColor: Brand.sale },
    newBadge: { backgroundColor: Brand.fresh },

    text: {
        fontSize: 12,
        fontWeight: '700',
        color: Brand.onNavy,
    },
});
