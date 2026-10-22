import { useState, useRef } from 'react';

const CATS = [
  { id: 1, name: 'Mèo Mướp Tom', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80', color: '#f59e0b' },
  { id: 2, name: 'Mèo Anh Lông Ngắn', url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&q=80', color: '#38bdf8' },
  { id: 3, name: 'Mèo Ba Tư Quý Phái', url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&q=80', color: '#a855f7' },
  { id: 4, name: 'Mèo Xiêm Tinh Nghịch', url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&q=80', color: '#10b981' },
  { id: 5, name: 'Mèo Ragdoll Mắt Xanh', url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80', color: '#ec4899' },
  { id: 6, name: 'Mèo Vàng Hoàng Thượng', url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&q=80', color: '#eab308' },
  { id: 7, name: 'Mèo Đen Huyền Bí', url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80', color: '#64748b' },
  { id: 8, name: 'Mèo Béo Đáng Yêu', url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=400&q=80', color: '#06b6d4' },
];

export default function CatFriendsGalleryLab() {
  const [selectedCatId, setSelectedCatId] = useState(1);

  // Lưu trữ danh sách DOM nodes trong một Map object duy nhất
  const itemsRef = useRef(new Map());

  const scrollToId = (itemId) => {
    const map = itemsRef.current;
    const node = map.get(itemId);
    if (node) {
      node.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setSelectedCatId(itemId);
    }
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🐱 Cat Friends Gallery: Quản Lý Mảng Ref Với Ref Callback & Map</h2>
          <p className="lab-desc">
            Bài toán thực tế kinh điển: Bạn có một danh sách danh mục sản phẩm hoặc carousel ảnh. Làm sao gắn Ref vào từng phần tử khi React <strong>cấm gọi Hook trong vòng lặp</strong>?
          </p>
        </div>

        {/* Buttons Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '0.88rem', marginRight: '0.5rem' }}>
            Cuộn tới:
          </span>
          {CATS.map((cat) => (
            <button
              key={cat.id}
              className={`btn ${selectedCatId === cat.id ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              onClick={() => scrollToId(cat.id)}
            >
              #{cat.id} {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Carousel */}
        <div className="cat-gallery-container">
          {CATS.map((cat) => (
            <div
              key={cat.id}
              ref={(node) => {
                // ✅ Ref Callback Pattern
                const map = itemsRef.current;
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
              className={`cat-card ${selectedCatId === cat.id ? 'highlight' : ''}`}
            >
              <img src={cat.url} alt={cat.name} className="cat-img" loading="lazy" />
              <h4 style={{ fontSize: '0.95rem', color: '#f8fafc', marginBottom: '0.25rem' }}>
                {cat.name}
              </h4>
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                ID: {cat.id}
              </span>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ marginTop: '1.75rem' }}>
          <div className="code-box">
            <strong style={{ color: '#ef4444' }}>❌ Lỗi Vi Phạm Luật Hooks (Bị React Báo Lỗi):</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#fca5a5' }}>
{`// ❌ SAI: Không bao giờ được gọi Hook trong .map()!
{cats.map(cat => {
  const myRef = useRef(null); // BÁO LỖI HOOKS!
  return <div ref={myRef} />;
})}`}
            </pre>
          </div>

          <div className="code-box">
            <strong style={{ color: '#10b981' }}>✅ Chuẩn Mực: Ref Callback Với Map():</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#6ee7b7' }}>
{`const itemsRef = useRef(new Map());

<div ref={(node) => {
  const map = itemsRef.current;
  if (node) {
    map.set(cat.id, node);
  } else {
    map.delete(cat.id); // Dọn dẹp khi unmount
  }
}} />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
