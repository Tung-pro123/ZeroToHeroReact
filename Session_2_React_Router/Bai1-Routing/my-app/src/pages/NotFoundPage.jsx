import { Link, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="tab-pane">
      <div className="lab-card" style={{ maxWidth: '640px', margin: '3rem auto', textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '4.5rem', fontWeight: '800', color: '#f43f5e', fontFamily: 'JetBrains Mono' }}>
          404
        </div>
        <span className="badge badge-rose" style={{ marginBottom: '1rem' }}>
          CATCH-ALL WILDCARD: path="*"
        </span>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
          Không Tìm Thấy Đường Dẫn!
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          URL <code>"{location.pathname}"</code> không khớp với bất kỳ Route nào được khai báo. Route wildcard <code>path="*"</code> đã bắt lấy request này để hiển thị giao diện báo lỗi an toàn.
        </p>
        <Link to="/" className="btn btn-primary">
          🏠 Quay Về Trang Chủ
        </Link>
      </div>
    </div>
  );
}
