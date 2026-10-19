import { useState } from 'react';
import InfoBox from '../common/InfoBox';

function FormField({ label, initialText = '' }) {
  const [text, setText] = useState(initialText);

  return (
    <div style={{ flex: 1, minWidth: '220px', background: '#0d1527', border: '1px solid #1e293b', borderRadius: '10px', padding: '1.25rem' }}>
      <label style={{ display: 'block', fontWeight: 600, color: '#fbbf24', marginBottom: '0.4rem' }}>
        {label}:
      </label>
      <input
        type="text"
        className="input-control"
        placeholder={`Nhập ${label.toLowerCase()}...`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '0.35rem' }}>
        State nội bộ: <code>&quot;{text}&quot;</code>
      </div>
    </div>
  );
}

export default function SwapFieldsLab() {
  const [isSwapped, setIsSwapped] = useState(false);
  const [useKey, setUseKey] = useState(true);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🔄 6. Thử Thách 2: Đổi Chỗ Hai Trường Form (Swap Fields)</h2>
        <p className="lab-card-desc">
          Tái hiện Thử thách 2 trong React.dev: Khi bấm nút đổi thứ tự hai ô &quot;Họ&quot; và &quot;Tên&quot;, làm sao để chữ người dùng đã gõ 
          đi theo đúng trường tương ứng thay vì bị kẹt lại vị trí cũ?
        </p>
      </div>

      {/* Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${useKey ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setUseKey(true)}
        >
          ✅ Chuẩn: Có Gắn `key=&quot;firstName&quot;` & `key=&quot;lastName&quot;`
        </button>
        <button
          className={`btn ${!useKey ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setUseKey(false)}
        >
          ❌ Lỗi: Không Gắn Key (React tái sử dụng theo vị trí 1 và 2!)
        </button>
      </div>

      <InfoBox
        type={useKey ? 'tip' : 'danger'}
        title={useKey ? 'State Đi Theo Danh Tính Của Key' : 'React Khớp State Theo Số Thứ Tự Vị Trí (0 và 1)'}
      >
        {useKey ? (
          <div>
            Gõ &quot;Nguyễn&quot; vào ô Họ, &quot;Văn An&quot; vào ô Tên. Sau đó bấm nút <strong>&quot;Đổi Chỗ&quot;</strong>.<br />
            Chữ &quot;Nguyễn&quot; sẽ ngoan ngoãn chuyển sang ô Họ (ở vị trí mới)!
          </div>
        ) : (
          <div>
            1. Gõ &quot;Nguyễn&quot; vào ô Họ, &quot;Văn An&quot; vào ô Tên.<br />
            2. Bấm <strong>&quot;Đổi Chỗ&quot;</strong>.<br />
            3. Bạn sẽ thấy ô đầu tiên đổi nhãn thành &quot;Tên&quot; nhưng chữ bên trong <strong>vẫn là chữ &quot;Nguyễn&quot; cũ</strong>!
          </div>
        )}
      </InfoBox>

      {/* Action button */}
      <div style={{ marginBottom: '1.25rem' }}>
        <button className="btn btn-secondary" onClick={() => setIsSwapped(!isSwapped)}>
          🔀 Đổi Chỗ Hai Trường (Đang là: {isSwapped ? 'Tên trước, Họ sau' : 'Họ trước, Tên sau'})
        </button>
      </div>

      {/* Interactive Fields */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {useKey ? (
          isSwapped ? (
            <>
              <FormField key="lastName" label="Tên (Last Name)" initialText="Văn An" />
              <FormField key="firstName" label="Họ (First Name)" initialText="Nguyễn" />
            </>
          ) : (
            <>
              <FormField key="firstName" label="Họ (First Name)" initialText="Nguyễn" />
              <FormField key="lastName" label="Tên (Last Name)" initialText="Văn An" />
            </>
          )
        ) : (
          isSwapped ? (
            <>
              <FormField label="Tên (Last Name)" initialText="Văn An" />
              <FormField label="Họ (First Name)" initialText="Nguyễn" />
            </>
          ) : (
            <>
              <FormField label="Họ (First Name)" initialText="Nguyễn" />
              <FormField label="Tên (Last Name)" initialText="Văn An" />
            </>
          )
        )}
      </div>
    </div>
  );
}
