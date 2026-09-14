import { ApiError } from '@/api/api-error';

/**
 * Hàm gọi API duy nhất của ứng dụng, viết bằng Generic <T>.
 *
 * Mọi hàm fetch cụ thể đều đi qua đây nên phần lặp lại — kiểm tra response.ok,
 * parse JSON, bọc lỗi mạng — chỉ viết một lần. Thêm endpoint mới không cần
 * sửa file này, chỉ cần truyền T khác vào.
 */
export async function request<T>(url: string, init?: RequestInit): Promise<T> {
    let response: Response;

    try {
        response = await fetch(url, init);
    } catch (cause) {
        // fetch chỉ reject khi không gửi được request: mất mạng, sai tên miền,
        // bị chặn CORS. Lỗi 4xx/5xx vẫn resolve nên phải kiểm riêng bên dưới.
        const message = cause instanceof Error ? cause.message : String(cause);
        throw new ApiError(`Không gửi được yêu cầu: ${message}`, url, null);
    }

    if (!response.ok) {
        throw new ApiError(`Máy chủ trả về mã ${response.status}`, url, response.status);
    }

    try {
        return (await response.json()) as T;
    } catch {
        throw new ApiError('Phản hồi không phải JSON hợp lệ', url, response.status);
    }
}
