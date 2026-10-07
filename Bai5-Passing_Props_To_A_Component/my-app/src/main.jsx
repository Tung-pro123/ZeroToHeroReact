// ========================================================================================
// FILE: src/main.jsx
// ========================================================================================
// ĐIỂM VÀO (ENTRY POINT) CỦA DỰ ÁN REACT VITE - BÀI HỌC 5
// Tương đương public static void main(String[] args) trong Spring Boot
// ========================================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Lỗi: Không tìm thấy thẻ #root trong index.html!");
}
