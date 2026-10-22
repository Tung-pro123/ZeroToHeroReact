// ==========================================================================
// KỸ THUẬT NỀN TẢNG: BIẾN ĐỔI DỮ LIỆU BẰNG FILTER() & MAP()
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';

// 1. MẢNG DỮ LIỆU THÔ (RAW DATA ARRAY) - Giả lập dữ liệu trả về từ Spring Boot REST API
const SCIENTISTS = [
  {
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
    accomplishment: 'Tính toán đường bay cho sứ mệnh Apollo 11 lên Mặt Trăng',
    imageId: 'MK3eW3A',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
    accomplishment: 'Phát hiện lỗ thủng tầng ozone ở Nam Cực do khí CFC',
    imageId: 'mynHUSa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
    accomplishment: 'Lý thuyết thống nhất tương tác điện yếu giữa các hạt sơ cấp',
    imageId: 'bE7W1ji',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',
    accomplishment: 'Tiên phong tổng hợp steroid, hormone cortisone từ đậu nành',
    imageId: 'IOjWm71',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astronomer',
    accomplishment: 'Khám phá Giới hạn Chandrasekhar về khối lượng sao lùn trắng',
    imageId: 'lrWQx8l',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
];

export default function BasicListTransform() {
  // Trạng thái bộ lọc nghề nghiệp
  const [filterProfession, setFilterProfession] = useState('all');

  // [BƯỚC 1: LỌC DỮ LIỆU VỚI filter()]
  // Nhận vào hàm Predicate (trả về boolean). Trả về mảng mới chỉ gồm các phần tử thỏa mãn.
  // Tương tự Java: list.stream().filter(p -> p.getProfession().equals(...))
  const filteredScientists = filterProfession === 'all'
    ? SCIENTISTS
    : SCIENTISTS.filter((person) => person.profession === filterProfession);

  // [BƯỚC 2: BIẾN ĐỔI MẢNG THÀNH JSX VỚI map()]
  // Duyệt qua từng phần tử và trả về một phần tử giao diện JSX đại diện.
  // Tương tự Java: .map(person -> new ScientistView(person)).collect(Collectors.toList())
  const listItems = filteredScientists.map((person) => (
    // QUY TẮC BẮT BUỘC: Thẻ ngoài cùng đầu tiên nhả ra từ map() PHẢI mang thuộc tính key={person.id}
    <div key={person.id} className="person-card">
      <img
        src={person.avatar}
        alt={person.name}
        className="person-avatar"
        loading="lazy"
      />
      <div className="person-info">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <h4 className="person-name">{person.name}</h4>
          <Badge
            variant={
              person.profession === 'chemist'
                ? 'success'
                : person.profession === 'physicist'
                ? 'accent'
                : person.profession === 'astronomer'
                ? 'warning'
                : 'primary'
            }
          >
            {person.profession}
          </Badge>
        </div>
        <p className="person-accomplishment">
          🎖️ <strong>Thành tựu:</strong> {person.accomplishment}
        </p>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>
          Database Primary Key ID: <code>{person.id}</code>
        </span>
      </div>
    </div>
  ));

  return (
    <Card
      title="Bản Chất: Chuyển Đổi Dữ Liệu Thành JSX (filter & map)"
      subtitle="Tách rời Data Array khỏi Presentation Layout, ánh xạ từng Object thành thẻ JSX"
      icon="🔄"
      action={
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            className={`toggle-btn ${filterProfession === 'all' ? 'active' : ''}`}
            onClick={() => setFilterProfession('all')}
          >
            Tất cả ({SCIENTISTS.length})
          </button>
          <button
            className={`toggle-btn ${filterProfession === 'chemist' ? 'active' : ''}`}
            onClick={() => setFilterProfession('chemist')}
          >
            🧪 Nhà Hóa Học (Chemists)
          </button>
          <button
            className={`toggle-btn ${filterProfession === 'physicist' ? 'active' : ''}`}
            onClick={() => setFilterProfession('physicist')}
          >
            ⚛️ Nhà Vật Lý (Physicists)
          </button>
          <button
            className={`toggle-btn ${filterProfession === 'astronomer' ? 'active' : ''}`}
            onClick={() => setFilterProfession('astronomer')}
          >
            🔭 Nhà Thiên Văn
          </button>
        </div>
      }
    >
      <div className="control-bar">
        <span>
          Đang hiển thị: <strong>{filteredScientists.length}</strong> nhà khoa học
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Data Array ➡️ <code>.filter()</code> ➡️ <code>.map()</code> ➡️ JSX Array
        </span>
      </div>

      {/* Render mảng các thẻ JSX trực tiếp */}
      <div className="grid-2-cols">
        {listItems}
      </div>

      {/* Khung đối chiếu với Backend Java */}
      <div className="code-preview">
        <div className="code-comment">
          // 💡 ĐỐI CHIẾU KIẾN TRÚC VỚI JAVA STREAM API (SPRING BOOT):
          <br />
          // - Trong Java: list.stream().filter(p -&gt; p.getProfession().equals("chemist")).map(p -&gt; new DTO(p)).collect(Collectors.toList());
          <br />
          // - Trong React: list.filter(p =&gt; p.profession === 'chemist').map(p =&gt; &lt;ScientistCard key={'{p.id}'} data={'{p}'} /&gt;);
          <br />
          // Bản chất 100% tương đương: Bộ lọc Predicate ➡️ Ánh xạ Transformer ➡️ Danh sách hiển thị!
        </div>
        <code>
          {`const chemists = scientists.filter(p => p.profession === 'chemist');
const listItems = chemists.map(p => (
  <li key={p.id}>{p.name}</li>
));
return <ul>{listItems}</ul>;`}
        </code>
      </div>
    </Card>
  );
}
