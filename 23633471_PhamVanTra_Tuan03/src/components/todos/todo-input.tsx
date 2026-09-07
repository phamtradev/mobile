import { Button, StyleSheet, TextInput, View } from 'react-native';

import { useAppTheme } from '@/context/theme-context';

interface TodoInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
  placeholder?: string;
  buttonTitle?: string;
}

export function TodoInput({
  value,
  onChangeText,
  onAdd,
  placeholder = 'Tên công việc',
  buttonTitle = 'Thêm',
}: TodoInputProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        onSubmitEditing={onAdd}
      />

      <Button title={buttonTitle} onPress={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
});
