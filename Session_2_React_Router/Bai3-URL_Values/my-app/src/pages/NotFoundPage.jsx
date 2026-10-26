import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧭</div>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem' }}>
        404 - Không Tìm Thấy Đường Dẫn
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
        URL <code style={{ color: '#fb7185' }}>{location.pathname}</code> không khớp với bất kỳ Route nào được cấu hình trong Router.
      </p>
      <Link to="/" className="btn btn-primary">
        ← Quay Về Trang Chủ
      </Link>
    </div>
  );
}
