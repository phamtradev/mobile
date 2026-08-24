import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand, Colors, MinTouchTarget, Spacing, StatusColors } from '@/constants/theme';
import { Student } from '@/data/students';
import { getInitials } from '@/utils/get-initials';

interface StudentRowProps {
  student: Student;
  onPress: (student: Student) => void;
}

export function StudentRow({ student, onPress }: StudentRowProps) {
  const isActive = student.status === 'Đang học';
  const statusColors = isActive ? StatusColors.active : StatusColors.paused;

  return (
    <Pressable
      onPress={() => onPress(student)}
      accessibilityRole="button"
      accessibilityLabel={`${student.fullName}, mã số ${student.studentId}, lớp ${student.className}, ${student.status}`}
      accessibilityHint="Xem thông tin chi tiết sinh viên"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(student.fullName)}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {student.fullName}
        </Text>
        <Text style={styles.meta}>
          {student.studentId} · {student.className}
        </Text>
      </View>

      <View style={[styles.statusBadge, { backgroundColor: statusColors.background, borderColor: statusColors.border }]}>
        <Text style={[styles.statusText, { color: statusColors.text }]}>{student.status}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: MinTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Brand.surface,
    borderWidth: 1,
    borderColor: Brand.surfaceBorder,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  cardPressed: {
    backgroundColor: Brand.avatarBackground,
    borderColor: Brand.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Brand.avatarBackground,
    borderWidth: 1,
    borderColor: Brand.avatarBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: Brand.primary,
  },
  content: {
    flex: 1,
    gap: Spacing.half,
  },
  name: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.light.text,
  },
  meta: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.light.textSecondary,
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
});
