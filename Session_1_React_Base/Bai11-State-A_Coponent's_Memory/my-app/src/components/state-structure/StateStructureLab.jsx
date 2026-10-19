import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function StateStructureLab() {
  // 1. TÁCH RIÊNG: Các dữ liệu độc lập
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. GỘP OBJECT (DTO Pattern): Các dữ liệu luôn đi cùng nhau
  const [userDto, setUserDto] = useState({
    fullName: 'Lê Thanh Tùng',
    email: 'tung.dev@gmail.com',
    role: 'Backend & Frontend Engineer',
    department: 'Software Engineering'
  });

  const handleDtoChange = (e) => {
    setUserDto((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">📋 Cấu Trúc State: Khi Nào Tách Biến vs Khi Nào Gộp Object DTO?</h2>
          <p className="card-desc">
            Lựa chọn chiến lược tổ chức State hợp lý giúp giảm thiểu công sức viết code, 
            tránh rải Spread thừa thãi và dễ dàng giao tiếp với backend API.
          </p>
        </div>
      </div>

      <div className="grid-2">
        {/* Trường hợp 1: Tách riêng */}
        <div className="compare-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>🔲</span> 1. Nên TÁCH RIÊNG: Dữ Liệu Độc Lập</h3>
            <span className="badge badge-react">Tách Biến</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Ví dụ: Cài đặt hiển thị đọc tin tức (Cỡ chữ và Chế độ tối) thay đổi riêng rẽ, không dính líu đến nhau.
          </p>

          <div style={{
            background: isDarkMode ? '#0f172a' : '#f8fafc',
            color: isDarkMode ? '#f8fafc' : '#0f172a',
            padding: '1.25rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            transition: 'all 0.3s ease'
          }}>
            <p style={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}>
              "React state giúp component ghi nhớ mọi tương tác của bạn một cách mượt mà."
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>Cỡ chữ: {fontSize}px</span>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button className="btn-secondary" onClick={() => setFontSize(14)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>14px</button>
                <button className="btn-secondary" onClick={() => setFontSize(16)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>16px</button>
                <button className="btn-secondary" onClick={() => setFontSize(20)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>20px</button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>Chế độ nền tối:</span>
              <button
                className="btn-primary"
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
              >
                {isDarkMode ? '🌙 Nền Tối' : '☀️ Nền Sáng'}
              </button>
            </div>
          </div>
        </div>

        {/* Trường hợp 2: Gộp Object DTO */}
        <div className="compare-box highlight">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>📦</span> 2. Nên GỘP OBJECT: Dữ Liệu Cùng Thực Thể (DTO)</h3>
            <span className="badge badge-memory">Gộp DTO</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Ví dụ: Biểu mẫu thông tin nhân viên cần đóng gói thành 1 JSON object để gửi lên Spring Boot API.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Họ Tên:</label>
              <input
                type="text"
                name="fullName"
                value={userDto.fullName}
                onChange={handleDtoChange}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.2rem' }}>Vị Trí / Role:</label>
              <input
                type="text"
                name="role"
                value={userDto.role}
                onChange={handleDtoChange}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <div style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              JSON Payload (Sẵn sàng gửi tới @RequestBody):
            </div>
            <pre style={{ color: '#a7f3d0', fontSize: '0.78rem', overflowX: 'auto' }}>
              {JSON.stringify(userDto, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <InfoBox type="spring" title="Tư duy DTO trong Fullstack Development">
        Khi làm việc với Java Spring Boot Backend, việc gộp các trường của Form thành một Object State duy nhất 
        giúp bạn chỉ cần viết duy nhất 1 hàm xử lý <code>handleChange(e)</code> với dynamic key <code>[e.target.name]</code>, 
        và dữ liệu luôn sẵn sàng ở định dạng JSON để gửi thẳng vào endpoint <code>@PostMapping("/api/users")</code>!
      </InfoBox>
    </div>
  );
}
