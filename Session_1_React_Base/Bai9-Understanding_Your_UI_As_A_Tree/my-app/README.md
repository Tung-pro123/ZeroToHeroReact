# Ứng Dụng Thực Hành Tương Tác - Bài 9: Understanding Your UI as a Tree 🌳

> **Dự án Lab tương tác chuyên sâu:** Trực quan hóa Cây Render (Render Tree), Cây Phụ thuộc Mô-đun (Module Dependency Tree), Cơ chế Tree-Shaking và Tính năng Decoupling với Prop `children`.

---

## 🌟 Các Tính Năng Nổi Bật Trong Lab

1. **🌳 Cây Render Trực Quan (Interactive Render Tree Visualizer):**
   - Trực quan hóa mô hình component phân cấp (Root $\rightarrow$ Top-level $\rightarrow$ Leaf).
   - Mô phỏng thay đổi trạng thái động (Dynamic Across Renders): chuyển đổi giữa chế độ *Danh ngôn (FancyText)* và *Bảng màu (ColorBox)* để thấy một nhánh được mount và unmount theo thời gian thực.
   - Nút chuyển đổi góc nhìn: *React Component Tree* vs *Browser Real DOM Tree*, giải thích cặn kẽ tại sao thẻ HTML không xuất hiện trong Render Tree của React.

2. **📦 Bộ Giả Lập Tree-Shaking (Tree-Shaking & Bundle Size Simulator):**
   - Theo dõi cây quan hệ `import` giữa các tệp mã nguồn.
   - Bật/tắt các module tùy chọn (thư viện biểu đồ nặng, hàm tiện ích thừa) để quan sát cơ chế Bundler tự động cắt tỉa (Tree-shaken) các file không sử dụng và giảm dung lượng gói tải xuống.

3. **🔀 Phòng Thí Nghiệm Decoupling với Prop `children`:**
   - Minh chứng thực tế hiện tượng "lệch pha" giữa Render Tree và Module Dependency Tree khi truyền Component qua prop `children`.
   - Đối chiếu với mẫu thiết kế **Inversion of Control (IoC) / Dependency Injection**.

4. **☕ Đối Chiếu Tư Duy Backend (Java / Spring Boot):**
   - 4 bảng so sánh chuyên sâu giữa các khái niệm React Tree với Spring ApplicationContext, Maven Dependency Tree, Spring Native AOT và Constructor Injection.

5. **🎯 Bộ Thử Thách & Câu Đố Tương Tác (Interactive Quiz):**
   - 5 câu hỏi tình huống thực tế kèm giải thích chuyên sâu và hệ thống chấm điểm tự động.

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

1. **Mở terminal tại thư mục này:**
   ```bash
   cd Bai9-Understanding_Your_UI_As_A_Tree/my-app
   ```

2. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Khởi chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```

4. Mở trình duyệt tại địa chỉ `http://localhost:3003` để trải nghiệm ứng dụng.
