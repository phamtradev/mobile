import { useState } from 'react';
import { Alert, FlatList, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CourseListHeader } from '@/components/courses/course-list-header';
import { CourseRow } from '@/components/courses/course-row';
import { EmptyState } from '@/components/courses/empty-state';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { Course, courses } from '@/data/courses';
import { filterCourses } from '@/utils/filter-courses';

export function CourseListScreen() {
  const [query, setQuery] = useState('');
  const filteredCourses = filterCourses(courses, query);

  function openCourse(course: Course) {
    Alert.alert(
      course.title,
      `Giảng viên: ${course.instructor}\nDanh mục: ${course.category}\nSố sinh viên: ${course.students}`,
    );
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CourseRow course={item} onPress={openCourse} />}
          ListHeaderComponent={
            <CourseListHeader query={query} onChangeQuery={setQuery} resultCount={filteredCourses.length} />
          }
          ListEmptyComponent={<EmptyState />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
});
