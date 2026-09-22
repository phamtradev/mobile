import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

/** Tiêu đề từng route, khai báo một chỗ để khớp với nhãn trong menu. */
const SCREEN_TITLES: Record<string, string> = {
    index: 'Tuần 5 — Layout Flexbox',
    'g1b1-header': 'G1.B1 — Header',
    'g1b2-book-card': 'G1.B2 — Thẻ sách',
    'g1tt-header-list': 'G1.TT — Header + danh sách',
    'g2b1-chips': 'G2.B1 — Chip danh mục',
    'g2b2-grid': 'G2.B2 — Lưới 2 cột',
    'g2tt-grid3': 'G2.TT — Lưới 3 cột',
    'g3b1-badge': 'G3.B1 — Badge giảm giá',
    'g3b2-floating-cart': 'G3.B2 — Nút giỏ hàng nổi',
    'g3tt-grid-badge': 'G3.TT — Lưới + badge + nút nổi',
    'g4b1-home': 'G4.B1 — Trang chủ',
    'g4b2-detail': 'G4.B2 — Chi tiết sách',
    'g5b1-tabbar': 'G5.B1 — Tab bar',
    'g5b2-cart': 'G5.B2 — Giỏ hàng',
    'g5tt-app': 'G5.TT — Ứng dụng hoàn chỉnh',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AnimatedSplashOverlay />

            <Stack>
                {Object.entries(SCREEN_TITLES).map(([name, title]) => (
                    <Stack.Screen
                        key={name}
                        name={name}
                        options={{
                            title,
                            // Ứng dụng hoàn chỉnh tự dựng thanh tiêu đề riêng
                            // nên ẩn thanh của Stack để không có hai header.
                            headerShown: name !== 'g5tt-app',
                        }}
                    />
                ))}
            </Stack>
        </ThemeProvider>
    );
}
