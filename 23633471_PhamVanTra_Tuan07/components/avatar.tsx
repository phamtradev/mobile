import { Image, StyleSheet } from 'react-native';

export default function Avatar() {
  return (
    <Image
      accessibilityLabel="Ảnh đại diện sinh viên"
      resizeMode="contain"
      source={require('../assets/images/react-logo.png')}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderColor: '#1976D2',
    borderWidth: 2,
    backgroundColor: '#EAF5FF',
  },
});
