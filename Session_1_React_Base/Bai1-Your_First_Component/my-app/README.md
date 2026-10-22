# ⚛️ Bài 1: Your First Component (Vite + React)

Dự án mẫu thực hành chuẩn doanh nghiệp được xây dựng dựa trên bài học **"Your First Component"** từ trang chính thức **react.dev**, được thiết kế riêng với các ví dụ đối chiếu trực quan dành cho lập trình viên đã có nền tảng **Java / Spring Boot**.

---

## 🚀 Hướng Dẫn Khởi Chạy Dự Án

Mở terminal tại thư mục này (`Bai1-Your_First_Component/my-app`) và thực hiện 2 lệnh sau:

```bash
# 1. Cài đặt các thư viện phụ thuộc (React, Vite)
npm install

# 2. Khởi chạy máy chủ phát triển
npm run dev
```

Sau khi chạy lệnh, trình duyệt sẽ tự động mở địa chỉ: `http://localhost:3000`.

---

## 📂 Cấu Trúc Thư Mục Chuẩn Doanh Nghiệp (Enterprise Structure)

```text
my-app/
├── index.html                           # Điểm neo #root duy nhất của SPA
├── package.json                         # Quản lý dependency (tương đương pom.xml trong Maven)
├── vite.config.js                       # Cấu hình máy chủ phát triển (port 3000, React plugin)
├── src/
│   ├── main.jsx                         # Điểm vào (tương đương public static void main())
│   ├── App.jsx                          # Root Component điều phối 4 module bài học
│   ├── App.css                          # Định kiểu giao diện Glassmorphism hiện đại
│   ├── index.css                        # Design System Tokens (biến màu sắc, khoảng cách, font)
│   └── components/
│       ├── ui/                          # Các thành phần giao diện nguyên tử (Atomic Primitives)
│       │   ├── Avatar.jsx               # Minh họa thẻ tự đóng <img /> và quy tắc PascalCase
│       │   ├── Badge.jsx                # Minh họa tính tái sử dụng và biến thể màu
│       │   └── MetricItem.jsx           # Khối hiển thị chỉ số độc lập
│       ├── profile/                     # Module tính năng hiển thị hồ sơ
│       │   ├── ProfileCard.jsx          # Minh họa 3 bước tạo Component và quan hệ Cha - Con
│       │   └── TeamGallery.jsx          # Minh họa Composition lớn & cảnh báo khai báo Top-Level
│       ├── pitfalls/
│       │   └── PitfallDemonstrator.jsx  # Trực quan hóa 2 cạm bẫy kinh điển & lỗi lồng component
│       ├── challenge/
│       │   └── Congratulations.jsx      # Lời giải hoàn chỉnh cho Challenge 4 (react.dev)
│       └── spring-comparison/
│           └── SpringVsReactComparison.jsx # Bản đồ đối chiếu tư duy Spring Boot & React
```

---

## 🎯 4 Trọng Tâm Cốt Lõi Của Bài Học

### 1. Bản chất: Component là gì?
- Trong React, **Component thực chất là một hàm JavaScript** trả về cấu trúc giao diện viết bằng cú pháp **JSX**.
- Thay vì trộn lẫn HTML và JS rời rạc, React gom toàn bộ logic, dữ liệu và giao diện thành từng khối độc lập, có thể tái sử dụng ở bất kỳ đâu.

### 2. Ba bước tiêu chuẩn để tạo một Component:
1. **Xuất Component (`export default`):** Cho phép file khác import vào.
2. **Khai báo hàm (`PascalCase`):** Tên hàm **bắt buộc** viết hoa chữ cái đầu (VD: `ProfileCard`).
3. **Trả về JSX (`return ( ... );`):** Luôn bọc phần JSX nhiều dòng trong cặp ngoặc tròn `()`.

### 3. Hai cạm bẫy kinh điển:
- **Cạm bẫy 1:** Quên viết hoa chữ cái đầu &rarr; React sẽ tưởng đó là thẻ HTML gốc và không chạy hàm của bạn.
- **Cạm bẫy 2:** Bẫy ASI của JavaScript khi xuống dòng ngay sau từ khóa `return` mà không có ngoặc tròn `(` &rarr; Trả về `undefined` gây trắng màn hình.

### 4. Cảnh báo kỹ thuật quan trọng:
- **KHÔNG BAO GIỜ** khai báo một hàm component con lồng bên trong thân hàm component cha.
- Luôn khai báo các hàm component ở **Top-Level** (phạm vi ngoài cùng của file).

---

## 💡 Cầu Nối Tư Duy: Spring Boot &rarr; React

| Khái niệm Backend (Spring Boot) | Khái niệm Frontend (React) | Bản chất tương đương |
| :--- | :--- | :--- |
| `@Component`, `@Service` Class | Function Component (PascalCase) | Khối mã độc lập, thực hiện 1 nhiệm vụ |
| Method Parameter / DTO | `Props` | Dữ liệu truyền từ tầng trên xuống |
| `return ResponseEntity<T>` | `return ( <JSX> )` | Kết quả đầu ra của quá trình xử lý |
| `pom.xml` | `package.json` | Khai báo thư viện và kịch bản chạy |
| `application.properties` | `vite.config.js` / `.env` | Cấu hình tham số môi trường |
| `SpringApplication.run(...)` | `ReactDOM.createRoot(...).render(...)` | Khởi động và bơm ứng dụng vào bộ nhớ |
