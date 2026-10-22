import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const contacts = [
  { id: 'alice', name: 'Alice (Bạn gái)', email: 'alice@sweetheart.com', avatar: '👩‍🦰' },
  { id: 'bob', name: 'Bob (Sếp công ty)', email: 'bob@enterprise.corp', avatar: '👨‍💼' },
  { id: 'taylor', name: 'Taylor (Khách hàng VIP)', email: 'taylor@investor.io', avatar: '🧑‍💻' },
];

// Sub-component Chat
function ChatBox({ contact, onSend }) {
  const [draft, setDraft] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend(contact, draft);
    setDraft('');
  };

  return (
    <div style={{ background: '#0d1527', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #1f293d' }}>
        <span style={{ fontSize: '2rem' }}>{contact.avatar}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f3f4f6' }}>{contact.name}</div>
          <div style={{ fontSize: '0.82rem', color: '#9ca3af' }}>{contact.email}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
          Soạn tin nhắn gửi tới <strong>{contact.name}</strong>:
        </label>
        <textarea
          rows={3}
          className="input-control"
          placeholder="Nhập nội dung tin nhắn..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          style={{ resize: 'none', marginBottom: '1rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            State bản nháp: <code>&quot;{draft}&quot;</code>
          </span>
          <button type="submit" className="btn btn-primary" disabled={!draft.trim()}>
            🚀 Gửi Tin Nhắn
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ChatKeyResetLab() {
  const [selectedId, setSelectedId] = useState('alice');
  const [useKey, setUseKey] = useState(true);
  const [sentMessages, setSentMessages] = useState([]);

  const currentContact = contacts.find((c) => c.id === selectedId);

  const handleSend = (contact, text) => {
    setSentMessages((prev) => [
      { id: Date.now(), to: contact.name, text, time: new Date().toLocaleTimeString() },
      ...prev,
    ]);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">💬 3. Ứng Dụng Chat Thực Tế: Bí Kíp Dùng `key` Để Reset State</h2>
        <p className="lab-card-desc">
          Tái hiện Thử thách 3 trong React.dev: Ngăn chặn rò rỉ tin nhắn nhạy cảm giữa các liên hệ khi chuyển đổi phòng chat 
          bằng cách cấp danh tính <code>key=&#123;contact.id&#125;</code>.
        </p>
      </div>

      {/* Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${useKey ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setUseKey(true)}
        >
          ✅ An Toàn: Có Gắn `key={contact.id}` (Tự động xóa nháp khi đổi người)
        </button>
        <button
          className={`btn ${!useKey ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setUseKey(false)}
        >
          ❌ Nguy Hiểm: Không Gắn Key (Bản nháp Alice bị rò rỉ sang Sếp Bob!)
        </button>
      </div>

      <InfoBox
        type={useKey ? 'tip' : 'danger'}
        title={useKey ? 'Đang Dùng key={contact.id} - An Toàn Tuyệt Đối' : 'Cảnh Báo Lỗi Rò Rỉ Dữ Liệu!'}
      >
        {useKey
          ? 'Khi bạn đổi sang liên hệ khác, giá trị prop key thay đổi khiến React chủ động đập bỏ Chat cũ và mở Chat mới với ô soạn thảo trống sạch sẽ.'
          : 'Thử nghiệm: Chọn Alice, gõ "Anh nhớ em nhiều...", sau đó click chọn Bob. Bạn sẽ thấy dòng chữ ngọt ngào gửi Alice VẪN NẰM NGUYÊN trong ô chat của Sếp Bob!'}
      </InfoBox>

      {/* Main Chat Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Left: Contact list */}
        <div style={{ background: '#0a0f1d', borderRadius: '12px', border: '1px solid #1e293b', padding: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem', fontWeight: 600 }}>
            👥 DANH SÁCH LIÊN HỆ:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: selectedId === c.id ? '1px solid #f59e0b' : '1px solid #1e293b',
                  background: selectedId === c.id ? 'rgba(245, 158, 11, 0.15)' : '#111827',
                  color: selectedId === c.id ? '#fde68a' : '#d1d5db',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{c.avatar}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{c.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{c.email}</div>
                </div>
                {selectedId === c.id && <span style={{ color: '#f59e0b' }}>●</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Chat */}
        <div>
          {useKey ? (
            <ChatBox
              key={currentContact.id}
              contact={currentContact}
              onSend={handleSend}
            />
          ) : (
            <ChatBox
              contact={currentContact}
              onSend={handleSend}
            />
          )}
        </div>
      </div>

      {/* Sent Message History */}
      {sentMessages.length > 0 && (
        <div style={{ background: '#0a0f1d', borderRadius: '10px', border: '1px solid #1e293b', padding: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600, marginBottom: '0.5rem' }}>
            📨 LỊCH SỬ ĐÃ GỬI GẦN ĐÂY:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sentMessages.slice(0, 3).map((m) => (
              <div key={m.id} style={{ fontSize: '0.85rem', color: '#e5e7eb', background: '#111827', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                <span style={{ color: '#f59e0b', fontWeight: 600 }}>Gửi tới {m.to} ({m.time}):</span> &quot;{m.text}&quot;
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
