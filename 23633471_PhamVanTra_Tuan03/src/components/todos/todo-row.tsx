import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/context/theme-context';
import type { Todo } from '@/features/todos/todo-reducer';

interface TodoRowProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoRow = memo(function TodoRow({ todo, onToggle, onDelete }: TodoRowProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.row, { borderColor: colors.border }]}>
      <Pressable style={styles.title} onPress={() => onToggle(todo.id)}>
        <Text style={[styles.titleText, { color: colors.text }, todo.completed && styles.completed]}>
          {todo.completed ? '[x] ' : '[ ] '}
          {todo.title}
        </Text>
      </Pressable>

      <Pressable onPress={() => onDelete(todo.id)}>
        <Text style={styles.delete}>Xóa</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  title: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  delete: {
    fontSize: 14,
    color: '#cc0000',
  },
});
