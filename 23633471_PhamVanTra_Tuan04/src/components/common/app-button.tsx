import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';

interface AppButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    loading?: boolean;
}

export default function AppButton({
    label,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
}: AppButtonProps) {
    const blocked = disabled || loading;
    const secondary = variant === 'secondary';

    return (
        <Pressable
            onPress={onPress}
            disabled={blocked}
            accessibilityRole="button"
            accessibilityState={{ disabled, busy: loading }}
            style={({ pressed }) => [
                styles.base,
                secondary ? styles.secondary : styles.primary,
                pressed && (secondary ? styles.secondaryPressed : styles.primaryPressed),
                disabled && styles.disabled,
            ]}
        >
            {/* Nhãn giữ nguyên chỗ khi loading để nút không co lại,
                vùng chạm vì thế không đổi kích thước giữa chừng. */}
            <Text
                style={[
                    styles.label,
                    secondary ? styles.labelSecondary : styles.labelPrimary,
                    disabled && styles.labelDisabled,
                    loading && styles.labelHidden,
                ]}
            >
                {label}
            </Text>

            {loading ? (
                <View style={styles.spinner} pointerEvents="none">
                    <ActivityIndicator color={secondary ? Brand.primary : Brand.onPrimary} />
                </View>
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        minHeight: MinTouchTarget,
        paddingHorizontal: Spacing.four,
        paddingVertical: Spacing.two,
        borderRadius: Spacing.two,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    primary: { backgroundColor: Brand.primary, borderColor: Brand.primary },
    primaryPressed: { backgroundColor: Brand.primaryPressed, borderColor: Brand.primaryPressed },
    secondary: { backgroundColor: '#FFFFFF', borderColor: Brand.primary },
    secondaryPressed: { backgroundColor: Brand.surface },

    disabled: { backgroundColor: Brand.disabledBackground, borderColor: Brand.disabledBackground },

    label: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
    labelPrimary: { color: Brand.onPrimary },
    labelSecondary: { color: Brand.primary },
    labelDisabled: { color: Brand.disabledText },
    labelHidden: { opacity: 0 },

    spinner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
