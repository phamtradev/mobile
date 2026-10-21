import { StyleSheet, Text, View } from 'react-native';

import Avatar from './avatar';

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      <Avatar />
      <View style={styles.content}>
        <Text style={styles.name}>Phạm Văn Trà</Text>
        <Text style={styles.studentId}>Mã SV: 23633471</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  name: {
    color: '#172033',
    fontSize: 20,
    fontWeight: '700',
  },
  studentId: {
    color: '#667085',
    fontSize: 15,
  },
});
