import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CartRow from '@/components/cart/cart-row';
import CartSummary from '@/components/cart/cart-summary';
import StoreHeader from '@/components/layout/store-header';
import { Brand, Spacing } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation/types';
import { useCart } from '@/store/adapters/use-cart';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

/**
 * Bài 2 và Bài 3 — màn hình Giỏ hàng.
 *
 * Toàn bộ dữ liệu đến từ useCart, không còn mảng mock cứng như tuần trước.
 * Màn hình này không import useSelector hay useDispatch — đó là ranh giới
 * của adapter pattern.
 *
 * Bố cục ba vùng dọc giữ nguyên từ tuần trước: header cố định trên,
 * ScrollView flex 1 ở giữa, thanh tổng tiền cố định dưới.
 */
export default function CartScreen() {
    const navigation = useNavigation<Navigation>();
    const { items, totalCount, totalPrice, changeQuantity, remove } = useCart();

    const empty = items.length === 0;

    return (
        <View style={styles.screen}>
            <StoreHeader title="Giỏ hàng" cartCount={totalCount} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {empty ? (
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>
                        <Text style={styles.emptyText}>
                            Mở tab Trang chủ, chạm vào một cuốn sách rồi bấm Thêm vào giỏ.
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.sectionLabel}>{items.length} đầu sách trong giỏ</Text>

                        <View style={styles.list}>
                            {items.map((item, index) => (
                                <View key={item.book.id}>
                                    {index > 0 ? <View style={styles.separator} /> : null}
                                    <CartRow
                                        item={item}
                                        onChangeQuantity={(quantity) =>
                                            changeQuantity(item.book.id, quantity)
                                        }
                                        onRemove={() => remove(item.book.id)}
                                    />
                                </View>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>

            {empty ? null : (
                <CartSummary
                    total={totalPrice}
                    itemCount={totalCount}
                    onCheckout={() =>
                        navigation.navigate('Checkout', {
                            total: totalPrice,
                            itemCount: totalCount,
                        })
                    }
                />
            )}
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

    emptyBox: {
        marginTop: Spacing.five,
        padding: Spacing.four,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        alignItems: 'center',
        gap: Spacing.two,
    },
    emptyTitle: { fontSize: 17, fontWeight: '700', color: Brand.text },
    emptyText: { fontSize: 14, lineHeight: 20, color: Brand.textMuted, textAlign: 'center' },
});
