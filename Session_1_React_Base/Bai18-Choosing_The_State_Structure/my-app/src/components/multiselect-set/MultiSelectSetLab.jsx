import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const initialEmails = [
  { id: 1, sender: '🛡️ Google Security', subject: 'Phát hiện đăng nhập mới từ Windows', time: '10:30' },
  { id: 2, sender: '🐙 GitHub Notifications', subject: '[PR #18] Feature State Structure merged', time: '09:15' },
  { id: 3, sender: '🎓 FPT University', subject: 'Thông báo lịch bảo vệ đồ án tốt nghiệp Fall 2026', time: 'Hôm qua' },
  { id: 4, sender: '💳 VNPAY', subject: 'Biên lai giao dịch nạp tiền thành công', time: 'Hôm qua' },
  { id: 5, sender: '☁️ AWS Cloud', subject: 'Cảnh báo hạn mức sử dụng EC2 t3.micro', time: '2 ngày trước' },
];

export default function MultiSelectSetLab() {
  // ✅ Quản lý danh sách ID chọn bằng cấu trúc Set
  const [selectedIds, setSelectedIds] = useState(new Set([1, 2]));

  const handleToggle = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    setSelectedIds(new Set(initialEmails.map((e) => e.id)));
  };

  const handleClearAll = () => {
    setSelectedIds(new Set());
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">⚡ Chọn Nhiều Mục Với JavaScript Set (O(1))</h2>
        <p className="lab-card-desc">
          Tái hiện Challenge 4 trong React Docs: Xây dựng tính năng Multiple Selection cho hộp thư email bằng cấu trúc dữ liệu <code>Set</code> siêu tốc.
        </p>
      </div>

      <InfoBox type="tip" title="Tại Sao Nên Dùng new Set() Thay Vì Mảng [1, 2, 3]?">
        Với mảng thông thường, hàm <code>arr.includes(id)</code> phải quét tuần tự với độ phức tạp $O(N)$. 
        Với <code>Set</code>, hàm <code>set.has(id)</code> là phép băm (Hash Table) với tốc độ **$O(1)$ tức thì**, cực kỳ mạnh mẽ khi danh sách có hàng ngàn email.
      </InfoBox>

      {/* Action Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', margin: '1.25rem 0' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleSelectAll}>
            ☑️ Chọn Tất Cả ({initialEmails.length})
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleClearAll}>
            ⏹️ Bỏ Chọn Hết
          </button>
        </div>

        <div style={{ fontSize: '0.95rem', color: '#38bdf8', fontWeight: 600 }}>
          Đã chọn: <strong style={{ color: '#a855f7', fontSize: '1.2rem' }}>{selectedIds.size}</strong> email
        </div>
      </div>

      {/* Email Inbox List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {initialEmails.map((email) => {
          const isSelected = selectedIds.has(email.id);

          return (
            <div
              key={email.id}
              onClick={() => handleToggle(email.id)}
              className={`list-item-card ${isSelected ? 'selected' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}} // Đã được xử lý bởi onClick div ngoài
                  style={{ width: '18px', height: '18px', accentColor: '#a855f7', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: isSelected ? '#a855f7' : '#f8fafc', fontSize: '0.95rem' }}>
                    {email.sender}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    {email.subject}
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                {email.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Code snippet */}
      <div style={{ marginTop: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Cách sao chép và cập nhật Set an toàn trong React:</span>
        <pre className="code-pill">
{`function handleToggle(id) {\n  const next = new Set(selectedIds); // 1. Sao chép Set cũ\n  if (next.has(id)) {\n    next.delete(id); // 2. Bỏ chọn O(1)\n  } else {\n    next.add(id);    // 3. Chọn O(1)\n  }\n  setSelectedIds(next); // 4. Kích hoạt re-render với Set mới\n}`}
        </pre>
      </div>
    </div>
  );
}
