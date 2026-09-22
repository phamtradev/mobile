import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import BottomTabBar, { TAB_BAR_HEIGHT, type TabKey } from '@/components/layout/bottom-tab-bar';
import { Brand, Spacing } from '@/constants/theme';

/**
 * Giờ 5 — Bài tập 1: thanh tab dưới cùng.
 *
 * Nút ở giữa đổi qua lại hai cách đặt thanh tab để so sánh.
 *
 * Ở chế độ trong luồng, vùng nội dung đặt flex 1 nên tự dừng ngay trên thanh
 * tab, không cần chừa gì.
 *
 * Ở chế độ absolute, vùng nội dung vẫn cao hết màn hình nên phải tự chừa
 * paddingBottom bằng chiều cao thanh. Bỏ dòng chừa đó ra thì mục cuối danh
 * sách bị thanh tab che mất.
 */
export default function Gio5Bai1TabBar() {
    const [active, setActive] = useState<TabKey>('home');
    const [floating, setFloating] = useState(false);

    return (
        <View style={styles.screen}>
            <View style={styles.note}>
                <Text style={styles.noteText}>
                    Mỗi mục flex 1 để chia đều · bên trong mỗi mục là column căn giữa hai trục
                </Text>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={[
                    styles.content,
                    floating && { paddingBottom: Spacing.four + TAB_BAR_HEIGHT },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    onPress={() => setFloating((on) => !on)}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.toggle, pressed && styles.togglePressed]}
                >
                    <Text style={styles.toggleText}>
                        Cách đặt hiện tại: {floating ? 'absolute dán đáy' : 'nằm trong luồng'}
                    </Text>
                </Pressable>

                <Text style={styles.paragraph}>
                    Tab đang chọn: {active}. Chạm vào các mục ở thanh dưới để đổi. Đây chỉ là
                    layout tĩnh, chưa dùng thư viện điều hướng nào.
                </Text>

                {Array.from({ length: 12 }, (_, index) => (
                    <View key={index} style={styles.filler}>
                        <Text style={styles.fillerText}>Dòng nội dung số {index + 1}</Text>
                    </View>
                ))}

                <View style={styles.lastMarker}>
                    <Text style={styles.lastMarkerText}>
                        Đây là phần tử cuối. Ở chế độ absolute mà quên chừa paddingBottom thì khối
                        này sẽ bị thanh tab che.
                    </Text>
                </View>
            </ScrollView>

            <BottomTabBar
                active={active}
                onChange={setActive}
                cartCount={7}
                floating={floating}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, position: 'relative', backgroundColor: Brand.page },

    note: {
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        backgroundColor: Brand.indigoLight,
        borderBottomWidth: 1,
        borderBottomColor: Brand.indigoBorder,
    },
    noteText: { fontSize: 12, lineHeight: 17, color: Brand.indigo },

    scroll: { flex: 1 },
    content: { padding: Spacing.three, gap: Spacing.two },

    toggle: {
        alignSelf: 'flex-start',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.two,
        backgroundColor: Brand.indigo,
    },
    togglePressed: { backgroundColor: Brand.navy },
    toggleText: { fontSize: 14, fontWeight: '600', color: Brand.onNavy },

    paragraph: { fontSize: 13, lineHeight: 19, color: Brand.textMuted, marginBottom: Spacing.two },

    filler: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.border,
        backgroundColor: Brand.surface,
    },
    fillerText: { fontSize: 14, color: Brand.text },

    lastMarker: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Brand.indigo,
        backgroundColor: Brand.indigoLight,
    },
    lastMarkerText: { fontSize: 13, lineHeight: 19, color: Brand.indigo },
});
