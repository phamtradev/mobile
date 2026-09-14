import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import AppButton from '@/components/common/app-button';
import { Brand, Feedback, Spacing } from '@/constants/theme';

interface MessageViewProps {
    title: string;
    description?: string;
    /** true khi đang chờ dữ liệu — hiện vòng quay thay vì biểu tượng tĩnh. */
    busy?: boolean;
    /** true khi là thông báo lỗi — đổi bảng màu và vai trò cảnh báo. */
    tone?: 'neutral' | 'error';
    actionLabel?: string;
    onAction?: () => void;
}

/**
 * Một component cho cả bốn trạng thái: đang tải, lỗi, rỗng, không khớp bộ lọc.
 * Chúng chỉ khác nhau ở chữ và ở việc có nút hành động hay không, nên tách
 * thành bốn component riêng chỉ tạo ra code trùng lặp.
 */
export default function MessageView({
    title,
    description,
    busy = false,
    tone = 'neutral',
    actionLabel,
    onAction,
}: MessageViewProps) {
    const isError = tone === 'error';

    return (
        <View
            style={[styles.container, isError && styles.errorContainer]}
            accessibilityLiveRegion="polite"
        >
            {busy ? <ActivityIndicator size="large" color={Brand.primary} /> : null}

            <Text style={[styles.title, isError && styles.errorText]}>{title}</Text>

            {description ? (
                <Text style={[styles.description, isError && styles.errorText]}>{description}</Text>
            ) : null}

            {actionLabel && onAction ? (
                <View style={styles.action}>
                    <AppButton label={actionLabel} onPress={onAction} variant="secondary" />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: Spacing.five,
        paddingHorizontal: Spacing.four,
        alignItems: 'center',
        gap: Spacing.two,
    },

    errorContainer: {
        margin: Spacing.three,
        borderRadius: Spacing.two,
        borderWidth: 1,
        borderColor: Feedback.errorBorder,
        backgroundColor: Feedback.errorSurface,
    },

    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
    },

    description: {
        fontSize: 14,
        lineHeight: 20,
        color: Brand.muted,
        textAlign: 'center',
    },

    errorText: { color: Feedback.errorText },

    action: { marginTop: Spacing.two, alignSelf: 'stretch' },
});
