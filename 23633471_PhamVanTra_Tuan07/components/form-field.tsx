import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';

interface FormFieldProps extends TextInputProps {
    label: string;
    error?: string;
}

export default function FormField({ label, error, ...inputProps }: FormFieldProps) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                {...inputProps}
                style={[styles.input, error ? styles.inputError : null]}
                placeholderTextColor={Brand.textMuted}
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
    field: { marginBottom: Spacing.three },
    label: { fontSize: 14, fontWeight: '600', color: Brand.text, marginBottom: Spacing.one },
    input: {
        minHeight: MinTouchTarget,
        paddingHorizontal: Spacing.three,
        borderWidth: 1,
        borderColor: Brand.border,
        borderRadius: Spacing.two,
        backgroundColor: Brand.surface,
        fontSize: 15,
        color: Brand.text,
    },
    inputError: { borderColor: Brand.danger },
    error: { marginTop: Spacing.one, fontSize: 13, color: Brand.danger },
});
