# Ứng Dụng Thực Hành Tương Tác - Bài 10: Responding to Events ⚡

> **Dự án Lab thực chiến chuyên sâu:** Phân tích cạm bẫy Truyền hàm vs Gọi hàm, Trực quan hóa Event Bubbling & `e.stopPropagation()`, Trải nghiệm SPA Form với `e.preventDefault()`, và Giải mã 100% thử thách chính thức của React.dev.

---

## 🌟 Các Tính Năng Nổi Bật Trong Lab

1. **⚠️ Phòng Thí Nghiệm Cạm Bẫy Truyền Hàm (Pass vs Call Lab):**
   - So sánh trực quan giữa cú pháp đúng `onClick={handleClick}` và sai lầm phổ biến `onClick={handleClick()}`.
   - Bảng nhật ký thực thi (Live Execution Log) chứng minh hàm sai chạy ngay lập tức trong pha Render và khiến nút bị liệt.
   - Cú pháp truyền tham số qua hàm mũi tên `onClick={() => handleClick(id)}`.

2. **🌊 Bộ Trực Quan Hóa Sủi Bọt Sự Kiện (Event Bubbling Visualizer):**
   - Cấu trúc 3 tầng lồng nhau: Toolbar (Cấp 3) $\rightarrow$ Post Card (Cấp 2) $\rightarrow$ Nút Thích / Xóa (Cấp 1).
   - Công tắc chuyển đổi `e.stopPropagation()` Bật/Tắt để quan sát sự kiện sủi bọt ngược lên trên hoặc bị chặn đứng tại chỗ.
   - Đối chiếu với cơ chế ngắt chuỗi Filter trong Spring Boot.

3. **⛔ Phòng Thí Nghiệm SPA Form (preventDefault Lab):**
   - So sánh trải nghiệm giữa Web cổ điển (không dùng `preventDefault`, reload trang F5 làm mất sạch State trong RAM) và React SPA (giữ nguyên dữ liệu, gửi API ngầm qua fetch/axios).

4. **🎛️ Component Nút Bấm Tái Sử Dụng (Design System Pattern):**
   - Thiết kế `<CustomButton onAction={...} />` nhận logic xử lý từ component cha qua Props.
   - Quy tắc đặt tên tùy biến theo ngữ cảnh nghiệp vụ (`onPlayMovie`, `onUploadImage`, `onSmash`).

5. **🎯 Lời Giải 100% Thử Thách React.dev & Trắc Nghiệm:**
   - Thử thách 1: Sửa nút bật tắt đèn bị liệt (Light Switch).
   - Thử thách 2: Nút đổi màu không làm tăng nhầm bộ đếm click trang (Color Switch).
   - Bộ 4 câu hỏi trắc nghiệm củng cố kiến thức kèm hệ thống tính điểm tự động.

---

## 🛠️ Hướng Dẫn Cài Đặt & Khởi Chạy

1. **Di chuyển vào thư mục ứng dụng:**
   ```bash
   cd Bai10-Responding_To_Events/my-app
   ```

2. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Khởi động Development Server:**
   ```bash
   npm run dev
   ```

4. Truy cập trình duyệt tại `http://localhost:3004`.
