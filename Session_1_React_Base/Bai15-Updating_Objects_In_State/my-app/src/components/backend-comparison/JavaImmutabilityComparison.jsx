import InfoBox from '../common/InfoBox';

export default function JavaImmutabilityComparison() {
  const comparisons = [
    {
      feature: 'Tư duy thiết kế cốt lõi',
      react: 'React State Immutability: Đối tượng state là bất biến (Read-only); thay đổi bằng cách tạo object mới.',
      javaLombok: 'Lombok @Builder(toBuilder = true): Tạo đối tượng mới dựa trên khuôn mẫu của đối tượng cũ.',
      hibernate: 'Hibernate Managed Entity: Thực thể trong Persistence Context là Mutable, theo dõi qua Dirty Checking.',
    },
    {
      feature: 'Cách thức thay đổi 1 trường',
      react: `{ ...user, email: 'new@fpt.edu.vn' } hoặc update(draft => { draft.email = '...'; })`,
      javaLombok: `user.toBuilder().email("new@fpt.edu.vn").build()`,
      hibernate: `user.setEmail("new@fpt.edu.vn"); // Hibernate tự sinh câu lệnh UPDATE lúc flush()`,
    },
    {
      feature: 'Đo lường sự thay đổi',
      react: 'So sánh tham chiếu ô nhớ O(1): Object.is(prev, next). Khác địa chỉ là re-render ngay.',
      javaLombok: 'So sánh equals() / hashCode() giữa các phiên bản Immutable Value Objects.',
      hibernate: 'Duyệt đệ quy so sánh từng trường dữ liệu giữa Loaded Snapshot và Current Entity state.',
    },
    {
      feature: 'Đoạn mã tương đương',
      react: `// React Spread\nconst nextUser = {\n  ...user,\n  role: 'Tech Lead'\n};\nsetUser(nextUser);`,
      javaLombok: `// Java Record / Lombok\nUser nextUser = user.toBuilder()\n    .role("Tech Lead")\n    .build();`,
      hibernate: `// JPA Transactional\n@Transactional\npublic void updateRole(Long id) {\n  User user = repo.findById(id);\n  user.setRole("Tech Lead");\n}`,
    },
  ];

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">☕ Đối Chiếu Lombok Builder & Java Records</h2>
        <p className="lab-card-desc">
          Khám phá sự tương đồng kỳ thú giữa toán tử Spread của React và mẫu thiết kế Builder bất biến trong hệ sinh thái Java / Spring Boot.
        </p>
      </div>

      <InfoBox type="tip" title="Bất Biến (Immutability) Trong Phần Mềm Hiện Đại">
        Dù ở Frontend hay Backend, Immutability giúp triệt tiêu hoàn toàn các lỗi khó lường liên quan đến đa luồng (Concurrency), 
        hiệu ứng phụ (Side-effects), và giúp việc truy vết lỗi (Debugging) trở nên dễ dàng hơn bao giờ hết.
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
            <h4 style={{ color: '#10b981', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
              📌 {c.feature}
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                  ⚛️ React Object State
                </span>
                {c.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.react}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.react}</p>
                )}
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                  ☕ Java Lombok toBuilder()
                </span>
                {c.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.javaLombok}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.javaLombok}</p>
                )}
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                  🗄️ Hibernate Managed Entity
                </span>
                {c.feature === 'Đoạn mã tương đương' ? (
                  <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.hibernate}</pre>
                ) : (
                  <p style={{ fontSize: '0.88rem', color: '#cbd5e1', marginTop: '0.35rem' }}>{c.hibernate}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
