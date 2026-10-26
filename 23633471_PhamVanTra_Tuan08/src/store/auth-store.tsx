import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authService } from "@/services/auth.service";
import { User } from "@/types";

export const AUTH_KEY = "@bookstore/auth";
export type PersistedAuth = { accessToken: string; user: User};
type AuthContextValue = {
  user: User | null;
  token: string | null;
  isHydrating: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState<PersistedAuth | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const saved = await AsyncStorage.getItem(AUTH_KEY);
        if (!saved) return;
        const parsed = JSON.parse(saved) as PersistedAuth;
        if (
          parsed.accessToken &&
          parsed.user
        )
          setAuth(parsed);
        else await AsyncStorage.removeItem(AUTH_KEY);
      } finally {
        setIsHydrating(false);
      }
    };
    void restoreAuth();
  }, []);

  const save = async (next: PersistedAuth) => {
    setAuth(next);
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(next));
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user: auth?.user ?? null,
      token: auth?.accessToken ?? null,
      isHydrating,
      isLoggedIn: Boolean(auth?.accessToken),
      login: async (email, password) =>
        save(await authService.login(email, password)),
      register: async (name, email, password) =>
        save(await authService.register(name, email, password)),
      logout: async () => {
        setAuth(null);
        await AsyncStorage.removeItem(AUTH_KEY);
      },
    }),
    [auth, isHydrating],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
