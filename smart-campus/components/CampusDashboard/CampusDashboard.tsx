import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StudentCard from '../StudentCard/StudentCard';

export default function CampusDashboard() {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
        >

            <Text style={styles.header}>
                CAMPUS DASHBOARD
            </Text>

            <StudentCard />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    KHÓA HỌC
                </Text>

                <Text>Lập trình Mobile</Text>
                <Text>Cơ sở dữ liệu</Text>
                <Text>Phát triển giao diện</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    THÔNG BÁO
                </Text>

                <Text>Thông báo học phí học kỳ mới</Text>
                <Text>Lịch thi cuối kỳ</Text>
            </View>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                    Xem tất cả thông báo
                </Text>
            </Pressable>

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

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
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

    button: {
        padding: 14,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: 'bold',
    },
});
