import { StyleSheet, Text, View } from 'react-native';

import DemoPage from '@/components/common/demo-page';
import StoreHeader from '@/components/layout/store-header';
import { Brand, Spacing } from '@/constants/theme';

export default function Gio1Bai1Header() {
    return (
        <DemoPage
            note="flexDirection row · justifyContent space-between · alignItems center · height 56 · paddingHorizontal 16"
            padded={false}
        >
            <StoreHeader cartCount={7} />

            <View style={styles.body}>
                <Text style={styles.label}>Không có giỏ hàng</Text>
                <StoreHeader title="Hiệu sách" />

                <Text style={styles.label}>Tên dài hơn vẫn không đẩy icon ra khỏi mép</Text>
                <StoreHeader title="BookStore Online Việt Nam" cartCount={12} />
            </View>
        </DemoPage>
    );
}

const styles = StyleSheet.create({
    body: { padding: Spacing.three, gap: Spacing.two },
    label: { fontSize: 13, color: Brand.textMuted, marginTop: Spacing.two },
});
