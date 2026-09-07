# Tuần 03 — Chương 3: Hook trong React Native

Sinh viên: **Phạm Văn Trà** — MSSV: **23633471**

Ứng dụng Expo Router gồm 6 màn hình, mỗi màn hình là một bài thực hành trong phiếu bài tập Chương 3.

## Cách chạy

```bash
npm install
npm start          # chọn nền tảng trong terminal
npm run web        # hoặc mở trực tiếp trên web
npm run typecheck  # kiểm tra TypeScript
```

## Màn hình danh sách bài tập

![Menu bài tập](docs/screenshots/00-menu.png)

## Bài 1 — useState: Form nhập họ tên

Nhập họ tên để hiển thị lời chào, thêm trạng thái tuổi (cảnh báo khi dưới 18) và nút xóa toàn bộ dữ liệu.

![Bài 1 - useState](docs/screenshots/01-usestate.png)

## Bài 2 — useEffect: Theo dõi trạng thái kết nối

Công tắc kết nối giả lập, effect chạy lại theo `isConnected` để đổi thông báo, đổi màu chữ và ghi lại thời điểm kết nối gần nhất.

| Ngắt kết nối | Đã kết nối |
| --- | --- |
| ![Bài 2 - ngắt kết nối](docs/screenshots/02-useeffect-off.png) | ![Bài 2 - đã kết nối](docs/screenshots/02-useeffect-on.png) |

## Bài 3 — useContext: Chia sẻ thông tin người dùng

`UserContext` tách sang tệp riêng, cung cấp tên, email, ảnh đại diện và hàm đăng nhập/đăng xuất cho `ProfileScreen` mà không truyền props.

![Bài 3 - useContext](docs/screenshots/03-usecontext.png)

## Bài 4 — useReducer: Form đăng nhập

Một reducer quản lý email, mật khẩu, lỗi và trạng thái `isSubmitting`; kiểm tra email có `@`, mật khẩu tối thiểu sáu ký tự và có nút đặt lại.

| Báo lỗi | Đăng nhập thành công |
| --- | --- |
| ![Bài 4 - báo lỗi](docs/screenshots/04-usereducer-error.png) | ![Bài 4 - thành công](docs/screenshots/04-usereducer-success.png) |

## Bài 5 — useMemo và useCallback: Tìm kiếm và tính tổng sản phẩm

Lọc theo tên, giới hạn giá tối đa, sắp xếp giá tăng/giảm dần bằng `useMemo`; hàm chọn sản phẩm giữ nguyên tham chiếu bằng `useCallback` và `ProductItem` được bọc `React.memo`.

![Bài 5 - useMemo và useCallback](docs/screenshots/05-usememo.png)

## Bài 6 — Bài tập tổng hợp: Quản lý công việc cá nhân

Thêm, hoàn thành, xóa, lọc công việc theo từ khóa, đếm số việc chưa hoàn thành và chuyển giao diện sáng/tối. Dùng đủ sáu Hook: `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, `useCallback`.

| Giao diện sáng | Giao diện tối |
| --- | --- |
| ![Bài 6 - giao diện sáng](docs/screenshots/06-todo-light.png) | ![Bài 6 - giao diện tối](docs/screenshots/06-todo-dark.png) |
