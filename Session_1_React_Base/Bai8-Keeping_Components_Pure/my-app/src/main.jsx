// ========================================================================================
// FILE: src/main.jsx
// ========================================================================================
// ĐIỂM VÀO ỨNG DỤNG REACT VITE - BÀI HỌC 8
//
// ⚠️ LƯU Ý ĐẶC BIỆT CỦA BÀI 8 VỀ <React.StrictMode>:
// Chính thẻ <React.StrictMode> ở đây là nguyên nhân khiến React gọi hàm Component 2 LẦN
// trong môi trường Development (npm run dev) để phát hiện ô nhiễm (Impurity)!
// ========================================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* 
        StrictMode cố tình render 2 lần:
        1. Lần 1: Tính toán thử nghiệm
        2. Lần 2: Tính toán thật
        Nếu component của bạn là Pure Function -> Kết quả 2 lần giống hệt nhau, an toàn!
      */}
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Lỗi: Không tìm thấy phần tử DOM #root trong index.html!");
}
