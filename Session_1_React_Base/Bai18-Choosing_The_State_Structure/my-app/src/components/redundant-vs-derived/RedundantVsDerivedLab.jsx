import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const initialItems = [
  { id: 1, title: 'Hộ chiếu & Căn cước công dân', packed: true },
  { id: 2, title: 'Áo khoác ấm & Khăn choàng', packed: true },
  { id: 3, title: 'Thuốc say xe & Băng gạc y tế', packed: false },
  { id: 4, title: 'Sạc dự phòng & Tai nghe', packed: false },
];

export default function RedundantVsDerivedLab() {
  const [items, setItems] = useState(initialItems);
  const [newItemTitle, setNewItemTitle] = useState('');

  // ✅ DERIVED STATE: Không dùng useState! Tính toán tức thì khi render!
  const totalCount = items.length;
  const packedCount = items.filter((i) => i.packed).length;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const handleTogglePacked = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleAddItem = () => {
    if (!newItemTitle.trim()) return;
    setItems([
      ...items,
      { id: Date.now(), title: newItemTitle.trim(), packed: false },
    ]);
    setNewItemTitle('');
  };

  const handleDelete = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🎒 Hành Lý & Trạng Thái Phái Sinh (Derived State)</h2>
        <p className="lab-card-desc">
          Tái hiện Challenge 1 & 2 trong React Docs: Thao tác tích chọn và thêm hành lý để thấy sức mạnh của việc tính toán trực tiếp mà không cần <code>useState</code>.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất: Tại Sao Không Dùng useState Cho total & packed?">
        Nếu bạn dùng <code>const [total, setTotal] = useState(4)</code>, mỗi khi thêm hoặc xóa đồ, bạn phải nhớ gọi thêm <code>setTotal(...)</code>. 
        Chỉ cần quên 1 chỗ là số lượng hiển thị sẽ bị lệch pha với thực tế! Dùng <strong>Derived State</strong> đảm bảo tính chính xác 100%.
      </InfoBox>

      {/* Progress Dashboard */}
      <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem', margin: '1.25rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>
            Tiến độ chuẩn bị: <strong>{packedCount}/{totalCount} món</strong> ({progressPercent}%)
          </span>
          <span style={{ fontSize: '0.85rem', color: packedCount === totalCount ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
            {packedCount === totalCount ? '✅ Đã sẵn sàng lên đường!' : '⏳ Còn đồ chưa đóng gói'}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '10px', background: '#1e293b', borderRadius: '5px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #38bdf8, #10b981)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Add item bar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <input
          className="form-input"
          style={{ flex: 1 }}
          placeholder="Thêm món đồ cần mang..."
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
        />
        <button className="btn btn-primary" onClick={handleAddItem}>
          ➕ Thêm Đồ
        </button>
      </div>

      {/* Luggage Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item) => (
          <div
            key={item.id}
            className={`list-item-card ${item.packed ? 'selected' : ''}`}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flex: 1 }}>
              <input
                type="checkbox"
                checked={item.packed}
                onChange={() => handleTogglePacked(item.id)}
                style={{ width: '18px', height: '18px', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
              <span
                style={{
                  fontSize: '0.95rem',
                  color: item.packed ? '#64748b' : '#f8fafc',
                  textDecoration: item.packed ? 'line-through' : 'none',
                }}
              >
                {item.title}
              </span>
            </label>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(item.id)}
              title="Xóa món đồ"
            >
              🗑️ Xóa
            </button>
          </div>
        ))}
      </div>

      {/* Code explanation */}
      <div style={{ marginTop: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn tính toán Derived State cực kỳ tinh tế:</span>
        <pre className="code-pill">
{`// Chỉ lưu 1 State duy nhất:\nconst [items, setItems] = useState(initialItems);\n\n// 2 giá trị này tự động tính toán tức thì lúc render (Derived State):\nconst totalCount = items.length;\nconst packedCount = items.filter(item => item.packed).length;\n// Không cần useEffect, không sợ lệch pha dữ liệu!`}
        </pre>
      </div>
    </div>
  );
}
