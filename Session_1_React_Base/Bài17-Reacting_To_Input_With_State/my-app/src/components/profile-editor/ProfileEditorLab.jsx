import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function ProfileEditorLab() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Lê');
  const [lastName, setLastName] = useState('Tùng');

  // Derived state (Trạng thái phái sinh - Không cần useState!)
  const fullName = `${firstName} ${lastName}`.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">👤 Thử Thách 2: Chuyển Đổi Profile Editor</h2>
        <p className="lab-card-desc">
          Tái hiện Challenge 2 của React Docs: Chuyển đổi một form Vanilla JS đầy rẫy <code>.style.display = 'none'</code> thành code React Declarative tinh tế.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất: Derived State (fullName)">
        Không bao giờ tạo <code>const [fullName, setFullName] = useState('')</code>! Vì <code>fullName</code> hoàn toàn có thể tính toán tức thì từ 
        <code>{firstName} + ' ' + {lastName}</code>. Nhờ đó, dữ liệu họ tên không bao giờ bị lệch pha!
      </InfoBox>

      {/* Editor Form Card */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.5rem', maxWidth: '520px', margin: '1.5rem auto' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
              Họ đệm (First name):
            </label>
            {isEditing ? (
              <input
                className="form-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nhập họ..."
              />
            ) : (
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', padding: '0.4rem 0' }}>
                {firstName || <em>(Chưa có)</em>}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
              Tên gọi (Last name):
            </label>
            {isEditing ? (
              <input
                className="form-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nhập tên..."
              />
            ) : (
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', padding: '0.4rem 0' }}>
                {lastName || <em>(Chưa có)</em>}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {isEditing ? '💾 Lưu Hồ Sơ (Save Profile)' : '✏️ Chỉnh Sửa (Edit Profile)'}
            </button>
          </div>
        </form>

        {/* Live Greeting */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed #334155', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Lời chào tự động (Derived fullName):</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', marginTop: '0.25rem' }}>
            Xin chào, <strong>{fullName || 'người dùng ẩn danh'}</strong>! 👋
          </div>
        </div>
      </div>
    </div>
  );
}
