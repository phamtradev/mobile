# Tuần 8 — BookStore gọi API thật

| | |
|---|---|
| Mã số sinh viên | 23633471 |
| Họ và tên | Phạm Văn Trà |
| Lớp | DHKTPM19A – 420300143201 |
| Môn học | Lập trình thiết bị di động |

Tuần trước dữ liệu nằm cứng trong app. Tuần này thay bằng một API thật dựng
bằng `json-server-auth`, và mọi màn hình đều lấy dữ liệu qua `axios`.

## Chạy dự án

Mở hai cửa sổ terminal.

```bash
cd server
npm install
npm start          # json-server chạy ở cổng 3000
```

```bash
npm install
npm start          # rồi bấm a để mở Android
```

Dự án dùng Expo SDK 57, nên Expo Go trên thiết bị phải là bản 57 tương ứng.

## Bản đồ bài tập

| Nội dung | File chính |
|----------|-----------|
| Axios instance và interceptor gắn token | `src/libs/axios.ts` |
| Đăng ký, đăng nhập qua API | `src/services/auth.service.ts` |
| Danh sách sách, tìm kiếm, chi tiết sách | `src/services/book.service.ts` |
| Bình luận theo từng sách | `src/services/comment.service.ts` |
| Lưu token và tự đăng nhập | `src/store/auth-store.tsx` |
| Màn hình bắt buộc đăng nhập | `src/app/checkout.tsx` |

## API

`json-server-auth` tự sinh `/register` và `/login`, trả về `{ accessToken, user }`.
File `server/routes.json` đặt thêm đường dẫn cho gọn.

| Phương thức | Đường dẫn | Dùng để |
|-------------|-----------|---------|
| POST | `/register` | Đăng ký, trả luôn token |
| POST | `/login` | Đăng nhập |
| GET | `/books` | Danh sách sách |
| GET | `/books?q=từ khoá` | Tìm theo tên sách hoặc tác giả |
| GET | `/books/:id` | Chi tiết một quyển |
| GET | `/comments?bookId=:id` | Bình luận của một quyển |
| POST | `/comments` | Gửi bình luận mới |

## Cấu trúc thư mục

```
server/
├── db.json                  books, comments, users
├── routes.json              Đường dẫn rút gọn
└── package.json             npm start chạy json-server-auth
src/
├── app/
│   ├── _layout.tsx          AuthProvider bọc Stack
│   ├── index.tsx            Danh sách sách và ô tìm kiếm
│   ├── login.tsx            Đăng nhập và đăng ký
│   ├── checkout.tsx         Thanh toán, cần đăng nhập
│   └── books/[id].tsx       Chi tiết sách và bình luận
├── components/
│   ├── book-card.tsx
│   └── rating-stars.tsx
├── libs/axios.ts            Instance dùng chung
├── services/                auth, book, comment
├── store/auth-store.tsx
└── types/index.ts
```

## Điểm kỹ thuật

**Một chỗ duy nhất biết địa chỉ server.** `src/libs/axios.ts` tạo instance kèm
`baseURL` và `timeout`; mọi service đều gọi qua instance đó nên đổi địa chỉ chỉ
sửa một dòng. Trên máy ảo Android, `localhost` là chính thiết bị chứ không phải
máy tính, nên host được chọn theo `Platform.OS`: Android dùng `10.0.2.2`, còn
lại dùng `localhost`.

**Interceptor gắn token cho mọi request.** Trước mỗi lần gọi, interceptor đọc
phiên trong `AsyncStorage` và thêm header `Authorization: Bearer ...`. Nhờ vậy
không service nào phải tự nhớ truyền token.

**Danh sách cập nhật không cần tải lại cả trang.** Gửi bình luận xong, màn chi
tiết lấy object server trả về rồi chèn vào đầu mảng `comments`. Điểm trung bình
tính bằng `useMemo` từ chính mảng đó nên tự đổi theo, không gọi lại API.

**Tìm kiếm có độ trễ.** Ô tìm kiếm chờ 350ms sau phím cuối mới gọi `/books?q=`,
nên gõ một từ chỉ tốn một request thay vì một request mỗi ký tự.

**Chặn response đến trễ.** Màn chi tiết dùng cờ `active` trong effect; rời màn
hoặc đổi sang sách khác thì kết quả của request cũ bị bỏ qua, không ghi đè dữ
liệu của sách đang xem.

## Kiểm tra

```bash
npx tsc --noEmit     # 0 lỗi
npx eslint .         # 0 cảnh báo
```

Ảnh minh chứng nằm trong `images/`.
