import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AccountScreen from '@/components/screens/account-screen';
import BookDetailScreen from '@/components/screens/book-detail-screen';
import CartScreen from '@/components/screens/cart-screen';
import CategoryScreen from '@/components/screens/category-screen';
import HomeScreen from '@/components/screens/home-screen';
import BottomTabBar, { type TabKey } from '@/components/layout/bottom-tab-bar';
import { cartCount, cartItems } from '@/data/books';
import { Brand } from '@/constants/theme';
import type { Book } from '@/types/book';

/**
 * Thử thách Part_01: ghép năm màn hình đã dựng thành một ứng dụng chạy được,
 * dùng useState để đổi màn thay cho thư viện điều hướng.
 *
 * Mục đích của bài là kiểm chứng các layout đã dựng vẫn đúng khi lắp chung.
 *
 * Bố cục ngoài cùng:
 *
 *   SafeAreaView flex 1   tránh tai thỏ và thanh trạng thái
 *   ├── View flex 1       màn hình đang chọn, tự chiếm hết phần còn lại
 *   └── BottomTabBar      nằm trong luồng layout, không phải absolute
 *
 * Chọn tab bar trong luồng thay vì absolute nên không màn hình con nào phải
 * chừa paddingBottom cho nó. View flex 1 phía trên tự dừng đúng mép thanh tab.
 *
 * Màn chi tiết sách không phải một tab. Nó phủ lên toàn bộ khung, kể cả thanh
 * tab, giống cách một màn hình đẩy chồng hoạt động trong ứng dụng thật.
 */
export default function AppShell() {
    const [tab, setTab] = useState<TabKey>('home');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const count = cartCount(cartItems);

    if (selectedBook !== null) {
        return (
            <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
                <BookDetailScreen book={selectedBook} onBack={() => setSelectedBook(null)} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
            <View style={styles.body}>
                {tab === 'home' ? (
                    <HomeScreen onPressBook={setSelectedBook} onPressCart={() => setTab('cart')} />
                ) : null}

                {tab === 'category' ? <CategoryScreen onPressBook={setSelectedBook} /> : null}

                {tab === 'cart' ? <CartScreen /> : null}

                {tab === 'account' ? <AccountScreen /> : null}
            </View>

            <BottomTabBar active={tab} onChange={setTab} cartCount={count} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Brand.navy },

    // Nhận hết chiều cao còn lại sau khi thanh tab đã lấy phần của nó.
    body: { flex: 1, backgroundColor: Brand.page },
});
