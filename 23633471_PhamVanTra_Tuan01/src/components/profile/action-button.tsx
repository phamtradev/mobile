import { Pressable, StyleSheet, Text } from 'react-native';

import { Brand, MinTouchTarget, Spacing } from '@/constants/theme';

type Variant = 'primary' | 'secondary';

interface ActionButtonProps {
  label: string;
  busyLabel?: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  busy?: boolean;
  accessibilityLabel: string;
  accessibilityHint: string;
}

export function ActionButton({
  label,
  busyLabel,
  onPress,
  variant = 'primary',
  disabled = false,
  busy = false,
  accessibilityLabel,
  accessibilityHint,
}: ActionButtonProps) {
  const blocked = disabled || busy;
  const skin = variant === 'primary' ? primarySkin : secondarySkin;
  const displayLabel = busy ? busyLabel ?? `${label}…` : label;

  return (
    <Pressable
      onPress={onPress}
      disabled={blocked}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: blocked, busy }}
      style={({ pressed }) => [
        styles.base,
        skin.container,
        pressed && !blocked && skin.pressed,
        pressed && !blocked && styles.pressedShape,
        blocked && styles.disabledShape,
        blocked && skin.disabled,
      ]}
    >
      <Text style={[styles.label, skin.label, blocked && styles.labelDisabled]}>{displayLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: MinTouchTarget,
    borderRadius: Spacing.two,
    borderWidth: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedShape: {
    transform: [{ scale: 0.97 }],
  },
  disabledShape: {
    borderStyle: 'dashed',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  labelDisabled: {
    color: Brand.disabledText,
  },
});

const primarySkin = StyleSheet.create({
  container: {
    backgroundColor: Brand.primary,
    borderColor: Brand.primary,
  },
  pressed: {
    backgroundColor: Brand.primaryPressed,
    borderColor: Brand.primaryPressed,
  },
  disabled: {
    backgroundColor: Brand.disabledBackground,
    borderColor: Brand.disabledBackground,
  },
  label: {
    color: Brand.onPrimary,
  },
});

const secondarySkin = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderColor: Brand.primary,
  },
  pressed: {
    backgroundColor: Brand.surface,
  },
  disabled: {
    backgroundColor: '#FFFFFF',
    borderColor: Brand.disabledBackground,
  },
  label: {
    color: Brand.primary,
  },
});
