import { StyleSheet, Text, View } from 'react-native';

import { Brand, Feedback, Spacing } from '@/constants/theme';
import type { Post } from '@/types/post';

export default function PostRow({ post }: { post: Post }) {
    const done = post.completed;

    return (
        <View style={styles.row}>
            <Text style={styles.title}>{post.title}</Text>

            <View style={styles.meta}>
                <Text style={styles.id}>Bài số {post.id}</Text>

                <View style={[styles.badge, done ? styles.badgeDone : styles.badgeOpen]}>
                    <Text style={[styles.badgeText, done ? styles.badgeTextDone : styles.badgeTextOpen]}>
                        {done ? 'Đã xong' : 'Chưa xong'}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: Spacing.three,
        paddingHorizontal: Spacing.three,
        gap: Spacing.two,
    },

    title: { fontSize: 16, lineHeight: 22, color: '#000000' },

    meta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },

    id: { fontSize: 13, color: Brand.muted },

    badge: {
        paddingHorizontal: Spacing.two,
        paddingVertical: Spacing.half,
        borderRadius: Spacing.one,
        borderWidth: 1,
    },
    badgeDone: { backgroundColor: Feedback.successSurface, borderColor: Feedback.successBorder },
    badgeOpen: { backgroundColor: Brand.surface, borderColor: Brand.surfaceBorder },

    badgeText: { fontSize: 12, fontWeight: '600' },
    badgeTextDone: { color: Feedback.successText },
    badgeTextOpen: { color: Brand.primary },
});
