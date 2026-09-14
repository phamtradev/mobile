import { Endpoints } from '@/api/endpoints';
import { request } from '@/api/http-client';
import type { ApiResponse } from '@/types/api';
import type { DummyJsonProductList, Product } from '@/types/product';

/**
 * Bài 11 — tìm kiếm sản phẩm.
 * Hai tham số đều có type annotation theo yêu cầu của đề.
 */
export async function fetchProducts(keyword: string, limit: number): Promise<Product[]> {
    const body = await request<DummyJsonProductList>(Endpoints.productSearch(keyword, limit));
    return body.products;
}

/**
 * Bài 14 — lấy một trang sản phẩm.
 *
 * DummyJSON trả về { products, total, skip, limit }. Hàm này chuyển đổi sang
 * ApiResponse<Product> là hình dạng chung của ứng dụng, nên màn hình không
 * phải biết nhà cung cấp API dùng skip hay page. Đổi sang API khác chỉ cần
 * sửa phép chuyển đổi ở đây.
 */
export async function fetchProductPage(
    page: number,
    pageSize: number,
): Promise<ApiResponse<Product>> {
    const skip = (page - 1) * pageSize;
    const body = await request<DummyJsonProductList>(Endpoints.productPage(skip, pageSize));

    return { data: body.products, total: body.total, page };
}

/** Bài 12 — hai cách hỏng khác nhau để so sánh nhánh xử lý lỗi. */
export function fetchBrokenNotFound(): Promise<unknown> {
    return request<unknown>(Endpoints.brokenNotFound());
}

export function fetchBrokenHost(): Promise<unknown> {
    return request<unknown>(Endpoints.brokenHost());
}
