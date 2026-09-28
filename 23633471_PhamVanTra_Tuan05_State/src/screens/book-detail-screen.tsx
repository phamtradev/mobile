import { Ionicons } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import BookCover from '@/components/book/book-cover';
import { Brand, CoverRatio, MinTouchTarget, Spacing } from '@/constants/theme';
import { books, formatPrice } from '@/data/books';
import type { RootStackParamList } from '@/navigation/types';
import { useCart } from '@/store/adapters/use-cart';
import { useWishlist } from '@/store/adapters/use-wishlist';

type DetailRoute = RouteProp<RootStackParamList, 'BookDetail'>;

/**
 * Bài 1 — màn hình đích của luồng Home sang Chi tiết sách.
 *
 * bookId đến qua route.params, màn hình tự tra dữ liệu. Nếu id không khớp
 * cuốn nào thì hiện thông báo thay vì để màn hình trắng — params có thể sai
 * khi đến từ deep link hoặc từ dữ liệu cũ.
 */
export default function BookDetailScreen() {
    const { params } = useRoute<DetailRoute>();
    const cart = useCart();
    const wishlist = useWishlist();

    const book = books.find((candidate) => candidate.id === params.bookId);

    if (!book) {
        return (
            <View style={styles.missing}>
                <Text style={styles.missingTitle}>Không tìm thấy cuốn sách này</Text>
                <Text style={styles.missingText}>Mã sách nhận được: {params.bookId}</Text>
            </View>
        );
    }

    const inCart = cart.quantityOf(book.id);
    const saved = wishlist.isSaved(book.id);

    return (
        <View style={styles.screen}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <BookCover book={book} style={styles.cover} />

                <View style={styles.headline}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{book.title}</Text>

                        <Pressable
                            onPress={() => wishlist.toggleBook(book.id)}
                            accessibilityRole="button"
                            accessibilityLabel={saved ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
                            accessibilityState={{ selected: saved }}
                            style={styles.heart}
                        >
                            <Ionicons
                                name={saved ? 'heart' : 'heart-outline'}
                                size={24}
                                color={saved ? Brand.sale : Brand.textMuted}
                            />
                        </Pressable>
                    </View>

                    <Text style={styles.author}>{book.author}</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{formatPrice(book.price)}</Text>
                        {book.originalPrice ? (
                            <Text style={styles.originalPrice}>
                                {formatPrice(book.originalPrice)}
                            </Text>
                        ) : null}
                    </View>

                    <View style={styles.categoryChip}>
                        <Text style={styles.categoryText}>{book.category}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Giới thiệu</Text>
                    <Text style={styles.description}>{book.description}</Text>
                </View>

                {inCart > 0 ? (
                    <View style={styles.inCartNote}>
                        <Text style={styles.inCartText}>
                            Đang có {inCart} quyển trong giỏ hàng.
                        </Text>
                    </View>
                ) : null}
            </ScrollView>

            <View style={styles.bottomBar}>
                <View style={styles.bottomPrice}>
                    <Text style={styles.bottomLabel}>Giá bán</Text>
                    <Text style={styles.bottomAmount}>{formatPrice(book.price)}</Text>
                </View>

                <Pressable
                    onPress={() => cart.add(book.id)}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
                >
                    <Ionicons name="cart-outline" size={20} color={Brand.onNavy} />
                    <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },
    scroll: { flex: 1 },
    content: { padding: Spacing.three, gap: Spacing.four },

    missing: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.two, padding: Spacing.four },
    missingTitle: { fontSize: 17, fontWeight: '700', color: Brand.text },
    missingText: { fontSize: 14, color: Brand.textMuted },

    cover: { alignSelf: 'center', width: '55%', aspectRatio: CoverRatio },

    headline: { gap: Spacing.two },
    titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.two },
    title: { flex: 1, fontSize: 22, fontWeight: '700', color: Brand.text, lineHeight: 29 },
    heart: {
        width: MinTouchTarget,
        height: MinTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',
    },
    author: { fontSize: 15, color: Brand.textMuted },

    priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.two },
    price: { fontSize: 24, fontWeight: '700', color: Brand.price },
    originalPrice: { fontSize: 15, color: Brand.textMuted, textDecorationLine: 'line-through' },

    categoryChip: {
        alignSelf: 'flex-start',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.one,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Brand.indigo,
        backgroundColor: Brand.indigoLight,
    },
    categoryText: { fontSize: 13, color: Brand.indigo },

    section: { gap: Spacing.two },
    sectionTitle: { fontSize: 17, fontWeight: '700', color: Brand.text },
    description: { fontSize: 15, lineHeight: 23, color: Brand.textMuted },

    inCartNote: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.indigoBorder,
        backgroundColor: Brand.indigoLight,
    },
    inCartText: { fontSize: 14, fontWeight: '600', color: Brand.indigo },

    bottomBar: {
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
    bottomPrice: { flex: 1, gap: Spacing.half },
    bottomLabel: { fontSize: 13, color: Brand.textMuted },
    bottomAmount: { fontSize: 20, fontWeight: '700', color: Brand.price },

    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.two,
        minHeight: MinTouchTarget,
        paddingHorizontal: Spacing.four,
        borderRadius: Spacing.two,
        backgroundColor: Brand.indigo,
    },
    addButtonPressed: { backgroundColor: Brand.navy },
    addButtonText: { fontSize: 16, fontWeight: '700', color: Brand.onNavy },
});
