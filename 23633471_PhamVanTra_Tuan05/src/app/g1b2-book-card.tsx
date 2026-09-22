import { StyleSheet, Text, View } from 'react-native';

import BookCardRow from '@/components/book/book-card-row';
import DemoPage from '@/components/common/demo-page';
import { books } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';

export default function Gio1Bai2BookCard() {
    return (
        <DemoPage note="row + alignItems flex-start · ảnh 80x110 cố định · cột thông tin flex 1 · giá đẩy đáy bằng space-between">
            <View style={styles.list}>
                <Text style={styles.label}>Tên ngắn một dòng</Text>
                <BookCardRow book={books[0]} />

                <Text style={styles.label}>
                    Tên dài hai dòng — ảnh bìa vẫn thẳng mép trên, giá vẫn sát đáy
                </Text>
                <BookCardRow book={books[8]} />

                <Text style={styles.label}>Sách mới, không có giá gốc gạch ngang</Text>
                <BookCardRow book={books[4]} />
            </View>
        </DemoPage>
    );
}

const styles = StyleSheet.create({
    list: { gap: Spacing.two },
    label: { fontSize: 13, color: Brand.textMuted, marginTop: Spacing.two },
});
