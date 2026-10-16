import { useState } from 'react';
import InfoBox from '../common/InfoBox';

let nextId = 4;
const initialArtists = [
  { id: 1, name: 'Nguyễn Du' },
  { id: 2, name: 'Hồ Xuân Hương' },
  { id: 3, name: 'Xuân Diệu' },
];

export default function ArrayOperationsLab() {
  const [artists, setArtists] = useState(initialArtists);
  const [nameInput, setNameInput] = useState('');
  const [lastAction, setLastAction] = useState('Khởi tạo danh sách');

  const handleAddToEnd = () => {
    if (!nameInput.trim()) return;
    const newItem = { id: nextId++, name: nameInput.trim() };
    setArtists([...artists, newItem]);
    setLastAction(`Thêm vào cuối: [...artists, "${newItem.name}"]`);
    setNameInput('');
  };

  const handleAddToStart = () => {
    if (!nameInput.trim()) return;
    const newItem = { id: nextId++, name: nameInput.trim() };
    setArtists([newItem, ...artists]);
    setLastAction(`Thêm vào đầu: ["${newItem.name}", ...artists]`);
    setNameInput('');
  };

  const handleDelete = (id) => {
    setArtists(artists.filter((a) => a.id !== id));
    setLastAction(`Xóa id=${id}: artists.filter(a => a.id !== ${id})`);
  };

  const handleReverse = () => {
    // Copy mảng trước rồi mới reverse!
    const nextList = [...artists];
    nextList.reverse();
    setArtists(nextList);
    setLastAction('Đảo ngược: const next = [...artists]; next.reverse();');
  };

  const handleSort = () => {
    // Copy mảng trước rồi mới sort theo tên A-Z
    const nextList = [...artists];
    nextList.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    setArtists(nextList);
    setLastAction('Sắp xếp A-Z: [...artists].sort(...)');
  };

  const handleReset = () => {
    nextId = 4;
    setArtists(initialArtists);
    setLastAction('Reset về danh sách ban đầu');
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">⚡ Sân Chơi Thao Tác Mảng Bất Biến</h2>
        <p className="lab-card-desc">
          Thực hành các thao tác Thêm đầu, Thêm cuối, Xóa theo ID, Đảo ngược và Sắp xếp mảng chuẩn mực trong React.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất Các Hàm Tạo Mảng Mới">
        Không dùng <code>push()</code> hay <code>splice()</code>. 
        Mọi thao tác bên dưới đều dùng toán tử Spread <code>[...arr]</code> hoặc <code>filter()</code> để tạo ra một mảng hoàn toàn mới trong RAM.
      </InfoBox>

      {/* Input bar */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        <input
          style={{
            flex: '1',
            minWidth: '220px',
            background: '#1a2234',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            color: '#f8fafc',
            fontFamily: 'inherit',
          }}
          placeholder="Nhập tên nhà thơ/nghệ sĩ..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddToEnd()}
        />
        <button className="btn btn-primary" onClick={handleAddToEnd}>
          ➕ Thêm Vào Cuối (Push)
        </button>
        <button className="btn btn-secondary" onClick={handleAddToStart}>
          ⬆️ Thêm Vào Đầu (Unshift)
        </button>
      </div>

      {/* Utility Toolbar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={handleReverse}>
          🔄 Đảo Ngược Danh Sách
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleSort}>
          🔤 Sắp Xếp Tên A-Z
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleReset} style={{ marginLeft: 'auto' }}>
          🔄 Reset Mặc Định
        </button>
      </div>

      {/* Code description banner */}
      <div style={{ background: '#090d16', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #1e293b' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Thao tác vừa thực hiện:</span>
        <code className="code-pill" style={{ color: '#f59e0b', margin: '0.25rem 0 0' }}>
          {lastAction}
        </code>
      </div>

      {/* Array List Display */}
      <div>
        <h4 style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
          📋 Danh Sách Nghệ Sĩ ({artists.length} người):
        </h4>

        {artists.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', background: '#0f172a', borderRadius: '10px' }}>
            Danh sách đang trống. Hãy nhập tên và bấm thêm!
          </div>
        ) : (
          artists.map((item, index) => (
            <div key={item.id} className="array-item-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                  #{index + 1}
                </span>
                <strong style={{ color: '#f8fafc', fontSize: '1.05rem' }}>{item.name}</strong>
                <span style={{ background: '#1e293b', color: '#38bdf8', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  id: {item.id}
                </span>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item.id)}
                title="Xóa phần tử bằng filter"
              >
                🗑️ Xóa
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
