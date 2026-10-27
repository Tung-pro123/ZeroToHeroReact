# Session 4 • Bài 5: Validation Với React Hook Form

Ứng dụng thực nghiệm chuyên sâu trực quan hóa toàn bộ cơ chế **Validation Built-in** của React Hook Form (v7.51+).

## 🎯 Mục tiêu bài học (Curriculum Mastery)
1. **Validation Rules Matrix**: Nắm vững cú pháp ngắn gọn và cú pháp object `{ value, message }` cho các rule: `required`, `minLength`, `maxLength`, `min`, `max`, `pattern`.
2. **valueAsNumber Mechanics**: Hiểu rõ tại sao `type="number"` trong HTML vẫn sinh ra string và cách `valueAsNumber: true` ép kiểu sang JavaScript number nguyên bản.
3. **Custom Validation với `validate`**: Sử dụng hàm `validate: (value) => boolean | string` để xử lý business rules phức tạp (cấm username 'admin', 'root', kiểm tra độ mạnh mật khẩu).
4. **Validation Modes Comparison**: Thử nghiệm và đánh giá UX trade-off giữa 3 chế độ kích hoạt: `mode: "onSubmit"` (lazy feedback), `mode: "onBlur"` (field departure), `mode: "onChange"` (real-time keystroke).
5. **Full Enterprise Registration Studio**: Ứng dụng form doanh nghiệp tích hợp đồng thời mọi quy tắc thẩm định, thanh đếm ký tự, và bảng kiểm tra trạng thái từng field.
6. **Frontend UX vs Backend Security**: So sánh đối chiếu vai trò của RHF Frontend Validation và Spring Boot Backend Validation (`@NotBlank`, `@Email`, `@Size`, `@Min`).
7. **Senior Architect Knowledge Check**: 5 câu hỏi phỏng vấn chuẩn mực củng cố tư duy kiến trúc.

## 🚀 Khởi chạy ứng dụng
```bash
npm install
npm run dev
```
Cổng phục vụ: **http://localhost:3045**

