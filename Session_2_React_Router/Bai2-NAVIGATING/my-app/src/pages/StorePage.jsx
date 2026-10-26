import { Link } from 'react-router-dom';

export const PRODUCTS = [
  { id: 'ip-15-pro', name: 'iPhone 15 Pro Max 256GB', price: '29.990.000 ₫', category: 'Smartphone', img: '📱', stock: 12 },
  { id: 'mb-pro-m3', name: 'MacBook Pro 14" M3 Pro', price: '49.990.000 ₫', category: 'Laptop', img: '💻', stock: 5 },
  { id: 'sony-wh1000xm5', name: 'Sony WH-1000XM5 Wireless', price: '7.990.000 ₫', category: 'Audio', img: '🎧', stock: 20 },
  { id: 'ipad-pro-m4', name: 'iPad Pro 11" M4 OLED', price: '26.990.000 ₫', category: 'Tablet', img: '📱', stock: 8 },
  { id: 'keychron-q1', name: 'Bàn phím cơ Keychron Q1 Pro', price: '4.290.000 ₫', category: 'Accessories', img: '⌨️', stock: 15 },
  { id: 'logi-mx-master-3s', name: 'Chuột Logitech MX Master 3S', price: '2.190.000 ₫', category: 'Accessories', img: '🖱️', stock: 30 },
];

export default function StorePage() {
  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="lab-title">🛒 Cửa Hàng Trực Tuyến (Mini E-Commerce Store)</h2>
              <p className="lab-desc">
                Minh họa thực tế: Thẻ sản phẩm sử dụng <strong>&lt;Link to={`/products/${'{id}'}`}&gt;</strong> để đảm bảo chuẩn mực SEO, ngữ nghĩa hyperlink HTML, và điều hướng SPA siêu tốc.
              </p>
            </div>
            <span className="badge badge-emerald">6 SẢN PHẨM SẴN CÓ</span>
          </div>
        </div>

        <div className="grid-3">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="product-card">
              <div style={{ fontSize: '3rem', textAlign: 'center', margin: '0.5rem 0' }}>
                {product.img}
              </div>

              <span className="badge badge-indigo" style={{ alignSelf: 'flex-start', fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                {product.category}
              </span>

              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.5rem', color: '#f8fafc' }}>
                {product.name}
              </h3>

              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#38bdf8', marginBottom: '0.4rem' }}>
                {product.price}
              </div>

              <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>
                Kho hàng: {product.stock} sản phẩm
              </div>

              {/* Sử dụng <Link> cho Semantic Hyperlink */}
              <Link
                to={`/products/${product.id}`}
                className="btn btn-outline"
                style={{
                  width: '100%',
                  marginTop: 'auto',
                  borderColor: 'rgba(56, 189, 248, 0.4)',
                  color: '#38bdf8',
                }}
              >
                🔎 Xem Chi Tiết
              </Link>
            </div>
          ))}
        </div>

        <div className="alert-box alert-info" style={{ marginTop: '2rem' }}>
          <span>💡</span>
          <div>
            <strong>Tại sao thẻ sản phẩm dùng &lt;Link&gt; thay vì &lt;button onClick=&#123;navigate&#125;&gt;?</strong>
            <br />
            1. <strong>SEO & Web Crawlers:</strong> Google bot có thể cào các thẻ <code>&lt;a href&gt;</code> để lập chỉ mục chi tiết sản phẩm.
            <br />
            2. <strong>Trải nghiệm người dùng (UX):</strong> Người dùng có thể <em>Click chuột phải $\rightarrow$ Mở trong tab mới</em> hoặc giữ phím <code>Ctrl / Cmd</code> để mở nhiều sản phẩm cùng lúc.
          </div>
        </div>
      </div>
    </div>
  );
}
