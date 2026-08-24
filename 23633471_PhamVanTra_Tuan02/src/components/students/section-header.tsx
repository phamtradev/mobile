import { StyleSheet, Text, View } from 'react-native';

import { Brand, Colors, Spacing } from '@/constants/theme';

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: Brand.primary,
  },
});
