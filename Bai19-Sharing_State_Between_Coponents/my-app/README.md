# 🔄 Phòng Thí Nghiệm Bài 19: Sharing State Between Components

Ứng dụng thực hành tương tác chuyên sâu minh họa kỹ thuật **Kéo State lên Cha (Lifting State Up)**, **Controlled vs Uncontrolled Components**, và **Triết Lý Nguồn Sự Thật Duy Nhất (Single Source of Truth)** trong React.

Dự án thuộc Series đào tạo **ZeroToHeroReact** (Chương 3: Managing State).

---

## 🚀 Cách Chạy Ứng Dụng

Ứng dụng được cấu hình chạy trên cổng mặc định **3013** (để tránh xung đột với các bài học khác):

```bash
# 1. Di chuyển vào thư mục my-app của Bài 19
cd Bai19-Sharing_State_Between_Coponents/my-app

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev
```

Trình duyệt sẽ tự động mở tại: `http://localhost:3013`

---

## 🎯 7 Module Thí Nghiệm Tương Tác

| Tab Module | Trọng Tâm Kiến Thức | Tương Tác Thực Tế |
| :--- | :--- | :--- |
| **1. Lifting State Up Lab** | Accordion 3 bước chuẩn hóa Lifting State Up | So sánh Uncontrolled Panels (mỗi con tự mở riêng) vs Controlled Panels (chỉ 1 bảng mở tại 1 thời điểm) kèm Data Flow Inspector |
| **2. Synced Inputs** | Giải pháp Thử thách 1 trong React.dev | Hai ô nhập liệu độc lập vs hai ô song sinh luôn đồng bộ giá trị theo thời gian thực |
| **3. Filterable List** | Giải pháp Thử thách 2 trong React.dev | Thanh tìm kiếm kết hợp phân loại danh mục điều khiển danh sách món ăn, highlight từ khóa tìm kiếm |
| **4. Controlled vs Uncontrolled** | Sân chơi đối đầu 2 trường phái quản lý Form | Form Controlled (Live uppercase, live countdown, instant validation) vs Form Uncontrolled (`FormData`, `defaultValue`) |
| **5. Single Source of Truth** | Chống lệch pha dữ liệu hai chiều | Bộ chuyển đổi nhiệt độ Celsius &lt;-&gt; Fahrenheit với thước đo nhiệt kế mô phỏng và cảnh báo nước sôi |
| **6. Prop Drilling & Composition** | Hóa giải hạn chế khi kéo State lên quá cao | So sánh việc khoan props qua 3 tầng vs dùng kỹ thuật Component Composition (`children` slot) |
| **7. Thử Thách Trắc Nghiệm** | Đo lường độ thấu hiểu kiến trúc State | 4 câu hỏi tình huống thực tế có giải thích chi tiết đáp án đúng/sai |

---

## 🛠️ Công Nghệ Sử Dụng

- **React 18** (Functional Components, `useState`, Controlled & Uncontrolled patterns)
- **Vite 5** (Fast HMR, port 3013)
- **Vanilla Modern CSS** (Glassmorphism, Dark Emerald Theme, Responsive Flexbox & Grid)
- **Google Fonts** (Outfit, JetBrains Mono)
