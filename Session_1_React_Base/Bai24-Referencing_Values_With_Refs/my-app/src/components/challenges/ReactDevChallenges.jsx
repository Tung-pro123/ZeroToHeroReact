import { useState, useRef } from 'react';

export default function ReactDevChallenges() {
  const [activeChallenge, setActiveChallenge] = useState(1);

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🎯 React.dev Official Challenges (4 Bài Tập Chính Thức)</h2>
          <p className="lab-desc">
            Lời giải chi tiết và phân tích cặn kẽ 100% các thử thách trong tài liệu chính thức của React.dev.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${activeChallenge === 1 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveChallenge(1)}
          >
            Thử Thách 1: Fix Chat Input & Undo
          </button>
          <button
            className={`btn ${activeChallenge === 2 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveChallenge(2)}
          >
            Thử Thách 2: Fix Component Không Re-render
          </button>
          <button
            className={`btn ${activeChallenge === 3 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveChallenge(3)}
          >
            Thử Thách 3: Fix Debouncing
          </button>
          <button
            className={`btn ${activeChallenge === 4 ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveChallenge(4)}
          >
            Thử Thách 4: Đọc State Mới Nhất Trong Async
          </button>
        </div>

        {activeChallenge === 1 && <ChallengeOne />}
        {activeChallenge === 2 && <ChallengeTwo />}
        {activeChallenge === 3 && <ChallengeThree />}
        {activeChallenge === 4 && <ChallengeFour />}
      </div>
    </div>
  );
}

// Challenge 1: Chat Input with 3s Cancel
function ChallengeOne() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const timeoutRef = useRef(null);

  const handleSend = () => {
    setIsSending(true);
    timeoutRef.current = setTimeout(() => {
      alert(`Đã gửi tin nhắn: "${text}"!`);
      setIsSending(false);
      setText('');
    }, 3000);
  };

  const handleUndo = () => {
    setIsSending(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Thử thách 1: Fix a broken chat input</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Người dùng gõ tin nhắn và bấm "Gửi". Có 3 giây để bấm nút "Hoàn tác (Undo)". Nếu bấm Undo, tin nhắn sẽ bị hủy.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <input
          disabled={isSending}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập tin nhắn..."
          style={{
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: '#090d16',
            color: '#fff',
            flex: 1,
          }}
        />
        <button className="btn btn-primary" disabled={isSending || !text.trim()} onClick={handleSend}>
          {isSending ? 'Đang gửi (3s)...' : 'Gửi'}
        </button>
        {isSending && (
          <button className="btn btn-danger" onClick={handleUndo}>
            ↩️ Hoàn tác
          </button>
        )}
      </div>

      <div className="alert-box alert-success" style={{ marginTop: '1rem' }}>
        <div>
          <strong>Bản chất:</strong> Dùng <code>timeoutRef = useRef(null)</code> để lưu <code>timeout ID</code>. Khi bấm "Hoàn tác", ta chỉ cần gọi <code>clearTimeout(timeoutRef.current)</code>.
        </div>
      </div>
    </div>
  );
}

// Challenge 2: Component failing to re-render
function ChallengeTwo() {
  const [isOn, setIsOn] = useState(false);
  const brokenRef = useRef(false);

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Thử thách 2: Fix a component failing to re-render</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Mã nguồn ban đầu dùng <code>const isOnRef = useRef(false)</code> và gán <code>isOnRef.current = !isOnRef.current</code> khiến giao diện không bao giờ cập nhật!
      </p>

      <div className="grid-2">
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
          <span className="badge badge-rose">Code Lỗi (useRef)</span>
          <p style={{ margin: '0.75rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>Bấm nút nhưng giao diện không đổi:</p>
          <button
            className="btn btn-outline"
            onClick={() => {
              brokenRef.current = !brokenRef.current;
              alert(`Ref đã đổi thành: ${brokenRef.current ? 'ON' : 'OFF'}, nhưng UI không cập nhật!`);
            }}
          >
            Trạng thái Ref: {brokenRef.current ? 'BẬT' : 'TẮT'}
          </button>
        </div>

        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
          <span className="badge badge-emerald">Code Đúng (useState)</span>
          <p style={{ margin: '0.75rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>Đổi sang useState để UI cập nhật tức thì:</p>
          <button
            className={`btn ${isOn ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setIsOn(!isOn)}
          >
            Trạng thái State: {isOn ? '🟢 BẬT' : '⚪ TẮT'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Challenge 3: Fix Debouncing
function ChallengeThree() {
  const [clickLog, setClickLog] = useState([]);
  const timerRef = useRef(null);

  function handleDebouncedClick(msg) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setClickLog((prev) => [`🔔 Đã thực thi action lúc ${new Date().toLocaleTimeString()}: "${msg}"`, ...prev]);
    }, 800);
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Thử thách 3: Fix debouncing</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Bấm nút nhiều lần liên tục. Hệ thống sẽ gom và chỉ kích hoạt một lần duy nhất sau khi bạn ngừng bấm 800ms.
      </p>

      <button className="btn btn-primary" onClick={() => handleDebouncedClick('Gửi báo cáo số liệu')}>
        ⚡ Bấm liên tục nút này (Debounce 800ms)
      </button>

      <div style={{ marginTop: '1rem', maxHeight: '140px', overflowY: 'auto' }}>
        {clickLog.map((log, idx) => (
          <div key={idx} style={{ padding: '0.35rem 0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// Challenge 4: Read the latest state
function ChallengeFour() {
  const [text, setText] = useState('');
  const textRef = useRef('');

  // Cập nhật cả State (để render ô input) và Ref (để async handler luôn đọc được giá trị mới nhất)
  const handleChange = (e) => {
    setText(e.target.value);
    textRef.current = e.target.value;
  };

  const handleSendDelayed = () => {
    alert('Đã hẹn giờ gửi sau 3 giây! Bạn hãy gõ thêm chữ vào ô trong lúc chờ xem sao.');
    setTimeout(() => {
      // ❌ Nếu đọc từ text (state closure): Nó bị đóng băng ở thời điểm bấm nút!
      // ✅ Nếu đọc từ textRef.current: Luôn lấy được chữ mới nhất bạn vừa gõ!
      alert(`🚀 Tin nhắn gửi đi thực tế: "${textRef.current}"\n(Đọc trực tiếp từ textRef.current, đánh bại Closure Trap!)`);
    }, 3000);
  };

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>Thử thách 4: Read the latest state (Phá vỡ Stale Closure Trap)</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Trong hàm bất đồng bộ (như setTimeout hay API), State bị kẹt bởi Closure. Dùng Ref là kỹ thuật kinh điển giúp hàm async luôn đọc được giá trị mới nhất!
      </p>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <input
          value={text}
          onChange={handleChange}
          placeholder="Gõ gì đó..."
          style={{
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: '#090d16',
            color: '#fff',
            flex: 1,
          }}
        />
        <button className="btn btn-primary" onClick={handleSendDelayed}>
          ⏱️ Gửi trễ (3s)
        </button>
      </div>
    </div>
  );
}
