import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import CategoryChips from '@/components/category/category-chips';
import DemoPage from '@/components/common/demo-page';
import { categories } from '@/data/books';
import { Brand, Spacing } from '@/constants/theme';

export default function Gio2Bai1Chips() {
    const [selectedId, setSelectedId] = useState<string | undefined>(categories[1].id);
    const [packed, setPacked] = useState(false);

    return (
        <DemoPage note="flexWrap wrap · gap 8 · borderRadius lớn tạo hình viên thuốc · width tự co theo chữ">
            <View style={styles.block}>
                <Text style={styles.label}>Chạm để chọn, chạm lại để bỏ chọn</Text>
                <CategoryChips
                    categories={categories}
                    selectedId={selectedId}
                    onSelect={(id) => setSelectedId((current) => (current === id ? undefined : id))}
                    packLines={packed}
                />
            </View>

            <View style={styles.block}>
                <Pressable
                    onPress={() => setPacked((on) => !on)}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.toggle, pressed && styles.togglePressed]}
                >
                    <Text style={styles.toggleText}>
                        alignContent hiện tại: {packed ? "'flex-start'" : 'mặc định'}
                    </Text>
                </Pressable>

                <Text style={styles.hint}>
                    alignContent chỉ có tác dụng khi container cao hơn tổng chiều cao các dòng
                    chip. Khối bên dưới đặt chiều cao cố định 160 để thấy được khác biệt: mặc định
                    các dòng dàn đều theo chiều cao, còn flex-start dồn hết lên trên.
                </Text>

                <View style={styles.tallBox}>
                    <CategoryChips
                        categories={categories.slice(0, 5)}
                        packLines={packed}
                        style={styles.fill}
                    />
                </View>
            </View>
        </DemoPage>
    );
}

const styles = StyleSheet.create({
    block: { gap: Spacing.two, marginBottom: Spacing.four },
    label: { fontSize: 13, color: Brand.textMuted },

    toggle: {
        alignSelf: 'flex-start',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.two,
        backgroundColor: Brand.indigo,
    },
    togglePressed: { backgroundColor: Brand.navy },
    toggleText: { fontSize: 14, fontWeight: '600', color: Brand.onNavy },

    hint: { fontSize: 12, lineHeight: 18, color: Brand.textMuted },

    fill: { flex: 1 },

    tallBox: {
        height: 160,
        padding: Spacing.two,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: Brand.indigo,
        borderRadius: Spacing.two,
        backgroundColor: Brand.surface,
    },
});
