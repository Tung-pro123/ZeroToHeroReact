# 💡 React Lab 17: Reacting to Input with State

Ứng dụng phòng thí nghiệm tương tác trực quan phục vụ **Bài 17: Reacting to Input with State** (mở đầu **Chương 3: Managing State**) thuộc lộ trình **ZeroToHeroReact**.

---

## 🚀 Cách chạy ứng dụng

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy dev server trên cổng 3011
npm run dev
```

Ứng dụng sẽ tự động mở trên trình duyệt tại: `http://localhost:3011`

---

## 🎯 Các phòng thí nghiệm nổi bật

1. **🚕 Mệnh Lệnh (Taxi Chỉ Đường) vs Khai Báo (Declarative FSM)**
   * So sánh đối đầu giữa form Vanilla DOM (dễ sót lệnh enable khi gặp lỗi) và React Declarative FSM tự động 100%.

2. **🎨 5 Trạng Thái Hình Ảnh (Visual Mockups)**
   * Kiểm thử 5 bản vẽ mockup tĩnh (Empty, Typing, Submitting, Success, Error) độc lập trước khi gắn logic state.

3. **⚖️ Triệt Tiêu Nghịch Lý State (State Paradox)**
   * Mô phỏng lỗi giao diện mâu thuẫn khi bật cùng lúc các cờ boolean rời rạc và cách quy hoạch thành 1 biến `status` hữu hạn.

4. **👤 Thử Thách 2: Chuyển Đổi Profile Editor**
   * Tái hiện Challenge 2 của React Docs: Form hồ sơ người dùng chuyển đổi mượt mà giữa Chế độ xem và Chế độ sửa, ứng dụng Derived State cho `fullName`.

5. **🖼️ Thử Thách 1: Đổi Viền Ảnh & Chống Nổi Bọt (Bubbling)**
   * Tái hiện Challenge 1 của React Docs: Đổi class viền xanh cho ảnh, kết hợp `e.stopPropagation()` để ngăn sự kiện sủi bọt ra ngoài.

6. **☕ Đối Chiếu Spring State Machine & Domain Enum**
   * So sánh React FSM với kiến trúc Finite State Machine và cột `status ENUM` trong CSDL backend.

7. **🎯 Thử Thách & Phỏng Vấn**
   * Bộ 4 câu hỏi trắc nghiệm chuyên sâu về Declarative UI, Derived State và phòng chống State Paradox.
