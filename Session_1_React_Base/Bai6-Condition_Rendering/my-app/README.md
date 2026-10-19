# BÀI HỌC 6: CONDITIONAL RENDERING (HIỂN THỊ CÓ ĐIỀU KIỆN)

> Dự án thực hành Vite + React 18 hoàn chỉnh, chuẩn Clean Code doanh nghiệp, kèm chú thích tiếng Việt chi tiết từng dòng code và liên hệ trực tiếp với tư duy lập trình **Spring Boot**.

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

Dự án được cấu hình chạy độc lập trên **Port 3003** (tránh xung đột với Bài 1: 3000, Bài 5: 3001, Bài 8: 3002).

```bash
# 1. Di chuyển vào thư mục dự án
cd "d:\Ki5_Fall_2026\React\Bai6-\my-app"

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Chạy môi trường phát triển (Dev Server)
npm run dev
```

Sau khi chạy lệnh, truy cập trình duyệt tại: **`http://localhost:3003/`**

---

## 🎯 4 KỸ THUẬT RẼ NHÁNH GIAO DIỆN CỐT LÕI

| Kỹ thuật | Cú pháp | Vị trí áp dụng | Trường hợp tối ưu |
| :--- | :--- | :--- | :--- |
| **1. if / else & return null** | `if (isPacked) return <JSX>;` | Trước lệnh `return` chính | Hai khối giao diện hoàn toàn khác nhau, hoặc muốn ẩn hoàn toàn DOM (`return null`) |
| **2. Toán tử 3 ngôi (? :)** | `{isPacked ? <A /> : <B />}` | Ngay trong cây JSX `{}` | Chuẩn DRY, tránh lặp lại thẻ bọc cha `<li className="item">` |
| **3. Toán tử logic AND (&&)** | `{condition && <Badge />}` | Ngay trong cây JSX `{}` | Điều kiện 1 chiều: Thêm icon, huy hiệu hoặc thông báo khi điều kiện đúng |
| **4. Biến gán linh hoạt (let)** | `let content = ...; if (...) content = ...;` | Kết hợp trước và trong JSX | Tách rời logic tính toán khỏi hiển thị, thích hợp khi nhiều nhánh phức tạp |

---

## ⚠️ CẢNH BÁO CHÍ MẠNG: "BẪY SỐ 0" KHI DÙNG TOÁN TỬ `&&`

### Hiện tượng
```jsx
// ❌ CÁCH VIẾT SAI NGUY HIỂM:
{count && <p>Tin nhắn mới</p>}
```
Khi `count = 0`, màn hình sẽ **in ra số 0** ngoài ý muốn!

### Nguyên nhân cốt lõi (Khác biệt giữa Java và JavaScript)
- **Trong Java:** Toán tử `&&` chỉ chấp nhận kiểu `boolean`. Nếu bạn viết `if (count && ...)` với `int count`, trình biên dịch Java sẽ báo lỗi ngay lập tức.
- **Trong JavaScript:** Toán tử `&&` áp dụng *Short-circuit evaluation* và **trả về giá trị của toán hạng cuối cùng được đánh giá**:
  - `true && <JSX>` ➡️ Trả về `<JSX>` (Hiển thị)
  - `false && <JSX>` ➡️ Trả về `false` (React bỏ qua)
  - `0 && <JSX>` ➡️ Dừng ở số `0` và **trả về số 0**! Vì React coi `0` là một số hợp lệ nên sẽ render ra thẻ HTML!

### ✅ 3 Cách khắc phục chuẩn:
1. **So sánh số học rõ ràng (Khuyên dùng):** `{count > 0 && <p>Tin nhắn mới</p>}`
2. **Ép kiểu boolean với `!!`:** `{!!count && <p>Tin nhắn mới</p>}`
3. **Dùng toán tử 3 ngôi tường minh:** `{count > 0 ? <p>Tin nhắn mới</p> : null}`

---

## 🎯 LỜI GIẢI 3 BÀI TẬP THỬ THÁCH (REACT.DEV CHALLENGES)

1. **Challenge 1:** Dùng toán tử 3 ngôi `? :` để hiện icon `❌` khi `isPacked` là `false`:
   ```jsx
   function Item({ name, isPacked }) {
     return <li className="item">{name} {isPacked ? '✅' : '❌'}</li>;
   }
   ```
2. **Challenge 2:** Hiển thị độ ưu tiên với `importance > 0 && ...` để tránh in số 0 khi `importance = 0`.
3. **Challenge 3:** Thay thế nhiều toán tử `? :` lồng nhau bằng **Object Dictionary (Strategy Map Pattern)**:
   ```jsx
   const drinks = {
     tea: { part: 'leaf', caffeine: '15–70 mg/cup', age: '4,000+ years' },
     coffee: { part: 'bean', caffeine: '80–185 mg/cup', age: '1,000+ years' },
   };
   const info = drinks[name]; // Tra cứu O(1)
   ```

---

## ☕ BẢN ĐỒ SO SÁNH VỚI SPRING BOOT & THYMELEAF

| Tính năng | Spring Boot / Thymeleaf (Java SSR) | React (Client-Side Virtual DOM) |
| :--- | :--- | :--- |
| **Rẽ nhánh điều kiện** | `th:if="${isPacked}"`, `th:unless="${isPacked}"` | `{isPacked && <Badge />}`, `{isPacked ? <A /> : <B />}` |
| **Ẩn hoàn toàn DOM** | Không render thẻ hoặc trả về `ResponseEntity.noContent()` | `return null;` trong component con |
| **Tra cứu nhiều nhánh** | `th:switch` / `th:case` | Object Dictionary: `drinks[name]` |
| **Cơ chế kiểu dữ liệu** | Static Typing khắt khe, `&&` bắt buộc boolean | Dynamic Typing, short-circuit trả về operand value |
