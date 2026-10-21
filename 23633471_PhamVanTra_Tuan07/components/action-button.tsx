import { Pressable, StyleSheet, Text } from 'react-native';

type ActionButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function ActionButton({ text, onPress, disabled = false }: ActionButtonProps) {
  return (
    <Pressable
      accessibilityHint="Lưu thông tin hồ sơ sinh viên"
      accessibilityLabel={text}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      {({ pressed }) => (
        <Text style={styles.text}>{pressed && !disabled ? 'ĐANG NHẤN...' : text}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    backgroundColor: '#1976D2',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    backgroundColor: '#98A2B3',
    opacity: 0.7,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
