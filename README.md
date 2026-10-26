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

### 🌟 Session 1: React Base (Nền Tảng Cốt Lõi React.dev)

|   STT   | Bài học                                                                                                                          | Trọng tâm lý thuyết                                                                                                                                          | Lab thực hành đi kèm                                                                                                               |   Trạng thái   |
| :-----: | :------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------------: |
| **01**  | [**Bài 1: Your First Component**](./Session_1_React_Base/Bai1-Your_First_Component)                                             | Component là gì, cấu trúc hàm, cú pháp JSX, cạm bẫy viết hoa PascalCase & ASI                                                                                | `my-app` (Profile, Gallery, Parent-Child)                                                                                          | ✅ Đã sẵn sàng |
| **02**  | [**Bài 2: Importing and Exporting Components**](./Session_1_React_Base/Bai2-IMPORTING_AND_EXPORTING_COMPONENTS)                 | Root Component, default export vs named export, phòng tránh lỗi undefined                                                                                    | `my-app` (Tổ chức module, Lab mô phỏng lỗi)                                                                                        | ✅ Đã sẵn sàng |
| **03**  | [**Bài 3: Writing Markup with JSX**](./Session_1_React_Base/Bai3-WRITING%20MARKUP%20WITH%20JSX)                                 | Bản chất JSX vs HTML, quy tắc thẻ đóng, React Fragment `<>`, bẫy `className`                                                                                 | `my-app` (Bộ chuyển đổi HTML sang JSX, Lab mô phỏng lỗi)                                                                           | ✅ Đã sẵn sàng |
| **04**  | [**Bài 4: JavaScript in JSX with Curly Braces**](./Session_1_React_Base/Bai4-JAVASCRIPT_IN_JSX_WITH_CURLY_BRACES)               | Nhúng biểu thức động với `{ }`, truyền biến, cú pháp double curly braces `{{ }}`                                                                             | `my-app` (Sân chơi biểu thức động, Lab cạm bẫy Falsy)                                                                              | ✅ Đã sẵn sàng |
| **05**  | [**Bài 5: Passing Props to a Component**](./Session_1_React_Base/Bai5-Passing_Props_To_A_Component)                             | Truyền Props, bóc tách Destructuring, Props mặc định, Spread Props `{...props}`, prop `children`                                                             | `my-app` (Card wrapper, Profile, Avatar, Spread Lab)                                                                               | ✅ Đã sẵn sàng |
| **06**  | [**Bài 6: Conditional Rendering**](./Session_1_React_Base/Bai6-Condition_Rendering)                                             | Render có điều kiện, toán tử ba ngôi `? :`, logic AND `&&` và cạm bẫy số `0`                                                                                 | `my-app` (PackingList, Badge tương tác)                                                                                            | ✅ Đã sẵn sàng |
| **07**  | [**Bài 7: Rendering Lists**](./Session_1_React_Base/Bai7-Rendering_Lists)                                                       | Hàm `map()` & `filter()`, tầm quan trọng cốt tử của `key`, cạm bẫy dùng Index làm Key                                                                        | `my-app` (Key Pitfalls Lab, Danh mục khoa học)                                                                                     | ✅ Đã sẵn sàng |
| **08**  | [**Bài 8: Keeping Components Pure**](./Session_1_React_Base/Bai8-Keeping_Components_Pure)                                       | Hàm tinh khiết ($y = f(x)$), Side Effects, Đột biến cục bộ, giải mã Strict Mode gọi hàm 2 lần                                                                | `my-app` (Tiệc trà Pure vs Impure, StrictMode Inspector)                                                                           | ✅ Đã sẵn sàng |
| **09**  | [**Bài 9: Understanding Your UI as a Tree**](./Session_1_React_Base/Bai9-Understanding_Your_UI_As_A_Tree)                       | Mô hình Cây Render (Render Tree) vs Cây Phụ thuộc Mô-đun (Dependency Tree), Tree-Shaking, Decoupling với `children`                                          | `my-app` (Tree Visualizer, Tree-Shaking Simulator, Quiz)                                                                           | ✅ Đã sẵn sàng |
| **10**  | [**Bài 10: Responding to Events**](./Session_1_React_Base/Bai10-Responding_To_Events)                                           | Event Handler, Truyền hàm vs Thực thi hàm `handleClick` vs `handleClick()`, Event Bubbling, `stopPropagation()`, `preventDefault()`                          | `my-app` (Bubbling Visualizer, Call vs Pass Pitfall, Form Lab)                                                                     | ✅ Đã sẵn sàng |
| **11**  | [**Bài 11: State - A Component's Memory**](./Session_1_React_Base/Bai11-State-A_Coponent's_Memory)                              | Bộ nhớ Component, `useState`, Vòng đời Re-render, Luật tối thượng của Hooks, Cơ chế Con trỏ mảng RAM                                                         | `my-app` (Let vs State, Hook Cursor Inspector, Gallery Lab)                                                                        | ✅ Đã sẵn sàng |
| **12**  | [**Bài 12: Render and Commit**](./Session_1_React_Base/Bai12-Render_And_Commit)                                                 | Chu trình 3 bước (Trigger, Render, Commit, Paint), Thuật toán Diffing, Bảo toàn DOM node                                                                     | `my-app` (Pipeline Stepper, Clock & Input Lab, Diffing Inspector)                                                                  | ✅ Đã sẵn sàng |
| **13**  | [**Bài 13: State as a Snapshot**](./Session_1_React_Base/Bai13-State_As_A_Snapshot)                                             | Bản chất Snapshot bất biến, Phương pháp thế giá trị (+3 bẫy), JavaScript Closure, Chống lỗi Race Condition                                                   | `my-app` (Triple Counter, Chat Race Simulator, Traffic Light, Closure Inspector)                                                   | ✅ Đã sẵn sàng |
| **14**  | [**Bài 14: Queueing a Series of State Updates**](./Session_1_React_Base/Bai14-Queueing_A_Series_Of_State_Updates)               | Gom cụm Automatic Batching (React 18), Updater Function `n => n + 1`, Thuật toán State Queue Engine `getFinalState`, `flushSync`                             | `my-app` (Bồi Bàn Batching, Pipeline Step-by-Step, Async Cart Lab, Queue Test Engine)                                              | ✅ Đã sẵn sàng |
| **15**  | [**Bài 15: Updating Objects in State**](./Session_1_React_Base/Bai15-Updating_Objects_In_State)                                 | Đột biến vs Bất biến, So sánh tham chiếu `Object.is`, Toán tử Spread `...`, Nested Objects, Thư viện Immer (`use-immer`)                                     | `my-app` (Pointer Canvas, Form Đa Trường, Nested Immer Lab, Shared Bug)                                                            | ✅ Đã sẵn sàng |
| **16**  | [**Bài 16: Updating Arrays in State**](./Session_1_React_Base/Bai16-Updating_Arrays_In_State)                                   | Mảng bất biến, Từ điển hàm Sạch vs Bẩn, Kỹ thuật cắt nối `slice` & Spread, Cập nhật Object trong Mảng, `use-immer`                                           | `my-app` (Array Ops Playground, Shopping Cart, Slice Puzzle, Nested Todos)                                                         | ✅ Đã sẵn sàng |
| **17**  | [**Bài 17: Reacting to Input with State**](./Session_1_React_Base/Bài17-Reacting_To_Input_With_State)                           | Lập trình Khai báo (Declarative) vs Mệnh lệnh, Quy trình 5 bước thiết kế UI, Triệt tiêu Nghịch lý State (FSM)                                                | `my-app` (Taxi Analogy, 5 Visual Mockups, Paradox Refactor, Profile Editor)                                                        | ✅ Đã sẵn sàng |
| **18**  | [**Bài 18: Choosing the State Structure**](./Session_1_React_Base/Bai18-Choosing_The_State_Structure)                           | 5 Nguyên tắc vàng thiết kế State, Derived State (bỏ useState thừa), Lưu ID thay vì Object, Làm phẳng cây (Normalized State), Set O(1)                        | `my-app` (5 Nguyên Tắc Lab, Packing List, Menu ID Selection, Multi-select Set, Flatten Tree)                                       | ✅ Đã sẵn sàng |
| **19**  | [**Bài 19: Sharing State Between Components**](./Session_1_React_Base/Bai19-Sharing_State_Between_Coponents)                    | Kéo State lên Cha (Lifting State Up), Luồng dữ liệu một chiều Top-Down, Controlled vs Uncontrolled, Nguồn Sự Thật Duy Nhất                                   | `my-app` (Accordion Lab, Synced Inputs, Filterable List, Form Playground, Nhiệt kế 3NF)                                            | ✅ Đã sẵn sàng |
| **20**  | [**Bài 20: Preserving and Resetting State**](./Session_1_React_Base/Bai20-Preserving_And_Resetting_State)                       | Vị trí Cây Render, 2 Quy tắc vàng bảo toàn State, Điều phối Identity bằng `key`, Cạm bẫy Component lồng nhau                                                 | `my-app` (Position Matrix, Nested Trap, Chat Key Reset, Misplaced State, CSS vs Unmount)                                           | ✅ Đã sẵn sàng |
| **21**  | [**Bài 21: Extracting State Logic into a Reducer**](./Session_1_React_Base/Bai21-Extracting_State_Logic_Into_A_Reducer)         | Tách rời State Logic, Ẩn dụ Bếp Trưởng Nhà Hàng, Dispatching Actions, Thư viện Immer `useImmerReducer`, Tự code `useReducer`                                 | `my-app` (Workflow Nhà Hàng, Task Manager, Messenger, Draft Map, useImmerReducer Lab)                                              | ✅ Đã sẵn sàng |
| **22**  | [**Bài 22: Passing Data Deeply with Context**](./Session_1_React_Base/Bai22-Passing_Data_Deeply_With_Context)                   | Triệt tiêu Prop Drilling, Cổng dịch chuyển Context (`createContext`, `Provider`, `useContext`), Context Shadowing, Cạm bẫy Re-render, Composition vs Context | `my-app` (Prop Drilling Visualizer, Adaptive Headings, Multi-Context Auth/Theme, Challenge 1 Image Zoom, Re-render Trap Lab, Quiz) | ✅ Đã sẵn sàng |
| **23**  | [**Bài 23: Scaling Up with Reducer and Context**](./Session_1_React_Base/Bai23-Scaling_Up_With_Reducer_And_Context)             | Bộ đôi hoàn hảo: `useReducer` + `useContext`, Tách biệt State Context vs Dispatch Context, Đóng gói Custom Hooks `useTasks`, Nâng cấp `useImmerReducer` | `my-app` (Mini-Redux Engine, Render Isolation Lab, E-Commerce Cart, Custom Hooks Guard, Quiz)                                       | ✅ Đã sẵn sàng |
| **24**  | [**Bài 24: Referencing Values with Refs**](./Session_1_React_Base/Bai24-Referencing_Values_With_Refs)                           | Bộ nhớ không gây re-render `useRef`, Cấu trúc `{ current }`, Khi nào dùng Ref vs State, 3 Nguyên tắc vàng Escape Hatch, Khắc phục Stale Closure | `my-app` (Memory Visualizer, Stopwatch Precision, Render Trap Lab, Debounce Engine, Previous Value, 4 Challenges)                 | ✅ Đã sẵn sàng |
| **25**  | [**Bài 25: Manipulating the DOM with Refs**](./Session_1_React_Base/Bai25-Manipulating_The_Dom_With_Refs)                       | Thao tác DOM với `ref`, Thời điểm gắn DOM (Commit Phase), Quản lý mảng Ref với Ref Callback & Map, `forwardRef`, `useImperativeHandle`, `flushSync` | `my-app` (Focus & Scroll Navigator, Cat Friends Gallery, Video Controller, Custom Form with forwardRef, Todo flushSync)          | ✅ Đã sẵn sàng |

---

### 🚀 Session 2: React Router & Single Page Application (SPA)

|   STT   | Bài học                                                                       | Trọng tâm lý thuyết                                                                                                      | Lab thực hành đi kèm                                           |   Trạng thái   |
| :-----: | :---------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- | :------------: |
| **01**  | [**Bài 1: React Router Basics**](./Session_2_React_Router/Bai1-Routing)       | Client-Side Routing vs Server-Side Routing, `createBrowserRouter`, `RouterProvider`, `Link` vs `NavLink`, Nested Routes | `my-app` (Multi-page Layout, Active Navigation, Dynamic Routes) | ✅ Đã sẵn sàng |
| **02**  | [**Bài 2: Navigating**](./Session_2_React_Router/Bai2-NAVIGATING)             | Điều hướng Declarative (`<Link>`, `<NavLink>`) vs Programmatic (`useNavigate`), Thuộc tính `end`, `isActive` callback  | `my-app` (Navigation Engine, NavLink Active Lab, Auth & Wizard Flow, Mini Store, Quiz) | ✅ Đã sẵn sàng |
| **...** | _Các chuyên đề Loaders, Actions, Auth Guards, Error Boundaries trong Router_ | _Đang tiếp tục hoàn thiện và cập nhật theo lộ trình_                                                                     | _Labs nâng cao_                                                | 🚀 Coming soon |

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
   cd Session_1_React_Base/Bai1-Your_First_Component/my-app
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
