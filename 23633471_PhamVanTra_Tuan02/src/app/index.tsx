import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand, Colors, MaxContentWidth, MinTouchTarget, Spacing } from '@/constants/theme';

interface MenuItem {
  href: Href;
  title: string;
  description: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    href: '/courses',
    title: 'Course Catalog',
    description: 'Danh sách khóa học, tìm kiếm theo tên, giảng viên hoặc danh mục',
  },
  {
    href: '/students',
    title: 'Student Directory',
    description: 'Danh bạ sinh viên theo khoa, tìm kiếm theo tên, mã số hoặc lớp',
  },
];

function MenuCard({ href, title, description }: MenuItem) {
  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={description}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </Pressable>
    </Link>
  );
}

export default function MenuScreen() {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <Text style={styles.title} accessibilityRole="header">
            Bài tập React Native
          </Text>
          <Text style={styles.subtitle}>Chọn một màn hình để xem</Text>

          <View style={styles.menu}>
            {MENU_ITEMS.map((item) => (
              <MenuCard key={item.title} {...item} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.three,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
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
    marginBottom: Spacing.two,
  },
  menu: {
    gap: Spacing.three,
  },
  card: {
    minHeight: MinTouchTarget,
    backgroundColor: Brand.surface,
    borderWidth: 1,
    borderColor: Brand.surfaceBorder,
    borderRadius: Spacing.two,
    padding: Spacing.four,
    gap: Spacing.one,
  },
  cardPressed: {
    backgroundColor: Brand.avatarBackground,
    borderColor: Brand.primary,
  },
  cardTitle: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '700',
    color: Brand.primary,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
  },
});
