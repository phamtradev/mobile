import { StyleSheet, View } from 'react-native';

import CourseCard from '@/components/campus/course-card';
import type { Course } from '@/types/campus';

export default function CourseGrid({ courses }: { courses: Course[] }) {
    return (
        <View style={styles.grid}>
            {courses.map((course) => (
                <View key={course.id} style={styles.cell}>
                    <CourseCard course={course} />
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    cell: {
        flexBasis: 130,
        flexGrow: 1,
        minWidth: 120,
        maxWidth: 320,
    },
});
