import { StyleSheet, Text, View } from 'react-native';

import { Brand } from '@/constants/theme';

interface AvatarProps {
  label: string;
  size?: number;
}

const DEFAULT_SIZE = 64;

export function Avatar({ label, size = DEFAULT_SIZE }: AvatarProps) {
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Brand.avatarBackground,
    borderWidth: 2,
    borderColor: Brand.avatarBorder,
  },
  label: {
    color: Brand.primary,
    fontWeight: '700',
    fontSize: 18,
  },
});
