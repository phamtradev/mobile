import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

type PressableButtonProps = {
  text: string;
  textLoading: string;
  onPress: () => void;
  isLoading: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function PressableButton({
  text,
  textLoading,
  onPress,
  isLoading,
  disabled = false,
  style,
}: PressableButtonProps) {
  const isDisabled = isLoading || disabled;

  return (
    <Pressable
      accessibilityHint={`Thực hiện hành động ${text.toLowerCase()}`}
      accessibilityLabel={text}
      accessibilityRole="button"
      accessibilityState={{ busy: isLoading, disabled: isDisabled }}
      disabled={isDisabled}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}>
      {({ pressed }) =>
        isLoading ? (
          <>
            <ActivityIndicator color="#FFFFFF" size="small" />
            <Text style={styles.text}>{textLoading}</Text>
          </>
        ) : (
          <Text style={styles.text}>{pressed ? `Đang nhấn ${text}` : text}</Text>
        )
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    minWidth: 48,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  disabled: {
    backgroundColor: '#98A2B3',
    opacity: 0.72,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
