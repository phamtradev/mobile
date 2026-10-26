import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { RatingStars } from '@/components/rating-stars';
import { bookService } from '@/services/book.service';
import { commentService } from '@/services/comment.service';
import { useAuth } from '@/store/auth-store';
import { BookResponse, Comment } from '@/types';

export default function BookDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { isLoggedIn, user } = useAuth();

    const [book, setBook] = useState<BookResponse | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!id) return;
        let active = true;

        (async () => {
            try {
                const [bookData, commentData] = await Promise.all([
                    bookService.getBookById(id),
                    commentService.getByBookId(id),
                ]);
                if (!active) return;
                setBook(bookData);
                setComments(commentData);
                setError(null);
            } catch {
                if (active) setError('Không tải được dữ liệu sách.');
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => {
            active = false;
        };
    }, [id, attempt]);

    const retry = () => {
        setLoading(true);
        setAttempt((current) => current + 1);
    };

    const average = useMemo(() => {
        if (!comments.length) return 0;
        return comments.reduce((sum, item) => sum + item.rating, 0) / comments.length;
    }, [comments]);

    const submit = async () => {
        if (!book) return;
        if (!rating || !text.trim()) {
            Alert.alert('Chưa đủ thông tin', 'Hãy chọn số sao và viết vài dòng nhận xét.');
            return;
        }

        setSubmitting(true);
        try {
            const created = await commentService.create(book.id, {
                userName: user?.name ?? 'Bạn đọc',
                rating,
                text: text.trim(),
            });
            setComments((current) => [created, ...current]);
            setRating(0);
            setText('');
        } catch {
            Alert.alert('Gửi không thành công', 'Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !book) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error ?? 'Không tìm thấy sách.'}</Text>
                <Pressable onPress={retry} style={styles.submit}>
                    <Text style={styles.submitText}>Thử lại</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <View style={styles.hero}>
                    <Image source={{ uri: book.image }} style={styles.cover} />
                    <View style={styles.heroText}>
                        <Text style={styles.title}>{book.title}</Text>
                        <Text style={styles.author}>{book.author}</Text>
                        <Text style={styles.views}>{book.views} lượt xem</Text>

                        <View style={styles.summary}>
                            <RatingStars value={average} size={18} />
                            <Text style={styles.summaryValue}>{average.toFixed(1)}</Text>
                            <Text style={styles.summaryCount}>({comments.length})</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Viết bình luận</Text>

                {isLoggedIn ? (
                    <View style={styles.form}>
                        <Text style={styles.formLabel}>Chấm điểm</Text>
                        <RatingStars value={rating} size={30} onChange={setRating} />

                        <TextInput
                            value={text}
                            onChangeText={setText}
                            style={styles.input}
                            placeholder="Bạn thấy quyển sách này thế nào?"
                            placeholderTextColor="#94a3b8"
                            multiline
                            textAlignVertical="top"
                            accessibilityLabel="Nội dung bình luận"
                        />

                        <Pressable
                            onPress={submit}
                            disabled={submitting}
                            style={[styles.submit, submitting && styles.disabled]}
                            accessibilityRole="button"
                            accessibilityState={{ disabled: submitting, busy: submitting }}>
                            <Text style={styles.submitText}>
                                {submitting ? 'Đang gửi…' : 'Gửi bình luận'}
                            </Text>
                        </Pressable>
                    </View>
                ) : (
                    <Pressable
                        onPress={() => router.push('/login')}
                        style={styles.loginPrompt}
                        accessibilityRole="button">
                        <Text style={styles.loginPromptText}>Đăng nhập để viết bình luận</Text>
                    </Pressable>
                )}

                <Text style={styles.sectionTitle}>Bình luận của bạn đọc</Text>
                {comments.length ? (
                    comments.map((item) => (
                        <View key={item.id} style={styles.comment}>
                            <View style={styles.commentTop}>
                                <Text style={styles.commentName}>{item.userName}</Text>
                                <RatingStars value={item.rating} size={14} />
                            </View>
                            <Text style={styles.commentText}>{item.text}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.empty}>Chưa có bình luận nào.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, gap: 12 },
    content: { padding: 16, paddingBottom: 32 },

    hero: { flexDirection: 'row', gap: 16 },
    cover: { width: 110, height: 155, borderRadius: 10, backgroundColor: '#e2e8f0' },
    heroText: { flex: 1, justifyContent: 'center', gap: 4 },
    title: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
    author: { fontSize: 14, color: '#64748b' },
    views: { fontSize: 13, color: '#64748b' },
    summary: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
    summaryValue: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
    summaryCount: { fontSize: 13, color: '#64748b' },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0f172a',
        marginTop: 24,
        marginBottom: 12,
    },

    form: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        backgroundColor: '#fff',
        gap: 8,
    },
    formLabel: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
    input: {
        minHeight: 84,
        padding: 12,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        color: '#0f172a',
    },
    submit: {
        minHeight: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 16,
        backgroundColor: '#1e3a8a',
    },
    disabled: { backgroundColor: '#94a3b8' },
    submitText: { color: '#fff', fontWeight: '700' },

    loginPrompt: {
        minHeight: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1e3a8a',
        backgroundColor: '#eef2ff',
    },
    loginPromptText: { color: '#1e3a8a', fontWeight: '600' },

    comment: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    commentTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
    commentName: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
    commentText: { fontSize: 14, lineHeight: 20, color: '#0f172a' },
    empty: { color: '#64748b' },
    error: { textAlign: 'center', color: '#dc2626' },
});
