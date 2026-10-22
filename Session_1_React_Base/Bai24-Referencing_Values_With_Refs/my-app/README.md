# 🧪 Interactive Lab - Bài 24: Referencing Values with Refs (`useRef`)

Dự án thực hành chuyên sâu thuộc khóa học **ZeroToHeroReact**.

## 🚀 Khởi chạy ứng dụng

```bash
cd Session_1_React_Base/Bai24-Referencing_Values_With_Refs/my-app
npm install
npm run dev
```

Mở trình duyệt tại: **http://localhost:3018**

## 🎯 Các phòng thí nghiệm tương tác (Tabs)

1. **Memory Model Visualizer**: So sánh trực quan cơ chế bộ nhớ giữa `let` (biến thường), `useState` (gây re-render), và `useRef` (giữ giá trị, không re-render).
2. **Stopwatch Precision Lab**: Ứng dụng đồng hồ bấm giờ siêu chuẩn xác với chức năng Laps, giải thích bản chất vì sao `startTime` cần state nhưng `timerId` bắt buộc phải là Ref.
3. **Render-Phase Mutation Trap**: Cảnh báo cạm bẫy đọc/ghi `ref.current` trong render body khiến Strict Mode đúp 2 lần và phá hủy Concurrent Mode.
4. **Debounce & Throttle Engine**: Giải pháp chống spam click và tối ưu ô tìm kiếm với `useRef` lưu giữ timer ID.
5. **Advanced Ref Patterns**: Tự làm hook `usePrevious`, bộ đếm số lần render không gây lặp vô hạn, cờ an toàn `isMountedRef`.
6. **React.dev Official Challenges**: Giải quyết 4 thử thách chính thức của tài liệu React với công tắc Đúng/Sai và giải thích cặn kẽ.
7. **Senior Architect Quiz**: Bộ câu hỏi trắc nghiệm kiến trúc chuyên sâu về Escape Hatches và Closure Trap.
