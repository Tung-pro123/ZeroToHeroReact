import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="tab-pane">
      <div className="lab-card" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '4.5rem', fontWeight: '800', color: '#f43f5e', fontFamily: 'JetBrains Mono' }}>
          404
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Không tìm thấy trang yêu cầu</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Đường dẫn URL bạn vừa truy cập không khớp với bất kỳ Route nào được cấu hình trong Router.
        </p>
        <Link to="/" className="btn btn-primary">
          🏠 Quay lại Trang Chủ
        </Link>
      </div>
    </div>
  );
}
