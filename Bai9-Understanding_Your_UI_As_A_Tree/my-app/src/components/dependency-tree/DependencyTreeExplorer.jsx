import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function DependencyTreeExplorer() {
  const [includeChartLib, setIncludeChartLib] = useState(false);
  const [includeUnusedUtils, setIncludeUnusedUtils] = useState(false);

  // Danh sách các module và dung lượng mô phỏng (KB)
  const coreModules = [
    { name: 'main.jsx (Entrypoint)', size: 2.4, importedBy: 'index.html', isCore: true },
    { name: 'App.jsx', size: 4.8, importedBy: 'main.jsx', isCore: true },
    { name: 'InspirationGenerator.jsx', size: 3.2, importedBy: 'App.jsx', isCore: true },
    { name: 'FancyText.jsx', size: 2.1, importedBy: 'InspirationGenerator.jsx', isCore: true },
    { name: 'ColorBox.jsx', size: 1.8, importedBy: 'InspirationGenerator.jsx', isCore: true },
    { name: 'quotes.js (Data Module)', size: 5.5, importedBy: 'InspirationGenerator.jsx', isCore: true },
    { name: 'index.css', size: 8.0, importedBy: 'main.jsx', isCore: true },
  ];

  const optionalModules = [
    {
      id: 'chart',
      name: 'heavyChartLib.js (Thư viện biểu đồ lớn)',
      size: 52.0,
      importedBy: includeChartLib ? 'App.jsx' : null,
      isActive: includeChartLib,
      toggle: () => setIncludeChartLib(!includeChartLib)
    },
    {
      id: 'utils',
      name: 'unusedDateHelper.js (Hàm tiện ích thừa)',
      size: 14.5,
      importedBy: includeUnusedUtils ? 'App.jsx' : null,
      isActive: includeUnusedUtils,
      toggle: () => setIncludeUnusedUtils(!includeUnusedUtils)
    }
  ];

  const totalCoreSize = coreModules.reduce((acc, m) => acc + m.size, 0);
  const optionalSize = optionalModules.reduce((acc, m) => acc + (m.isActive ? m.size : 0), 0);
  const totalBundleSize = (totalCoreSize + optionalSize).toFixed(1);

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">📦 Cây Phụ Thuộc Mô-đun & Bộ Giả Lập Tree-Shaking</h2>
          <p className="card-desc">
            Khác với Render Tree theo dõi các Component hiển thị, Module Dependency Tree theo dõi mối quan hệ 
            <code>import</code> giữa các tập tin để Bundler (Vite/Rollup) đóng gói và loại bỏ mã chết.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Tổng Kích Thước Gói Tải (Bundle Size)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: totalBundleSize > 50 ? '#f59e0b' : '#38bdf8' }}>
            {totalBundleSize} KB
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Bảng điều khiển Tree-shaking */}
        <div className="compare-box">
          <h3 className="compare-title">
            <span>⚙️</span> Giả Lập Thêm / Xóa Câu Lệnh <code>import</code>
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Bật/tắt các file bên dưới để xem cơ chế Tree-Shaking tự động cắt tỉa các module không có ai import:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {optionalModules.map((mod) => (
              <label
                key={mod.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  background: mod.isActive ? 'rgba(56, 189, 248, 0.12)' : 'rgba(30, 41, 59, 0.5)',
                  border: `1px solid ${mod.isActive ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: mod.isActive ? '#e0f2fe' : '#9ca3af', fontSize: '0.95rem' }}>
                    {mod.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                    Dung lượng: +{mod.size} KB
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={mod.isActive}
                  onChange={mod.toggle}
                  style={{ width: '1.2rem', height: '1.2rem', accentColor: '#38bdf8', cursor: 'pointer' }}
                />
              </label>
            ))}
          </div>

          <InfoBox title="Tree Shaking là gì?">
            Nhờ cú pháp <code>import / export</code> tĩnh của ES Modules, Bundler có thể quét toàn bộ cây phụ thuộc trước khi chạy. 
            Nếu một file không được tệp nào import, nó sẽ bị <strong>"rung cây loại bỏ" (Tree-shaken)</strong> hoàn toàn khỏi gói production!
          </InfoBox>
        </div>

        {/* Danh sách tệp trên Dependency Tree */}
        <div className="compare-box highlight">
          <h3 className="compare-title">
            <span>🌲</span> Trạng Thái Các Nút Trên Dependency Tree
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {coreModules.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 0.9rem',
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.88rem'
                }}
              >
                <div>
                  <span style={{ color: '#60a5fa', fontWeight: 600 }}>📄 {m.name}</span>
                  <span style={{ color: '#6b7280', fontSize: '0.78rem', marginLeft: '0.5rem' }}>
                    (import bởi {m.importedBy})
                  </span>
                </div>
                <span className="badge badge-react" style={{ fontSize: '0.72rem' }}>
                  {m.size} KB
                </span>
              </div>
            ))}

            {optionalModules.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.65rem 0.9rem',
                  background: m.isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(244, 63, 94, 0.05)',
                  borderRadius: '8px',
                  border: `1px dashed ${m.isActive ? 'rgba(56, 189, 248, 0.4)' : 'rgba(244, 63, 94, 0.2)'}`,
                  fontSize: '0.88rem',
                  opacity: m.isActive ? 1 : 0.5
                }}
              >
                <div>
                  <span style={{ color: m.isActive ? '#93c5fd' : '#f87171', fontWeight: 600 }}>
                    {m.isActive ? '📦' : '✂️'} {m.name}
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '0.78rem', marginLeft: '0.5rem' }}>
                    {m.isActive ? `(import bởi ${m.importedBy})` : '(Không có ai import)'}
                  </span>
                </div>
                <span className={`badge ${m.isActive ? 'badge-lesson' : ''}`} style={{ fontSize: '0.72rem', background: m.isActive ? undefined : 'rgba(244,63,94,0.2)', color: m.isActive ? undefined : '#f87171' }}>
                  {m.isActive ? `+${m.size} KB` : 'Tree-Shaken (0 KB)'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
