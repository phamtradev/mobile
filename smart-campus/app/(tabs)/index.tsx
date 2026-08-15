import { StyleSheet, View } from 'react-native';

import CampusDashboard from '@/components/campus/campus-dashboard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CampusDashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
