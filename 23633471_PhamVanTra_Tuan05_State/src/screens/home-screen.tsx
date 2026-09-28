import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import BookGrid from '@/components/book/book-grid';
import CategoryChips from '@/components/category/category-chips';
import FloatingCartButton from '@/components/layout/floating-cart-button';
import StoreHeader from '@/components/layout/store-header';
import { Brand, Spacing } from '@/constants/theme';
import { books, categories } from '@/data/books';
import { useCart } from '@/store/adapters/use-cart';
import type { RootStackParamList } from '@/navigation/types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

/**
 * Bài 1 — màn hình Home, điểm bắt đầu của luồng Home sang Chi tiết sách.
 *
 * Chạm vào một thẻ sách sẽ điều hướng kèm bookId qua route.params. Chỉ truyền
 * id chứ không truyền cả đối tượng sách: params nên nhẹ và tuần tự hoá được,
 * còn màn đích tự tra dữ liệu từ nguồn chung.
 */
export default function HomeScreen() {
    const navigation = useNavigation<Navigation>();
    const { totalCount } = useCart();

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    return (
        <View style={styles.screen}>
            <StoreHeader cartCount={totalCount} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
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
                    <BookGrid
                        books={books}
                        columns={2}
                        onPressBook={(book) =>
                            navigation.navigate('BookDetail', { bookId: book.id })
                        }
                    />
                </View>
            </ScrollView>

            <FloatingCartButton
                count={totalCount}
                onPress={() => navigation.navigate('MainTabs', { screen: 'cart' })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, position: 'relative', backgroundColor: Brand.page },
    scroll: { flex: 1 },
    content: { padding: Spacing.three, gap: Spacing.four, paddingBottom: 96 },
    block: { gap: Spacing.two },
    blockTitle: { fontSize: 17, fontWeight: '700', color: Brand.text },
});
