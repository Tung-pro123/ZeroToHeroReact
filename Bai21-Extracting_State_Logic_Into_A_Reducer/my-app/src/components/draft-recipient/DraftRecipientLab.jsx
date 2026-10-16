import { useReducer } from 'react';
import InfoBox from '../common/InfoBox';

const contacts = [
  { id: 0, name: 'Taylor Swift', role: 'Singer / VIP', avatar: '👩‍🎤' },
  { id: 1, name: 'Alice Walker', role: 'Designer', avatar: '👩‍🎨' },
  { id: 2, name: 'Bob Martin', role: 'Clean Code Author', avatar: '👨‍🏫' },
];

const initialDraftState = {
  selectedId: 0,
  messages: {
    0: 'Xin chào Taylor! Album mới nghe rất đỉnh 🎶',
    1: 'Chào Alice, thiết kế UI bài 21 trông rất đẹp!',
    2: 'Thầy Bob ơi, cuốn sách Clean Code hay tuyệt vời.',
  },
};

function draftReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '', // Chỉ xóa trắng bản nháp của người vừa gửi!
        },
      };
    }
    default: {
      throw Error('Hành động không xác định: ' + action.type);
    }
  }
}

export default function DraftRecipientLab() {
  const [state, dispatch] = useReducer(draftReducer, initialDraftState);

  const currentContact = contacts.find((c) => c.id === state.selectedId);
  const currentDraft = state.messages[state.selectedId] || '';

  const handleSend = () => {
    alert(`📨 Đã gửi tới ${currentContact.name}: "${currentDraft}"`);
    dispatch({ type: 'sent_message' });
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">✉️ 4. Thử Thách 3: Bảo Toàn Bản Nháp Cho Từng Người Nhận (Draft Map)</h2>
        <p className="lab-card-desc">
          Tái hiện Thử thách 3 trong React.dev: Nâng cấp Reducer State từ dạng chuỗi đơn lẻ sang một Hash Map 
          <code>messages: &#123; [id]: text &#125;</code> để mỗi liên hệ lưu giữ một bản nháp riêng biệt.
        </p>
      </div>

      <InfoBox type="tip" title="Bí Quyết Cấu Trúc State:">
        Thay vì chỉ lưu <code>message: &apos;...&apos;</code> chung chung, ta lưu một từ điển <code>messages: &#123; 0: &apos;...&apos;, 1: &apos;...&apos; &#125;</code>. 
        Khi người dùng chuyển qua lại giữa Alice, Bob và Taylor, bản nháp dở của từng người <strong>không bao giờ bị mất</strong>!
      </InfoBox>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Contact List */}
        <div style={{ background: '#0a0f1d', borderRadius: '12px', border: '1px solid #1e293b', padding: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem', fontWeight: 600 }}>
            👥 CHUYỂN ĐỔI NGƯỜI NHẬN:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contacts.map((c) => {
              const draftCount = (state.messages[c.id] || '').length;
              return (
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
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{c.role}</div>
                  </div>
                  {draftCount > 0 && (
                    <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                      Có nháp ({draftCount})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Draft Editor */}
        <div style={{ background: '#0d1527', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid #1f293d' }}>
            <span style={{ fontSize: '1.75rem' }}>{currentContact.avatar}</span>
            <div>
              <div style={{ fontWeight: 700, color: '#f3f4f6' }}>{currentContact.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>ID: #{currentContact.id} • {currentContact.role}</div>
            </div>
          </div>

          <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.4rem' }}>
            Soạn bản nháp riêng cho <strong>{currentContact.name}</strong>:
          </label>
          <textarea
            rows={4}
            className="input-control"
            value={currentDraft}
            onChange={(e) => dispatch({ type: 'edited_message', message: e.target.value })}
            placeholder="Gõ thử vào đây rồi bấm sang người khác xem bản nháp có được giữ nguyên không..."
            style={{ resize: 'none', marginBottom: '1rem' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
              Bản nháp ID #{currentContact.id}: <code>{currentDraft.length} ký tự</code>
            </span>
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={!currentDraft.trim()}
            >
              🚀 Gửi Tới {currentContact.name}
            </button>
          </div>
        </div>
      </div>

      {/* State Inspector */}
      <div style={{ background: '#080d1a', borderRadius: '10px', border: '1px solid #1e293b', padding: '1.25rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#f97316', fontWeight: 600, marginBottom: '0.5rem' }}>
          🔍 SOI TRỰC TIẾP CẤU TRÚC HASH MAP TRONG REDUCER STATE:
        </div>
        <pre style={{ color: '#2dd4bf', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', margin: 0, overflowX: 'auto' }}>
{JSON.stringify(state, null, 2)}
        </pre>
      </div>
    </div>
  );
}
