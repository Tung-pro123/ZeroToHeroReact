import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function DynamicFormLab() {
  const [person, setPerson] = useState({
    firstName: 'Tùng',
    lastName: 'Lê',
    email: 'tung.le@fpt.edu.vn',
    role: 'Frontend Architect',
    city: 'Hà Nội',
  });

  const [forgetSpread, setForgetSpread] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (forgetSpread) {
      // ❌ BẪY NGUY HIỂM: Quên ...person -> Xóa sạch các trường còn lại!
      setPerson({
        [name]: value,
      });
    } else {
      // ✅ CHUẨN: Rải ...person rồi mới ghi đè trường tương ứng
      setPerson({
        ...person,
        [name]: value,
      });
    }
  };

  const handleReset = () => {
    setPerson({
      firstName: 'Tùng',
      lastName: 'Lê',
      email: 'tung.le@fpt.edu.vn',
      role: 'Frontend Architect',
      city: 'Hà Nội',
    });
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">📝 Form Hồ Sơ Đa Trường (Spread & Computed Name)</h2>
        <p className="lab-card-desc">
          Sử dụng 1 hàm duy nhất xử lý hàng loạt ô input với cú pháp <code>[e.target.name]: e.target.value</code> và toán tử Spread.
        </p>
      </div>

      <InfoBox
        type={forgetSpread ? 'danger' : 'tip'}
        title={forgetSpread ? 'CẢNH BÁO: Đang Bật Bẫy Quên Toán Tử Spread (...)' : 'Cách Xử Lý Chuẩn Mực Cho Mọi Form'}
      >
        {forgetSpread
          ? 'Thử gõ một ký tự vào bất kỳ ô nào: Bạn sẽ thấy TOÀN BỘ các ô khác bị biến mất khỏi State do không có ...person bảo toàn!'
          : 'Toán tử ...person sao chép toàn bộ các trường cũ, sau đó [e.target.name] chỉ ghi đè đúng trường đang được người dùng nhập liệu.'}
      </InfoBox>

      {/* Trap Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Chế độ xử lý:</span>
        <button
          className={`btn ${!forgetSpread ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setForgetSpread(false)}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ✅ Chuẩn: {'{ ...person, [name]: value }'}
        </button>
        <button
          className={`btn ${forgetSpread ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setForgetSpread(true)}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ⚠️ Bẫy Quên Spread: {'{ [name]: value }'}
        </button>
      </div>

      {/* Input Form Grid */}
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Tên (firstName):</label>
          <input
            className="form-input"
            name="firstName"
            value={person.firstName || ''}
            onChange={handleChange}
            placeholder="Nhập tên..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Họ đệm (lastName):</label>
          <input
            className="form-input"
            name="lastName"
            value={person.lastName || ''}
            onChange={handleChange}
            placeholder="Nhập họ..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            name="email"
            value={person.email || ''}
            onChange={handleChange}
            placeholder="Nhập email..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Chức danh (role):</label>
          <input
            className="form-input"
            name="role"
            value={person.role || ''}
            onChange={handleChange}
            placeholder="Nhập vai trò..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Thành phố (city):</label>
          <input
            className="form-input"
            name="city"
            value={person.city || ''}
            onChange={handleChange}
            placeholder="Nhập thành phố..."
          />
        </div>
      </div>

      {/* Live Profile Card Preview */}
      <div className="profile-preview-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h4 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🪪</span>
            <span>Thẻ Hồ Sơ Trực Quan (Live State Preview)</span>
          </h4>
          <button className="btn btn-secondary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }} onClick={handleReset}>
            🔄 Khôi phục ban đầu
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: '#090d16', padding: '1rem', borderRadius: '8px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Họ và tên:</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
              {(person.lastName || '') + ' ' + (person.firstName || '') || <em style={{ color: '#ef4444' }}>Đã bị xóa mất!</em>}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Email:</span>
            <div style={{ fontSize: '0.95rem', color: '#38bdf8' }}>
              {person.email || <em style={{ color: '#ef4444' }}>Đã bị xóa mất!</em>}
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Chức danh & Nơi ở:</span>
            <div style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>
              {(person.role || '---') + ' • ' + (person.city || '---')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
