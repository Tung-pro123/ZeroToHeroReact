# 👨‍🍳 Phòng Thí Nghiệm Bài 21: Extracting State Logic into a Reducer

Ứng dụng thực hành tương tác chuyên sâu minh họa kỹ thuật **Trích xuất logic State sang Reducer**, tư duy chuyển dịch từ Mệnh lệnh sang **Khai báo Dispatch Actions**, mô hình **Bếp Trưởng Nhà Hàng**, Hook `useReducer`, thư viện `useImmerReducer`, và tự chế Hook `useReducer` từ con số 0.

Dự án thuộc Series đào tạo **ZeroToHeroReact** (Chương 3: Managing State).

---

## 🚀 Cách Chạy Ứng Dụng

Ứng dụng được cấu hình chạy trên cổng mặc định **3015** (để tránh xung đột với các bài học khác):

```bash
# 1. Di chuyển vào thư mục my-app của Bài 21
cd Bai21-Extracting_State_Logic_Into_A_Reducer/my-app

# 2. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev
```

Trình duyệt sẽ tự động mở tại: `http://localhost:3015`

---

## 🎯 7 Module Thí Nghiệm Tương Tác

| Tab Module | Trọng Tâm Kiến Thức | Tương Tác Thực Tế |
| :--- | :--- | :--- |
| **1. Ẩn Dụ Nhà Hàng (Workflow)** | Luồng hoạt động của useReducer | Mô phỏng quy trình: Khách hàng (UI) ➡️ Bộ đàm (dispatch) ➡️ Tờ order (Action) ➡️ Bếp trưởng (Reducer) ➡️ Món ăn mới (New State) kèm Action Log |
| **2. Task Manager (useState vs useReducer)** | Gom cụm Business Logic | Ứng dụng công việc CRUD: So sánh trực quan giữa logic rải rác trong các hàm handler (useState) vs logic tập trung trong `tasksReducer` |
| **3. Messenger (Challenge 1 & 2)** | Giải pháp Thử thách 1 & 2 trong React.dev | Ứng dụng chat nhắn tin: Chọn người nhận, gõ chữ, gửi tin và tự động xóa trắng ô nhập liệu sau khi gửi bằng Reducer |
| **4. Bản Nháp Theo Người (Challenge 3)** | Giải pháp Thử thách 3 trong React.dev | Nâng cấp State thành Hash Map `messages: { [id]: text }` để bảo toàn bản nháp riêng biệt cho từng người khi chuyển đổi qua lại |
| **5. useImmerReducer** | Đột biến bản nháp an toàn với Immer | Quản lý kho hàng thiết bị: Trải nghiệm sự tiện lợi của `draft.push()`, `draft.splice()` và gán trực tiếp không cần spread operator |
| **6. Tự Code useReducer (Challenge 4)** | Giải pháp Thử thách 4 trong React.dev | So sánh song song: Hook chính thức của React vs Hook tự chế bằng `useState` (`useMyReducer`) chỉ với 8 dòng mã |
| **7. Thử Thách Trắc Nghiệm** | Đo lường độ thấu hiểu kiến trúc State | 4 câu hỏi tình huống thực tế kiểm tra sâu về Dispatch, Pure Function, và Immer |

---

## 🛠️ Công Nghệ Sử Dụng

- **React 18** (Functional Components, `useReducer`, `useState`, Custom Hook)
- **Vite 5** (Fast HMR, port 3015)
- **Vanilla Modern CSS** (Glassmorphism, Dark Amber & Orange Theme, Responsive Flexbox & Grid)
- **Google Fonts** (Outfit, JetBrains Mono)
