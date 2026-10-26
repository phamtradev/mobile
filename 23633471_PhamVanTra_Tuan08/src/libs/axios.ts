import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'axios';
import { Platform } from 'react-native';

import { AUTH_KEY, PersistedAuth } from '@/store/auth-store';

const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const baseURL = `http://${host}:3000`;

export const axiosInstance = create({ baseURL, timeout: 10000 });

axiosInstance.interceptors.request.use(async (config) => {
    const saved = await AsyncStorage.getItem(AUTH_KEY);
    if (saved) {
        const auth = JSON.parse(saved) as PersistedAuth;
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
});
