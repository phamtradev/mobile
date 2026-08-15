import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FormField from '@/components/campus/form-field';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { Campus } from '@/constants/theme';
import { SUMMARY_LIMIT, validateProfile } from '@/lib/validation';
import type { ProfileDraft, ProfileField } from '@/types/campus';

const EMPTY: ProfileDraft = {
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    summary: '',
};

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();

    const [draft, setDraft] = useState<ProfileDraft>(EMPTY);
    const [touched, setTouched] = useState<Partial<Record<ProfileField, boolean>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const errors = useMemo(() => validateProfile(draft), [draft]);
    const errorCount = Object.keys(errors).length;

    function update(field: ProfileField, value: string) {
        setDraft((current) => ({ ...current, [field]: value }));
        setSaved(false);
    }

    function blur(field: ProfileField) {
        setTouched((current) => ({ ...current, [field]: true }));
    }

    function shows(field: ProfileField) {
        return submitted || Boolean(touched[field]);
    }

    function submit() {
        setSubmitted(true);
        if (errorCount > 0) return;

        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setSaved(true);
        }, 800);
    }

    function reset() {
        setDraft(EMPTY);
        setTouched({});
        setSubmitted(false);
        setSaved(false);
    }

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={insets.bottom}
        >
            <ScrollView
                contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
            >
                <Text style={styles.title}>HỒ SƠ SINH VIÊN</Text>

                {submitted && errorCount > 0 ? (
                    <View style={styles.summaryError} accessibilityLiveRegion="assertive">
                        <Text style={styles.summaryErrorText}>
                            ⚠ Còn {errorCount} trường cần sửa. Chi tiết ghi ngay dưới từng ô.
                        </Text>
                    </View>
                ) : null}

                {saved ? (
                    <View style={styles.savedBox} accessibilityLiveRegion="polite">
                        <Text style={styles.savedText}>✓ Đã lưu hồ sơ thành công.</Text>
                    </View>
                ) : null}

                <FormField
                    label="Họ và tên"
                    hint="Ghi đúng như trên thẻ sinh viên"
                    value={draft.fullName}
                    onChangeText={(value) => update('fullName', value)}
                    onBlur={() => blur('fullName')}
                    error={errors.fullName}
                    showError={shows('fullName')}
                    autoComplete="name"
                />

                <FormField
                    label="Mã số sinh viên"
                    hint="8 chữ số"
                    value={draft.studentId}
                    onChangeText={(value) => update('studentId', value)}
                    onBlur={() => blur('studentId')}
                    error={errors.studentId}
                    showError={shows('studentId')}
                    keyboardType="number-pad"
                    maxLength={12}
                />

                <FormField
                    label="Email"
                    hint="Dùng email trường cấp"
                    value={draft.email}
                    onChangeText={(value) => update('email', value)}
                    onBlur={() => blur('email')}
                    error={errors.email}
                    showError={shows('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                />

                <FormField
                    label="Số điện thoại"
                    hint="10 chữ số, bắt đầu bằng 0"
                    value={draft.phone}
                    onChangeText={(value) => update('phone', value)}
                    onBlur={() => blur('phone')}
                    error={errors.phone}
                    showError={shows('phone')}
                    keyboardType="phone-pad"
                    autoComplete="tel"
                />

                <FormField
                    label="Địa chỉ liên hệ"
                    value={draft.address}
                    onChangeText={(value) => update('address', value)}
                    onBlur={() => blur('address')}
                    error={errors.address}
                    showError={shows('address')}
                />

                <FormField
                    label="Ngày sinh"
                    hint="Dạng ngày/tháng/năm"
                    placeholder="dd/mm/yyyy"
                    value={draft.birthDate}
                    onChangeText={(value) => update('birthDate', value)}
                    onBlur={() => blur('birthDate')}
                    error={errors.birthDate}
                    showError={shows('birthDate')}
                    maxLength={10}
                />

                <FormField
                    label="Giới thiệu bản thân"
                    hint={`Còn ${Math.max(0, SUMMARY_LIMIT - draft.summary.trim().length)} ký tự`}
                    value={draft.summary}
                    onChangeText={(value) => update('summary', value)}
                    onBlur={() => blur('summary')}
                    error={errors.summary}
                    showError={shows('summary')}
                    style={styles.multiline}
                    multiline
                />

                <View style={styles.actions}>
                    <PrimaryButton label="Lưu hồ sơ" onPress={submit} loading={saving} />
                    <SecondaryButton label="Nhập lại" onPress={reset} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Campus.surface,
    },

    content: {
        padding: 20,
        paddingBottom: 40,
        gap: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Campus.text,
    },

    summaryError: {
        padding: 12,
        borderWidth: 1,
        borderColor: Campus.danger,
        borderRadius: 8,
        backgroundColor: '#fdecea',
    },

    summaryErrorText: {
        color: Campus.danger,
        fontSize: 14,
        lineHeight: 20,
    },

    savedBox: {
        padding: 12,
        borderWidth: 1,
        borderColor: Campus.primary,
        borderRadius: 8,
        backgroundColor: '#e1f0f5',
    },

    savedText: {
        color: Campus.primary,
        fontSize: 14,
        fontWeight: '600',
    },

    multiline: {
        minHeight: 96,
        paddingTop: 12,
        textAlignVertical: 'top',
    },

    actions: {
        gap: 12,
        marginTop: 8,
    },
});
