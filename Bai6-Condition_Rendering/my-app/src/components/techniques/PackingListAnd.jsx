// ==========================================================================
// KỸ THUẬT 3: TOÁN TỬ LOGIC AND (&&)
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';

/**
 * Component con Item sử dụng toán tử logic AND (&&)
 * Thích hợp cho điều kiện 1 chiều:
 * "Chỉ muốn render JSX khi điều kiện ĐÚNG, nếu SAI thì không làm gì cả".
 */
function ItemLogicalAnd({ name, isPacked, isPriority = false }) {
  return (
    <li className={`packing-item ${isPacked ? 'packed' : ''}`}>
      <div className="item-left">
        <span className="item-name">{name}</span>

        {/* 1. Nếu là món đồ ưu tiên cao (isPriority === true), hiển thị thêm huy hiệu VIP */}
        {isPriority && (
          <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
            ⚡ ƯU TIÊN CAO
          </span>
        )}
      </div>

      {/* 2. Điều kiện 1 chiều: Chỉ khi isPacked là true thì mới render icon và nhãn ✅ */}
      {/* Trong JS: true && <JSX> => trả về <JSX> */}
      {/*            false && <JSX> => trả về false (React coi false là khoảng trống, không in ra) */}
      {isPacked && (
        <span className="badge badge-success">
          ĐÃ SẴN SÀNG ✅
        </span>
      )}
    </li>
  );
}

/**
 * Component hiển thị danh sách đồ dùng áp dụng toán tử &&
 */
export default function PackingListAnd() {
  const [items, setItems] = useState([
    { id: 1, name: 'Bình dưỡng khí oxy', isPacked: true, isPriority: true },
    { id: 2, name: 'Hộp sơ cứu y tế', isPacked: false, isPriority: true },
    { id: 3, name: 'Bộ đàm liên lạc vệ tinh', isPacked: true, isPriority: false },
    { id: 4, name: 'Sổ tay ghi chú hành trình', isPacked: false, isPriority: false },
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
      title="Kỹ thuật 3: Toán tử Logic AND (&&)"
      subtitle="Giải pháp ngắn gọn nhất cho điều kiện một chiều: Thêm nhãn, icon hoặc component khi cờ là true"
      icon="⚡"
    >
      <div className="control-bar">
        <span>💡 Click vào từng mục để quan sát toán tử && xuất hiện/ẩn đi:</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Toán tử 1 chiều (One-way condition)
        </span>
      </div>

      <ul className="packing-list">
        {items.map((item) => (
          <div key={item.id} onClick={() => toggleItem(item.id)} style={{ cursor: 'pointer' }}>
            <ItemLogicalAnd
              name={item.name}
              isPacked={item.isPacked}
              isPriority={item.isPriority}
            />
          </div>
        ))}
      </ul>

      {/* Minh họa code và lưu ý */}
      <div className="code-preview">
        <div className="code-comment">
          // 💡 CƠ CHẾ HOẠT ĐỘNG CỦA TOÁN TỬ && TRONG JAVASCRIPT:
          <br />
          // - JavaScript đánh giá vế trái: Nếu truthy, nó trả về giá trị của vế phải (chính là JSX của bạn).
          <br />
          // - Nếu vế trái falsy (ví dụ boolean false), nó dừng lại và trả về false.
          <br />
          // - React coi các giá trị null, undefined, false là hợp lệ nhưng KHÔNG in gì ra màn hình.
        </div>
        <code>
          {`{isPriority && <span className="badge">⚡ ƯU TIÊN</span>}
{isPacked && <span className="badge">ĐÃ XONG ✅</span>}`}
        </code>
      </div>
    </Card>
  );
}
