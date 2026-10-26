import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from './StorePage';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="tab-pane">
        <div className="lab-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#f43f5e', marginBottom: '0.5rem' }}>Không tìm thấy sản phẩm!</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
            ID sản phẩm <code>"{productId}"</code> không tồn tại trong cơ sở dữ liệu.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/store')}>
            🛒 Quay lại cửa hàng
          </button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    // Programmatic Navigation: Điều hướng sau khi hoàn thành tạo đơn
    navigate('/checkout-success', {
      state: {
        productName: product.name,
        price: product.price,
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      },
    });
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        {/* Breadcrumb using Link */}
        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
          <Link to="/" style={{ color: '#38bdf8' }}>Trang chủ</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to="/store" style={{ color: '#38bdf8' }}>Cửa hàng</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid-2">
          {/* Product Image / Icon */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '7rem',
            minHeight: '260px',
          }}>
            {product.img}
          </div>

          {/* Product Details */}
          <div>
            <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>
              {product.category}
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.75rem' }}>
              {product.name}
            </h1>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#38bdf8', marginBottom: '1rem' }}>
              {product.price}
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Sản phẩm chính hãng phân phối tại Việt Nam. Bảo hành 12 tháng tại các trung tâm ủy quyền toàn quốc. Giao hàng hỏa tốc trong 2 giờ.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={handleBuyNow} style={{ minWidth: '150px' }}>
                ⚡ Mua Ngay (useNavigate)
              </button>
              <button className="btn btn-outline" onClick={() => navigate(-1)}>
                ⬅️ Quay Lại (navigate -1)
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#f8fafc' }}>
            Các sản phẩm khác bạn có thể thích (&lt;Link&gt;):
          </h3>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                style={{
                  flex: '0 0 200px',
                  padding: '0.85rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{item.img}</span>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#f8fafc' }}>{item.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '700' }}>{item.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
