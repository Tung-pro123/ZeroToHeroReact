# Session 4 • Bài 7: defaultValues, reset(), setValue(), getValues()

Ứng dụng thực nghiệm chuyên sâu trực quan hóa 4 API điều khiển dữ liệu form chủ động trong **React Hook Form (v7.51+)**.

## 🎯 Mục tiêu bài học (Curriculum Mastery)
1. **defaultValues**: Thiết lập điểm xuất phát cho form và làm mốc baseline cho cơ chế dirty-tracking (`isDirty`). Phân biệt rõ `defaultValues` và `placeholder`.
2. **reset()**:
   - `reset()` không tham số: Đưa form trở về baseline mặc định.
   - `reset(newData)`: Tái khởi tạo form với bộ dữ liệu mới (Edit Form pattern).
   - Chiến lược reset sau submit thành công, tránh bẫy reset quá sớm khi API thất bại.
3. **setValue()**:
   - Cập nhật từng trường bằng code thay vì can thiệp DOM trực tiếp.
   - Làm chủ các options: `{ shouldValidate, shouldDirty, shouldTouch }`.
   - Phân biệt sự khác nhau giữa `setValue` (đổi 1 trường) và `reset` (reinitialize toàn form).
4. **getValues()**:
   - Đọc snapshot tức thì giá trị hiện tại của form (`getValues()`) hoặc một trường (`getValues("email")`) mà KHÔNG gây re-render component.
   - Phân biệt Snapshot (`getValues`) vs Subscription (`watch`).
   - Ứng dụng trong Event Handler và Custom Cross-field Validation (ví dụ: `confirmPassword === getValues("password")`).
5. **Create Form vs Edit Form Studio**:
   - Trực tiếp thao tác với 2 bài toán kinh điển trong phát triển phần mềm: Form tạo mới sản phẩm và Form chỉnh sửa sản phẩm đồng bộ API bằng `useEffect`.
6. **Senior Architect Knowledge Check**: 5 câu hỏi phỏng vấn chuẩn mực củng cố kiến thức.

## 🚀 Khởi chạy ứng dụng
```bash
npm install
npm run dev
```
Cổng phục vụ: **http://localhost:3047**

