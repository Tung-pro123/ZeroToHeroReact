# 🎯 Session 4: Bài 1 - Vấn Đề Của Form Trong React (Problem of Forms in React)

Ứng dụng thực nghiệm trực quan phân tích chuyên sâu về:
1. Bản chất HTML native input và việc DOM tự quản lý `input.value` mà không cần React state.
2. Vòng tròn khép kín của Controlled Components: `State -> value -> DOM -> onChange -> setState -> re-render`.
3. Khủng hoảng bùng nổ Code & Re-render (State Explosion & Performance Bottleneck) khi form phình to lên 10+ fields.
4. Tiếp cận Uncontrolled Components với `useRef`: Giảm thiểu Re-render về 0 khi gõ phím.
5. Sứ mệnh của React Hook Form: Quản lý Form toàn diện và phân biệt rạch ròi với Zod (Schema Validation).

---

## 🚀 Khởi chạy ứng dụng

```bash
# 1. Di chuyển vào thư mục my-app
cd Session4_React_Hook_Form/Ba1-Problem_Form_In_React/my-app

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Khởi chạy máy chủ dev server trên Port 3041
npm run dev
```

Mở trình duyệt tại: **http://localhost:3041**
