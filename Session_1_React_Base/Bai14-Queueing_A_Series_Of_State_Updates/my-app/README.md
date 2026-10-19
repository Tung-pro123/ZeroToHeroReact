# 📋 React Lab 14: Queueing a Series of State Updates

Ứng dụng phòng thí nghiệm tương tác trực quan phục vụ **Bài 14: Queueing a Series of State Updates** thuộc lộ trình **ZeroToHeroReact**.

---

## 🚀 Cách chạy ứng dụng

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy dev server trên cổng 3008
npm run dev
```

Ứng dụng sẽ tự động mở trên trình duyệt tại: `http://localhost:3008`

---

## 🎯 Các phòng thí nghiệm nổi bật

1. **🧑‍🍳 Bồi Bàn & Gom Cụm (Batching Visualizer)**
   * Mô phỏng người bồi bàn ghi nhiều món vào phiếu trước khi vào bếp.
   * Đồng hồ đếm số lần Component Render chứng minh gom cụm nhiều lệnh `setState` thành 1 lần render duy nhất.
   * Thử nghiệm Automatic Batching của React 18 bên trong `setTimeout`.

2. **🔄 Hàng Đợi Updater Step-by-Step**
   * Cho phép tự lắp ráp hàng đợi: thêm hàm `n => n + 1`, `n => n * 2`, hoặc gán số ghi đè `42`, `100`.
   * Bảng vết thực thi (Execution Trace) giải mã cách React xử lý Pending State.

3. **🛒 Thử Thách 1: Giỏ Hàng Mua Sắm Bất Đồng Bộ**
   * Tái hiện lỗi giỏ hàng bị số âm (`-1`, `-2`) khi bấm nút nhanh trong môi trường mạng trễ 3s.
   * Khắc phục triệt để bằng Updater Function `setPending(p => p - 1)`.

4. **⚙️ Thử Thách 2: Tự Viết Lõi getFinalState**
   * Bộ kiểm thử tự động 4 test cases chuẩn mực từ React Docs.
   * Kiểm chứng thuật toán duyệt hàng đợi.

5. **☕ Đối Chiếu Hibernate Batching & Message Queue**
   * So sánh kiến trúc React State Batching với Hibernate JDBC Batching (`hibernate.jdbc.batch_size`) và Apache Kafka / RabbitMQ.

6. **🎯 Thử Thách & Phỏng Vấn**
   * Bộ 4 câu hỏi trắc nghiệm chuyên sâu về Automatic Batching, Pure Function rules, và `flushSync`.
