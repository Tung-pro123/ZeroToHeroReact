import InfoBox from '../common/InfoBox';

export default function JavaStreamComparison() {
  const comparisons = [
    {
      action: 'Lọc phần tử (Filter)',
      js: `// React Array Filter\nconst activeUsers = users.filter(u => u.active);`,
      java: `// Java 8+ Stream API\nList<User> activeUsers = users.stream()\n    .filter(User::isActive)\n    .toList();`,
      note: 'Cả hai đều giữ nguyên mảng/danh sách nguồn, chỉ trả về một tập hợp bản sao mới.',
    },
    {
      action: 'Biến đổi phần tử (Map)',
      js: `// React Array Map\nconst userNames = users.map(u => u.name.toUpperCase());`,
      java: `// Java Stream Map\nList<String> userNames = users.stream()\n    .map(u -> u.getName().toUpperCase())\n    .toList();`,
      note: 'Duyệt qua từng phần tử và áp dụng hàm chuyển đổi $f(x)$ thuần khiết.',
    },
    {
      action: 'Cập nhật 1 phần tử theo ID',
      js: `// React Immutable Replace\nsetUsers(users.map(u => \n  u.id === targetId ? { ...u, role: 'Admin' } : u\n));`,
      java: `// Java Record / Builder\nList<User> updated = users.stream()\n    .map(u -> u.id().equals(targetId) \n        ? u.toBuilder().role("Admin").build() \n        : u)\n    .toList();`,
      note: 'Tạo đối tượng mới cho phần tử khớp ID và giữ nguyên các phần tử không bị tác động.',
    },
    {
      action: 'Tính tổng / Tích lũy (Reduce)',
      js: `// JS Reduce\nconst total = cart.reduce((sum, item) => \n  sum + item.price * item.count, 0\n);`,
      java: `// Java Stream Reduce / sum\ndouble total = cart.stream()\n    .mapToDouble(i -> i.getPrice() * i.getCount())\n    .sum();`,
      note: 'Gộp mảng nhiều phần tử về một giá trị vô hướng duy nhất (Scalar).',
    },
  ];

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">☕ Đối Chiếu Java 8+ Stream API</h2>
        <p className="lab-card-desc">
          Khám phá sự giao thoa hoàn mỹ giữa tư duy Mảng Bất Biến của React và Java Stream API trong hệ sinh thái Spring Boot.
        </p>
      </div>

      <InfoBox type="tip" title="Triết Lý Lập Trình Hàm (Functional Programming)">
        Cả React Immutable Array và Java Stream API đều cấm kỵ việc sửa đổi danh sách gốc. 
        Mọi thao tác đều là luồng xử lý dữ liệu (Data Pipeline) chảy qua các toán tử thuần khiết và sản sinh kết quả mới.
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ color: '#f59e0b', fontSize: '1.05rem' }}>📌 {c.action}</h4>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{c.note}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                  ⚛️ JavaScript / React Immutable
                </span>
                <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.js}</pre>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                  ☕ Java 8+ Stream API
                </span>
                <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.java}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
