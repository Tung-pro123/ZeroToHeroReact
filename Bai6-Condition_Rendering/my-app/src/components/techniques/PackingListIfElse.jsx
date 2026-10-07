// ==========================================================================
// KỸ THUẬT 1: RẼ NHÁNH BẰNG IF / ELSE & TRẢ VỀ NULL
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';

/**
 * Component con đại diện cho 1 món đồ:
 * Sử dụng câu lệnh if/else truyền thống trước lệnh return chính.
 * Đặc biệt: Có thể trả về null để ẩn hoàn toàn khỏi DOM trình duyệt.
 */
function ItemIfElse({ name, isPacked, hideWhenPacked = false }) {
  // [Kỹ thuật return null]: Nếu món đồ đã đóng gói và bật chế độ ẩn hoàn toàn
  // React coi null là một giá trị hợp lệ và KHÔNG sinh ra bất kỳ thẻ HTML nào!
  if (hideWhenPacked && isPacked) {
    return null; // Ẩn hoàn toàn khỏi giao diện
  }

  // [Kỹ thuật if/else truyền thống]:
  // Nếu đã đóng gói, trả về cấu trúc JSX có dấu tích ✅
  if (isPacked) {
    return (
      <li className="packing-item packed">
        <div className="item-left">
          <span className="item-name">{name}</span>
        </div>
        <span className="badge badge-success">ĐÃ ĐÓNG GÓI ✅</span>
      </li>
    );
  }

  // Ngược lại (chưa đóng gói), trả về cấu trúc JSX bình thường
  return (
    <li className="packing-item">
      <div className="item-left">
        <span className="item-name">{name}</span>
      </div>
      <span className="badge badge-warning">CHƯA GÓI ⏳</span>
    </li>
  );
}

/**
 * Component chính quản lý danh sách đồ dùng
 */
export default function PackingListIfElse() {
  // Trạng thái các món đồ (dùng để tương tác thực tế trên giao diện)
  const [items, setItems] = useState([
    { id: 1, name: 'Bộ đồ du hành vũ trụ', isPacked: true },
    { id: 2, name: 'Mũ bảo hiểm có kính che', isPacked: true },
    { id: 3, name: 'Bức ảnh chụp gia đình', isPacked: false },
    { id: 4, name: 'Pin năng lượng mặt trời dự phòng', isPacked: false },
  ]);

  // Trạng thái bật/tắt tính năng ẩn các món đã đóng gói (demo return null)
  const [hidePacked, setHidePacked] = useState(false);

  // Hàm đảo trạng thái đóng gói của từng món
  const toggleItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };

  return (
    <Card
      title="Kỹ thuật 1: Câu lệnh if / else & Trả về null"
      subtitle="Thích hợp khi hai trạng thái có cấu trúc giao diện lớn hoặc muốn ẩn hoàn toàn DOM bằng return null"
      icon="🔀"
      action={
        <button
          className={`toggle-btn ${hidePacked ? 'active' : ''}`}
          onClick={() => setHidePacked(!hidePacked)}
          title="Nhấn để kiểm tra cách component return null khi isPacked === true"
        >
          {hidePacked ? '👁️ Hiện tất cả' : '🚫 Ẩn món đã gói (return null)'}
        </button>
      }
    >
      {/* Thanh hướng dẫn tương tác */}
      <div className="control-bar">
        <span>💡 Click trực tiếp vào món đồ để bật/tắt trạng thái:</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {items.filter((i) => i.isPacked).length}/{items.length} món đã gói
        </span>
      </div>

      {/* Danh sách các Item */}
      <ul className="packing-list">
        {items.map((item) => (
          <div key={item.id} onClick={() => toggleItem(item.id)} style={{ cursor: 'pointer' }}>
            <ItemIfElse
              name={item.name}
              isPacked={item.isPacked}
              hideWhenPacked={hidePacked}
            />
          </div>
        ))}
      </ul>

      {/* Hộp giải thích code chuẩn Clean Code */}
      <div className="code-preview">
        <div className="code-comment">
          // 💡 TƯ DUY BACKEND (SPRING BOOT):
          <br />
          // Tương tự trong Java Controller/Service: Bạn dùng if (condition) return null; hoặc ResponseEntity.noContent();
          <br />
          // Trong React: Khi component return null, React reconciliation sẽ bỏ qua và không tạo ra DOM node nào trên HTML.
        </div>
        <code>
          {`if (isPacked) {
  return <li className="packed">{name} ✅</li>;
}
return <li>{name}</li>;`}
        </code>
      </div>
    </Card>
  );
}
