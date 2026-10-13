// ============================================================================
// FILE: src/components/JsxErrorSimulator.jsx
// MỤC TIÊU: Phòng Thí Nghiệm Lỗi Cú Pháp JSX Thường Gặp
// ============================================================================

import React, { useState } from 'react';

export default function JsxErrorSimulator() {
  const [selectedError, setSelectedError] = useState('adjacent');
  const [isFixed, setIsFixed] = useState(false);

  const errorScenarios = {
    adjacent: {
      title: "1. Lỗi Nhiều Thẻ Gốc (Adjacent Elements)",
      brokenCode: `function Card() {
  return (
    <h1>Tiêu Đề Bài Viết</h1>
    <p>Nội dung đoạn văn bản</p>
  ); // ❌ LỖI: Hai thẻ đứng ngang hàng ở gốc!
}`,
      fixedCode: `function Card() {
  return (
    <>
      <h1>Tiêu Đề Bài Viết</h1>
      <p>Nội dung đoạn văn bản</p>
    </> // ✅ ĐÃ SỬA: Bọc bằng Fragment <>...</>
  );
}`,
      errorMsg: "SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?",
      explanation: "Hàm JavaScript không thể return cùng lúc 2 giá trị. Khi bọc bằng Fragment, React gom chúng thành 1 phần tử gốc duy nhất mà không sinh thẻ <div> thừa trong DOM."
    },
    unclosed: {
      title: "2. Lỗi Quên Đóng Thẻ Đơn (Unclosed Tags)",
      brokenCode: `function Avatar() {
  return (
    <img src="https://i.imgur.com/yXOvdOSs.jpg" alt="User">
  ); // ❌ LỖI: Thẻ <img> chưa có dấu tự đóng />!
}`,
      fixedCode: `function Avatar() {
  return (
    <img src="https://i.imgur.com/yXOvdOSs.jpg" alt="User" />
  ); // ✅ ĐÃ SỬA: Thêm dấu /> ở cuối thẻ đơn!
}`,
      errorMsg: "SyntaxError: Expected corresponding JSX closing tag for <img>. All tags in JSX must be explicitly closed.",
      explanation: "Khác với HTML trình duyệt lỏng lẻo, JSX là cú pháp XML của JavaScript nên mọi thẻ đơn (<img/>, <input/>, <br/>, <hr/>) bắt buộc phải có dấu gạch chéo tự đóng />."
    },
    className: {
      title: "3. Lỗi Dùng Thuộc Tính class Thay Vì className",
      brokenCode: `function Button() {
  return (
    <button class="primary-btn">Nhấp Vào Đây</button>
  ); // ⚠️ CẢNH BÁO: 'class' là từ khóa dành riêng trong JS!
}`,
      fixedCode: `function Button() {
  return (
    <button className="primary-btn">Nhấp Vào Đây</button>
  ); // ✅ ĐÃ SỬA: Đổi sang className!
}`,
      errorMsg: "Warning: Invalid DOM property `class`. Did you mean `className`? at button...",
      explanation: "Trong JavaScript ES6, 'class' là từ khóa dùng để khai báo class OOP. Để tránh xung đột, JSX quy định dùng 'className' để gán lớp CSS."
    }
  };

  const current = errorScenarios[selectedError];

  return (
    <div className="error-simulator-container">
      <div className="simulator-header">
        <h2>🧪 Phòng Thí Nghiệm Lỗi Cú Pháp JSX</h2>
        <p>Quan sát các thông báo lỗi kinh điển từ trình biên dịch React và cách sửa chữa tức thì.</p>
      </div>

      {/* Bộ chọn lỗi */}
      <div className="error-selector-tabs">
        {Object.keys(errorScenarios).map((key) => (
          <button
            key={key}
            className={`selector-tab-btn ${selectedError === key ? 'active' : ''}`}
            onClick={() => {
              setSelectedError(key);
              setIsFixed(false);
            }}
          >
            {errorScenarios[key].title}
          </button>
        ))}
      </div>

      {/* Khung hiển thị code và lỗi */}
      <div className="simulator-display-grid">
        <div className="code-view-card">
          <div className="code-view-top">
            <span className={`status-badge ${isFixed ? 'fixed' : 'broken'}`}>
              {isFixed ? '✅ TRẠNG THÁI: ĐÃ KHẮC PHỤC' : '🔴 TRẠNG THÁI: PHÁT SINH LỖI'}
            </span>
            <button
              className="toggle-fix-btn"
              onClick={() => setIsFixed(!isFixed)}
            >
              {isFixed ? '⏪ Xem lại code lỗi' : '🛠️ Tự động sửa lỗi (Fix Code)'}
            </button>
          </div>
          <pre className="code-snippet-box">
            {isFixed ? current.fixedCode : current.brokenCode}
          </pre>
        </div>

        <div className="diagnostic-view-card">
          {!isFixed ? (
            <div className="error-banner">
              <div className="error-title">
                <span className="icon">🚨</span>
                <strong>Thông báo lỗi từ React / Vite Compiler:</strong>
              </div>
              <div className="error-text">{current.errorMsg}</div>
              <div className="error-explanation">
                <h4>💡 Giải thích nguyên nhân:</h4>
                <p>{current.explanation}</p>
              </div>
            </div>
          ) : (
            <div className="success-banner">
              <div className="success-title">
                <span className="icon">🎉</span>
                <strong>Biên dịch thành công (Compiled Successfully):</strong>
              </div>
              <p>Mã JSX hợp lệ! React đã có thể chuyển đổi đoạn mã trên thành <code>React.createElement()</code> hợp lệ.</p>
              <div className="demo-render-preview">
                {selectedError === 'adjacent' && (
                  <div className="rendered-preview-box">
                    <h3>Tiêu Đề Bài Viết</h3>
                    <p>Nội dung đoạn văn bản được bọc bằng Fragment an toàn.</p>
                  </div>
                )}
                {selectedError === 'unclosed' && (
                  <div className="rendered-preview-box">
                    <img 
                      src="https://i.imgur.com/yXOvdOSs.jpg" 
                      alt="User Avatar" 
                      style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <p style={{ marginTop: 8, fontSize: '0.85rem' }}>Thẻ <code>&lt;img /&gt;</code> tự đóng hiển thị hoàn hảo.</p>
                  </div>
                )}
                {selectedError === 'className' && (
                  <div className="rendered-preview-box">
                    <button className="sample-success-btn">Nhấp Vào Đây (className="primary-btn")</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
