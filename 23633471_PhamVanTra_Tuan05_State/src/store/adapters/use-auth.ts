import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginSuccess, logout, type AuthUser } from '@/store/slices/auth-slice';

export interface AuthAdapter {
    user: AuthUser | null;
    token: string | null;
    isLoggedIn: boolean;
    signIn: () => void;
    signOut: () => void;
}

/**
 * Dữ liệu giả cho tuần này. Tuần 7 sẽ thay bằng phản hồi thật từ API,
 * và đó là chỗ duy nhất phải sửa.
 */
const DEMO_USER: AuthUser = {
    id: 'u-23633471',
    name: 'Phạm Văn Trà',
    email: '23633471@sv.truong.edu.vn',
    studentId: '23633471',
};

const DEMO_TOKEN = 'demo-token-tuan05';

/**
 * Adapter cho store người dùng.
 *
 * signIn hiện tại chỉ dispatch dữ liệu giả. Khi nối API thật, thân hàm này
 * đổi thành gọi axios rồi dispatch kết quả — chữ ký hàm giữ nguyên nên màn
 * hình Tài khoản không phải sửa dòng nào.
 */
export function useAuth(): AuthAdapter {
    const { user, token, isLoggedIn } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const signIn = useCallback(() => {
        dispatch(loginSuccess({ user: DEMO_USER, token: DEMO_TOKEN }));
    }, [dispatch]);

    const signOut = useCallback(() => dispatch(logout()), [dispatch]);

    return { user, token, isLoggedIn, signIn, signOut };
}
