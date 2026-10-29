# Session 4 • Bài 6: formState và Error Handling

Ứng dụng thực nghiệm chuyên sâu trực quan hóa toàn bộ siêu dữ liệu **formState** trong **React Hook Form (v7.51+)**.

## 🎯 Mục tiêu bài học (Curriculum Mastery)
1. **Phân biệt Form Data vs Form State**: Hiểu sâu sắc sự khác nhau giữa dữ liệu người dùng nhập (`data`) và trạng thái siêu dữ liệu mô tả form (`formState`).
2. **6 Trụ Cột Của formState**:
   - `errors`: Bảng phân tích chi tiết từng lỗi validation (`type`, `message`, `ref`).
   - `isDirty`: Trạng thái form có đang khác biệt so với `defaultValues` ban đầu hay không.
   - `dirtyFields`: Đối tượng theo dõi cụ thể từng trường bị chỉnh sửa.
   - `touchedFields`: Đối tượng theo dõi cụ thể từng trường người dùng đã tương tác rồi rời khỏi (blur).
   - `isValid`: Trạng thái form có đáp ứng toàn bộ các quy tắc validation hay không.
   - `isSubmitting`: Trạng thái submit bất đồng bộ có đang diễn ra hay không.
3. **Giải Mã Ma Trận: Dirty vs Touched**:
   - So sánh 4 kịch bản tương tác: Chưa làm gì, Focus rồi Blur không đổi value, Đổi value chưa blur, và Đổi value rồi xóa về giá trị mặc định.
4. **Phòng Thí Nghiệm Edit Profile & Dirty Tracking**:
   - Thiết kế form chỉnh sửa thông tin doanh nghiệp, tự động khóa nút "Lưu thay đổi" khi `!isDirty || !isValid || isSubmitting`.
5. **Senior Architect Knowledge Check**: 5 câu hỏi phỏng vấn chuẩn mực củng cố kiến thức.

## 🚀 Hướng dẫn khởi chạy
```bash
npm install
npm run dev
```
Cổng phục vụ: **http://localhost:3046**

