import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';
import type { Product } from '@/types/product';

function formatPrice(usd: number): string {
    return `${usd.toFixed(2)} USD`;
}

/** Dùng lại ở cả ba màn hình sản phẩm: tìm kiếm, phân trang, kéo làm mới. */
export default function ProductRow({ product }: { product: Product }) {
    return (
        <View style={styles.row}>
            {/* Ảnh có chiều cao cố định vì ảnh mạng chưa biết kích thước
                trước khi tải xong, để trống sẽ làm dòng nhảy chỗ. */}
            <Image
                source={{ uri: product.thumbnail }}
                style={styles.thumb}
                contentFit="cover"
                transition={150}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
            />

            <View style={styles.body}>
                <Text style={styles.title} numberOfLines={2}>
                    {product.title}
                </Text>
                <Text style={styles.category}>{product.category}</Text>

                <View style={styles.meta}>
                    <Text style={styles.price}>{formatPrice(product.price)}</Text>
                    <Text style={styles.stock}>Còn {product.stock}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        gap: Spacing.three,
        paddingVertical: Spacing.three,
        paddingHorizontal: Spacing.three,
    },

    thumb: {
        width: 64,
        height: 64,
        borderRadius: Spacing.two,
        backgroundColor: Brand.surface,
    },

    body: { flex: 1, gap: Spacing.half },

    title: { fontSize: 15, fontWeight: '600', color: '#000000' },
    category: { fontSize: 13, color: Brand.muted },

    meta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, marginTop: Spacing.one },
    price: { fontSize: 15, fontWeight: '700', color: Brand.primary },
    stock: { fontSize: 13, color: Brand.muted },
});
