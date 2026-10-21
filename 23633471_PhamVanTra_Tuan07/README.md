# Tuần 7 — SmartCampus

| | |
|---|---|
| Mã số sinh viên | 23633471 |
| Họ và tên | Phạm Văn Trà |
| Lớp | DHKTPM19A |
| Môn học | Lập trình thiết bị di động |

Ứng dụng SmartCampus gồm hai màn hình: hồ sơ sinh viên và minh hoạ phản hồi
của `Pressable`.

## Chạy dự án

```bash
npm install
npm start        # rồi bấm a để mở Android
```

Dự án dùng Expo SDK 54, nên Expo Go trên thiết bị phải là bản 54 tương ứng.

## Màn hình

| Tab | Nội dung |
|-----|----------|
| Hồ sơ | Thẻ hồ sơ, ô tìm kiếm controlled, thẻ thông tin sinh viên, nút Lưu hồ sơ |
| Tương tác | Hai nút `Pressable` có trạng thái nhấn, đang xử lý và vô hiệu hoá |

## Cấu trúc thư mục

```
app/
├── _layout.tsx              Stack gốc
└── (tabs)/
    ├── _layout.tsx          Bottom tabs: Hồ sơ, Tương tác
    ├── index.tsx            Re-export màn homework
    ├── homework.tsx         Màn Hồ sơ
    └── interaction.tsx      Màn Tương tác
components/
├── header.tsx               Thanh tiêu đề SmartCampus
├── avatar.tsx               Ảnh đại diện
├── profile-card.tsx         Tên và mã sinh viên
├── search-field.tsx         Ô tìm kiếm controlled
├── info-row.tsx             Một dòng nhãn và giá trị
├── cart-student.tsx         Thẻ thông tin sinh viên
├── action-button.tsx        Nút Lưu hồ sơ
└── pressible-button.tsx     Nút có trạng thái đang xử lý
constants/theme.ts
```

## Điểm kỹ thuật

Ô tìm kiếm là controlled input: giá trị hiển thị đến từ state của màn hình, và
dòng kết quả bên dưới dùng `accessibilityLiveRegion` nên trình đọc màn hình
đọc lên khi nội dung đổi.

`PressableButton` nhận `isLoading` để đổi nhãn và vô hiệu hoá nút trong lúc
xử lý, tránh người dùng bấm nhiều lần cho cùng một hành động.

## Kiểm tra

```bash
npx tsc --noEmit     # 0 lỗi
npx eslint .         # 0 cảnh báo
```

Ảnh minh chứng nằm trong `images/`.
