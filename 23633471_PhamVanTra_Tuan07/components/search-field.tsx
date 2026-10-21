import { StyleSheet, TextInput } from 'react-native';

type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
};

export default function SearchField({ value, onChangeText, placeholder }: SearchFieldProps) {
  return (
    <TextInput
      accessibilityLabel="Tìm kiếm thông tin sinh viên"
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#8A94A6"
      returnKeyType="search"
      style={styles.input}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    backgroundColor: '#F7F8FA',
    borderColor: '#C8D0DC',
    borderRadius: 10,
    borderWidth: 1,
    color: '#172033',
    fontSize: 16,
    paddingHorizontal: 16,
  },
});
