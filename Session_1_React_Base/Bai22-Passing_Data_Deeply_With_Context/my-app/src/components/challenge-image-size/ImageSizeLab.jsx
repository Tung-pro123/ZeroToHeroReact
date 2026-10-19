import { useState, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// 1. Context dành cho giải pháp React.dev Challenge 1
const ImageSizeContext = createContext(120);

// Danh sách địa danh lấy cảm hứng từ tài liệu chuẩn React.dev
const PLACES = [
  {
    id: 1,
    name: 'Bo-Kaap, Cape Town',
    description: 'Khu phố rực rỡ sắc màu lịch sử của Nam Phi với những ngôi nhà sơn màu pastel nổi bật.',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Núi Cầu Vồng Vinicunca, Peru',
    description: 'Kỳ quan địa chất thuộc dãy Andes với các dải khoáng chất nhiều màu xếp tầng tự nhiên.',
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Hồ Como, Ý',
    description: 'Viên ngọc vùng Lombardy với làn nước trong vắt nép mình bên dãy Alps thơ mộng.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Chùa Vàng Kinkaku-ji, Kyoto',
    description: 'Di sản thiền phái Zen của Nhật Bản với 2 tầng trên dát vàng lá rực rỡ soi bóng mặt nước.',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
  },
];

export default function ImageSizeLab() {
  const [isLarge, setIsLarge] = useState(false);
  const [solutionMode, setSolutionMode] = useState('context'); // 'drilling' | 'context'
  const imageSize = isLarge ? 160 : 90;

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🖼️</span> Bài Lab 4: Thử Thách React.dev Challenge 1 (Zoom Ảnh Với Context)
        </h2>
        <p className="lab-card-desc">
          Giải quyết bài toán kinh điển trong tài liệu React chính thống: Điều khiển kích thước ảnh hiển thị trong danh sách mà không cần truyền prop qua <code>List</code> và <code>Place</code>.
        </p>
      </div>

      {/* Control Switcher */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.7)',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: 600 }}>
            <input
              type="checkbox"
              checked={isLarge}
              onChange={(e) => setIsLarge(e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem', accentColor: '#06b6d4', cursor: 'pointer' }}
            />
            <span>Sử dụng ảnh kích thước lớn ({isLarge ? '160px' : '90px'})</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn btn-sm ${solutionMode === 'drilling' ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => setSolutionMode('drilling')}
          >
            ❌ Trước khi sửa (Truyền prop qua List & Place)
          </button>
          <button
            className={`btn btn-sm ${solutionMode === 'context' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSolutionMode('context')}
          >
            ✅ Giải pháp Challenge 1 (Dùng ImageSizeContext)
          </button>
        </div>
      </div>

      {solutionMode === 'drilling' ? (
        <InfoBox type="warning" title="Đề bài Challenge 1 từ React.dev:">
          Hiện tại, <code>App</code> truyền <code>imageSize</code> tới <code>List</code>, rồi <code>List</code> truyền tiếp tới mỗi <code>Place</code>, và cuối cùng <code>Place</code> mới chuyển cho <code>PlaceImage</code>.
          Hãy gỡ bỏ prop <code>imageSize</code> khỏi <code>List</code> và <code>Place</code>, thay bằng <code>ImageSizeContext</code>!
        </InfoBox>
      ) : (
        <InfoBox type="tip" title="Lời giải xuất sắc:">
          Tạo <code>ImageSizeContext = createContext(90)</code>. Bọc danh sách bằng <code>&lt;ImageSizeContext.Provider value={'{imageSize}'}&gt;</code>.
          Trong <code>PlaceImage</code>, ta chỉ việc gọi <code>const imageSize = useContext(ImageSizeContext);</code>. Cả <code>List</code> và <code>Place</code> hoàn toàn sạch bóng prop!
        </InfoBox>
      )}

      {/* Render Component Tree based on solution mode */}
      <div style={{ marginTop: '1.5rem' }}>
        {solutionMode === 'drilling' ? (
          <DrillingList places={PLACES} imageSize={imageSize} />
        ) : (
          <ImageSizeContext.Provider value={imageSize}>
            <CleanContextList places={PLACES} />
          </ImageSizeContext.Provider>
        )}
      </div>

      {/* Step by step guide */}
      <div style={{
        marginTop: '2rem',
        background: '#0a0f1d',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #1e293b',
      }}>
        <div style={{ fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.6rem' }}>
          💡 3 Bước Hoàn Thành Thử Thách Này:
        </div>
        <ol style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          <li>
            <strong>Bước 1 (Tạo Context):</strong> Tạo file <code>Context.js</code> xuất ra <code>export const ImageSizeContext = createContext(100);</code>.
          </li>
          <li>
            <strong>Bước 2 (Cung cấp giá trị):</strong> Bọc thẻ <code>&lt;List&gt;</code> trong <code>App.js</code> bằng <code>&lt;ImageSizeContext.Provider value={'{imageSize}'}&gt;</code> và xóa bỏ prop <code>imageSize</code> khỏi <code>List</code>.
          </li>
          <li>
            <strong>Bước 3 (Tiêu thụ dữ liệu):</strong> Trong <code>PlaceImage.js</code>, nhập <code>useContext(ImageSizeContext)</code> và xóa prop <code>imageSize</code> ở tham số component.
          </li>
        </ol>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MODE 1: PROB DRILLING (BEFORE FIX)
// ----------------------------------------------------
function DrillingList({ places, imageSize }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '0.85rem', color: '#fda4af' }}>
        ⚠️ <code>List</code> phải nhận <code>imageSize</code> và lặp lại truyền cho từng <code>Place</code>:
      </div>
      {places.map((place) => (
        <DrillingPlace key={place.id} place={place} imageSize={imageSize} />
      ))}
    </div>
  );
}

function DrillingPlace({ place, imageSize }) {
  return (
    <div style={{
      display: 'flex',
      gap: '1.25rem',
      padding: '1rem',
      borderRadius: '10px',
      background: 'rgba(244, 63, 94, 0.05)',
      border: '1px dashed #f43f5e',
      alignItems: 'center',
    }}>
      <DrillingPlaceImage place={place} imageSize={imageSize} />
      <div>
        <h4 style={{ margin: '0 0 0.35rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>{place.name}</h4>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{place.description}</p>
        <span className="badge badge-rose" style={{ marginTop: '0.5rem' }}>
          Prop imageSize: {imageSize}px (Được chuyển tiếp qua Place)
        </span>
      </div>
    </div>
  );
}

function DrillingPlaceImage({ place, imageSize }) {
  return (
    <img
      src={place.imageUrl}
      alt={place.name}
      style={{
        width: `${imageSize}px`,
        height: `${imageSize}px`,
        objectFit: 'cover',
        borderRadius: '8px',
        border: '2px solid #f43f5e',
        flexShrink: 0,
        transition: 'all 0.3s ease',
      }}
    />
  );
}

// ----------------------------------------------------
// MODE 2: CONTEXT SOLUTION (AFTER FIX)
// ----------------------------------------------------
function CleanContextList({ places }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '0.85rem', color: '#a5f3fc' }}>
        ✨ <code>List</code> chỉ nhận prop <code>places</code>. Hoàn toàn sạch sẽ:
      </div>
      {places.map((place) => (
        <CleanContextPlace key={place.id} place={place} />
      ))}
    </div>
  );
}

function CleanContextPlace({ place }) {
  return (
    <div style={{
      display: 'flex',
      gap: '1.25rem',
      padding: '1rem',
      borderRadius: '10px',
      background: 'rgba(6, 182, 212, 0.05)',
      border: '1px solid rgba(6, 182, 212, 0.3)',
      alignItems: 'center',
    }}>
      <CleanContextPlaceImage place={place} />
      <div>
        <h4 style={{ margin: '0 0 0.35rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>{place.name}</h4>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{place.description}</p>
        <span className="badge badge-cyan" style={{ marginTop: '0.5rem' }}>
          Zero Prop Drilling • Teleport trực tiếp từ Provider
        </span>
      </div>
    </div>
  );
}

function CleanContextPlaceImage({ place }) {
  // Teleport trực tiếp từ ImageSizeContext!
  const imageSize = useContext(ImageSizeContext);

  return (
    <img
      src={place.imageUrl}
      alt={place.name}
      style={{
        width: `${imageSize}px`,
        height: `${imageSize}px`,
        objectFit: 'cover',
        borderRadius: '8px',
        border: '2px solid #06b6d4',
        boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
        flexShrink: 0,
        transition: 'all 0.3s ease',
      }}
    />
  );
}
