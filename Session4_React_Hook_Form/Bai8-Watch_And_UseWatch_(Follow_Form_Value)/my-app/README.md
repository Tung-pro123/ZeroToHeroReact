# Session 4 • Bài 8: watch() và useWatch() — Theo Dõi Giá Trị Form

Ứng dụng thực nghiệm chuyên sâu trực quan hóa toàn diện cơ chế **Subscriptions & Live Form Values** trong **React Hook Form (v7.51+)**.

## 🎯 Mục tiêu bài học (Curriculum Mastery)
1. **getValues() vs watch()**: Phân biệt bản chất Snapshot (đọc tức thời một lần, không kích hoạt re-render) và Subscription (lắng nghe thay đổi liên tục để cập nhật UI thời gian thực).
2. **watch() API Variations**:
   - `watch("fieldName")`: Theo dõi một trường cụ thể.
   - `watch(["fieldA", "fieldB"])`: Theo dõi danh sách nhiều trường.
   - `watch()`: Theo dõi toàn bộ form (cân nhắc chi phí hiệu năng).
3. **Conditional UI & Derived State**:
   - Xây dựng giao diện điều kiện (Account Type: Personal, Company, Student) thay đổi trường nhập liệu tức thì.
   - Tính toán trạng thái suy dẫn (Derived State) trực tiếp trong quá trình render (Password Strength, Live Character Counter, Total Calculation) mà **không lạm dụng `useEffect` hay `useState` thừa thãi**.
4. **useWatch() & Re-render Isolation**:
   - Sử dụng hook `useWatch({ control, name })` để cô lập subscription trong component con (`<ShippingPrice />`, `<PricePreview />`).
   - Chứng minh qua bộ đếm `RenderCounter`: Component cha KHÔNG bị re-render khi gõ vào trường chỉ được lắng nghe bởi component con.
5. **watch() vs dirtyFields**:
   - Phân biệt Giá Trị (Value - "Nó đang là gì?") và Siêu Dữ Liệu (Metadata - "Nó có bị thay đổi khỏi default không?").
   - Chứng minh sai lầm nghiêm trọng khi cố dùng `dirtyFields` để làm Conditional UI (ví dụ với 3 tùy chọn: Personal, Company, Student).
6. **Senior Architect Knowledge Check**: 5 câu hỏi phỏng vấn chuẩn mực củng cố tư duy kiến trúc.

## 🚀 Hướng dẫn khởi chạy
```bash
npm install
npm run dev
```
Cổng phục vụ: **http://localhost:3048**

