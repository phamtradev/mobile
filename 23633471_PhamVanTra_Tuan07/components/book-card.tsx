import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import RatingStars from '@/components/rating-stars';
import { Brand, Spacing } from '@/constants/theme';
import { formatPrice } from '@/data/books';
import type { Book } from '@/types';

export function averageRating(book: Book) {
    if (!book.reviews.length) return 0;
    return book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length;
}

export default function BookCard({ book }: { book: Book }) {
    const average = averageRating(book);

    return (
        <Pressable
            onPress={() => router.push({ pathname: '/books/[id]', params: { id: book.id } })}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={`Xem chi tiết ${book.title}`}>
            <View style={styles.cover}>
                <Text style={styles.coverText} numberOfLines={3}>
                    {book.title}
                </Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.category}>{book.category}</Text>
                <Text style={styles.title} numberOfLines={2}>
                    {book.title}
                </Text>
                <Text style={styles.author}>{book.author}</Text>

                <View style={styles.ratingRow}>
                    <RatingStars value={average} size={14} />
                    <Text style={styles.ratingText}>
                        {average.toFixed(1)} ({book.reviews.length})
                    </Text>
                </View>

                <Text style={styles.price}>{formatPrice(book.price)}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: Spacing.three,
        padding: Spacing.three,
        marginBottom: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.three,
        backgroundColor: Brand.surface,
    },
    pressed: { backgroundColor: Brand.indigoLight },
    cover: {
        width: 64,
        height: 86,
        borderRadius: Spacing.two,
        backgroundColor: Brand.navy,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.one,
    },
    coverText: { fontSize: 10, fontWeight: '700', color: Brand.onNavy, textAlign: 'center' },
    info: { flex: 1, gap: 2 },
    category: { fontSize: 12, color: Brand.indigo, fontWeight: '600' },
    title: { fontSize: 16, fontWeight: '700', color: Brand.text },
    author: { fontSize: 13, color: Brand.textMuted },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginTop: Spacing.one },
    ratingText: { fontSize: 12, color: Brand.textMuted },
    price: { fontSize: 15, fontWeight: '700', color: Brand.navy, marginTop: Spacing.one },
});
