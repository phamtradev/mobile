import { useReducer } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface FormState {
  email: string;
  password: string;
  error: string;
  message: string;
  isSubmitting: boolean;
}

type FormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'RESET' };

const initialState: FormState = {
  email: '',
  password: '',
  error: '',
  message: '',
  isSubmitting: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, error: '', message: '' };

    case 'SET_PASSWORD':
      return { ...state, password: action.payload, error: '', message: '' };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isSubmitting: false };

    case 'SUBMIT_START':
      return { ...state, error: '', message: '', isSubmitting: true };

    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, message: 'Đăng nhập thành công' };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function Bai4UseReducerScreen() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleLogin = () => {
    if (!state.email || !state.password) {
      dispatch({ type: 'SET_ERROR', payload: 'Vui lòng nhập đầy đủ thông tin' });
      return;
    }

    if (!state.email.includes('@')) {
      dispatch({ type: 'SET_ERROR', payload: 'Email phải chứa ký tự @' });
      return;
    }

    if (state.password.length < 6) {
      dispatch({ type: 'SET_ERROR', payload: 'Mật khẩu phải có ít nhất sáu ký tự' });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });
    setTimeout(() => dispatch({ type: 'SUBMIT_SUCCESS' }), 800);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={state.email}
        onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        value={state.password}
        onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
        placeholder="Mật khẩu"
        secureTextEntry
        style={styles.input}
      />

      {state.error ? <Text style={styles.error}>{state.error}</Text> : null}
      {state.message ? <Text style={styles.success}>{state.message}</Text> : null}
      {state.isSubmitting ? <Text style={styles.note}>Đang đăng nhập...</Text> : null}

      <Button
        title={state.isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        onPress={handleLogin}
        disabled={state.isSubmitting}
      />

      <Button title="Đặt lại" onPress={() => dispatch({ type: 'RESET' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 12,
  },
  error: {
    color: '#cc0000',
    fontSize: 14,
  },
  success: {
    color: '#0a7d24',
    fontSize: 14,
  },
  note: {
    color: '#666666',
    fontSize: 14,
  },
});
