# Tuần 5 (State) — Điều hướng và State toàn cục

| | |
|---|---|
| Mã số sinh viên | 23633471 |
| Họ và tên | Phạm Văn Trà |
| Lớp | DHKTPM19A – 420300143201 |
| Môn học | Lập trình thiết bị di động |
| Chủ đề | Điều hướng và State toàn cục — ứng dụng BookStore Online |

Tiếp nối bộ layout tĩnh của tuần trước, nay gắn điều hướng thật và state toàn
cục để thành ứng dụng chạy được end-to-end.

## Chạy dự án

```bash
npm install
npm start        # rồi bấm a để mở Android
```

## Bản đồ bài tập

| Bài | Nội dung | File chính |
|-----|----------|-----------|
| 1 | Bottom Tab Navigator 4 tab + Stack Home sang Chi tiết | `src/navigation/` |
| 2 | Giỏ hàng sang Thanh toán, truyền tổng tiền qua params | `src/screens/checkout-screen.tsx` |
| 3 | Store giỏ hàng: thêm, xoá, đổi số lượng, tổng tiền | `src/store/slices/cart-slice.ts` |
| 4 | Store người dùng, tab Tài khoản đổi theo isLoggedIn | `src/store/slices/auth-slice.ts` |
| Thử thách | Store danh sách yêu thích | `src/store/slices/wishlist-slice.ts` |

## Cấu trúc thư mục

```
src/
├── App.tsx                    Provider + SafeAreaProvider + NavigationContainer
├── navigation/
│   ├── types.ts               Khai báo params của từng màn hình
│   ├── app-tab-bar.tsx        Custom tabBar, bọc lại UI tuần trước
│   ├── main-tabs.tsx          Bottom Tab Navigator
│   └── root-navigator.tsx     Native Stack ngoài cùng
├── store/
│   ├── index.ts               configureStore
│   ├── hooks.ts               useAppDispatch, useAppSelector (chỉ adapter dùng)
│   ├── slices/                cart, auth, wishlist
│   └── adapters/              useCart, useAuth, useWishlist
├── screens/                   Home, BookDetail, Cart, Checkout, Category, Account
├── components/                Tái sử dụng nguyên từ tuần trước
├── constants/theme.ts
├── data/books.ts
└── types/book.ts
```

## Adapter pattern

Đây là yêu cầu trọng tâm của đề: component gọi `useCart()` thay vì import trực
tiếp Redux.

```
Component  →  useCart / useAuth / useWishlist  →  react-redux  →  slice
             (ranh giới duy nhất chạm thư viện)
```

Quy tắc: chỉ thư mục `src/store/` được import `react-redux`, cộng thêm
`App.tsx` ở đúng chỗ gắn `Provider` — đó là composition root chứ không phải
màn hình. Không màn hình nào gọi `useSelector` hay `useDispatch`.

Kiểm tra bằng lệnh:

```bash
grep -rln "react-redux" src/
# chỉ ra src/App.tsx và src/store/hooks.ts
```

Muốn đổi sang Recoil thì viết lại ba file adapter cho khớp kiểu `CartAdapter`,
`AuthAdapter`, `WishlistAdapter`. Không màn hình nào phải sửa, vì hợp đồng
giữa chúng và store là ba kiểu đó chứ không phải thư viện bên dưới.

## Tái sử dụng UI của tuần trước

Đề yêu cầu không dựng lại giao diện từ đầu.

| Component tuần trước | Dùng ở tuần này |
|----------------------|-----------------|
| `BottomTabBar` | Làm custom tabBar của React Navigation, qua lớp bọc `AppTabBar` |
| `StoreHeader` | Bốn màn hình tab |
| `FloatingCartButton` | Home, badge nay lấy từ store |
| `BookGrid`, `BookGridCard`, `BookCover` | Home |
| `BookCardRow` | Danh mục |
| `CategoryChips` | Home, Danh mục |
| `CartRow`, `CartSummary` | Giỏ hàng |

`BottomTabBar` giữ nguyên, không biết gì về React Navigation. `AppTabBar` là
lớp chuyển đổi nhận `{ state, descriptors, navigation }` rồi dịch sang props mà
`BottomTabBar` đã hiểu. Nhờ vậy component gốc vẫn dùng lại được ở bài layout
tĩnh của tuần trước.

`CartRow` có bổ sung hai prop tuỳ chọn `onChangeQuantity` và `onRemove` để phục
vụ action cập nhật số lượng. Bỏ trống hai prop đó thì dòng quay về dạng chỉ để
xem như tuần trước.

## State toàn cục và state cục bộ

| Loại | Ví dụ | Lý do |
|------|-------|-------|
| Toàn cục | Giỏ hàng | Home, Chi tiết, Giỏ hàng, Tài khoản và thanh tab đều đọc |
| Toàn cục | Đăng nhập | Quyết định tab Tài khoản hiển thị gì, sau này cả header |
| Toàn cục | Yêu thích | Chi tiết sách ghi, Tài khoản đọc |
| Cục bộ | Danh mục đang lọc | Không màn nào khác cần biết, mất đi khi rời màn cũng không sao |

## Ba điểm kỹ thuật đáng chú ý

**Từ SDK 56, expo-router không còn tương thích với react-navigation.** Metro
chặn thẳng khi thấy cả hai cùng có mặt. Đề bài yêu cầu react-navigation nên
phải gỡ hẳn expo-router: xoá khỏi `package.json`, xoá plugin trong `app.json`,
tắt `experiments.typedRoutes`, và đổi `web.output` từ `static` sang `single`.
Đây cũng là chỗ `AGENTS.md` của scaffold nói ngược với đề bài.

**Slice chỉ giữ `bookId` và số lượng, không giữ cả đối tượng sách.** State vì
thế luôn tuần tự hoá được, và giá sách đổi thì giỏ hàng không giữ lại giá cũ.
Việc ghép id với dữ liệu sách để ra tên, giá và tổng tiền là việc của adapter.

**Màn Thanh toán cố ý không đọc store.** Nó nhận số tiền đã chốt tại thời điểm
bấm nút qua `route.params`. Nếu người dùng quay lại và sửa giỏ hàng thì con số
ở màn thanh toán không tự đổi theo — đúng như một đơn hàng đã được lập.

## Phần chưa làm

`AsyncStorage` nằm trong phần quy ước chung của cả môn nhưng không xuất hiện
trong bốn bài tập của tuần này, và bài 4 ghi rõ dùng dữ liệu giả cho tới tuần 7.
Vì vậy chưa thêm lớp lưu trữ cục bộ. Khi cần, chỗ thêm là một middleware của
store, không phải sửa adapter hay màn hình.

## Kiểm tra

```bash
npx tsc --noEmit     # 0 lỗi
npx eslint src       # 0 cảnh báo
```

Ảnh minh chứng nằm trong `images/`.
