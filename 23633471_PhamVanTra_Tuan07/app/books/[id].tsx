import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RatingStars from '@/components/rating-stars';
import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';
import { books, findBook, formatPrice } from '@/data/books';
import { reviewService } from '@/services/review-service';
import { useAuth } from '@/store/auth-store';
import type { Review } from '@/types';

export default function BookDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const book = findBook(id);
    const { isLoggedIn, user } = useAuth();

    const [reviews, setReviews] = useState<Review[]>(book?.reviews ?? []);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const average = useMemo(() => {
        if (!reviews.length) return 0;
        return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    }, [reviews]);

    if (!book) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>Không tìm thấy quyển sách này.</Text>
            </View>
        );
    }

    const related = books.filter((item) => item.category === book.category && item.id !== book.id);

    const submitReview = async () => {
        if (!rating || !comment.trim()) {
            Alert.alert('Chưa đủ thông tin', 'Hãy chọn số sao và viết vài dòng nhận xét.');
            return;
        }

        setSubmitting(true);
        try {
            const created = await reviewService.create(book.id, {
                userName: user?.name ?? 'Bạn đọc',
                rating,
                comment: comment.trim(),
            });
            setReviews((current) => [created, ...current]);
            setRating(0);
            setComment('');
        } catch {
            Alert.alert('Gửi không thành công', 'Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <View style={styles.hero}>
                    <View style={styles.cover}>
                        <Text style={styles.coverText} numberOfLines={4}>
                            {book.title}
                        </Text>
                    </View>
                    <View style={styles.heroText}>
                        <Text style={styles.category}>{book.category}</Text>
                        <Text style={styles.title}>{book.title}</Text>
                        <Text style={styles.author}>{book.author}</Text>
                        <Text style={styles.price}>{formatPrice(book.price)}</Text>
                    </View>
                </View>

                <Text style={styles.description}>{book.description}</Text>

                <View style={styles.summary}>
                    <RatingStars value={average} size={20} />
                    <Text style={styles.summaryValue}>{average.toFixed(1)}</Text>
                    <Text style={styles.summaryCount}>({reviews.length} đánh giá)</Text>
                </View>

                <Text style={styles.sectionTitle}>Viết đánh giá</Text>

                {isLoggedIn ? (
                    <View style={styles.form}>
                        <Text style={styles.formLabel}>Chấm điểm</Text>
                        <RatingStars value={rating} size={30} onChange={setRating} />

                        <TextInput
                            value={comment}
                            onChangeText={setComment}
                            style={styles.comment}
                            placeholder="Bạn thấy quyển sách này thế nào?"
                            placeholderTextColor={Brand.textMuted}
                            multiline
                            textAlignVertical="top"
                            accessibilityLabel="Nội dung đánh giá"
                        />

                        <Pressable
                            onPress={submitReview}
                            disabled={submitting}
                            style={({ pressed }) => [
                                styles.submit,
                                pressed && !submitting && styles.submitPressed,
                                submitting && styles.submitDisabled,
                            ]}
                            accessibilityRole="button"
                            accessibilityState={{ disabled: submitting, busy: submitting }}>
                            <Text style={styles.submitText}>{submitting ? 'Đang gửi…' : 'Gửi đánh giá'}</Text>
                        </Pressable>
                    </View>
                ) : (
                    <Pressable
                        onPress={() => router.push('/login')}
                        style={({ pressed }) => [styles.loginPrompt, pressed && styles.loginPromptPressed]}
                        accessibilityRole="button">
                        <Text style={styles.loginPromptText}>Đăng nhập để viết đánh giá</Text>
                    </Pressable>
                )}

                <Text style={styles.sectionTitle}>Đánh giá của bạn đọc</Text>
                {reviews.map((review) => (
                    <View key={review.id} style={styles.review}>
                        <View style={styles.reviewTop}>
                            <Text style={styles.reviewName}>{review.userName}</Text>
                            <RatingStars value={review.rating} size={14} />
                        </View>
                        <Text style={styles.reviewComment}>{review.comment}</Text>
                    </View>
                ))}

                {related.length ? (
                    <>
                        <Text style={styles.sectionTitle}>Sách cùng thể loại</Text>
                        <FlatList
                            horizontal
                            data={related}
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.relatedList}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => router.push({ pathname: '/books/[id]', params: { id: item.id } })}
                                    style={({ pressed }) => [styles.related, pressed && styles.relatedPressed]}
                                    accessibilityRole="button"
                                    accessibilityLabel={`Xem ${item.title}`}>
                                    <View style={styles.relatedCover}>
                                        <Text style={styles.coverText} numberOfLines={3}>
                                            {item.title}
                                        </Text>
                                    </View>
                                    <Text style={styles.relatedTitle} numberOfLines={1}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.relatedAuthor} numberOfLines={1}>
                                        {item.author}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.three },
    emptyText: { fontSize: 15, color: Brand.textMuted },
    content: { padding: Spacing.three, paddingBottom: Spacing.five },

    hero: { flexDirection: 'row', gap: Spacing.three },
    cover: {
        width: 104,
        height: 148,
        borderRadius: Spacing.two,
        backgroundColor: Brand.navy,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.two,
    },
    coverText: { fontSize: 12, fontWeight: '700', color: Brand.onNavy, textAlign: 'center' },
    heroText: { flex: 1, justifyContent: 'center', gap: 2 },
    category: { fontSize: 12, fontWeight: '600', color: Brand.indigo },
    title: { fontSize: 20, fontWeight: '700', color: Brand.text },
    author: { fontSize: 14, color: Brand.textMuted },
    price: { fontSize: 16, fontWeight: '700', color: Brand.navy, marginTop: Spacing.two },

    description: { fontSize: 14, lineHeight: 22, color: Brand.text, marginTop: Spacing.three },

    summary: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginTop: Spacing.three },
    summaryValue: { fontSize: 15, fontWeight: '700', color: Brand.text },
    summaryCount: { fontSize: 13, color: Brand.textMuted },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: Brand.text,
        marginTop: Spacing.four,
        marginBottom: Spacing.three,
    },

    form: {
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.three,
        backgroundColor: Brand.surface,
        gap: Spacing.two,
    },
    formLabel: { fontSize: 14, fontWeight: '600', color: Brand.text },
    comment: {
        minHeight: 88,
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.two,
        fontSize: 14,
        color: Brand.text,
    },
    submit: {
        minHeight: MinTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Spacing.two,
        backgroundColor: Brand.navy,
    },
    submitPressed: { backgroundColor: Brand.indigo },
    submitDisabled: { backgroundColor: Brand.disabled },
    submitText: { fontSize: 15, fontWeight: '700', color: Brand.onNavy },

    loginPrompt: {
        minHeight: MinTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.navy,
        backgroundColor: Brand.indigoLight,
    },
    loginPromptPressed: { backgroundColor: Brand.surface },
    loginPromptText: { fontSize: 15, fontWeight: '600', color: Brand.navy },

    review: {
        paddingVertical: Spacing.three,
        borderBottomWidth: 1,
        borderBottomColor: Brand.border,
    },
    reviewTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginBottom: Spacing.one },
    reviewName: { fontSize: 14, fontWeight: '700', color: Brand.text },
    reviewComment: { fontSize: 14, lineHeight: 20, color: Brand.text },

    relatedList: { gap: Spacing.three },
    related: { width: 118 },
    relatedPressed: { opacity: 0.7 },
    relatedCover: {
        height: 150,
        borderRadius: Spacing.two,
        backgroundColor: Brand.navy,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.two,
        marginBottom: Spacing.two,
    },
    relatedTitle: { fontSize: 13, fontWeight: '600', color: Brand.text },
    relatedAuthor: { fontSize: 12, color: Brand.textMuted },
});
