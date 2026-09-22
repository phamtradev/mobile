# Tuần 5 — Layout với Flexbox

| | |
|---|---|
| Mã số sinh viên | 23633471 |
| Họ và tên | Phạm Văn Trà |
| Lớp | DHKTPM19A – 420300143201 |
| Môn học | Lập trình thiết bị di động |
| Chủ đề | Layout với Flexbox — ứng dụng BookStore Online |

Toàn bộ bài tập chỉ dùng `View`, `Text`, `Image`, `ScrollView` và `StyleSheet`.
Không gọi API, không dùng thư viện điều hướng, không quản lý state toàn cục.

## Chạy dự án

```bash
npm install
npm start        # rồi bấm a để mở Android, w để mở web
```

Màn hình đầu tiên là menu liệt kê toàn bộ bài tập, chạm vào từng mục để xem.

## Bản đồ bài tập

| Giờ | Bài | Route | Trọng tâm |
|-----|-----|-------|-----------|
| 1 | Bài 1 | `/g1b1-header` | `flexDirection: row`, `justifyContent: space-between`, `alignItems: center` |
| 1 | Bài 2 | `/g1b2-book-card` | ảnh cố định + cột `flex: 1`, giá đẩy đáy bằng `space-between` |
| 1 | Thử thách | `/g1tt-header-list` | header cố định, vùng nội dung `flex: 1` |
| 2 | Bài 1 | `/g2b1-chips` | `flexWrap: wrap`, `gap`, `alignContent` |
| 2 | Bài 2 | `/g2b2-grid` | `width: 48%`, `space-between`, `aspectRatio` |
| 2 | Thử thách | `/g2tt-grid3` | lưới 3 cột, so sánh phần trăm với `gap` |
| 3 | Bài 1 | `/g3b1-badge` | `position: absolute` trong containing block |
| 3 | Bài 2 | `/g3b2-floating-cart` | absolute lồng nhau, hình tròn bằng `borderRadius` |
| 3 | Thử thách | `/g3tt-grid-badge` | nhiều lớp phủ trên cùng một màn hình |
| 4 | Bài 1 | `/g4b1-home` | header cố định, `ScrollView flex: 1`, nút nổi ngoài `ScrollView` |
| 4 | Bài 2 | `/g4b2-detail` | `alignSelf: center`, thanh cố định trên và dưới |
| 5 | Bài 1 | `/g5b1-tabbar` | mỗi mục `flex: 1`, container lồng nhau row và column |
| 5 | Bài 2 | `/g5b2-cart` | ba vùng dọc không chồng lấp |
| 5 | Thử thách | `/g5tt-app` | năm màn hình dùng chung tab bar, chuyển bằng `useState` |

## Cấu trúc thư mục

```
src/
├── app/                       Route của expo-router, mỗi file chỉ render một component
├── components/
│   ├── book/                  BookCover, DiscountBadge, BookCardRow, BookGridCard, BookGrid
│   ├── category/              CategoryChips
│   ├── cart/                  CartRow, CartSummary
│   ├── layout/                StoreHeader, FloatingCartButton, BottomTabBar
│   ├── screens/               Home, BookDetail, Cart, Category, Account, AppShell
│   └── common/                DemoPage
├── constants/theme.ts         bảng màu, spacing, tỉ lệ ảnh bìa
├── data/books.ts              dữ liệu tĩnh dùng chung
└── types/book.ts
```

## Các nguyên tắc đã áp dụng

### DRY

Mỗi mảnh giao diện chỉ dựng một lần rồi dùng lại ở mọi nơi cần:

| Component | Dùng ở |
|-----------|--------|
| `BookCover` | thẻ hàng ngang, ô lưới, dòng giỏ hàng, màn chi tiết |
| `StoreHeader` | Trang chủ, Danh mục, Giỏ hàng, Tài khoản |
| `CategoryChips` | Trang chủ và Danh mục |
| `BookCardRow` | Giờ 1, Giờ 3, màn hình Danh mục |
| `BookGrid` | Giờ 2 bài 2, Giờ 2 thử thách, Giờ 3 thử thách, Trang chủ |

Nhờ vậy màn hình Danh mục gần như không có style riêng, nó chỉ ghép lại các
mảnh đã có.

### SRP

`BookGrid` lo việc chia cột. `BookGridCard` lo việc trình bày một ô.
`BookCover` lo ảnh và lớp phủ. Ba việc khác nhau nên nằm ở ba file khác nhau —
đổi cách chia cột không phải mở file nào liên quan tới ảnh.

### OCP

`BookGrid` nhận `columns` và `mode`, nên phục vụ được cả lưới 2 cột lẫn lưới
3 cột, cả cách chia phần trăm lẫn cách dùng `gap`, mà không cần sửa gì bên
trong. Thử thách của giờ 2 chỉ là truyền props khác.

### KISS

Không dùng thư viện UI, thư viện lưới hay thư viện điều hướng nào. Thử thách
cuối chuyển màn bằng đúng một `useState`.

### YAGNI — những gì cố tình không làm

| Không làm | Lý do |
|-----------|-------|
| `FlatList` cho lưới sách | Đề yêu cầu luyện flexbox thuần, chưa dùng `numColumns` |
| Thư viện điều hướng | Tuần này chỉ dựng layout tĩnh của tab bar |
| Thêm / bớt số lượng trong giỏ | Đề không yêu cầu, và sẽ kéo bài sang chủ đề state |
| Hỗ trợ chế độ tối | Chưa có trong tiêu chí đánh giá |

## Ba điểm kỹ thuật đáng chú ý

**Trong React Native, `position` mặc định đã là `relative`, không phải `static`
như trên web.** Vì vậy mọi `View` đều sẵn sàng làm containing block, và viết
`position: 'relative'` chỉ để ghi rõ ý định. Lỗi thường gặp không phải quên
khai báo `relative`, mà là đặt badge nhầm `View` cha — badge luôn tính mốc
theo cha trực tiếp của nó. Màn hình `/g3b1-badge` dựng lại đúng lỗi này để
đối chiếu.

**`width` phần trăm không tự trừ đi phần `gap`.** Đặt cùng lúc `width: '33.33%'`
và `gap: 16` sẽ làm tràn hàng. Muốn dùng `gap` thì phải đo bề rộng container
bằng `onLayout` rồi tính `(bề rộng − tổng gap) / số cột`. Đó là lý do
`BookGrid` có hai chế độ: cách phần trăm không cần đo, cách `gap` cần đo.

**`aspectRatio` thay cho `height` cố định.** Ô lưới đổi bề rộng theo số cột và
theo kích thước màn hình, nên đặt `height` cố định sẽ làm ảnh méo. Đặt
`width: '100%'` kèm `aspectRatio: 3/4` thì chiều cao tự suy ra.

## Kiểm tra

```bash
npx tsc --noEmit     # 0 lỗi
npx eslint src       # 0 cảnh báo
```

Ảnh minh chứng cho từng bài nằm trong `images/`.
