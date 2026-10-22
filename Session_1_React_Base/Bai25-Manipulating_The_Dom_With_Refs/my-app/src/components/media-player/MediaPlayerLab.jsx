import { useState, useRef } from 'react';

export default function MediaPlayerLab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleRateChange = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🎬 HTML5 Media Player: Điều Khiển Video Bằng Ref</h2>
          <p className="lab-desc">
            Trình duyệt cung cấp các hàm phương thức mệnh lệnh như <code>play()</code>, <code>pause()</code>, và thuộc tính <code>currentTime</code> trên thẻ <code>&lt;video&gt;</code>. React không thể điều khiển những hành vi này thuần túy qua props mà cần có <strong>Ref</strong>.
          </p>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Video Container */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '2px solid rgba(56, 189, 248, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
            background: '#000',
          }}>
            <video
              ref={videoRef}
              width="100%"
              style={{ display: 'block', maxHeight: '380px', objectFit: 'cover' }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              loop
              playsInline
            />

            {/* Overlay badge */}
            <div style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0,0,0,0.65)',
              padding: '0.35rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {isPlaying ? '🟢 Đang phát' : '⏸️ Đang dừng'} • {playbackRate}x
            </div>
          </div>

          {/* Custom Controls Bar */}
          <div style={{
            marginTop: '1.25rem',
            padding: '1rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                className={`btn ${isPlaying ? 'btn-danger' : 'btn-primary'}`}
                onClick={togglePlay}
                style={{ minWidth: '110px' }}
              >
                {isPlaying ? '⏸️ Tạm Dừng' : '▶️ Phát Video'}
              </button>

              <button className="btn btn-outline" onClick={() => handleSkip(-5)}>
                ⏪ -5s
              </button>
              <button className="btn btn-outline" onClick={() => handleSkip(5)}>
                ⏩ +5s
              </button>
              <button className="btn btn-outline" onClick={toggleMute}>
                {isMuted ? '🔇 Bật tiếng' : '🔊 Tắt tiếng'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tốc độ:</span>
              {[0.5, 1, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleRateChange(rate)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: playbackRate === rate ? '#38bdf8' : 'rgba(255,255,255,0.05)',
                    color: playbackRate === rate ? '#000' : '#fff',
                    fontWeight: playbackRate === rate ? '700' : '500',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          <div className="code-box" style={{ marginTop: '1.5rem' }}>
            <strong style={{ color: '#38bdf8' }}>Code thực tế gọi DOM Methods:</strong>
            <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
{`const videoRef = useRef(null);

function handlePlay() {
  // videoRef.current trỏ trực tiếp đến HTMLVideoElement
  videoRef.current.play();
}

function handleSkipForward() {
  // Đọc và gán trực tiếp thuộc tính DOM
  videoRef.current.currentTime += 5;
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
