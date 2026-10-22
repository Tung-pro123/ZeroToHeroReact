import { useState } from 'react';
import { useImmer } from 'use-immer';
import InfoBox from '../common/InfoBox';

const initialArtworks = [
  { id: 1, title: 'Bức tranh "Mùa Thu Vàng"', seen: false },
  { id: 2, title: 'Tượng "Người Suy Tưởng"', seen: true },
  { id: 3, title: 'Tranh "Đêm Đầy Sao" (Van Gogh)', seen: false },
];

export default function NestedArrayImmerLab() {
  const [artworks, updateArtworks] = useImmer(initialArtworks);
  const [approach, setApproach] = useState('immer'); // 'map_spread' | 'immer'
  const [newTitle, setNewTitle] = useState('');

  // Toggle seen state
  const handleToggle = (id) => {
    if (approach === 'immer') {
      // ✅ Dùng Immer: Tìm và sửa trực tiếp trên draft
      updateArtworks((draft) => {
        const item = draft.find((a) => a.id === id);
        if (item) item.seen = !item.seen;
      });
    } else {
      // 🌿 Dùng map và Spread: Phải tạo mảng mới và object mới
      updateArtworks((prev) =>
        prev.map((a) => (a.id === id ? { ...a, seen: !a.seen } : a))
      );
    }
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newItem = { id: Date.now(), title: newTitle.trim(), seen: false };

    if (approach === 'immer') {
      updateArtworks((draft) => {
        draft.push(newItem);
      });
    } else {
      updateArtworks((prev) => [...prev, newItem]);
    }
    setNewTitle('');
  };

  const handleDelete = (id) => {
    if (approach === 'immer') {
      updateArtworks((draft) => {
        const index = draft.findIndex((a) => a.id === id);
        if (index !== -1) draft.splice(index, 1);
      });
    } else {
      updateArtworks((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">📋 Object Lồng Trong Mảng & Thư Viện Immer</h2>
        <p className="lab-card-desc">
          Xử lý mảng chứa các đối tượng: Đánh dấu đã xem (toggle seen) với cú pháp <code>map + Spread</code> so sánh với <code>useImmer</code>.
        </p>
      </div>

      <InfoBox type="tip" title="Bẫy Đột Biến Object Bên Trong Mảng">
        Lệnh <code>const next = [...list]; next[0].seen = true;</code> là <strong>HOÀN TOÀN SAI</strong> vì các object bên trong vẫn là tham chiếu cũ.
        Bạn phải dùng <code>list.map</code> để nhân bản chính object đó, hoặc dùng <code>useImmer</code> để giải quyết nhẹ nhàng!
      </InfoBox>

      {/* Approach selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Phương pháp thao tác:</span>
        <button
          className={`btn ${approach === 'immer' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setApproach('immer')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ✨ useImmer: draft.find().seen = ...
        </button>
        <button
          className={`btn ${approach === 'map_spread' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setApproach('map_spread')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          🌿 map + Spread: list.map(a =&gt; ({'{ ...a, seen }'}))
        </button>
      </div>

      {/* Add input */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <input
          style={{
            flex: 1,
            background: '#1a2234',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '0.65rem 1rem',
            color: '#f8fafc',
            fontFamily: 'inherit',
          }}
          placeholder="Thêm tác phẩm nghệ thuật mới..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          ➕ Thêm
        </button>
      </div>

      {/* Checklist display */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {artworks.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#0f172a',
              border: '1px solid #1e293b',
              padding: '0.85rem 1.25rem',
              borderRadius: '10px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flex: 1 }}>
              <input
                type="checkbox"
                checked={item.seen}
                onChange={() => handleToggle(item.id)}
                style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
              />
              <span
                style={{
                  fontSize: '1rem',
                  color: item.seen ? '#64748b' : '#f8fafc',
                  textDecoration: item.seen ? 'line-through' : 'none',
                }}
              >
                {item.title}
              </span>
              {item.seen && (
                <span style={{ fontSize: '0.75rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  ✓ Đã chiêm ngưỡng
                </span>
              )}
            </label>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(item.id)}
            >
              🗑️ Xóa
            </button>
          </div>
        ))}
      </div>

      {/* Code comparison */}
      <div style={{ marginTop: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn xử lý toggle tương ứng:</span>
        <pre className="code-pill">
{approach === 'immer'
  ? `// ✅ Dùng useImmer: Sửa trực tiếp trên draft\nupdateArtworks(draft => {\n  const artwork = draft.find(a => a.id === id);\n  if (artwork) artwork.seen = !artwork.seen;\n});`
  : `// 🌿 Dùng map + Spread: Bất biến tầng tầng lớp lớp\nsetArtworks(artworks.map(artwork => {\n  if (artwork.id === id) {\n    return { ...artwork, seen: !artwork.seen }; // Object mới!\n  }\n  return artwork;\n}));`}
        </pre>
      </div>
    </div>
  );
}
