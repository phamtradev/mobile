import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

interface DemoPageProps {
    /** Câu tóm tắt thuộc tính flexbox mà bài này luyện. */
    note: string;
    children: ReactNode;
    /** false khi nội dung tự lo cuộn, ví dụ màn hình đã có ScrollView riêng. */
    scroll?: boolean;
    padded?: boolean;
}

/**
 * Khung chung cho các trang minh hoạ từng bài tập.
 *
 * Mỗi bài có một dòng ghi chú ở đầu để khi chụp màn hình nộp bài, người xem
 * biết ngay bài đó đang minh hoạ thuộc tính nào.
 */
export default function DemoPage({ note, children, scroll = true, padded = true }: DemoPageProps) {
    const body = (
        <>
            <View style={styles.note}>
                <Text style={styles.noteText}>{note}</Text>
            </View>

            <View style={padded ? styles.padded : undefined}>{children}</View>
        </>
    );

    if (!scroll) {
        return <View style={styles.screen}>{body}</View>;
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {body}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },

    content: { paddingBottom: Spacing.five },

    note: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Brand.indigoLight,
        borderBottomWidth: 1,
        borderBottomColor: Brand.indigoBorder,
    },
    noteText: { fontSize: 12, lineHeight: 17, color: Brand.indigo },

    padded: { padding: Spacing.three },
});
