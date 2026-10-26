import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ParamsLabPage() {
  const navigate = useNavigate();
  const [customCity, setCustomCity] = useState('');
  const [shopIdInput, setShopIdInput] = useState('10');
  const [productIdInput, setProductIdInput] = useState('25');

  const cityPresets = [
    { city: 'hanoi', label: 'Hà Nội', icon: '🏛️' },
    { city: 'saigon', label: 'TP. Hồ Chí Minh', icon: '🏙️' },
    { city: 'danang', label: 'Đà Nẵng', icon: '🌉' },
    { city: 'tokyo', label: 'Tokyo', icon: '🗼' },
    { city: 'london', label: 'London', icon: '🎡' },
  ];

  const multiParamPresets = [
    { shopId: '10', productId: '25', desc: 'Shop 10 - iPhone 15 Pro Max' },
    { shopId: '7', productId: '101', desc: 'Shop 7 - Sony WH-1000XM5' },
    { shopId: '99', productId: '888', desc: 'Shop 99 - M3 Max MacBook Pro' },
  ];

  const handleCustomCitySubmit = (e) => {
    e.preventDefault();
    if (customCity.trim()) {
      navigate(`/concerts/${encodeURIComponent(customCity.trim().toLowerCase())}`);
    }
  };

  const handleMultiParamSubmit = (e) => {
    e.preventDefault();
    if (shopIdInput.trim() && productIdInput.trim()) {
      navigate(`/shops/${shopIdInput.trim()}/products/${productIdInput.trim()}`);
    }
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #38bdf8' }}>
        <h2 className="card-title">
          <span>🎯</span> Dynamic Params Lab: Khai Thác Sức Mạnh Của useParams()
        </h2>
        <p className="card-subtitle">
          Khám phá cơ chế Router bắt dynamic segment <code>:param</code>, tự động phân tích và đưa vào Component dưới dạng Object JS.
        </p>

        {/* Section 1: Single Dynamic Param */}
        <div style={{ marginTop: '1.5rem', background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#38bdf8', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>1️⃣</span> Single Param: <code>/concerts/:city</code>
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Khai báo Route: <code>&lt;Route path="/concerts/:city" element=&#123;&lt;ConcertCityPage /&gt;&#125; /&gt;</code>. 
            Trong component: <code>const &#123; city &#125; = useParams();</code>
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {cityPresets.map((c) => (
              <Link
                key={c.city}
                to={`/concerts/${c.city}`}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem' }}
              >
                <span>{c.icon}</span>
                <span>{c.label} (<code>{c.city}</code>)</span>
              </Link>
            ))}
          </div>

          <form onSubmit={handleCustomCitySubmit} style={{ display: 'flex', gap: '0.75rem', maxWidth: '500px' }}>
            <input
              type="text"
              placeholder="Nhập tên thành phố bất kỳ (vd: seoul, paris)..."
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              className="form-input"
            />
            <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Kiểm tra Dynamic Route 🚀
            </button>
          </form>
        </div>

        {/* Section 2: Multi-Segment Params */}
        <div style={{ marginTop: '1.75rem', background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#34d399', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>2️⃣</span> Multiple Params: <code>/shops/:shopId/products/:productId</code>
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Khai báo Route: <code>&lt;Route path="/shops/:shopId/products/:productId" element=&#123;&lt;ShopProductPage /&gt;&#125; /&gt;</code>.
            Trích xuất đồng thời 2 giá trị bằng destructuring: <code>const &#123; shopId, productId &#125; = useParams();</code>
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {multiParamPresets.map((m, idx) => (
              <Link
                key={idx}
                to={`/shops/${m.shopId}/products/${m.productId}`}
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem' }}
              >
                <span>📦</span>
                <span>{m.desc}</span>
              </Link>
            ))}
          </div>

          <form onSubmit={handleMultiParamSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>shopId:</span>
              <input
                type="number"
                value={shopIdInput}
                onChange={(e) => setShopIdInput(e.target.value)}
                className="form-input"
                style={{ width: '80px' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>productId:</span>
              <input
                type="number"
                value={productIdInput}
                onChange={(e) => setProductIdInput(e.target.value)}
                className="form-input"
                style={{ width: '90px' }}
              />
            </div>
            <button type="submit" className="btn btn-emerald" style={{ whiteSpace: 'nowrap' }}>
              Điều hướng đến Shop/Product ⚡
            </button>
          </form>
        </div>

        {/* Cạm Bẫy Cốt Tử: Kiểu Dữ Liệu String */}
        <div style={{ marginTop: '1.75rem', background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#fb7185', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚠️</span> CẠM BẪY PHỔ BIẾN NHẤT CỦA useParams: Luôn Trả Về String!
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            Khi URL là <code>/products/15</code>, <code>useParams().productId</code> trả về <strong>chuỗi <code>"15"</code></strong>, KHÔNG PHẢI số <code>15</code>.
          </p>
          <div className="code-box">
            <span className="code-keyword">const</span> &#123; productId &#125; = <span className="code-fn">useParams</span>();<br />
            <span className="code-comment">// ❌ SAI LẦM: So sánh nghiêm ngặt triple-equals sẽ FALSE</span><br />
            <span className="code-keyword">if</span> (productId === <span className="code-type">15</span>) &#123; <span className="code-comment">/* Không bao giờ chạy vì "15" !== 15 */</span> &#125;<br /><br />
            <span className="code-comment">// ✅ GIẢI PHÁP: Chủ động ép kiểu sang Number</span><br />
            <span className="code-keyword">const</span> id = <span className="code-fn">Number</span>(productId);<br />
            <span className="code-keyword">if</span> (id === <span className="code-type">15</span>) &#123; <span className="code-comment">/* Luôn chính xác */</span> &#125;
          </div>
        </div>
      </div>
    </div>
  );
}
