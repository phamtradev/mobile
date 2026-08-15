import { StyleSheet, Text, View } from 'react-native';

import { Campus } from '@/constants/theme';
import type { Announcement } from '@/types/campus';

function formatDate(iso: string) {
    const date = new Date(iso);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} lúc ${hour}:${minute}`;
}

export default function AnnouncementRow({ item }: { item: Announcement }) {
    return (
        <View
            style={styles.row}
            accessible
            accessibilityLabel={`${item.title}. ${item.body} Đăng ${formatDate(item.publishedAt)}.`}
        >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 4,
    },

    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Campus.text,
    },

    body: {
        fontSize: 14,
        lineHeight: 20,
        color: Campus.text,
    },

    date: {
        fontSize: 13,
        color: Campus.textMuted,
    },
});
