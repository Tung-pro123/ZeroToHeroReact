import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchParamsStudioPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read params with fallbacks
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'featured';
  const page = Number(searchParams.get('page') || '1');

  // Master product list
  const allProducts = useMemo(() => [
    { id: 1, name: 'MacBook Pro 14 M3', category: 'laptops', price: 39990000, rating: 4.9, img: '💻' },
    { id: 2, name: 'iPhone 15 Pro 128GB', category: 'phones', price: 25990000, rating: 4.8, img: '📱' },
    { id: 3, name: 'Sony WH-1000XM5 ANC', category: 'audio', price: 6990000, rating: 4.7, img: '🎧' },
    { id: 4, name: 'Dell XPS 15 OLED', category: 'laptops', price: 44500000, rating: 4.6, img: '💻' },
    { id: 5, name: 'Samsung Galaxy S24 Ultra', category: 'phones', price: 27990000, rating: 4.8, img: '📱' },
    { id: 6, name: 'AirPods Pro 2 USB-C', category: 'audio', price: 5490000, rating: 4.9, img: '🎧' },
    { id: 7, name: 'iPad Pro 11 M4', category: 'accessories', price: 23990000, rating: 4.9, img: '📱' },
    { id: 8, name: 'Logitech MX Master 3S', category: 'accessories', price: 2190000, rating: 4.8, img: '🖱️' },
    { id: 9, name: 'Asus ROG Zephyrus G16', category: 'laptops', price: 52990000, rating: 4.7, img: '💻' },
    { id: 10, name: 'Google Pixel 8 Pro', category: 'phones', price: 18990000, rating: 4.5, img: '📱' },
    { id: 11, name: 'Bose QuietComfort Ultra', category: 'audio', price: 8990000, rating: 4.6, img: '🎧' },
    { id: 12, name: 'Apple Watch Ultra 2', category: 'accessories', price: 19990000, rating: 4.9, img: '⌚' },
  ], []);

  // Filter & Sort logic based exclusively on URL searchParams
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      const matchQuery = p.name.toLowerCase().includes(q.toLowerCase());
      const matchCat = category === 'all' || p.category === category;
      return matchQuery && matchCat;
    });

    if (sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, q, category, sort]);

  // Pagination (4 items per page)
  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper to update specific search param while retaining other existing params
  const updateQueryParam = (newParams) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === undefined || val === '' || (key === 'category' && val === 'all') || (key === 'page' && val === 1)) {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    setSearchParams(next);
  };

  const handleSearchChange = (e) => {
    updateQueryParam({ q: e.target.value, page: 1 });
  };

  const handleCategoryChange = (cat) => {
    updateQueryParam({ category: cat, page: 1 });
  };

  const handleSortChange = (e) => {
    updateQueryParam({ sort: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateQueryParam({ page: newPage });
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #34d399' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 className="card-title">
              <span>🔍</span> Search & Filter Studio: useSearchParams() Thực Chiến
            </h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>
              Toàn bộ trạng thái ô tìm kiếm, thể loại lọc, thứ tự sắp xếp và trang phân trang đều được <strong>đồng bộ 2 chiều 100% với URL</strong>.
            </p>
          </div>
          <button onClick={handleResetFilters} className="btn btn-secondary btn-sm">
            🔄 Đặt lại bộ lọc mặc định
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div style={{ background: '#030712', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            {/* Search Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                🔎 TỪ KHÓA (param: q)
              </label>
              <input
                type="text"
                placeholder="Tìm MacBook, iPhone, Sony..."
                value={q}
                onChange={handleSearchChange}
                className="form-input"
              />
            </div>

            {/* Sort Select */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                🔃 SẮP XẾP (param: sort)
              </label>
              <select value={sort} onChange={handleSortChange} className="form-select">
                <option value="featured">✨ Nổi bật nhất</option>
                <option value="price-asc">💵 Giá tăng dần (Thấp → Cao)</option>
                <option value="price-desc">💎 Giá giảm dần (Cao → Thấp)</option>
                <option value="rating">⭐ Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.45rem', fontWeight: 600 }}>
              🏷️ DANH MỤC (param: category)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Tất cả (All)' },
                { id: 'laptops', label: 'Laptop & Máy tính' },
                { id: 'phones', label: 'Điện thoại thông minh' },
                { id: 'audio', label: 'Tai nghe & Âm thanh' },
                { id: 'accessories', label: 'Phụ kiện cao cấp' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCategoryChange(c.id)}
                  className={`btn btn-sm ${category === c.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: '9999px', fontSize: '0.82rem' }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Query String Inspector */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(52, 211, 153, 0.08)', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.25)', fontSize: '0.85rem' }}>
          <div>
            <span style={{ color: '#34d399', fontWeight: 700 }}>URL Query String hiện tại: </span>
            <code style={{ color: '#f8fafc' }}>{searchParams.toString() ? `?${searchParams.toString()}` : '(rỗng - mặc định)'}</code>
          </div>
          <div style={{ color: '#94a3b8' }}>
            Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm • Trang <strong>{currentPage}/{totalPages}</strong>
          </div>
        </div>

        {/* Product Cards Grid */}
        {paginatedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '12px', border: '1px dashed rgba(255, 255, 255, 0.15)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
            <h4 style={{ color: '#f8fafc', marginBottom: '0.3rem' }}>Không tìm thấy sản phẩm phù hợp</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Thử xóa bớt bộ lọc hoặc gõ từ khóa khác.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
            {paginatedProducts.map((p) => (
              <div key={p.id} className="product-card">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ fontSize: '2.2rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.8rem', borderRadius: '10px' }}>
                    {p.img}
                  </div>
                  <div>
                    <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                      {p.name}
                    </h4>
                    <span className="badge badge-cyan" style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                      {p.category}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399' }}>
                    {p.price.toLocaleString('vi-VN')}₫
                  </div>
                  <div style={{ color: '#fbbf24', fontSize: '0.88rem', fontWeight: 600 }}>
                    ⭐ {p.rating} / 5.0
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="btn btn-secondary btn-sm"
            style={{ opacity: currentPage <= 1 ? 0.4 : 1 }}
          >
            ← Trang trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
            <button
              key={pNum}
              onClick={() => handlePageChange(pNum)}
              className={`btn btn-sm ${currentPage === pNum ? 'btn-primary' : 'btn-secondary'}`}
              style={{ minWidth: '36px' }}
            >
              {pNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="btn btn-secondary btn-sm"
            style={{ opacity: currentPage >= totalPages ? 0.4 : 1 }}
          >
            Trang sau →
          </button>
        </div>
      </div>
    </div>
  );
}
