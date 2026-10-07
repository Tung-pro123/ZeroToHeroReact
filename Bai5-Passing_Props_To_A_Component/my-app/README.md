# 🧩 Bài 5: Passing Props To A Component (Vite + React)

Dự án mẫu thực hành chuyên sâu theo bài học **"Passing Props to a Component"** từ trang chính thức **react.dev**, được thiết kế riêng với các ví dụ so sánh trực quan dành cho kỹ sư **Java / Spring Boot**.

---

## 🚀 Hướng Dẫn Khởi Chạy Dự Án

Mở terminal tại thư mục `Bai5-Passing_Props_To_A_Component/my-app`:

```bash
# 1. Cài đặt các thư viện (React, Vite)
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev
```

> Dự án chạy tại cổng **`http://localhost:3001`** (tách biệt với Bài 1 chạy ở cổng 3000 để bạn có thể mở cả 2 dự án song song).

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
my-app/
├── index.html                           # Điểm neo #root duy nhất của SPA
├── package.json                         # Quản lý dependencies
├── vite.config.js                       # Cấu hình Vite dev server (port 3001)
├── src/
│   ├── main.jsx                         # Điểm vào của ứng dụng
│   ├── App.jsx                          # Root Component điều phối 5 Tab học tập
│   ├── App.css                          # Định kiểu giao diện Glassmorphism hiện đại
│   ├── index.css                        # Design System Tokens
│   ├── utils/
│   │   └── imageUrl.js                  # Hàm tiện ích tạo URL ảnh CDN theo kích thước
│   └── components/
│       ├── common/
│       │   └── Card.jsx                 # Minh họa Prop "children" ("Cái vỏ rỗng", OCP)
│       ├── props-basics/
│       │   ├── Avatar.jsx               # Truyền/Nhận Props, dấu {{ }}, size mặc định
│       │   └── GalleryDemo.jsx          # Component cha truyền đa dạng Props
│       ├── spread-demo/
│       │   └── SpreadPropsDemo.jsx      # Trực quan hóa {...props} vs truyền thẳng
│       ├── immutability/
│       │   └── PropsImmutabilityDemo.jsx # Minh họa tính bất biến & so sánh Java Record
│       ├── challenges/
│       │   └── ChallengeSection.jsx     # Giải quyết trọn vẹn Challenges 1, 2, 3 của react.dev
│       └── spring-comparison/
│           └── SpringPropsTable.jsx     # Bảng đối chiếu Spring Boot DTO vs React Props
```

---

## 🎯 6 Trọng Tâm Cốt Lõi Trong Bài 5

### 1. Giải mã 2 ảnh minh họa trong bài học:
- **Ảnh Bước 1:** `<Avatar person={{ name: '...', imageId: '...' }} size={100} />`
  - Dấu `{` ngoài cùng là biểu thức JSX.
  - Dấu `{` bên trong là cú pháp khai báo JavaScript Object.
- **Ảnh Bước 2:** `function Avatar({ person, size })`
  - React tự đóng gói tất cả thuộc tính thành `props`.
  - Cặp ngoặc `{ person, size }` là cú pháp ES6 Object Destructuring. Nếu quên dấu `{ }`, tham số đầu tiên sẽ hứng trọn toàn bộ object!

### 2. Giá trị mặc định (Default Values):
- `function Avatar({ person, size = 100 })`: Nếu cha không truyền `size` hoặc truyền `undefined`, tự động nhận `100`. (Lưu ý: Nếu cha truyền `null`, default value sẽ **không** được kích hoạt).

### 3. Toán tử Spread `{...props}`:
- Giải quyết bài toán chuyển tiếp (forward) toàn bộ props cho component con mà không cần gõ lại từng trường.
- ❌ **Tránh:** Truyền thẳng `props={props}` vì sẽ tạo ra object lồng 2 tầng gây lỗi `undefined`.

### 4. Vũ khí hạng nặng: Prop `children` (Tư duy "Cái Vỏ Rỗng"):
- Cho phép nhúng bất kỳ JSX nào vào giữa 2 thẻ mở/đóng `<Card>...</Card>`.
- Tuân thủ nguyên lý Đóng/Mở (**Open/Closed Principle** trong SOLID) và cắt đứt vấn nạn **Prop Drilling**.

### 5. Tính bất biến (Props are Immutable):
- Props là **Read-Only Snapshot** (bức ảnh chụp nhanh dữ liệu tại thời điểm render).
- Tuyệt đối cấm gán đè `props.size = 200;`. Muốn giao diện thay đổi theo tương tác người dùng, phải dùng **State** ở các bài sau.

### 6. Lời giải 3 Thử Thách (Challenges):
- **Challenge 1:** Tách component `Profile` nhận các props: `name`, `imageId`, `profession`, `awards`, `discovery`.
- **Challenge 2:** Tự động chọn ảnh nhỏ (`s`) nếu `imageSize < 90px`, ảnh to (`b`) nếu ngược lại.
- **Challenge 3:** Gói gọn toàn bộ hồ sơ nhà khoa học vào trong khung `<Card>` thông qua prop `children`.
