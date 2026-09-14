import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { toCustomError, toUserMessage, type CustomError } from '@/api/api-error';
import { fetchBrokenHost, fetchBrokenNotFound, fetchProducts } from '@/api/products';
import AppButton from '@/components/common/app-button';
import Screen from '@/components/common/screen';
import { Brand, Feedback, Spacing } from '@/constants/theme';

type Outcome = { kind: 'success'; message: string } | { kind: 'error'; error: CustomError } | null;

/**
 * Bài 12 — Xử lý lỗi API.
 *
 * Ba nút gọi ba tình huống khác nhau để thấy rõ: cùng một khối catch,
 * cùng một hàm toCustomError, nhưng kết quả phân loại được thành
 * lỗi HTTP có mã, lỗi mạng không có mã, và trường hợp thành công.
 */
export default function ErrorDemoScreen() {
    const [outcome, setOutcome] = useState<Outcome>(null);
    const [busy, setBusy] = useState<string | null>(null);

    async function attempt(label: string, task: () => Promise<unknown>) {
        setBusy(label);
        setOutcome(null);

        try {
            await task();
            setOutcome({ kind: 'success', message: 'Gọi API thành công, không có lỗi nào.' });
        } catch (caught) {
            // caught có kiểu unknown. Không được đọc caught.message trực tiếp,
            // phải đưa qua toCustomError để thu hẹp kiểu an toàn.
            const error = toCustomError(caught);
            setOutcome({ kind: 'error', error });

            Alert.alert(
                'Gọi API thất bại',
                `${toUserMessage(error)}\n\nChi tiết kỹ thuật:\n${error.name} — ${error.message}`,
                [{ text: 'Đã hiểu' }],
            );
        } finally {
            setBusy(null);
        }
    }

    return (
        <Screen>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.intro}>
                    Mỗi nút gọi một URL khác nhau để kích hoạt một nhánh xử lý lỗi. Thông báo hiện
                    lên bằng Alert, đồng thời cấu trúc CustomError được in ra bên dưới.
                </Text>

                <AppButton
                    label="Gọi URL sai đường dẫn (404)"
                    onPress={() => attempt('notFound', fetchBrokenNotFound)}
                    loading={busy === 'notFound'}
                />

                <AppButton
                    label="Gọi tên miền không tồn tại"
                    onPress={() => attempt('host', fetchBrokenHost)}
                    loading={busy === 'host'}
                />

                <AppButton
                    label="Gọi URL đúng để so sánh"
                    variant="secondary"
                    onPress={() => attempt('ok', () => fetchProducts('phone', 1))}
                    loading={busy === 'ok'}
                />

                {outcome?.kind === 'error' ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorTitle}>Đã bắt được lỗi</Text>

                        <Text style={styles.field}>name: {outcome.error.name}</Text>
                        <Text style={styles.field}>
                            status: {outcome.error.status === null ? 'null' : outcome.error.status}
                        </Text>
                        <Text style={styles.field}>message: {outcome.error.message}</Text>
                        <Text style={styles.field}>url: {outcome.error.url}</Text>

                        <Text style={styles.userMessage}>
                            Câu hiển thị cho người dùng: {toUserMessage(outcome.error)}
                        </Text>
                    </View>
                ) : null}

                {outcome?.kind === 'success' ? (
                    <View style={styles.successBox}>
                        <Text style={styles.successText}>{outcome.message}</Text>
                    </View>
                ) : null}

                <View style={styles.note}>
                    <Text style={styles.noteTitle}>Vì sao status có thể là null</Text>
                    <Text style={styles.noteText}>
                        fetch chỉ từ chối khi không gửi được yêu cầu, ví dụ sai tên miền hoặc mất
                        mạng. Lúc đó chưa có phản hồi nên không có mã trạng thái. Ngược lại, lỗi 404
                        và 500 vẫn trả về phản hồi hợp lệ nên phải tự kiểm tra response.ok, nếu
                        không thì coi như thành công.
                    </Text>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: { gap: Spacing.three, paddingBottom: Spacing.four },

    intro: { fontSize: 14, lineHeight: 20, color: Brand.muted },

    errorBox: {
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Feedback.errorBorder,
        backgroundColor: Feedback.errorSurface,
        borderRadius: Spacing.two,
        gap: Spacing.half,
    },
    errorTitle: { fontSize: 15, fontWeight: '700', color: Feedback.errorText, marginBottom: Spacing.one },
    field: { fontSize: 13, color: Feedback.errorText, fontFamily: 'monospace' },
    userMessage: { marginTop: Spacing.two, fontSize: 14, color: Feedback.errorText },

    successBox: {
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Feedback.successBorder,
        backgroundColor: Feedback.successSurface,
        borderRadius: Spacing.two,
    },
    successText: { fontSize: 14, fontWeight: '600', color: Feedback.successText },

    note: {
        padding: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.surfaceBorder,
        backgroundColor: Brand.surface,
        borderRadius: Spacing.two,
        gap: Spacing.one,
    },
    noteTitle: { fontSize: 14, fontWeight: '700', color: Brand.primary },
    noteText: { fontSize: 13, lineHeight: 19, color: Brand.muted },
});
