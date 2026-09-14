/**
 * Bài 12 — xử lý lỗi API.
 *
 * Khối catch trong TypeScript nhận biến kiểu unknown, không phải Error.
 * Lý do: throw ném được bất cứ thứ gì, kể cả chuỗi hay số. Vì vậy không được
 * truy cập error.message ngay mà phải thu hẹp kiểu trước (type guarding).
 */

/** Cấu trúc lỗi chuẩn hoá mà toàn bộ ứng dụng làm việc cùng. */
export interface CustomError {
    name: string;
    message: string;
    /** null khi lỗi xảy ra trước lúc có response, ví dụ mất mạng. */
    status: number | null;
    url: string;
}

export class ApiError extends Error implements CustomError {
    readonly status: number | null;
    readonly url: string;

    constructor(message: string, url: string, status: number | null = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.url = url;
    }
}

/** Type guard: thu hẹp unknown về ApiError. */
export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

/**
 * Ép mọi thứ bắt được trong catch về CustomError.
 *
 * Ba nhánh tương ứng ba thứ thực sự có thể bị ném ra:
 * ApiError do chính tầng http-client ném, Error do runtime ném, và bất kỳ
 * giá trị nào khác do thư viện bên thứ ba ném.
 */
export function toCustomError(error: unknown, url = ''): CustomError {
    if (isApiError(error)) {
        return { name: error.name, message: error.message, status: error.status, url: error.url };
    }

    if (error instanceof Error) {
        return { name: error.name, message: error.message, status: null, url };
    }

    return { name: 'UnknownError', message: String(error), status: null, url };
}

/** Câu thông báo cho người dùng cuối, không lộ chi tiết kỹ thuật. */
export function toUserMessage(error: CustomError): string {
    if (error.status === 404) {
        return 'Không tìm thấy dữ liệu. Đường dẫn có thể đã thay đổi.';
    }
    if (error.status !== null && error.status >= 500) {
        return 'Máy chủ đang gặp sự cố. Vui lòng thử lại sau ít phút.';
    }
    if (error.status !== null) {
        return `Yêu cầu không thành công (mã ${error.status}). Vui lòng thử lại.`;
    }
    return 'Không kết nối được tới máy chủ. Kiểm tra kết nối mạng rồi thử lại.';
}
