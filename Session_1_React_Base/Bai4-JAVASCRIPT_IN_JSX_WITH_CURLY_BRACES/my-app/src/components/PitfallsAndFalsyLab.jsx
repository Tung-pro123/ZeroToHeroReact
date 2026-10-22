// ============================================================================
// FILE: src/components/PitfallsAndFalsyLab.jsx
// MỤC TIÊU: Phòng Thí Nghiệm Cạm Bẫy Của {} - Biểu Thức & Giá Trị Falsy
// ============================================================================

import React, { useState } from 'react';

export default function PitfallsAndFalsyLab() {
  const [falsyType, setFalsyType] = useState('zero');
  const [itemCount, setItemCount] = useState(0);

  // Giá trị tương ứng với từng loại
  const getFalsyValue = () => {
    switch (falsyType) {
      case 'null': return null;
      case 'undefined': return undefined;
      case 'true': return true;
      case 'false': return false;
      case 'zero': return 0;
      case 'empty_string': return "";
      default: return null;
    }
  };

  const currentVal = getFalsyValue();

  return (
    <div className="pitfall-falsy-container">
      <div className="pitfall-header">
        <h2>🧪 Phòng Thí Nghiệm: Cạm Bẫy Biểu Thức & Giá Trị Falsy Trong JSX</h2>
        <p>
          Không phải mọi thứ trong <code>{`{}`}</code> đều được hiển thị ra màn hình. Khám phá cơ chế ẩn giá trị của React 
          và cạm bẫy in số <code>0</code> kinh điển!
        </p>
      </div>

      <div className="pitfall-grid">
        {/* Phần 1: Thí nghiệm giá trị Falsy */}
        <div className="falsy-card">
          <h3>1. Thử Nghiệm: Các Giá Trị Falsy Trong <code>{`{}`}</code></h3>
          <p>Nhấp vào từng giá trị để kiểm tra xem React có hiển thị nó ra màn hình hay không:</p>

          <div className="falsy-buttons-tray">
            <button 
              className={`falsy-btn ${falsyType === 'null' ? 'active' : ''}`}
              onClick={() => setFalsyType('null')}
            >
              null
            </button>
            <button 
              className={`falsy-btn ${falsyType === 'undefined' ? 'active' : ''}`}
              onClick={() => setFalsyType('undefined')}
            >
              undefined
            </button>
            <button 
              className={`falsy-btn ${falsyType === 'true' ? 'active' : ''}`}
              onClick={() => setFalsyType('true')}
            >
              true
            </button>
            <button 
              className={`falsy-btn ${falsyType === 'false' ? 'active' : ''}`}
              onClick={() => setFalsyType('false')}
            >
              false
            </button>
            <button 
              className={`falsy-btn danger ${falsyType === 'zero' ? 'active' : ''}`}
              onClick={() => setFalsyType('zero')}
            >
              ⚠️ Số 0 (Number)
            </button>
            <button 
              className={`falsy-btn ${falsyType === 'empty_string' ? 'active' : ''}`}
              onClick={() => setFalsyType('empty_string')}
            >
              Chuỗi rỗng ""
            </button>
          </div>

          <div className="falsy-result-box">
            <div className="result-label">
              Mã JSX: <code>&lt;div&gt;{`{${falsyType === 'empty_string' ? '""' : falsyType}}`}&lt;/div&gt;</code>
            </div>
            <div className="render-target">
              Kết quả trên DOM: [
              <span className="rendered-content">
                {currentVal}
              </span>
              ]
            </div>
            
            <div className="diagnostic-note">
              {falsyType === 'zero' ? (
                <div className="alert-danger">
                  🚨 <strong>CẠNH BÁO SỐ 0:</strong> Số <code>0</code> là một kiểu số (Number) thực thụ, 
                  do đó React sẽ <strong>IN SỐ 0</strong> ra giao diện chứ KHÔNG hề ẩn đi!
                </div>
              ) : (
                <div className="alert-safe">
                  ✅ <strong>VÔ HÌNH:</strong> Giá trị <code>{falsyType}</code> được React tự động bỏ qua, 
                  không sinh ra bất kỳ ký tự nào trên DOM.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Phần 2: Cạm bẫy && và số 0 */}
        <div className="bug-simulator-card">
          <h3>2. Cạm Bẫy Thực Chiến: <code>{`count && <Badge />`}</code></h3>
          <p>
            Thử nghiệm thay đổi số lượng tin nhắn về <code>0</code> để xem lỗi hiển thị số 0 ngoài ý muốn:
          </p>

          <div className="counter-controls">
            <button className="cnt-btn" onClick={() => setItemCount(Math.max(0, itemCount - 1))}>- Giảm</button>
            <span className="count-display">Tin nhắn: <strong>{itemCount}</strong></span>
            <button className="cnt-btn" onClick={() => setItemCount(itemCount + 1)}>+ Tăng</button>
          </div>

          <div className="comparison-panels">
            {/* Cách viết sai */}
            <div className="panel-box flawed">
              <div className="panel-tag">❌ Viết sai: <code>{`{count && <Badge />}`}</code></div>
              <div className="preview-output">
                {itemCount && <span className="msg-badge">📬 {itemCount} tin mới</span>}
              </div>
              <small className="panel-desc">Khi count = 0, trên giao diện sẽ hiện số 0 trơ trọi!</small>
            </div>

            {/* Cách viết chuẩn */}
            <div className="panel-box fixed">
              <div className="panel-tag">✅ Viết đúng: <code>{`{count > 0 && <Badge />}`}</code></div>
              <div className="preview-output">
                {itemCount > 0 && <span className="msg-badge">📬 {itemCount} tin mới</span>}
              </div>
              <small className="panel-desc">Khi count = 0, điều kiện là false nên hoàn toàn ẩn đi!</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
