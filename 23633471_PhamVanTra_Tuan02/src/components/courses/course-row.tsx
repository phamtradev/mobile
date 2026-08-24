import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, Colors, MinTouchTarget, Spacing } from '@/constants/theme';
import { Course } from '@/data/courses';

interface CourseRowProps {
  course: Course;
  onPress: (course: Course) => void;
}

export function CourseRow({ course, onPress }: CourseRowProps) {
  return (
    <Pressable
      onPress={() => onPress(course)}
      accessibilityRole="button"
      accessibilityLabel={`${course.title}, giảng viên ${course.instructor}`}
      accessibilityHint="Xem thông tin chi tiết khóa học"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title} numberOfLines={2}>
        {course.title}
      </Text>
      <Text style={styles.instructor}>Giảng viên: {course.instructor}</Text>

      <View style={styles.footer}>
        <Text style={styles.category}>{course.category}</Text>
        <Text style={styles.students}>{course.students} sinh viên</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: MinTouchTarget,
    backgroundColor: Brand.surface,
    borderWidth: 1,
    borderColor: Brand.surfaceBorder,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  cardPressed: {
    backgroundColor: Brand.avatarBackground,
    borderColor: Brand.primary,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: Colors.light.text,
  },
  instructor: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  category: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: Brand.primary,
    backgroundColor: Brand.avatarBackground,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.one,
    overflow: 'hidden',
  },
  students: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.light.textSecondary,
  },
});
