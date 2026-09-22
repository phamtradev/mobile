import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import BookGrid, { type GridMode } from '@/components/book/book-grid';
import DemoPage from '@/components/common/demo-page';
import { books } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';

/**
 * Giờ 2 — Thử thách: lưới 3 cột và so sánh hai cách chia cột.
 *
 * Bấm nút để đổi qua lại giữa hai cách trên cùng bộ dữ liệu, nên khác biệt
 * nhìn thấy ngay chứ không phải suy luận.
 */
export default function Gio2ThuThach() {
    const [mode, setMode] = useState<GridMode>('percent');

    const isPercent = mode === 'percent';

    return (
        <DemoPage note="Lưới 3 cột · so sánh width phần trăm với space-between và cách dùng gap">
            <View style={styles.switcher}>
                <Pressable
                    onPress={() => setMode('percent')}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isPercent }}
                    style={[styles.tab, isPercent && styles.tabActive]}
                >
                    <Text style={[styles.tabText, isPercent && styles.tabTextActive]}>
                        width 31.5% + space-between
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => setMode('gap')}
                    accessibilityRole="button"
                    accessibilityState={{ selected: !isPercent }}
                    style={[styles.tab, !isPercent && styles.tabActive]}
                >
                    <Text style={[styles.tabText, !isPercent && styles.tabTextActive]}>
                        gap 16 + width tính theo pixel
                    </Text>
                </Pressable>
            </View>

            <View style={styles.explain}>
                <Text style={styles.explainText}>
                    {isPercent
                        ? 'Cách phần trăm không cần đo container nên viết nhanh hơn. Đổi lại, khoảng hở giữa các cột là phần dư của phép chia, và hàng cuối thiếu ô sẽ dồn về trái.'
                        : 'Cách gap cho khoảng cách ngang và dọc bằng nhau tuyệt đối, hàng cuối cũng không bị dàn ra. Đổi lại phải đo bề rộng container bằng onLayout, vì width phần trăm trong React Native không tự trừ phần gap.'}
                </Text>
            </View>

            <BookGrid books={books} columns={3} mode={mode} />
        </DemoPage>
    );
}

const styles = StyleSheet.create({
    switcher: { flexDirection: 'row', gap: Spacing.two, marginBottom: Spacing.two },

    tab: {
        flex: 1,
        paddingHorizontal: Spacing.two,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.indigo,
        backgroundColor: Brand.surface,
    },
    tabActive: { backgroundColor: Brand.indigo },
    tabText: { fontSize: 12, textAlign: 'center', color: Brand.indigo },
    tabTextActive: { color: Brand.onNavy, fontWeight: '600' },

    explain: {
        padding: Spacing.two,
        borderRadius: Spacing.two,
        backgroundColor: Brand.indigoLight,
        marginBottom: Spacing.three,
    },
    explainText: { fontSize: 12, lineHeight: 18, color: Brand.indigo },
});
