/**
 * Toàn bộ URL của ứng dụng nằm ở đây.
 *
 * Không component nào được viết URL trực tiếp. Khi đổi domain hoặc đổi tham số
 * phân trang thì chỉ sửa một file, và mọi chỗ gọi API đều đi theo.
 */

const JSON_PLACEHOLDER = 'https://jsonplaceholder.typicode.com';
const DUMMY_JSON = 'https://dummyjson.com';

export const Endpoints = {
    /** Bài 9 — danh sách tin tức. */
    posts: () => `${JSON_PLACEHOLDER}/todos`,

    /** Bài 10 — chi tiết một người dùng. */
    user: (id: number) => `${JSON_PLACEHOLDER}/users/${id}`,

    /** Bài 13 — danh sách người dùng để thử hàm lọc generic. */
    users: () => `${JSON_PLACEHOLDER}/users`,

    /** Bài 11 — tìm kiếm sản phẩm theo từ khoá. */
    productSearch: (keyword: string, limit: number) =>
        `${DUMMY_JSON}/products/search?q=${encodeURIComponent(keyword)}&limit=${limit}`,

    /** Bài 14, 15 — lấy sản phẩm theo trang. */
    productPage: (skip: number, limit: number) =>
        `${DUMMY_JSON}/products?skip=${skip}&limit=${limit}`,

    /** Bài 12 — URL sai có chủ đích để kích hoạt nhánh xử lý lỗi. */
    brokenNotFound: () => `${DUMMY_JSON}/products/khong-ton-tai`,

    /** Bài 12 — tên miền không phân giải được, mô phỏng mất mạng. */
    brokenHost: () => 'https://khong-ton-tai.invalid/products',
} as const;

/** Số sản phẩm mỗi trang, dùng chung cho bài 14 và bài 15. */
export const PAGE_SIZE = 10;

/** Số kết quả tối đa khi tìm kiếm ở bài 11. */
export const SEARCH_LIMIT = 20;
