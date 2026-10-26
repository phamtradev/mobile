import { isAxiosError } from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { useAuth } from '@/store/auth-store';

type Mode = 'login' | 'register';

type FormErrors = {
    name?: string;
    email?: string;
    password?: string;
    form?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVER_MESSAGES: Record<string, string> = {
    'Cannot find user': 'Email này chưa được đăng ký.',
    'Incorrect password': 'Mật khẩu không đúng.',
    'Email already exists': 'Email này đã được đăng ký.',
    'Email and password are required': 'Vui lòng nhập đủ email và mật khẩu.',
    'Email format is invalid': 'Email không đúng định dạng.',
    'Password is too short': 'Mật khẩu quá ngắn.',
};

function serverMessage(error: unknown) {
    if (isAxiosError(error)) {
        if (!error.response) return 'Không kết nối được server. Hãy chạy json-server trước.';
        const data = error.response.data;
        if (typeof data === 'string' && data) return SERVER_MESSAGES[data] ?? data;
    }
    return 'Không xử lý được, vui lòng thử lại.';
}

export default function LoginScreen() {
    const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
    const { login, register } = useAuth();

    const [mode, setMode] = useState<Mode>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);

    const switchMode = (next: Mode) => {
        setMode(next);
        setErrors({});
    };

    const submit = async () => {
        const next: FormErrors = {};
        if (mode === 'register' && name.trim().length < 2)
            next.name = 'Họ tên cần ít nhất 2 ký tự.';
        if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Email không đúng định dạng.';
        if (password.length < 6) next.password = 'Mật khẩu cần ít nhất 6 ký tự.';

        setErrors(next);
        if (Object.keys(next).length) return;

        setSubmitting(true);
        try {
            if (mode === 'login') await login(email.trim(), password);
            else await register(name.trim(), email.trim(), password);
            router.replace(returnTo === 'checkout' ? '/checkout' : '/');
        } catch (error) {
            setErrors({ form: serverMessage(error) });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.select({ ios: 'padding', default: undefined })}>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                    <View style={styles.tabs}>
                        {(['login', 'register'] as const).map((item) => (
                            <Pressable
                                key={item}
                                onPress={() => switchMode(item)}
                                style={[styles.tab, mode === item && styles.tabActive]}
                                accessibilityRole="tab"
                                accessibilityState={{ selected: mode === item }}>
                                <Text style={[styles.tabText, mode === item && styles.tabTextActive]}>
                                    {item === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <Text style={styles.title}>
                        {mode === 'login' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}
                    </Text>
                    <Text style={styles.subtitle}>
                        {mode === 'login'
                            ? 'Token lưu vào AsyncStorage, lần sau mở app tự đăng nhập.'
                            : 'Đăng ký xong sẽ được đăng nhập ngay.'}
                    </Text>

                    {mode === 'register' ? (
                        <Field
                            label="Họ và tên"
                            value={name}
                            onChangeText={setName}
                            error={errors.name}
                            placeholder="Nguyễn Văn A"
                            autoCapitalize="words"
                        />
                    ) : null}

                    <Field
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        error={errors.email}
                        placeholder="ten@sv.iuh.edu.vn"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Field
                        label="Mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        error={errors.password}
                        placeholder="Ít nhất 6 ký tự"
                        secureTextEntry
                    />

                    {errors.form ? (
                        <View style={styles.formError} accessibilityLiveRegion="polite">
                            <Text style={styles.formErrorText}>{errors.form}</Text>
                        </View>
                    ) : null}

                    <Pressable
                        onPress={submit}
                        disabled={submitting}
                        style={[styles.submit, submitting && styles.disabled]}
                        accessibilityRole="button"
                        accessibilityState={{ disabled: submitting, busy: submitting }}>
                        <Text style={styles.submitText}>
                            {submitting ? 'Đang xử lý…' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

function Field({
    label,
    error,
    ...inputProps
}: { label: string; error?: string } & React.ComponentProps<typeof TextInput>) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                {...inputProps}
                style={[styles.input, error && styles.inputError]}
                placeholderTextColor="#94a3b8"
                accessibilityLabel={label}
            />
            {error ? (
                <Text style={styles.error} accessibilityLiveRegion="polite">
                    {error}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    flex: { flex: 1 },
    content: { padding: 16, paddingBottom: 32 },

    tabs: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginBottom: 24,
    },
    tab: { flex: 1, minHeight: 46, alignItems: 'center', justifyContent: 'center' },
    tabActive: { backgroundColor: '#1e3a8a' },
    tabText: { fontSize: 14, fontWeight: '600', color: '#64748b' },
    tabTextActive: { color: '#fff' },

    title: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
    subtitle: { fontSize: 13, color: '#64748b', marginTop: 4, marginBottom: 24 },

    field: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', color: '#0f172a', marginBottom: 4 },
    input: {
        minHeight: 46,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        backgroundColor: '#fff',
        color: '#0f172a',
    },
    inputError: { borderColor: '#dc2626' },
    error: { marginTop: 4, fontSize: 13, color: '#dc2626' },

    formError: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fee2e2',
        marginBottom: 16,
    },
    formErrorText: { fontSize: 14, fontWeight: '600', color: '#dc2626' },

    submit: {
        minHeight: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#1e3a8a',
    },
    disabled: { backgroundColor: '#94a3b8' },
    submitText: { color: '#fff', fontWeight: '700' },
});
