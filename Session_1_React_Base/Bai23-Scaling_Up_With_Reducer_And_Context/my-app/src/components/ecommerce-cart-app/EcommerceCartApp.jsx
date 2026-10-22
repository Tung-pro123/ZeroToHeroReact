import { useState, useReducer, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// ----------------------------------------------------
// DUAL CONTEXTS FOR ENTERPRISE CART
// ----------------------------------------------------
const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

const PRODUCTS = [
  {
    id: 'p-1',
    name: 'MacBook Pro 14" M3 Pro',
    category: 'Laptop',
    price: 1999,
    stock: 8,
    image: '💻',
    description: 'Chip M3 Pro 18GB RAM, 512GB SSD, màn hình Liquid Retina XDR 120Hz.',
  },
  {
    id: 'p-2',
    name: 'Tai Nghe Sony WH-1000XM5',
    category: 'Audio',
    price: 349,
    stock: 15,
    image: '🎧',
    description: 'Chống ồn chủ động đỉnh cao, thời lượng pin 30 giờ, âm thanh Hi-Res.',
  },
  {
    id: 'p-3',
    name: 'Bàn Phím Cơ Keychron Q1 Pro',
    category: 'Peripherals',
    price: 189,
    stock: 20,
    image: '⌨️',
    description: 'Khung nhôm CNC nguyên khối, kết nối Bluetooth 5.1 & Type-C, hot-swap.',
  },
  {
    id: 'p-4',
    name: 'Màn Hình LG UltraFine 27" 4K',
    category: 'Monitor',
    price: 499,
    stock: 6,
    image: '🖥️',
    description: 'Tấm nền IPS Nano, độ phủ màu 98% DCI-P3, sạc ngược USB-C 90W.',
  },
];

const initialCartState = {
  items: [
    { id: 'p-2', name: 'Tai Nghe Sony WH-1000XM5', price: 349, quantity: 1, image: '🎧' },
  ],
  coupon: null, // { code: 'REACT23', discountPercent: 20 }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, action.product.stock) }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.product.id,
            name: action.product.name,
            price: action.product.price,
            quantity: 1,
            image: action.product.image,
          },
        ],
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id === action.id) {
              const newQty = item.quantity + action.delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean),
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }
    case 'APPLY_COUPON': {
      if (action.code.toUpperCase() === 'REACT23') {
        return { ...state, coupon: { code: 'REACT23', discountPercent: 20 } };
      }
      if (action.code.toUpperCase() === 'VIP50') {
        return { ...state, coupon: { code: 'VIP50', discountPercent: 50 } };
      }
      return state;
    }
    case 'REMOVE_COUPON': {
      return { ...state, coupon: null };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [], coupon: null };
    }
    default:
      return state;
  }
}

export default function EcommerceCartApp() {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Tính toán phái sinh (Derived State)
  const totalItemCount = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = cartState.coupon ? (subtotal * cartState.coupon.discountPercent) / 100 : 0;
  const grandTotal = Math.max(subtotal - discountAmount, 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'REACT23' || code === 'VIP50') {
      dispatch({ type: 'APPLY_COUPON', code });
      setCouponInput('');
      setCouponError('');
    } else {
      setCouponError('Mã không hợp lệ! Hãy thử: REACT23 (giảm 20%) hoặc VIP50 (giảm 50%)');
    }
  };

  const handleCheckout = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      setOrderSuccess(false);
    }, 3000);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🛒</span> Bài Lab 5: Ứng Dụng Thực Tế - Enterprise TechStore Cart Engine
        </h2>
        <p className="lab-card-desc">
          Hiện thực hóa ứng dụng Giỏ hàng Thương mại điện tử toàn diện: Quản lý thêm/bớt sản phẩm, cập nhật số lượng, kiểm tra tồn kho, áp dụng mã voucher chiết khấu bằng 100% <code>useReducer</code> + <code>useContext</code> mà không cần cài thêm Redux!
        </p>
      </div>

      <InfoBox type="tip" title="Mô hình State phân tán chuyên nghiệp:">
        <code>ProductList</code> ở bên trái và <code>CartDrawer</code> ở bên phải nằm ở 2 nhánh cây giao diện hoàn toàn độc lập.
        Nhờ Context, khi bấm "Thêm vào giỏ" ở bên trái, dữ liệu được truyền thẳng vào Reducer toàn cục và giỏ hàng bên phải cập nhật tức thì!
      </InfoBox>

      {/* Main Container with Cart Context */}
      <CartContext.Provider value={cartState}>
        <CartDispatchContext.Provider value={dispatch}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Left: Product Catalog */}
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📦</span> Danh Mục Sản Phẩm Công Nghệ
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {PRODUCTS.map((product) => (
                  <ProductItemCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Right: Cart Summary Panel */}
            <div>
              <div style={{
                background: '#0d1322',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '1.5rem',
                position: 'sticky',
                top: '1rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.15rem', margin: 0, color: 'var(--accent-emerald)' }}>
                    🛍️ Giỏ Hàng Của Bạn
                  </h3>
                  <span className="badge badge-emerald">{totalItemCount} món</span>
                </div>

                {/* Cart Line Items */}
                {cartState.items.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>Giỏ hàng hiện đang trống!</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
                    {cartState.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: '#111827',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #1f2937',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>{item.image}</span>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{item.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#10b981' }}>${item.price} / cái</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ width: '24px', height: '24px', padding: 0 }}
                            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, delta: -1 })}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ width: '24px', height: '24px', padding: 0 }}
                            onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, delta: 1 })}
                          >
                            +
                          </button>
                          <button
                            style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', marginLeft: '0.25rem' }}
                            onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                            title="Xóa món"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Coupon Code Section */}
                <form onSubmit={handleApplyCoupon} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="Mã voucher (REACT23 hoặc VIP50)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      style={{ fontSize: '0.85rem' }}
                    />
                    <button type="submit" className="btn btn-cyan btn-sm" style={{ whiteSpace: 'nowrap' }}>
                      Áp Dụng
                    </button>
                  </div>
                  {couponError && (
                    <div style={{ fontSize: '0.78rem', color: '#fca5a5', marginTop: '0.35rem' }}>
                      {couponError}
                    </div>
                  )}
                  {cartState.coupon && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.35rem 0.65rem', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <span style={{ fontSize: '0.8rem', color: '#34d399' }}>
                        🎉 Đã giảm {cartState.coupon.discountPercent}% ({cartState.coupon.code})
                      </span>
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '0.75rem' }}
                        onClick={() => dispatch({ type: 'REMOVE_COUPON' })}
                      >
                        Gỡ bỏ
                      </button>
                    </div>
                  )}
                </form>

                {/* Price Breakdown */}
                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Tạm tính (Subtotal):</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {cartState.coupon && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                      <span>Chiết khấu ({cartState.coupon.discountPercent}%):</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', borderTop: '1px solid #1f2937', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                    <span>Tổng thanh toán:</span>
                    <span style={{ color: '#10b981' }}>${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem' }}
                  disabled={cartState.items.length === 0 || orderSuccess}
                  onClick={handleCheckout}
                >
                  {orderSuccess ? '🎉 Đặt Hàng Thành Công!' : '🚀 Tiến Hành Đặt Hàng'}
                </button>
              </div>
            </div>
          </div>
        </CartDispatchContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

function ProductItemCard({ product }) {
  const dispatch = useContext(CartDispatchContext);
  const cartState = useContext(CartContext);

  const cartItem = cartState?.items.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = currentQuantity >= product.stock;

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid #1e293b',
      borderRadius: '10px',
      padding: '1.15rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      transition: 'border-color 0.2s',
    }}>
      <div style={{ fontSize: '2.5rem', width: '55px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090d16', borderRadius: '8px', border: '1px solid #1f2937' }}>
        {product.image}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-main)' }}>{product.name}</h4>
          <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1rem' }}>${product.price}</span>
        </div>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: isOutOfStock ? '#f43f5e' : 'var(--text-dim)' }}>
            Kho: {product.stock} cái {currentQuantity > 0 && `(Đã chọn: ${currentQuantity})`}
          </span>
          <button
            className={`btn btn-sm ${isOutOfStock ? 'btn-secondary' : 'btn-primary'}`}
            disabled={isOutOfStock}
            onClick={() => dispatch({ type: 'ADD_ITEM', product })}
          >
            {isOutOfStock ? 'Hết hàng' : '🛒 Thêm vào giỏ'}
          </button>
        </div>
      </div>
    </div>
  );
}
