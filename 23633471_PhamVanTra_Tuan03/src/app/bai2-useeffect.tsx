import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function Bai2UseEffectScreen() {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('Chưa kết nối');
  const [lastConnectedAt, setLastConnectedAt] = useState('');

  useEffect(() => {
    if (isConnected) {
      setMessage('Thiết bị đã kết nối');
      setLastConnectedAt(new Date().toLocaleTimeString('vi-VN'));
    } else {
      setMessage('Thiết bị đã ngắt kết nối');
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Kết nối thiết bị</Text>
        <Switch value={isConnected} onValueChange={setIsConnected} />
      </View>

      <Text style={[styles.message, isConnected ? styles.connected : styles.disconnected]}>
        {message}
      </Text>

      <Text style={styles.note}>
        Kết nối gần nhất: {lastConnectedAt || 'chưa có'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
  message: {
    fontSize: 20,
  },
  connected: {
    color: '#0a7d24',
  },
  disconnected: {
    color: '#cc0000',
  },
  note: {
    fontSize: 14,
    color: '#666666',
  },
});
