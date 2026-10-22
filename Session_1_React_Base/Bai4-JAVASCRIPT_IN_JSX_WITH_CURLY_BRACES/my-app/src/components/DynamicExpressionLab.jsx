// ============================================================================
// FILE: src/components/DynamicExpressionLab.jsx
// MỤC TIÊU: Cánh Cửa JavaScript {} - Nhúng Biến, Biểu Thức và Logic Động
// ============================================================================

import React, { useState } from 'react';

export default function DynamicExpressionLab() {
  const [firstName, setFirstName] = useState('Marie');
  const [lastName, setLastName] = useState('Curie');
  const [birthYear, setBirthYear] = useState(1867);
  const [profession, setProfession] = useState('Nhà vật lý & Hóa học');
  const [nobelPrizes, setNobelPrizes] = useState(2);

  const currentYear = new Date().getFullYear();
  const formatFullName = (first, last) => `${first} ${last}`.toUpperCase();

  return (
    <div className="dynamic-lab-container">
      <div className="lab-intro">
        <h2>🪟 Cánh Cửa JavaScript <code>{`{}`}</code> Trong JSX</h2>
        <p>
          Trong JSX, bất cứ khi nào bạn mở cặp ngoặc nhọn <code>{`{}`}</code>, bạn đang mở một 
          <strong> "cửa sổ sổ thẳng vào JavaScript"</strong> để tính toán biểu thức, nhúng biến, gọi hàm, hoặc nối chuỗi động.
        </p>
      </div>

      <div className="dynamic-lab-grid">
        {/* Cột 1: Bảng điều khiển Form tương tác */}
        <div className="controls-card">
          <h3>🎮 Thay Đổi Dữ Liệu Tầng Logic:</h3>
          <div className="form-group">
            <label>Họ (First Name):</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="lab-input"
            />
          </div>
          <div className="form-group">
            <label>Tên (Last Name):</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="lab-input"
            />
          </div>
          <div className="form-group">
            <label>Năm sinh (Birth Year):</label>
            <input 
              type="number" 
              value={birthYear} 
              onChange={(e) => setBirthYear(Number(e.target.value))} 
              className="lab-input"
            />
          </div>
          <div className="form-group">
            <label>Nghề nghiệp:</label>
            <input 
              type="text" 
              value={profession} 
              onChange={(e) => setProfession(e.target.value)} 
              className="lab-input"
            />
          </div>
          <div className="form-group">
            <label>Số giải Nobel:</label>
            <input 
              type="number" 
              value={nobelPrizes} 
              onChange={(e) => setNobelPrizes(Number(e.target.value))} 
              className="lab-input"
            />
          </div>
        </div>

        {/* Cột 2: Xem kết quả Render trực tiếp */}
        <div className="preview-card">
          <div className="preview-top">
            <strong>Giao Diện Render Trực Tiếp (Live JSX)</strong>
            <span className="live-pill">REAL-TIME</span>
          </div>

          <div className="scientist-card">
            {/* Gọi hàm trong {} */}
            <h2 className="scientist-name">{formatFullName(firstName, lastName)}</h2>
            
            {/* Biến trong {} */}
            <p className="scientist-profession">🔬 {profession}</p>

            {/* Phép toán trong {} */}
            <div className="calc-badge">
              🎂 Năm sinh: <strong>{birthYear}</strong> • Tính toán: <strong>{currentYear - birthYear}</strong> năm trước
            </div>

            {/* Biểu thức 3 ngôi trong {} */}
            <div className="achievement-box">
              {nobelPrizes > 0 ? (
                <span className="nobel-status winner">
                  🏆 Đạt {nobelPrizes} giải Nobel danh giá
                </span>
              ) : (
                <span className="nobel-status none">
                  Chưa nhận giải Nobel
                </span>
              )}
            </div>
          </div>

          {/* Cột 3: Mã nguồn tương ứng */}
          <div className="code-inspector">
            <div className="code-inspector-title">📄 Mã JSX tương ứng đang thực thi:</div>
            <pre className="code-box">
{`// 1. Nhúng hàm JavaScript:
<h1>{formatFullName("${firstName}", "${lastName}")}</h1>

// 2. Nhúng biến trực tiếp:
<p>{profession}</p>

// 3. Thực hiện phép toán động:
<span>Khoảng cách: {${currentYear} - ${birthYear}} năm trước</span>

// 4. Toán tử 3 ngôi (Ternary Expression):
<div>
  {${nobelPrizes} > 0 
    ? "Đạt " + ${nobelPrizes} + " giải Nobel" 
    : "Chưa nhận giải"}
</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
