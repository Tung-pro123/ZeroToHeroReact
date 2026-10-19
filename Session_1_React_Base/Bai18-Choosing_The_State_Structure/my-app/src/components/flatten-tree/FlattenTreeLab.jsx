import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Cấu trúc phẳng (Normalized State / Hash Map)
const initialPlaces = {
  0: { id: 0, title: '🌍 Trái Đất (Earth)', childIds: [1, 2] },
  1: { id: 1, title: '🏯 Châu Á (Asia)', childIds: [3, 4] },
  2: { id: 2, title: '🏰 Châu Âu (Europe)', childIds: [5] },
  3: { id: 3, title: '🇻🇳 Việt Nam', childIds: [] },
  4: { id: 4, title: '🇯🇵 Nhật Bản', childIds: [] },
  5: { id: 5, title: '🇫🇷 Pháp', childIds: [] },
};

export default function FlattenTreeLab() {
  const [places, setPlaces] = useState(initialPlaces);
  const [selectedId, setSelectedId] = useState(3); // Mặc định chọn Việt Nam
  const [editingTitle, setEditingTitle] = useState('🇻🇳 Việt Nam');

  const handleSelect = (id) => {
    setSelectedId(id);
    setEditingTitle(places[id].title);
  };

  const handleSaveTitle = () => {
    // Cập nhật phẳng O(1) cực kỳ dễ dàng:
    setPlaces({
      ...places,
      [selectedId]: {
        ...places[selectedId],
        title: editingTitle,
      },
    });
  };

  const handleReset = () => {
    setPlaces(initialPlaces);
    setSelectedId(3);
    setEditingTitle('🇻🇳 Việt Nam');
  };

  // Hàm đệ quy render cây từ bảng phẳng
  const renderPlaceTree = (id, level = 0) => {
    const place = places[id];
    if (!place) return null;
    const isSelected = selectedId === id;

    return (
      <div key={id} style={{ marginLeft: `${level * 24}px`, marginTop: '0.4rem' }}>
        <div
          onClick={() => handleSelect(id)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            background: isSelected ? 'rgba(168, 85, 247, 0.25)' : '#1e293b',
            border: isSelected ? '1px solid #a855f7' : '1px solid #334155',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          <span>{place.title}</span>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>[id: {id}]</span>
        </div>

        {place.childIds.map((childId) => renderPlaceTree(childId, level + 1))}
      </div>
    );
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🌲 Làm Phẳng Cây (Normalized Hash Map)</h2>
        <p className="lab-card-desc">
          Giải phẫu kỹ thuật chuyển đổi Cây gia phả lồng sâu (Nested Tree) thành Bảng phẳng chuẩn hóa (Normalized State) để cập nhật $O(1)$ nhẹ như lông hồng.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất: Giống Hệt Database Quan Hệ SQL">
        Mỗi địa điểm là một bản ghi độc lập có khóa chính <code>id</code> và danh sách khóa ngoại <code>childIds</code>.
        Khi bạn sửa tên một quốc gia ở tầng 3, bạn không cần đụng chạm gì đến Trái Đất hay Châu Á!
      </InfoBox>

      {/* Editor Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        <input
          className="form-input"
          style={{ flex: 1, minWidth: '220px' }}
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          placeholder="Nhập tên mới cho địa điểm..."
        />
        <button className="btn btn-primary" onClick={handleSaveTitle}>
          💾 Cập Nhật Tên Node [id: {selectedId}]
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          🔄 Khôi Phục Gốc
        </button>
      </div>

      {/* Tree Visualization & Hash Map Side by Side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', margin: '1rem 0' }}>
        {/* Left: Rendered Tree */}
        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
          <h4 style={{ color: '#38bdf8', marginBottom: '0.75rem' }}>
            🌳 Cây Hiển Thị Giao Diện (Bấm để chọn):
          </h4>
          {renderPlaceTree(0)}
        </div>

        {/* Right: Normalized JSON Map in State */}
        <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
          <h4 style={{ color: '#10b981', marginBottom: '0.75rem' }}>
            🗄️ Cấu Trúc Bảng Phẳng Trong RAM (State):
          </h4>
          <pre style={{ fontSize: '0.75rem', color: '#cbd5e1', overflowX: 'auto', maxHeight: '220px' }}>
            {JSON.stringify(places, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
