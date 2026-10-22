import { useState, useRef } from 'react';

export default function StopwatchPrecisionLab() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // useRef lưu ID của interval mà không làm re-render thừa
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (isRunning) return;
    const current = Date.now();
    setStartTime(startTime ? current - (now - startTime) : current);
    setNow(current);
    setIsRunning(true);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setStartTime(null);
    setNow(null);
    setLaps([]);
    setIsRunning(false);
  };

  const handleLap = () => {
    if (!isRunning) return;
    const elapsed = ((now - startTime) / 1000).toFixed(2);
    setLaps((prev) => [
      { id: Date.now(), time: elapsed, lapNumber: prev.length + 1 },
      ...prev,
    ]);
  };

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  // Format time mm:ss.ms
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const ms = Math.floor((totalSeconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">⏱️ Stopwatch Precision Lab (Đồng Hồ Bấm Giờ)</h2>
          <p className="lab-desc">
            Bài toán kinh điển chứng minh tại sao React cần cả <strong>useState</strong> và <strong>useRef</strong> hoạt động song song.
          </p>
        </div>

        <div className="stopwatch-display">
          {formatTime(secondsPassed)}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!isRunning ? (
            <button className="btn btn-primary" onClick={handleStart} style={{ minWidth: '120px' }}>
              ▶️ Bắt Đầu
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleStop} style={{ minWidth: '120px' }}>
              ⏸️ Dừng Lại
            </button>
          )}

          <button
            className="btn btn-warning"
            onClick={handleLap}
            disabled={!isRunning}
            style={{ opacity: isRunning ? 1 : 0.5 }}
          >
            🏁 Ghi Vòng (Lap)
          </button>

          <button className="btn btn-outline" onClick={handleReset}>
            🔄 Đặt Lại (Reset)
          </button>
        </div>

        {/* Laps List */}
        {laps.length > 0 && (
          <div style={{ marginTop: '1.5rem', maxHeight: '180px', overflowY: 'auto' }}>
            <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Danh sách vòng chạy ({laps.length}):
            </h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {laps.map((lap) => (
                <div
                  key={lap.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontFamily: 'JetBrains Mono',
                  }}
                >
                  <span style={{ color: '#38bdf8' }}>Lap #{lap.lapNumber}</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>{lap.time}s</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid-2" style={{ marginTop: '2rem' }}>
          <div className="code-box">
            <strong style={{ color: '#38bdf8' }}>Tại sao `startTime` & `now` phải là State?</strong>
            <pre style={{ marginTop: '0.5rem', color: '#94a3b8' }}>
{`const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);

// MỖI 10ms, setInterval gọi setNow(Date.now()):
// -> Cần React re-render lại để cập nhật
//    con số mili-giây trên màn hình cho người xem!`}
            </pre>
          </div>

          <div className="code-box">
            <strong style={{ color: '#34d399' }}>Tại sao `intervalRef` bắt buộc phải là Ref?</strong>
            <pre style={{ marginTop: '0.5rem', color: '#94a3b8' }}>
{`const intervalRef = useRef(null);

// ID của interval (số nguyên do setInterval trả về)
// 1. Lưu ID để nút "Dừng" gọi clearInterval(ID).
// 2. Việc ghi ID này KHÔNG ảnh hưởng gì đến giao diện
//    nên KHÔNG ĐƯỢC làm re-render component!`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
