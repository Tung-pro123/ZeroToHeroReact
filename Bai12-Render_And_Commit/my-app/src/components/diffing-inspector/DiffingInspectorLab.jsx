import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function DiffingInspectorLab() {
  const [textVersion, setTextVersion] = useState(1);
  const [userName, setUserName] = useState('Tùng');

  const treeNodes = [
    {
      id: 'header',
      type: '<Header />',
      before: '<header>My App</header>',
      after: '<header>My App</header>',
      hasChanged: false,
      domAction: 'Skipped (Giữ nguyên DOM)'
    },
    {
      id: 'title',
      type: '<h1> (Tiêu Đề)',
      before: `<h1>Xin chào, ${userName} (v${textVersion - 1})</h1>`,
      after: `<h1>Xin chào, ${userName} (v${textVersion})</h1>`,
      hasChanged: true,
      domAction: 'PATCHED (Sửa textContent)'
    },
    {
      id: 'input',
      type: '<input /> (Ô Nhập Liệu)',
      before: '<input placeholder="Nhập tên..." />',
      after: '<input placeholder="Nhập tên..." />',
      hasChanged: false,
      domAction: 'Skipped (Bảo toàn Focus)'
    },
    {
      id: 'footer',
      type: '<Footer />',
      before: '<footer>© 2026 ZeroToHeroReact</footer>',
      after: '<footer>© 2026 ZeroToHeroReact</footer>',
      hasChanged: false,
      domAction: 'Skipped (Giữ nguyên DOM)'
    }
  ];

  const handleUpdate = () => {
    setTextVersion((v) => v + 1);
  };

  const changedCount = treeNodes.filter((n) => n.hasChanged).length;
  const skippedCount = treeNodes.length - changedCount;

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🔍 Bộ Soi Thuật Toán Diffing (Virtual DOM Reconciliation)</h2>
          <p className="card-desc">
            Quan sát trực quan cách React so sánh cây Virtual DOM trước và sau khi re-render để 
            chỉ sửa đúng 1 node duy nhất trên Real DOM của trình duyệt.
          </p>
        </div>
        <button className="btn-primary" onClick={handleUpdate}>
          🔄 Thay Đổi Tiêu Đề (Kích Hoạt Diffing)
        </button>
      </div>

      {/* Thống kê tiết kiệm */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '180px', padding: '1rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Tổng Node trên Cây</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f3f4f6' }}>{treeNodes.length}</div>
        </div>
        <div style={{ flex: 1, minWidth: '180px', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ fontSize: '0.8rem', color: '#6ee7b7', textTransform: 'uppercase' }}>Số Node Cập Nhật DOM Thật</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>{changedCount} node</div>
        </div>
        <div style={{ flex: 1, minWidth: '180px', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ fontSize: '0.8rem', color: '#93c5fd', textTransform: 'uppercase' }}>Số Node Giữ Nguyên (Tiết Kiệm)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>{skippedCount} nodes (75%)</div>
        </div>
      </div>

      {/* Bảng so sánh Before vs After */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
              <th style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>Phần Tử (Component)</th>
              <th style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>Cây Virtual DOM Cũ</th>
              <th style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>Cây Virtual DOM Mới</th>
              <th style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>Hành Động Bước Commit</th>
            </tr>
          </thead>
          <tbody>
            {treeNodes.map((node) => (
              <tr
                key={node.id}
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  background: node.hasChanged ? 'rgba(16, 185, 129, 0.08)' : 'transparent'
                }}
              >
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#f3f4f6' }}>
                  {node.type}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', color: '#9ca3af', fontSize: '0.82rem' }}>
                  {node.before}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', color: node.hasChanged ? '#34d399' : '#9ca3af', fontSize: '0.82rem' }}>
                  {node.after}
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span
                    className="badge"
                    style={{
                      background: node.hasChanged ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: node.hasChanged ? '#10b981' : '#9ca3af',
                      border: `1px solid ${node.hasChanged ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                      fontSize: '0.75rem'
                    }}
                  >
                    {node.domAction}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <InfoBox title="Sức mạnh của thuật toán Diffing">
          Thay vì đập bỏ toàn bộ trang web và vẽ lại từ đầu (vốn rất chậm và gián đoạn người dùng), 
          React so sánh 2 cây bản vẽ trong RAM. Nó chỉ gõ cửa Real DOM khi và chỉ khi có thuộc tính hoặc thẻ thực sự thay đổi!
        </InfoBox>
      </div>
    </div>
  );
}
