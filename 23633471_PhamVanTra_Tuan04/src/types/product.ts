/**
 * Kiểu dữ liệu suy ra từ JSON của https://dummyjson.com/products
 *
 * DummyJSON trả về nhiều trường hơn, ở đây chỉ khai báo những trường màn hình
 * thực sự dùng tới. Khai báo thiếu an toàn hơn khai báo thừa: TypeScript sẽ
 * báo lỗi khi truy cập trường chưa khai báo, còn khai báo thừa một trường
 * API không trả về thì lỗi chỉ lộ ra lúc chạy.
 */
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    category: string;
    thumbnail: string;
}

/** Response gốc của DummyJSON — khác hình dạng với ApiResponse<T> của bài 14. */
export interface DummyJsonProductList {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
