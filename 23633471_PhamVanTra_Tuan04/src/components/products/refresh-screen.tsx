import { useCallback } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
    type ListRenderItem,
} from 'react-native';

import { PAGE_SIZE } from '@/api/endpoints';
import { fetchProductPage } from '@/api/products';
import AsyncStateView from '@/components/common/async-state-view';
import ListSeparator from '@/components/common/list-separator';
import Screen from '@/components/common/screen';
import ProductRow from '@/components/products/product-row';
import { useAsync } from '@/hooks/use-async';
import { Brand, Feedback, Spacing } from '@/constants/theme';
import type { ApiResponse } from '@/types/api';
import type { Product } from '@/types/product';

const loadFirstPage = () => fetchProductPage(1, PAGE_SIZE);

/**
 * Bài 15 — Kéo để tải lại.
 *
 * loading và refreshing là hai cờ riêng biệt, không dùng chung một biến:
 *
 * loading bật ở lần tải đầu khi màn hình chưa có gì. Lúc đó hiện ô "đang tải"
 * chiếm cả màn hình là hợp lý vì không có nội dung nào để che.
 *
 * refreshing bật khi người dùng kéo xuống. Danh sách cũ vẫn đang hiện và vẫn
 * đọc được, chỉ có vòng xoay nhỏ ở đầu danh sách. Nếu dùng chung một cờ thì
 * mỗi lần kéo làm mới, toàn bộ danh sách biến mất rồi hiện lại, gây nhấp nháy
 * và làm mất vị trí cuộn của người dùng.
 */
export default function RefreshScreen() {
    const { data, loading, refreshing, error, run, refresh } =
        useAsync<ApiResponse<Product>>(loadFirstPage);

    const products = data?.data ?? [];

    const renderItem: ListRenderItem<Product> = useCallback(
        ({ item }) => <ProductRow product={item} />,
        [],
    );

    return (
        <Screen padded={false}>
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                ItemSeparatorComponent={ListSeparator}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                        colors={[Brand.primary]}
                        tintColor={Brand.primary}
                    />
                }
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {refreshing ? 'Đang làm mới danh sách' : 'Kéo xuống để làm mới'}
                        </Text>
                        <Text style={styles.headerMeta}>
                            loading = {String(loading)} · refreshing = {String(refreshing)} ·{' '}
                            {products.length} sản phẩm
                        </Text>
                    </View>
                }
                ListFooterComponent={
                    // Lỗi khi làm mới không xoá dữ liệu cũ, chỉ báo thêm một dòng
                    // ở cuối danh sách để người dùng biết bản đang xem là bản cũ.
                    error && products.length > 0 ? (
                        <Text style={styles.staleWarning}>
                            Làm mới thất bại: {error} Danh sách bên trên là dữ liệu của lần tải
                            trước.
                        </Text>
                    ) : null
                }
                ListEmptyComponent={
                    <AsyncStateView
                        loading={loading}
                        error={error}
                        onRetry={run}
                        loadingTitle="Đang tải danh sách sản phẩm"
                        emptyTitle="Chưa có sản phẩm nào"
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Brand.surface,
        gap: Spacing.half,
    },
    headerText: { fontSize: 13, fontWeight: '600', color: Brand.primary },
    headerMeta: { fontSize: 12, color: Brand.muted, fontFamily: 'monospace' },

    staleWarning: {
        margin: Spacing.three,
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Feedback.errorBorder,
        backgroundColor: Feedback.errorSurface,
        borderRadius: Spacing.two,
        fontSize: 13,
        lineHeight: 19,
        color: Feedback.errorText,
    },
});
