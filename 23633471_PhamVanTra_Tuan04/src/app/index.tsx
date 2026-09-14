import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Screen from '@/components/common/screen';
import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';

interface ExerciseLink {
    href: string;
    code: string;
    title: string;
    topic: string;
}

const EXERCISES: ExerciseLink[] = [
    {
        href: '/bai09-news',
        code: 'Bài 9',
        title: 'Danh sách tin tức',
        topic: 'fetch, async/await, định nghĩa Type từ JSON, FlatList',
    },
    {
        href: '/bai10-user',
        code: 'Bài 10',
        title: 'Chi tiết người dùng',
        topic: 'kiểu User | null, optional chaining',
    },
    {
        href: '/bai11-search',
        code: 'Bài 11',
        title: 'Tìm kiếm sản phẩm',
        topic: 'type annotation cho tham số hàm bất đồng bộ',
    },
    {
        href: '/bai12-error',
        code: 'Bài 12',
        title: 'Xử lý lỗi API',
        topic: 'catch kiểu unknown, type guard, CustomError, Alert',
    },
    {
        href: '/bai13-filter',
        code: 'Bài 13',
        title: 'Bộ lọc Generic',
        topic: 'hàm Generic dùng chung cho nhiều kiểu dữ liệu',
    },
    {
        href: '/bai14-pagination',
        code: 'Bài 14',
        title: 'Phân trang dữ liệu',
        topic: 'Generic Interface ApiResponse<T>',
    },
    {
        href: '/bai15-refresh',
        code: 'Bài 15',
        title: 'Kéo để tải lại',
        topic: 'đồng bộ hai cờ loading và refreshing',
    },
];

export default function MenuScreen() {
    return (
        <Screen padded={false}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.intro}>
                    <Text style={styles.introTitle}>Gọi API và xử lý bất đồng bộ</Text>
                    <Text style={styles.introText}>
                        Ứng dụng BookStore dùng hai API công khai là JSONPlaceholder và DummyJSON.
                        Mỗi màn hình dưới đây tương ứng một bài tập.
                    </Text>
                </View>

                {EXERCISES.map((exercise) => (
                    <Link key={exercise.href} href={exercise.href} asChild>
                        <Pressable
                            accessibilityRole="link"
                            accessibilityLabel={`${exercise.code}: ${exercise.title}`}
                            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                        >
                            <Text style={styles.code}>{exercise.code}</Text>
                            <Text style={styles.title}>{exercise.title}</Text>
                            <Text style={styles.topic}>{exercise.topic}</Text>
                        </Pressable>
                    </Link>
                ))}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { padding: Spacing.three, gap: Spacing.two },

    intro: { gap: Spacing.one, marginBottom: Spacing.two },
    introTitle: { fontSize: 20, fontWeight: '700', color: '#000000' },
    introText: { fontSize: 14, lineHeight: 20, color: Brand.muted },

    card: {
        minHeight: MinTouchTarget,
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.two,
        backgroundColor: '#FFFFFF',
        gap: Spacing.half,
    },
    cardPressed: { backgroundColor: Brand.surface, borderColor: Brand.surfaceBorder },

    code: { fontSize: 12, fontWeight: '700', color: Brand.primary },
    title: { fontSize: 16, fontWeight: '600', color: '#000000' },
    topic: { fontSize: 13, lineHeight: 18, color: Brand.muted },
});
