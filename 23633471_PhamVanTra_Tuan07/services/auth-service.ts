import type { Session, User } from '@/types';

const SESSION_DAYS = 7;
const LATENCY_MS = 600;

const delay = () => new Promise((resolve) => setTimeout(resolve, LATENCY_MS));

interface Account extends User {
    password: string;
}

const accounts: Account[] = [
    { id: 'tra', name: 'Phạm Văn Trà', email: 'tra.23633471@sv.iuh.edu.vn', password: '123456' },
];

function openSession(user: User): Session {
    return {
        token: `token-${user.id}-${Date.now()}`,
        user: { id: user.id, name: user.name, email: user.email },
        expiresAt: new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    };
}

export const authService = {
    async login(email: string, password: string): Promise<Session> {
        await delay();
        const found = accounts.find((account) => account.email === email.toLowerCase());
        if (!found || found.password !== password) {
            throw new Error('Email hoặc mật khẩu không đúng.');
        }
        return openSession(found);
    },

    async register(name: string, email: string, password: string): Promise<Session> {
        await delay();
        const normalized = email.toLowerCase();
        if (accounts.some((account) => account.email === normalized)) {
            throw new Error('Email này đã được đăng ký.');
        }
        const account: Account = { id: normalized, name, email: normalized, password };
        accounts.push(account);
        return openSession(account);
    },
};
