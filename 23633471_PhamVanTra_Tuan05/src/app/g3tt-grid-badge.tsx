import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BookGrid from '@/components/book/book-grid';
import FloatingCartButton from '@/components/layout/floating-cart-button';
import { books, cartCount, cartItems } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';

/**
 * Giờ 3 — Thử thách: lưới sách có badge, cộng nút giỏ hàng nổi.
 *
 * Yêu cầu của đề là không badge nào bị lệch khi ảnh bìa đổi kích thước.
 * Điều đó đạt được nhờ badge luôn định vị theo khung ảnh của chính nó, còn
 * khung ảnh thì co theo bề rộng ô lưới qua aspectRatio. Không chỗ nào dùng
 * toạ độ tính sẵn theo pixel của ảnh.
 */
export default function Gio3ThuThach() {
    return (
        <View style={styles.screen}>
            <View style={styles.note}>
                <Text style={styles.noteText}>
                    Hai tầng lớp phủ trên cùng màn hình: badge định vị theo ảnh bìa, nút giỏ hàng
                    định vị theo màn hình
                </Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <BookGrid books={books} columns={2} />
            </ScrollView>

            <FloatingCartButton count={cartCount(cartItems)} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, position: 'relative', backgroundColor: Brand.page },

    note: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Brand.indigoLight,
        borderBottomWidth: 1,
        borderBottomColor: Brand.indigoBorder,
    },
    noteText: { fontSize: 12, lineHeight: 17, color: Brand.indigo },

    scroll: { flex: 1 },
    content: { padding: Spacing.three, paddingBottom: 96 },
});
