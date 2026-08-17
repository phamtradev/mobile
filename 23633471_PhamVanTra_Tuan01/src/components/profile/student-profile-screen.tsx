import { useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/profile/action-button';
import { Avatar } from '@/components/profile/avatar';
import { Header } from '@/components/profile/header';
import { InfoRow } from '@/components/profile/info-row';
import { SearchField } from '@/components/profile/search-field';
import { Brand, Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { student } from '@/data/student';

const SAVE_DURATION_MS = 900;

export function StudentProfileScreen() {
  const [searchText, setSearchText] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  function handleSave() {
    setSavedMessage(null);
    setSaving(true);
    saveTimeoutRef.current = setTimeout(() => {
      setSaving(false);
      setSavedMessage('Đã lưu hồ sơ thành công.');
    }, SAVE_DURATION_MS);
  }

  function handleClearSearch() {
    setSearchText('');
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={[styles.content, Platform.OS === 'web' && styles.webTopSpacing]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Header />

          <View style={styles.identityRow}>
            <Avatar label="SV" />
            <View style={styles.identityText}>
              <Text style={styles.name} numberOfLines={1}>
                {student.fullName}
              </Text>
              <Text style={styles.studentId}>Mã SV: {student.studentId}</Text>
            </View>
          </View>

          <SearchField
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              setSavedMessage(null);
            }}
            placeholder="Tìm kiếm thông tin..."
            accessibilityLabel="Tìm kiếm thông tin sinh viên"
          />

          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle} accessibilityRole="header">
              Thông tin sinh viên
            </Text>
            <InfoRow label="Email" value={student.email} />
            <InfoRow label="Lớp" value={student.className} />
          </View>

          <View style={styles.actions}>
            <ActionButton
              label="LƯU HỒ SƠ"
              busyLabel="ĐANG LƯU..."
              onPress={handleSave}
              busy={saving}
              accessibilityLabel="Lưu hồ sơ sinh viên"
              accessibilityHint="Lưu lại các thay đổi trên hồ sơ hiện tại"
            />
            <ActionButton
              label="HUỶ TÌM KIẾM"
              variant="secondary"
              onPress={handleClearSearch}
              disabled={searchText.length === 0}
              accessibilityLabel="Huỷ nội dung tìm kiếm"
              accessibilityHint="Xoá nội dung đã nhập trong ô tìm kiếm phía trên"
            />
            {savedMessage ? <Text style={styles.savedMessage}>{savedMessage}</Text> : null}
          </View>
        </ScrollView>
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
    padding: Spacing.three,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },
  webTopSpacing: {
    paddingTop: Spacing.six + Spacing.three,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  identityText: {
    flexShrink: 1,
    gap: Spacing.half,
  },
  name: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    color: Colors.light.text,
  },
  studentId: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
  },
  infoCard: {
    backgroundColor: Brand.surface,
    borderWidth: 1,
    borderColor: Brand.surfaceBorder,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  infoCardTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    color: Colors.light.text,
  },
  actions: {
    gap: Spacing.two,
  },
  savedMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: Brand.primary,
    textAlign: 'center',
  },
});
