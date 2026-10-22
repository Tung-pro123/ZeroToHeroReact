import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

const INITIAL_TODOS = [
  '1. Học lý thuyết useRef và DOM node thật',
  '2. Nắm vững thời điểm gắn Ref trong Commit Phase',
  '3. Thực hành Ref Callback với Map cho dynamic list',
  '4. Đóng gói API với forwardRef và useImperativeHandle',
];

export default function FlushSyncTodoLab() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newText, setNewText] = useState('');
  const [useFlushSyncMode, setUseFlushSyncMode] = useState(true);
  const [logMessage, setLogMessage] = useState('');
  const listRef = useRef(null);

  const handleAddTodo = () => {
    if (!newText.trim()) return;

    const todoItem = `${todos.length + 1}. ${newText.trim()}`;
    setNewText('');

    if (useFlushSyncMode) {
      // ✅ VỚI flushSync: Ép React cập nhật DOM ngay lập tức đồng bộ!
      flushSync(() => {
        setTodos((prev) => [...prev, todoItem]);
      });

      // Tại thời điểm này, DOM đã có item mới:
      if (listRef.current && listRef.current.lastElementChild) {
        listRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
        setLogMessage('✅ flushSync: DOM đã chèn thẻ mới xong -> Cuộn chính xác tới thẻ mới!');
      }
    } else {
      // ❌ KHÔNG DÙNG flushSync: React gom cụm cập nhật bất đồng bộ
      setTodos((prev) => [...prev, todoItem]);

      // DOM chưa kịp cập nhật! lastElementChild vẫn là thẻ CŨ:
      if (listRef.current && listRef.current.lastElementChild) {
        listRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });
        setLogMessage('⚠️ KHÔNG flushSync: DOM chưa kịp có thẻ mới -> Cuộn nhầm vào thẻ cũ!');
      }
    }
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">⚡ flushSync: Đồng Bộ Hóa Cập Nhật DOM Tức Thời</h2>
          <p className="lab-desc">
            Khi thêm tin nhắn mới vào phòng Chat hoặc thêm Todo mới, bạn muốn màn hình tự động cuộn xuống đáy. Nhưng vì React cập nhật State bất đồng bộ (Queueing), thẻ DOM mới chưa kịp sinh ra khi bạn gọi hàm cuộn!
          </p>
        </div>

        {/* Mode Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem 1.25rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '10px',
          marginBottom: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>Chế độ thực thi:</span>
          <button
            className={`btn ${useFlushSyncMode ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
            onClick={() => setUseFlushSyncMode(true)}
          >
            ✅ Dùng flushSync (Chuẩn xác)
          </button>
          <button
            className={`btn ${!useFlushSyncMode ? 'btn-danger' : 'btn-outline'}`}
            style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
            onClick={() => setUseFlushSyncMode(false)}
          >
            ❌ Không dùng flushSync (Bị trễ DOM)
          </button>
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Nhập nhiệm vụ mới rồi bấm Enter hoặc Thêm..."
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: '#0a0e1a',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none',
            }}
          />
          <button className="btn btn-primary" onClick={handleAddTodo}>
            ➕ Thêm & Cuộn Tới Đáy
          </button>
        </div>

        {logMessage && (
          <div className={`alert-box ${logMessage.includes('✅') ? 'alert-success' : 'alert-warning'}`} style={{ margin: '0.75rem 0' }}>
            <span>{logMessage.includes('✅') ? '🎯' : '⚠️'}</span>
            <div>{logMessage}</div>
          </div>
        )}

        {/* Scrollable Container */}
        <div
          ref={listRef}
          style={{
            maxHeight: '220px',
            overflowY: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {todos.map((todo, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: idx === todos.length - 1 ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: idx === todos.length - 1 ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.05)',
                color: idx === todos.length - 1 ? '#38bdf8' : '#e2e8f0',
                fontSize: '0.9rem',
              }}
            >
              {todo} {idx === todos.length - 1 && <span className="badge badge-cyan" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>Mới nhất</span>}
            </div>
          ))}
        </div>

        <div className="code-box" style={{ marginTop: '1.5rem' }}>
          <strong style={{ color: '#38bdf8' }}>Cú pháp flushSync từ 'react-dom':</strong>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
{`import { flushSync } from 'react-dom';

flushSync(() => {
  setTodos([...todos, newTodo]); // Ép React render và commit vào DOM ngay lập tức!
});

// Ngay tại dòng này, thẻ DOM thật đã có trên trang:
listRef.current.lastElementChild.scrollIntoView({ behavior: 'smooth' });`}
          </pre>
        </div>
      </div>
    </div>
  );
}
