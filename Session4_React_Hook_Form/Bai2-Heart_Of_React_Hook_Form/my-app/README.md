# 🎯 Session 4: Bài 2 - useForm() — Trái Tim Của React Hook Form

Ứng dụng thực hành kiến trúc chuyên sâu về Hook trung tâm `useForm()`:
1. Bản chất `useForm()` khởi tạo hệ thống quản lý form và cung cấp các công cụ: `register`, `handleSubmit`, `formState`, `reset`, `watch`.
2. Phân biệt rạch ròi giữa **Form Data** (`{ email, password }`) và **Form State** (`isDirty`, `isSubmitting`, `isValid`, `errors`).
3. Bản đồ luồng 3 tầng khi submit: `HTML Event` ➔ `RHF handleSubmit` ➔ `User onSubmit(data)` ➔ `Spring Boot`.
4. Cấu hình `defaultValues` và kết hợp mượt mà với React `useState`.

---

## 🚀 Khởi chạy ứng dụng

```bash
# 1. Di chuyển vào thư mục my-app
cd Session4_React_Hook_Form/Bai2-Heart_Of_React_Hook_Form/my-app

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Khởi chạy dev server trên Port 3042
npm run dev
```

Mở trình duyệt tại: **http://localhost:3042**
