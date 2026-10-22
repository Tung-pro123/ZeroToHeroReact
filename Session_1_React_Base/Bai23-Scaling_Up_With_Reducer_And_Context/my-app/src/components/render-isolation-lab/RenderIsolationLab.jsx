import React, { useState, useReducer, useRef, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// ----------------------------------------------------
// ARCHITECTURE A: SINGLE COMBINED CONTEXT (Gộp chung)
// ----------------------------------------------------
const CombinedContext = createContext(null);

// ----------------------------------------------------
// ARCHITECTURE B: SPLIT CONTEXTS (Tách riêng State & Dispatch)
// ----------------------------------------------------
const SeparateTasksContext = createContext(null);
const SeparateDispatchContext = createContext(null);

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, { id: Date.now(), text: action.text, done: false }];
    case 'toggle':
      return tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'delete':
      return tasks.filter((t) => t.id !== action.id);
    case 'reset':
      return [
        { id: 1, text: 'Kiểm thử tách Context', done: true },
        { id: 2, text: 'Đo lường số lần Render của Form thêm mới', done: false },
      ];
    default:
      return tasks;
  }
}

const initialTasks = [
  { id: 1, text: 'Kiểm thử tách Context', done: true },
  { id: 2, text: 'Đo lường số lần Render của Form thêm mới', done: false },
];

export default function RenderIsolationLab() {
  const [mode, setMode] = useState('separate'); // 'combined' | 'separate'

  // Reducer cho cả 2 chế độ
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>⚡</span> Bài Lab 2: Tách Biệt State Context & Dispatch Context (Render Lab)
        </h2>
        <p className="lab-card-desc">
          Thực nghiệm trực tiếp: Chứng minh vì sao việc tách riêng Context chứa State và Context chứa Dispatch giúp cách ly hiệu năng, triệt tiêu hoàn toàn re-render thừa cho các form nhập liệu.
        </p>
      </div>

      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${mode === 'combined' ? 'btn-danger' : 'btn-secondary'} btn-sm`}
          onClick={() => setMode('combined')}
        >
          🚨 Kiến Trúc 1: Gộp Chung ({'{ tasks, dispatch }'}) - Re-render Bão Tố
        </button>
        <button
          className={`btn ${mode === 'separate' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setMode('separate')}
        >
          🛡️ Kiến Trúc 2: Tách Rời (TasksContext & DispatchContext) - Chuẩn Senior
        </button>
      </div>

      {mode === 'combined' ? (
        <InfoBox type="danger" title="Phân tích Cạm bẫy Gộp chung (Combined):">
          Mỗi khi tick checkbox hoặc xóa task, mảng <code>tasks</code> thay đổi $\rightarrow$ một object mới <code>{'{ tasks, dispatch }'}</code> được sinh ra.
          Thành phần <code>AddTaskForm</code> <strong>chỉ cần hàm dispatch</strong>, nhưng vì đăng ký vào chung Context nên BẮT BUỘC BỊ RE-RENDER theo!
          Quan sát bộ đếm render màu đỏ của Form tăng liên tục mỗi lần bạn bấm!
        </InfoBox>
      ) : (
        <InfoBox type="tip" title="Sức mạnh của Tách Context (Separation):">
          Hàm <code>dispatch</code> từ <code>useReducer</code> có <strong>danh tính ổn định (Stable Identity)</strong> — không bao giờ đổi tham chiếu qua các lần render!
          Vì <code>AddTaskForm</code> chỉ đăng ký <code>SeparateDispatchContext</code>, nó <strong>HOÀN TOÀN KHÔNG BỊ RE-RENDER</strong> khi bạn tick checkbox hay xóa việc!
          Bộ đếm màu xanh của Form luôn đứng yên ở số 1!
        </InfoBox>
      )}

      {/* Live Experiment Area */}
      <div style={{
        background: '#090d16',
        borderRadius: '12px',
        border: '1px solid #1e293b',
        padding: '1.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem' }}>
            🧪 Bàn Thử Nghiệm: Thao Tác Với Danh Sách & Xem Bộ Đếm Render
          </h4>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => dispatch({ type: 'reset' })}
          >
            🔄 Reset Danh Sách Task
          </button>
        </div>

        {mode === 'combined' ? (
          <CombinedContext.Provider value={{ tasks, dispatch }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <CombinedAddTaskForm />
              <CombinedTaskList />
            </div>
          </CombinedContext.Provider>
        ) : (
          <SeparateTasksContext.Provider value={tasks}>
            <SeparateDispatchContext.Provider value={dispatch}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                <SeparateAddTaskForm />
                <SeparateTaskList />
              </div>
            </SeparateDispatchContext.Provider>
          </SeparateTasksContext.Provider>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ARCHITECTURE 1: COMBINED (Anti-pattern)
// ----------------------------------------------------
function CombinedAddTaskForm() {
  const { dispatch } = useContext(CombinedContext);
  const [text, setText] = useState('');
  const renderCount = useRef(0);
  renderCount.current += 1;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'add', text: text.trim() });
    setText('');
  };

  return (
    <div style={{
      background: 'rgba(244, 63, 94, 0.06)',
      border: '2px dashed #f43f5e',
      borderRadius: '10px',
      padding: '1.25rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, color: '#f43f5e' }}>📝 AddTaskForm (Chỉ cần dispatch!)</h4>
        <span className="badge badge-rose">💥 Renders: {renderCount.current}</span>
      </div>
      <p style={{ fontSize: '0.82rem', color: '#fda4af', margin: '0 0 1rem' }}>
        ⚠️ <strong>Lãng phí:</strong> Bạn tick checkbox ở danh sách bên cạnh, Form này cũng bị kéo theo re-render!
      </p>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="input-control"
          placeholder="Nhập task mới..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-danger btn-sm" style={{ whiteSpace: 'nowrap' }}>
          Thêm
        </button>
      </form>
    </div>
  );
}

function CombinedTaskList() {
  const { tasks, dispatch } = useContext(CombinedContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid #334155',
      borderRadius: '10px',
      padding: '1.25rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, color: 'var(--text-main)' }}>📋 TaskList</h4>
        <span className="badge badge-cyan">Renders: {renderCount.current}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0.75rem',
              background: '#090d16',
              borderRadius: '6px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch({ type: 'toggle', id: task.id })}
                style={{ accentColor: '#f43f5e' }}
              />
              <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#64748b' : '#f1f5f9' }}>
                {task.text}
              </span>
            </label>
            <button
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              onClick={() => dispatch({ type: 'delete', id: task.id })}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ARCHITECTURE 2: SEPARATE CONTEXTS (Best practice)
// ----------------------------------------------------
function SeparateAddTaskForm() {
  // Chỉ nhận dispatch từ SeparateDispatchContext!
  const dispatch = useContext(SeparateDispatchContext);
  const [text, setText] = useState('');
  const renderCount = useRef(0);
  renderCount.current += 1;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'add', text: text.trim() });
    setText('');
  };

  return (
    <div style={{
      background: 'rgba(16, 185, 129, 0.06)',
      border: '2px solid #10b981',
      borderRadius: '10px',
      padding: '1.25rem',
      boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, color: '#34d399' }}>📝 AddTaskForm (Chỉ nhận Dispatch)</h4>
        <span className="badge badge-emerald">✨ Tối Ưu Renders: {renderCount.current}</span>
      </div>
      <p style={{ fontSize: '0.82rem', color: '#a7f3d0', margin: '0 0 1rem' }}>
        ✅ <strong>Hiệu năng tuyệt đối:</strong> Hãy thử bấm tick/xóa task bên cạnh, bộ đếm render ở đây đứng im 1!
      </p>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          className="input-control"
          placeholder="Nhập task mới..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }}>
          Thêm
        </button>
      </form>
    </div>
  );
}

function SeparateTaskList() {
  const tasks = useContext(SeparateTasksContext);
  const dispatch = useContext(SeparateDispatchContext);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid #334155',
      borderRadius: '10px',
      padding: '1.25rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ margin: 0, color: 'var(--text-main)' }}>📋 TaskList</h4>
        <span className="badge badge-cyan">Renders: {renderCount.current}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0.75rem',
              background: '#090d16',
              borderRadius: '6px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch({ type: 'toggle', id: task.id })}
                style={{ accentColor: '#10b981' }}
              />
              <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#64748b' : '#f1f5f9' }}>
                {task.text}
              </span>
            </label>
            <button
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              onClick={() => dispatch({ type: 'delete', id: task.id })}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
