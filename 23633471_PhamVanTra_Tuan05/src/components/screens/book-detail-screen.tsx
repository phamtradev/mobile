import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import BookCover from '@/components/book/book-cover';
import { formatPrice } from '@/data/books';
import { Brand, CoverRatio, MinTouchTarget, Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';

interface BookDetailScreenProps {
    book: Book;
    onBack?: () => void;
    extraBottomSpace?: number;
}

/**
 * Giờ 4 — Bài tập 2: màn hình chi tiết sách.
 *
 * Cùng một khuôn với màn hình Trang chủ: phần cố định nằm ngoài ScrollView,
 * phần dài nằm trong. Khác ở chỗ đây có phần cố định ở cả hai đầu.
 *
 *   View flex 1
 *   ├── thanh tiêu đề      cố định trên
 *   ├── ScrollView flex 1  ảnh bìa, thông tin, mô tả dài
 *   └── thanh thêm vào giỏ cố định dưới
 *
 * Ảnh bìa dùng alignSelf center để tự căn giữa mà không cần đặt alignItems
 * center lên cả ScrollView — làm vậy sẽ kéo theo mọi phần tử khác cùng vào
 * giữa, kể cả đoạn mô tả vốn phải căn trái.
 */
export default function BookDetailScreen({
    book,
    onBack,
    extraBottomSpace = 0,
}: BookDetailScreenProps) {
    return (
        <View style={styles.screen}>
            <View style={styles.topBar}>
                {onBack ? (
                    <Pressable
                        onPress={onBack}
                        accessibilityRole="button"
                        accessibilityLabel="Quay lại"
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={22} color={Brand.onNavy} />
                    </Pressable>
                ) : (
                    <View style={styles.backButton} />
                )}

                <Text style={styles.topTitle} numberOfLines={1}>
                    Chi tiết sách
                </Text>

                <View style={styles.backButton} />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[styles.content, { paddingBottom: 24 + extraBottomSpace }]}
                showsVerticalScrollIndicator={false}
            >
                <BookCover book={book} style={styles.cover} />

                <View style={styles.headline}>
                    <Text style={styles.title}>{book.title}</Text>
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
                    <Text style={styles.description}>{book.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <View style={styles.bottomPrice}>
                    <Text style={styles.bottomLabel}>Giá bán</Text>
                    <Text style={styles.bottomAmount}>{formatPrice(book.price)}</Text>
                </View>

                <Pressable
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

    topBar: {
        height: 56,
        paddingHorizontal: Spacing.two,
        backgroundColor: Brand.navy,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        width: MinTouchTarget,
        height: MinTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: Brand.onNavy },

    scroll: { flex: 1 },
    content: { padding: Spacing.three, gap: Spacing.four },

    cover: {
        // Chỉ riêng ảnh bìa căn giữa, các khối khác vẫn căn trái.
        alignSelf: 'center',
        width: '55%',
        aspectRatio: CoverRatio,
    },

    headline: { gap: Spacing.two },
    title: { fontSize: 22, fontWeight: '700', color: Brand.text, lineHeight: 29 },
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
