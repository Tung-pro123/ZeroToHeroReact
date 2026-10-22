import { useState, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// 1. Tạo LevelContext với giá trị mặc định là 0
const LevelContext = createContext(0);

// Bảng màu cho từng cấp độ lồng nhau
const LEVEL_COLORS = [
  '#06b6d4', // Level 1 - Cyan
  '#3b82f6', // Level 2 - Blue
  '#8b5cf6', // Level 3 - Purple
  '#ec4899', // Level 4 - Pink
  '#f59e0b', // Level 5 - Amber
  '#10b981', // Level 6 - Emerald
];

export default function AdaptiveHeadingsLab() {
  const [activePreset, setActivePreset] = useState('blog');

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>📑</span> Bài Lab 2: Tiêu Đề Thích Ứng & Kỹ Thuật Context Shadowing
        </h2>
        <p className="lab-card-desc">
          Mô hình kinh điển từ tài liệu chính thức React.dev: Component <code>&lt;Heading&gt;</code> tự động xác định
          thẻ HTML (<code>h1</code> đến <code>h6</code>) dựa vào độ sâu của các thẻ <code>&lt;Section&gt;</code> lồng nhau
          thông qua cơ chế ghi đè Context (Context Shadowing).
        </p>
      </div>

      <InfoBox type="info" title="Context Shadowing (Ghi Đè Context Theo Tầng):">
        Trong một cây component, nếu Provider con cấp 2 cung cấp giá trị mới, nó sẽ che khuất (shadow) giá trị
        của Provider cha cấp 1 đối với toàn bộ cây con bên dưới nó! Nhờ đó, mỗi thẻ <code>&lt;Section&gt;</code> chỉ cần
        đọc <code>parentLevel = useContext(LevelContext)</code> và cung cấp <code>parentLevel + 1</code> cho con của mình.
      </InfoBox>

      {/* Preset selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activePreset === 'blog' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActivePreset('blog')}
        >
          📰 Cấu Trúc Bài Báo Blog (3 Cấp)
        </button>
        <button
          className={`btn ${activePreset === 'docs' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActivePreset('docs')}
        >
          📚 Tài Liệu Kỹ Thuật React (5 Cấp Sâu)
        </button>
        <button
          className={`btn ${activePreset === 'dashboard' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActivePreset('dashboard')}
        >
          📊 Hệ Thống Phân Cấp Dashboard (4 Cấp)
        </button>
      </div>

      {/* Live Rendering Area */}
      <div style={{
        background: '#090d16',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid #1e293b',
      }}>
        {activePreset === 'blog' && <BlogPreset />}
        {activePreset === 'docs' && <DocsPreset />}
        {activePreset === 'dashboard' && <DashboardPreset />}
      </div>

      {/* Code Architecture Breakdown */}
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#0d1322', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            🛠️ Section.jsx (Tự động tăng level)
          </h4>
          <pre style={{ margin: 0, fontSize: '0.8rem', color: '#93c5fd', fontFamily: 'var(--font-mono)' }}>
{`function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section-card">
      {/* Cung cấp level + 1 cho mọi con cháu */}
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}`}
          </pre>
        </div>

        <div style={{ background: '#0d1322', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <h4 style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            🎯 Heading.jsx (Tự render đúng thẻ h1..h6)
          </h4>
          <pre style={{ margin: 0, fontSize: '0.8rem', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
{`function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1: return <h1>{children}</h1>;
    case 2: return <h2>{children}</h2>;
    case 3: return <h3>{children}</h3>;
    case 4: return <h4>{children}</h4>;
    case 5: return <h5>{children}</h5>;
    default: return <h6>{children}</h6>;
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CORE REUSABLE SECTION & HEADING
// ----------------------------------------------------
function Section({ children }) {
  const level = useContext(LevelContext);
  const nextLevel = Math.min(level + 1, 6);
  const accentColor = LEVEL_COLORS[nextLevel - 1] || '#94a3b8';

  return (
    <div style={{
      borderLeft: `3px solid ${accentColor}`,
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '8px',
      padding: '1rem 1.25rem',
      marginTop: '0.85rem',
      transition: 'all 0.2s ease',
    }}>
      <LevelContext.Provider value={nextLevel}>
        {children}
      </LevelContext.Provider>
    </div>
  );
}

function Heading({ children }) {
  const level = useContext(LevelContext);
  const accentColor = LEVEL_COLORS[level - 1] || '#94a3b8';

  const badge = (
    <span style={{
      fontSize: '0.7rem',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      background: `${accentColor}22`,
      color: accentColor,
      border: `1px solid ${accentColor}55`,
      marginLeft: '0.75rem',
      fontWeight: 500,
      verticalAlign: 'middle',
      fontFamily: 'var(--font-mono)'
    }}>
      &lt;h{level}&gt; (Level {level})
    </span>
  );

  switch (level) {
    case 1:
      return <h1 style={{ color: accentColor, fontSize: '1.75rem', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center' }}>{children} {badge}</h1>;
    case 2:
      return <h2 style={{ color: accentColor, fontSize: '1.4rem', margin: '0 0 0.45rem', display: 'flex', alignItems: 'center' }}>{children} {badge}</h2>;
    case 3:
      return <h3 style={{ color: accentColor, fontSize: '1.15rem', margin: '0 0 0.4rem', display: 'flex', alignItems: 'center' }}>{children} {badge}</h3>;
    case 4:
      return <h4 style={{ color: accentColor, fontSize: '1rem', margin: '0 0 0.35rem', display: 'flex', alignItems: 'center' }}>{children} {badge}</h4>;
    case 5:
      return <h5 style={{ color: accentColor, fontSize: '0.9rem', margin: '0 0 0.3rem', display: 'flex', alignItems: 'center' }}>{children} {badge}</h5>;
    case 6:
    default:
      return <h6 style={{ color: accentColor, fontSize: '0.82rem', margin: '0 0 0.25rem', display: 'flex', alignItems: 'center' }}>{children} {badge}</h6>;
  }
}

// ----------------------------------------------------
// PRESETS
// ----------------------------------------------------
function BlogPreset() {
  return (
    <Section>
      <Heading>Hành Trình Chinh Phục React 18 & 19</Heading>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
        Tác giả: Senior Frontend Engineer • 15 phút đọc
      </p>

      <Section>
        <Heading>Chương 1: Tư Duy Quản Lý State Toàn Cục</Heading>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Khi ứng dụng phình to, việc truyền props thủ công trở thành gánh nặng bảo trì.
        </p>

        <Section>
          <Heading>1.1 Khái Niệm Prop Drilling Là Gì?</Heading>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Hiện tượng truyền dữ liệu qua những component không cần dùng đến nó.
          </p>
        </Section>

        <Section>
          <Heading>1.2 Giải Pháp Context API Ra Đời</Heading>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Tạo kênh truyền thông tin xuyên qua mọi cấp cây component.
          </p>
        </Section>
      </Section>

      <Section>
        <Heading>Chương 2: Tối Ưu Hiệu Năng & Tránh Render Thừa</Heading>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Kỹ thuật tách Context (Split Context) và ghi nhớ giá trị (useMemo).
        </p>
      </Section>
    </Section>
  );
}

function DocsPreset() {
  return (
    <Section>
      <Heading>React Internal Architecture Documentation</Heading>
      <Section>
        <Heading>Fiber Reconciler Engine</Heading>
        <Section>
          <Heading>Work Loop & Concurrency</Heading>
          <Section>
            <Heading>Time Slicing Algorithm</Heading>
            <Section>
              <Heading>Lane Priority Assignment</Heading>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Ở cấp độ sâu 5 này, <code>&lt;Heading&gt;</code> tự động biến thành thẻ <code>&lt;h5&gt;</code> mà không cần truyền prop <code>level=5</code> nào cả!
              </p>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

function DashboardPreset() {
  return (
    <Section>
      <Heading>Enterprise Cloud Analytics Console</Heading>
      <Section>
        <Heading>Khu Vực Phân Tích Hạ Tầng (Infrastructure)</Heading>
        <Section>
          <Heading>Kubernetes Cluster Nodes</Heading>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            Đang vận hành 12 Nodes tại khu vực Singapore ap-southeast-1.
          </p>
          <Section>
            <Heading>Pod CPU & Memory Utilization</Heading>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Mức tải trung bình: 64% RAM, 38% CPU.
            </p>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
