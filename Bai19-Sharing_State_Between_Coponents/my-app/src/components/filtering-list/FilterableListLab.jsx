import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const foodsData = [
  { id: 1, name: 'Phở Bò Tái Lăn', category: 'Món nước', price: '60.000đ', desc: 'Bánh phở mềm thơm, thịt bò tái lăn tỏi giòn béo ngậy nước dùng thanh ngọt.' },
  { id: 2, name: 'Bún Chả Hà Nội', category: 'Món nướng', price: '50.000đ', desc: 'Chả nướng than hoa thơm lừng ăn kèm bún tươi, đu đủ ngâm giòn và nước mắm chua ngọt.' },
  { id: 3, name: 'Cơm Tấm Sườn Bì Chả', category: 'Cơm', price: '55.000đ', desc: 'Hạt cơm tấm dẻo bùi, sườn ướp mật ong nướng vàng ươm, kèm chả trứng hấp béo ngậy.' },
  { id: 4, name: 'Bánh Mì Chảo Đặc Biệt', category: 'Bánh mì', price: '45.000đ', desc: 'Pate nóng hổi, trứng ốp la lòng đào, xúc xích và nước sốt cà chua đậm đà.' },
  { id: 5, name: 'Gỏi Cuốn Tôm Thịt', category: 'Khai vị', price: '35.000đ', desc: 'Tôm tươi luộc đỏ au, thịt ba chỉ nạc mỡ đan xen cuộn cùng rau sống chấm tương đen.' },
  { id: 6, name: 'Bún Bò Huế Cay Nồng', category: 'Món nước', price: '65.000đ', desc: 'Sợi bún to tròn đặc trưng, móng giò giòn sần sật và nước dùng cay thơm nồng vị sả.' },
];

// Helper để highlight từ khóa tìm kiếm
function HighlightText({ text, query }) {
  if (!query.trim()) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} style={{ background: '#10b981', color: '#ffffff', padding: '0 2px', borderRadius: '3px' }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

// Child 1: Thanh tìm kiếm (Controlled component)
function SearchBar({ query, onChangeQuery, category, onChangeCategory }) {
  const categories = ['Tất cả', 'Món nước', 'Món nướng', 'Cơm', 'Bánh mì', 'Khai vị'];

  return (
    <div style={{ background: '#0d1527', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.35rem' }}>
            🔍 Nhập từ khóa món ăn:
          </label>
          <input
            type="text"
            className="input-control"
            placeholder="Tìm theo tên món hoặc nguyên liệu..."
            value={query}
            onChange={(e) => onChangeQuery(e.target.value)}
          />
        </div>
        {query && (
          <button className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-end', height: '42px' }} onClick={() => onChangeQuery('')}>
            Xóa tìm kiếm
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Danh mục:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onChangeCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

// Child 2: Danh sách món ăn đã được lọc
function FoodList({ items, query }) {
  if (items.length === 0) {
    return (
      <div style={{ padding: '3rem 1rem', textAlign: 'center', background: '#0a0f1d', borderRadius: '10px', border: '1px dashed #374151' }}>
        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🍽️</span>
        <div style={{ color: '#9ca3af', fontSize: '1rem' }}>Không tìm thấy món ăn nào phù hợp với từ khóa!</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
      {items.map((food) => (
        <div
          key={food.id}
          style={{
            background: '#0d1527',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            padding: '1.25rem',
            transition: 'border-color 0.2s',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#f3f4f6', fontWeight: 600 }}>
              <HighlightText text={food.name} query={query} />
            </h3>
            <span className="badge badge-emerald">{food.price}</span>
          </div>
          <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>{food.category}</span>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
            <HighlightText text={food.desc} query={query} />
          </p>
        </div>
      ))}
    </div>
  );
}

export default function FilterableListLab() {
  // State được KÉO LÊN CHA CHUNG
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');

  // Tính toán kết quả tìm kiếm ngay trong lúc render (Derived State)
  const filteredFoods = foodsData.filter((food) => {
    const matchesCategory = category === 'Tất cả' || food.category === category;
    const cleanQuery = query.trim().toLowerCase();
    const matchesQuery =
      cleanQuery === '' ||
      food.name.toLowerCase().includes(cleanQuery) ||
      food.desc.toLowerCase().includes(cleanQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🔍 3. Thử Thách 2: Lọc Danh Sách Với Thanh Tìm Kiếm (Filtering a List)</h2>
        <p className="lab-card-desc">
          Tái hiện Thử thách 2 trong React.dev: Component <code>&lt;SearchBar /&gt;</code> và component <code>&lt;FoodList /&gt;</code> 
          là hai anh em, chia sẻ từ khóa tìm kiếm thông qua Component Cha.
        </p>
      </div>

      <InfoBox type="tip" title="Kiến Trúc Luồng Dữ Liệu:">
        1. Biến <code>query</code> và <code>category</code> được kéo lên đặt tại <code>FilterableListLab</code> (Cha).<br />
        2. Cha truyền <code>query</code> và các hàm cập nhật xuống cho <code>SearchBar</code>.<br />
        3. Cha tính toán mảng kết quả <code>filteredFoods</code> (Derived State) và truyền trực tiếp xuống cho <code>FoodList</code>.
      </InfoBox>

      {/* Search Bar Component */}
      <SearchBar
        query={query}
        onChangeQuery={setQuery}
        category={category}
        onChangeCategory={setCategory}
      />

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
          Tìm thấy <strong style={{ color: '#10b981' }}>{filteredFoods.length}</strong> / {foodsData.length} món ăn
        </div>
        {(query || category !== 'Tất cả') && (
          <span style={{ fontSize: '0.8rem', color: '#60a5fa' }}>
            Đang lọc: {query ? `"${query}"` : ''} {category !== 'Tất cả' ? `[${category}]` : ''}
          </span>
        )}
      </div>

      {/* Food List Component */}
      <FoodList items={filteredFoods} query={query} />
    </div>
  );
}
