import { ScrollView, StyleSheet, View } from 'react-native';

import BookCardRow from '@/components/book/book-card-row';
import StoreHeader from '@/components/layout/store-header';
import { books } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';

/**
 * Giờ 1 — Thử thách: header cố định phía trên, danh sách thẻ sách bên dưới.
 *
 * Vùng nội dung đặt flex 1 nên nó nhận hết chiều cao còn lại sau header,
 * không cần biết header cao bao nhiêu. Đổi chiều cao header từ 56 sang 72
 * thì danh sách tự co theo, không phải sửa thêm chỗ nào.
 */
export default function Gio1ThuThach() {
    return (
        <View style={styles.screen}>
            <StoreHeader cartCount={7} />

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            >
                {books.slice(0, 5).map((book) => (
                    <BookCardRow key={book.id} book={book} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },

    // flex 1: chiếm hết phần còn lại của màn hình sau header.
    content: { flex: 1 },

    list: { padding: Spacing.three, gap: Spacing.three },
});
