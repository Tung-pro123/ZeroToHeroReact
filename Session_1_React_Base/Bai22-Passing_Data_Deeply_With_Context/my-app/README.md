# 🌌 Ứng Dụng Thực Hành Bài 22: Passing Data Deeply with Context

Ứng dụng tương tác chuyên sâu được xây dựng để thực hành và mô phỏng các kiến trúc cốt lõi của React Context API, giải pháp thay thế Prop Drilling, kỹ thuật Context Shadowing, phòng tránh cạm bẫy re-render và so sánh Component Composition vs Context.

---

## 🚀 Khởi Chạy Ứng Dụng

Ứng dụng được cấu hình chạy trên cổng cố định **3016**:

```powershell
# Di chuyển vào thư mục my-app
cd "d:\Ki5_Fall_2026\React\Bai22-Passing_Data_Deeply_With_Context\my-app"

# Cài đặt thư viện dependencies (nếu chưa cài)
npm install

# Khởi chạy dev server trên port 3016
npm run dev
```

Truy cập trên trình duyệt: `http://localhost:3016`

---

## 🌟 Các Phân Hệ Thực Hành (7 Phân Hệ)

1. **🕳️ Prop Drilling vs Context Teleportation**:
   - Trực quan hóa đường truyền dữ liệu qua cây 4 tầng: `RootApp` -> `NavHeader` -> `AccountBar` -> `LeafCheckout`.
   - Đối chiếu tác động khi dùng Prop Drilling (component trung gian bị phụ thuộc rác) so với Context Teleportation (component trung gian sạch 100%).
2. **📑 Tiêu Đề Thích Ứng (Context Shadowing)**:
   - Hiện thực hóa mô hình chuẩn từ React.dev: `<Section>` và `<Heading>`.
   - `<Section>` tự động đọc `parentLevel` và cấp `parentLevel + 1` cho con cháu.
   - Thử nghiệm 3 Preset: Cấu trúc bài báo Blog, Tài liệu kỹ thuật React 5 cấp, và Bảng điều khiển Dashboard.
3. **🔐 Multi-Context Động (Theme & Authentication)**:
   - Tách rời `ThemeContext` (Cyberpunk, Dark, Light) và `AuthContext` (Admin, Editor, Viewer, Guest).
   - Kiểm soát phân quyền dựa trên vai trò người dùng (RBAC) mà không cần nén tất cả vào một God Context.
4. **🖼️ Thử Thách Zoom Ảnh (React.dev Challenge 1)**:
   - Bài toán gốc từ tài liệu React.dev: Thu phóng kích thước ảnh danh sách địa danh mà không cần truyền prop qua `List` và `Place`.
   - Cung cấp so sánh trước và sau khi refactor sang `ImageSizeContext`.
5. **⚡ Cạm Bẫy Re-render & Chiến Lược Tách Context**:
   - Khám phá lỗi sụt giảm hiệu năng: Khi timer biến động 800ms/lần, component `UserProfile` bị kéo theo re-render liên tục nếu gom chung Context.
   - Mô phỏng kỹ thuật Tách Context (Split Context) với bộ đếm lượt render trực tiếp (render counters).
6. **🧩 Component Composition vs Context API**:
   - Phân tích nguyên tắc vàng: "Trước khi dùng Context, hãy thử truyền JSX dưới dạng `children` hoặc slot props".
   - Bảng ma trận so sánh chi tiết giữa Composition, Context và Redux/Zustand.
7. **🧠 Thử Thách Trắc Nghiệm Chuyên Sâu**:
   - 4 câu hỏi trắc nghiệm chuẩn phỏng vấn Senior Frontend Engineer với chấm điểm tức thì và giải thích kỹ thuật chi tiết.
