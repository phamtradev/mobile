import { useMemo, useState } from 'react';
import { Alert, Platform, SectionList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/students/empty-state';
import { SectionHeader } from '@/components/students/section-header';
import { StudentListHeader } from '@/components/students/student-list-header';
import { StudentRow } from '@/components/students/student-row';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { Student, studentSections } from '@/data/students';
import { filterStudentSections } from '@/utils/filter-student-sections';

export function StudentDirectoryScreen() {
  const [query, setQuery] = useState('');
  const filteredSections = useMemo(() => filterStudentSections(studentSections, query), [query]);
  const totalStudents = filteredSections.reduce((total, section) => total + section.data.length, 0);

  function openStudent(student: Student) {
    Alert.alert(
      student.fullName,
      `Mã sinh viên: ${student.studentId}\nLớp: ${student.className}\nTrạng thái: ${student.status}`,
    );
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <SectionList
          sections={filteredSections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StudentRow student={item} onPress={openStudent} />}
          renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
          ListHeaderComponent={
            <StudentListHeader query={query} onChangeQuery={setQuery} totalStudents={totalStudents} />
          }
          ListEmptyComponent={<EmptyState query={query} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
          stickySectionHeadersEnabled
          contentContainerStyle={[styles.content, Platform.OS === 'web' && styles.webTopSpacing]}
          keyboardShouldPersistTaps="handled"
        />
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
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
    flexGrow: 1,
  },
  webTopSpacing: {
    paddingTop: Spacing.six + Spacing.three,
  },
  separator: {
    height: Spacing.two,
  },
  sectionSeparator: {
    height: Spacing.one,
  },
});
