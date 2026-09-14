import { FlatList, StyleSheet, Text, View, type ListRenderItem } from 'react-native';

import { fetchPosts } from '@/api/posts';
import AsyncStateView from '@/components/common/async-state-view';
import ListSeparator from '@/components/common/list-separator';
import Screen from '@/components/common/screen';
import PostRow from '@/components/posts/post-row';
import { useAsync } from '@/hooks/use-async';
import { Brand, Spacing } from '@/constants/theme';
import type { Post } from '@/types/post';

/**
 * Bài 9 — Danh sách tin tức.
 *
 * fetchPosts trả về Promise<Post[]> nên useAsync suy ra T = Post[].
 * posts dưới đây có kiểu Post[], không phải any: gõ post.titel sẽ bị báo lỗi
 * ngay lúc biên dịch chứ không phải khi chạy.
 */
export default function NewsScreen() {
    const { data, loading, error, run } = useAsync<Post[]>(fetchPosts);

    const posts = data ?? [];

    const renderItem: ListRenderItem<Post> = ({ item }) => <PostRow post={item} />;

    return (
        <Screen padded={false}>
            <FlatList
                data={posts}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                ItemSeparatorComponent={ListSeparator}
                ListHeaderComponent={
                    posts.length > 0 ? (
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Tổng cộng {posts.length} bài viết</Text>
                        </View>
                    ) : null
                }
                ListEmptyComponent={
                    <AsyncStateView
                        loading={loading}
                        error={error}
                        onRetry={run}
                        loadingTitle="Đang tải danh sách tin tức"
                        emptyTitle="Chưa có bài viết nào"
                        emptyDescription="Máy chủ trả về danh sách rỗng."
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
    },

    headerText: { fontSize: 13, fontWeight: '600', color: Brand.primary },
});
