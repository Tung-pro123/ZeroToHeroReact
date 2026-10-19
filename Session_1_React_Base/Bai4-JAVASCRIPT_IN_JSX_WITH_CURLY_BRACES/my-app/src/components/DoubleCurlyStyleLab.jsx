// ============================================================================
// FILE: src/components/DoubleCurlyStyleLab.jsx
// MỤC TIÊU: Giải Mã Cú Pháp {{}} & Điều Khiển Inline Style Trực Quan
// ============================================================================

import React, { useState } from 'react';

export default function DoubleCurlyStyleLab() {
  const [bgColor, setBgColor] = useState('#1e1b4b');
  const [textColor, setTextColor] = useState('#38bdf8');
  const [padding, setPadding] = useState(24);
  const [borderRadius, setBorderRadius] = useState(16);
  const [borderWidth, setBorderWidth] = useState(2);
  const [borderColor, setBorderColor] = useState('#818cf8');
  const [fontSize, setFontSize] = useState(18);

  // Tạo đối tượng Style từ State
  const customCardStyle = {
    backgroundColor: bgColor,
    color: textColor,
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
    border: `${borderWidth}px solid ${borderColor}`,
    fontSize: `${fontSize}px`,
    transition: 'all 0.2s ease',
    textAlign: 'center'
  };

  return (
    <div className="double-curly-container">
      <div className="curly-header">
        <h2>🎨 Giải Mã Cú Pháp <code>{`{{ }}`}</code> & Inline Style</h2>
        <p>
          Cú pháp <code>style={'{ { ... } }'}</code> không phải là phép thuật của React! 
          Đơn giản chỉ là: <strong>Ngoặc nhọn ngoài cùng = Mở cánh cửa JavaScript</strong>, 
          và <strong>Ngoặc nhọn bên trong = Đối tượng JavaScript Object</strong>.
        </p>
      </div>

      <div className="curly-grid">
        {/* Bộ điều khiển Style */}
        <div className="style-controls-card">
          <h3>🎛️ Bảng Điều Khiển Thuộc Tính CSS (camelCase):</h3>
          
          <div className="control-row">
            <label>backgroundColor:</label>
            <input 
              type="color" 
              value={bgColor} 
              onChange={(e) => setBgColor(e.target.value)} 
              className="color-picker"
            />
            <span className="val-text">{bgColor}</span>
          </div>

          <div className="control-row">
            <label>color (Màu chữ):</label>
            <input 
              type="color" 
              value={textColor} 
              onChange={(e) => setTextColor(e.target.value)} 
              className="color-picker"
            />
            <span className="val-text">{textColor}</span>
          </div>

          <div className="control-row">
            <label>padding: {padding}px</label>
            <input 
              type="range" 
              min="10" 
              max="50" 
              value={padding} 
              onChange={(e) => setPadding(Number(e.target.value))} 
              className="slider"
            />
          </div>

          <div className="control-row">
            <label>borderRadius: {borderRadius}px</label>
            <input 
              type="range" 
              min="0" 
              max="40" 
              value={borderRadius} 
              onChange={(e) => setBorderRadius(Number(e.target.value))} 
              className="slider"
            />
          </div>

          <div className="control-row">
            <label>fontSize: {fontSize}px</label>
            <input 
              type="range" 
              min="14" 
              max="28" 
              value={fontSize} 
              onChange={(e) => setFontSize(Number(e.target.value))} 
              className="slider"
            />
          </div>
        </div>

        {/* Khung Demo Render & Inspector */}
        <div className="style-preview-col">
          {/* Component áp dụng Inline Style */}
          <div className="rendered-style-box" style={customCardStyle}>
            <h3>Thẻ Giao Diện Được Style Động</h3>
            <p>style={`{{ backgroundColor: '${bgColor}', color: '${textColor}', ... }}`}</p>
          </div>

          {/* So sánh 2 cách viết code */}
          <div className="code-comparison-tray">
            <div className="code-half">
              <h4>Cách 1: Nhúng trực tiếp <code>{`style={{ ... }}`}</code></h4>
              <pre className="code-box">
{`<div style={{
  backgroundColor: '${bgColor}',
  color: '${textColor}',
  padding: '${padding}px',
  borderRadius: '${borderRadius}px'
}}>
  Nội dung
</div>`}
              </pre>
            </div>

            <div className="code-half">
              <h4>Cách 2: Tách thành biến Object (Clean Code)</h4>
              <pre className="code-box">
{`const cardStyle = {
  backgroundColor: '${bgColor}',
  color: '${textColor}',
  padding: '${padding}px',
  borderRadius: '${borderRadius}px'
};

<div style={cardStyle}>
  Nội dung
</div>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
