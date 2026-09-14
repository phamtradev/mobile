# Tuần 4 — Gọi API và xử lý bất đồng bộ

| | |
|---|---|
| Mã số sinh viên | 23633471 |
| Họ và tên | Phạm Văn Trà |
| Lớp | DHKTPM19A – 420300143201 |
| Môn học | Lập trình thiết bị di động |
| Nội dung | Bài 9 đến Bài 15 |

Ứng dụng BookStore gọi hai API công khai: JSONPlaceholder và DummyJSON.

## Chạy dự án

```bash
npm install
npm start        # rồi bấm a để mở Android, w để mở web
```

## Bản đồ bài tập

| Bài | Màn hình | Route | Trọng tâm TypeScript |
|-----|----------|-------|----------------------|
| 9 | Danh sách tin tức | `/bai09-news` | Định nghĩa Type từ JSON, gán kiểu cho kết quả fetch |
| 10 | Chi tiết người dùng | `/bai10-user` | Kiểu `User \| null`, optional chaining |
| 11 | Tìm kiếm sản phẩm | `/bai11-search` | Type annotation cho tham số hàm bất đồng bộ |
| 12 | Xử lý lỗi API | `/bai12-error` | `catch` kiểu `unknown`, type guard, `CustomError` |
| 13 | Bộ lọc Generic | `/bai13-filter` | Hàm Generic `<T extends HasName>` |
| 14 | Phân trang | `/bai14-pagination` | Generic Interface `ApiResponse<T>` |
| 15 | Kéo để tải lại | `/bai15-refresh` | Đồng bộ hai cờ `loading` và `refreshing` |

## Cấu trúc thư mục

```
src/
├── app/              Route của expo-router. Mỗi file chỉ render một component.
├── api/              Tầng gọi API
│   ├── endpoints.ts    Toàn bộ URL của ứng dụng
│   ├── http-client.ts  request<T> — hàm fetch generic duy nhất
│   ├── api-error.ts    CustomError, ApiError, type guard
│   └── posts|users|products.ts
├── components/
│   ├── common/       Thành phần dùng lại ở nhiều màn hình
│   └── posts|users|products|errors|generic/
├── hooks/
│   └── use-async.ts  Quản lý loading / refreshing / error / data
├── types/            Kiểu dữ liệu suy ra từ JSON của API
└── utils/
    └── filter-by-name.ts
```

Hướng phụ thuộc đi một chiều, không có vòng:

```
app → components → hooks → api → types
                      ↘ utils → (không phụ thuộc gì)
```

## Các nguyên tắc đã áp dụng

### SRP — mỗi module một lý do để thay đổi

| Module | Thay đổi khi |
|--------|--------------|
| `types/` | Cấu trúc JSON của API đổi |
| `api/endpoints.ts` | Đổi domain hoặc tham số truy vấn |
| `api/http-client.ts` | Đổi cách xử lý HTTP chung |
| `hooks/use-async.ts` | Đổi cách quản lý vòng đời bất đồng bộ |
| `components/` | Đổi cách trình bày |

### DIP — phụ thuộc vào abstraction

Component không gọi `fetch` trực tiếp. Chúng gọi các hàm đã khai báo kiểu trả về
như `fetchProducts(keyword, limit): Promise<Product[]>`. Đổi từ `fetch` sang
`axios`, hoặc đổi nhà cung cấp API, chỉ sửa trong `api/` mà không component nào
phải sửa.

`fetchProductPage` chuyển hình dạng `{ products, skip, limit }` của DummyJSON
sang `ApiResponse<Product>` của ứng dụng, nên màn hình phân trang không cần biết
nhà cung cấp dùng `skip` hay `page`.

### OCP — mở để mở rộng, đóng để sửa đổi

`request<T>` phục vụ mọi endpoint hiện có và mọi endpoint thêm sau này mà không
cần sửa một dòng nào bên trong. Thêm API mới chỉ là truyền `T` khác vào.

### DRY — một nguồn sự thật

- Mọi URL nằm trong `endpoints.ts`, không component nào viết URL trực tiếp.
- Mọi lời gọi API đi qua `request<T>`, nên phần kiểm tra `response.ok`, parse
  JSON và bọc lỗi mạng chỉ viết một lần.
- Bảy màn hình dùng chung `useAsync`. Nếu mỗi màn hình tự viết bốn `useState`
  và một khối `try/catch` thì mỗi lần đổi cách xử lý lỗi phải sửa bảy chỗ.
- `AsyncStateView` gom thứ tự ưu tiên "đang tải → lỗi → rỗng" vào một chỗ.
- `ProductRow` dùng lại ở cả ba màn hình sản phẩm.

### KISS

- Không dùng thư viện quản lý state hay data-fetching nào ngoài `fetch` có sẵn.
- `useAsync` chỉ có hai hành động là `run` và `refresh`.
- Route là file một dòng, không chứa logic.

### YAGNI — những gì cố tình không làm

| Không làm | Lý do |
|-----------|-------|
| Cache, retry tự động, huỷ request bằng AbortController | Đề bài không yêu cầu; thêm vào sẽ che mất phần cần quan sát là vòng đời trạng thái |
| Store toàn cục (Redux, Zustand) | Không có state nào chia sẻ giữa các màn hình |
| Khai báo đủ mọi trường DummyJSON trả về | Chỉ khai báo trường thực sự dùng. Khai báo thừa một trường API không trả về thì lỗi chỉ lộ lúc chạy |
| Tách `LoadingView`, `ErrorView`, `EmptyView` thành ba component | Chúng chỉ khác nhau ở chữ và ở nút hành động |

## Hai chi tiết kỹ thuật đáng lưu ý

**Chống phản hồi đến muộn.** `useAsync` giữ một bộ đếm `requestId`. Người dùng
gõ "phone" rồi sửa thành "laptop": nếu phản hồi của "phone" về sau, không có bộ
đếm này thì màn hình hiện kết quả của từ khoá đã bị xoá.

**Tham chiếu hàm phải ổn định.** `useAsync` gọi lại API khi `task` đổi. Viết
`useAsync(() => fetchUser(1))` trực tiếp trong thân component sẽ tạo hàm mới mỗi
lần render và gây vòng lặp gọi API vô hạn. Vì vậy `task` hoặc được khai báo
ngoài component, hoặc bọc trong `useCallback` với đúng danh sách phụ thuộc.

## Kiểm tra

```bash
npx tsc --noEmit     # 0 lỗi
npx eslint src       # 0 cảnh báo
```

Ảnh minh chứng nằm trong `docs/screenshots/`.
