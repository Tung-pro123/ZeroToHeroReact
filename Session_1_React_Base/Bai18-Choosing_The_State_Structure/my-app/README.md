# 🏗️ Phòng Thí Nghiệm Bài 18: Choosing the State Structure

Ứng dụng thực hành tương tác chuyên sâu minh họa **5 Nguyên Tắc Vàng Thiết Kế State trong React**, giải quyết triệt để các lỗi Stale State, Redundant State, Duplicate State và Deeply Nested State.

Dự án thuộc Series đào tạo **ZeroToHeroReact** (Chương 3: Managing State).

---

## 🚀 Cách Chạy Ứng Dụng

Ứng dụng được cấu hình chạy trên cổng mặc định **3012** (để tránh xung đột với các bài học khác):

```bash
# 1. Di chuyển vào thư mục my-app
cd Bai18-Choosing_The_State_Structure/my-app

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev
```

Trình duyệt sẽ tự động mở tại: `http://localhost:3012`

---

## 🎯 7 Module Thí Nghiệm Tương Tác

| Tab Module | Trọng Tâm Kiến Thức | Tương Tác Thực Tế |
| :--- | :--- | :--- |
| **1. 5 Nguyên Tắc Vàng** | Trực quan hóa 5 quy tắc thiết kế cấu trúc State | Thẻ tương tác cho từng quy tắc với code Bad vs Good trực quan |
| **2. Redundant vs Derived** | Tính toán giá trị phái sinh trong lúc Render | Danh sách đóng gói hành lý (Luggage Packing) với tổng số món và tỷ lệ hoàn thành được tính tức thì (không dùng useState thừa) |
| **3. Chọn ID vs Object** | Tránh trùng lặp State và lỗi Stale State | Danh mục món ăn nhà hàng: Thử nghiệm sửa tên món ăn để thấy lỗi Stale khi lưu Object và tính an toàn tuyệt đối khi lưu ID |
| **4. Multi-Select với Set** | Cấu trúc dữ liệu cho nhiều lựa chọn | Hộp thư đến (Email Inbox): Thao tác chọn nhiều email với JavaScript `Set`, đạt độ phức tạp tìm kiếm $O(1)$ thay vì $O(N)$ mảng |
| **5. Làm Phẳng Cây (Flatten)** | Chuẩn hóa cây dữ liệu lồng sâu (Normalized State) | Cây địa danh hành chính (Hành tinh > Lục địa > Quốc gia): Đổi tên địa danh với độ phức tạp $O(1)$ thông qua cấu trúc Hash Map |
| **6. Chuẩn Hóa DB (3NF)** | Mối tương quan giữa chuẩn hóa CSDL và State React | Bảng so sánh đối xứng giữa 1NF/2NF/3NF và State trong React |
| **7. Thử Thách Trắc Nghiệm** | Kiểm tra hiểu biết chuyên sâu kiến trúc State | 4 câu hỏi tình huống thực tế có giải thích chi tiết đáp án đúng/sai |

---

## 🛠️ Công Nghệ Sử Dụng

- **React 18** (Functional Components, Custom Hooks logic, `useState`)
- **Vite 5** (Fast HMR, port 3012)
- **Vanilla Modern CSS** (Glassmorphism, Dark Mode Palette, Responsive Flexbox & Grid)
- **Google Fonts** (Outfit, JetBrains Mono)
