import InfoBox from '../common/InfoBox';

export default function SpringStateComparison() {
  const comparisons = [
    {
      feature: 'Triết lý mô hình hóa',
      react: 'Finite State Machine (FSM): Giao diện chỉ được phép ở 1 trạng thái hợp lệ tại 1 thời điểm (typing, submitting, success).',
      spring: 'Spring State Machine / Domain State Pattern: Đối tượng nghiệp vụ (Order/Payment) chuyển trạng thái theo quy tắc chặt chẽ.',
      db: 'Cột CSDL status ENUM: Chỉ lưu 1 giá trị duy nhất, không tạo nhiều cột cờ boolean rời rạc.',
    },
    {
      feature: 'Phòng chống nghịch lý (Paradox)',
      react: 'Gộp các cờ boolean thành 1 biến status. Không thể vừa gõ chữ (typing) vừa submitting.',
      spring: 'Chặn các bước chuyển trạng thái bất hợp lệ (ví dụ không thể chuyển từ CANCELLED sang DELIVERED).',
      db: 'Loại trừ nguy cơ xuất hiện bản ghi: is_paid = true nhưng đồng thời is_cancelled = true.',
    },
    {
      feature: 'Đoạn mã tương đương',
      react: `// React State FSM\nconst [status, setStatus] = useState('typing');\n// 'typing' | 'submitting' | 'success'`,
      spring: `// Java Enum State Pattern\npublic enum OrderStatus {\n    CREATED, PAID, SHIPPING, CANCELLED\n}`,
      db: `// SQL DDL\nCREATE TABLE orders (\n    id BIGINT PRIMARY KEY,\n    status VARCHAR(20) NOT NULL\n);`,
    },
  ];

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">☕ Đối Chiếu Spring State Machine & Domain Enum</h2>
        <p className="lab-card-desc">
          Khám phá sự tương đồng giữa tư duy Khai Báo (Declarative FSM) của React và mô hình Máy trạng thái trong kiến trúc Backend Enterprise.
        </p>
      </div>

      <InfoBox type="tip" title="Tư Duy Thiết Kế Chuẩn Mực">
        Dù ở Frontend hay Backend, việc dùng các cờ boolean riêng lẻ (boolean flags) để biểu thị các giai đoạn vòng đời 
        luôn là nguồn gốc của 90% các bug logic nghiêm trọng. Hãy luôn dùng Máy Trạng Thái (FSM)!
      </InfoBox>

      {/* Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '1.5rem 0' }}>
        {comparisons.map((c, i) => (
          <div
            key={i}
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <h4 style={{ color: '#38bdf8', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
              📌 {c.feature}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                  ⚛️ React Declarative UI
                </span>
                {c.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.react}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.react}</p>
                )}
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                  ☕ Spring Boot Domain FSM
                </span>
                {c.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.spring}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.spring}</p>
                )}
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                  🗄️ Database Schema Design
                </span>
                {c.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.db}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.db}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
