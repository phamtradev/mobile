import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View, type ListRenderItem } from 'react-native';

import { SEARCH_LIMIT } from '@/api/endpoints';
import { fetchProducts } from '@/api/products';
import AppButton from '@/components/common/app-button';
import AsyncStateView from '@/components/common/async-state-view';
import ListSeparator from '@/components/common/list-separator';
import Screen from '@/components/common/screen';
import SearchField from '@/components/common/search-field';
import ProductRow from '@/components/products/product-row';
import { useAsync } from '@/hooks/use-async';
import { Brand, Spacing } from '@/constants/theme';
import type { Product } from '@/types/product';

const DEFAULT_KEYWORD = 'phone';

/**
 * Bài 11 — Tìm kiếm sản phẩm.
 *
 * Có hai state cho từ khoá và đó là chủ ý:
 * draft là chữ đang gõ, applied là từ khoá đã gửi đi. Nếu chỉ dùng một state
 * thì mỗi ký tự gõ vào sẽ tạo một request, hàng chục request cho một lần tìm.
 */
export default function ProductSearchScreen() {
    const [draft, setDraft] = useState(DEFAULT_KEYWORD);
    const [applied, setApplied] = useState(DEFAULT_KEYWORD);

    // useCallback giữ tham chiếu ổn định cho tới khi applied đổi, nhờ đó
    // useAsync chỉ gọi lại API đúng lúc người dùng bấm Tìm kiếm.
    const task = useCallback(() => fetchProducts(applied, SEARCH_LIMIT), [applied]);

    const { data, loading, error, run } = useAsync<Product[]>(task);
    const products = data ?? [];

    const search = () => setApplied(draft.trim());

    const renderItem: ListRenderItem<Product> = ({ item }) => <ProductRow product={item} />;

    return (
        <Screen padded={false}>
            <View style={styles.toolbar}>
                <SearchField
                    value={draft}
                    onChangeText={setDraft}
                    onSubmitEditing={search}
                    placeholder="Nhập tên sản phẩm"
                    label="Từ khoá tìm sản phẩm"
                />
                <AppButton label="Tìm kiếm" onPress={search} loading={loading} />
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                ItemSeparatorComponent={ListSeparator}
                keyboardShouldPersistTaps="handled"
                ListHeaderComponent={
                    products.length > 0 ? (
                        <Text style={styles.summary}>
                            Tìm thấy {products.length} sản phẩm cho từ khoá &quot;{applied}&quot;
                        </Text>
                    ) : null
                }
                ListEmptyComponent={
                    <AsyncStateView
                        loading={loading}
                        error={error}
                        onRetry={run}
                        loadingTitle="Đang tìm sản phẩm"
                        emptyTitle={`Không có sản phẩm nào khớp "${applied}"`}
                        emptyDescription="Thử một từ khoá ngắn hơn, ví dụ phone hoặc laptop."
                    />
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    toolbar: {
        padding: Spacing.three,
        gap: Spacing.two,
        borderBottomWidth: 1,
        borderBottomColor: Brand.border,
    },

    summary: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        fontSize: 13,
        fontWeight: '600',
        color: Brand.primary,
        backgroundColor: Brand.surface,
    },
});
