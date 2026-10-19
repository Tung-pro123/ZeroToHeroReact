// ============================================================================
// FILE: src/components/JavaThymeleafComparison.jsx
// MỤC TIÊU: Góc Kỹ Sư Backend - So sánh Thymeleaf / JSP vs React JSX
// ============================================================================

import React, { useState } from 'react';

export default function JavaThymeleafComparison() {
  const [activeTab, setActiveTab] = useState('fragment');

  const topics = {
    fragment: {
      title: "1. Thẻ Bọc Ảo: <th:block> vs <React.Fragment>",
      desc: "Cả hai đều giải quyết bài toán: Gom nhóm logic mà không làm sinh thêm thẻ HTML thừa trong cây DOM.",
      reactCode: `// React JSX
// Thẻ rỗng <>...</> hoàn toàn biến mất sau khi render
function TableRows() {
  return (
    <>
      <tr><td>Hàng 1</td></tr>
      <tr><td>Hàng 2</td></tr>
    </>
  );
}`,
      javaCode: `<!-- Spring Boot Thymeleaf -->
<!-- <th:block> sẽ biến mất, chỉ giữ lại các thẻ <tr> -->
<th:block th:each="user : \${users}">
  <tr>
    <td th:text="\${user.name}">Tên</td>
  </tr>
</th:block>`
    },
    compilation: {
      title: "2. Cơ Chế Biên Dịch: Chuỗi HTML vs Đối Tượng AST",
      desc: "Thymeleaf xử lý nối chuỗi văn bản trên Server, trong khi JSX là cây đối tượng JavaScript biên dịch lúc build.",
      reactCode: `// React JSX: Compile-Time Syntax Checking
// Được Babel dịch thành JavaScript Object:
const element = <h1 className="title">Xin chào</h1>;

// Thực chất là:
const element = React.createElement(
  'h1', 
  { className: 'title' }, 
  'Xin chào'
);
// -> Nếu gõ sai thẻ đóng, IDE & Compiler báo lỗi NGAY LẬP TỨC!`,
      javaCode: `<!-- Spring Boot Thymeleaf: Server String Processing -->
<!-- Trình phân tích chuỗi đọc file .html trên Server lúc Runtime -->
<h1 th:class="\${titleStyle}">Xin chào</h1>

<!-- Nhược điểm: Nếu sai cú pháp hoặc sai tên biến, 
     phải đợi người dùng gửi Request lên Server mới quăng lỗi TemplateEngineException! -->`
    },
    xss: {
      title: "3. Phòng Chống Tấn Công XSS (Cross-Site Scripting)",
      desc: "Cách React JSX và Thymeleaf bảo vệ ứng dụng khỏi mã độc được chèn từ bên ngoài.",
      reactCode: `// React JSX: Tự động Escape an toàn tuyệt đối
const userInput = "<script>stealCookies()</script>";

return <div>{userInput}</div>;
// -> Trình duyệt render ra chuỗi text an toàn:
// "&lt;script&gt;stealCookies()&lt;/script&gt;"

// Chỉ khi cố tình dùng:
// dangerouslySetInnerHTML={{ __html: userInput }} mới có rủi ro!`,
      javaCode: `<!-- Spring Boot Thymeleaf -->
<!-- th:text mặc định tự động escape mã HTML -->
<p th:text="\${userInput}"></p>

<!-- Chỉ khi dùng th:utext (unescaped text) 
     mới có nguy cơ bị tấn công XSS! -->
<p th:utext="\${userInput}"></p>`
    }
  };

  const current = topics[activeTab];

  return (
    <div className="java-thymeleaf-container">
      <div className="thymeleaf-header">
        <span className="badge-spring">🍃 Spring Boot Thymeleaf</span>
        <span className="badge-vs">VS</span>
        <span className="badge-jsx">⚛️ React JSX</span>
        <h3>Bản Đồ Đối Chiếu Dành Riêng Cho Backend Developer</h3>
      </div>

      <div className="thymeleaf-tabs">
        {Object.keys(topics).map(key => (
          <button
            key={key}
            className={`thymeleaf-tab-btn ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {topics[key].title}
          </button>
        ))}
      </div>

      <p className="topic-summary">{current.desc}</p>

      <div className="comparison-cards-grid">
        <div className="side-card react-side">
          <div className="side-card-top">
            <strong>⚛️ React JSX (Frontend)</strong>
          </div>
          <pre className="code-box">{current.reactCode}</pre>
        </div>

        <div className="side-card spring-side">
          <div className="side-card-top">
            <strong>🍃 Spring Boot Thymeleaf (Backend)</strong>
          </div>
          <pre className="code-box">{current.javaCode}</pre>
        </div>
      </div>
    </div>
  );
}
