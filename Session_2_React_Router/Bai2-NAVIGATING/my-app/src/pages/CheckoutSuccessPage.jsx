import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function CheckoutSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Đọc dữ liệu được truyền thông qua navigate(url, { state: ... })
  const orderData = location.state || {
    orderId: 'ORD-DEMO',
    productName: 'Sản phẩm demo',
    price: '0 ₫',
  };

  return (
    <div className="tab-pane">
      <div className="lab-card" style={{ maxWidth: '640px', margin: '2rem auto', textAlign: 'center', padding: '2.5rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>ĐẶT HÀNG THÀNH CÔNG</span>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '0.5rem' }}>
          Cảm ơn bạn đã mua sắm!
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Đơn hàng của bạn đã được ghi nhận vào hệ thống cơ sở dữ liệu.
        </p>

        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '1.25rem',
          textAlign: 'left',
          marginBottom: '1.5rem',
          fontSize: '0.88rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#94a3b8' }}>Mã đơn hàng:</span>
            <strong style={{ color: '#38bdf8', fontFamily: 'JetBrains Mono' }}>{orderData.orderId}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: '#94a3b8' }}>Sản phẩm:</span>
            <strong style={{ color: '#fff' }}>{orderData.productName}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>Tổng tiền:</span>
            <strong style={{ color: '#10b981' }}>{orderData.price}</strong>
          </div>
        </div>

        <div className="code-box" style={{ textAlign: 'left', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#38bdf8' }}>Dữ liệu nhận từ `location.state`:</strong>
          <pre style={{ marginTop: '0.4rem', color: '#cbd5e1' }}>
{`// Ở trang trước:
navigate('/checkout-success', { state: { orderId: '...', ... } });

// Ở trang này:
const location = useLocation();
const orderData = location.state;`}
          </pre>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => navigate('/store')}>
            🛒 Tiếp tục mua sắm
          </button>
          <Link to="/" className="btn btn-outline">
            🏠 Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
