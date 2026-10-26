import { axiosInstance } from '@/libs/axios';
import { PersistedAuth } from '@/store/auth-store';


export const authService = {
  async login(email: string, password: string): Promise<PersistedAuth> {
    const response = await axiosInstance.post<PersistedAuth>("/login", {
      email,
      password,
    });
    return response.data;
  },

  async register(name: string, email: string, password: string): Promise<PersistedAuth> {
    const response = await axiosInstance.post<PersistedAuth>("/register", {
      name,
      email,
      password,
    });
    return response.data;
  },
};
