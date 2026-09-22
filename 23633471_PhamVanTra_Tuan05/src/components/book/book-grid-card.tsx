import { Pressable, StyleSheet, Text, View } from 'react-native';

import BookCover from '@/components/book/book-cover';
import { formatPrice } from '@/data/books';
import { Brand, CoverRatio, Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';

interface BookGridCardProps {
    book: Book;
    onPress?: () => void;
    showBadge?: boolean;
    /** Ẩn tác giả khi ô lưới quá hẹp, ví dụ lưới 3 cột. */
    compact?: boolean;
}

/** Ô sách trong lưới: ảnh bìa phía trên, tên và giá phía dưới. */
export default function BookGridCard({
    book,
    onPress,
    showBadge = true,
    compact = false,
}: BookGridCardProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={onPress === undefined}
            accessibilityRole={onPress ? 'button' : undefined}
            style={({ pressed }) => [styles.card, pressed && onPress ? styles.pressed : null]}
        >
            {/*
              Ảnh rộng 100% theo ô lưới, chiều cao suy ra từ aspectRatio.
              Đặt height cố định sẽ làm ảnh méo khi ô lưới đổi bề rộng theo
              số cột hoặc theo kích thước màn hình.
            */}
            <BookCover book={book} style={styles.cover} showBadge={showBadge} />

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {book.title}
                </Text>

                {compact ? null : (
                    <Text style={styles.author} numberOfLines={1}>
                        {book.author}
                    </Text>
                )}

                <Text style={styles.price}>{formatPrice(book.price)}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Brand.surface,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        overflow: 'hidden',
    },

    pressed: { backgroundColor: Brand.indigoLight },

    cover: {
        width: '100%',
        aspectRatio: CoverRatio,
        borderRadius: 0,
    },

    info: {
        padding: Spacing.two,
        gap: Spacing.half,
    },

    title: { fontSize: 14, fontWeight: '600', color: Brand.text, lineHeight: 19 },
    author: { fontSize: 12, color: Brand.textMuted },
    price: { fontSize: 14, fontWeight: '700', color: Brand.price, marginTop: Spacing.half },
});
