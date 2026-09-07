import { Link, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Exercise {
  href: Href;
  title: string;
  description: string;
}

const EXERCISES: Exercise[] = [
  {
    href: '/bai1-usestate',
    title: 'Bài 1 - useState',
    description: 'Form nhập họ tên và hiển thị lời chào',
  },
  {
    href: '/bai2-useeffect',
    title: 'Bài 2 - useEffect',
    description: 'Theo dõi trạng thái kết nối giả lập',
  },
  {
    href: '/bai3-usecontext',
    title: 'Bài 3 - useContext',
    description: 'Chia sẻ thông tin người dùng',
  },
  {
    href: '/bai4-usereducer',
    title: 'Bài 4 - useReducer',
    description: 'Quản lý form đăng nhập',
  },
  {
    href: '/bai5-usememo',
    title: 'Bài 5 - useMemo và useCallback',
    description: 'Tìm kiếm và tính tổng sản phẩm',
  },
  {
    href: '/bai6-todo',
    title: 'Bài 6 - Bài tập tổng hợp',
    description: 'Ứng dụng quản lý công việc cá nhân',
  },
];

export default function MenuScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Chương 3 - Hook trong React Native</Text>
        <Text style={styles.subtitle}>Chọn một bài tập để xem</Text>

        {EXERCISES.map((exercise) => (
          <Link key={exercise.title} href={exercise.href} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardTitle}>{exercise.title}</Text>
              <Text style={styles.cardDescription}>{exercise.description}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  card: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 16,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
  },
});
