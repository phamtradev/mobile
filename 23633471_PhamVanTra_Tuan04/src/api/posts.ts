import { Endpoints } from '@/api/endpoints';
import { request } from '@/api/http-client';
import type { Post } from '@/types/post';

/**
 * Bài 9 — lấy danh sách tin tức.
 *
 * Kiểu trả về khai báo là Promise<Post[]>, nên request<Post[]> gán kiểu cho
 * kết quả ngay tại chỗ gọi. Màn hình nhận về mảng đã có kiểu, không phải any.
 */
export function fetchPosts(): Promise<Post[]> {
    return request<Post[]>(Endpoints.posts());
}
