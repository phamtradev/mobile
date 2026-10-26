import { User } from '@/types';

type AuthResponse = { token: string; user: User; expiresAt: string };

const makeResponse = (email: string, name?: string): AuthResponse => ({
  token: `demo-token-${Date.now()}`,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  user: { id: email.toLowerCase(), name: name || email.split('@')[0], email },
});

export const authService = {
  async login(email: string, _password: string): Promise<AuthResponse> {
    return makeResponse(email);
  },
  async register(name: string, email: string, _password: string): Promise<AuthResponse> {
    return makeResponse(email, name);
  },
};
