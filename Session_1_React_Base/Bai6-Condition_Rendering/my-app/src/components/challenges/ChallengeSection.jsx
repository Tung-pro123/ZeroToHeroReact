// ==========================================================================
// CÁC BÀI TẬP THỬ THÁCH (REACT.DEV CHALLENGES) - BÀI 6
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';

// --------------------------------------------------------------------------
// CHALLENGE 1: HIỂN THỊ ICON ❌ KHI MÓN ĐỒ CHƯA ĐÓNG GÓI
// --------------------------------------------------------------------------
function ItemChallenge1({ name, isPacked }) {
  return (
    <li className={`packing-item ${isPacked ? 'packed' : ''}`}>
      <span className="item-name">{name}</span>
      {/* Sử dụng toán tử 3 ngôi ? : để render ✅ nếu true, ❌ nếu false */}
      <span style={{ fontSize: '1.25rem' }}>
        {isPacked ? '✅' : '❌'}
      </span>
    </li>
  );
}

// --------------------------------------------------------------------------
// CHALLENGE 2: HIỂN THỊ ĐỘ ƯU TIÊN VỚI && (XỬ LÝ BẪY SỐ 0)
// --------------------------------------------------------------------------
function ItemChallenge2({ name, importance }) {
  return (
    <li className="packing-item">
      <div className="item-left">
        <span className="item-name">{name}</span>
        {/* Chỉ hiển thị độ ưu tiên khi importance > 0 để tránh in số 0 khi importance = 0 */}
        {importance > 0 && (
          <span className="badge badge-warning" style={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
            ⚡ Độ ưu tiên: {importance}
          </span>
        )}
      </div>

      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
        {importance === 0 ? 'Mức bình thường (importance = 0)' : `Cấp độ ${importance}`}
      </span>
    </li>
  );
}

// --------------------------------------------------------------------------
// CHALLENGE 3: TÁI CẤU TRÚC NHIỀU TOÁN TỬ ? : THÀNH OBJECT TRA CỨU (MAP)
// --------------------------------------------------------------------------
// Định nghĩa từ điển thông tin đồ uống (Tương tự Java Map<String, DrinkInfo>)
const DRINKS_DATA = {
  tea: {
    title: 'Trà thảo mộc (Tea)',
    icon: '🍵',
    part: 'Búp lá trà non (Leaf)',
    caffeine: '15–70 mg/tách',
    age: 'Hơn 4,000 năm lịch sử',
    origin: 'Trung Quốc cổ đại',
  },
  coffee: {
    title: 'Cà phê rang mộc (Coffee)',
    icon: '☕',
    part: 'Hạt cà phê nguyên chất (Bean)',
    caffeine: '80–185 mg/tách',
    age: 'Hơn 1,000 năm lịch sử',
    origin: 'Cao nguyên Ethiopia',
  },
};

function DrinkChallenge3({ name }) {
  // Tra cứu dữ liệu trực tiếp theo key name (O(1) lookup)
  const info = DRINKS_DATA[name];

  if (!info) {
    return <p style={{ color: 'var(--color-danger)' }}>Không tìm thấy thông tin loại đồ uống này!</p>;
  }

  return (
    <div className="drink-card">
      <div className="drink-header">
        <span style={{ fontSize: '2rem' }}>{info.icon}</span>
        <div>
          <h4 className="drink-name">{info.title}</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Mã: {name}</span>
        </div>
      </div>

      <dl className="drink-dl">
        <dt>Bộ phận thu hoạch:</dt>
        <dd>{info.part}</dd>

        <dt>Hàm lượng Caffeine:</dt>
        <dd style={{ color: 'var(--color-warning)' }}>{info.caffeine}</dd>

        <dt>Niên đại phát triển:</dt>
        <dd>{info.age}</dd>

        <dt>Nguồn gốc xuất xứ:</dt>
        <dd>{info.origin}</dd>
      </dl>
    </div>
  );
}

// --------------------------------------------------------------------------
// COMPONENT CHÍNH QUẢN LÝ CẢ 3 CHALLENGES
// --------------------------------------------------------------------------
export default function ChallengeSection() {
  // State tương tác cho Challenge 1
  const [packedItems, setPackedItems] = useState([
    { id: 1, name: 'Bộ quần áo vũ trụ Space Suit', isPacked: true },
    { id: 2, name: 'Mũ bảo hiểm dưỡng khí', isPacked: true },
    { id: 3, name: 'Bức ảnh chụp kỷ niệm', isPacked: false },
  ]);

  // State chọn đồ uống cho Challenge 3
  const [selectedDrink, setSelectedDrink] = useState('all');

  const toggleChallenge1 = (id) => {
    setPackedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* THỬ THÁCH 1 */}
      <Card
        title="Thử thách 1: Hiển thị icon ❌ khi isPacked là false"
        subtitle="Yêu cầu: Dùng toán tử 3 ngôi ? : để render dấu ❌ nếu chưa đóng gói, thay vì để trống"
        icon="🎯"
      >
        <div className="control-bar">
          <span>💡 Click để toggle trạng thái:</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Code: <code>{`{isPacked ? '✅' : '❌'}`}</code>
          </span>
        </div>

        <ul className="packing-list">
          {packedItems.map((item) => (
            <div key={item.id} onClick={() => toggleChallenge1(item.id)} style={{ cursor: 'pointer' }}>
              <ItemChallenge1 name={item.name} isPacked={item.isPacked} />
            </div>
          ))}
        </ul>
      </Card>

      {/* THỬ THÁCH 2 */}
      <Card
        title="Thử thách 2: Hiển thị độ ưu tiên với && (Tránh bẫy số 0)"
        subtitle="Yêu cầu: Chỉ in (Importance: X) khi X > 0, tuyệt đối không in số 0 khi importance = 0"
        icon="🎯"
      >
        <ul className="packing-list">
          <ItemChallenge2 name="Áo bảo hộ chống bức xạ" importance={9} />
          <ItemChallenge2 name="Bình nước dự phòng" importance={0} />
          <ItemChallenge2 name="Điện thoại định vị GPS vệ tinh" importance={6} />
        </ul>

        <div className="code-preview">
          <div className="code-comment">
            // ✅ GIẢI PHÁP ĐẠT ĐIỂM TỐI ĐA:
            <br />
            // Dùng importance &gt; 0 &amp;&amp; để vế trái là boolean false khi importance = 0:
          </div>
          <code>
            {`{importance > 0 && <i> (Importance: {importance})</i>}`}
          </code>
        </div>
      </Card>

      {/* THỬ THÁCH 3 */}
      <Card
        title="Thử thách 3: Tái cấu trúc nhiều toán tử ? : thành Object Tra Cứu"
        subtitle="Clean Code Pattern: Thay vì viết 3 toán tử 3 ngôi rời rạc, gom dữ liệu vào Dictionary (Map) để dễ mở rộng"
        icon="🎯"
        action={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`toggle-btn ${selectedDrink === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedDrink('all')}
            >
              Tất cả
            </button>
            <button
              className={`toggle-btn ${selectedDrink === 'tea' ? 'active' : ''}`}
              onClick={() => setSelectedDrink('tea')}
            >
              🍵 Trà
            </button>
            <button
              className={`toggle-btn ${selectedDrink === 'coffee' ? 'active' : ''}`}
              onClick={() => setSelectedDrink('coffee')}
            >
              ☕ Cà phê
            </button>
          </div>
        }
      >
        <div className="grid-2-cols" style={{ marginTop: '1rem' }}>
          {(selectedDrink === 'all' || selectedDrink === 'tea') && (
            <DrinkChallenge3 name="tea" />
          )}
          {(selectedDrink === 'all' || selectedDrink === 'coffee') && (
            <DrinkChallenge3 name="coffee" />
          )}
        </div>

        <div className="code-preview">
          <div className="code-comment">
            // 💡 TƯ DUY CLEAN CODE & BACKEND STRATEGY PATTERN:
            <br />
            // - Code cũ của react.dev dùng 3 toán tử ternary rời rạc: name === 'tea' ? ... : ...
            <br />
            // - Nhược điểm: Nếu sau này thêm loại đồ uống thứ 3 (như 'juice' hay 'milk'), bạn phải sửa code ở 3 nơi!
            <br />
            // - Tái cấu trúc: Dùng Object DRINKS[name]. Sau này muốn thêm đồ uống mới, bạn chỉ cần bổ sung 1 key vào Object!
          </div>
          <code>
            {`const drinks = {
  tea: { part: 'leaf', caffeine: '15–70 mg/cup', age: '4,000+ years' },
  coffee: { part: 'bean', caffeine: '80–185 mg/cup', age: '1,000+ years' }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part</dt><dd>{info.part}</dd>
        <dt>Caffeine</dt><dd>{info.caffeine}</dd>
      </dl>
    </section>
  );
}`}
          </code>
        </div>
      </Card>
    </div>
  );
}
