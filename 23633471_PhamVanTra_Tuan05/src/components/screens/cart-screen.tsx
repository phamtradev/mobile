import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CartRow from '@/components/cart/cart-row';
import CartSummary from '@/components/cart/cart-summary';
import StoreHeader from '@/components/layout/store-header';
import { cartCount, cartItems, cartTotal } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';

/**
 * Giờ 5 — Bài tập 2: màn hình Giỏ hàng.
 *
 * Màn hình này có ba vùng dọc và không vùng nào được chồng lên vùng nào:
 *
 *   View flex 1
 *   ├── StoreHeader        cố định trên
 *   ├── ScrollView flex 1  danh sách sản phẩm, vùng duy nhất cuộn
 *   └── CartSummary        cố định dưới, ngay trên tab bar
 *
 * Cách chia này không cần tính toán chiều cao nào. ScrollView đặt flex 1 nên
 * nó tự nhận đúng phần còn lại sau khi header và thanh tổng tiền đã lấy phần
 * của mình. Nếu dùng absolute cho thanh tổng tiền thì phải tự chừa
 * paddingBottom cho danh sách, và con số đó sẽ sai mỗi lần đổi chiều cao thanh.
 */
export default function CartScreen() {
    const total = cartTotal(cartItems);
    const count = cartCount(cartItems);

    return (
        <View style={styles.screen}>
            <StoreHeader title="Giỏ hàng" cartCount={count} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.sectionLabel}>{cartItems.length} đầu sách trong giỏ</Text>

                <View style={styles.list}>
                    {cartItems.map((item, index) => (
                        <View key={item.book.id}>
                            {index > 0 ? <View style={styles.separator} /> : null}
                            <CartRow item={item} />
                        </View>
                    ))}
                </View>

                <View style={styles.note}>
                    <Text style={styles.noteTitle}>Ưu đãi vận chuyển</Text>
                    <Text style={styles.noteText}>
                        Đơn từ 300.000đ được miễn phí giao hàng toàn quốc. Đơn hiện tại đã đủ điều
                        kiện nhận ưu đãi này.
                    </Text>
                </View>
            </ScrollView>

            <CartSummary total={total} itemCount={count} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },

    scroll: { flex: 1 },
    content: { padding: Spacing.three, gap: Spacing.three },

    sectionLabel: { fontSize: 13, color: Brand.textMuted },

    list: {
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        overflow: 'hidden',
        backgroundColor: Brand.surface,
    },

    separator: {
        height: StyleSheet.hairlineWidth,
        marginHorizontal: Spacing.three,
        backgroundColor: Brand.border,
    },

    note: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.indigoBorder,
        backgroundColor: Brand.indigoLight,
        gap: Spacing.one,
    },
    noteTitle: { fontSize: 14, fontWeight: '700', color: Brand.indigo },
    noteText: { fontSize: 13, lineHeight: 19, color: Brand.textMuted },
});
