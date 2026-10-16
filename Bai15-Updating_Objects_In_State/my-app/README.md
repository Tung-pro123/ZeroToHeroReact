# 📦 React Lab 15: Updating Objects in State

Ứng dụng phòng thí nghiệm tương tác trực quan phục vụ **Bài 15: Updating Objects in State** thuộc lộ trình **ZeroToHeroReact**.

---

## 🚀 Cách chạy ứng dụng

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy dev server trên cổng 3009
npm run dev
```

Ứng dụng sẽ tự động mở trên trình duyệt tại: `http://localhost:3009`

---

## 🎯 Các phòng thí nghiệm nổi bật

1. **🔴 Con Trỏ Di Chuột (Mutation vs Immutable)**
   * So sánh tương tác thực tế giữa `position.x = e.clientX` (chấm đỏ đơ cứng vì cùng ô nhớ RAM) và `setPosition({ x, y })` (chấm đỏ bay theo chuột mượt mà 60 FPS).
   * Đo lường số lần Re-render thời gian thực.

2. **📝 Form Hồ Sơ Đa Trường (Spread & Computed Name)**
   * Xử lý form nhiều trường chỉ với 1 hàm duy nhất: `[e.target.name]: e.target.value`.
   * Chế độ mô phỏng lỗi quên Spread (`setPerson({ [name]: value })`) làm biến mất toàn bộ các trường khác.

3. **🌳 Nested Object & Thư Viện Immer**
   * Đối chiếu trực quan giữa cú pháp rải Spread lồng nhiều tầng và cú pháp viết ngắn gọn với `useImmer`: `updatePerson(draft => { draft.artwork.city = ... })`.

4. **🐛 Bẫy Đột Biến Biến Toàn Cục (Shared Global Ref Bug)**
   * Tái hiện Challenge 2 của React Docs: Lỗi sửa trực tiếp biến toàn cục dùng chung khiến Background bị nhảy vị trí khi đổi màu.

5. **☕ Đối Chiếu Lombok Builder & Java Records**
   * So sánh tư duy bất biến giữa React Spread và mẫu thiết kế `user.toBuilder().build()` trong Spring Boot / Java.

6. **🎯 Thử Thách & Phỏng Vấn**
   * Bộ 4 câu hỏi trắc nghiệm chuyên sâu về Shallow Copy, Immutability, Proxy và Immer.
