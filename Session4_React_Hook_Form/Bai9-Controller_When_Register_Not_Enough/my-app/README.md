# Session 4 • Bài 9: Controller — KHI register() KHÔNG ĐỦ

Dự án thực hành chuyên sâu về **Controller Architecture & The Adapter Pattern** trong React Hook Form v7.51, thuộc series giáo trình `ZeroToHeroReact`.

---

## 🚀 Cổng Port Chuyên Dụng

Ứng dụng chạy trên cổng **Port 3049** để không bị xung đột với các bài học trước:

- Bài 4: `3044`
- Bài 5: `3045`
- Bài 6: `3046`
- Bài 7: `3047`
- Bài 8: `3048`
- **Bài 9: `3049`**

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

Mở PowerShell tại thư mục này và chạy các lệnh:

```powershell
# 1. Di chuyển vào thư mục my-app của bài 9
cd "d:\Ki5_Fall_2026\React\Session4_React_Hook_Form\Bai9-Controller_When_Register_Not_Enough\my-app"

# 2. Cài đặt các thư viện (React 18, React-Router-DOM, React-Hook-Form)
npm install

# 3. Chạy dev server trên cổng 3049
npm run dev
```

Truy cập ứng dụng tại: **`http://localhost:3049`**

---

## 📚 Các Module & Tính Năng Nổi Bật

1. **Tổng Quan & Adapter Mental Model (`HomePage.jsx`):**
   - Phân tích 3 kịch bản quản lý state: `useState` (không cần Controller), `Parent State` (không cần Controller), `React Hook Form` (bắt buộc dùng Controller làm Adapter).
   - Công thức 4 câu hỏi vàng để tích hợp mọi thư viện UI (MUI, Ant Design, Mantine, React-Select...).
2. **Lab 1: Custom Rating & Switch Adapter (`ControllerAdapterLabPage.jsx`):**
   - Chứng minh component hoàn toàn độc lập với RHF.
   - Trực quan hóa luồng dữ liệu 2 chiều: `field.value` (RHF -> UI) và `field.onChange` (UI -> RHF).
3. **Lab 2: Hybrid Form Chuẩn Enterprise (`HybridRegistrationLabPage.jsx`):**
   - Kết hợp mượt mà giữa `register()` cho native/forwardRef inputs và `Controller` cho tag chip selector, range slider, 5-star rating, toggle switch.
4. **Lab 3: Data Transformation (`DataTransformLabPage.jsx`):**
   - Biến đổi Object phức tạp thành chuỗi ID đơn giản (hoặc ngược lại) ngay trong `onChange` của Controller.
5. **Senior Architect Quiz (`ArchitectQuizPage.jsx`):**
   - Bộ 5 câu hỏi trắc nghiệm chuyên sâu về Controller, forwardRef, field vs fieldState, phòng tránh lỗi double registration.
