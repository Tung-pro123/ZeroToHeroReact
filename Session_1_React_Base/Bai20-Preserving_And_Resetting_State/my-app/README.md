# 💾 Phòng Thí Nghiệm Bài 20: Preserving and Resetting State

Ứng dụng thực hành tương tác chuyên sâu minh họa bản chất lưu trữ State trong Cây Render (**Render Tree**), hai quy tắc vàng **Bảo Toàn vs Hủy Diệt State**, kỹ thuật điều phối bằng thuộc tính **`key`**, và cách khắc phục cạm bẫy khai báo Component lồng nhau (**Nested Component Trap**).

Dự án thuộc Series đào tạo **ZeroToHeroReact** (Chương 3: Managing State).

---

## 🚀 Cách Chạy Ứng Dụng

Ứng dụng được cấu hình chạy trên cổng mặc định **3014** (để tránh xung đột với các bài học khác):

```bash
# 1. Di chuyển vào thư mục my-app của Bài 20
cd Bai20-Preserving_And_Resetting_State/my-app

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev
```

Trình duyệt sẽ tự động mở tại: `http://localhost:3014`

---

## 🎯 7 Module Thí Nghiệm Tương Tác

| Tab Module | Trọng Tâm Kiến Thức | Tương Tác Thực Tế |
| :--- | :--- | :--- |
| **1. Cùng Vị Trí vs Khác Vị Trí** | 2 Quy tắc vàng của Reconciliation | Xem điểm số được giữ nguyên khi đổi kiểu dáng Fancy (cùng vị trí) vs bị reset sạch khi tráo đổi thẻ khác loại hoặc dùng `key` |
| **2. Cạm Bẫy Component Lồng Nhau** | Nested Declaration Memory Leak | Thử nghiệm gõ phím vào ô input bị lồng hàm: Con trỏ chuột văng mất focus trên từng phím gõ vs Top-Level input mượt mà |
| **3. Reset State Bằng Key (Chat)** | Giải pháp Thử thách 3 trong React.dev | Ngăn ngừa rò rỉ tin nhắn nhạy cảm gửi Alice sang Sếp Bob bằng cách cấp `key={contact.id}` |
| **4. Sắp Xếp Danh Sách & Key** | Giải pháp Thử thách 5 trong React.dev | Đảo ngược danh sách liên hệ: So sánh lỗi Misplaced State nghiêm trọng khi dùng `key={index}` vs đúng đắn với `key={contact.id}` |
| **5. CSS Display vs Unmount** | Kỹ thuật bảo toàn State khi ẩn giao diện | Biểu mẫu góp ý: Giữ nguyên văn bản đã nhập khi ẩn bằng `display: none` vs mất sạch dữ liệu khi Unmount khỏi DOM |
| **6. Đổi Chỗ Form Fields** | Giải pháp Thử thách 2 trong React.dev | Đổi chỗ ô Họ và Tên: State đi theo đúng nhãn của trường khi có `key` vs bị kẹt lại vị trí cũ khi không có `key` |
| **7. Thử Thách Trắc Nghiệm** | Đo lường độ thấu hiểu kiến trúc State | 4 câu hỏi tình huống thực tế kiểm tra sâu về Fiber Node, Identity và Reconciliation |

---

## 🛠️ Công Nghệ Sử Dụng

- **React 18** (Functional Components, `useState`, Key Identity, Reconciliation)
- **Vite 5** (Fast HMR, port 3014)
- **Vanilla Modern CSS** (Glassmorphism, Dark Amber Theme, Responsive Flexbox & Grid)
- **Google Fonts** (Outfit, JetBrains Mono)
