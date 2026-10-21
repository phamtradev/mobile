import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FormField from '@/components/form-field';
import { Brand, KeyboardBehavior, MinTouchTarget, Spacing } from '@/constants/theme';
import { useAuth } from '@/store/auth-store';

type Mode = 'login' | 'register';

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    form?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 6;

function validate(mode: Mode, name: string, email: string, password: string): FormErrors {
    const errors: FormErrors = {};
    if (mode === 'register' && name.trim().length < 2) errors.name = 'Họ tên cần ít nhất 2 ký tự.';
    if (!email.trim()) errors.email = 'Vui lòng nhập email.';
    else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Email không đúng định dạng.';
    if (password.length < MIN_PASSWORD) errors.password = 'Mật khẩu cần ít nhất 6 ký tự.';
    return errors;
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
        const found = validate(mode, name, email, password);
        setErrors(found);
        if (Object.keys(found).length) return;

        setSubmitting(true);
        try {
            if (mode === 'login') await login(email.trim(), password);
            else await register(name.trim(), email.trim(), password);
            router.replace(returnTo === 'checkout' ? '/checkout' : '/');
        } catch (error) {
            setErrors({ form: error instanceof Error ? error.message : 'Không thể xử lý, thử lại sau.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe} edges={['bottom']}>
            <KeyboardAvoidingView style={styles.flex} behavior={KeyboardBehavior}>
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
                            ? 'Phiên đăng nhập được lưu lại, lần sau mở app không cần nhập lại.'
                            : 'Đăng ký xong sẽ được đăng nhập ngay.'}
                    </Text>

                    {mode === 'register' ? (
                        <FormField
                            label="Họ và tên"
                            value={name}
                            onChangeText={setName}
                            error={errors.name}
                            placeholder="Nguyễn Văn A"
                            autoCapitalize="words"
                        />
                    ) : null}

                    <FormField
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        error={errors.email}
                        placeholder="ten@sv.iuh.edu.vn"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <FormField
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
                        style={({ pressed }) => [
                            styles.submit,
                            pressed && !submitting && styles.submitPressed,
                            submitting && styles.submitDisabled,
                        ]}
                        accessibilityRole="button"
                        accessibilityState={{ disabled: submitting, busy: submitting }}>
                        <Text style={styles.submitText}>
                            {submitting ? 'Đang xử lý…' : mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                        </Text>
                    </Pressable>

                    {mode === 'login' ? (
                        <Text style={styles.hint}>Tài khoản thử: tra.23633471@sv.iuh.edu.vn / 123456</Text>
                    ) : null}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    flex: { flex: 1 },
    content: { padding: Spacing.three, paddingBottom: Spacing.five },

    tabs: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.two,
        backgroundColor: Brand.surface,
        overflow: 'hidden',
        marginBottom: Spacing.four,
    },
    tab: { flex: 1, minHeight: MinTouchTarget, alignItems: 'center', justifyContent: 'center' },
    tabActive: { backgroundColor: Brand.navy },
    tabText: { fontSize: 14, fontWeight: '600', color: Brand.textMuted },
    tabTextActive: { color: Brand.onNavy },

    title: { fontSize: 20, fontWeight: '700', color: Brand.text },
    subtitle: { fontSize: 13, color: Brand.textMuted, marginTop: Spacing.one, marginBottom: Spacing.four },

    formError: {
        padding: Spacing.three,
        borderRadius: Spacing.two,
        backgroundColor: Brand.dangerLight,
        marginBottom: Spacing.three,
    },
    formErrorText: { fontSize: 14, color: Brand.danger, fontWeight: '600' },

    submit: {
        minHeight: MinTouchTarget,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Spacing.two,
        backgroundColor: Brand.navy,
    },
    submitPressed: { backgroundColor: Brand.indigo },
    submitDisabled: { backgroundColor: Brand.disabled },
    submitText: { fontSize: 15, fontWeight: '700', color: Brand.onNavy },

    hint: { fontSize: 12, color: Brand.textMuted, textAlign: 'center', marginTop: Spacing.three },
});
