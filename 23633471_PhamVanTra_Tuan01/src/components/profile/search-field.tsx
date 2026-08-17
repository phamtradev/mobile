import { StyleSheet, TextInput } from 'react-native';

import { Brand, Colors, MinTouchTarget, Spacing } from '@/constants/theme';

interface SearchFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  accessibilityLabel: string;
}

export function SearchField({ value, onChangeText, placeholder, accessibilityLabel }: SearchFieldProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.light.textSecondary}
      style={styles.input}
      accessibilityLabel={accessibilityLabel}
      returnKeyType="search"
      autoCorrect={false}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: MinTouchTarget,
    borderWidth: 1,
    borderColor: Brand.surfaceBorder,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: Colors.light.background,
  },
});
