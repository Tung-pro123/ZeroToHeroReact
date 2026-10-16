import InfoBox from '../common/InfoBox';

export default function DatabaseSnapshotComparison() {
  const comparisonData = [
    {
      feature: 'Nguyên lý cốt lõi',
      react: 'State as a Snapshot: Mỗi chu kỳ Render nhận một bản sao bất biến của state tại thời điểm kích hoạt.',
      db: 'Snapshot Isolation (MVCC): Mỗi Transaction đọc dữ liệu từ một snapshot nhất quán tại thời điểm Transaction bắt đầu.',
      spring: 'Java Record / Immutable DTO: Dữ liệu truyền giữa các service layer là đối tượng bất biến, tránh side-effects do sửa biến chung.',
    },
    {
      feature: 'Thời điểm thay đổi có hiệu lực',
      react: 'Chỉ có hiệu lực ở LẦN RENDER TIẾP THEO sau khi React lên lịch và hoàn tất commit.',
      db: 'Chỉ có hiệu lực sau khi Transaction gọi COMMIT thành công, các transaction khác mới thấy bản ghi mới.',
      spring: 'Sau khi Spring Transaction interceptor commit dữ liệu vào Database qua EntityManager.',
    },
    {
      feature: 'Ngăn chặn lỗi chạy đua (Race Condition)',
      react: 'Closure bắt giữ Snapshot giúp các tác vụ bất đồng bộ (delay chat, API) luôn gửi đúng dữ liệu người dùng đã chọn.',
      db: 'Ngăn chặn Non-repeatable Read và Phantom Read, đảm bảo hai câu truy vấn trong cùng 1 transaction trả về kết quả giống hệt nhau.',
      spring: 'Đảm bảo thread-safety mà không cần synchronized block phức tạp nhờ đối tượng Immutable.',
    },
    {
      feature: 'Đoạn mã tương đương',
      react: `// React Functional Component\nconst [count, setCount] = useState(0);\nsetCount(count + 1); // Không đổi count hiện tại`,
      db: `// SQL MVCC\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\nBEGIN TRANSACTION;\nSELECT balance FROM accounts WHERE id = 1;`,
      spring: `// Java Record bất biến\npublic record AccountSnapshot(Long id, BigDecimal balance) {}\nAccountSnapshot updated = new AccountSnapshot(id, newBalance);`,
    },
  ];

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🗄️ Đối Chiếu Database MVCC & Spring Transactions</h2>
        <p className="lab-card-desc">
          Khám phá sự tương đồng kỳ diệu giữa tư duy Frontend Snapshot của React và tư duy Snapshot Isolation trong cơ sở dữ liệu backend.
        </p>
      </div>

      <InfoBox type="tip" title="Tư Duy Đỉnh Cao Của Kỹ Sư Hệ Thống">
        Dù ở Frontend hay Backend, nguyên tắc thiết kế bất biến (Immutability) và Snapshot luôn là chìa khóa vàng 
        để giải quyết vấn đề bất đồng bộ, luồng xử lý đồng thời (concurrency) và tính nhất quán dữ liệu.
      </InfoBox>

      {/* Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', margin: '1.5rem 0' }}>
        {comparisonData.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '1.25rem',
            }}
          >
            <h4 style={{ color: '#38bdf8', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
              📌 {item.feature}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {/* React */}
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                  ⚛️ React Frontend
                </span>
                {item.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{item.react}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{item.react}</p>
                )}
              </div>

              {/* Database MVCC */}
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
                  🗄️ Database MVCC (Postgres/MySQL)
                </span>
                {item.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{item.db}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{item.db}</p>
                )}
              </div>

              {/* Spring Boot */}
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
                  ☕ Java / Spring Boot
                </span>
                {item.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{item.spring}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{item.spring}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
