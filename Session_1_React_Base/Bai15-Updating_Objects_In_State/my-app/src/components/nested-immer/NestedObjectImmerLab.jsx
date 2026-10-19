import { useState } from 'react';
import { useImmer } from 'use-immer';
import InfoBox from '../common/InfoBox';

export default function NestedObjectImmerLab() {
  // Dùng useImmer
  const [person, updatePerson] = useImmer({
    name: 'Lê Tùng',
    artwork: {
      title: 'Bình Minh Trên Đỉnh Fansipan',
      city: 'Sa Pa',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80',
    },
  });

  const [approach, setApproach] = useState('immer'); // 'spread' | 'immer'

  const handleNameChange = (e) => {
    if (approach === 'immer') {
      updatePerson((draft) => {
        draft.name = e.target.value;
      });
    } else {
      updatePerson({
        ...person,
        name: e.target.value,
      });
    }
  };

  const handleTitleChange = (e) => {
    if (approach === 'immer') {
      updatePerson((draft) => {
        draft.artwork.title = e.target.value;
      });
    } else {
      updatePerson({
        ...person,
        artwork: {
          ...person.artwork,
          title: e.target.value,
        },
      });
    }
  };

  const handleCityChange = (e) => {
    if (approach === 'immer') {
      updatePerson((draft) => {
        draft.artwork.city = e.target.value;
      });
    } else {
      updatePerson({
        ...person,
        artwork: {
          ...person.artwork,
          city: e.target.value,
        },
      });
    }
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🌳 Nested Object & Thư Viện Immer</h2>
        <p className="lab-card-desc">
          Giải quyết vấn đề cập nhật Object lồng nhau nhiều tầng: So sánh giữa rải dấu Spread thủ công và dùng Immer Proxy draft.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất Thư Viện Immer">
        Immer cung cấp biến <code>draft</code> (bọc bởi JS Proxy). Bạn được phép viết code đột biến tự nhiên như JS truyền thống:
        <code>draft.artwork.city = 'Hà Nội'</code>. Immer sẽ ngầm sản sinh ra bản sao bất biến mới hoàn toàn theo cơ chế Structural Sharing!
      </InfoBox>

      {/* Approach selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Phương pháp áp dụng:</span>
        <button
          className={`btn ${approach === 'immer' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setApproach('immer')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ✨ useImmer: draft.artwork.city = ...
        </button>
        <button
          className={`btn ${approach === 'spread' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setApproach('spread')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          🌿 Nested Spread: {'{ ...person, artwork: { ...artwork, city } }'}
        </button>
      </div>

      {/* Editor & Preview Side by Side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', margin: '1.5rem 0' }}>
        {/* Editor Inputs */}
        <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <h4 style={{ color: '#38bdf8', marginBottom: '1rem' }}>✏️ Chỉnh Sửa Thông Tin Tác Phẩm</h4>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label">Tên nghệ sĩ (person.name):</label>
            <input className="form-input" value={person.name} onChange={handleNameChange} />
          </div>

          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label">Tên tác phẩm (person.artwork.title):</label>
            <input className="form-input" value={person.artwork.title} onChange={handleTitleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Thành phố trưng bày (person.artwork.city):</label>
            <input className="form-input" value={person.artwork.city} onChange={handleCityChange} />
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Cú pháp đang dùng:</span>
            <pre className="code-pill">
{approach === 'immer'
  ? `// ✅ Dùng Immer: Ngắn gọn, dễ đọc\nupdatePerson(draft => {\n  draft.artwork.city = e.target.value;\n});`
  : `// 🌿 Dùng Spread: Phải rải từng tầng\nsetPerson({\n  ...person,\n  artwork: {\n    ...person.artwork,\n    city: e.target.value\n  }\n});`}
            </pre>
          </div>
        </div>

        {/* Live Artwork Preview Card */}
        <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>🖼️ Phòng Trưng Bày Nghệ Thuật</h4>

          <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '1rem', border: '1px solid #334155' }}>
            <img
              src={person.artwork.image}
              alt={person.artwork.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ marginTop: 'auto' }}>
            <h3 style={{ color: '#f8fafc', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
              {person.artwork.title}
            </h3>
            <p style={{ color: '#38bdf8', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
              Tác giả: <strong>{person.name}</strong>
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
              📍 Trưng bày tại: <strong>{person.artwork.city}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
