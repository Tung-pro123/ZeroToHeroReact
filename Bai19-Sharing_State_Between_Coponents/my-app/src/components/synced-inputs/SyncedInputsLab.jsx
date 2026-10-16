import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Sub-component 1: Ô input tự do (Không đồng bộ)
function IndependentInput({ label }) {
  const [value, setValue] = useState('');
  return (
    <div style={{ flex: 1, background: '#0f172a', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#fbbf24' }}>
        {label} (Unsynced):
      </label>
      <input
        type="text"
        className="input-control"
        placeholder="Gõ thử vào đây..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#9ca3af' }}>
        Độ dài: {value.length} ký tự
      </div>
    </div>
  );
}

// Sub-component 2: Ô input đã được Kéo State Lên (Controlled)
function SyncedInput({ label, value, onChange }) {
  return (
    <div style={{ flex: 1, background: '#0f172a', padding: '1.25rem', borderRadius: '10px', border: '1px solid #10b981' }}>
      <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#34d399' }}>
        {label} (Controlled):
      </label>
      <input
        type="text"
        className="input-control"
        placeholder="Gõ vào đây sẽ cập nhật ô bên cạnh..."
        value={value}
        onChange={onChange}
      />
      <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#a7f3d0' }}>
        Nhận giá trị từ Cha: <code>&quot;{value}&quot;</code>
      </div>
    </div>
  );
}

export default function SyncedInputsLab() {
  const [mode, setMode] = useState('synced'); // 'unsynced' | 'synced'
  const [sharedText, setSharedText] = useState('React Lifting State Up');

  const handleSharedChange = (e) => {
    setSharedText(e.target.value);
  };

  const handlePreset = (text) => {
    setSharedText(text);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🔗 2. Thử Thách 1: Đồng Bộ Hóa Hai Ô Nhập Liệu (Synced Inputs)</h2>
        <p className="lab-card-desc">
          Tái hiện và nâng cấp Thử thách 1 trong tài liệu chính thức React.dev: Biến hai ô nhập liệu độc lập thành hai ô song sinh luôn đồng bộ giá trị.
        </p>
      </div>

      {/* Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${mode === 'synced' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('synced')}
        >
          ✅ Đã Kéo State Lên Cha (Đồng bộ 2 ô)
        </button>
        <button
          className={`btn ${mode === 'unsynced' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setMode('unsynced')}
        >
          ❌ Chưa Kéo State (2 ô riêng biệt)
        </button>
      </div>

      <InfoBox
        type={mode === 'synced' ? 'tip' : 'warning'}
        title={mode === 'synced' ? 'Nguồn Sự Thật Duy Nhất Nằm Ở Cha' : 'Hai Ô Độc Lập - Không Thể Giao Tiếp'}
      >
        {mode === 'synced'
          ? 'Cả hai ô input đều nhận chung prop `value={sharedText}` và gọi hàm callback `onChange={handleSharedChange}` để cập nhật State của Cha.'
          : 'Mỗi thẻ Input tự giữ một `useState("")` bên trong ruột. Dù là anh em trong cùng giao diện, chúng không hề biết người kia đang gõ chữ gì.'}
      </InfoBox>

      {/* Interactive Inputs */}
      {mode === 'synced' ? (
        <>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <SyncedInput
              label="Ô Nhập Liệu A"
              value={sharedText}
              onChange={handleSharedChange}
            />
            <SyncedInput
              label="Ô Nhập Liệu B"
              value={sharedText}
              onChange={handleSharedChange}
            />
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Gán giá trị mẫu:</span>
            <button className="btn btn-secondary btn-sm" onClick={() => handlePreset('FPT University - Fall 2026')}>
              🎓 FPT University
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => handlePreset('Single Source of Truth')}>
              🔑 Single Source of Truth
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => handlePreset('')}>
              🧹 Xóa trắng
            </button>
          </div>

          {/* Parent State Monitor */}
          <div style={{ padding: '1rem', background: '#0a0f1d', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600, marginBottom: '0.4rem' }}>
              📊 TRẠNG THÁI TỔNG QUAN Ở COMPONENT CHA:
            </div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
              <div>Giá trị State: <strong style={{ color: '#34d399' }}>&quot;{sharedText}&quot;</strong></div>
              <div>Số ký tự: <strong style={{ color: '#60a5fa' }}>{sharedText.length}</strong></div>
              <div>Chữ in hoa: <strong style={{ color: '#fbbf24' }}>{sharedText.toUpperCase()}</strong></div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <IndependentInput label="Ô Nhập Liệu A" />
          <IndependentInput label="Ô Nhập Liệu B" />
        </div>
      )}
    </div>
  );
}
