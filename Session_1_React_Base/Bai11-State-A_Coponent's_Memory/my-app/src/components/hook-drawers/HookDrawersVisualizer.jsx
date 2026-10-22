import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function HookDrawersVisualizer() {
  const [userName, setUserName] = useState('Tùng');
  const [hasConditionBug, setHasConditionBug] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Dữ liệu trong các ngăn kéo RAM của React
  const memorySlots = [
    {
      slot: 0,
      initialValue: "'Tùng'",
      currentValue: userName === '' ? "''" : "'Tùng'",
      hookLabel: "const [name, setName] = useState('Tùng')",
      variableName: 'name (Chuỗi String)',
      status: 'normal'
    },
    {
      slot: 1,
      initialValue: '20',
      currentValue: '20',
      hookLabel: hasConditionBug && userName === '' ? '❌ BỊ BỎ QUA DO ĐIỀU KIỆN if (name !== "")' : 'const [age, setAge] = useState(20)',
      variableName: hasConditionBug && userName === '' ? 'BỊ BỎ QUA!' : 'age (Số Number)',
      status: hasConditionBug && userName === '' ? 'skipped' : 'normal'
    },
    {
      slot: 2,
      initialValue: 'true',
      currentValue: hasConditionBug && userName === '' ? '20 (BỐC NHẦM NGĂN 1!)' : 'true',
      hookLabel: 'const [isLoggedIn, setIsLoggedIn] = useState(true)',
      variableName: hasConditionBug && userName === '' ? 'isLoggedIn (BỊ GÁN NHẦM SỐ 20!)' : 'isLoggedIn (Boolean)',
      status: hasConditionBug && userName === '' ? 'error' : 'normal'
    }
  ];

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🗄️ Dưới Nắp Máy: Mô Hình Ngăn Kéo &amp; Con Trỏ Chỉ Số (Call Order Cursor)</h2>
          <p className="card-desc">
            React không nhận diện State bằng tên biến (không có <code>useState("name")</code>). 
            React quản lý State bằng <strong>Thứ Tự Cuộc Gọi Cố Định (Fixed Call Order)</strong> qua từng ngăn kéo RAM.
          </p>
        </div>

        <label className="toggle-wrapper" style={{ cursor: 'pointer' }}>
          <span className="toggle-label">Mô phỏng vi phạm đặt Hook trong if:</span>
          <input
            type="checkbox"
            checked={hasConditionBug}
            onChange={(e) => setHasConditionBug(e.target.checked)}
            style={{ width: '1.2rem', height: '1.2rem', accentColor: '#a855f7', cursor: 'pointer' }}
          />
          <span style={{ fontWeight: 700, color: hasConditionBug ? '#f43f5e' : '#34d399', fontSize: '0.88rem' }}>
            {hasConditionBug ? '💥 Vi phạm (Có if)' : '✅ Đúng quy chuẩn'}
          </span>
        </label>
      </div>

      <div className="grid-2">
        {/* Điều khiển giá trị để xem lệch pha */}
        <div className="compare-box highlight">
          <h3 className="compare-title"><span>⚙️</span> Giả Lập Thay Đổi Dữ Liệu</h3>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
              Giá trị biến <code>name</code>:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`btn-secondary ${userName !== '' ? 'active' : ''}`}
                onClick={() => setUserName('Tùng')}
                style={{ fontSize: '0.85rem' }}
              >
                Có tên: 'Tùng'
              </button>
              <button
                className={`btn-secondary ${userName === '' ? 'active' : ''}`}
                onClick={() => setUserName('')}
                style={{ fontSize: '0.85rem', borderColor: userName === '' ? '#f43f5e' : undefined, color: userName === '' ? '#f43f5e' : undefined }}
              >
                Xóa trắng: '' (Kích hoạt nhảy cóc if)
              </button>
            </div>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.9)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 }}>
            <div style={{ color: '#38bdf8' }}>function Profile() &#123;</div>
            <div style={{ paddingLeft: '1rem', color: '#93c5fd' }}>// Cuộc gọi Hook lần 1:</div>
            <div style={{ paddingLeft: '1rem', color: '#f3f4f6' }}>const [name, setName] = useState('Tùng');</div>
            <br />
            {hasConditionBug ? (
              <div style={{ padding: '0.4rem', background: 'rgba(244, 63, 94, 0.15)', borderLeft: '3px solid #f43f5e', borderRadius: '4px' }}>
                <div style={{ color: '#fda4af' }}>// ❌ LỖI: Nhét Hook vào trong if:</div>
                <div style={{ color: '#fda4af' }}>if (name !== '') &#123;</div>
                <div style={{ paddingLeft: '1rem', color: userName === '' ? '#6b7280' : '#f3f4f6' }}>
                  const [age, setAge] = useState(20); {userName === '' && '⚠️ [BỊ NHẢY CÓC! KHÔNG ĐƯỢC GỌI]'}
                </div>
                <div style={{ color: '#fda4af' }}>&#125;</div>
              </div>
            ) : (
              <div style={{ paddingLeft: '1rem', color: '#f3f4f6' }}>
                const [age, setAge] = useState(20);
              </div>
            )}
            <br />
            <div style={{ paddingLeft: '1rem', color: '#93c5fd' }}>
              // Cuộc gọi Hook kế tiếp:
            </div>
            <div style={{ paddingLeft: '1rem', color: hasConditionBug && userName === '' ? '#f43f5e' : '#f3f4f6', fontWeight: hasConditionBug && userName === '' ? 700 : 400 }}>
              const [isLoggedIn, setIsLoggedIn] = useState(true);
            </div>
            <div style={{ color: '#38bdf8' }}>&#125;</div>
          </div>

          {hasConditionBug && userName === '' && (
            <div style={{ marginTop: '1rem', padding: '0.9rem', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.2)', border: '1px solid #f43f5e', color: '#fca5a5', fontSize: '0.88rem' }}>
              💥 <strong>React Crash Report:</strong><br />
              <code>Error: Rendered fewer hooks than expected. This may be caused by an accidental early return statement.</code><br />
              <span style={{ fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>
                Lần trước gọi 3 Hooks, lần này chỉ gọi 2 Hooks. React phát hiện lệch hàng và dừng ứng dụng!
              </span>
            </div>
          )}
        </div>

        {/* Khung trực quan hóa các Ngăn kéo RAM */}
        <div className="compare-box">
          <h3 className="compare-title"><span>🗄️</span> Các Ngăn Kéo Trong Bộ Nhớ RAM Của React</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            React lưu State của Component như một danh sách mảng và dùng con trỏ cursor để đếm số lần gọi:
          </p>

          <div className="drawer-container">
            {memorySlots.map((slot) => {
              let cls = 'drawer-slot';
              if (slot.status === 'error') cls += ' shifted-error';

              return (
                <div key={slot.slot} className={cls}>
                  <div>
                    <div className="slot-index">Ngăn {slot.slot} (Slot #{slot.slot})</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.2rem' }}>
                      Ứng với: <code>{slot.variableName}</code>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="slot-value">{slot.currentValue}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <InfoBox title="Bản chất câu hỏi: Tại sao không dùng tên biến?">
            JavaScript không cung cấp khả năng để một hàm như <code>useState()</code> tự soi chiếu tên của biến nhận nó ở bên trái dấu <code>=</code> (Reflect variable name). 
            Do đó, React buộc phải dùng <strong>Thứ tự gọi (Call Order)</strong> để ghép nối. Đây là lý do luật <em>"Không gọi hook trong if/for"</em> là tuyệt đối bắt buộc!
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
