# ZeroToHeroReact 🚀

> **Hành trình chinh phục React từ con số 0 đến làm chủ (Zero to Hero)**  
> Kho tài liệu học tập toàn diện kết hợp **Lý thuyết bản chất chuyên sâu**, **Ẩn dụ tư duy Backend (Java/Spring Boot)** và **Phòng thí nghiệm thực hành tương tác trực quan (Interactive Labs)**.

---

## 🌟 Điểm khác biệt của kho lưu trữ này

Khác với các tài liệu học React chỉ sao chép lại lý thuyết hoặc làm ví dụ Todo-list nhàm chán, **ZeroToHeroReact** được thiết kế dựa trên phương pháp **"Học qua bản chất - Thực chiến qua Lab"**:

1. **🧠 Giải mã bản chất (Deep Dive Under the Hood):**
   - Không học vẹt cú pháp. Đi sâu phân tích cơ chế hoạt động thực sự của React: Virtual DOM, Reconciliation, Closure, Object Destructuring, Pure Functions, và Double Invocation trong Strict Mode.
2. **🌱 Tư duy đối chiếu Backend (Dành riêng cho Java / Spring Boot Developers):**
   - Mỗi khái niệm React đều được liên hệ tương đương với các mô hình quen thuộc ở Backend (Component $\leftrightarrow$ Stateless Service / DTO, Idempotency, Immutability, Separation of Concerns).
3. **🧪 Phòng thí nghiệm tương tác (Interactive Labs đi kèm từng bài):**
   - Mỗi bài học đều có một ứng dụng độc lập xây dựng bằng **Vite + React**. 
   - Giao diện thiết kế đẹp mắt với hệ thống tab, công tắc chuyển đổi Đúng/Sai (Anti-pattern vs Best Practice), nút bấm kích hoạt Re-render để quan sát lỗi ngay trên màn hình.
4. **🎯 Lời giải 100% Thử thách chính thức (React.dev Challenges):**
   - Phân tích cặn kẽ từng cạm bẫy (pitfalls) và đưa ra các phương án giải quyết tối ưu theo tiêu chuẩn tài liệu React mới nhất.

---

## 🗺️ Lộ trình học tập (Syllabus Roadmap)

| STT | Bài học | Trọng tâm lý thuyết | Lab thực hành đi kèm | Trạng thái |
|:---:|:---|:---|:---|:---:|
| **01** | [**Bài 1: Your First Component**](./Bai1-Your_First_Component) | Component là gì, cấu trúc hàm, cú pháp JSX, cạm bẫy viết hoa PascalCase & ASI | `my-app` (Profile, Gallery, Parent-Child) | ✅ Đã sẵn sàng |
| **02** | [**Bài 2: Importing and Exporting Components**](./Bai2-) | Root Component, default export vs named export, quy chuẩn tách file | `my-app` (Tổ chức module cây thư mục) | ⏳ Đang cập nhật |
| **03** | [**Bài 3: Writing Markup with JSX**](./Bai3-) | Bản chất JSX vs HTML, quy tắc thẻ đóng, React Fragment `<>`, bẫy `className` | `my-app` (Chuyển đổi HTML chuẩn sang JSX) | ⏳ Đang cập nhật |
| **04** | [**Bài 4: JavaScript in JSX with Curly Braces**](./Bai4-) | Nhúng biểu thức động với `{ }`, truyền biến, cú pháp double curly braces `{{ }}` | `my-app` (Avatar động, định kiểu nội tuyến) | ⏳ Đang cập nhật |
| **05** | [**Bài 5: Passing Props to a Component**](./Bai5-Passing_Props_To_A_Component) | Truyền Props, bóc tách Destructuring, Props mặc định, Spread Props `{...props}`, prop `children` | `my-app` (Card wrapper, Profile, Avatar, Spread Lab) | ✅ Đã sẵn sàng |
| **06** | [**Bài 6: Conditional Rendering**](./Bai6-Condition_Rendering) | Render có điều kiện, toán tử ba ngôi `? :`, logic AND `&&` và cạm bẫy số `0` | `my-app` (PackingList, Badge tương tác) | ✅ Đã sẵn sàng |
| **07** | [**Bài 7: Rendering Lists**](./Bai7-Rendering_Lists) | Hàm `map()` & `filter()`, tầm quan trọng cốt tử của `key`, cạm bẫy dùng Index làm Key | `my-app` (Key Pitfalls Lab, Danh mục khoa học) | ✅ Đã sẵn sàng |
| **08** | [**Bài 8: Keeping Components Pure**](./Bai8-Keeping_Components_Pure) | Hàm tinh khiết ($y = f(x)$), Side Effects, Đột biến cục bộ, giải mã Strict Mode gọi hàm 2 lần | `my-app` (Tiệc trà Pure vs Impure, StrictMode Inspector) | ✅ Đã sẵn sàng |
| **...** | *Các chương State, Hooks, Performance, Context...* | *Đang tiếp tục hoàn thiện và cập nhật theo lộ trình* | *Labs nâng cao* | 🚀 Coming soon |

---

## 📂 Cấu trúc một thư mục bài học

Mỗi bài học được tổ chức chuẩn mực thành 2 phần:

```text
BaiX-[Ten_Chu_De]/
├── Bài X.md                     # Tài liệu lý thuyết chi tiết, hình ảnh, phân tích, hỏi-đáp chuyên sâu
└── my-app/                      # Ứng dụng React thực hành (Vite)
    ├── src/
    │   ├── components/          # Các module thực hành chia theo từng mục lý thuyết
    │   │   ├── purity-basics/
    │   │   ├── strict-mode/
    │   │   ├── side-effects/
    │   │   └── challenges/      # Lời giải các bài tập của react.dev
    │   ├── App.jsx              # Giao diện điều hướng bằng hệ thống Tab trực quan
    │   └── main.jsx             # Điểm vào ứng dụng
    ├── package.json
    └── vite.config.js
```

---

## 🛠️ Hướng dẫn khởi chạy ứng dụng Lab thực hành

Để chạy thử bất kỳ bài Lab nào trên máy của bạn:

1. **Clone repository về máy:**
   ```bash
   git clone https://github.com/Tung-pro123/ZeroToHeroReact.git
   cd ZeroToHeroReact
   ```

2. **Di chuyển vào thư mục bài học muốn thực hành (Ví dụ Bài 1):**
   ```bash
   cd Bai1-Your_First_Component/my-app
   ```

3. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

4. **Khởi động máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```

5. Mở trình duyệt tại địa chỉ hiển thị trong terminal (thường là `http://localhost:5173` hoặc cổng được cấp phát) để bắt đầu tương tác với Lab.

---

## 🤝 Đóng góp & Phát triển (Contributing)

Dự án được xây dựng với tinh thần phi lợi nhuận vì cộng đồng học lập trình:
- Mọi đóng góp chỉnh sửa tài liệu, bổ sung câu hỏi phỏng vấn hay bài tập mẫu đều rất được hoan nghênh.
- Hãy mở một **Issue** để thảo luận hoặc tạo **Pull Request** theo đúng quy chuẩn phân nhánh bài học.

---

## 📄 Bản quyền (License)

Dự án được phân phối dưới giấy phép **MIT License**. Bạn có thể tự do học tập, chia sẻ và phát triển thêm.

⭐️ **Nếu bạn thấy dự án hữu ích, đừng quên tặng repo một Star trên GitHub để lan tỏa đến nhiều người học hơn nhé!**
