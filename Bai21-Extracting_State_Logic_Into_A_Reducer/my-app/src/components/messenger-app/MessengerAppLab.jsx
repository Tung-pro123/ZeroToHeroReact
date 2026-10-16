import { useReducer, useState } from 'react';
import InfoBox from '../common/InfoBox';

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com', avatar: '👩‍💻' },
  { id: 1, name: 'Alice', email: 'alice@mail.com', avatar: '👩‍🦰' },
  { id: 2, name: 'Bob', email: 'bob@mail.com', avatar: '👨‍💼' },
];

const initialState = {
  selectedId: 0,
  message: 'Xin chào bạn! Mình là Tùng.',
};

function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '', // Thử thách 1: Chuyển người thì xóa trắng hoặc set thông điệp
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'sent_message': {
      // Thử thách 2: Xóa trắng ô input khi gửi
      return {
        ...state,
        message: '',
      };
    }
    default: {
      throw Error('Hành động không xác định: ' + action.type);
    }
  }
}

export default function MessengerAppLab() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const [sentLog, setSentLog] = useState([]);

  const currentContact = contacts.find((c) => c.id === state.selectedId);

  const handleSend = () => {
    if (!state.message.trim()) return;
    setSentLog((prev) => [
      {
        id: Date.now(),
        to: currentContact.name,
        message: state.message,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
    dispatch({ type: 'sent_message' });
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">💬 3. Ứng Dụng Messenger (Thử Thách 1 & 2 React.dev)</h2>
        <p className="lab-card-desc">
          Triển khai Reducer quản lý liên hệ được chọn và nội dung tin nhắn nháp. 
          Tự động xóa trắng ô nhập liệu sau khi gửi tin (Clear input on send).
        </p>
      </div>

      <InfoBox type="tip" title="Giải Pháp Thử Thách 1 & 2:">
        Khi chọn người: <code>dispatch(&#123; type: &apos;changed_selection&apos;, contactId: c.id &#125;)</code>.<br />
        Khi gõ chữ: <code>dispatch(&#123; type: &apos;edited_message&apos;, message: e.target.value &#125;)</code>.<br />
        Khi gửi: <code>dispatch(&#123; type: &apos;sent_message&apos; &#125;)</code> ➡️ Reducer tự động set <code>message: &apos;&apos;</code>.
      </InfoBox>

      {/* Main Messenger Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Contact Selector */}
        <div style={{ background: '#0a0f1d', borderRadius: '12px', border: '1px solid #1e293b', padding: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem', fontWeight: 600 }}>
            👥 CHỌN NGƯỜI NHẬN TIN NHẮN:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => dispatch({ type: 'changed_selection', contactId: c.id })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: state.selectedId === c.id ? '1px solid #f97316' : '1px solid #1e293b',
                  background: state.selectedId === c.id ? 'rgba(249, 115, 22, 0.15)' : '#111827',
                  color: state.selectedId === c.id ? '#fed7aa' : '#d1d5db',
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
                {state.selectedId === c.id && <span style={{ color: '#f97316' }}>●</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ background: '#0d1527', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1f293d' }}>
            <span style={{ fontSize: '1.75rem' }}>{currentContact.avatar}</span>
            <div>
              <div style={{ fontWeight: 700, color: '#f3f4f6' }}>Đang trò chuyện với: {currentContact.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{currentContact.email}</div>
            </div>
          </div>

          <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.4rem' }}>
            Nội dung tin nhắn:
          </label>
          <textarea
            rows={3}
            className="input-control"
            placeholder={`Soạn tin nhắn gửi tới ${currentContact.name}...`}
            value={state.message}
            onChange={(e) => dispatch({ type: 'edited_message', message: e.target.value })}
            style={{ resize: 'none', marginBottom: '1rem' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              Độ dài: {state.message.length} ký tự
            </span>
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={!state.message.trim()}
            >
              🚀 Gửi Tới {currentContact.name}
            </button>
          </div>
        </div>
      </div>

      {/* Sent Message History */}
      {sentLog.length > 0 && (
        <div style={{ background: '#0a0f1d', borderRadius: '10px', border: '1px solid #1e293b', padding: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#14b8a6', fontWeight: 600, marginBottom: '0.5rem' }}>
            📨 LỊCH SỬ TIN ĐÃ GỬI (GIAO DIỆN TỰ XÓA TRẮNG INPUT):
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {sentLog.map((log) => (
              <div key={log.id} style={{ fontSize: '0.85rem', color: '#e5e7eb', background: '#111827', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                <span style={{ color: '#f97316', fontWeight: 600 }}>[{log.time}] Tới {log.to}:</span> &quot;{log.message}&quot;
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
