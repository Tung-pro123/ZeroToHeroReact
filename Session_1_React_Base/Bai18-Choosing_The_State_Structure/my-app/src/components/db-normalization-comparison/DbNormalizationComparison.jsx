import InfoBox from '../common/InfoBox';

export default function DbNormalizationComparison() {
  const comparisons = [
    {
      principle: '1. Không lưu dữ liệu tính toán được (Derived State)',
      react: `// fullName tính từ first + last\nconst fullName = \`\${first} \${last}\`;`,
      db: `// Không lưu total_amount trong bảng Orders\nSELECT SUM(price * qty) FROM order_items;`,
      benefit: 'Triệt tiêu 100% lỗi mâu thuẫn dữ liệu giữa trường nguồn và trường kết quả.',
    },
    {
      principle: '2. Lưu Khóa Chính thay vì nhân bản Object',
      react: `// Lưu selectedId thay vì selectedItem\nconst [selectedId, setSelectedId] = useState(1);`,
      db: `// Bảng Orders chỉ lưu user_id (Foreign Key)\norders (id, user_id, order_date)`,
      benefit: 'Khi người dùng cập nhật hồ sơ, tất cả các đơn hàng tự động tham chiếu dữ liệu mới.',
    },
    {
      principle: '3. Chuẩn hóa cấu trúc phẳng (Flattening)',
      react: `// Hash Map Normalized\nconst usersById = { 1: { id: 1, name: 'Alice' } };`,
      db: `// Quan hệ 1-N chuẩn 3NF\nusers (id, name), posts (id, user_id, content)`,
      benefit: 'Tránh hiện tượng Update Anomaly và Delete Anomaly trong bộ nhớ.',
    },
    {
      principle: '4. Kiểm tra thành viên với tốc độ O(1)',
      react: `// JS Set\nconst selected = new Set([1, 2]);\nselected.has(id); // O(1)`,
      db: `// B-Tree Index trên khóa chính Primary Key\nCREATE INDEX idx_user_id ON users(id);`,
      benefit: 'Tối ưu hóa hiệu năng tra cứu khi số lượng bản ghi lên tới hàng ngàn.',
    },
  ];

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🗄️ Đối Chiếu Chuẩn Hóa CSDL Quan Hệ (3NF)</h2>
        <p className="lab-card-desc">
          So sánh tư duy thiết kế State trong React với các chuẩn mực thiết kế Database Normalization trong ngành kỹ thuật phần mềm.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất: Single Source of Truth">
        Cả kiến trúc Frontend hiện đại và CSDL quan hệ đều hướng tới một chân lý tối thượng: 
        <strong>"Mỗi mẩu dữ liệu chỉ được phép tồn tại ở đúng MỘT nơi duy nhất (Single Source of Truth)"</strong>.
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h4 style={{ color: '#a855f7', fontSize: '1.05rem' }}>📌 {c.principle}</h4>
              <span style={{ fontSize: '0.8rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                {c.benefit}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                  ⚛️ React State Design
                </span>
                <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.react}</pre>
              </div>

              <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                  🗄️ Database Normalization (3NF)
                </span>
                <pre className="code-pill" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.db}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
