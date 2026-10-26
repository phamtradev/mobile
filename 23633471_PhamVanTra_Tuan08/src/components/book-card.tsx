import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BookResponse } from '@/types';

export function BookCard({ book }: { book: BookResponse }) {
    return (
        <Pressable
            onPress={() => router.push({ pathname: '/books/[id]', params: { id: book.id } })}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={`Xem chi tiết ${book.title}`}>
            <Image source={{ uri: book.image }} style={styles.cover} />

            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {book.title}
                </Text>
                <Text style={styles.author}>{book.author}</Text>

                <View style={styles.footer}>
                    <Image source={{ uri: book.avatar }} style={styles.avatar} />
                    <Text style={styles.views}>{book.views} lượt xem</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    pressed: { backgroundColor: '#eef2ff' },
    cover: { width: 64, height: 90, borderRadius: 8, backgroundColor: '#e2e8f0' },
    info: { flex: 1, justifyContent: 'center', gap: 4 },
    title: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    author: { fontSize: 13, color: '#64748b' },
    footer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
    avatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#e2e8f0' },
    views: { fontSize: 12, color: '#64748b' },
});
