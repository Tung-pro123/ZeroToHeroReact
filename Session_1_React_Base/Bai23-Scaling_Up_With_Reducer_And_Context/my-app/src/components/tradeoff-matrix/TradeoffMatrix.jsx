import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const SOLUTIONS = [
  {
    id: 'reducer-context',
    name: 'useReducer + useContext',
    tag: 'Built-in (Zero Dependency)',
    icon: '🏗️',
    color: '#10b981',
    pros: [
      'Không cần cài thêm bất kỳ thư viện npm bên thứ 3 nào',
      'Được hỗ trợ chính thức và vĩnh viễn bởi React Core Team',
      'Phù hợp hoàn hảo cho từng cụm tính năng độc lập (Feature-scoped)',
      'Có thể bọc nhiều Provider độc lập ở nhiều trang khác nhau',
    ],
    cons: [
      'Không có bộ chọn Fine-grained Selector mặc định (phải tự tách Context)',
      'Không hỗ trợ middleware async có sẵn (phải tự viết custom actions)',
      'Không có công cụ Time-travel DevTools chuyên dụng như Redux',
    ],
    bestFor: 'Design System, E-Commerce Cart, Hộp thoại Modal phức tạp, Ứng dụng vừa và nhỏ.',
  },
  {
    id: 'zustand',
    name: 'Zustand Store',
    tag: 'Modern Minimalist (~1.5kB)',
    icon: '🐻',
    color: '#f59e0b',
    pros: [
      'Cực kỳ nhẹ (~1.5kB), boilerplate gần như bằng 0 (chỉ 1 hàm create)',
      'Tích hợp sẵn Fine-grained Selectors: Chỉ re-render đúng thuộc tính lắng nghe',
      'Hỗ trợ gọi hàm Async/Promise trực tiếp bên trong action cực kỳ tự nhiên',
      'Có middleware persist (tự lưu localStorage), devtools Redux dễ dàng',
    ],
    cons: [
      'Store là Singleton toàn cục nằm ngoài cây React (khó scoped theo component subtree)',
      'Phải cài thêm thư viện bên ngoài vào dự án',
    ],
    bestFor: 'Đa số ứng dụng React hiện đại, Startup, Dự án SaaS vừa và lớn.',
  },
  {
    id: 'redux-toolkit',
    name: 'Redux Toolkit (RTK)',
    tag: 'Enterprise Standard',
    icon: '🔮',
    color: '#8b5cf6',
    pros: [
      'Hệ sinh thái khổng lồ, chuẩn mực doanh nghiệp toàn cầu',
      'Công cụ Redux DevTools đỉnh cao (Time-travel debugging, chụp snapshot state)',
      'Tích hợp sẵn Immer bên trong `createSlice`',
      'Kèm RTK Query cực mạnh để quản lý Server State & Caching API',
    ],
    cons: [
      'Boilerplate nhiều hơn (Actions, Slices, Store configuration)',
      'Đường cong học tập dốc đối với người mới',
      'Bundle size lớn hơn đáng kể so với Zustand',
    ],
    bestFor: 'Hệ thống tài chính, ngân hàng, sàn thương mại điện tử lớn với hàng chục lập trình viên.',
  },
];

export default function TradeoffMatrix() {
  const [selectedSolution, setSelectedSolution] = useState('reducer-context');
  const [projectSize, setProjectSize] = useState('medium');
  const [hasAsync, setHasAsync] = useState(false);
  const [needsStrictPerf, setNeedsStrictPerf] = useState(false);

  // Recommendation Engine
  let recommendation = 'reducer-context';
  if (projectSize === 'large' || (hasAsync && projectSize !== 'small')) {
    recommendation = needsStrictPerf ? 'zustand' : 'redux-toolkit';
  } else if (needsStrictPerf && projectSize === 'medium') {
    recommendation = 'zustand';
  } else {
    recommendation = 'reducer-context';
  }

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🥊</span> Bài Lab 6: Ma Trận So Sánh Kiến Trúc - Khi Nào Dùng Gì?
        </h2>
        <p className="lab-card-desc">
          Đứng ở góc độ Senior Architect: Phân tích tường tận ưu/nhược điểm giữa Reducer+Context tích hợp sẵn vs Zustand vs Redux Toolkit để đưa ra quyết định công nghệ sáng suốt cho dự án.
        </p>
      </div>

      {/* Interactive Recommendation Wizard */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.7)',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
      }}>
        <h4 style={{ margin: '0 0 1rem', color: 'var(--accent-cyan)', fontSize: '1rem' }}>
          🧭 Cố Vấn Kiến Trúc (Architecture Advisor): Chọn Tiêu Chí Dự Án Của Bạn
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Quy mô dự án:
            </label>
            <select
              className="input-control"
              value={projectSize}
              onChange={(e) => setProjectSize(e.target.value)}
            >
              <option value="small">Nhỏ / Module độc lập</option>
              <option value="medium">Vừa (Đa số dự án web)</option>
              <option value="large">Lớn (Enterprise / Nhiều team)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '1.2rem', fontSize: '0.88rem' }}>
              <input
                type="checkbox"
                checked={hasAsync}
                onChange={(e) => setHasAsync(e.target.checked)}
                style={{ width: '1.1rem', height: '1.1rem', accentColor: '#10b981' }}
              />
              <span>Cần xử lý luồng Async phức tạp?</span>
            </label>
          </div>

          <div>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '1.2rem', fontSize: '0.88rem' }}>
              <input
                type="checkbox"
                checked={needsStrictPerf}
                onChange={(e) => setNeedsStrictPerf(e.target.checked)}
                style={{ width: '1.1rem', height: '1.1rem', accentColor: '#10b981' }}
              />
              <span>Cần Fine-grained Selector khắt khe?</span>
            </label>
          </div>
        </div>

        {/* Wizard Suggestion Result */}
        <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', background: '#0a192f', border: '1px solid #06b6d4', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>💡</span>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Đề xuất phù hợp nhất: </span>
            <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>
              {SOLUTIONS.find((s) => s.id === recommendation)?.name}
            </strong>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8', marginLeft: '0.5rem' }}>
              ({SOLUTIONS.find((s) => s.id === recommendation)?.bestFor})
            </span>
          </div>
        </div>
      </div>

      {/* Solution Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {SOLUTIONS.map((sol) => (
          <div
            key={sol.id}
            onClick={() => setSelectedSolution(sol.id)}
            style={{
              background: selectedSolution === sol.id ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)',
              border: `1px solid ${selectedSolution === sol.id ? sol.color : 'var(--border-color)'}`,
              borderRadius: '12px',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: selectedSolution === sol.id ? `0 0 15px ${sol.color}33` : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{sol.icon}</span>
                <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{sol.name}</strong>
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  background: `${sol.color}22`,
                  color: sol.color,
                  border: `1px solid ${sol.color}55`,
                  fontWeight: 600,
                }}
              >
                {sol.tag}
              </span>
            </div>

            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              <strong style={{ color: '#34d399' }}>✓ Ưu điểm:</strong>
              <ul style={{ paddingLeft: '1.2rem', margin: '0.3rem 0 0.6rem', lineHeight: 1.5 }}>
                {sol.pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: '#f43f5e' }}>✕ Nhược điểm:</strong>
              <ul style={{ paddingLeft: '1.2rem', margin: '0.3rem 0', lineHeight: 1.5 }}>
                {sol.cons.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
