# Ứng Dụng Thực Hành Tương Tác - Bài 12: Render and Commit 🍽️

> **Dự án Lab thực chiến chuyên sâu:** Trực quan hóa 3 giai đoạn của chu trình (Trigger $\rightarrow$ Render $\rightarrow$ Commit $\rightarrow$ Paint), Thí nghiệm bảo toàn DOM Node của thẻ `<input>`, Bộ soi thuật toán Diffing và Đối chiếu chuyên sâu với Hibernate Dirty Checking & Spring MVC.

---

## 🌟 Các Tính Năng Nổi Bật Trong Lab

1. **🍽️ Bộ Giả Lập Chu Trình 3 Bước (Pipeline Stepper):**
   - Trực quan hóa từng bước từ *Trigger* (Khách gọi món / Gọi `setState`) $\rightarrow$ *Render* (Đầu bếp nấu trong RAM / Tính toán JSX) $\rightarrow$ *Commit* (Bồi bàn bưng ra bàn / Sửa Real DOM) $\rightarrow$ *Browser Paint* (Thực khách thưởng thức / Đổ màu pixel).
   - Nút bấm kích hoạt mô phỏng tự động từng nấc kèm phân tích: Ai thực thi? Có đụng vào DOM thật không?

2. **⏰ Thí Nghiệm Kinh Điển: Đồng Hồ Nhảy Giây & Ô Input:**
   - Đồng hồ re-render mỗi 1000ms.
   - Ô nhập liệu ngay bên dưới không hề bị mất chữ hay mất tiêu điểm (Focus), minh chứng cho việc React chỉ cập nhật node `<h1>` và bảo toàn 100% node `<input>`.
   - So sánh với cách làm cũ của Vanilla JS dùng `innerHTML` làm phá hủy DOM.

3. **🔍 Bộ Soi Thuật Toán Diffing (Virtual DOM Diffing Inspector):**
   - Đối chiếu cây Virtual DOM Trước vs Sau.
   - Thống kê tỷ lệ tiết kiệm thao tác DOM (chỉ sửa 1 node bị thay đổi, bỏ qua 75% các node đứng yên).

4. **☕ Đối Chiếu Chuyên Sâu Java / Spring Boot & Hibernate:**
   - So sánh Virtual DOM Diffing với **Hibernate JPA Dirty Checking** (`flush()` chỉ sinh SQL `UPDATE` cho đúng cột bị thay đổi).
   - So sánh chu trình Render & Commit với Request Pipeline của **Spring MVC** (`DispatcherServlet` $\rightarrow$ `Controller` $\rightarrow$ `Response OutputStream`).

5. **🎯 Trắc Nghiệm Đánh Giá & Phỏng Vấn:**
   - 4 câu hỏi trắc nghiệm kiểm tra sâu về bản chất Render phase, Commit phase và Strict Mode.

---

## 🛠️ Hướng Dẫn Cài Đặt & Khởi Chạy

1. **Di chuyển vào thư mục ứng dụng:**
   ```bash
   cd Bai12-Render_And_Commit/my-app
   ```

2. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Khởi động Development Server:**
   ```bash
   npm run dev
   ```

4. Truy cập trình duyệt tại `http://localhost:3006`.
