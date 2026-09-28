import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BookCardRow from '@/components/book/book-card-row';
import CategoryChips from '@/components/category/category-chips';
import StoreHeader from '@/components/layout/store-header';
import { Brand, Spacing } from '@/constants/theme';
import { books, categories } from '@/data/books';
import type { RootStackParamList } from '@/navigation/types';
import { useCart } from '@/store/adapters/use-cart';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

/**
 * Tab Danh mục.
 *
 * Danh mục đang chọn là state cục bộ, không đưa vào store toàn cục. Đây là
 * ví dụ cho phần lý thuyết về ranh giới giữa hai loại state: không màn hình
 * nào khác cần biết người dùng đang lọc theo danh mục nào, và giá trị này
 * mất đi khi rời màn hình cũng không sao.
 *
 * Ngược lại giỏ hàng phải nằm ở store vì cả Home, Chi tiết, Giỏ hàng, Tài
 * khoản và thanh tab đều đọc nó.
 */
export default function CategoryScreen() {
    const navigation = useNavigation<Navigation>();
    const { totalCount } = useCart();

    const [selectedId, setSelectedId] = useState<string>(categories[0].id);

    const selectedName = categories.find((item) => item.id === selectedId)?.name;
    const filtered = selectedName ? books.filter((book) => book.category === selectedName) : books;

    return (
        <View style={styles.screen}>
            <StoreHeader title="Danh mục" cartCount={totalCount} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <CategoryChips
                    categories={categories}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />

                <Text style={styles.count}>
                    {filtered.length} đầu sách thuộc {selectedName}
                </Text>

                <View style={styles.list}>
                    {filtered.length === 0 ? (
                        <Text style={styles.empty}>Danh mục này chưa có sách nào.</Text>
                    ) : (
                        filtered.map((book) => (
                            <BookCardRow
                                key={book.id}
                                book={book}
                                onPress={() =>
                                    navigation.navigate('BookDetail', { bookId: book.id })
                                }
                            />
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },
    scroll: { flex: 1 },
    content: { padding: Spacing.three, gap: Spacing.three },

    count: { fontSize: 13, color: Brand.textMuted },
    list: { gap: Spacing.three },
    empty: {
        paddingVertical: Spacing.five,
        textAlign: 'center',
        fontSize: 14,
        color: Brand.textMuted,
    },
});
