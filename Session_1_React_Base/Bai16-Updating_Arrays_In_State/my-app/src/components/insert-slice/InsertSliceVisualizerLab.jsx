import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function InsertSliceVisualizerLab() {
  const [items, setItems] = useState(['Tùng', 'Hoa', 'Lan']);
  const [insertAt, setInsertAt] = useState(1);
  const [newItem, setNewItem] = useState('Hải');
  const [assembledList, setAssembledList] = useState(null);

  // 3 Mảnh ghép
  const piece1 = items.slice(0, insertAt);
  const piece2 = newItem;
  const piece3 = items.slice(insertAt);

  const handleAssemble = () => {
    const result = [
      ...items.slice(0, insertAt),
      newItem,
      ...items.slice(insertAt),
    ];
    setItems(result);
    setAssembledList(result);
  };

  const handleReset = () => {
    setItems(['Tùng', 'Hoa', 'Lan']);
    setInsertAt(1);
    setNewItem('Hải');
    setAssembledList(null);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🧩 Ghép 3 Mảnh với slice & Toán Tử Spread</h2>
        <p className="lab-card-desc">
          Giải phẫu trực quan kỹ thuật chèn phần tử vào vị trí bất kỳ trong mảng mà không dùng hàm phá hủy <code>splice()</code>.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất Phép Ghép 3 Mảnh">
        Mảng ban đầu được xẻ thành 2 nửa bằng <code>slice</code> (hoàn toàn an toàn, không sửa mảng gốc). 
        Sau đó ta nhét phần tử mới vào giữa và dùng <code>...</code> hợp thể thành mảng mới toanh!
      </InfoBox>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', margin: '1.25rem 0' }}>
        <div>
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>
            Vị trí muốn chèn (Index insertAt):
          </label>
          <select
            style={{
              background: '#1a2234',
              color: '#f8fafc',
              border: '1px solid #334155',
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              fontFamily: 'inherit',
            }}
            value={insertAt}
            onChange={(e) => setInsertAt(Number(e.target.value))}
          >
            {items.map((_, i) => (
              <option key={i} value={i}>
                Index {i} (Trước "{items[i]}")
              </option>
            ))}
            <option value={items.length}>Index {items.length} (Ở cuối cùng)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>
            Phần tử mới (newItem):
          </label>
          <input
            style={{
              background: '#1a2234',
              color: '#f8fafc',
              border: '1px solid #334155',
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              fontFamily: 'inherit',
            }}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ alignSelf: 'flex-end' }}
          onClick={handleAssemble}
        >
          🧩 Thực Hiện Ghép 3 Mảnh Vào Mảng Mới
        </button>
        <button
          className="btn btn-secondary"
          style={{ alignSelf: 'flex-end' }}
          onClick={handleReset}
        >
          🔄 Khôi Phục Gốc
        </button>
      </div>

      {/* 3 Puzzle Pieces Display */}
      <div style={{ margin: '1.5rem 0' }}>
        <h4 style={{ color: '#38bdf8', marginBottom: '0.75rem' }}>
          🔍 Giải Phẫu 3 Mảnh Ghép Trong Bộ Nhớ:
        </h4>

        <div className="slice-puzzle-grid">
          {/* Piece 1 */}
          <div className="slice-piece-card" style={{ borderColor: '#3b82f6' }}>
            <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase' }}>
              Mảnh 1: Khúc Đầu Cắt Bằng slice(0, {insertAt})
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', margin: '0.75rem 0' }}>
              {piece1.length > 0 ? JSON.stringify(piece1) : '[] (Rỗng)'}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Dùng <code>...artists.slice(0, {insertAt})</code> rải ra
            </span>
          </div>

          {/* Piece 2 */}
          <div className="slice-piece-card active-piece" style={{ borderColor: '#f59e0b' }}>
            <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
              Mảnh 2: Phần Tử Mới (newItem)
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b', margin: '0.75rem 0' }}>
              "{newItem}"
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Đặt ngay ngắn vào giữa vị trí {insertAt}
            </span>
          </div>

          {/* Piece 3 */}
          <div className="slice-piece-card" style={{ borderColor: '#a855f7' }}>
            <span style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: 700, textTransform: 'uppercase' }}>
              Mảnh 3: Khúc Đuôi Cắt Bằng slice({insertAt})
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', margin: '0.75rem 0' }}>
              {piece3.length > 0 ? JSON.stringify(piece3) : '[] (Rỗng)'}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Dùng <code>...artists.slice({insertAt})</code> nối vào sau
            </span>
          </div>
        </div>
      </div>

      {/* Assembled Array Output */}
      <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Kết quả mảng sau khi hợp thể (Current State):</span>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)', margin: '0.5rem 0' }}>
          {JSON.stringify(items)}
        </div>
        <code className="code-pill" style={{ display: 'inline-block', color: '#38bdf8' }}>
          setArtists([ ...artists.slice(0, {insertAt}), "{newItem}", ...artists.slice({insertAt}) ]);
        </code>
      </div>
    </div>
  );
}
