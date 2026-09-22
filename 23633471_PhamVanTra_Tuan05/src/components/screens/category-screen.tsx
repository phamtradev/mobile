import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BookCardRow from '@/components/book/book-card-row';
import CategoryChips from '@/components/category/category-chips';
import StoreHeader from '@/components/layout/store-header';
import { books, cartCount, cartItems, categories } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';

interface CategoryScreenProps {
    onPressBook?: (book: Book) => void;
    extraBottomSpace?: number;
}

/**
 * Màn hình Danh mục.
 *
 * Dùng lại CategoryChips của giờ 2 và BookCardRow của giờ 1, chỉ ghép lại
 * theo bố cục dọc. Đây là phần thu lại của việc tách component ngay từ đầu:
 * màn hình này gần như không có style riêng.
 */
export default function CategoryScreen({ onPressBook, extraBottomSpace = 0 }: CategoryScreenProps) {
    const [selectedId, setSelectedId] = useState<string>(categories[0].id);

    const selectedName = categories.find((item) => item.id === selectedId)?.name;
    const filtered = selectedName ? books.filter((book) => book.category === selectedName) : books;

    return (
        <View style={styles.screen}>
            <StoreHeader title="Danh mục" cartCount={cartCount(cartItems)} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: Spacing.four + extraBottomSpace },
                ]}
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
                                onPress={onPressBook ? () => onPressBook(book) : undefined}
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
