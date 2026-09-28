import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppTabBar from '@/navigation/app-tab-bar';
import type { MainTabParamList } from '@/navigation/types';
import AccountScreen from '@/screens/account-screen';
import CartScreen from '@/screens/cart-screen';
import CategoryScreen from '@/screens/category-screen';
import HomeScreen from '@/screens/home-screen';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Bài 1 — Bottom Tab Navigator với bốn tab.
 *
 * headerShown đặt false vì mỗi màn hình đã tự dựng StoreHeader của tuần trước.
 * Bật header của thư viện sẽ thành hai thanh tiêu đề chồng nhau.
 *
 * tabBar trỏ tới AppTabBar nên toàn bộ giao diện thanh tab là của tuần trước,
 * không dùng icon hay nhãn mặc định của thư viện.
 */
export default function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <AppTabBar {...props} />}
        >
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="category" component={CategoryScreen} />
            <Tab.Screen name="cart" component={CartScreen} />
            <Tab.Screen name="account" component={AccountScreen} />
        </Tab.Navigator>
    );
}
