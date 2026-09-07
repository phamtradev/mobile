import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import { TodoInput } from '@/components/todos/todo-input';
import { TodoRow } from '@/components/todos/todo-row';
import { AppThemeProvider, useAppTheme } from '@/context/theme-context';
import { initialTodos, todoReducer } from '@/features/todos/todo-reducer';

function TodoScreen() {
  const { isDarkMode, colors, toggleTheme } = useAppTheme();

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');

  const filteredTodos = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    return todos.filter((todo) => todo.title.toLowerCase().includes(normalizedKeyword));
  }, [todos, keyword]);

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  useEffect(() => {
    console.log(`Danh sách hiện có ${todos.length} công việc`);
  }, [todos.length]);

  const handleAdd = useCallback(() => {
    dispatch({ type: 'ADD_TODO', payload: title });
    setTitle('');
  }, [title]);

  const handleToggle = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const handleDelete = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Button title={isDarkMode ? 'Chuyển giao diện sáng' : 'Chuyển giao diện tối'} onPress={toggleTheme} />

      <TodoInput value={title} onChangeText={setTitle} onAdd={handleAdd} />

      <TodoInput
        value={keyword}
        onChangeText={setKeyword}
        onAdd={() => setKeyword('')}
        placeholder="Tìm công việc"
        buttonTitle="Xóa lọc"
      />

      <Text style={[styles.summary, { color: colors.text }]}>
        Còn {remainingCount} công việc chưa hoàn thành
      </Text>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoRow todo={item} onToggle={handleToggle} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.textSecondary }]}>
            Không có công việc nào
          </Text>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

export default function Bai6TodoScreen() {
  return (
    <AppThemeProvider>
      <TodoScreen />
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
  },
  summary: {
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    gap: 8,
  },
  empty: {
    fontSize: 14,
  },
});
