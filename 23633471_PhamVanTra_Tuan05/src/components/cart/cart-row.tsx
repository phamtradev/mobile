import { StyleSheet, Text, View } from 'react-native';

import BookCover from '@/components/book/book-cover';
import { formatPrice } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';
import type { CartItem } from '@/types/book';

/**
 * Một dòng sản phẩm trong giỏ hàng.
 *
 * Ba vùng chia theo nguyên tắc: phần nào có kích thước biết trước thì đặt
 * cố định, phần nào cần co giãn thì để flex 1.
 *
 * Ảnh bìa cố định 52x70 vì tỉ lệ ảnh không đổi.
 * Cột tên và tác giả dùng flex 1 để nuốt hết chỗ thừa.
 * Cột số lượng và giá cố định 92 để các dòng thẳng cột với nhau, dù tên sách
 * dài ngắn khác nhau. Nếu cột này cũng để tự co, mỗi dòng sẽ có giá nằm ở một
 * vị trí khác nhau và mắt không lướt theo cột được.
 */
export default function CartRow({ item }: { item: CartItem }) {
    const lineTotal = item.book.price * item.quantity;

    return (
        <View style={styles.row}>
            <BookCover book={item.book} style={styles.cover} showBadge={false} />

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.book.title}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                    {item.book.author}
                </Text>
                <Text style={styles.unitPrice}>{formatPrice(item.book.price)}</Text>
            </View>

            <View style={styles.trailing}>
                <View style={styles.quantity}>
                    <Text style={styles.quantityText}>x{item.quantity}</Text>
                </View>

                <Text style={styles.lineTotal}>{formatPrice(lineTotal)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.three,
        paddingVertical: Spacing.three,
        paddingHorizontal: Spacing.three,
        backgroundColor: Brand.surface,
    },

    cover: { width: 52, height: 70 },

    info: { flex: 1, gap: Spacing.half },
    title: { fontSize: 15, fontWeight: '600', color: Brand.text, lineHeight: 20 },
    author: { fontSize: 12, color: Brand.textMuted },
    unitPrice: { fontSize: 13, color: Brand.textMuted },

    trailing: {
        width: 92,
        alignItems: 'flex-end',
        gap: Spacing.two,
    },

    quantity: {
        paddingHorizontal: Spacing.two,
        paddingVertical: Spacing.half,
        borderRadius: Spacing.one,
        backgroundColor: Brand.indigoLight,
    },
    quantityText: { fontSize: 13, fontWeight: '600', color: Brand.indigo },

    lineTotal: { fontSize: 15, fontWeight: '700', color: Brand.price },
});
