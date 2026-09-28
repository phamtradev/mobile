import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';
import type { Category } from '@/types/book';

interface CategoryChipsProps {
    categories: Category[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    /**
     * Bật alignContent flex-start để so sánh với mặc định.
     * Chỉ thấy khác biệt khi container có chiều cao dư so với các dòng chip.
     */
    packLines?: boolean;
    /** Cho phép nơi dùng đặt flex 1 để thấy tác dụng của alignContent. */
    style?: StyleProp<ViewStyle>;
}

/**
 * Giờ 2 — Bài tập 1: danh mục dạng chip tự xuống dòng.
 *
 * flexWrap wrap cho phép chip tràn sang dòng mới thay vì bị bóp lại.
 * gap 8 lo cả khoảng cách ngang lẫn dọc giữa các dòng, nên không cần
 * marginRight cho từng chip rồi phải trừ đi cái cuối hàng.
 *
 * Bề rộng chip để tự co theo nội dung, không đặt width cố định — chữ
 * "Công nghệ thông tin" và chữ "Kinh tế" phải được rộng khác nhau.
 */
export default function CategoryChips({
    categories,
    selectedId,
    onSelect,
    packLines = false,
    style,
}: CategoryChipsProps) {
    return (
        <View style={[styles.container, packLines && styles.packed, style]}>
            {categories.map((category) => {
                const selected = category.id === selectedId;

                return (
                    <Pressable
                        key={category.id}
                        onPress={() => onSelect?.(category.id)}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        style={({ pressed }) => [
                            styles.chip,
                            selected && styles.chipSelected,
                            pressed && styles.chipPressed,
                        ]}
                    >
                        <Text style={[styles.label, selected && styles.labelSelected]}>
                            {category.name}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.two,
    },

    packed: { alignContent: 'flex-start' },

    chip: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        // Bán kính lớn hơn nửa chiều cao nên chip luôn ra hình viên thuốc,
        // dù chữ dài hay ngắn.
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Brand.indigo,
        backgroundColor: Brand.surface,
    },

    chipSelected: { backgroundColor: Brand.indigo },
    chipPressed: { backgroundColor: Brand.indigoLight },

    label: { fontSize: 14, color: Brand.indigo },
    labelSelected: { color: Brand.onNavy, fontWeight: '600' },
});
