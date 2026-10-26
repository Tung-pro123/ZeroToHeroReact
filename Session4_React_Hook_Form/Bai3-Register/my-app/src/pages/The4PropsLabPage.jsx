import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

export default function The4PropsLabPage() {
  const [eventLogs, setEventLogs] = useState([]);
  const [domInspection, setDomInspection] = useState(null);

  const inputDomRef = useRef(null);

  const { register, handleSubmit } = useForm();

  // Create registration object for "developerEmail"
  const emailReg = register('developerEmail');

  const addLog = (msg) => {
    setEventLogs((prev) => [
      { id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), text: msg },
      ...prev.slice(0, 9),
    ]);
  };

  const handleInspectDom = () => {
    if (inputDomRef.current) {
      const el = inputDomRef.current;
      setDomInspection({
        tagName: el.tagName,
        type: el.type,
        name: el.name,
        domValue: el.value,
        id: el.id || '(không có)',
        className: el.className,
        hasValidationMessage: el.validationMessage || 'Hợp lệ',
      });
    }
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #38bdf8' }}>
        <h2 className="card-title">
          <span>🧬</span> Mổ Xẻ 4 Props Cốt Tử: name, onChange, onBlur & ref
        </h2>
        <p className="card-subtitle">
          Tìm hiểu cặn kẽ vai trò kỹ thuật của từng thuộc tính trong bộ tứ mà <code>register()</code> gắn vào phần tử DOM.
        </p>

        {/* 4 Pillars Grid */}
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {/* Prop 1: name */}
          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', fontFamily: 'JetBrains Mono' }}>
              1. name="fieldName"
            </div>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.6rem' }}>
              Định danh duy nhất của trường dữ liệu. Quyết định chính xác đường dẫn key trong đối tượng JSON trả về khi submit.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              👉 Không cần tự viết thêm <code>name="..."</code> trong JSX nếu đã spread <code>&#123;...register("...")&#125;</code>.
            </div>
          </div>

          {/* Prop 2: onChange */}
          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
            <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', fontFamily: 'JetBrains Mono' }}>
              2. onChange=(e) =&gt; ...
            </div>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.6rem' }}>
              Event Handler nhận diện khi nội dung input thay đổi để kích hoạt logic kiểm tra của RHF mà <strong>không bắt bạn phải tự tạo useState</strong>.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              👉 Uncontrolled không có nghĩa là không có onChange! RHF vẫn lắng nghe sự kiện để phục vụ validation.
            </div>
          </div>

          {/* Prop 3: onBlur */}
          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #fbbf24' }}>
            <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', fontFamily: 'JetBrains Mono' }}>
              3. onBlur=(e) =&gt; ...
            </div>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.6rem' }}>
              Kích hoạt khi người dùng click ra ngoài (mất focus). RHF dùng để đánh dấu trạng thái <code>touchedFields[fieldName] = true</code>.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              👉 Giúp chỉ hiển thị thông báo lỗi khi người dùng đã chạm vào ô rồi bỏ đi.
            </div>
          </div>

          {/* Prop 4: ref */}
          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', borderLeft: '4px solid #c084fc' }}>
            <div style={{ color: '#c084fc', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', fontFamily: 'JetBrains Mono' }}>
              4. ref=(domElement) =&gt; ...
            </div>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.6rem' }}>
              Ref callback giúp RHF nắm giữ liên kết trực tiếp tới node DOM thật (HTMLInputElement) để đọc <code>value</code> khi submit và tự động focus khi có lỗi.
            </p>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              👉 ref không phải nơi chứa value. Bản thân phần tử DOM mới tự chứa giá trị của nó.
            </div>
          </div>
        </div>

        {/* Live Event & DOM Inspector Lab */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 700 }}>
              🧪 Phòng Thử Nghiệm Tương Tác: Bắt Sự Kiện & Soi DOM Node
            </h3>
            <button onClick={() => setEventLogs([])} className="btn btn-secondary btn-sm">
              Xóa log
            </button>
          </div>

          <div className="grid-2">
            {/* Input Element */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                Trường developerEmail:
              </label>
              <input
                type="email"
                placeholder="developer@google.com"
                name={emailReg.name}
                onChange={(e) => {
                  emailReg.onChange(e);
                  addLog(`[onChange] User gõ: "${e.target.value}"`);
                }}
                onBlur={(e) => {
                  emailReg.onBlur(e);
                  addLog(`[onBlur] Rời khỏi ô developerEmail`);
                }}
                ref={(e) => {
                  emailReg.ref(e);
                  inputDomRef.current = e;
                }}
                className="form-input"
                style={{ marginBottom: '1rem' }}
              />

              <button onClick={handleInspectDom} className="btn btn-cyan btn-sm">
                🔍 Soi thông tin DOM Node từ ref thật
              </button>

              {/* DOM Node Detail */}
              {domInspection && (
                <div style={{ marginTop: '1rem', background: '#03050e', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.25)', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.4rem' }}>
                    DOM HTMLInputElement Snapshot:
                  </div>
                  <div>tagName: <span style={{ color: '#f472b6' }}>{domInspection.tagName}</span></div>
                  <div>name: <span style={{ color: '#fbbf24' }}>"{domInspection.name}"</span></div>
                  <div>type: <span style={{ color: '#34d399' }}>"{domInspection.type}"</span></div>
                  <div>DOM current value: <span style={{ color: '#38bdf8' }}>"{domInspection.domValue}"</span></div>
                </div>
              )}
            </div>

            {/* Event Logger */}
            <div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                📜 Nhật Ký Sự Kiện Thời Gian Thực (Live Event Stream):
              </div>
              <div style={{ background: '#03050e', borderRadius: '8px', padding: '0.85rem', height: '200px', overflowY: 'auto', border: '1px solid rgba(255, 255, 255, 0.08)', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>
                {eventLogs.length === 0 ? (
                  <span style={{ color: '#64748b', fontStyle: 'italic' }}>Chưa có sự kiện nào. Hãy click vào ô input bên trái, gõ chữ rồi click ra ngoài...</span>
                ) : (
                  eventLogs.map((log) => (
                    <div key={log.id} style={{ marginBottom: '0.35rem', color: log.text.includes('onChange') ? '#34d399' : '#fbbf24' }}>
                      <span style={{ color: '#64748b' }}>[{log.time}]</span> {log.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
