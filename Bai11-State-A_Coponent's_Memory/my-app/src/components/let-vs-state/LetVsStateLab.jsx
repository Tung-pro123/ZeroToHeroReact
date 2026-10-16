import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Biến ngoài phạm vi render để mô phỏng biến cục bộ bên trong hàm
let simulatedLetCount = 0;

export default function LetVsStateLab() {
  const [stateCount, setStateCount] = useState(0);
  const [renderPass, setRenderPass] = useState(1);

  // Thao tác với biến let
  const handleLetIncrement = () => {
    simulatedLetCount += 1;
    // Lưu ý: Không gọi setState -> Màn hình đứng im!
  };

  // Thao tác với State
  const handleStateIncrement = () => {
    setStateCount((c) => c + 1);
    setRenderPass((p) => p + 1);
  };

  // Kích hoạt re-render để thấy biến let bị xóa
  const handleForceRender = () => {
    // Khi component render lại, biến let trong hàm thông thường sẽ bị gán lại về 0
    simulatedLetCount = 0;
    setRenderPass((p) => p + 1);
  };

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🧪 Thử Nghiệm Đối Đầu: Biến let vs React State</h2>
          <p className="card-desc">
            Quan sát trực quan 2 lý do tại sao biến cục bộ <code>let</code> hoàn toàn thất bại trong việc cập nhật giao diện: 
            Không lưu giữ qua các lần render và Không phát tín hiệu kích hoạt Re-render.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="badge badge-react">Lần Render Thứ: {renderPass}</span>
        </div>
      </div>

      <div className="grid-2">
        {/* Cột 1: Biến thông thường let */}
        <div className="compare-box" style={{ borderColor: 'rgba(244, 63, 94, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#f43f5e', fontWeight: 700 }}>
              ❌ Dùng Biến Cục Bộ: <code>let count = 0</code>
            </h3>
            <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e' }}>Thất Bại</span>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af', textTransform: 'uppercase' }}>Giá trị trên màn hình (DOM)</div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#9ca3af' }}>
              0
            </div>
            <div style={{ fontSize: '0.8rem', color: '#f87171' }}>
              (Giá trị trong RAM JS: {simulatedLetCount} — nhưng DOM đứng im vì không có re-render!)
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              className="btn-secondary"
              onClick={handleLetIncrement}
              style={{ borderColor: '#f43f5e', color: '#fda4af' }}
            >
              Bấm Tăng count = count + 1
            </button>
            <button
              className="btn-secondary"
              onClick={handleForceRender}
              style={{ fontSize: '0.82rem' }}
            >
              🔄 Kích hoạt Render lại (let sẽ bị reset)
            </button>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#fda4af', lineHeight: 1.5 }}>
            ⚠️ <strong>Hậu quả:</strong> Khi bấm tăng, bạn có thể tăng biến trong bộ nhớ JS, nhưng React không hề biết để vẽ lại. 
            Mỗi khi màn hình render lại, dòng <code>let count = 0</code> lại chạy từ đầu và xóa sạch con số bạn vừa bấm!
          </div>
        </div>

        {/* Cột 2: React useState */}
        <div className="compare-box highlight">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#a855f7', fontWeight: 700 }}>
              ✅ Dùng React State: <code>useState(0)</code>
            </h3>
            <span className="badge badge-memory">Thành Công</span>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '1rem',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#c084fc', textTransform: 'uppercase' }}>Giá trị trên màn hình (DOM)</div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#f3e8ff' }}>
              {stateCount}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#34d399' }}>
              (Được lưu giữ an toàn trong RAM của React &amp; tự động cập nhật!)
            </div>
          </div>

          <button className="btn-primary" onClick={handleStateIncrement} style={{ width: '100%', justifyContent: 'center' }}>
            Bấm Tăng setCount(stateCount + 1) 🚀
          </button>

          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#c084fc', lineHeight: 1.5 }}>
            🎉 <strong>Bản chất:</strong> Hàm <code>setStateCount</code> thực hiện 2 việc cùng lúc:
            1. Lưu giữ con số mới vào bộ nhớ dài hạn của React.
            2. Phát tín hiệu Trigger yêu cầu React gọi lại hàm Component với con số mới!
          </div>
        </div>
      </div>

      <InfoBox title="Quy tắc 2 yếu tố sống còn của React">
        Giao diện chỉ thay đổi được khi thỏa mãn đồng thời:
        <strong> 1. Retain (Lưu giữ dữ liệu qua các lần render)</strong> và 
        <strong> 2. Trigger (Kích hoạt quá trình re-render vẽ lại màn hình)</strong>. 
        Hook <code>useState</code> cung cấp trọn vẹn cả 2 cơ chế này!
      </InfoBox>
    </div>
  );
}
