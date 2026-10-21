import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButton from '@/components/action-button';
import StudentCard from '@/components/cart-student';
import Header from '@/components/header';
import ProfileCard from '@/components/profile-card';
import SearchField from '@/components/search-field';

export default function Homework() {
  const [searchText, setSearchText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    Alert.alert('Thành công', 'Hồ sơ sinh viên đã được lưu.');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.screen}>
          <Header />
          <View style={styles.content}>
            <ProfileCard />
            <SearchField
              onChangeText={setSearchText}
              placeholder="Tìm kiếm thông tin..."
              value={searchText}
            />
            {searchText ? (
              <Text accessibilityLiveRegion="polite" style={styles.searchResult}>
                Đang tìm: {searchText}
              </Text>
            ) : null}
            <StudentCard />
            <ActionButton
              disabled={isSaved}
              onPress={handleSave}
              text={isSaved ? 'ĐÃ LƯU HỒ SƠ' : 'LƯU HỒ SƠ'}
            />
            {isSaved ? (
              <Text accessibilityLiveRegion="polite" style={styles.savedText}>
                Hồ sơ đã được lưu thành công.
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF0F7',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  screen: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    gap: 18,
    padding: 20,
  },
  searchResult: {
    color: '#475467',
    marginTop: -10,
  },
  savedText: {
    color: '#157F3D',
    fontWeight: '600',
    textAlign: 'center',
  },
});
