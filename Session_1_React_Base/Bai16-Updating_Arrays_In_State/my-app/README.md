# 📚 React Lab 16: Updating Arrays in State

Ứng dụng phòng thí nghiệm tương tác trực quan phục vụ **Bài 16: Updating Arrays in State** thuộc lộ trình **ZeroToHeroReact**.

---

## 🚀 Cách chạy ứng dụng

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy dev server trên cổng 3010
npm run dev
```

Ứng dụng sẽ tự động mở trên trình duyệt tại: `http://localhost:3010`

---

## 🎯 Các phòng thí nghiệm nổi bật

1. **⚡ Sân Chơi Thao Tác Mảng (Array Operations Playground)**
   * Thực hành tương tác các phương thức: Thêm đầu (`[new, ...arr]`), Thêm cuối (`[...arr, new]`), Xóa theo ID (`filter`), Đảo ngược an toàn (`[...arr].reverse()`) và Sắp xếp A-Z (`[...arr].sort()`).

2. **🛒 Giỏ Hàng Mua Sắm (Shopping Cart Lab)**
   * Tái hiện Challenge 1 & 2 của React Docs: Tăng số lượng với `map()`, giảm số lượng kết hợp `filter(p => p.count > 0)` để tự động xóa món hàng khi số lượng về 0.

3. **🧩 Ghép 3 Mảnh với slice & Spread**
   * Giải phẫu trực quan kỹ thuật chèn phần tử vào bất kỳ vị trí nào trong mảng mà không làm hỏng mảng gốc: `[...slice(0, insertAt), newItem, ...slice(insertAt)]`.

4. **📋 Object Lồng Trong Mảng & useImmer**
   * Đối chiếu trực quan việc đánh dấu hoàn thành (toggle seen) giữa cú pháp `map + Spread` và cú pháp `useImmer (draft.find().seen = ...)`.

5. **☕ Đối Chiếu Java 8+ Stream API**
   * Bảng đối sánh chuyên sâu giữa các hàm thuần khiết JavaScript (`map`, `filter`, `reduce`) và Java Stream API trong Spring Boot.

6. **🎯 Thử Thách & Phỏng Vấn**
   * Bộ 4 câu hỏi trắc nghiệm chuyên sâu về phân biệt `slice` vs `splice`, Shallow Copy của mảng chứa Object, và cách xử lý bất biến an toàn.
