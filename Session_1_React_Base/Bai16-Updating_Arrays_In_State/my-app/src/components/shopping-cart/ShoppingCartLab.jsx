import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const initialProducts = [
  { id: 1, name: '🥖 Bánh mì que Hải Phòng', price: 15000, count: 2 },
  { id: 2, name: '☕ Cà phê muối Huế', price: 30000, count: 1 },
  { id: 3, name: '🧋 Trà sữa trân châu hoàng gia', price: 45000, count: 1 },
];

export default function ShoppingCartLab() {
  const [products, setProducts] = useState(initialProducts);

  // Challenge 1: Tăng số lượng với map
  const handleIncrease = (productId) => {
    setProducts(
      products.map((p) => {
        if (p.id === productId) {
          return { ...p, count: p.count + 1 };
        }
        return p;
      })
    );
  };

  // Challenge 2: Giảm số lượng và tự động xóa nếu count về 0 (map kết hợp filter)
  const handleDecrease = (productId) => {
    const updated = products
      .map((p) => {
        if (p.id === productId) {
          return { ...p, count: p.count - 1 };
        }
        return p;
      })
      .filter((p) => p.count > 0); // Lọc bỏ sản phẩm có count <= 0

    setProducts(updated);
  };

  const totalPrice = products.reduce((sum, p) => sum + p.price * p.count, 0);

  const handleReset = () => {
    setProducts(initialProducts);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🛒 Thử Thách 1 & 2: Giỏ Hàng Mua Sắm (Map & Filter)</h2>
        <p className="lab-card-desc">
          Tái hiện thử thách trong React Docs: Bấm nút cộng để tăng số lượng, bấm nút trừ để giảm và tự động xóa sản phẩm khi số lượng về 0.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất Kỹ Thuật: map() kết hợp filter()">
        Khi giảm số lượng, chúng ta dùng <code>map()</code> để trừ đi 1 đơn vị, sau đó dùng ngay <code>filter(p => p.count &gt; 0)</code> 
        để loại bỏ những món đồ đã hết. Cả hai hàm đều không gây đột biến mảng gốc.
      </InfoBox>

      {/* Cart Table */}
      {products.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#0f172a', borderRadius: '12px', margin: '1.5rem 0' }}>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '1rem' }}>
            🛒 Giỏ hàng của bạn đang trống!
          </p>
          <button className="btn btn-primary" onClick={handleReset}>
            🔄 Nạp Lại Sản Phẩm
          </button>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Tên Món Ăn</th>
                <th>Đơn Giá</th>
                <th style={{ textAlign: 'center' }}>Số Lượng</th>
                <th style={{ textAlign: 'right' }}>Thành Tiền</th>
                <th style={{ textAlign: 'center' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td style={{ color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    {p.price.toLocaleString('vi-VN')} đ
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
                      {p.count}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    {(p.price * p.count).toLocaleString('vi-VN')} đ
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleDecrease(p.id)}
                        title="Giảm (hoặc xóa nếu về 0)"
                      >
                        ➖
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleIncrease(p.id)}
                        title="Tăng số lượng"
                      >
                        ➕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cart Summary */}
      {products.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#090d16', padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Tổng cộng thanh toán:</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              {totalPrice.toLocaleString('vi-VN')} VNĐ
            </div>
          </div>
          <button className="btn btn-secondary" onClick={handleReset}>
            🔄 Đặt Lại Giỏ Hàng
          </button>
        </div>
      )}

      {/* Code snippet */}
      <div style={{ marginTop: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn hàm handleDecrease (Challenge 2):</span>
        <pre className="code-pill">
{`function handleDecrease(productId) {\n  setProducts(\n    products\n      .map(p => p.id === productId ? { ...p, count: p.count - 1 } : p)\n      .filter(p => p.count > 0) // Tự động xóa khỏi giỏ nếu số lượng = 0!\n  );\n}`}
        </pre>
      </div>
    </div>
  );
}
