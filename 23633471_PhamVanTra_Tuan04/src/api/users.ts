import { Endpoints } from '@/api/endpoints';
import { request } from '@/api/http-client';
import type { User } from '@/types/user';

/**
 * Bài 10 — lấy chi tiết một người dùng.
 * Tham số có type annotation nên gọi fetchUser('1') sẽ bị TypeScript chặn.
 */
export function fetchUser(id: number): Promise<User> {
    return request<User>(Endpoints.user(id));
}

/** Bài 13 — danh sách người dùng, dùng làm dữ liệu thật cho hàm lọc generic. */
export function fetchUsers(): Promise<User[]> {
    return request<User[]>(Endpoints.users());
}
