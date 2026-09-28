import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import BookCover from '@/components/book/book-cover';
import { Brand, Spacing } from '@/constants/theme';
import { formatPrice } from '@/data/books';
import type { CartItem } from '@/types/book';

interface CartRowProps {
    item: CartItem;
    /** Bỏ trống thì dòng chỉ để xem, không có nút sửa số lượng. */
    onChangeQuantity?: (quantity: number) => void;
    onRemove?: () => void;
}

/**
 * Một dòng sản phẩm trong giỏ hàng.
 *
 * Ba vùng chia theo nguyên tắc: phần nào có kích thước biết trước thì đặt
 * cố định, phần nào cần co giãn thì để flex 1. Ảnh bìa cố định, cột tên dùng
 * flex 1, cột số lượng và giá cố định để các dòng thẳng cột với nhau.
 *
 * Component không biết gì về store. Nó nhận CartItem và hai hàm gọi lại, nên
 * dùng được cả khi dữ liệu đến từ Redux lẫn khi là dữ liệu tĩnh.
 */
export default function CartRow({ item, onChangeQuantity, onRemove }: CartRowProps) {
    const lineTotal = item.book.price * item.quantity;
    const editable = onChangeQuantity !== undefined;

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

                {onRemove ? (
                    <Pressable
                        onPress={onRemove}
                        accessibilityRole="button"
                        accessibilityLabel={`Xoá ${item.book.title} khỏi giỏ hàng`}
                        style={styles.removeButton}
                    >
                        <Ionicons name="trash-outline" size={14} color={Brand.sale} />
                        <Text style={styles.removeText}>Xoá</Text>
                    </Pressable>
                ) : null}
            </View>

            <View style={styles.trailing}>
                {editable ? (
                    <View style={styles.stepper}>
                        <Pressable
                            onPress={() => onChangeQuantity(item.quantity - 1)}
                            accessibilityRole="button"
                            accessibilityLabel="Giảm số lượng"
                            style={styles.stepButton}
                        >
                            <Ionicons name="remove" size={16} color={Brand.indigo} />
                        </Pressable>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <Pressable
                            onPress={() => onChangeQuantity(item.quantity + 1)}
                            accessibilityRole="button"
                            accessibilityLabel="Tăng số lượng"
                            style={styles.stepButton}
                        >
                            <Ionicons name="add" size={16} color={Brand.indigo} />
                        </Pressable>
                    </View>
                ) : (
                    <View style={styles.quantity}>
                        <Text style={styles.quantityText}>x{item.quantity}</Text>
                    </View>
                )}

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

    removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.one,
        marginTop: Spacing.one,
    },
    removeText: { fontSize: 12, color: Brand.sale },

    trailing: { width: 108, alignItems: 'flex-end', gap: Spacing.two },

    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Brand.indigoBorder,
        borderRadius: Spacing.one,
        backgroundColor: Brand.indigoLight,
    },
    stepButton: { width: 30, height: 28, alignItems: 'center', justifyContent: 'center' },

    quantity: {
        paddingHorizontal: Spacing.two,
        paddingVertical: Spacing.half,
        borderRadius: Spacing.one,
        backgroundColor: Brand.indigoLight,
    },
    quantityText: {
        minWidth: 22,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '600',
        color: Brand.indigo,
    },

    lineTotal: { fontSize: 15, fontWeight: '700', color: Brand.price },
});
