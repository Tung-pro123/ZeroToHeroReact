import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧭</div>
      <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem' }}>404 - Không Tìm Thấy Trang</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Trang bạn yêu cầu không tồn tại trong hệ thống phòng thí nghiệm validation.
      </p>
      <Link to="/" className="btn btn-primary">
        <span>🏠</span> Quay Về Trang Chủ
      </Link>
    </div>
  );
}

