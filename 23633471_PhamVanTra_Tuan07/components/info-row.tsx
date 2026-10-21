import { StyleSheet, Text, View } from 'react-native';

type InfoRowProps = {
  label: string;
  value: string;
};

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  label: {
    color: '#475467',
    fontWeight: '600',
  },
  value: {
    color: '#667085',
    flexShrink: 1,
  },
});
