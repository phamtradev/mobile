/**
 * Generic Interface cho response bọc ngoài của API phân trang (Bài 14).
 * Dùng chung cho mọi loại dữ liệu: ApiResponse<Product>, ApiResponse<User>, ...
 */
export interface ApiResponse<T> {
    data: T[];
    total: number;
    page: number;
}

/**
 * Trạng thái của một tiến trình bất đồng bộ.
 *
 * loading và refreshing tách riêng vì hai tình huống khác nhau:
 * loading là lần tải đầu khi màn hình chưa có gì để hiển thị,
 * refreshing là người dùng kéo xuống làm mới khi dữ liệu cũ vẫn đang hiện.
 */
export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    refreshing: boolean;
    error: string | null;
}

/** Tham số phân trang gửi lên API. */
export interface PageRequest {
    page: number;
    pageSize: number;
}
