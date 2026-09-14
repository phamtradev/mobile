import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { fetchUser } from '@/api/users';
import AsyncStateView from '@/components/common/async-state-view';
import Screen from '@/components/common/screen';
import { useAsync } from '@/hooks/use-async';
import { Brand, Spacing } from '@/constants/theme';
import type { User } from '@/types/user';

const USER_ID = 1;

// Khai báo ngoài component nên tham chiếu hàm không đổi giữa các lần render.
// Nếu viết inline trong component, useAsync sẽ thấy task mới mỗi render và
// gọi lại API liên tục.
const loadUser = () => fetchUser(USER_ID);

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

/**
 * Bài 10 — Chi tiết người dùng.
 *
 * Điểm chính của bài là kiểu User | null. Trước khi API trả về, user là null,
 * và TypeScript bắt buộc phải xử lý trường hợp đó trước khi đọc thuộc tính.
 */
export default function UserProfileScreen() {
    const { data, loading, error, run } = useAsync<User>(loadUser);

    // Khai báo tường minh để thấy rõ kiểu theo yêu cầu của đề.
    const user: User | null = data;

    if (user === null) {
        return (
            <Screen>
                <AsyncStateView
                    loading={loading}
                    error={error}
                    onRetry={run}
                    loadingTitle="Đang tải hồ sơ người dùng"
                    emptyTitle="Chưa có dữ liệu người dùng"
                    emptyDescription="Màn hình để trống cho tới khi API trả về."
                />
            </Screen>
        );
    }

    return (
        <Screen padded={false}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    {/*
                      Optional chaining: user?.name.
                      Ở nhánh này TypeScript đã thu hẹp user về User nên dấu ?
                      là thừa về mặt kiểu, nhưng đề yêu cầu minh hoạ cú pháp này
                      nên giữ lại ở phần tên và các trường lồng sâu.
                    */}
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.username}>@{user?.username}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Liên hệ</Text>
                    <InfoRow label="Email" value={user?.email ?? 'Chưa cập nhật'} />
                    <InfoRow label="Điện thoại" value={user?.phone ?? 'Chưa cập nhật'} />
                    <InfoRow label="Website" value={user?.website ?? 'Chưa cập nhật'} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Địa chỉ</Text>
                    {/*
                      Chuỗi optional chaining phát huy tác dụng thật ở đây:
                      address hoặc geo có thể vắng mặt trong phản hồi, và
                      user.address.geo.lat sẽ ném lỗi lúc chạy nếu vậy.
                    */}
                    <InfoRow label="Đường" value={user?.address?.street ?? 'Chưa cập nhật'} />
                    <InfoRow label="Thành phố" value={user?.address?.city ?? 'Chưa cập nhật'} />
                    <InfoRow label="Mã bưu chính" value={user?.address?.zipcode ?? 'Chưa cập nhật'} />
                    <InfoRow
                        label="Toạ độ"
                        value={
                            user?.address?.geo
                                ? `${user.address.geo.lat}, ${user.address.geo.lng}`
                                : 'Chưa cập nhật'
                        }
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Công ty</Text>
                    <InfoRow label="Tên" value={user?.company?.name ?? 'Chưa cập nhật'} />
                    <InfoRow label="Khẩu hiệu" value={user?.company?.catchPhrase ?? 'Chưa cập nhật'} />
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { padding: Spacing.three, gap: Spacing.three },

    card: {
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.two,
        gap: Spacing.two,
    },

    cardTitle: { fontSize: 13, fontWeight: '700', color: Brand.primary, textTransform: 'uppercase' },

    name: { fontSize: 22, fontWeight: '700', color: '#000000' },
    username: { fontSize: 15, color: Brand.muted },

    row: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.two },
    label: { flexBasis: 110, flexShrink: 0, fontSize: 14, fontWeight: '600', color: '#000000' },
    value: { flex: 1, fontSize: 14, color: Brand.muted },
});
