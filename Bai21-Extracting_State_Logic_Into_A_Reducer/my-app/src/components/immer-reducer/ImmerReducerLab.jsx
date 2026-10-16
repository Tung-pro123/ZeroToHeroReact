import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Helper mô phỏng cơ chế Produce/Draft của Immer
function simpleProduce(baseState, recipe) {
  const draft = JSON.parse(JSON.stringify(baseState));
  recipe(draft);
  return draft;
}

// Hook tùy biến mô phỏng useImmerReducer
function useSimpleImmerReducer(immerReducer, initialState) {
  const [state, setState] = useState(initialState);
  function dispatch(action) {
    setState((prevState) => simpleProduce(prevState, (draft) => immerReducer(draft, action)));
  }
  return [state, dispatch];
}

const initialInventory = [
  { id: 1, title: 'Bàn phím cơ Custom 75%', inStock: true, price: 1850000, quantity: 2 },
  { id: 2, title: 'Chuột không dây siêu nhẹ 49g', inStock: true, price: 950000, quantity: 5 },
  { id: 3, title: 'Lót chuột cỡ lớn Deskmat 900x400', inStock: false, price: 250000, quantity: 0 },
];

// ⚡ HÀM IMMER REDUCER: Đột biến trực tiếp trên draft!
function inventoryImmerReducer(draft, action) {
  switch (action.type) {
    case 'add_item': {
      // ✅ Không cần [...draft, new] -> Dùng push trực tiếp!
      draft.push({
        id: Date.now(),
        title: action.title,
        price: action.price,
        inStock: true,
        quantity: 1,
      });
      break;
    }
    case 'toggle_stock': {
      // ✅ Sửa trực tiếp thuộc tính mà không cần map()!
      const item = draft.find((i) => i.id === action.id);
      if (item) {
        item.inStock = !item.inStock;
        if (!item.inStock) item.quantity = 0;
      }
      break;
    }
    case 'increase_qty': {
      const item = draft.find((i) => i.id === action.id);
      if (item) {
        item.quantity += 1;
        item.inStock = true;
      }
      break;
    }
    case 'decrease_qty': {
      const item = draft.find((i) => i.id === action.id);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
        if (item.quantity === 0) item.inStock = false;
      }
      break;
    }
    case 'delete_item': {
      // ✅ Dùng splice trực tiếp!
      const idx = draft.findIndex((i) => i.id === action.id);
      if (idx !== -1) {
        draft.splice(idx, 1);
      }
      break;
    }
    default:
      break;
  }
}

export default function ImmerReducerLab() {
  const [inventory, dispatch] = useSimpleImmerReducer(inventoryImmerReducer, initialInventory);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('500000');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    dispatch({ type: 'add_item', title: newTitle, price: parseInt(newPrice, 10) || 100000 });
    setNewTitle('');
  };

  const totalValue = inventory.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">⚡ 5. Viết Reducer Siêu Tiện Lợi Với Immer (useImmerReducer)</h2>
        <p className="lab-card-desc">
          Tạm biệt những đoạn mã sao chép mảng nhiều tầng và Spread Operator phức tạp: 
          Khám phá cách thư viện Immer cho phép bạn dùng <code>draft.push()</code>, <code>draft.splice()</code> và gán thuộc tính trực tiếp.
        </p>
      </div>

      <InfoBox type="tip" title="Sự Khác Biệt Giữa Reducer Thuần vs useImmerReducer:">
        <strong>Reducer thuần (Vanilla):</strong> Bạn phải tự tạo State mới an toàn bằng <code>map()</code>, <code>filter()</code> và <code>&#123; ...state, prop: ... &#125;</code>.<br />
        <strong>useImmerReducer:</strong> Nhận vào một bản nháp <code>draft</code>. Bạn tha hồ thao tác đột biến (mutation) và kết thúc mỗi case bằng <code>break;</code> thay vì <code>return</code>!
      </InfoBox>

      {/* Add Product Form */}
      <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          className="input-control"
          placeholder="Tên sản phẩm thiết bị..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ flex: 2, minWidth: '220px' }}
        />
        <input
          type="number"
          className="input-control"
          placeholder="Đơn giá (VNĐ)..."
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          style={{ flex: 1, minWidth: '140px' }}
        />
        <button type="submit" className="btn btn-primary" disabled={!newTitle.trim()}>
          ➕ draft.push(món mới)
        </button>
      </form>

      {/* Inventory Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {inventory.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              background: '#0d1527',
              border: item.inStock ? '1px solid #14b8a6' : '1px solid #1e293b',
              borderRadius: '10px',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#f3f4f6' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.2rem' }}>
                Đơn giá: <strong style={{ color: '#f97316' }}>{item.price.toLocaleString()}đ</strong> • Tổng: {(item.price * item.quantity).toLocaleString()}đ
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                className={`btn btn-sm ${item.inStock ? 'btn-teal' : 'btn-secondary'}`}
                onClick={() => dispatch({ type: 'toggle_stock', id: item.id })}
              >
                {item.inStock ? '✅ Còn Hàng' : '❌ Hết Hàng'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#111827', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0 6px', height: '26px' }}
                  onClick={() => dispatch({ type: 'decrease_qty', id: item.id })}
                >
                  -
                </button>
                <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center', color: '#2dd4bf' }}>
                  {item.quantity}
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0 6px', height: '26px' }}
                  onClick={() => dispatch({ type: 'increase_qty', id: item.id })}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch({ type: 'delete_item', id: item.id })}
              >
                draft.splice()
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#0a0f1d', borderRadius: '8px', border: '1px solid #1e293b', fontWeight: 600 }}>
        <span>Tổng số lượng sản phẩm: {inventory.reduce((sum, i) => sum + i.quantity, 0)}</span>
        <span style={{ color: '#2dd4bf' }}>Tổng giá trị kho: {totalValue.toLocaleString()} VNĐ</span>
      </div>
    </div>
  );
}
