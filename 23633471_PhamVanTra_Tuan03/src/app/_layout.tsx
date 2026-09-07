import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Chương 3 - Hook' }} />
      <Stack.Screen name="bai1-usestate" options={{ title: 'Bài 1 - useState' }} />
      <Stack.Screen name="bai2-useeffect" options={{ title: 'Bài 2 - useEffect' }} />
      <Stack.Screen name="bai3-usecontext" options={{ title: 'Bài 3 - useContext' }} />
      <Stack.Screen name="bai4-usereducer" options={{ title: 'Bài 4 - useReducer' }} />
      <Stack.Screen name="bai5-usememo" options={{ title: 'Bài 5 - useMemo/useCallback' }} />
      <Stack.Screen name="bai6-todo" options={{ title: 'Bài 6 - Quản lý công việc' }} />
    </Stack>
  );
}
