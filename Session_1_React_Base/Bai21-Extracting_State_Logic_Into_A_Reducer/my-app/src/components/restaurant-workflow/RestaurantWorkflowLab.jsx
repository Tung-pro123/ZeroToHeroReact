import { useReducer, useState } from 'react';
import InfoBox from '../common/InfoBox';

// Initial state for restaurant table
const initialTableState = {
  tableNumber: 8,
  orders: [
    { id: 1, name: 'Phở Bò Tái Lăn', price: 65000, qty: 1 },
    { id: 2, name: 'Trà Đá Hà Nội', price: 5000, qty: 2 },
  ],
  status: 'eating', // 'eating' | 'paid' | 'cancelled'
  lastAction: 'Khởi tạo bàn ăn',
};

// Pure Reducer Function: Bếp Trưởng Nhà Hàng
function tableReducer(state, action) {
  switch (action.type) {
    case 'ORDER_ITEM': {
      const existing = state.orders.find((item) => item.name === action.name);
      if (existing) {
        return {
          ...state,
          orders: state.orders.map((item) =>
            item.name === action.name ? { ...item, qty: item.qty + 1 } : item
          ),
          lastAction: `Thêm 1 phần "${action.name}"`,
          status: 'eating',
        };
      }
      return {
        ...state,
        orders: [
          ...state.orders,
          { id: Date.now(), name: action.name, price: action.price, qty: 1 },
        ],
        lastAction: `Gọi món mới "${action.name}"`,
        status: 'eating',
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        orders: state.orders.filter((item) => item.id !== action.id),
        lastAction: `Hủy món mã #${action.id}`,
      };
    }
    case 'PAY_BILL': {
      return {
        ...state,
        status: 'paid',
        lastAction: 'Thanh toán hóa đơn thành công',
      };
    }
    case 'CLEAR_TABLE': {
      return {
        ...state,
        orders: [],
        status: 'cancelled',
        lastAction: 'Dọn sạch bàn ăn',
      };
    }
    default:
      return state;
  }
}

export default function RestaurantWorkflowLab() {
  const [tableState, dispatch] = useReducer(tableReducer, initialTableState);
  const [actionHistory, setActionHistory] = useState([
    { id: 1, type: 'INIT', time: new Date().toLocaleTimeString(), detail: 'Bàn #8 bắt đầu mở' },
  ]);

  // Wrapper để vừa dispatch vừa ghi log trực quan
  const handleDispatch = (action) => {
    dispatch(action);
    setActionHistory((prev) => [
      {
        id: Date.now(),
        type: action.type,
        time: new Date().toLocaleTimeString(),
        detail: JSON.stringify(action),
      },
      ...prev.slice(0, 7),
    ]);
  };

  const totalPrice = tableState.orders.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">👨‍🍳 1. Ẩn Dụ Nhà Hàng: Luồng Vận Hành Của useReducer</h2>
        <p className="lab-card-desc">
          Trực quan hóa mô hình 4 thành phần: Khách Hàng (Component) ➡️ Bộ Đàm (dispatch) ➡️ Tờ Order (Action) ➡️ Bếp Trưởng (Reducer) ➡️ Món Ăn Mới (New State).
        </p>
      </div>

      <InfoBox type="tip" title="Bản ChấtuseReducer:">
        Component <strong>không trực tiếp tính toán</strong> tiền hay thêm sửa mảng orders. Nó chỉ phát tín hiệu (Dispatch Action). 
        Hàm Bếp Trưởng (<code>tableReducer</code>) là một hàm thuần túy độc lập, tự động trả về bàn ăn mới và yêu cầu React dọn ra giao diện!
      </InfoBox>

      {/* Visual Workflow Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {/* Step 1: Component */}
        <div style={{ background: '#0d1527', border: '1px solid #1e293b', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: '#f3f4f6' }}>1. Khách Hàng (UI)</span>
            <span className="badge badge-orange">Component</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Bấm nút để gọi món qua chiếc &quot;Bộ Đàm&quot; <code>dispatch</code>:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleDispatch({ type: 'ORDER_ITEM', name: 'Phở Bò Tái Lăn', price: 65000 })}
            >
              🍜 Gọi Phở Bò (+65k)
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleDispatch({ type: 'ORDER_ITEM', name: 'Quẩy Giòn Nóng', price: 10000 })}
            >
              🥖 Thêm Quẩy (+10k)
            </button>
            <button
              className="btn btn-teal btn-sm"
              onClick={() => handleDispatch({ type: 'PAY_BILL' })}
              disabled={tableState.orders.length === 0 || tableState.status === 'paid'}
            >
              💳 Thanh Toán Hóa Đơn
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleDispatch({ type: 'CLEAR_TABLE' })}
            >
              🧹 Dọn Sạch Bàn
            </button>
          </div>
        </div>

        {/* Step 2: Bếp Trưởng Reducer */}
        <div style={{ background: '#0d1527', border: '1px solid #14b8a6', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: '#2dd4bf' }}>2. Bếp Trưởng (Reducer)</span>
            <span className="badge badge-teal">Pure Function</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
            Thao tác gần nhất vừa xử lý:
          </div>
          <div style={{ padding: '0.75rem', background: '#042f2e', border: '1px solid #0f766e', borderRadius: '6px', color: '#5eead4', fontSize: '0.85rem', fontWeight: 600 }}>
            ⚡ {tableState.lastAction}
          </div>
          <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            Bếp trưởng nhận vào <code>(state, action)</code>, chạy qua câu lệnh <code>switch(action.type)</code> và return về State bất biến mới.
          </div>
        </div>

        {/* Step 3: Bàn Ăn State */}
        <div style={{ background: '#0d1527', border: '1px solid #3b82f6', borderRadius: '10px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: '#60a5fa' }}>3. Bàn Ăn (New State)</span>
            <span className={`badge ${tableState.status === 'paid' ? 'badge-teal' : tableState.status === 'cancelled' ? 'badge-rose' : 'badge-orange'}`}>
              {tableState.status === 'paid' ? 'Đã Thanh Toán' : tableState.status === 'cancelled' ? 'Bàn Trống' : 'Đang Ăn'}
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
            Món ăn trên Bàn #{tableState.tableNumber}:
          </div>
          {tableState.orders.length === 0 ? (
            <div style={{ color: '#6b7280', fontSize: '0.85rem', padding: '1rem 0', textAlign: 'center' }}>
              Chưa có món ăn nào...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '130px', overflowY: 'auto' }}>
              {tableState.orders.map((item) => (
                <div
                  key={item.id}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', background: '#111827', padding: '0.35rem 0.6rem', borderRadius: '4px' }}
                >
                  <span>{item.name} <strong style={{ color: '#f97316' }}>x{item.qty}</strong></span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: '#2dd4bf' }}>{(item.price * item.qty).toLocaleString()}đ</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0 4px', height: '22px', fontSize: '0.7rem' }}
                      onClick={() => handleDispatch({ type: 'REMOVE_ITEM', id: item.id })}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: '0.85rem', paddingTop: '0.5rem', borderTop: '1px solid #1f293d', display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#f3f4f6' }}>
            <span>Tổng cộng:</span>
            <span style={{ color: '#f97316' }}>{totalPrice.toLocaleString()} VNĐ</span>
          </div>
        </div>
      </div>

      {/* Action Log Panel */}
      <div style={{ background: '#0a0f1d', borderRadius: '10px', border: '1px solid #1e293b', padding: '1.25rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#f97316', fontWeight: 600, marginBottom: '0.5rem' }}>
          📻 HỘP NHẬT KÝ ĐIỀU PHỐI (DISPATCH ACTION LOG):
        </div>
        <div className="action-log">
          {actionHistory.map((log) => (
            <div key={log.id} className="action-log-entry">
              <span style={{ color: '#6b7280' }}>[{log.time}]</span>
              <span className="badge badge-orange">{log.type}</span>
              <span style={{ color: '#94a3b8' }}>{log.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
