import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

/** Tiêu đề khai báo một chỗ để tên bài trên thanh điều hướng khớp với menu. */
const SCREEN_TITLES: Record<string, string> = {
    index: 'Bài tập chương 4',
    'bai09-news': 'Bài 9 — Danh sách tin tức',
    'bai10-user': 'Bài 10 — Chi tiết người dùng',
    'bai11-search': 'Bài 11 — Tìm kiếm sản phẩm',
    'bai12-error': 'Bài 12 — Xử lý lỗi API',
    'bai13-filter': 'Bài 13 — Bộ lọc Generic',
    'bai14-pagination': 'Bài 14 — Phân trang',
    'bai15-refresh': 'Bài 15 — Kéo để tải lại',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AnimatedSplashOverlay />

            <Stack>
                {Object.entries(SCREEN_TITLES).map(([name, title]) => (
                    <Stack.Screen key={name} name={name} options={{ title }} />
                ))}
            </Stack>
        </ThemeProvider>
    );
}
