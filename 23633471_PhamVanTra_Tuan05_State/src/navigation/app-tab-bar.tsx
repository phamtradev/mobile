import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import BottomTabBar, { type TabKey } from '@/components/layout/bottom-tab-bar';
import { useCart } from '@/store/adapters/use-cart';

/**
 * Bài 1 — custom tabBar.
 *
 * Đề yêu cầu dùng lại toàn bộ UI Tab Bar của tuần trước, không dùng icon mặc
 * định của thư viện. File này là lớp chuyển đổi: nhận props mà React Navigation
 * đưa xuống rồi dịch sang props mà BottomTabBar đã có sẵn hiểu được.
 *
 * Cách này giữ BottomTabBar hoàn toàn không biết gì về React Navigation, nên
 * nó vẫn dùng lại được ở màn hình minh hoạ layout tĩnh của tuần trước.
 *
 * state.index cho biết tab nào đang chọn, state.routes[index].name cho ra tên
 * route. Tên route được đặt trùng với TabKey nên không cần bảng ánh xạ.
 */
export default function AppTabBar({ state, navigation }: BottomTabBarProps) {
    const { totalCount } = useCart();

    const active = state.routes[state.index].name as TabKey;

    function handleChange(key: TabKey) {
        const target = state.routes.find((route) => route.name === key);
        if (!target) return;

        // emit tabPress trước để React Navigation xử lý các hành vi chuẩn,
        // ví dụ cuộn danh sách lên đầu khi chạm lại tab đang mở.
        const event = navigation.emit({
            type: 'tabPress',
            target: target.key,
            canPreventDefault: true,
        });

        if (!event.defaultPrevented) {
            navigation.navigate(target.name);
        }
    }

    return <BottomTabBar active={active} onChange={handleChange} cartCount={totalCount} />;
}
