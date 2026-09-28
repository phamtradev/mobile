import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Khai báo tham số của từng màn hình một chỗ.
 *
 * Nhờ vậy navigation.navigate('BookDetail') mà quên bookId sẽ bị TypeScript
 * chặn ngay lúc biên dịch, thay vì màn hình trắng lúc chạy.
 */

export type MainTabParamList = {
    home: undefined;
    category: undefined;
    cart: undefined;
    account: undefined;
};

export type RootStackParamList = {
    MainTabs: NavigatorScreenParams<MainTabParamList>;
    BookDetail: { bookId: string };
    Checkout: { total: number; itemCount: number };
};
