// ==========================================================================
// KỸ THUẬT 2: TOÁN TỬ 3 NGÔI (TERNARY OPERATOR ? :)
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';

/**
 * Component con Item sử dụng toán tử 3 ngôi (? :)
 * Ưu điểm lớn nhất:
 * - Tránh lặp lại thẻ bọc cha <li className="..."> (nguyên lý DRY).
 * - Biểu thức ngắn gọn, trực quan, nằm trọn trong cặp ngoặc nhọn {}.
 */
function ItemTernary({ name, isPacked }) {
  return (
    // Thẻ <li> bọc ngoài chỉ cần viết 1 lần duy nhất!
    // ClassName cũng có thể đổi động theo điều kiện:
    <li className={`packing-item ${isPacked ? 'packed' : ''}`}>
      <div className="item-left">
        <span className="item-name">
          {/* Lồng ghép thẻ JSX: nếu đã gói thì gạch ngang tên bằng thẻ <del> */}
          {isPacked ? (
            <del>{name} ✅</del>
          ) : (
            <span>{name}</span>
          )}
        </span>
      </div>

      {/* Rẽ nhánh hiển thị Badge trạng thái */}
      {isPacked ? (
        <span className="badge badge-success">HOÀN TẤT</span>
      ) : (
        <span className="badge badge-danger">CHƯA HOÀN TẤT</span>
      )}
    </li>
  );
}

/**
 * Component hiển thị danh sách đồ dùng áp dụng kỹ thuật Toán tử 3 ngôi
 */
export default function PackingListTernary() {
  const [items, setItems] = useState([
    { id: 1, name: 'Sạc pin laptop dự phòng', isPacked: true },
    { id: 2, name: 'Dù che mưa gập gọn', isPacked: false },
    { id: 3, name: 'Hộ chiếu & Vé máy bay', isPacked: true },
    { id: 4, name: 'Tai nghe chống ồn chủ động', isPacked: false },
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
      title="Kỹ thuật 2: Toán tử 3 ngôi (? :)"
      subtitle="Giải pháp chuẩn DRY để tránh trùng lặp thẻ cha, có thể lồng cả thẻ HTML vào kết quả"
      icon="⚖️"
    >
      <div className="control-bar">
        <span>💡 Click vào từng mục để trải nghiệm render động:</span>
        <button
          className="toggle-btn"
          onClick={() =>
            setItems((prev) =>
              prev.map((i) => ({ ...i, isPacked: !prev.every((p) => p.isPacked) }))
            )
          }
        >
          {items.every((i) => i.isPacked) ? 'Bỏ chọn tất cả' : 'Đóng gói tất cả'}
        </button>
      </div>

      <ul className="packing-list">
        {items.map((item) => (
          <div key={item.id} onClick={() => toggleItem(item.id)} style={{ cursor: 'pointer' }}>
            <ItemTernary name={item.name} isPacked={item.isPacked} />
          </div>
        ))}
      </ul>

      {/* Minh họa code */}
      <div className="code-preview">
        <div className="code-comment">
          // 💡 NGUYÊN LÝ DRY (DON'T REPEAT YOURSELF):
          <br />
          // Thay vì nhân đôi thẻ &lt;li&gt; ở cả if và else, ta đặt toán tử 3 ngôi ngay bên trong nội dung thẻ:
        </div>
        <code>
          {`<li className={isPacked ? "packed" : ""}>
  {isPacked ? <del>{name + ' ✅'}</del> : name}
</li>`}
        </code>
      </div>
    </Card>
  );
}
