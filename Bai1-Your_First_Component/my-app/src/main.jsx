// ========================================================================================
// FILE: src/main.jsx
// ========================================================================================
// BẢN CHẤT CỦA MAIN.JSX TRONG HỆ SINH THÁI REACT VITE:
//
// 1. Đây là tập tin điểm vào (Entry Point) của toàn bộ ứng dụng Client-side.
//    ĐỐI CHIẾU SPRING BOOT:
//    File này tương đương chính xác với phương thức:
//    public static void main(String[] args) {
//        SpringApplication.run(Application.class, args);
//    }
//
// 2. ReactDOM.createRoot:
//    Tạo ra một "Gốc điều khiển" (Root Container) tại phần tử HTML có id="root" trong index.html.
//    Từ thời điểm này, React Engine sẽ toàn quyền kiểm soát cây DOM này.
//
// 3. <React.StrictMode>:
//    Một wrapper chế độ kiểm tra nghiêm ngặt trong môi trường phát triển (Development).
//    Nó giúp cảnh báo các component không thuần khiết (impure functions), 
//    các hàm gọi tác dụng phụ (side effects) không an toàn.
// ========================================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';

// Nạp Component gốc (Root Component) của ứng dụng
import App from './App.jsx';

// Nạp bộ Design Tokens và CSS toàn cục (Global Styles)
import './index.css';

// Tìm thẻ div có id="root" và khởi tạo React Root
const rootElement = document.getElementById('root');

if (rootElement) {
  // Gắn kết (Mount) React vào DOM thật của trình duyệt
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* Gọi Component App đầu tiên */}
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Lỗi: Không tìm thấy phần tử DOM #root trong index.html!");
}
