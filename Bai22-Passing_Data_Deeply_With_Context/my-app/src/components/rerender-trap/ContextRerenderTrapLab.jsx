import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// ----------------------------------------------------
// ANTI-PATTERN: COMBINED CONTEXT (Gom chung state nhanh + chậm)
// ----------------------------------------------------
const CombinedAppContext = createContext(null);

// ----------------------------------------------------
// BEST PRACTICE: SPLIT CONTEXTS (Tách biệt hai luồng state)
// ----------------------------------------------------
const FastTimerContext = createContext(null);
const StableUserContext = createContext(null);

export default function ContextRerenderTrapLab() {
  const [architecture, setArchitecture] = useState('combined'); // 'combined' | 'split'
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userName, setUserName] = useState('David Miller');

  // Interval timer
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>⚡</span> Bài Lab 5: Cạm Bẫy Re-render Hàng Loạt & Chiến Lược Tách Context
        </h2>
        <p className="lab-card-desc">
          Khám phá một trong những lỗi hiệu năng phổ biến nhất trong các ứng dụng React lớn: Bất kỳ component nào gọi <code>useContext</code>
          sẽ bị re-render nếu giá trị Provider thay đổi, ngay cả khi nó không hề dùng đến thuộc tính vừa bị đổi!
        </p>
      </div>

      {/* Mode selection */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${architecture === 'combined' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setArchitecture('combined')}
        >
          🚨 Kiến Trúc 1: Gom Chung Context (Anti-Pattern - Render Bão Tố)
        </button>
        <button
          className={`btn ${architecture === 'split' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setArchitecture('split')}
        >
          🛡️ Kiến Trúc 2: Tách Rời Contexts (Senior Best Practice - Cách Ly)
        </button>
      </div>

      {/* Interactive Controls */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.7)',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            className={`btn ${isRunning ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? '⏸️ Tạm Dừng Timer' : '▶️ Chạy Timer Tự Động (800ms/lần)'}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setSeconds(0);
              setIsRunning(false);
            }}
          >
            🔄 Reset Timer
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tên User:</span>
          <input
            type="text"
            className="input-control"
            style={{ width: '180px', padding: '0.4rem 0.75rem' }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      {architecture === 'combined' ? (
        <InfoBox type="danger" title="Phân Tích Cạm Bẫy (Combined Context):">
          Ở chế độ này, <code>CombinedAppContext.Provider value={'{ seconds, userName }'}</code> cung cấp cả 2 giá trị.
          Mỗi khi <code>seconds</code> nhảy số, toàn bộ object value là một tham chiếu mới.
          Thành phần <code>UserProfileViewer</code> <strong>chỉ cần <code>userName</code></strong>, nhưng vẫn bị ÉP RE-RENDER liên tục!
          Quan sát bộ đếm số lần render màu đỏ bên dưới tăng vọt!
        </InfoBox>
      ) : (
        <InfoBox type="tip" title="Tối Ưu Hoá Bằng Context Splitting:">
          Ta tách thành <code>FastTimerContext</code> (chứa <code>seconds</code> biến động nhanh) và <code>StableUserContext</code> (chứa <code>userName</code> tĩnh).
          Bây giờ <code>UserProfileViewer</code> chỉ đăng ký vào <code>StableUserContext</code>.
          Khi Timer nhảy số, <code>UserProfileViewer</code> hoàn toàn KHÔNG re-render! Bộ đếm đứng yên 1!
        </InfoBox>
      )}

      {/* Live Visualizer Area */}
      <div style={{ marginTop: '1.5rem' }}>
        {architecture === 'combined' ? (
          <CombinedAppContext.Provider value={{ seconds, userName }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <CombinedTimerWidget />
              <CombinedUserProfileWidget />
            </div>
          </CombinedAppContext.Provider>
        ) : (
          <FastTimerContext.Provider value={seconds}>
            <StableUserContext.Provider value={userName}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                <SplitTimerWidget />
                <SplitUserProfileWidget />
              </div>
            </StableUserContext.Provider>
          </FastTimerContext.Provider>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ANTI-PATTERN COMPONENTS (Combined Context)
// ----------------------------------------------------
function CombinedTimerWidget() {
  const { seconds } = useContext(CombinedAppContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{
      background: 'rgba(6, 182, 212, 0.05)',
      border: '1px solid rgba(6, 182, 212, 0.3)',
      borderRadius: '10px',
      padding: '1.25rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, color: 'var(--accent-cyan)' }}>⏱️ Đồng Hồ (Dùng seconds)</h4>
        <span className="badge badge-cyan">Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
        {seconds}s
      </div>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Component này tiêu thụ <code>seconds</code>, re-render là hoàn toàn hợp lý.
      </p>
    </div>
  );
}

function CombinedUserProfileWidget() {
  // RỦI RO LỚN: Nhận cả context chứa seconds
  const { userName } = useContext(CombinedAppContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{
      background: 'rgba(244, 63, 94, 0.07)',
      border: '2px dashed #f43f5e',
      borderRadius: '10px',
      padding: '1.25rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, color: '#f43f5e' }}>👤 User Profile (Chỉ dùng userName!)</h4>
        <span className="badge badge-rose">💥 Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
        Xin chào, {userName}
      </div>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: '#fda4af' }}>
        ⚠️ <strong>Lãng phí hiệu năng:</strong> Tên người dùng không đổi, nhưng vì gom chung Context với Timer nên component này bị kéo theo re-render {renderCount.current} lần!
      </p>
    </div>
  );
}

// ----------------------------------------------------
// BEST PRACTICE COMPONENTS (Split Contexts)
// ----------------------------------------------------
function SplitTimerWidget() {
  const seconds = useContext(FastTimerContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{
      background: 'rgba(6, 182, 212, 0.05)',
      border: '1px solid rgba(6, 182, 212, 0.3)',
      borderRadius: '10px',
      padding: '1.25rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, color: 'var(--accent-cyan)' }}>⏱️ Đồng Hồ (FastTimerContext)</h4>
        <span className="badge badge-cyan">Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
        {seconds}s
      </div>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Chỉ lắng nghe <code>FastTimerContext</code>.
      </p>
    </div>
  );
}

function SplitUserProfileWidget() {
  // Chỉ đăng ký nhận StableUserContext! Hoàn toàn miễn nhiễm với Timer
  const userName = useContext(StableUserContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{
      background: 'rgba(16, 185, 129, 0.07)',
      border: '1px solid #10b981',
      borderRadius: '10px',
      padding: '1.25rem',
      boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, color: '#34d399' }}>👤 User Profile (StableUserContext)</h4>
        <span className="badge badge-emerald">✨ Tối Ưu Renders: {renderCount.current}</span>
      </div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
        Xin chào, {userName}
      </div>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: '#a7f3d0' }}>
        ✅ <strong>Hiệu năng tối đa:</strong> Timer có chạy hàng nghìn giây thì component này vẫn chỉ render ĐÚNG 1 LẦN duy nhất!
      </p>
    </div>
  );
}
