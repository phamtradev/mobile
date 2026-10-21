import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        SmartCampus
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
});
