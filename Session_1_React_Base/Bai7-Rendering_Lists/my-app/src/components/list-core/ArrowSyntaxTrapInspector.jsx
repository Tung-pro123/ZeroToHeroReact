// ==========================================================================
// CẠM BẪY CÚ PHÁP: ARROW FUNCTION RETURN TRAP TRONG MAP()
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';

const SAMPLE_ITEMS = [
  { id: 'dev-1', title: 'Thiết kế RESTful API với Spring Boot 3' },
  { id: 'dev-2', title: 'Tối ưu hóa câu truy vấn JPA & Hibernate N+1' },
  { id: 'dev-3', title: 'Xây dựng giao diện danh sách tương tác với React 18' },
];

export default function ArrowSyntaxTrapInspector() {
  // Trạng thái kiểm thử cú pháp
  const [syntaxMode, setSyntaxMode] = useState('implicit'); // 'buggy' | 'implicit' | 'explicit'

  // Hàm render tương ứng với từng kiểu cú pháp
  const renderList = () => {
    if (syntaxMode === 'buggy') {
      // ❌ CÁCH VIẾT SAI KINH ĐIỂN:
      // Mở ngoặc nhọn {} nhưng QUÊN gõ từ khóa `return`!
      // JavaScript coi đây là block code, hàm trả về `undefined`.
      return SAMPLE_ITEMS.map((item) => {
        // eslint-disable-next-line no-unused-expressions
        <div key={item.id} className="todo-item-row">
          <span>❌ {item.title}</span>
        </div>;
        // KHÔNG CÓ RETURN! -> Hàm nhả ra undefined!
      });
    }

    if (syntaxMode === 'implicit') {
      // ✅ CÁCH 1: DÙNG NGOẶC TRÒN () - IMPLICIT RETURN (KHUYÊN DÙNG)
      // Không cần viết chữ `return`, JS tự động nhả kết quả JSX
      return SAMPLE_ITEMS.map((item) => (
        <div key={item.id} className="todo-item-row" style={{ borderLeft: '3px solid var(--color-success)' }}>
          <span style={{ color: 'var(--color-text-main)' }}>✅ {item.title}</span>
        </div>
      ));
    }

    // ✅ CÁCH 2: MỞ NGOẶC NHỌN {} VÀ CÓ LỆNH RETURN TƯỜNG MINH
    return SAMPLE_ITEMS.map((item) => {
      // Có thể xử lý logic tính toán trước tại đây...
      return (
        <div key={item.id} className="todo-item-row" style={{ borderLeft: '3px solid var(--color-cyan)' }}>
          <span style={{ color: 'var(--color-text-main)' }}>🔹 {item.title}</span>
        </div>
      );
    });
  };

  const renderedContent = renderList();

  return (
    <Card
      title="Cạm Bẫy Cú Pháp: Khối Lệnh Arrow Function (=> { vs => ()"
      subtitle="Lỗi phổ biến nhất của người mới học React: Quên từ khóa return khi mở ngoặc nhọn {} khiến màn hình mất trắng"
      icon="⚠️"
      action={
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className={`toggle-btn ${syntaxMode === 'buggy' ? 'active' : ''}`}
            onClick={() => setSyntaxMode('buggy')}
            style={{ borderColor: syntaxMode === 'buggy' ? 'var(--color-danger)' : undefined }}
          >
            ❌ Quên return (Xem Bug Mất Trắng)
          </button>
          <button
            className={`toggle-btn ${syntaxMode === 'implicit' ? 'active' : ''}`}
            onClick={() => setSyntaxMode('implicit')}
          >
            ✅ Ngoặc tròn () (Implicit Return)
          </button>
          <button
            className={`toggle-btn ${syntaxMode === 'explicit' ? 'active' : ''}`}
            onClick={() => setSyntaxMode('explicit')}
          >
            ✅ Ngoặc nhọn {} có return
          </button>
        </div>
      }
    >
      <div className="control-bar">
        <span>
          Chế độ hiện tại:{' '}
          <strong style={{ color: syntaxMode === 'buggy' ? 'var(--color-danger)' : 'var(--color-success)' }}>
            {syntaxMode === 'buggy'
              ? '❌ CÚ PHÁP LỖI: () => { <JSX /> } (Thiếu return)'
              : syntaxMode === 'implicit'
              ? '✅ CÚ PHÁP CHUẨN: () => ( <JSX /> ) (Implicit)'
              : '✅ CÚ PHÁP CHUẨN: () => { return <JSX />; }'}
          </strong>
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Arrow Function Body Rules
        </span>
      </div>

      {/* Kết quả render thực tế */}
      <div
        style={{
          minHeight: '130px',
          padding: '1.25rem',
          backgroundColor: 'var(--color-bg-base)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.75rem',
        }}
      >
        {syntaxMode === 'buggy' ? (
          <div style={{ textAlign: 'center', color: 'var(--color-danger)' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: '800' }}>
              🚨 MÀN HÌNH MẤT TRẮNG HOÀN TOÀN!
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              Vì hàm <code>map()</code> trả về <code>[undefined, undefined, undefined]</code>. React không render gì cả!
            </p>
          </div>
        ) : (
          renderedContent
        )}
      </div>

      {/* Khung phân tích code */}
      <div className="code-preview">
        <div className="code-comment">
          // 💡 QUY TẮC BẤT DI BẤT DỊCH CỦA ARROW FUNCTION TRONG JAVASCRIPT:
          <br />
          // 1. Dùng ngoặc tròn () ➡️ Tự động return giá trị bên trong (Implicit Return):
          <br />
          //    items.map(item =&gt; ( &lt;li key={'{item.id}'}&gt;{'{item.title}'}&lt;/li&gt; ))
          <br />
          // 2. Dùng ngoặc nhọn {} ➡️ Phải có chữ `return` tường minh:
          <br />
          //    items.map(item =&gt; {'{'} return &lt;li key={'{item.id}'}&gt;{'{item.title}'}&lt;/li&gt;; {'}'})
        </div>
        <code>
          {syntaxMode === 'buggy'
            ? `// ❌ LỖI MẤT TRẮNG:\nitems.map(item => {\n  <li key={item.id}>{item.title}</li>\n  // QUÊN RETURN Ở ĐÂY!\n})`
            : syntaxMode === 'implicit'
            ? `// ✅ KHUYÊN DÙNG (GỌN GÀNG NHẤT):\nitems.map(item => (\n  <li key={item.id}>{item.title}</li>\n))`
            : `// ✅ HỢP LỆ KHI CẦN LOGIC PHỨC TẠP:\nitems.map(item => {\n  const formatted = item.title.toUpperCase();\n  return <li key={item.id}>{formatted}</li>;\n})`}
        </code>
      </div>
    </Card>
  );
}
