// ============================================================================
// FILE: src/components/RulesOverview.jsx
// MỤC TIÊU: 3 Quy Tắc Vàng Của JSX (The 3 Golden Rules of JSX)
// ============================================================================

import React, { useState } from 'react';

export default function RulesOverview() {
  const [selectedRule, setSelectedRule] = useState('rule1');

  return (
    <div className="rules-overview-container">
      <div className="rules-header">
        <h2>3 Quy Tắc Vàng Của Cú Pháp JSX</h2>
        <p>
          JSX trông giống HTML nhưng thực chất là JavaScript. Để JavaScript có thể biên dịch thành công 
          thành các đối tượng <code>React.createElement()</code>, bạn cần tuân thủ 3 quy tắc sau:
        </p>
      </div>

      {/* Tabs 3 quy tắc */}
      <div className="rules-tabs">
        <button
          className={`rule-tab-btn ${selectedRule === 'rule1' ? 'active' : ''}`}
          onClick={() => setSelectedRule('rule1')}
        >
          1️⃣ Một Phần Tử Gốc Duy Nhất
        </button>
        <button
          className={`rule-tab-btn ${selectedRule === 'rule2' ? 'active' : ''}`}
          onClick={() => setSelectedRule('rule2')}
        >
          2️⃣ Đóng Mọi Thẻ (Self-Closing)
        </button>
        <button
          className={`rule-tab-btn ${selectedRule === 'rule3' ? 'active' : ''}`}
          onClick={() => setSelectedRule('rule3')}
        >
          3️⃣ camelCase Cho Hầu Hết Thuộc Tính
        </button>
      </div>

      {/* Chi tiết từng quy tắc */}
      <div className="rule-content-card">
        {selectedRule === 'rule1' && (
          <div className="rule-detail">
            <div className="rule-badge">Quy tắc 1: Return a single root element</div>
            <h3>Tại sao phải có duy nhất 1 thẻ cha bọc ngoài?</h3>
            <p>
              Một hàm JavaScript không thể <code>return</code> cùng lúc 2 giá trị độc lập. Vì JSX được chuyển đổi thành lời gọi hàm <code>React.createElement()</code>, 
              việc bọc các phần tử con vào một thẻ cha (hoặc thẻ rỗng <code>&lt;&gt;...&lt;/&gt;</code>) giúp hàm chỉ trả về 1 đối tượng duy nhất.
            </p>

            <div className="comparison-row">
              <div className="code-box invalid">
                <div className="box-tag">❌ HTML cũ / JSX Sai</div>
                <pre>{`// Báo lỗi: Adjacent JSX elements must be wrapped
return (
  <h1>Tiêu đề</h1>
  <p>Đoạn văn</p>
);`}</pre>
              </div>

              <div className="code-box valid">
                <div className="box-tag">✅ JSX Chuẩn (Dùng Fragment)</div>
                <pre>{`// Thẻ rỗng <>...</> biến mất khi render ra HTML
return (
  <>
    <h1>Tiêu đề</h1>
    <p>Đoạn văn</p>
  </>
);`}</pre>
              </div>
            </div>

            <div className="info-callout">
              💡 <strong>Lợi ích của Fragment:</strong> Không tạo ra các thẻ <code>&lt;div&gt;</code> thừa thãi trong cây DOM, 
              giữ nguyên cấu trúc CSS Flexbox và Grid không bị xô lệch.
            </div>
          </div>
        )}

        {selectedRule === 'rule2' && (
          <div className="rule-detail">
            <div className="rule-badge">Quy tắc 2: Close all the tags</div>
            <h3>Tất cả các thẻ bắt buộc phải được đóng rõ ràng</h3>
            <p>
              Trong HTML truyền thống, các thẻ đơn như <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;br&gt;</code> 
              thường không có thẻ đóng và trình duyệt tự đoán ý. Nhưng trong JSX, cú pháp JavaScript đòi hỏi sự chặt chẽ tuyệt đối: 
              <strong>mọi thẻ đơn đều phải kết thúc bằng dấu gạch chéo tự đóng <code>/&gt;</code></strong>.
            </p>

            <div className="comparison-row">
              <div className="code-box invalid">
                <div className="box-tag">❌ HTML Lỏng Lẻo</div>
                <pre>{`<img src="avatar.jpg" alt="User">
<input type="text">
<br>
<li>Mục 1
<li>Mục 2`}</pre>
              </div>

              <div className="code-box valid">
                <div className="box-tag">✅ JSX Nghiêm Ngặt</div>
                <pre>{`<img src="avatar.jpg" alt="User" />
<input type="text" />
<br />
<li>Mục 1</li>
<li>Mục 2</li>`}</pre>
              </div>
            </div>

            <div className="info-callout">
              🔍 <strong>Mẹo nhớ:</strong> Cứ thấy thẻ đơn không có nội dung bên trong, hãy đặt dấu <code>/&gt;</code> ở cuối thẻ.
            </div>
          </div>
        )}

        {selectedRule === 'rule3' && (
          <div className="rule-detail">
            <div className="rule-badge">Quy tắc 3: camelCase most of the things</div>
            <h3>Thuộc tính JSX tuân theo chuẩn đặt tên camelCase của JavaScript</h3>
            <p>
              Các thuộc tính trong JSX trở thành các khóa (keys) của JavaScript Object. Do biến trong JavaScript không thể chứa dấu gạch ngang và không được trùng với từ khóa dự lưu (reserved keywords), 
              hầu hết các thuộc tính HTML được chuyển thành <strong>camelCase</strong>.
            </p>

            <div className="comparison-row">
              <div className="code-box invalid">
                <div className="box-tag">❌ Thuộc tính HTML cũ</div>
                <pre>{`class="container"       // Xung đột từ khóa 'class'
for="username"          // Xung đột từ khóa 'for'
onclick="handleClick()" 
tabindex="0"
stroke-width="2"        // Dấu gạch ngang bị cấm`}</pre>
              </div>

              <div className="code-box valid">
                <div className="box-tag">✅ Thuộc tính JSX camelCase</div>
                <pre>{`className="container"   // Dùng className
htmlFor="username"      // Dùng htmlFor
onClick={handleClick}   // camelCase
tabIndex={0}
strokeWidth="2"         // camelCase cho SVG`}</pre>
              </div>
            </div>

            <div className="info-callout warning">
              ⚠️ <strong>Ngoại lệ duy nhất:</strong> Các thuộc tính <code>aria-*</code> (tiếp cận người dùng khiếm thị) 
              và <code>data-*</code> (dữ liệu tùy biến) vẫn giữ nguyên dấu gạch nối (ví dụ: <code>aria-label</code>, <code>data-testid</code>).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
