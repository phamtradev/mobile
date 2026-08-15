import { StyleSheet, Text, View } from 'react-native';

import InfoRow from '@/components/campus/info-row';
import type { Student } from '@/types/campus';

interface StudentCardProps {
    student: Student;
}

/**
 * Takes data through props instead of importing it, so the card can be reused
 * for any student and survives the later switch from mock data to an API.
 */
export default function StudentCard({ student }: StudentCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>THÔNG TIN SINH VIÊN</Text>

            <InfoRow label="Họ tên:" value={student.fullName} emphasized />
            <InfoRow label="Mã SV:" value={student.studentId} />
            <InfoRow label="Ngành học:" value={student.major} />
            <InfoRow label="Niên khóa:" value={student.cohort} />
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
