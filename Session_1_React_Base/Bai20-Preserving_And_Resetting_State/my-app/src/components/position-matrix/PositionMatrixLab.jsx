import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Sub-component Counter
function Counter({ isFancy, label = 'Người chơi' }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`counter-box ${isFancy ? 'fancy' : ''}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      style={{
        transform: hover ? 'translateY(-3px)' : 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600, color: isFancy ? '#fbbf24' : '#e5e7eb' }}>
          {label} {isFancy && '✨ (Fancy Style)'}
        </span>
        <span className={`badge ${isFancy ? 'badge-amber' : 'badge-emerald'}`}>
          {isFancy ? 'Giao Diện Vàng' : 'Giao Diện Thường'}
        </span>
      </div>

      <div className="counter-score">{score}</div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button className="btn btn-emerald btn-sm" onClick={() => setScore(score + 1)}>
          ➕ Cộng 1 Điểm
        </button>
        <button className="btn btn-secondary btn-sm" onClick={() => setScore(0)}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default function PositionMatrixLab() {
  const [scenario, setScenario] = useState('same-component'); // 'same-component' | 'different-component' | 'independent-keys'
  const [isFancy, setIsFancy] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlayerA, setIsPlayerA] = useState(true);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🌲 1. Ma Trận Vị Trí Cây Render: Cùng Vị Trí vs Khác Vị Trí</h2>
        <p className="lab-card-desc">
          Quan sát trực quan cách thuật toán Reconciliation của React quyết định bảo tồn hay hủy diệt State 
          dựa vào vị trí và loại thẻ trong cây DOM ảo.
        </p>
      </div>

      {/* Scenario Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${scenario === 'same-component' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setScenario('same-component')}
        >
          Kịch Bản 1: Cùng Component tại cùng vị trí (Bảo toàn State)
        </button>
        <button
          className={`btn ${scenario === 'different-component' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setScenario('different-component')}
        >
          Kịch Bản 2: Đổi Component khác loại (Reset State)
        </button>
        <button
          className={`btn ${scenario === 'independent-keys' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setScenario('independent-keys')}
        >
          Kịch Bản 3: Gắn `key` phân định danh tính
        </button>
      </div>

      {/* --- KỊCH BẢN 1: CÙNG COMPONENT --- */}
      {scenario === 'same-component' && (
        <div>
          <InfoBox type="tip" title="Quy Tắc 1: Cùng Component + Cùng Vị Trí = State Được Giữ Nguyên!">
            Hãy thử bấm <strong>&quot;Cộng 1 Điểm&quot;</strong> lên khoảng 5 - 10 điểm, sau đó bấm nút <strong>&quot;Đổi Giao Diện Fancy&quot;</strong> bên dưới.<br />
            Bạn sẽ thấy màu sắc giao diện thay đổi nhưng <strong>điểm số vẫn còn nguyên</strong> vì vị trí con số 1 của thẻ cha vẫn luôn là <code>&lt;Counter /&gt;</code>!
          </InfoBox>

          <div style={{ maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            {isFancy ? (
              <Counter isFancy={true} label="Vị trí #1" />
            ) : (
              <Counter isFancy={false} label="Vị trí #1" />
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={() => setIsFancy(!isFancy)}>
              🎨 Bật/Tắt Giao Diện Fancy (isFancy: {String(isFancy)})
            </button>
          </div>
        </div>
      )}

      {/* --- KỊCH BẢN 2: ĐỔI COMPONENT KHÁC LOẠI --- */}
      {scenario === 'different-component' && (
        <div>
          <InfoBox type="danger" title="Quy Tắc 2: Khác Component + Cùng Vị Trí = Hủy Diệt và Reset State!">
            Hãy cộng điểm lên 7, sau đó bấm <strong>&quot;Tạm Dừng Trò Chơi&quot;</strong>. 
            Lúc này thẻ <code>&lt;p&gt;</code> thế chỗ cho <code>&lt;Counter /&gt;</code> tại vị trí #1. 
            React liền nhổ bỏ Counter và xóa sạch State. Khi bạn bấm Tiếp tục, điểm số sẽ <strong>về 0 ban đầu</strong>!
          </InfoBox>

          <div style={{ maxWidth: '420px', margin: '0 auto 1.5rem', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isPaused ? (
              <div style={{ padding: '2rem', background: '#3b0764', border: '1px dashed #a855f7', borderRadius: '12px', textAlign: 'center', width: '100%' }}>
                <span style={{ fontSize: '2rem' }}>⏸️</span>
                <p style={{ color: '#f3e8ff', fontWeight: 600, marginTop: '0.5rem' }}>
                  Trò chơi đang tạm dừng! (Component Counter đã bị gỡ khỏi DOM)
                </p>
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <Counter isFancy={false} label="Vị trí #1" />
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-danger" onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? '▶️ Tiếp Tục Trò Chơi' : '⏸️ Tạm Dừng Trò Chơi'}
            </button>
          </div>
        </div>
      )}

      {/* --- KỊCH BẢN 3: DÙNG KEY --- */}
      {scenario === 'independent-keys' && (
        <div>
          <InfoBox type="info" title="Sức Mạnh Của `key`: Ép React Phải Tạo Bộ Nhớ Riêng Dù Cùng Vị Trí">
            Ở đây ta chuyển đổi giữa 2 người chơi: <strong>Taylor</strong> và <strong>Sarah</strong>. 
            Nhờ gắn <code>key=&quot;taylor&quot;</code> và <code>key=&quot;sarah&quot;</code>, React coi đây là 2 thực thể độc lập. 
            Mỗi người có điểm số tách biệt hoàn toàn!
          </InfoBox>

          <div style={{ maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            {isPlayerA ? (
              <Counter key="taylor" isFancy={true} label="👤 Taylor" />
            ) : (
              <Counter key="sarah" isFancy={false} label="👩‍💼 Sarah" />
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={() => setIsPlayerA(!isPlayerA)}>
              🔀 Đổi Người Chơi (Đang là: {isPlayerA ? 'Taylor' : 'Sarah'})
            </button>
          </div>
        </div>
      )}

      {/* Visual Reconciliation Tree Inspector */}
      <div style={{ marginTop: '2rem', padding: '1.25rem', background: '#080d1a', borderRadius: '10px', border: '1px solid #1e293b' }}>
        <div style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 600, marginBottom: '0.5rem' }}>
          🔍 BẢN ĐỒ CÂY RENDER THEO MẮT NHÌN CỦA REACT FIBER:
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.8 }}>
          <div>&lt;PositionMatrixLab&gt;</div>
          <div style={{ paddingLeft: '1.5rem' }}>└── &lt;div container&gt;</div>
          <div style={{ paddingLeft: '3rem', color: '#34d399' }}>
            └── [Vị trí #1]: {scenario === 'different-component' && isPaused ? '<p (Paused)>' : '<Counter />'} 
            {scenario === 'independent-keys' && ` (key="${isPlayerA ? 'taylor' : 'sarah'}")`}
          </div>
        </div>
      </div>
    </div>
  );
}
