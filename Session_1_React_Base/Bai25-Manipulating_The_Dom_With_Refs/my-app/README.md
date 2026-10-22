# 🧪 Interactive Lab - Bài 25: Manipulating the DOM with Refs

Dự án thực hành chuyên sâu thuộc khóa học **ZeroToHeroReact**.

## 🚀 Khởi chạy ứng dụng

```bash
cd Session_1_React_Base/Bai25-Manipulating_The_Dom_With_Refs/my-app
npm install
npm run dev
```

Mở trình duyệt tại: **http://localhost:3019**

## 🎯 Các phòng thí nghiệm tương tác (Tabs)

1. **Focus & Scroll Playground**: Khám phá các API DOM của trình duyệt (`focus()`, `blur()`, `scrollIntoView()`, `getBoundingClientRect()`).
2. **Media Player Controller**: Xây dựng trình phát Video HTML5 tùy biến không dùng điều khiển mặc định thông qua `videoRef.current`.
3. **Cat Friends Gallery (Ref Callback & Map)**: Kỹ thuật quản lý danh sách vô hạn các phần tử DOM bằng `useRef(new Map())` và hàm Callback Ref.
4. **ForwardRef & Imperative Handle**: Đóng gói API của Component con bằng `forwardRef` và `useImperativeHandle` nhằm bảo mật và che giấu DOM thật.
5. **FlushSync Todo & Chat Scroll**: Giải quyết hiện tượng bất đồng bộ khi cập nhật danh sách và cuộn DOM tức thời với `flushSync`.
6. **React.dev Official Challenges**: Giải quyết trọn vẹn 4 thử thách của react.dev.
7. **Senior Architect Quiz**: 5 câu hỏi phỏng vấn kiến trúc DOM Ref.
