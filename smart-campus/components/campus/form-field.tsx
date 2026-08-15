import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { Campus, MIN_TARGET } from '@/constants/theme';

interface FormFieldProps extends TextInputProps {
    label: string;
    hint?: string;
    error?: string;
    showError?: boolean;
}

const FormField = forwardRef<TextInput, FormFieldProps>(function FormField(
    { label, hint, error, showError = false, style, ...inputProps },
    ref,
) {
    const invalid = Boolean(error) && showError;

    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>

            {hint ? <Text style={styles.hint}>{hint}</Text> : null}

            <TextInput
                ref={ref}
                style={[styles.input, invalid && styles.inputInvalid, style]}
                placeholderTextColor={Campus.textMuted}
                accessibilityLabel={label}
                accessibilityHint={hint}
                aria-invalid={invalid}
                {...inputProps}
            />

            {invalid ? (
                <View style={styles.errorRow} accessibilityLiveRegion="polite">
                    <Text style={styles.errorMark} accessibilityElementsHidden>
                        ⚠
                    </Text>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : null}
        </View>
    );
});

export default FormField;

const styles = StyleSheet.create({
    field: {
        gap: 6,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: Campus.text,
    },

    hint: {
        fontSize: 13,
        color: Campus.textMuted,
    },

    input: {
        minHeight: MIN_TARGET,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Campus.border,
        borderRadius: 8,
        backgroundColor: Campus.surface,
        color: Campus.text,
        fontSize: 16,
    },

    inputInvalid: {
        borderColor: Campus.danger,
        borderWidth: 2,
    },

    errorRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 6,
    },

    errorMark: {
        fontSize: 14,
        color: Campus.danger,
    },

    errorText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 19,
        color: Campus.danger,
    },
});
