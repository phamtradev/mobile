import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Không tìm thấy khóa học</Text>
      <Text style={styles.text}>Hãy thử tìm kiếm bằng một từ khóa khác.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.six,
    gap: Spacing.one,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  text: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
});
