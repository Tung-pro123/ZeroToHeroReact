# 🏗️ Ứng Dụng Thực Hành Bài 23: Scaling Up with Reducer and Context

Ứng dụng tương tác chuyên sâu được xây dựng để thực hành và mô phỏng các kiến trúc cốt lõi khi mở rộng quy mô State trong React bằng bộ đôi **`useReducer` + `useContext`**, kỹ thuật tách Context chống re-render, Custom Hooks có guard và ứng dụng Giỏ hàng thương mại điện tử thực tế.

---

## 🚀 Khởi Chạy Ứng Dụng

Ứng dụng được cấu hình chạy trên cổng cố định **3017**:

```powershell
# Di chuyển vào thư mục my-app
cd "d:\Ki5_Fall_2026\React\Session_1_React_Base\Bai23-Scaling_Up_With_Reducer_And_Context\my-app"

# Cài đặt thư viện dependencies (nếu chưa cài)
npm install

# Khởi chạy dev server trên port 3017
npm run dev
```

Truy cập trên trình duyệt: `http://localhost:3017`

---

## 🌟 Các Phân Hệ Thực Hành (7 Phân Hệ)

1. **🏗️ Kiến Trúc Bộ Đôi (Reducer + Context):**
   - So sánh trực quan 3 giai đoạn: `useState + Prop Drilling` $\rightarrow$ `useReducer đơn độc` $\rightarrow$ `useReducer + useContext`.
2. **⚡ Tách State & Dispatch (Render Isolation Lab):**
   - Thực nghiệm đo lường Re-render: Chứng minh form nhập liệu đăng ký `DispatchContext` không bao giờ bị re-render khi danh sách công việc thay đổi.
3. **📦 Đóng Gói Custom Hooks (Clean Code):**
   - Khám phá mô hình gom tất cả vào `TasksContext.jsx` và cơ chế phòng vệ (Defensive Guard) của `useTasks()` khi bị gọi ngoài Provider.
4. **🪄 Nâng Cấp Với useImmerReducer:**
   - Xử lý State đa tầng lồng nhau (Bảng Kanban kéo thả công việc) bằng cú pháp đột biến `draft.push`, `splice` tự nhiên.
5. **🛒 Ứng Dụng Thực Tế: Enterprise TechStore Cart Engine:**
   - Hệ thống Giỏ hàng bán lẻ công nghệ hoàn chỉnh: Thêm sản phẩm, cập nhật số lượng, kiểm tra kho hàng, áp mã voucher giảm giá (REACT23, VIP50) bằng 100% Reducer + Context.
6. **🥊 Ma Trận So Sánh: Context vs Zustand vs Redux Toolkit:**
   - Bảng phân tích ưu/nhược điểm và công cụ Cố vấn Kiến trúc (Architecture Advisor) đề xuất giải pháp theo quy mô dự án.
7. **🧠 Thử Thách Trắc Nghiệm Chuyên Sâu:**
   - 4 câu hỏi trắc nghiệm chuẩn phỏng vấn Senior Frontend Engineer có chấm điểm tức thì và phân tích kỹ thuật chi tiết.
