import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Bai1UseStateScreen() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const ageNumber = Number(age);
  const isUnderage = age.trim() !== '' && !Number.isNaN(ageNumber) && ageNumber < 18;

  const handleClear = () => {
    setFullName('');
    setAge('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Họ tên</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nhập họ tên"
        style={styles.input}
      />

      <Text style={styles.label}>Tuổi</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Nhập tuổi"
        keyboardType="number-pad"
        style={styles.input}
      />

      <Text style={styles.greeting}>
        {fullName ? `Xin chào, ${fullName}!` : 'Vui lòng nhập họ tên'}
      </Text>

      {isUnderage ? <Text style={styles.warning}>Bạn chưa đủ 18 tuổi.</Text> : null}

      <Button title="Xóa dữ liệu" onPress={handleClear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
  },
  label: {
    fontSize: 14,
    color: '#666666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 12,
  },
  greeting: {
    fontSize: 20,
    marginTop: 8,
  },
  warning: {
    fontSize: 16,
    color: '#cc0000',
  },
});
