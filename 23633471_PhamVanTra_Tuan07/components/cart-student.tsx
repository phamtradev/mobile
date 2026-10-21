import { StyleSheet, Text, View } from 'react-native';

import InfoRow from './info-row';

export default function StudentCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin sinh viên</Text>
      <InfoRow label="Email" value="tra.23633471@sv.iuh.edu.vn" />
      <InfoRow label="Lớp" value="DHKTPM19A" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF6FF',
    borderColor: '#9CCBFA',
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  title: {
    color: '#172033',
    fontSize: 17,
    fontWeight: '700',
  },
});
