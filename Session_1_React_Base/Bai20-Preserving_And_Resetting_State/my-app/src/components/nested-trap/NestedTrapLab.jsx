import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// ✅ CÁCH CHUẨN: Khai báo hàm component ở ngoài cùng (Top-Level Scope)
function TopLevelInput({ value, onChange, label }) {
  return (
    <div style={{ background: '#0d1527', border: '1px solid #10b981', borderRadius: '10px', padding: '1.25rem' }}>
      <label style={{ display: 'block', fontWeight: 600, color: '#34d399', marginBottom: '0.4rem' }}>
        {label}
      </label>
      <input
        type="text"
        className="input-control"
        placeholder="Gõ thoải mái một câu dài..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#a7f3d0' }}>
        ✨ Con trỏ chuột giữ nguyên vị trí, không hề bị giật hay văng ra ngoài!
      </div>
    </div>
  );
}

export default function NestedTrapLab() {
  const [parentCount, setParentCount] = useState(0);
  const [topText, setTopText] = useState('React sạch đẹp');
  const [nestedText, setNestedText] = useState('');

  // ❌ CẠM BẪY TỬ HUYỆT: Khai báo component hàm bên trong hàm khác
  // Mỗi lần NestedTrapLab chạy, một con trỏ hàm NestedBadInput hoàn toàn mới được sinh ra trong RAM!
  function NestedBadInput() {
    return (
      <div style={{ background: '#0d1527', border: '1px solid #f43f5e', borderRadius: '10px', padding: '1.25rem' }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#fb7185', marginBottom: '0.4rem' }}>
          ❌ Ô Input Bị Lồng Hàm (Nested Declaration):
        </label>
        <input
          type="text"
          className="input-control"
          placeholder="Hãy thử gõ chữ vào đây và cảm nhận..."
          value={nestedText}
          onChange={(e) => {
            setNestedText(e.target.value);
            setParentCount((prev) => prev + 1); // Kích hoạt render lại cha
          }}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#fecdd3' }}>
          ⚠️ MỖI LẦN GÕ 1 KÝ TỰ, CON TRỎ CHUỘT SẼ BỊ VĂNG MẤT FOCUS NGAY LẬP TỨC!
        </div>
      </div>
    );
  }

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">⚠️ 2. Cạm Bẫy Tử Huyệt: Khai Báo Component Lồng Nhau (Nested Component)</h2>
        <p className="lab-card-desc">
          Trải nghiệm thực tế lỗi kinh điển khiến lập trình viên mất ăn mất ngủ: Gõ được 1 ký tự là con trỏ chuột 
          bị văng ra ngoài (mất Focus) do React liên tục nhổ bỏ DOM cũ và cắm DOM mới.
        </p>
      </div>

      <InfoBox type="danger" title="Bản Chất Kỹ Thuật:">
        Khi bạn viết <code>function MyChild() &#123; ... &#125;</code> bên trong thân hàm Cha, mỗi khi Cha re-render, 
        một hàm hoàn toàn mới được cấp phát trong RAM. React so sánh: <code>OldChild !== NewChild</code> và kết luận đây là 
        hai loại Component khác nhau. React phá hủy toàn bộ cây con bên dưới và dựng lại từ đầu!
      </InfoBox>

      {/* Grid Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Cột 1: Bad */}
        <div>
          <NestedBadInput />
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#3b0a1a', borderRadius: '8px', border: '1px solid #9f1239', fontSize: '0.85rem', color: '#fecdd3' }}>
            🔥 Số lần component bị hủy diệt & cắm mới: <strong>{parentCount}</strong> lần.
          </div>
        </div>

        {/* Cột 2: Good */}
        <div>
          <TopLevelInput
            label="✅ Ô Input Khai Báo Ở Ngoài Cùng (Top-Level):"
            value={topText}
            onChange={setTopText}
          />
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#064e3b', borderRadius: '8px', border: '1px solid #047857', fontSize: '0.85rem', color: '#a7f3d0' }}>
            🎉 Component được giữ nguyên địa chỉ trong RAM, Render mượt mà 60 FPS.
          </div>
        </div>
      </div>

      {/* Code snippet comparison */}
      <div style={{ background: '#080d1a', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
        <div style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 600, marginBottom: '0.5rem' }}>
          📝 QUY TẮC BẤT BIẾN KHI VIẾT COMPONENT:
        </div>
        <pre style={{ color: '#cbd5e1', fontSize: '0.85rem', overflowX: 'auto', lineHeight: 1.6 }}>
{`// ❌ SAI: Không bao giờ lồng hàm component bên trong hàm khác
function Parent() {
  function Child() { ... } // Nguy hiểm!
  return <Child />;
}

// ✅ ĐÚNG: Luôn khai báo component độc lập ở Top-Level
function Child() { ... }

function Parent() {
  return <Child />;
}`}
        </pre>
      </div>
    </div>
  );
}
