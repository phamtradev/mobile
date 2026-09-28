import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Bài 4 — store người dùng.
 *
 * Tuần này chưa nối API nên đăng nhập dùng dữ liệu giả. Hình dạng state đã
 * đặt sẵn theo cách backend thật sẽ trả về, nên tuần 7 chỉ cần thay chỗ tạo
 * ra AuthUser và token, không phải sửa reducer hay component nào.
 */

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    studentId: string;
}

export interface AuthState {
    user: AuthUser | null;
    token: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },

        logout(state) {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
