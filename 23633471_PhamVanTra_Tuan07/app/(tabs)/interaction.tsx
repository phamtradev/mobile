import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PressableButton from '@/components/pressible-button';

export default function Interaction() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Thành công', 'Thông tin đã được xác nhận.');
    }, 1200);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      Alert.alert('Thành công', 'Dữ liệu đã được xóa.');
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text accessibilityRole="header" style={styles.title}>
            Phản hồi của Pressable
          </Text>
          <Text style={styles.description}>
            Giữ nút để xem trạng thái đang nhấn. Sau khi chạm, nút sẽ chuyển sang trạng thái bận và
            vô hiệu hóa tạm thời.
          </Text>
          <View style={styles.buttons}>
            <PressableButton
              isLoading={isSubmitting}
              onPress={handleSubmit}
              text="Xác nhận"
              textLoading="Đang xác nhận"
            />
            <PressableButton
              isLoading={isDeleting}
              onPress={handleDelete}
              style={styles.deleteButton}
              text="Xóa"
              textLoading="Đang xóa"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 420,
    justifyContent: 'center',
  },
  content: {
    gap: 16,
    padding: 24,
  },
  title: {
    color: '#172033',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  buttons: {
    gap: 16,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
  },
});
