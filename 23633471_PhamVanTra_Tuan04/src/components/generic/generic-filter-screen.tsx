import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { fetchUsers } from '@/api/users';
import AsyncStateView from '@/components/common/async-state-view';
import Screen from '@/components/common/screen';
import SearchField from '@/components/common/search-field';
import { useAsync } from '@/hooks/use-async';
import { filterByName } from '@/utils/filter-by-name';
import { Brand, Spacing } from '@/constants/theme';
import type { User } from '@/types/user';

/** Kiểu thứ hai, không liên quan gì tới User, dùng để chứng minh hàm lọc tái sử dụng được. */
interface Category {
    id: number;
    name: string;
    itemCount: number;
}

const CATEGORIES: Category[] = [
    { id: 1, name: 'Điện thoại', itemCount: 128 },
    { id: 2, name: 'Máy tính bảng', itemCount: 64 },
    { id: 3, name: 'Laptop văn phòng', itemCount: 91 },
    { id: 4, name: 'Phụ kiện điện thoại', itemCount: 210 },
    { id: 5, name: 'Đồng hồ thông minh', itemCount: 37 },
];

/**
 * Bài 13 — Bộ lọc danh sách với Generic.
 *
 * Cùng một hàm filterByName chạy trên hai kiểu hoàn toàn khác nhau:
 * User lấy từ API, Category khai báo tại chỗ. Không có ép kiểu nào,
 * và kết quả trả về vẫn giữ đúng kiểu đầu vào.
 */
export default function GenericFilterScreen() {
    const [keyword, setKeyword] = useState('');

    const { data, loading, error, run } = useAsync<User[]>(fetchUsers);
    const users = useMemo(() => data ?? [], [data]);

    // filterByName<User> — suy ra từ tham số, không cần viết kiểu ra.
    const matchedUsers = useMemo(() => filterByName(users, keyword), [users, keyword]);

    // filterByName<Category> — cùng hàm đó, kiểu khác.
    const matchedCategories = useMemo(() => filterByName(CATEGORIES, keyword), [keyword]);

    const showEmptyState = users.length === 0;

    return (
        <Screen>
            <View style={styles.toolbar}>
                <SearchField
                    value={keyword}
                    onChangeText={setKeyword}
                    placeholder="Gõ để lọc cả hai danh sách"
                    label="Từ khoá lọc"
                />
            </View>

            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <View style={styles.block}>
                    <Text style={styles.blockTitle}>
                        Người dùng từ API — {matchedUsers.length}/{users.length}
                    </Text>

                    {showEmptyState ? (
                        <AsyncStateView
                            loading={loading}
                            error={error}
                            onRetry={run}
                            loadingTitle="Đang tải danh sách người dùng"
                            emptyTitle="Chưa có người dùng nào"
                        />
                    ) : matchedUsers.length === 0 ? (
                        <Text style={styles.noMatch}>Không có người dùng nào khớp từ khoá.</Text>
                    ) : (
                        matchedUsers.map((user) => (
                            <View key={user.id} style={styles.row}>
                                <Text style={styles.rowTitle}>{user.name}</Text>
                                <Text style={styles.rowMeta}>{user.email}</Text>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.block}>
                    <Text style={styles.blockTitle}>
                        Danh mục khai báo tại chỗ — {matchedCategories.length}/{CATEGORIES.length}
                    </Text>

                    {matchedCategories.length === 0 ? (
                        <Text style={styles.noMatch}>Không có danh mục nào khớp từ khoá.</Text>
                    ) : (
                        matchedCategories.map((category) => (
                            <View key={category.id} style={styles.row}>
                                <Text style={styles.rowTitle}>{category.name}</Text>
                                <Text style={styles.rowMeta}>{category.itemCount} sản phẩm</Text>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.note}>
                    <Text style={styles.noteTitle}>Ràng buộc của Generic</Text>
                    <Text style={styles.noteText}>
                        Khai báo là filterByName&lt;T extends HasName&gt;. Ràng buộc extends cho phép
                        đọc item.name bên trong hàm mà vẫn nhận mọi kiểu object có trường đó. Nếu bỏ
                        ràng buộc, TypeScript không biết T có name nên sẽ báo lỗi. Nếu thay T bằng
                        any thì hàm chạy được nhưng kết quả trả về mất kiểu, và lỗi gõ sai tên
                        trường chỉ lộ ra lúc chạy.
                    </Text>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    toolbar: { marginBottom: Spacing.three },
    content: { gap: Spacing.three, paddingBottom: Spacing.four },

    block: {
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.two,
        padding: Spacing.three,
        gap: Spacing.two,
    },
    blockTitle: { fontSize: 14, fontWeight: '700', color: Brand.primary },

    row: { gap: Spacing.half },
    rowTitle: { fontSize: 15, color: '#000000' },
    rowMeta: { fontSize: 13, color: Brand.muted },

    noMatch: { fontSize: 14, color: Brand.muted, fontStyle: 'italic' },

    note: {
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.surfaceBorder,
        backgroundColor: Brand.surface,
        borderRadius: Spacing.two,
        gap: Spacing.one,
    },
    noteTitle: { fontSize: 14, fontWeight: '700', color: Brand.primary },
    noteText: { fontSize: 13, lineHeight: 19, color: Brand.muted },
});
