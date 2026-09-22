import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';

interface ExerciseLink {
    href: string;
    code: string;
    title: string;
    topic: string;
}

interface HourGroup {
    hour: string;
    subject: string;
    items: ExerciseLink[];
}

const GROUPS: HourGroup[] = [
    {
        hour: 'Giờ 1',
        subject: 'Nền tảng Flexbox',
        items: [
            {
                href: '/g1b1-header',
                code: 'Bài 1',
                title: 'Header ứng dụng',
                topic: 'flexDirection row, justifyContent space-between, alignItems center',
            },
            {
                href: '/g1b2-book-card',
                code: 'Bài 2',
                title: 'Thẻ sách',
                topic: 'row + cột flex 1, giá đẩy xuống đáy bằng space-between',
            },
            {
                href: '/g1tt-header-list',
                code: 'Thử thách',
                title: 'Header và danh sách thẻ',
                topic: 'header cố định, vùng nội dung flex 1',
            },
        ],
    },
    {
        hour: 'Giờ 2',
        subject: 'Kích thước, Wrap và Lưới',
        items: [
            {
                href: '/g2b1-chips',
                code: 'Bài 1',
                title: 'Chip danh mục',
                topic: 'flexWrap wrap, gap, alignContent',
            },
            {
                href: '/g2b2-grid',
                code: 'Bài 2',
                title: 'Lưới sách 2 cột',
                topic: 'width phần trăm, space-between, aspectRatio',
            },
            {
                href: '/g2tt-grid3',
                code: 'Thử thách',
                title: 'Lưới 3 cột và so sánh gap',
                topic: 'hai cách chia cột đặt cạnh nhau',
            },
        ],
    },
    {
        hour: 'Giờ 3',
        subject: 'Position và lớp phủ',
        items: [
            {
                href: '/g3b1-badge',
                code: 'Bài 1',
                title: 'Badge trên ảnh bìa',
                topic: 'absolute trong containing block relative',
            },
            {
                href: '/g3b2-floating-cart',
                code: 'Bài 2',
                title: 'Nút giỏ hàng nổi',
                topic: 'absolute lồng nhau, hình tròn bằng borderRadius',
            },
            {
                href: '/g3tt-grid-badge',
                code: 'Thử thách',
                title: 'Lưới có badge và nút nổi',
                topic: 'nhiều lớp phủ trên cùng một màn hình',
            },
        ],
    },
    {
        hour: 'Giờ 4',
        subject: 'ScrollView và SafeAreaView',
        items: [
            {
                href: '/g4b1-home',
                code: 'Bài 1',
                title: 'Màn hình Trang chủ',
                topic: 'header cố định, ScrollView flex 1, nút nổi ngoài ScrollView',
            },
            {
                href: '/g4b2-detail',
                code: 'Bài 2',
                title: 'Màn hình Chi tiết sách',
                topic: 'alignSelf center, thanh cố định trên và dưới',
            },
        ],
    },
    {
        hour: 'Giờ 5',
        subject: 'Tab bar và tổng hợp',
        items: [
            {
                href: '/g5b1-tabbar',
                code: 'Bài 1',
                title: 'Thanh tab dưới cùng',
                topic: 'mỗi mục flex 1, container lồng nhau row và column',
            },
            {
                href: '/g5b2-cart',
                code: 'Bài 2',
                title: 'Màn hình Giỏ hàng',
                topic: 'ba vùng dọc không chồng lấp',
            },
            {
                href: '/g5tt-app',
                code: 'Thử thách',
                title: 'Ứng dụng hoàn chỉnh',
                topic: 'năm màn hình dùng chung tab bar, chuyển bằng useState',
            },
        ],
    },
];

export default function MenuScreen() {
    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.intro}>
                    <Text style={styles.introTitle}>Layout với Flexbox</Text>
                    <Text style={styles.introText}>
                        Ứng dụng BookStore Online. Toàn bộ bài tập chỉ dùng View, Text, Image,
                        ScrollView và StyleSheet — không gọi API, không dùng thư viện điều hướng.
                    </Text>
                </View>

                {GROUPS.map((group) => (
                    <View key={group.hour} style={styles.group}>
                        <View style={styles.groupHeader}>
                            <Text style={styles.groupHour}>{group.hour}</Text>
                            <Text style={styles.groupSubject}>{group.subject}</Text>
                        </View>

                        {group.items.map((item) => (
                            <Link key={item.href} href={item.href} asChild>
                                <Pressable
                                    accessibilityRole="link"
                                    accessibilityLabel={`${item.code}: ${item.title}`}
                                    style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                                >
                                    <Text style={styles.cardCode}>{item.code}</Text>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardTopic}>{item.topic}</Text>
                                </Pressable>
                            </Link>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: Brand.page },
    content: { padding: Spacing.three, gap: Spacing.four },

    intro: { gap: Spacing.one },
    introTitle: { fontSize: 20, fontWeight: '700', color: Brand.text },
    introText: { fontSize: 13, lineHeight: 19, color: Brand.textMuted },

    group: { gap: Spacing.two },
    groupHeader: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.two },
    groupHour: { fontSize: 15, fontWeight: '700', color: Brand.indigo },
    groupSubject: { fontSize: 13, color: Brand.textMuted },

    card: {
        minHeight: MinTouchTarget,
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
        gap: Spacing.half,
    },
    cardPressed: { backgroundColor: Brand.indigoLight, borderColor: Brand.indigoBorder },

    cardCode: { fontSize: 12, fontWeight: '700', color: Brand.indigo },
    cardTitle: { fontSize: 16, fontWeight: '600', color: Brand.text },
    cardTopic: { fontSize: 12, lineHeight: 17, color: Brand.textMuted },
});
