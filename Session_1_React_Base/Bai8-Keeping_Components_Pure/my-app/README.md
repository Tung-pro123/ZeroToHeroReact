# 🧪 Bài 8: Keeping Components Pure (Vite + React)

Dự án mẫu thực hành chuyên sâu theo bài học **"Keeping Components Pure"** (Chương kết thúc phần *Describing the UI*) từ trang chính thức **react.dev**, được thiết kế riêng với các ví dụ so sánh trực quan dành cho lập trình viên có nền tảng **Java / Spring Boot**.

---

## 🚀 Hướng Dẫn Khởi Chạy Dự Án

Mở terminal tại thư mục `Bai8-/my-app`:

```bash
# 1. Cài đặt các thư viện (React, Vite)
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev
```

> Dự án chạy tại cổng **`http://localhost:3002`** (tách biệt hoàn toàn với Bài 1: port 3000 và Bài 5: port 3001).

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
my-app/
├── index.html                           # Điểm neo #root duy nhất của SPA
├── package.json                         # Quản lý dependencies (React 18 + Vite 5)
├── vite.config.js                       # Cấu hình Vite dev server (Port 3002)
├── README.md                            # Tài liệu hướng dẫn & tra cứu kiến trúc
└── src/
    ├── main.jsx                         # Điểm vào (Chứa <React.StrictMode> gọi hàm 2 lần)
    ├── App.jsx                          # Root Component điều phối 6 Tab học tập chuyên sâu
    ├── App.css                          # Giao diện Laboratory Dark Mode (Emerald / Cyan / Amber)
    ├── index.css                        # Design System Tokens
    └── components/
        ├── common/
        │   └── Card.jsx                 # Khung hiển thị tái sử dụng (Slot Pattern)
        ├── purity-basics/
        │   └── TeaGatheringDemo.jsx     # Demo Tiệc trà: Pure Cup vs Impure Cup & Local Mutation
        ├── strict-mode/
        │   └── StrictModeInspector.jsx  # Giải mã cơ chế Strict Mode kích hoạt hàm 2 lần
        ├── side-effects/
        │   └── SideEffectPlacementDemo.jsx # Ẩn dụ Kiến trúc sư vs Thợ xây (Event Handlers & useEffect)
        ├── array-methods/
        │   └── ArrayMutationCheatSheet.jsx # Bảng tra cứu & phòng thí nghiệm Mutating vs Pure Array
        ├── challenges/
        │   └── ChallengeContainer.jsx   # Lời giải trọn vẹn cả 3 Challenges từ react.dev
        └── spring-comparison/
            └── SpringIdempotencyAnalogy.jsx # Đối chiếu Spring Boot HTTP GET Idempotence & Java Streams
```

---

## 🎯 6 Trọng Tâm Cốt Lõi Trong Bài 8

### 1. Bản chất hàm tinh khiết (Pure Function):
- **Công thức:** $y = f(x)$.
- **2 Quy tắc:**
  1. *Chỉ lo việc của mình (Minds its own business):* Không làm thay đổi bất kỳ biến, đối tượng nào tồn tại trước khi hàm được gọi.
  2. *Cùng đầu vào, cùng đầu ra (Same inputs, same output):* Cùng tham số thì luôn trả về cùng một kết quả duy nhất.

### 2. Strict Mode gọi hàm 2 lần:
- Trong môi trường `Development`, `<React.StrictMode>` cố tình chạy mỗi hàm Component **2 LẦN** liên tiếp để vạch trần các component không tinh khiết (bị nhảy số cóc `#2, #4, #6`).
- Trong môi trường `Production`, cơ chế này tự động tắt, không gây tốn tài nguyên.

### 3. Đột biến cục bộ (Local Mutation):
- Biến hoặc mảng được sinh ra **bên trong chính lần render đó** thì được phép sửa đổi thoải mái (ví dụ: `const cups = []; for (...) cups.push(...)`).

### 4. Nơi đặt Side Effects hợp pháp:
- Render là **quá trình tính toán trên giấy** (Kiến trúc sư vẽ bản thảo).
- Các hành vi thay đổi thế giới thực (đập tường, gọi API, trừ tiền, hẹn giờ) chỉ được phép nằm ở 2 vị trí:
  1. **Event Handlers:** `onClick`, `onChange`, `onSubmit` (chỉ chạy khi có người dùng tương tác).
  2. **useEffect Hook:** Chạy tự động sau khi React đã vẽ xong giao diện lên màn hình.

### 5. Thao tác Mảng an toàn:
- ❌ **Tránh:** `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()` (sửa mảng gốc).
- ✅ **Khuyên dùng:** `[...arr, item]`, `filter()`, `map()`, `slice()`, `concat()`, `[...arr].sort()` (tạo mảng mới).

### 6. Lời giải 3 Thử Thách (Challenges):
- **Challenge 1:** Sửa đồng hồ đổi màu giao diện &rarr; Tính toán `className` trong JSX thay vì gọi `document.getElementById()`.
- **Challenge 2:** Sửa Profile dùng chung biến toàn cục &rarr; Truyền `person` qua Props trực tiếp.
- **Challenge 3:** Sửa Story Tray bị chèn lặp thẻ &rarr; Dùng `[...stories]` để clone mảng trước khi thêm mới.
