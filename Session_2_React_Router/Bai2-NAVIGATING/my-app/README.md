# 🧭 Interactive Lab - Session 2 Bài 2: Navigating in React Router

Dự án thực hành chuyên sâu về **Điều hướng trong Single Page Application (SPA)** thuộc khóa học **ZeroToHeroReact**.

## 🚀 Khởi chạy ứng dụng

```bash
cd Session_2_React_Router/Bai2-NAVIGATING/my-app
npm install
npm run dev
```

Mở trình duyệt tại: **http://localhost:3020**

## 🎯 Các tính năng & Phòng thí nghiệm trực quan

1. **🧭 Navigation Engine Comparator**: So sánh 3 trụ cột điều hướng: `<Link>` (Ý định người dùng), `<NavLink>` (Nhận biết trạng thái Active), và `useNavigate` (Kết quả của xử lý Logic).
2. **🎨 `<NavLink>` Mastery Lab**: Kiểm chứng cơ chế Active Matching, cạm bẫy tiền tố prefix matching và thuộc tính `end`, tùy biến giao diện qua callback `className`, `style`, và `children`.
3. **⚡ Programmatic Navigation (`useNavigate`)**:
   - Giả lập luồng Đăng nhập (Auth) với API bất đồng bộ và chuyển hướng sang Dashboard.
   - Trình hướng dẫn Form nhiều bước (Wizard Stepper).
   - Đồng hồ đếm ngược tự động chuyển trang (Countdown Timer).
   - Thao tác lịch sử duyệt web: `navigate(-1)` (Back), `navigate(1)` (Forward), và `replace: true`.
4. **🛒 Real-world Mini Store**: Ứng dụng E-Commerce thực tế kết hợp `<NavLink>` trên thanh điều hướng, `<Link>` trong thẻ sản phẩm, và `useNavigate` khi Mua ngay.
5. **📝 Senior Architect Quiz**: 5 câu hỏi phỏng vấn chuyên sâu có giải thích chi tiết.
