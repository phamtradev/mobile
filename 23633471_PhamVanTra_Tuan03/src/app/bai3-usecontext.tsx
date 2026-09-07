import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { UserProvider, useUser } from '@/context/user-context';

function ProfileScreen() {
  const { user, login, logout } = useUser();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Bạn đã đăng xuất.</Text>
        <Button title="Đăng nhập lại" onPress={login} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={user.avatar} style={styles.avatar} />
      <Text style={styles.name}>Xin chào, {user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <Button title="Đăng xuất" onPress={logout} />
    </View>
  );
}

export default function Bai3UseContextScreen() {
  return (
    <UserProvider>
      <ProfileScreen />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#666666',
  },
  message: {
    fontSize: 18,
  },
});
