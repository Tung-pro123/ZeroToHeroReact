import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// --- CÁCH 1: PROP DRILLING (Khoan prop qua 3 tầng) ---
function BadLevel3({ user, status, onUpdateStatus }) {
  return (
    <div style={{ background: '#0a0f1d', padding: '1rem', borderRadius: '8px', border: '1px dashed #f43f5e' }}>
      <div style={{ fontSize: '0.8rem', color: '#fb7185', marginBottom: '0.5rem' }}>
        🚩 Tầng 3: <code>&lt;DeepAvatarStatus /&gt;</code> (Nơi thực sự cần dùng dữ liệu)
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.75rem' }}>{user.avatar}</span>
        <div>
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          <div style={{ fontSize: '0.85rem', color: status === 'Online' ? '#34d399' : '#fbbf24' }}>
            Trạng thái: <strong>{status}</strong>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.4rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => onUpdateStatus('Online')}>🟢 Online</button>
        <button className="btn btn-secondary btn-sm" onClick={() => onUpdateStatus('Bận')}>🔴 Bận</button>
      </div>
    </div>
  );
}

function BadLevel2({ user, status, onUpdateStatus }) {
  return (
    <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '10px', border: '1px solid #374151', marginBottom: '1rem' }}>
      <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
        📦 Tầng 2: <code>&lt;MiddleContainer /&gt;</code> (Chỉ nhận prop rồi chuyền tiếp xuống dưới, bản thân không dùng!)
      </div>
      <BadLevel3 user={user} status={status} onUpdateStatus={onUpdateStatus} />
    </div>
  );
}

// --- CÁCH 2: COMPONENT COMPOSITION (Dùng children để triệt tiêu Prop Drilling) ---
function CleanMiddleContainer({ children }) {
  return (
    <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '10px', border: '1px solid #10b981', marginBottom: '1rem' }}>
      <div style={{ fontSize: '0.85rem', color: '#34d399', marginBottom: '0.75rem' }}>
        ✨ Tầng 2: <code>&lt;CleanMiddleContainer&gt; &#123;children&#125; &lt;/CleanMiddleContainer&gt;</code> 
        <br />
        <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>(Không cần biết user, status hay onUpdateStatus là gì!)</span>
      </div>
      {children}
    </div>
  );
}

export default function PropDrillingLab() {
  const [approach, setApproach] = useState('composition'); // 'drilling' | 'composition'
  const [status, setStatus] = useState('Online');

  const user = {
    name: 'Nguyễn Văn A (Fullstack Dev)',
    avatar: '👨‍💻',
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">⚡ 6. Mặt Trái Của Lifting State Up: Prop Drilling & Cách Giải Quyết</h2>
        <p className="lab-card-desc">
          Khi kéo State lên quá cao, việc phải chuyền Props qua hàng loạt component trung gian không cần đến nó gọi là <strong>Prop Drilling</strong>.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${approach === 'composition' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setApproach('composition')}
        >
          ✅ Giải Pháp: Component Composition (Dùng children slot)
        </button>
        <button
          className={`btn ${approach === 'drilling' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setApproach('drilling')}
        >
          ❌ Vấn Đề: Prop Drilling (Chuyền qua 3 tầng)
        </button>
      </div>

      <InfoBox
        type={approach === 'composition' ? 'tip' : 'danger'}
        title={
          approach === 'composition'
            ? 'Component Composition: Đưa JSX xuống qua {children}'
            : 'Prop Drilling: Tầng 2 phải làm "người vận chuyển" vô nghĩa'
        }
      >
        {approach === 'composition' ? (
          <div>
            Bằng cách truyền trực tiếp <code>&lt;DeepAvatarStatus /&gt;</code> vào thẻ <code>&lt;CleanMiddleContainer&gt;</code> dưới dạng <code>children</code>,
            component trung gian hoàn toàn không cần khai báo hay quan tâm tới props của con!
          </div>
        ) : (
          <div>
            Tầng 2 (<code>MiddleContainer</code>) không hề sử dụng bất kỳ thông tin nào của user hay status, nhưng vẫn phải khai báo và nhận 3 props chỉ để chuyển tiếp xuống Tầng 3.
          </div>
        )}
      </InfoBox>

      {/* Demonstration Output */}
      {approach === 'composition' ? (
        <CleanMiddleContainer>
          <div style={{ background: '#0a0f1d', padding: '1rem', borderRadius: '8px', border: '1px solid #10b981' }}>
            <div style={{ fontSize: '0.8rem', color: '#34d399', marginBottom: '0.5rem' }}>
              🎯 Tầng 3 nằm ngay trong phạm vi của Cha:
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{user.avatar}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: '0.85rem', color: status === 'Online' ? '#34d399' : '#fbbf24' }}>
                  Trạng thái: <strong>{status}</strong>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.4rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setStatus('Online')}>🟢 Online</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setStatus('Vắng mặt')}>🟡 Vắng mặt</button>
              <button className="btn btn-secondary btn-sm" onClick={() => setStatus('Đang họp')}>🔴 Đang họp</button>
            </div>
          </div>
        </CleanMiddleContainer>
      ) : (
        <BadLevel2 user={user} status={status} onUpdateStatus={setStatus} />
      )}
    </div>
  );
}
