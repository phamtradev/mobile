import { Pressable, StyleSheet, Text, View } from 'react-native';

import BookCover from '@/components/book/book-cover';
import { formatPrice } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';

interface BookCardRowProps {
    book: Book;
    onPress?: () => void;
    showBadge?: boolean;
}

/**
 * Giờ 1 — Bài tập 2: thẻ sách dạng hàng ngang.
 *
 * Ba quyết định layout của bài này:
 *
 * 1. Thẻ ngoài dùng flexDirection row với alignItems flex-start. Dùng center
 *    thì khi tên sách xuống hai dòng, ảnh bìa bị đẩy xuống lệch khỏi mép trên
 *    của chữ. flex-start giữ hai cột thẳng đầu.
 *
 * 2. Cột thông tin dùng flex 1 để chiếm hết phần còn lại sau ảnh bìa. Không
 *    đặt width cố định vì bề rộng màn hình thay đổi.
 *
 * 3. Giá nằm đáy cột nhờ justifyContent space-between trên trục dọc của cột,
 *    không nhờ marginTop. Cách này tự đúng dù tên sách một hay hai dòng.
 */
export default function BookCardRow({ book, onPress, showBadge = true }: BookCardRowProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={onPress === undefined}
            accessibilityRole={onPress ? 'button' : undefined}
            style={({ pressed }) => [styles.card, pressed && onPress ? styles.pressed : null]}
        >
            <BookCover book={book} style={styles.cover} showBadge={showBadge} />

            <View style={styles.info}>
                <View style={styles.infoTop}>
                    {/* numberOfLines không phải thuộc tính flexbox, nhưng thiếu nó
                        thì một tên sách quá dài sẽ kéo cao cả hàng và phá nhịp
                        của danh sách. */}
                    <Text style={styles.title} numberOfLines={2}>
                        {book.title}
                    </Text>
                    <Text style={styles.author} numberOfLines={1}>
                        {book.author}
                    </Text>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>{formatPrice(book.price)}</Text>

                    {book.originalPrice ? (
                        <Text style={styles.originalPrice}>{formatPrice(book.originalPrice)}</Text>
                    ) : null}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Spacing.three,
        padding: Spacing.three,
        backgroundColor: Brand.surface,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
    },

    pressed: { backgroundColor: Brand.indigoLight },

    cover: {
        width: 80,
        height: 110,
    },

    info: {
        flex: 1,
        // Chiều cao khớp ảnh bìa để space-between có chỗ mà dàn.
        minHeight: 110,
        justifyContent: 'space-between',
    },

    infoTop: { gap: Spacing.one },

    title: { fontSize: 16, fontWeight: '600', color: Brand.text, lineHeight: 22 },
    author: { fontSize: 13, color: Brand.textMuted },

    priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.two },
    price: { fontSize: 16, fontWeight: '700', color: Brand.price },
    originalPrice: {
        fontSize: 13,
        color: Brand.textMuted,
        textDecorationLine: 'line-through',
    },
});
