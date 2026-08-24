import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

interface EmptyStateProps {
  query: string;
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Không tìm thấy sinh viên</Text>
      <Text style={styles.text}>Không có sinh viên phù hợp với “{query.trim()}”.</Text>
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
