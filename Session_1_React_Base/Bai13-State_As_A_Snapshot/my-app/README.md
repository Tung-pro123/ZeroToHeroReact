# 📸 React Lab 13: State as a Snapshot

Ứng dụng phòng thí nghiệm tương tác trực quan phục vụ **Bài 13: State as a Snapshot** thuộc lộ trình **ZeroToHeroReact**.

---

## 🚀 Cách chạy ứng dụng

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy dev server trên cổng 3007
npm run dev
```

Ứng dụng sẽ tự động mở trên trình duyệt tại: `http://localhost:3007`

---

## 🎯 Các phòng thí nghiệm nổi bật

1. **🔢 Thí Nghiệm +3 & Thế Giá Trị (Substitution Method)**
   * Mô phỏng trực tiếp lỗi kinh điển `setNumber(number + 1)` gọi 3 lần chỉ tăng 1.
   * So sánh với 2 cách chuẩn: Dùng biến cục bộ `const next = number + 3` và Updater Function `setNumber(n => n + 1)`.
   * Bảng phân tích chi tiết những gì React thực sự nhận được trong RAM.

2. **✉️ Tránh Lỗi Chat Race Condition (Delayed Chat Simulator)**
   * Thử nghiệm gửi tin nhắn trễ 3 giây tới *Alice*, đổi danh bạ sang *Bob* trong lúc chờ.
   * Chế độ React Snapshot bảo toàn chính xác người nhận.
   * Chế độ Mutable Variable mô phỏng lỗi rò rỉ dữ liệu gửi nhầm người.

3. **🚦 Thử Thách Đèn Giao Thông & Thứ Tự Alert**
   * Đồ họa đèn tín hiệu giao thông (Walk 🚶 - Stop ✋).
   * Thử nghiệm chuyển vị trí `alert` trước hoặc sau `setWalk` để chứng minh kết quả không bao giờ thay đổi nhờ tính bất biến của Snapshot.

4. **🎞️ Bộ Soi Khung Ảnh (Render Frames & Closure)**
   * Quan sát cách JavaScript Closure lưu giữ snapshot của State trong bộ nhớ Web APIs.
   * Tăng số màn hình liên tục trong khi timer quá khứ đang đếm ngược.

5. **🗄️ Đối Chiếu Database MVCC & Spring Transactions**
   * So sánh kiến trúc React Snapshot với Snapshot Isolation trong PostgreSQL/MySQL InnoDB và Java Immutable Records trong Spring Boot.

6. **🎯 Thử Thách & Phỏng Vấn**
   * 4 câu hỏi trắc nghiệm chuyên sâu về Snapshot, Stale Closure và cách lấy dữ liệu mới nhất.
