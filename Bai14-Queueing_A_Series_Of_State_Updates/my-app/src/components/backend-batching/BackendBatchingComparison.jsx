import InfoBox from '../common/InfoBox';

export default function BackendBatchingComparison() {
  const comparisons = [
    {
      feature: 'Mục đích cốt lõi',
      react: 'Gom nhiều lệnh setState để chỉ Render và Commit vào Real DOM một lần duy nhất.',
      hibernate: 'Gom nhiều câu SQL INSERT/UPDATE vào 1 batch duy nhất trước khi gửi qua JDBC socket.',
      kafka: 'Gom nhiều Message vào 1 batch gửi tới Broker để giảm thiểu network round-trips.',
    },
    {
      feature: 'Thời điểm kích hoạt xử lý',
      react: 'Sau khi toàn bộ JavaScript trong Event Handler (hoặc microtask queue) chạy xong.',
      hibernate: 'Khi Transaction kết thúc hoặc khi gọi session.flush() / commit().',
      kafka: 'Khi Producer đạt ngưỡng batch.size (byte) hoặc linger.ms (thời gian chờ).',
    },
    {
      feature: 'Cơ chế Hàng đợi (Queue/Updater)',
      react: 'Lưu mảng các hàm (n => n + 1) và tính toán tuần tự giá trị tiếp theo (Pending State).',
      hibernate: 'Lưu ActionQueue chứa các EntityInsertAction, EntityUpdateAction sắp xếp theo thứ tự.',
      kafka: 'Topic Partition lưu chuỗi các offset bất biến; Consumer áp dụng tuần tự theo thời gian.',
    },
    {
      feature: 'Ví dụ mã nguồn thực tế',
      react: `// React 18 gom cụm tự động\nsetCount(c => c + 1);\nsetFilter('active');\n// Chỉ render 1 lần!`,
      hibernate: `// application.properties\nspring.jpa.properties.hibernate.jdbc.batch_size=50\n// Gom 50 câu INSERT vào 1 đợt`,
      kafka: `// Producer config\nprops.put("batch.size", 16384);\nprops.put("linger.ms", 10);`,
    },
  ];

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">☕ Đối Chiếu Hibernate Batching & Message Queue</h2>
        <p className="lab-card-desc">
          So sánh tư duy tối ưu hóa hàng đợi và gom cụm giữa React Reconciler và các kiến trúc Backend phân tán (Spring Boot / Kafka).
        </p>
      </div>

      <InfoBox type="tip" title="Quy Luật Tối Ưu Hệ Thống Bất Biến">
        Bất kể là Frontend hay Backend, việc gom nhóm nhiều thay đổi nhỏ thành một đợt xử lý lớn (Batching) 
        luôn là bí quyết quan trọng nhất để triệt tiêu chi phí I/O (I/O DOM hoặc I/O Mạng).
      </InfoBox>

      {/* Comparison Grid */}
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
            <h4 style={{ color: '#c084fc', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
              📌 {c.feature}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                  ⚛️ React State Queue & Batching
                </span>
                {c.feature === 'Ví dụ mã nguồn thực tế' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.react}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.react}</p>
                )}
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                  ☕ Hibernate JDBC Batching
                </span>
                {c.feature === 'Ví dụ mã nguồn thực tế' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.hibernate}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.hibernate}</p>
                )}
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                  📨 Message Queue (Kafka / RabbitMQ)
                </span>
                {c.feature === 'Ví dụ mã nguồn thực tế' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.kafka}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.kafka}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
