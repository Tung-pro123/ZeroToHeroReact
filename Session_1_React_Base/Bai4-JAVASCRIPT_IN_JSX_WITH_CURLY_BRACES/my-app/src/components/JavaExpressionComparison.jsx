// ============================================================================
// FILE: src/components/JavaExpressionComparison.jsx
// MỤC TIÊU: Góc Kỹ Sư Backend - So sánh Expression Language trong Java vs JSX {}
// ============================================================================

import React, { useState } from 'react';

export default function JavaExpressionComparison() {
  const [selectedCase, setSelectedCase] = useState('interpolation');

  const comparisonData = {
    interpolation: {
      title: "1. Nhúng Biến Động: JSP/Thymeleaf EL vs JSX {}",
      desc: "Cách đưa giá trị từ biến vào văn bản giao diện.",
      reactCode: `// React JSX
const userName = "Nguyễn Văn A";
return <h1>Xin chào, {userName}!</h1>;

// Biểu thức số học & hàm:
return <p>Tổng: {price * quantity}</p>;
return <p>{formatDate(order.createdAt)}</p>;`,
      javaCode: `<!-- Spring Boot Thymeleaf -->
<h1 th:text="'Xin chào, ' + \${userName} + '!'"></h1>

<!-- Biểu thức số học & hàm trong Thymeleaf: -->
<p th:text="'Tổng: ' + (\${price} * \${quantity})"></p>
<p th:text="\${#temporals.format(order.createdAt, 'dd/MM/yyyy')}"></p>`
    },
    style: {
      title: "2. Cấu Hình Style: Java Map/DTO vs Object Literal {{}}",
      desc: "Cách cấu hình style động bằng đối tượng.",
      reactCode: `// React JSX: Cú pháp {{}} (Ngoặc ngoài = JSX, trong = Object)
<div style={{
  backgroundColor: 'navy',
  color: 'white',
  padding: '12px'
}}>
  Nội dung
</div>`,
      javaCode: `// Java Spring Boot: Trả về Map hoặc DTO cho View
Map<String, String> style = Map.of(
    "background-color", "navy",
    "color", "white",
    "padding", "12px"
);
model.addAttribute("cardStyle", style);

<!-- Thymeleaf: -->
<div th:style="\${cardStyle}">Nội dung</div>`
    },
    ternary: {
      title: "3. Câu Lệnh vs Biểu Thức: Tại Sao Không Dùng Được if?",
      desc: "Giải thích tại sao JSX {} chỉ nhận Expression trả về giá trị.",
      reactCode: `// React JSX: Chỉ chấp nhận Expression
// ❌ LỖI: { if (isLoggedIn) { ... } }
// ✅ ĐÚNG: Dùng toán tử 3 ngôi (Ternary)
<div>
  {isLoggedIn ? <UserMenu /> : <LoginButton />}
</div>`,
      javaCode: `// Java: Tương tự tham số truyền vào hàm
// ❌ Java không cho phép: System.out.println(if (ok) "A");
// ✅ Java bắt buộc dùng: System.out.println(ok ? "A" : "B");

<!-- Thymeleaf: Toán tử điều kiện tương tự -->
<div th:text="\${isLoggedIn ? 'Chào mừng' : 'Đăng nhập'}"></div>`
    }
  };

  const current = comparisonData[selectedCase];

  return (
    <div className="java-el-container">
      <div className="el-header">
        <span className="badge-spring">🍃 Java / Spring Boot EL</span>
        <span className="badge-vs">VS</span>
        <span className="badge-jsx">⚛️ React JSX Cặp Ngoặc {}</span>
        <h3>Bản Đồ Đối Chiếu Dành Riêng Cho Backend Developer</h3>
      </div>

      <div className="el-tabs">
        {Object.keys(comparisonData).map(key => (
          <button
            key={key}
            className={`el-tab-btn ${selectedCase === key ? 'active' : ''}`}
            onClick={() => setSelectedCase(key)}
          >
            {comparisonData[key].title}
          </button>
        ))}
      </div>

      <p className="case-desc">{current.desc}</p>

      <div className="comparison-columns-grid">
        <div className="card-box react-box">
          <div className="box-top">
            <strong>⚛️ React JSX (Frontend)</strong>
          </div>
          <pre className="code-block">{current.reactCode}</pre>
        </div>

        <div className="card-box java-box">
          <div className="box-top">
            <strong>🍃 Java Spring Boot (Backend)</strong>
          </div>
          <pre className="code-block">{current.javaCode}</pre>
        </div>
      </div>
    </div>
  );
}
