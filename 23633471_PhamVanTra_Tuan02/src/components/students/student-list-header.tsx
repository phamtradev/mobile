import { StyleSheet, Text, View } from 'react-native';

import { SearchField } from '@/components/students/search-field';
import { Colors, Spacing } from '@/constants/theme';

interface StudentListHeaderProps {
  query: string;
  onChangeQuery: (text: string) => void;
  totalStudents: number;
}

export function StudentListHeader({ query, onChangeQuery, totalStudents }: StudentListHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Student Directory
      </Text>
      <Text style={styles.subtitle}>Danh bạ sinh viên theo khoa</Text>

      <SearchField
        value={query}
        onChangeText={onChangeQuery}
        placeholder="Tìm tên, mã sinh viên hoặc lớp"
        accessibilityLabel="Tìm kiếm sinh viên theo tên, mã số hoặc lớp"
      />

      <Text style={styles.resultText}>Tìm thấy {totalStudents} sinh viên</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
  },
  resultText: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.light.textSecondary,
  },
});
