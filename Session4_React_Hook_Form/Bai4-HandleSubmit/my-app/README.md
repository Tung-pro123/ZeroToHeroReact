# Session 4 • Bài 4: handleSubmit() — The Form Submission & Validation Pipeline

Ứng dụng thực nghiệm chuyên sâu trực quan hóa toàn bộ cơ chế hoạt động của `handleSubmit()` trong **React Hook Form (v7.51+)**.

## 🎯 Mục tiêu bài học (Curriculum Mastery)
1. **Higher-Order Function Anatomy**: Hiểu rõ tại sao `handleSubmit(onSubmit)` không thực thi ngay lúc render, mà trả về một `submitHandler(event)`.
2. **PreventDefault & Event Interception**: So sánh Form HTML truyền thống, Form React cổ điển và cơ chế tự động chặn reload trang của RHF.
3. **Hai Callbacks: `handleSubmit(onValid, onInvalid)`**: Khám phá pipeline rẽ nhánh thông minh khi form hợp lệ (`onValid(data)`) và khi có lỗi validation (`onInvalid(errors)`).
4. **Data Delivery & Async Lifecycle**: RHF thu thập data và giao phó cho callback thành công; quản lý trạng thái async request gửi dữ liệu tới Spring Boot REST Controller (`@PostMapping`).
5. **3 Sai lầm chí mạng phổ biến**:
   - `onSubmit={handleSubmit(onSubmit())}` (Gợi ý render time).
   - `function submit(e) { handleSubmit(onSubmit); }` (Tạo handler rồi bỏ xó).
   - Lạm dụng `useEffect` thay vì xử lý API trong Event Handler.
6. **Senior Architect Knowledge Check**: 5 câu hỏi phỏng vấn chuẩn mực củng cố kiến thức.

## 🚀 Hướng dẫn khởi chạy
```bash
npm install
npm run dev
```
Ứng dụng sẽ chạy tại: **http://localhost:3044**

