import { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
    type StyleProp,
    type ViewStyle,
} from 'react-native';

import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { Campus, MIN_TARGET } from '@/constants/theme';

interface ButtonProps {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}

type Variant = 'primary' | 'secondary';

function BaseButton({
    label,
    onPress,
    disabled = false,
    loading = false,
    variant,
    style,
}: ButtonProps & { variant: Variant }) {
    const [focused, setFocused] = useState(false);
    const blocked = disabled || loading;
    const skin = variant === 'primary' ? primary : secondary;

    return (
        <Pressable
            onPress={onPress}
            disabled={blocked}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            accessibilityRole="button"
            accessibilityState={{ disabled, busy: loading }}
            style={({ pressed }) => [
                styles.base,
                skin.container,
                pressed && skin.pressed,
                focused && styles.focused,
                disabled && skin.disabled,
                style,
            ]}
        >
            <Text
                style={[
                    styles.label,
                    skin.label,
                    disabled && styles.labelDisabled,
                    loading && styles.labelHidden,
                ]}
            >
                {label}
            </Text>

            {loading ? (
                <View style={styles.spinnerLayer} pointerEvents="none">
                    <ActivityIndicator color={skin.label.color} />
                </View>
            ) : null}
        </Pressable>
    );
}

export function PrimaryButton(props: ButtonProps) {
    return <BaseButton {...props} variant="primary" />;
}

export function SecondaryButton(props: ButtonProps) {
    return <BaseButton {...props} variant="secondary" />;
}

interface IconButtonProps {
    name: IconSymbolName;
    accessibilityLabel: string;
    onPress: () => void;
    disabled?: boolean;
    selected?: boolean;
}

export function IconButton({
    name,
    accessibilityLabel,
    onPress,
    disabled = false,
    selected = false,
}: IconButtonProps) {
    const [focused, setFocused] = useState(false);

    let tint = Campus.text;
    if (disabled) tint = Campus.disabled;
    else if (selected) tint = Campus.primary;

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ disabled, selected }}
            hitSlop={8}
            style={({ pressed }) => [
                styles.iconButton,
                selected && styles.iconButtonSelected,
                pressed && styles.iconButtonPressed,
                focused && styles.focused,
            ]}
        >
            <IconSymbol name={name} size={24} color={tint} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        minHeight: MIN_TARGET,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },

    labelHidden: {
        opacity: 0,
    },

    labelDisabled: {
        color: Campus.disabled,
    },

    spinnerLayer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },

    focused: {
        borderColor: Campus.focusRing,
        borderWidth: 2,
    },

    iconButton: {
        width: MIN_TARGET,
        height: MIN_TARGET,
        borderRadius: MIN_TARGET / 2,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconButtonPressed: {
        backgroundColor: '#e3e8ea',
    },

    iconButtonSelected: {
        backgroundColor: '#e1f0f5',
    },
});

const primary = StyleSheet.create({
    container: {
        backgroundColor: Campus.primary,
        borderColor: Campus.primary,
    },
    pressed: {
        backgroundColor: '#08536d',
        borderColor: '#08536d',
    },
    disabled: {
        backgroundColor: '#e3e8ea',
        borderColor: Campus.border,
    },
    label: {
        color: Campus.onPrimary,
    },
});

const secondary = StyleSheet.create({
    container: {
        backgroundColor: Campus.surface,
        borderColor: Campus.primary,
    },
    pressed: {
        backgroundColor: '#e1f0f5',
    },
    disabled: {
        backgroundColor: Campus.surface,
        borderColor: Campus.border,
    },
    label: {
        color: Campus.primary,
    },
});
