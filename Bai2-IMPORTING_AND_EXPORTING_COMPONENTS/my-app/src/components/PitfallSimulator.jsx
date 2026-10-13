// ============================================================================
// FILE: src/components/PitfallSimulator.jsx
// MỤC TIÊU: Phòng thí nghiệm tương tác mô phỏng lỗi kinh điển:
//           "Element type is invalid: ... but got: undefined"
// ============================================================================

import React, { useState } from 'react';
import { RoleBadge } from './TeamMembers';

export default function PitfallSimulator() {
  const [importMode, setImportMode] = useState('correct'); // 'correct' | 'missing_braces' | 'wrong_name'

  return (
    <div className="pitfall-lab">
      <div className="lab-header">
        <h3>🧪 Phòng Thí Nghiệm Lỗi: Mô Phỏng Quên Ngoặc Nhọn <code>{`{}`}</code></h3>
        <p>
          Thử nghiệm trực tiếp nguyên nhân khiến hàng ngàn lập trình viên mới gặp lỗi 
          <strong> "Element type is invalid ... but got: undefined"</strong>.
        </p>
      </div>

      {/* Bộ điều khiển chuyển đổi trường hợp */}
      <div className="lab-controls">
        <button
          className={`control-btn ${importMode === 'correct' ? 'active-success' : ''}`}
          onClick={() => setImportMode('correct')}
        >
          ✅ 1. Import Đúng Cú Pháp (Có dấu <code>{`{}`}</code>)
        </button>
        <button
          className={`control-btn ${importMode === 'missing_braces' ? 'active-danger' : ''}`}
          onClick={() => setImportMode('missing_braces')}
        >
          ❌ 2. Mô Phỏng Quên Dấu <code>{`{}`}</code>
        </button>
        <button
          className={`control-btn ${importMode === 'wrong_name' ? 'active-warning' : ''}`}
          onClick={() => setImportMode('wrong_name')}
        >
          ⚠️ 3. Đổi Tên Tùy Ý Mà Không Dùng <code>as</code>
        </button>
      </div>

      {/* Hiển thị code tương ứng */}
      <div className="code-comparison-box">
        <div className="code-label">
          {importMode === 'correct' && "🟢 Code đang thực thi (Thành công):"}
          {importMode === 'missing_braces' && "🔴 Code đang thực thi (Lỗi cú pháp nhập):"}
          {importMode === 'wrong_name' && "🟡 Code đang thực thi (Sai định danh):"}
        </div>
        <pre className="code-snippet">
          {importMode === 'correct' && (
            `// File TeamMembers.jsx chỉ xuất Named Export: export function RoleBadge()
import { RoleBadge } from './TeamMembers'; // ✅ Bắt buộc có ngoặc nhọn

function MyView() {
  return <RoleBadge role="Tech Lead" level="Staff" />; // RoleBadge là function hợp lệ!
}`
          )}

          {importMode === 'missing_braces' && (
            `// File TeamMembers.jsx KHÔNG CÓ export default!
import RoleBadge from './TeamMembers'; // ❌ Thiếu dấu {} -> RoleBadge nhận giá trị: undefined!

function MyView() {
  // Trình duyệt dịch thành: React.createElement(undefined, { role: "..." })
  return <RoleBadge role="Tech Lead" level="Staff" />; // 💥 SẬP ỨNG DỤNG!
}`
          )}

          {importMode === 'wrong_name' && (
            `// Named Export bắt buộc phải khớp 100% tên hàm đã xuất!
import { HuyHieuChucVu } from './TeamMembers'; // ❌ File gốc không có 'HuyHieuChucVu' -> undefined!

// Sửa đúng bằng từ khóa 'as':
import { RoleBadge as HuyHieuChucVu } from './TeamMembers'; // ✅ Đúng chuẩn ES6`
          )}
        </pre>
      </div>

      {/* Kết quả hiển thị UI */}
      <div className="lab-preview-area">
        {importMode === 'correct' && (
          <div className="preview-success">
            <div className="success-badge">✅ RENDER THÀNH CÔNG</div>
            <p>Component <code>RoleBadge</code> nhận đúng định danh hàm và hiển thị giao diện:</p>
            <div className="render-container">
              <RoleBadge role="Senior Software Engineer" level="Lead" />
              <RoleBadge role="Fullstack Developer" level="Senior" />
            </div>
          </div>
        )}

        {importMode === 'missing_braces' && (
          <div className="preview-error">
            <div className="error-header">
              <span className="error-icon">🚨</span>
              <strong>Uncaught Error: Element type is invalid</strong>
            </div>
            <div className="error-message">
              expected a string (for built-in components) or a class/function (for composite components) but got: <code>undefined</code>.
              <br /><br />
              <em>You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.</em>
            </div>
            <div className="error-analysis">
              <h4>🔍 Bắt bệnh trong 5 giây:</h4>
              <ul>
                <li><strong>Giá trị biến nhận được:</strong> <code>RoleBadge === undefined</code></li>
                <li><strong>Lý do:</strong> File <code>TeamMembers.jsx</code> chỉ có <code>export function RoleBadge()</code> (Named Export), nhưng bạn lại <code>import RoleBadge</code> (cú pháp dành cho Default Export).</li>
                <li><strong>Cách sửa:</strong> Thêm cặp dấu ngoặc nhọn: <code>{`import { RoleBadge } from './TeamMembers';`}</code></li>
              </ul>
              <button className="quick-fix-btn" onClick={() => setImportMode('correct')}>
                🛠️ Tự động sửa lỗi (Bật lại ngoặc nhọn)
              </button>
            </div>
          </div>
        )}

        {importMode === 'wrong_name' && (
          <div className="preview-warning">
            <div className="warning-header">
              <span className="warning-icon">⚠️</span>
              <strong>Cảnh báo: Import sai tên Named Export</strong>
            </div>
            <p>
              Với <strong>Default Export</strong>, bạn có thể đặt tên bất kỳ (ví dụ <code>import BatKy from './Gallery'</code>). 
              Nhưng với <strong>Named Export</strong>, tên nhận phải khớp chính xác 100% với tên hàm đã export.
            </p>
            <div className="solution-callout">
              <strong>💡 Cách đổi tên hợp lệ với Named Export:</strong>
              <code>{`import { RoleBadge as CustomBadge } from './TeamMembers';`}</code>
            </div>
            <button className="quick-fix-btn" onClick={() => setImportMode('correct')}>
              Quay lại chế độ chuẩn
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
