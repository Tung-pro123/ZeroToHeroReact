# Ứng Dụng Thực Hành Tương Tác - Bài 11: State - A Component's Memory 🧠

> **Dự án Lab thực chiến chuyên sâu:** Phân tích bản chất biến `let` vs `useState`, Trực quan hóa Mô hình Ngăn kéo & Con trỏ RAM của React, Thực nghiệm Tính độc lập của State và Lời giải 100% thử thách chính thức của React.dev.

---

## 🌟 Các Tính Năng Nổi Bật Trong Lab

1. **🧪 Thử Nghiệm Đối Đầu (Let vs State Lab):**
   - So sánh trực quan sự khác biệt giữa biến thông thường `let count = 0` và `useState(0)`.
   - Chứng minh rõ nét biến `let` bị xóa sạch sau mỗi lần render và không hề kích hoạt vẽ lại màn hình.

2. **🗄️ Mô Hình Ngăn Kéo & Con Trỏ Chỉ Số (Hook Drawers Visualizer):**
   - Mô phỏng cấu trúc mảng RAM ngầm `[Slot 0, Slot 1, Slot 2]` của React.
   - Thử nghiệm bật lỗi *gọi Hook bên trong câu lệnh `if`* để quan sát hiện tượng lệch pha con trỏ: biến boolean `isLoggedIn` bốc nhầm con số `20` của biến tuổi và dẫn đến lỗi Crash kinh điển `Rendered fewer hooks than expected`.

3. **🎭 Tính Độc Lập & Riêng Tư Của State (State Isolation):**
   - Đặt 2 phiên bản độc lập của `<GalleryCard />` cạnh nhau trên cùng một màn hình.
   - Chứng minh bấm chuyển tranh hay mở chi tiết ở Gallery 1 không làm ảnh hưởng gì tới Gallery 2.

4. **📋 Chiến Lược Cấu Trúc State: Tách Biến vs Gộp DTO Object:**
   - So sánh giữa việc tách biến cho các cờ logic riêng rẽ (`fontSize`, `isDarkMode`) và việc gom cụm thành một Model DTO thống nhất (`UserRegistrationDTO`).
   - Kết nối tư duy DTO trong Spring Boot với dynamic handler `[e.target.name]: e.target.value`.

5. **🎯 Lời Giải 100% Thử Thách React.dev & Trắc Nghiệm:**
   - Thử thách 1: Chặn crash và bổ sung nút Previous với kiểm tra biên an toàn.
   - Thử thách 2: Khắc phục form nhập liệu bị kẹt chữ do dùng biến `let`.
   - Bộ 4 câu hỏi trắc nghiệm củng cố kiến thức State kèm hệ thống tính điểm tự động.

---

## 🛠️ Hướng Dẫn Cài Đặt & Khởi Chạy

1. **Di chuyển vào thư mục ứng dụng:**
   ```bash
   cd Bai11-State-A_Coponent's_Memory/my-app
   ```

2. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Khởi động Development Server:**
   ```bash
   npm run dev
   ```

4. Truy cập trình duyệt tại `http://localhost:3005`.
