import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BookGrid from '@/components/book/book-grid';
import CategoryChips from '@/components/category/category-chips';
import FloatingCartButton from '@/components/layout/floating-cart-button';
import StoreHeader from '@/components/layout/store-header';
import { books, cartCount, cartItems, categories } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';
import type { Book } from '@/types/book';

interface HomeScreenProps {
    onPressBook?: (book: Book) => void;
    onPressCart?: () => void;
    /** Chừa thêm chỗ cuối trang khi màn hình có tab bar dán đáy. */
    extraBottomSpace?: number;
}

/**
 * Giờ 4 — Bài tập 1: màn hình Trang chủ hoàn chỉnh.
 *
 * Cấu trúc ba tầng, đây là điểm chính của bài:
 *
 *   View flex 1
 *   ├── StoreHeader        cố định, nằm ngoài ScrollView nên không cuộn
 *   ├── ScrollView flex 1  chips và lưới sách, phần duy nhất cuộn được
 *   └── FloatingCartButton absolute, ngang hàng ScrollView nên nổi cố định
 *
 * Nút giỏ hàng phải là anh em của ScrollView, không phải con của nó. Đặt vào
 * trong ScrollView thì nút sẽ cuộn theo nội dung và mất tác dụng nổi.
 *
 * contentContainerStyle cần paddingBottom đủ lớn, nếu không hàng sách cuối
 * cùng sẽ nằm khuất dưới nút giỏ hàng khi cuộn tới đáy.
 */
export default function HomeScreen({
    onPressBook,
    onPressCart,
    extraBottomSpace = 0,
}: HomeScreenProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    const count = cartCount(cartItems);

    return (
        <View style={styles.screen}>
            <StoreHeader cartCount={count} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: 96 + extraBottomSpace },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.block}>
                    <Text style={styles.blockTitle}>Danh mục</Text>
                    <CategoryChips
                        categories={categories}
                        selectedId={selectedCategory}
                        onSelect={(id) =>
                            setSelectedCategory((current) => (current === id ? undefined : id))
                        }
                    />
                </View>

                <View style={styles.block}>
                    <Text style={styles.blockTitle}>Sách nổi bật</Text>
                    <BookGrid books={books} columns={2} onPressBook={onPressBook} />
                </View>
            </ScrollView>

            <FloatingCartButton
                count={count}
                onPress={onPressCart}
                bottomOffset={24 + extraBottomSpace}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // Mốc định vị cho nút giỏ hàng nổi.
        position: 'relative',
        backgroundColor: Brand.page,
    },

    scroll: { flex: 1 },

    content: {
        padding: Spacing.three,
        gap: Spacing.four,
    },

    block: { gap: Spacing.two },

    blockTitle: { fontSize: 17, fontWeight: '700', color: Brand.text },
});
