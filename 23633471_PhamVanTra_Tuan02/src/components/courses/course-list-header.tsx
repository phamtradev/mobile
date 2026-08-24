import { StyleSheet, Text, View } from 'react-native';

import { SearchField } from '@/components/courses/search-field';
import { Colors, Spacing } from '@/constants/theme';

interface CourseListHeaderProps {
  query: string;
  onChangeQuery: (text: string) => void;
  resultCount: number;
}

export function CourseListHeader({ query, onChangeQuery, resultCount }: CourseListHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Course Catalog
      </Text>
      <Text style={styles.subtitle}>Khám phá các khóa học đang mở</Text>

      <SearchField
        value={query}
        onChangeText={onChangeQuery}
        placeholder="Tìm theo tên, giảng viên hoặc danh mục"
        accessibilityLabel="Tìm kiếm khóa học theo tên, giảng viên hoặc danh mục"
      />

      <Text style={styles.resultText}>Tìm thấy {resultCount} khóa học</Text>
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
