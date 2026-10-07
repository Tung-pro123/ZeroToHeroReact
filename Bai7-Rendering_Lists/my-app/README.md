# BÀI HỌC 7: RENDERING LISTS (HIỂN THỊ DANH SÁCH DỮ LIỆU)

> Dự án thực hành Vite + React 18 hoàn chỉnh, chuẩn Clean Code doanh nghiệp, kèm chú thích tiếng Việt chi tiết từng dòng code và liên hệ trực tiếp với tư duy lập trình **Spring Boot & Java Stream API**.

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

Dự án được cấu hình chạy độc lập trên **Port 3004** (tránh xung đột với Bài 1: 3000, Bài 5: 3001, Bài 8: 3002, Bài 6: 3003).

```bash
# 1. Di chuyển vào thư mục dự án
cd "d:\Ki5_Fall_2026\React\Bai7-\my-app"

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Chạy môi trường phát triển (Dev Server)
npm run dev
```

Sau khi chạy lệnh, truy cập trình duyệt tại: **`http://localhost:3004/`**

---

## 🎯 CÁC KIẾN THỨC CỐT LÕI CỦA BÀI HỌC

### 1. Bản chất: Chuyển đổi dữ liệu (Data Array) thành giao diện (JSX Array)
- Tách biệt **Mảng dữ liệu thô (Raw Data)** ra khỏi khung hiển thị JSX.
- Tận dụng `filter()` và `map()` của JavaScript.
- **Tương đương hoàn toàn với Java Stream API:**
  - Java: `list.stream().filter(...).map(new DTO(...)).collect(Collectors.toList())`
  - React: `list.filter(...).map(item => <Card key={item.id} {...item} />)`

---

### 2. Cạm bẫy cú pháp: Khối lệnh Arrow Function (`=> {` vs `=> ()`)
- **Implicit Return (Ngoặc tròn - Khuyên dùng):** `items.map(item => ( <li key={item.id}>{item.name}</li> ))` ➡️ Tự động return JSX.
- **Explicit Return (Ngoặc nhọn):** `items.map(item => { return <li key={item.id}>{item.name}</li>; })` ➡️ Phải có lệnh `return`.
- **❌ LỖI KINH ĐIỂN MẤT TRẮNG DỮ LIỆU:** `items.map(item => { <li key={item.id}>{item.name}</li> })` ➡️ Quên chữ `return`, hàm trả về mảng `undefined`, màn hình trắng trơn!

---

### 3. Tại sao React bắt buộc phải có thuộc tính `key`?
- **Reconciliation (Đối soát Virtual DOM):** React dùng `key` để định danh duy nhất từng node trong danh sách.
- Khi dữ liệu được thêm mới, xóa bớt, hoặc đảo thứ tự (sort), React dùng `key` để biết node nào đã chuyển vị trí mà không cần đập bỏ toàn bộ DOM cũ.
- **Vị trí của key:**
  - Cứ thẻ nào đứng ngay đầu sau dấu `=>` của hàm `map()` thì **PHẢI GIỮ THUỘC TÍNH KEY** (dù là thẻ HTML gốc `<li>` hay Component `<Recipe />`).
  - Bên trong component con, **không được và không cần** gán `key` nữa (React không truyền thuộc tính `key` qua `props`).

---

### 4. Hai Cạm Bẫy Chí Mạng Khi Gán Key (Pitfalls)

1. **Cạm bẫy 1: Dùng chỉ số mảng làm key (`key={index}`)**
   - Khi xóa phần tử đầu hoặc sắp xếp, index của các phần tử phía sau bị thay đổi.
   - Khiến các ô `<input>`, checkbox bị gắn nhầm dữ liệu của dòng bị xóa sang dòng mới!
   - *Ngoại lệ:* Chỉ dùng index khi danh sách tĩnh 100%, không bao giờ thay đổi thứ tự hay số lượng.

2. **Cạm bẫy 2: Tự sinh key ngẫu nhiên khi render (`key={Math.random()}`)**
   - Mỗi lần bấm phím hoặc re-render, `Math.random()` sinh một key mới toanh.
   - React đập bỏ DOM node cũ và tạo mới ➡️ **Người dùng bị văng con trỏ chuột (Lost Focus) ngay sau khi gõ 1 chữ**!

---

## 🏆 BẢNG NGUỒN KEY THEO THỨ TỰ ƯU TIÊN

| Nguồn cung cấp Key | Độ an toàn | Đánh giá kiến trúc |
| :--- | :--- | :--- |
| **Database ID (Primary Key `@Id` / UUID)** | ⭐⭐⭐⭐⭐ Tuyệt đối an toàn | Luôn luôn ưu tiên hàng đầu |
| **`crypto.randomUUID()` khi tạo Object** | ⭐⭐⭐⭐⭐ Tuyệt đối an toàn | Tạo 1 lần duy nhất lúc khởi tạo data |
| **Chuỗi tự nhiên duy nhất (Slug, Email)** | ⭐⭐⭐⭐ Rất an toàn | Tốt nếu dữ liệu đảm bảo không trùng lặp |
| **Chỉ số mảng (`index`)** | ⚠️ Thận trọng | Chỉ chấp nhận cho danh sách tĩnh hoàn toàn |
| **`Math.random()` trong `map()`** | ❌ Nghiêm cấm | Gây sập hiệu năng và mất toàn bộ focus input |

---

## 🎯 LỜI GIẢI 4 BÀI TẬP THỬ THÁCH (REACT.DEV)

1. **Challenge 1 (Tách 2 nhóm):**
   ```jsx
   const chemists = people.filter(p => p.profession === 'chemist');
   const everyoneElse = people.filter(p => p.profession !== 'chemist');
   ```
2. **Challenge 2 (Danh sách lồng nhau):** Vòng lặp ngoài duyệt món ăn (`key={recipe.id}`), vòng lặp trong duyệt nguyên liệu (`key={ingredient}`).
3. **Challenge 3 (Tách Component con):**
   ```jsx
   {recipes.map(recipe => (
     <RecipeCardItem key={recipe.id} {...recipe} />
   ))}
   ```
4. **Challenge 4 (List with separator):**
   ```jsx
   import { Fragment } from 'react';
   {poem.lines.map((line, i) => (
     <Fragment key={i}>
       {i > 0 && <hr />}
       <p>{line}</p>
     </Fragment>
   ))}
   ```

---

## ☕ BẢN ĐỒ SO SÁNH VỚI SPRING BOOT & JAVA STREAMS

| Khái niệm | Spring Boot / Java (Backend) | React (Frontend) |
| :--- | :--- | :--- |
| **Lọc dữ liệu** | `list.stream().filter(...)` | `list.filter(...)` |
| **Biến đổi phần tử** | `.map(ScientistDTO::new)` | `.map(s => <Card key={s.id} {...s} />)` |
| **Định danh thực thể** | JPA `@Id` / Primary Key / UUID | Thuộc tính `key={entity.id}` |
| **Thu thập kết quả** | `.collect(Collectors.toList())` | Mảng JSX trực tiếp |
| **Lặp trên template** | Thymeleaf `th:each="item : ${items}"` | JS expression `{items.map(item => ...)}` |
