import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View, type ListRenderItem } from 'react-native';

import { PAGE_SIZE } from '@/api/endpoints';
import { fetchProductPage } from '@/api/products';
import AppButton from '@/components/common/app-button';
import AsyncStateView from '@/components/common/async-state-view';
import ListSeparator from '@/components/common/list-separator';
import Screen from '@/components/common/screen';
import ProductRow from '@/components/products/product-row';
import { useAsync } from '@/hooks/use-async';
import { Brand, Spacing } from '@/constants/theme';
import type { ApiResponse } from '@/types/api';
import type { Product } from '@/types/product';

/**
 * Bài 14 — Phân trang với Generic Interface.
 *
 * Kiểu ApiResponse<Product> mô tả lớp bọc ngoài: { data, total, page }.
 * Cùng interface đó dùng được cho ApiResponse<User> hay ApiResponse<Post>
 * mà không phải khai báo lại ba trường total, page, data cho từng loại.
 */
export default function PaginationScreen() {
    const [page, setPage] = useState(1);

    const task = useCallback(() => fetchProductPage(page, PAGE_SIZE), [page]);
    const { data, loading, error, run } = useAsync<ApiResponse<Product>>(task);

    // response có kiểu ApiResponse<Product> | null
    const response: ApiResponse<Product> | null = data;

    const products = response?.data ?? [];
    const total = response?.total ?? 0;
    const totalPages = total === 0 ? 1 : Math.ceil(total / PAGE_SIZE);

    const canPrev = page > 1 && !loading;
    const canNext = page < totalPages && !loading;

    const renderItem: ListRenderItem<Product> = ({ item }) => <ProductRow product={item} />;

    return (
        <Screen padded={false}>
            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                ItemSeparatorComponent={ListSeparator}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            Trang {response?.page ?? page}/{totalPages} — tổng {total} sản phẩm
                        </Text>
                    </View>
                }
                ListEmptyComponent={
                    <AsyncStateView
                        loading={loading}
                        error={error}
                        onRetry={run}
                        loadingTitle={`Đang tải trang ${page}`}
                        emptyTitle="Trang này không có sản phẩm nào"
                    />
                }
            />

            <View style={styles.pager}>
                <View style={styles.pagerButton}>
                    <AppButton
                        label="Trang trước"
                        variant="secondary"
                        disabled={!canPrev}
                        onPress={() => setPage((current) => Math.max(1, current - 1))}
                    />
                </View>

                <View style={styles.pagerButton}>
                    <AppButton
                        label="Trang sau"
                        disabled={!canNext}
                        onPress={() => setPage((current) => Math.min(totalPages, current + 1))}
                    />
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Brand.surface,
    },
    headerText: { fontSize: 13, fontWeight: '600', color: Brand.primary },

    pager: {
        flexDirection: 'row',
        gap: Spacing.two,
        padding: Spacing.three,
        borderTopWidth: 1,
        borderTopColor: Brand.border,
    },
    pagerButton: { flex: 1 },
});
