import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const initialContacts = [
  { id: '101', name: 'Nguyễn Văn An', role: 'Frontend Lead', email: 'an.nguyen@company.vn' },
  { id: '102', name: 'Trần Thị Bích', role: 'UI/UX Designer', email: 'bich.tran@company.vn' },
  { id: '103', name: 'Lê Hoàng Cường', role: 'Backend Architect', email: 'cuong.le@company.vn' },
];

// Sub-component liên hệ có State ghi chú nội bộ
function ContactCard({ contact, index, useIndexKey }) {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState('');

  return (
    <div
      style={{
        background: '#0d1527',
        border: expanded ? '1px solid #f59e0b' : '1px solid #1e293b',
        borderRadius: '10px',
        padding: '1.25rem',
        marginBottom: '0.75rem',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '1rem', color: '#f3f4f6' }}>
            {contact.name}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
            {contact.role} • {contact.email}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`badge ${useIndexKey ? 'badge-rose' : 'badge-emerald'}`}>
            key={useIndexKey ? index : contact.id}
          </span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '▲ Thu Gọn' : '▼ Ghi Chú'}
          </button>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #1f293d' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#fbbf24', marginBottom: '0.3rem' }}>
            📝 Ghi chú cá nhân (State nội bộ):
          </label>
          <input
            type="text"
            className="input-control"
            placeholder="Gõ ghi chú riêng cho người này..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          {note && (
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '0.25rem' }}>
              Nội dung lưu trong state: <em>&quot;{note}&quot;</em>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ListKeySortLab() {
  const [contacts, setContacts] = useState(initialContacts);
  const [useIndexKey, setUseIndexKey] = useState(false);

  const handleReverse = () => {
    setContacts([...contacts].reverse());
  };

  const handleResetList = () => {
    setContacts(initialContacts);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">📋 4. Thử Thách 5: Sắp Xếp Danh Sách & Lỗi Lệch State (Misplaced State)</h2>
        <p className="lab-card-desc">
          Tái hiện lỗi tai hại khi dùng chỉ số mảng <code>key=&#123;index&#125;</code>: Khi danh sách bị đảo ngược hoặc sắp xếp, 
          trạng thái State lại bị dán nhầm vào người khác!
        </p>
      </div>

      {/* Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${!useIndexKey ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => { setUseIndexKey(false); setContacts(initialContacts); }}
        >
          ✅ Chuẩn: key={'{contact.id}'} (State đi theo đúng người)
        </button>
        <button
          className={`btn ${useIndexKey ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => { setUseIndexKey(true); setContacts(initialContacts); }}
        >
          ❌ Lỗi: key={'{index}'} (State bị dán nhầm người khi sắp xếp!)
        </button>
      </div>

      <InfoBox
        type={!useIndexKey ? 'tip' : 'danger'}
        title={!useIndexKey ? 'Đang Dùng ID Duy Nhất Làm Key' : 'Thử Nghiệm Lỗi Misplaced State Với key={index}:'}
      >
        {!useIndexKey ? (
          <div>
            Hãy mở phần Ghi chú của <strong>Nguyễn Văn An</strong>, gõ chữ: <em>&quot;Trưởng nhóm cực kỳ nhiệt tình&quot;</em>.
            Sau đó bấm nút <strong>&quot;Đảo Ngược Danh Sách&quot;</strong>. Dòng ghi chú sẽ ngoan ngoãn đi theo Nguyễn Văn An xuống vị trí cuối cùng!
          </div>
        ) : (
          <div>
            1. Mở Ghi chú của <strong>Nguyễn Văn An</strong> (người đầu tiên), gõ: <em>&quot;Người bạn thân thiết&quot;</em>.<br />
            2. Bấm nút <strong>&quot;Đảo Ngược Danh Sách&quot;</strong>.<br />
            3. Bạn sẽ kinh hoàng phát hiện: Dòng ghi chú đó lại dính vào <strong>Lê Hoàng Cường</strong> (vì Cường bị đẩy lên vị trí index=0)!
          </div>
        )}
      </InfoBox>

      {/* Action Toolbar */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={handleReverse}>
          🔄 Đảo Ngược Danh Sách (Reverse)
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleResetList}>
          Khôi Phục Ban Đầu
        </button>
      </div>

      {/* Contact Cards List */}
      <div>
        {contacts.map((contact, index) =>
          useIndexKey ? (
            <ContactCard
              key={index}
              contact={contact}
              index={index}
              useIndexKey={true}
            />
          ) : (
            <ContactCard
              key={contact.id}
              contact={contact}
              index={index}
              useIndexKey={false}
            />
          )
        )}
      </div>
    </div>
  );
}
