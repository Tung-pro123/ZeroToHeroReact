import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ShopProductPage() {
  const { shopId, productId } = useParams();

  // Mock product catalog
  const mockDatabase = {
    '10-25': {
      title: 'iPhone 15 Pro Max 256GB - Titan Tự Nhiên',
      shopName: 'Apple Flagship Store Premium (Shop #10)',
      price: '29.990.000₫',
      status: 'Còn hàng',
      category: 'Điện thoại',
      rating: 4.9,
      reviewsCount: 1420
    },
    '7-101': {
      title: 'Tai nghe Chống ồn Sony WH-1000XM5 Hi-Res',
      shopName: 'Sony Official Sound Hub (Shop #7)',
      price: '6.990.000₫',
      status: 'Sắp hết',
      category: 'Âm thanh',
      rating: 4.8,
      reviewsCount: 830
    },
    '99-888': {
      title: 'MacBook Pro 16 inch M3 Max (36GB RAM / 1TB SSD)',
      shopName: 'MegaTech Enterprise Center (Shop #99)',
      price: '89.990.000₫',
      status: 'Sẵn hàng tại kho',
      category: 'Máy tính cao cấp',
      rating: 5.0,
      reviewsCount: 215
    }
  };

  const key = `${shopId}-${productId}`;
  const product = mockDatabase[key] || {
    title: `Sản Phẩm Tùy Chỉnh (Mã #${productId})`,
    shopName: `Cửa hàng đối tác #${shopId}`,
    price: '1.500.000₫',
    status: 'Còn hàng',
    category: 'Tổng hợp',
    rating: 4.5,
    reviewsCount: 50
  };

  const numericProductId = Number(productId);

  return (
    <div>
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/params-lab" className="btn btn-secondary btn-sm">
          ← Quay lại Dynamic Params Lab
        </Link>
      </div>

      <div className="glass-card" style={{ borderLeft: '4px solid #34d399' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-purple">shopId: {shopId}</span>
              <span className="badge badge-cyan">productId: {productId}</span>
            </div>
            <h2 className="card-title" style={{ fontSize: '1.6rem' }}>
              📦 {product.title}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Phân phối bởi: <strong style={{ color: '#38bdf8' }}>{product.shopName}</strong>
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>
              {product.price}
            </div>
            <span className="badge badge-emerald">{product.status}</span>
          </div>
        </div>

        {/* Dynamic Params Inspector Panel */}
        <div style={{ background: '#030712', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            🔬 Kiểm tra kiểu dữ liệu của useParams()
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.88rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.8rem', borderRadius: '8px' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>typeof productId từ useParams()</div>
              <div style={{ color: '#fb7185', fontWeight: 700, marginTop: '0.2rem' }}>
                "{productId}" ({typeof productId})
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                productId === {productId} ➜ <span style={{ color: '#f43f5e' }}>false</span> (So sánh string !== number)
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.8rem', borderRadius: '8px' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Sau khi Number(productId)</div>
              <div style={{ color: '#34d399', fontWeight: 700, marginTop: '0.2rem' }}>
                {numericProductId} ({typeof numericProductId})
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                Number(productId) === {productId} ➜ <span style={{ color: '#34d399' }}>true</span> (An toàn tuyệt đối)
              </div>
            </div>
          </div>
        </div>

        {/* Backend Mapping */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '1rem 1.25rem', borderRadius: '10px' }}>
          <div style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
            ☕ Tương ứng với Spring Boot Backend Controller:
          </div>
          <div className="code-box" style={{ margin: 0 }}>
            <span className="code-keyword">@GetMapping</span>(<span className="code-str">"/shops/&#123;shopId&#125;/products/&#123;productId&#125;"</span>)<br />
            <span className="code-keyword">public</span> ResponseEntity&lt;Product&gt; getProduct(<br />
            &nbsp;&nbsp;<span className="code-keyword">@PathVariable</span> Long shopId,<br />
            &nbsp;&nbsp;<span className="code-keyword">@PathVariable</span> Long productId<br />
            ) &#123; ... &#125;
          </div>
        </div>
      </div>
    </div>
  );
}
