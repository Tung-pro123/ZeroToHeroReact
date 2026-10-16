import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function StatePrinciplesLab() {
  const [activePrinciple, setActivePrinciple] = useState(1);

  const principles = [
    {
      id: 1,
      title: '1. Gộp State Liên Quan Mật Thiết (Group Related State)',
      badCode: `const [x, setX] = useState(0);\nconst [y, setY] = useState(0);`,
      goodCode: `const [position, setPosition] = useState({ x: 0, y: 0 });`,
      desc: 'Nếu 2 hoặc nhiều biến State luôn luôn thay đổi cùng nhau (như tọa độ con trỏ chuột, kích thước width/height), hãy gộp vào 1 Object để cập nhật đồng bộ.',
    },
    {
      id: 2,
      title: '2. Tránh Nghịch Lý Trạng Thái (Avoid Contradictions)',
      badCode: `const [isSending, setIsSending] = useState(false);\nconst [isSent, setIsSent] = useState(false); // Dễ bị true cùng lúc!`,
      goodCode: `const [status, setStatus] = useState('typing'); // 'typing' | 'sending' | 'sent'`,
      desc: 'Cấm tạo cấu trúc cho phép tồn tại "Trạng thái không tưởng". Dùng máy trạng thái hữu hạn (FSM) với 1 biến duy nhất.',
    },
    {
      id: 3,
      title: '3. Xóa Bỏ State Thừa - Dùng Derived State (Avoid Redundant State)',
      badCode: `const [firstName, setFirstName] = useState('');\nconst [lastName, setLastName] = useState('');\nconst [fullName, setFullName] = useState(''); // ❌ Thừa và dễ lệch pha!`,
      goodCode: `const [firstName, setFirstName] = useState('');\nconst [lastName, setLastName] = useState('');\nconst fullName = \`\${firstName} \${lastName}\`.trim(); // ✅ Tính lúc render!`,
      desc: 'Nếu một giá trị có thể tính toán tức thì từ Props hoặc State khác, không bao giờ dùng useState cho nó!',
    },
    {
      id: 4,
      title: '4. Tránh Trùng Lặp Dữ Liệu - Lưu ID (Avoid Duplication)',
      badCode: `const [items, setItems] = useState([...]);\nconst [selectedItem, setSelectedItem] = useState(items[0]); // ❌ Nhân bản object`,
      goodCode: `const [items, setItems] = useState([...]);\nconst [selectedId, setSelectedId] = useState(1); // ✅ Chỉ lưu Khóa Chính\nconst selectedItem = items.find(i => i.id === selectedId);`,
      desc: 'Lưu cả Object bản sao sẽ gây lỗi mất đồng bộ khi món đồ trong danh sách bị đổi tên. Chỉ lưu ID!',
    },
    {
      id: 5,
      title: '5. Làm Phẳng Dữ Liệu - Tránh Lồng Sâu (Avoid Deeply Nested State)',
      badCode: `// Cây gia phả lồng sâu: Tree { childPlaces: [ { childPlaces: [...] } ] }\n// Phải copy đệ quy tầng tầng lớp lớp!`,
      goodCode: `// Làm phẳng thành Bảng (Normalized Hash Map):\nconst placesById = { 1: { id: 1, title: 'Earth', childIds: [2] }, ... };`,
      desc: 'Biến cấu trúc Cây thành Bảng quan hệ phẳng (Normalized State). Thao tác cập nhật node đạt tốc độ O(1) tức thì.',
    },
  ];

  const current = principles.find((p) => p.id === activePrinciple);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🌟 5 Nguyên Tắc Vàng Thiết Kế State</h2>
        <p className="lab-card-desc">
          Bí kíp thiết kế kiến trúc State chuẩn mực giúp loại bỏ 95% các lỗi logic và mất đồng bộ trong ứng dụng React.
        </p>
      </div>

      <InfoBox type="tip" title="Tư Duy Của Senior React Engineer">
        Đừng vội mở bàn phím gõ <code>useState</code>. Hãy dừng lại 2 phút để tự hỏi: 
        <em>"Giá trị này có tính toán được không?", "Hai state này có mâu thuẫn không?", "Có nên lưu ID thay vì Object không?"</em>.
      </InfoBox>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        {principles.map((p) => (
          <button
            key={p.id}
            className={`btn ${activePrinciple === p.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
            onClick={() => setActivePrinciple(p.id)}
          >
            Nguyên tắc {p.id}
          </button>
        ))}
      </div>

      {/* Principle Detail Card */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem' }}>
        <h3 style={{ color: '#a855f7', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          {current.title}
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
          {current.desc}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#1c151e', border: '1px solid #ef4444', borderRadius: '8px', padding: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 700 }}>
              ❌ CÁCH THIẾT KẾ KÉM (BAD):
            </span>
            <pre className="code-pill" style={{ color: '#fca5a5', marginTop: '0.4rem', whiteSpace: 'pre-wrap' }}>{current.badCode}</pre>
          </div>

          <div style={{ background: '#0e241e', border: '1px solid #10b981', borderRadius: '8px', padding: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
              ✅ CÁCH THIẾT KẾ CHUẨN (RECOMMENDED):
            </span>
            <pre className="code-pill" style={{ color: '#86efac', marginTop: '0.4rem', whiteSpace: 'pre-wrap' }}>{current.goodCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
