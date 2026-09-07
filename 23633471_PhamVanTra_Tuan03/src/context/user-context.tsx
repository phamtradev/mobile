import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';

export interface User {
  name: string;
  email: string;
  avatar: ImageSourcePropType;
}

interface UserContextValue {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const DEFAULT_USER: User = {
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@example.com',
  avatar: require('../../assets/images/react-logo.png'),
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);

  const login = useCallback(() => setUser(DEFAULT_USER), []);
  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser phải được dùng bên trong UserProvider');
  }

  return context;
}
