import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Component Nút Tái Sử Dụng trong Design System
function CustomButton({ onAction, variant = 'primary', children }) {
  const getStyle = () => {
    switch (variant) {
      case 'danger':
        return { background: 'linear-gradient(135deg, #f43f5e, #be123c)', color: '#ffffff' };
      case 'success':
        return { background: 'linear-gradient(135deg, #10b981, #059669)', color: '#ffffff' };
      case 'indigo':
        return { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#ffffff' };
      default:
        return { background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#ffffff' };
    }
  };

  return (
    <button
      onClick={onAction}
      style={{
        ...getStyle(),
        padding: '0.65rem 1.25rem',
        borderRadius: '8px',
        fontWeight: 600,
        fontSize: '0.9rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        transition: 'transform 0.15s ease'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {children}
    </button>
  );
}

export default function PropsHandlerLab() {
  const [currentAction, setCurrentAction] = useState('Chưa có hành động nào.');

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🎛️ Truyền Event Handler Qua Props &amp; Đặt Tên Tùy Biến</h2>
          <p className="card-desc">
            Xây dựng các component giao diện dùng chung (Design System) bằng cách tách biệt giao diện nút bấm 
            và để Component cha truyền hành vi thực thi thông qua Props.
          </p>
        </div>
      </div>

      <div className="grid-2">
        {/* Thanh công cụ Toolbar */}
        <div className="compare-box highlight">
          <h3 className="compare-title"><span>🛠️</span> Thanh Công Cụ (Toolbar Component)</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Tất cả các nút bên dưới đều sử dụng chung một component <code>&lt;CustomButton /&gt;</code>, 
            nhưng nhận các hàm xử lý khác nhau thông qua prop <code>onAction</code>:
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <CustomButton
              variant="indigo"
              onAction={() => setCurrentAction('🎬 Đang phát phim bom tấn (Play Movie)!')}
            >
              ▶️ Play Movie
            </CustomButton>

            <CustomButton
              variant="success"
              onAction={() => setCurrentAction('📤 Đang tải ảnh chân dung lên cloud (Upload Image)!')}
            >
              ☁️ Upload Image
            </CustomButton>

            <CustomButton
              variant="danger"
              onAction={() => setCurrentAction('🗑️ Đã xóa bài viết khỏi cơ sở dữ liệu!')}
            >
              🗑️ Xóa Bài Viết
            </CustomButton>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.9)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', textTransform: 'uppercase' }}>Kết quả thực thi hiện tại:</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fcd34d', marginTop: '0.3rem' }}>
              {currentAction}
            </div>
          </div>
        </div>

        {/* Mã nguồn mẫu và nguyên tắc */}
        <div className="compare-box">
          <h3 className="compare-title"><span>📐</span> Quy Tắc Đặt Tên Prop</h3>

          <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>1. Thẻ HTML gốc:</strong> Bắt buộc dùng đúng tên sự kiện của trình duyệt 
              (<code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>).
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>2. Component tự tạo:</strong> Bạn có thể đặt tên prop tự do theo ngữ cảnh nghiệp vụ, 
              miễn là bắt đầu bằng <code>on</code> + viết hoa chữ cái đầu:
            </p>
            <ul style={{ paddingLeft: '1.25rem', color: '#93c5fd', fontFamily: 'monospace', fontSize: '0.88rem' }}>
              <li>&lt;Button onSmash=&#123;handleClick&#125; /&gt;</li>
              <li>&lt;Player onPlay=&#123;handlePlay&#125; onPause=&#123;handlePause&#125; /&gt;</li>
              <li>&lt;Uploader onUploadComplete=&#123;showSuccess&#125; /&gt;</li>
            </ul>
          </div>

          <InfoBox type="spring" title="Đối chiếu Strategy Pattern trong Java">
            Kỹ thuật truyền Event Handler qua Props tương đương với <strong>Strategy Pattern</strong> hoặc 
            việc truyền một <code>Consumer&lt;T&gt;</code> / <code>Runnable</code> vào một phương thức trong Java. 
            Nút bấm chỉ biết "gọi hàm khi được kích hoạt", hoàn toàn không bị ràng buộc vào logic cụ thể của màn hình đó!
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
