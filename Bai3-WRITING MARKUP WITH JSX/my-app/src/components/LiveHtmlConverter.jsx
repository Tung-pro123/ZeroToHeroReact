// ============================================================================
// FILE: src/components/LiveHtmlConverter.jsx
// MỤC TIÊU: Bộ Chuyển Đổi & Sân Chơi Tương Tác HTML sang JSX Trực Tiếp
// ============================================================================

import React, { useState } from 'react';

const SAMPLES = {
  profile: {
    name: "Thẻ Hồ Sơ (Profile Card)",
    html: `<div class="bio-card">
  <h1>Albert Einstein</h1>
  <img src="https://i.imgur.com/7vQD0fPs.jpg" alt="Einstein" class="avatar">
  <br>
  <p>Nhà vật lý lý thuyết đoạt giải Nobel.</p>
</div>`
  },
  form: {
    name: "Form Đăng Nhập",
    html: `<form class="login-form">
  <label for="username">Tên người dùng:</label>
  <input type="text" id="username" class="input-field">
  <br>
  <label for="password">Mật khẩu:</label>
  <input type="password" id="password" class="input-field">
</form>`
  },
  svg: {
    name: "Biểu Tượng SVG",
    html: `<svg width="24" height="24" stroke-width="2" class="icon">
  <circle cx="12" cy="12" r="10">
  <path d="M12 6v6l4 2">
</svg>`
  }
};

export default function LiveHtmlConverter() {
  const [selectedKey, setSelectedKey] = useState('profile');
  const [htmlInput, setHtmlInput] = useState(SAMPLES.profile.html);
  const [jsxOutput, setJsxOutput] = useState('');
  const [detectedIssues, setDetectedIssues] = useState([]);

  // Hàm phát hiện lỗi và chuyển đổi sang JSX
  const handleConvert = (input = htmlInput) => {
    const issues = [];
    let converted = input;

    // 1. Kiểm tra class -> className
    if (/class=/g.test(converted)) {
      issues.push("Phát hiện thuộc tính 'class' -> Đã đổi thành 'className'");
      converted = converted.replace(/class=/g, 'className=');
    }

    // 2. Kiểm tra for -> htmlFor
    if (/for=/g.test(converted)) {
      issues.push("Phát hiện thuộc tính 'for' -> Đã đổi thành 'htmlFor'");
      converted = converted.replace(/for=/g, 'htmlFor=');
    }

    // 3. Đóng thẻ img
    if (/<img([^>]*?)(?<!\/)>/g.test(converted)) {
      issues.push("Phát hiện thẻ '<img>' chưa tự đóng -> Đã thêm '/>'");
      converted = converted.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
    }

    // 4. Đóng thẻ input
    if (/<input([^>]*?)(?<!\/)>/g.test(converted)) {
      issues.push("Phát hiện thẻ '<input>' chưa tự đóng -> Đã thêm '/>'");
      converted = converted.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
    }

    // 5. Đóng thẻ br
    if (/<br\s*(?<!\/)>/g.test(converted)) {
      issues.push("Phát hiện thẻ '<br>' chưa tự đóng -> Đã đổi thành '<br />'");
      converted = converted.replace(/<br\s*(?<!\/)>/g, '<br />');
    }

    // 6. SVG attributes
    if (/stroke-width=/g.test(converted)) {
      issues.push("Phát hiện SVG 'stroke-width' -> Đã đổi thành 'strokeWidth'");
      converted = converted.replace(/stroke-width=/g, 'strokeWidth=');
    }
    if (/<path([^>]*?)(?<!\/)>/g.test(converted)) {
      issues.push("Phát hiện thẻ SVG '<path>' chưa tự đóng -> Đã thêm '/>'");
      converted = converted.replace(/<path([^>]*?)(?<!\/)>/g, '<path$1 />');
    }
    if (/<circle([^>]*?)(?<!\/)>/g.test(converted)) {
      issues.push("Phát hiện thẻ SVG '<circle>' chưa tự đóng -> Đã thêm '/>'");
      converted = converted.replace(/<circle([^>]*?)(?<!\/)>/g, '<circle$1 />');
    }

    // Bọc trong Fragment
    converted = `<>\n  ${converted.split('\n').join('\n  ')}\n</>`;

    setDetectedIssues(issues.length > 0 ? issues : ["Mã nguồn đã hợp lệ chuẩn JSX!"]);
    setJsxOutput(converted);
  };

  const handleSelectSample = (key) => {
    setSelectedKey(key);
    setHtmlInput(SAMPLES[key].html);
    handleConvert(SAMPLES[key].html);
  };

  return (
    <div className="converter-container">
      <div className="converter-header">
        <h2>🔄 Sân Chơi Chuyển Đổi: HTML to JSX Live Converter</h2>
        <p>
          Thử nghiệm chuyển đổi các đoạn mã HTML chứa lỗi cú pháp phổ biến sang mã JSX chuẩn chỉ với 1 click!
        </p>
      </div>

      {/* Nút chọn mẫu thử */}
      <div className="sample-buttons-tray">
        <span className="sample-label">Chọn mẫu thử nghiệm:</span>
        {Object.keys(SAMPLES).map((key) => (
          <button
            key={key}
            className={`sample-btn ${selectedKey === key ? 'active' : ''}`}
            onClick={() => handleSelectSample(key)}
          >
            {SAMPLES[key].name}
          </button>
        ))}
      </div>

      {/* 2 cột Editor: HTML vs JSX */}
      <div className="converter-grid">
        <div className="editor-card html-card">
          <div className="editor-top">
            <span className="lang-tag html">HTML Gốc (Chứa lỗi cú pháp JSX)</span>
            <button className="action-convert-btn" onClick={() => handleConvert(htmlInput)}>
              ⚡ Phân Tích & Chuyển Đổi
            </button>
          </div>
          <textarea
            className="code-editor"
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            rows={10}
            placeholder="Nhập mã HTML vào đây..."
          />
        </div>

        <div className="editor-card jsx-card">
          <div className="editor-top">
            <span className="lang-tag jsx">JSX Sau Khi Chuẩn Hóa</span>
            <span className="status-indicator">✅ Đã bọc Fragment & Tự đóng thẻ</span>
          </div>
          <textarea
            className="code-editor result"
            value={jsxOutput || 'Nhấn nút "Chuyển Đổi" để xem kết quả JSX...'}
            readOnly
            rows={10}
          />
        </div>
      </div>

      {/* Báo cáo phân tích lỗi */}
      <div className="issues-report-panel">
        <h4>📋 Báo Cáo Phân Tích Lỗi Tự Động:</h4>
        <ul className="issues-list">
          {detectedIssues.map((issue, idx) => (
            <li key={idx} className="issue-item">
              {issue.includes('Phát hiện') ? '🔧 ' : '🎉 '}
              {issue}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
