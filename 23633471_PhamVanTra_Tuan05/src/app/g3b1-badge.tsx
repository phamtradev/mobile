import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import BookCover from '@/components/book/book-cover';
import DemoPage from '@/components/common/demo-page';
import { books } from '@/data/books';
import { Brand, CoverRatio, Spacing } from '@/constants/theme';

/**
 * Giờ 3 — Bài tập 1: nhãn giảm giá và nhãn Mới.
 *
 * Khối cuối dựng lại cố ý sai để thấy hậu quả của việc chọn nhầm View cha.
 * Badge vẫn khai báo top 6 left 6 y hệt, chỉ khác chỗ nó được đặt vào.
 */
export default function Gio3Bai1Badge() {
    return (
        <DemoPage note="badge position absolute top 6 left 6 · mốc tính là View cha trực tiếp · trong React Native mọi View đều là containing block">
            <Text style={styles.label}>Đúng: badge nằm trong View bọc ảnh bìa</Text>

            <View style={styles.row}>
                <BookCover book={books[1]} style={styles.cover} />
                <BookCover book={books[4]} style={styles.cover} />
                <BookCover book={books[7]} style={styles.cover} />
            </View>

            <Text style={styles.caption}>
                Sách thứ nhất đang giảm giá nên hiện phần trăm, sách thứ hai là hàng mới nên hiện
                nhãn Mới, sách thứ ba không thuộc cả hai nhóm nên không vẽ badge. Badge đè lên ảnh
                mà không đẩy layout, vì absolute đã đưa nó ra khỏi luồng bình thường.
            </Text>

            <Text style={styles.label}>Sai: badge nằm trong View bọc cả thẻ</Text>

            <View style={styles.wrongCard}>
                <View style={styles.wrongCoverFrame}>
                    <Image
                        source={{ uri: books[1].cover }}
                        style={styles.wrongImage}
                        contentFit="cover"
                    />
                </View>

                <View style={styles.wrongInfo}>
                    <Text style={styles.wrongTitle}>{books[1].title}</Text>
                    <Text style={styles.wrongAuthor}>{books[1].author}</Text>
                </View>

                {/* Badge là con của thẻ, không phải con của khung ảnh, nên nó
                    dính góc thẻ và lệch hẳn khỏi ảnh bìa. */}
                <View style={styles.wrongBadge}>
                    <Text style={styles.wrongBadgeText}>-28%</Text>
                </View>
            </View>

            <Text style={styles.caption}>
                Trong React Native, position mặc định đã là relative nên mọi View đều làm được
                containing block. Vì thế lỗi thường gặp không phải quên khai báo relative, mà là
                đặt badge vào nhầm cấp. Badge luôn tính mốc theo cha trực tiếp của nó.
            </Text>
        </DemoPage>
    );
}

const styles = StyleSheet.create({
    label: { fontSize: 14, fontWeight: '700', color: Brand.text, marginTop: Spacing.two },
    caption: {
        fontSize: 12,
        lineHeight: 18,
        color: Brand.textMuted,
        marginTop: Spacing.two,
        marginBottom: Spacing.three,
    },

    row: { flexDirection: 'row', gap: Spacing.three, marginTop: Spacing.two },
    cover: { width: 96, aspectRatio: CoverRatio },

    wrongCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: Spacing.three,
        marginTop: Spacing.two,
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
    },
    wrongCoverFrame: {
        width: 80,
        height: 110,
        borderRadius: Spacing.two,
        overflow: 'hidden',
        backgroundColor: Brand.indigoLight,
    },
    wrongImage: { width: '100%', height: '100%' },
    wrongInfo: { flex: 1, gap: Spacing.one },
    wrongTitle: { fontSize: 16, fontWeight: '600', color: Brand.text },
    wrongAuthor: { fontSize: 13, color: Brand.textMuted },

    wrongBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        paddingHorizontal: Spacing.two,
        paddingVertical: Spacing.half,
        borderRadius: Spacing.one,
        backgroundColor: Brand.disabled,
    },
    wrongBadgeText: { fontSize: 12, fontWeight: '700', color: Brand.onNavy },
});
