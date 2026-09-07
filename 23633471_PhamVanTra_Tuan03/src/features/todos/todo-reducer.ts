export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string };

export const initialTodos: Todo[] = [
  { id: '1', title: 'Học React Native', completed: false },
  { id: '2', title: 'Làm phiếu bài tập chương 3', completed: true },
];

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO': {
      const title = action.payload.trim();

      if (!title) {
        return state;
      }

      return [...state, { id: Date.now().toString(), title, completed: false }];
    }

    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );

    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
}
