import { StyleSheet, Text, View } from 'react-native';

import InfoRow from '@/components/campus/info-row';
import type { Student } from '@/types/campus';

interface StudentCardProps {
    student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title} accessibilityRole="header">
                THÔNG TIN SINH VIÊN
            </Text>

            <InfoRow label="Họ và tên đầy đủ:" value={student.fullName} emphasized />
            <InfoRow label="Mã số sinh viên:" value={student.studentId} />
            <InfoRow label="Ngành đào tạo:" value={student.major} />
            <InfoRow label="Khóa đào tạo:" value={student.cohort} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 20,
        borderWidth: 1,
        borderRadius: 12,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
});
