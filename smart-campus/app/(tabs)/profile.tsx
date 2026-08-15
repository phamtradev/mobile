import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/ui/button';
import { Campus, MIN_TARGET } from '@/constants/theme';
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
    const [error, setError] = useState<string | null>(null);

    function update(field: ProfileField, value: string) {
        setDraft((current) => ({ ...current, [field]: value }));
    }

    function submit() {
        const invalid = Object.values(draft).some((value) => value.trim().length === 0);
        setError(invalid ? 'Dữ liệu không hợp lệ' : null);
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

                <Text style={styles.label}>Họ và tên</Text>
                <TextInput
                    style={styles.input}
                    value={draft.fullName}
                    onChangeText={(value) => update('fullName', value)}
                />

                <Text style={styles.label}>Mã số sinh viên</Text>
                <TextInput
                    style={styles.input}
                    value={draft.studentId}
                    onChangeText={(value) => update('studentId', value)}
                    keyboardType="number-pad"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={draft.email}
                    onChangeText={(value) => update('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    value={draft.phone}
                    onChangeText={(value) => update('phone', value)}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Địa chỉ liên hệ</Text>
                <TextInput
                    style={styles.input}
                    value={draft.address}
                    onChangeText={(value) => update('address', value)}
                />

                <Text style={styles.label}>Ngày sinh</Text>
                <TextInput
                    style={styles.input}
                    value={draft.birthDate}
                    onChangeText={(value) => update('birthDate', value)}
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor={Campus.textMuted}
                />

                <Text style={styles.label}>Giới thiệu bản thân</Text>
                <TextInput
                    style={[styles.input, styles.multiline]}
                    value={draft.summary}
                    onChangeText={(value) => update('summary', value)}
                    multiline
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <View style={styles.actions}>
                    <PrimaryButton label="Lưu hồ sơ" onPress={submit} />
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
        gap: 8,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Campus.text,
        marginBottom: 8,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Campus.text,
    },

    input: {
        minHeight: MIN_TARGET,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Campus.border,
        borderRadius: 8,
        color: Campus.text,
        fontSize: 16,
    },

    multiline: {
        minHeight: 80,
        paddingTop: 12,
        textAlignVertical: 'top',
    },

    error: {
        color: Campus.danger,
        fontSize: 14,
    },

    actions: {
        marginTop: 8,
    },
});
