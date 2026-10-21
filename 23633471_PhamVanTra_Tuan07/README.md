# Tuần 7 — BookStore: đăng nhập và lưu phiên

| | |
|---|---|
| Mã số sinh viên | 23633471 |
| Họ và tên | Phạm Văn Trà |
| Lớp | DHKTPM19A – 420300143201 |
| Môn học | Lập trình thiết bị di động |

Ứng dụng BookStore có đăng nhập, đăng ký, lưu phiên bằng `AsyncStorage`, màn
hình chỉ cho người đã đăng nhập, và chức năng viết đánh giá sách.

## Chạy dự án

```bash
npm install
npm start        # rồi bấm a để mở Android
```

Dự án dùng Expo SDK 54, nên Expo Go trên thiết bị phải là bản 54 tương ứng.

Tài khoản có sẵn để thử: `tra.23633471@sv.iuh.edu.vn` / `123456`.

## Bản đồ bài tập

| Nội dung | File chính |
|----------|-----------|
| Form đăng nhập và đăng ký kèm kiểm tra dữ liệu | `app/login.tsx` |
| Lưu và khôi phục phiên bằng AsyncStorage | `store/auth-store.tsx` |
| Màn hình bắt buộc đăng nhập mới vào được | `app/checkout.tsx` |
| Chi tiết sách, viết đánh giá, sách cùng thể loại | `app/books/[id].tsx` |
| Chấm sao dùng chung cho cả xem và nhập | `components/rating-stars.tsx` |

## Cấu trúc thư mục

```
app/
├── _layout.tsx              AuthProvider bọc Stack
├── index.tsx                Trang chủ, danh sách sách
├── login.tsx                Đăng nhập và đăng ký
├── checkout.tsx             Thanh toán, cần đăng nhập
└── books/[id].tsx           Chi tiết sách và đánh giá
components/
├── book-card.tsx            Thẻ sách ở trang chủ
├── form-field.tsx           Ô nhập kèm nhãn và dòng lỗi
└── rating-stars.tsx         Năm ngôi sao, xem hoặc chấm
services/
├── auth-service.ts          API giả cho đăng nhập, đăng ký
└── review-service.ts        API giả cho gửi đánh giá
store/auth-store.tsx         Context giữ phiên đăng nhập
data/books.ts
types/index.ts
constants/theme.ts
```

## Điểm kỹ thuật

**Phiên đăng nhập có hạn dùng.** Object lưu xuống `AsyncStorage` gồm token,
thông tin người dùng và `expiresAt`. Lúc mở app, store đọc lên và chỉ nhận lại
phiên khi còn hạn, hết hạn thì xoá luôn khoá đó. Trong lúc đọc, cờ `isRestoring`
giữ màn hình ở trạng thái chờ, nhờ vậy trang chủ không kịp nháy qua giao diện
chưa đăng nhập rồi mới đổi lại.

**Chặn truy cập ở ngay màn hình cần chặn.** `app/checkout.tsx` tự kiểm tra và
trả về `Redirect` sang màn đăng nhập, kèm `returnTo=checkout`. Đăng nhập xong,
màn login đọc tham số đó rồi `replace` thẳng sang thanh toán. Người dùng vào từ
đâu cũng quay lại đúng chỗ, mà trang chủ không phải biết gì về luật này.

**Lỗi nhập liệu và lỗi từ server tách riêng.** Hàm `validate` chạy trước khi gọi
service nên không tốn một vòng gọi mạng cho dữ liệu sai định dạng; lỗi trả về từ
service được đặt vào `errors.form` và hiện ở một khối riêng. Cả hai dòng lỗi đều
có `accessibilityLiveRegion` để trình đọc màn hình đọc lên khi xuất hiện.

**Một component sao dùng cho hai việc.** `RatingStars` không truyền `onChange`
thì thành dạng chỉ để xem, có truyền thì bấm chấm điểm được. Nhờ vậy điểm trung
bình ở thẻ sách, điểm ở từng đánh giá và ô chấm sao trong form dùng chung một
chỗ.

## Kiểm tra

```bash
npx tsc --noEmit     # 0 lỗi
npx eslint .         # 0 cảnh báo
```

Ảnh minh chứng nằm trong `images/`.
