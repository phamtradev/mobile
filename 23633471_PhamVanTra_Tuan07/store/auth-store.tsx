import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { authService } from '@/services/auth-service';
import type { Session, User } from '@/types';

const SESSION_KEY = '@bookstore/session';

interface AuthContextValue {
    user: User | null;
    isLoggedIn: boolean;
    isRestoring: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function isAlive(session: Session) {
    return Boolean(session.token && session.user) && new Date(session.expiresAt) > new Date();
}

export function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [isRestoring, setIsRestoring] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(SESSION_KEY);
                if (!raw) return;
                const saved = JSON.parse(raw) as Session;
                if (isAlive(saved)) setSession(saved);
                else await AsyncStorage.removeItem(SESSION_KEY);
            } catch {
                await AsyncStorage.removeItem(SESSION_KEY);
            } finally {
                setIsRestoring(false);
            }
        })();
    }, []);

    const save = useCallback(async (next: Session) => {
        setSession(next);
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(next));
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user: session?.user ?? null,
            isLoggedIn: Boolean(session),
            isRestoring,
            login: async (email, password) => save(await authService.login(email, password)),
            register: async (name, email, password) => save(await authService.register(name, email, password)),
            logout: async () => {
                setSession(null);
                await AsyncStorage.removeItem(SESSION_KEY);
            },
        }),
        [session, isRestoring, save],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const value = useContext(AuthContext);
    if (!value) throw new Error('useAuth phải nằm trong AuthProvider');
    return value;
}
