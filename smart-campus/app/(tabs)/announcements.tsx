import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    SectionList,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
    type ListRenderItem,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AnnouncementRow from '@/components/campus/announcement-row';
import FeedState from '@/components/campus/feed-state';
import { IconButton, SecondaryButton } from '@/components/ui/button';
import { Campus, MIN_TARGET } from '@/constants/theme';
import { announcements as allAnnouncements } from '@/data/campus';
import { groupAnnouncements } from '@/lib/announcement-groups';
import type { Announcement } from '@/types/campus';

type FeedStatus = 'loading' | 'error' | 'ready';

function normalize(value: string) {
    return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export default function AnnouncementsScreen() {
    const insets = useSafeAreaInsets();
    const { fontScale } = useWindowDimensions();

    const [status, setStatus] = useState<FeedStatus>('loading');
    const [emptySource, setEmptySource] = useState(false);
    const [query, setQuery] = useState('');
    const [grouped, setGrouped] = useState(false);

    const load = useCallback((mode: 'ok' | 'fail' = 'ok') => {
        setStatus('loading');
        setTimeout(() => setStatus(mode === 'ok' ? 'ready' : 'error'), 900);
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const source = useMemo(() => (emptySource ? [] : allAnnouncements), [emptySource]);

    const filtered = useMemo(() => {
        if (!query.trim()) return source;
        const needle = normalize(query.trim());
        return source.filter((item) => normalize(`${item.title} ${item.body}`).includes(needle));
    }, [source, query]);

    const sections = useMemo(() => groupAnnouncements(filtered), [filtered]);

    const renderItem: ListRenderItem<Announcement> = useCallback(
        ({ item }) => <AnnouncementRow item={item} />,
        [],
    );

    const keyExtractor = useCallback((item: Announcement) => item.id, []);

    const header = (
        <View style={styles.header}>
            <Text style={styles.title} accessibilityRole="header">
                THÔNG BÁO
            </Text>

            <View style={styles.searchRow}>
                <TextInput
                    style={styles.search}
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Tìm trong thông báo"
                    placeholderTextColor={Campus.textMuted}
                    accessibilityLabel="Tìm trong thông báo"
                    returnKeyType="search"
                />
                {query.length > 0 ? (
                    <IconButton
                        name="xmark.circle.fill"
                        accessibilityLabel="Xoá từ khoá tìm kiếm"
                        onPress={() => setQuery('')}
                    />
                ) : null}
            </View>

            <SecondaryButton
                label={grouped ? 'Đang nhóm theo thời gian' : 'Danh sách phẳng'}
                onPress={() => setGrouped((on) => !on)}
            />

            <View style={styles.simulateRow}>
                <Text style={styles.simulateLabel}>Giả lập:</Text>
                <SecondaryButton label="Tải lại" onPress={() => load('ok')} style={styles.chip} />
                <SecondaryButton label="Lỗi" onPress={() => load('fail')} style={styles.chip} />
                <SecondaryButton
                    label={emptySource ? 'Có dữ liệu' : 'Rỗng'}
                    onPress={() => setEmptySource((on) => !on)}
                    style={styles.chip}
                />
            </View>
        </View>
    );

    const footer =
        status === 'ready' && filtered.length > 0 ? (
            <Text style={styles.footer}>Hết danh sách — {filtered.length} thông báo.</Text>
        ) : null;

    let empty = null;
    if (status === 'loading') {
        empty = <FeedState busy title="Đang tải thông báo" description="Vui lòng đợi trong giây lát." />;
    } else if (status === 'error') {
        empty = (
            <FeedState
                title="Không tải được thông báo"
                description="Kiểm tra kết nối mạng rồi thử lại. Dữ liệu đã lưu vẫn còn nguyên."
                actionLabel="Thử lại"
                onAction={() => load('ok')}
            />
        );
    } else if (source.length === 0) {
        empty = (
            <FeedState
                title="Chưa có thông báo nào"
                description="Khi nhà trường đăng thông báo mới, nó sẽ xuất hiện ở đây."
            />
        );
    } else if (filtered.length === 0) {
        empty = (
            <FeedState
                title={`Không có kết quả cho "${query.trim()}"`}
                description="Thử từ khoá ngắn hơn, hoặc xoá bộ lọc để xem toàn bộ thông báo."
                actionLabel="Xoá bộ lọc"
                onAction={() => setQuery('')}
            />
        );
    }

    const padding = { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24 };

    if (grouped) {
        return (
            <SectionList
                style={styles.screen}
                contentContainerStyle={padding}
                sections={status === 'ready' ? sections : []}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                )}
                ItemSeparatorComponent={Separator}
                ListHeaderComponent={header}
                ListFooterComponent={footer}
                ListEmptyComponent={empty}
                stickySectionHeadersEnabled={fontScale <= 1.3}
            />
        );
    }

    return (
        <FlatList
            style={styles.screen}
            contentContainerStyle={padding}
            data={status === 'ready' ? filtered : []}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            ListHeaderComponent={header}
            ListFooterComponent={footer}
            ListEmptyComponent={empty}
        />
    );
}

function Separator() {
    return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Campus.surface,
    },

    header: {
        padding: 16,
        gap: 12,
        backgroundColor: Campus.background,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Campus.text,
    },

    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    search: {
        flex: 1,
        minHeight: MIN_TARGET,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Campus.border,
        borderRadius: 8,
        backgroundColor: Campus.surface,
        color: Campus.text,
        fontSize: 16,
    },

    simulateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },

    simulateLabel: {
        fontSize: 13,
        color: Campus.textMuted,
    },

    chip: {
        paddingHorizontal: 14,
    },

    sectionHeader: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 13,
        fontWeight: '700',
        color: Campus.textMuted,
        backgroundColor: Campus.background,
        textTransform: 'uppercase',
    },

    separator: {
        height: 1,
        marginHorizontal: 16,
        backgroundColor: Campus.border,
    },

    footer: {
        padding: 16,
        fontSize: 13,
        color: Campus.textMuted,
        textAlign: 'center',
    },
});
