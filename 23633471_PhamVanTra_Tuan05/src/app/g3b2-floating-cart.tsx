import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BookCardRow from '@/components/book/book-card-row';
import FloatingCartButton from '@/components/layout/floating-cart-button';
import { books, cartCount, cartItems } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';

/**
 * Giờ 3 — Bài tập 2: nút giỏ hàng nổi.
 *
 * Nút đặt ngang hàng với ScrollView, không nằm trong nó. Cuộn danh sách sẽ
 * thấy nút đứng yên — đó là bằng chứng nó đã nằm đúng chỗ.
 */
export default function Gio3Bai2FloatingCart() {
    return (
        <View style={styles.screen}>
            <View style={styles.note}>
                <Text style={styles.noteText}>
                    absolute bottom 24 right 20 · borderRadius bằng nửa cạnh để ra hình tròn ·
                    chấm số lượng absolute theo chính nút tròn
                </Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {books.map((book) => (
                    <BookCardRow key={book.id} book={book} />
                ))}
            </ScrollView>

            <FloatingCartButton count={cartCount(cartItems)} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // Mốc định vị của nút nổi.
        position: 'relative',
        backgroundColor: Brand.page,
    },

    note: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Brand.indigoLight,
        borderBottomWidth: 1,
        borderBottomColor: Brand.indigoBorder,
    },
    noteText: { fontSize: 12, lineHeight: 17, color: Brand.indigo },

    scroll: { flex: 1 },

    // Chừa chỗ để thẻ cuối không bị nút giỏ hàng che.
    content: { padding: Spacing.three, gap: Spacing.three, paddingBottom: 96 },
});
