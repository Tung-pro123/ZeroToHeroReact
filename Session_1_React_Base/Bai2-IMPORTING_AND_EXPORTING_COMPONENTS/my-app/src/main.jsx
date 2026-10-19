import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Điểm khởi đầu (Entry Point) của ứng dụng React Vite
// Tương đương với hàm main() trong Application.java của Spring Boot:
// SpringApplication.run(Application.class, args);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
