// ==========================================================================
// KỸ THUẬT 4: GÁN JSX LINH HOẠT VÀO BIẾN SỐ (LET)
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';

/**
 * Component con Item sử dụng biến let:
 * Chuẩn bị và biến đổi nội dung JSX trước khi gọi return.
 * Thích hợp khi điều kiện phức tạp, nhiều nhánh tính toán.
 */
function ItemWithLet({ name, isPacked, customNotes }) {
  // 1. Khởi tạo nội dung mặc định là chuỗi tên ban đầu
  let itemContent = <span>{name}</span>;

  // 2. Nếu đã đóng gói, ghi đè biến bằng cấu trúc thẻ gạch ngang <del>
  if (isPacked) {
    itemContent = (
      <del style={{ color: 'var(--color-text-subtle)' }}>
        {name} ✅
      </del>
    );
  }

  // 3. Nếu có ghi chú đặc biệt, nối thêm thông tin vào biến
  let noteBadge = null;
  if (customNotes) {
    noteBadge = (
      <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
        📌 {customNotes}
      </span>
    );
  }

  // 4. Return giao diện sạch sẽ, chỉ cần đặt biến {itemContent} vào vị trí mong muốn
  return (
    <li className={`packing-item ${isPacked ? 'packed' : ''}`}>
      <div className="item-left">
        <span className="item-name">{itemContent}</span>
        {noteBadge}
      </div>

      <span className={`badge ${isPacked ? 'badge-success' : 'badge-warning'}`}>
        {isPacked ? 'ĐÃ ĐÓNG GÓI' : 'CHỜ ĐÓNG GÓI'}
      </span>
    </li>
  );
}

/**
 * Component chính quản lý danh sách áp dụng kỹ thuật let
 */
export default function PackingListLet() {
  const [items, setItems] = useState([
    { id: 1, name: 'Hộ chiếu có thị thực visa', isPacked: true, notes: 'Hết hạn năm 2030' },
    { id: 2, name: 'Áo khoác giữ nhiệt mùa đông', isPacked: false, notes: 'Cần giặt khô trước' },
    { id: 3, name: 'Bộ chuyển đổi chân cắm điện quốc tế', isPacked: true, notes: 'Chuẩn Type C & G' },
  ]);

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };

  return (
    <Card
      title="Kỹ thuật 4: Gán JSX linh hoạt vào biến (let)"
      subtitle="Tách rời hoàn toàn bước tính toán dữ liệu khỏi cây JSX, giúp code dễ mở rộng khi có nhiều điều kiện lồng nhau"
      icon="📦"
    >
      <div className="control-bar">
        <span>💡 Click vào từng mục để toggle:</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Variable Assignment Pattern
        </span>
      </div>

      <ul className="packing-list">
        {items.map((item) => (
          <div key={item.id} onClick={() => toggleItem(item.id)} style={{ cursor: 'pointer' }}>
            <ItemWithLet
              name={item.name}
              isPacked={item.isPacked}
              customNotes={item.notes}
            />
          </div>
        ))}
      </ul>

      {/* Minh họa code */}
      <div className="code-preview">
        <div className="code-comment">
          // 💡 TÁCH RỜI LOGIC & GIAO DIỆN (DECOUPLING):
          <br />
          // Tính toán chuẩn bị nội dung trước bằng biến JavaScript, JSX bên dưới chỉ đảm nhận việc đặt khung:
        </div>
        <code>
          {`let itemContent = name;
if (isPacked) {
  itemContent = <del>{name + " ✅"}</del>;
}
return <li className="item">{itemContent}</li>;`}
        </code>
      </div>
    </Card>
  );
}
