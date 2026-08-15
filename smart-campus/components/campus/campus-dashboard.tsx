import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CourseGrid from '@/components/campus/course-grid';
import StudentCard from '@/components/campus/student-card';
import { IconButton, PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { Campus } from '@/constants/theme';
import { announcements, courses, student } from '@/data/campus';

export default function CampusDashboard() {
    const insets = useSafeAreaInsets();
    const [refreshing, setRefreshing] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    function refresh() {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
        >
            <View style={styles.headerRow}>
                <Text style={styles.header} accessibilityRole="header">
                    CAMPUS DASHBOARD
                </Text>

                <View style={styles.headerActions}>
                    <IconButton
                        name="bookmark"
                        accessibilityLabel="Lưu bảng tin"
                        selected={bookmarked}
                        onPress={() => setBookmarked((on) => !on)}
                    />
                    <IconButton
                        name="square.and.arrow.up"
                        accessibilityLabel="Chia sẻ bảng tin"
                        onPress={() => {}}
                    />
                </View>
            </View>

            <StudentCard student={student} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle} accessibilityRole="header">KHÓA HỌC</Text>

                <CourseGrid courses={courses} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle} accessibilityRole="header">THÔNG BÁO</Text>

                {announcements.map((announcement) => (
                    <Text key={announcement.id}>{announcement.title}</Text>
                ))}
            </View>

            <View style={styles.actions}>
                <PrimaryButton label="Xem tất cả thông báo" onPress={() => {}} />
                <SecondaryButton label="Làm mới dữ liệu" loading={refreshing} onPress={refresh} />
                <PrimaryButton label="Đăng ký học phần" disabled onPress={() => {}} />
                <Text style={styles.hint}>Cổng đăng ký học phần mở lúc 08:00 ngày 18/08.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },

    content: {
        padding: 20,
        gap: 16,
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },

    header: {
        flexShrink: 1,
        fontSize: 24,
        fontWeight: 'bold',
    },

    headerActions: {
        flexDirection: 'row',
        gap: 4,
    },

    section: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        gap: 8,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    actions: {
        gap: 12,
    },

    hint: {
        fontSize: 13,
        color: Campus.textMuted,
    },
});
