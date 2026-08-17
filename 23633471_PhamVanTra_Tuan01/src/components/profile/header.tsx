import { Image, StyleSheet, Text, View } from 'react-native';

import { Brand, Spacing } from '@/constants/theme';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'SmartCampus' }: HeaderProps) {
  return (
    <View style={styles.bar}>
      <Image
        source={require('@/assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
}

const LOGO_SIZE = 28;

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: Brand.primary,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: Spacing.one,
  },
  title: {
    color: Brand.onPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
});
