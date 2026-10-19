// ============================================================================
// FILE: src/components/GregorioZaraChallenge.jsx
// MỤC TIÊU: Lời Giải Tương Tác 3 Thử Thách react.dev
//           "Gregorio Y. Zara's Todos"
// ============================================================================

import React, { useState } from 'react';

export default function GregorioZaraChallenge() {
  const [activeChallenge, setActiveChallenge] = useState(1);

  // Dữ liệu nhà khoa học Gregorio Y. Zara
  const person = {
    name: 'Gregorio Y. Zara',
    imageId: '7vQD0fP',
    imageSize: 's',
    theme: {
      backgroundColor: '#0f172a',
      color: '#f43f5e',
      padding: '24px',
      borderRadius: '16px',
      border: '2px solid #fb7185'
    }
  };

  const baseUrl = 'https://i.imgur.com/';

  return (
    <div className="zara-challenge-container">
      <div className="zara-header">
        <span className="challenge-tag">🏆 3 Thử Thách Chính Thức react.dev</span>
        <h2>Bộ 3 Thử Thách: Danh Sách Công Việc Của Gregorio Y. Zara</h2>
        <p>
          Gregorio Y. Zara là kỹ sư và nhà phát minh nổi tiếng người Philippines (người phát minh ra điện thoại truyền hình 
          hai chiều đầu tiên - Two-way videophone).
        </p>
      </div>

      {/* Tabs 3 bài tập */}
      <div className="challenge-tabs">
        <button
          className={`chal-tab-btn ${activeChallenge === 1 ? 'active' : ''}`}
          onClick={() => setActiveChallenge(1)}
        >
          Thử thách 1: Sửa mã nguồn bị lỗi
        </button>
        <button
          className={`chal-tab-btn ${activeChallenge === 2 ? 'active' : ''}`}
          onClick={() => setActiveChallenge(2)}
        >
          Thử thách 2: Tách thông tin vào Object
        </button>
        <button
          className={`chal-tab-btn ${activeChallenge === 3 ? 'active' : ''}`}
          onClick={() => setActiveChallenge(3)}
        >
          Thử thách 3: Biểu thức động trong {}
        </button>
      </div>

      {/* Nội dung thử thách */}
      <div className="challenge-body-grid">
        <div className="solution-code-card">
          {activeChallenge === 1 && (
            <div>
              <h3>🔍 Thử Thách 1: Fix the broken code</h3>
              <p>Mã ban đầu đặt <code>theme</code> trong dấu ngoặc kép <code>"person.theme"</code> khiến trình duyệt không nhận style.</p>
              <pre className="code-box">
{`// ✅ Sửa: style={person.theme} thay vì style="person.theme"
export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Cải tiến điện thoại truyền hình (Videophone)</li>
        <li>Chuẩn bị bài giảng hàng không vũ trụ</li>
        <li>Nghiên cứu động cơ chạy bằng cồn sinh học</li>
      </ul>
    </div>
  );
}`}
              </pre>
            </div>
          )}

          {activeChallenge === 2 && (
            <div>
              <h3>📦 Thử Thách 2: Extract info into an object</h3>
              <p>Gom <code>imageId</code> và <code>imageSize</code> vào chung đối tượng <code>person</code> để quản lý tập trung:</p>
              <pre className="code-box">
{`const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: { ... }
};

// Trong JSX: Nối chuỗi Template String
<img
  className="avatar"
  src={\`https://i.imgur.com/\${person.imageId}\${person.imageSize}.jpg\`}
  alt={person.name}
/>`}
              </pre>
            </div>
          )}

          {activeChallenge === 3 && (
            <div>
              <h3>✨ Thử Thách 3: Expression inside JSX curly braces</h3>
              <p>Tạo biến <code>baseUrl</code> và thực hiện phép cộng chuỗi biểu thức trực tiếp trong cặp ngoặc <code>{`{}`}</code>:</p>
              <pre className="code-box">
{`const baseUrl = 'https://i.imgur.com/';

<img
  className="avatar"
  src={baseUrl + person.imageId + person.imageSize + '.jpg'}
  alt={person.name}
/>`}
              </pre>
            </div>
          )}
        </div>

        {/* Khung Render trực tiếp kết quả */}
        <div className="zara-preview-card">
          <div className="preview-top">
            <strong>Giao Diện Hoạt Động Trực Tiếp (Live Theme)</strong>
            <span className="theme-tag">Pink / Slate Theme</span>
          </div>

          <div style={person.theme}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '14px' }}>
              {person.name}'s Todos
            </h2>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
              <img
                style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid #fb7185' }}
                src={baseUrl + person.imageId + person.imageSize + '.jpg'}
                alt={person.name}
              />
              <p style={{ color: '#fda4af', fontSize: '0.85rem' }}>
                Kỹ sư trưởng & Nhà phát minh chiếc điện thoại video 2 chiều đầu tiên (1955).
              </p>
            </div>

            <ul style={{ listStyle: 'square', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Cải tiến điện thoại truyền hình (Videophone)</li>
              <li>Chuẩn bị bài giảng hàng không vũ trụ</li>
              <li>Nghiên cứu động cơ chạy bằng cồn sinh học</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
