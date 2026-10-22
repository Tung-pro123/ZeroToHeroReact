import { useState, useReducer, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// Contexts cho Mode 3
const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

const initialTasks = [
  { id: 1, title: 'Thiết kế hệ thống Reducer', done: true },
  { id: 2, title: 'Cấu hình TasksContext và DispatchContext', done: true },
  { id: 3, title: 'Đóng gói Custom Hooks useTasks', done: false },
];

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added':
      return [...tasks, { id: Date.now(), title: action.title, done: false }];
    case 'toggled':
      return tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'deleted':
      return tasks.filter((t) => t.id !== action.id);
    default:
      return tasks;
  }
}

export default function ArchitectureVisualizer() {
  const [archMode, setArchMode] = useState('combined'); // 'drilling' | 'reducer-only' | 'combined'
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    dispatch({ type: 'added', title: newTitle.trim() });
    setNewTitle('');
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🏗️</span> Bài Lab 1: Kiến Trúc Bộ Đôi useReducer + useContext
        </h2>
        <p className="lab-card-desc">
          So sánh trực quan 3 giai đoạn tiến hóa kiến trúc quản lý State trong React: Từ Prop Drilling gian nan, useReducer đơn độc, đến Bộ đôi Hoàn hảo Reducer + Context.
        </p>
      </div>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${archMode === 'drilling' ? 'btn-danger' : 'btn-secondary'} btn-sm`}
          onClick={() => setArchMode('drilling')}
        >
          ❌ Giai Đoạn 1: useState + Prop Drilling
        </button>
        <button
          className={`btn ${archMode === 'reducer-only' ? 'btn-cyan' : 'btn-secondary'} btn-sm`}
          onClick={() => setArchMode('reducer-only')}
        >
          ⚠️ Giai Đoạn 2: useReducer Đơn Độc (Vẫn khoan props)
        </button>
        <button
          className={`btn ${archMode === 'combined' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setArchMode('combined')}
        >
          ✨ Giai Đoạn 3: Reducer + Context (Bộ Đôi Hoàn Hảo)
        </button>
      </div>

      {archMode === 'drilling' && (
        <InfoBox type="danger" title="Vấn nạn của useState + Prop Drilling:">
          Logic cập nhật state bị phân tán thành nhiều hàm lẻ tẻ (<code>handleAddTask</code>, <code>handleToggle</code>, <code>handleDelete</code>).
          Tất cả các hàm này và biến <code>tasks</code> phải được truyền qua 3-4 tầng component trung gian (<code>Board</code> $\rightarrow$ <code>List</code> $\rightarrow$ <code>Card</code>).
        </InfoBox>
      )}

      {archMode === 'reducer-only' && (
        <InfoBox type="warning" title="Hạn chế khi chỉ dùng useReducer:">
          <code>useReducer</code> đã gom toàn bộ logic vào hàm <code>tasksReducer</code> rất sạch sẽ.
          Tuy nhiên, bạn <strong>vẫn phải truyền <code>tasks</code> và hàm <code>dispatch</code></strong> qua từng cấp component bằng Props. Vấn đề đào giếng (Prop Drilling) vẫn chưa được giải quyết!
        </InfoBox>
      )}

      {archMode === 'combined' && (
        <InfoBox type="tip" title="Sức mạnh tối thượng của Reducer + Context:">
          <code>useReducer</code> làm "Bếp trưởng" quản lý nghiệp vụ, còn <code>useContext</code> làm "Đường ống vận chuyển tức thời".
          Component con ở bất kỳ tầng nào chỉ cần gọi <code>useTasks()</code> để đọc dữ liệu và <code>useTasksDispatch()</code> để gửi action. Các tầng trung gian sạch bóng 0 props!
        </InfoBox>
      )}

      {/* Interactive Task Form */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '0.75rem',
      }}>
        <input
          type="text"
          className="input-control"
          placeholder="Nhập tên công việc mới để thử nghiệm..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn btn-primary" onClick={handleAdd} style={{ whiteSpace: 'nowrap' }}>
          ➕ Thêm Task
        </button>
      </div>

      {/* Live Interactive Hierarchy */}
      <div style={{
        background: '#090d16',
        borderRadius: '12px',
        border: '1px solid #1e293b',
        padding: '1.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem' }}>
            🏢 Cây Component Minh Họa ({archMode.toUpperCase()})
          </h4>
          <span className="badge badge-emerald">{tasks.length} Công việc hiện có</span>
        </div>

        {archMode === 'combined' ? (
          <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
              <CleanContextBoard />
            </TasksDispatchContext.Provider>
          </TasksContext.Provider>
        ) : (
          <DrillingBoard tasks={tasks} dispatch={dispatch} isReducerOnly={archMode === 'reducer-only'} />
        )}
      </div>

      {/* Flow Diagram Breakdown */}
      <div style={{
        marginTop: '1.5rem',
        background: '#0a101d',
        padding: '1.25rem',
        borderRadius: '10px',
        border: '1px solid #1e293b',
      }}>
        <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
          ⚡ Chu Trình Dữ Liệu 4 Bước Của Bộ Đôi Này:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
          <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid #10b981' }}>
            <strong>1. Bắn Action:</strong><br />
            Component con gọi <code>dispatch(&#123; type: 'added' &#125;)</code>
          </div>
          <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid #06b6d4' }}>
            <strong>2. Bếp Trưởng Tính Toán:</strong><br />
            Hàm <code>tasksReducer(state, action)</code> trả về State mới
          </div>
          <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid #8b5cf6' }}>
            <strong>3. Phát Sóng Context:</strong><br />
            <code>TasksContext.Provider</code> nhận State mới và phát đi
          </div>
          <div style={{ background: '#111827', padding: '0.75rem', borderRadius: '6px', borderLeft: '3px solid #f59e0b' }}>
            <strong>4. Cập Nhật UI:</strong><br />
            Chỉ những component lắng nghe <code>useTasks()</code> mới re-render
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MODE COMBINED: Clean Context Components
// ----------------------------------------------------
function CleanContextBoard() {
  return (
    <div style={{ background: '#0a192f', border: '1px solid #10b981', borderRadius: '8px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <strong style={{ color: '#34d399' }}>📦 ProjectBoard (Tầng Trung Gian)</strong>
        <span className="badge badge-emerald">✨ Tinh Khiết: 0 Props Forwarded!</span>
      </div>
      <p style={{ fontSize: '0.82rem', color: '#a7f3d0', margin: '0 0 1rem' }}>
        "Tôi không cần nhận <code>tasks</code> hay <code>dispatch</code>! Tôi chỉ render con cháu bình thường."
      </p>
      <CleanContextTaskList />
    </div>
  );
}

function CleanContextTaskList() {
  const tasks = useContext(TasksContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {tasks.map((task) => (
        <CleanContextTaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

function CleanContextTaskItem({ task }) {
  const dispatch = useContext(TasksDispatchContext);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#041731',
      padding: '0.65rem 1rem',
      borderRadius: '6px',
      border: '1px solid #1e293b',
    }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => dispatch({ type: 'toggled', id: task.id })}
          style={{ width: '1.1rem', height: '1.1rem', accentColor: '#10b981' }}
        />
        <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#64748b' : '#f1f5f9' }}>
          {task.title}
        </span>
      </label>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => dispatch({ type: 'deleted', id: task.id })}
      >
        🗑️ Xóa
      </button>
    </div>
  );
}

// ----------------------------------------------------
// MODE DRILLING / REDUCER-ONLY Components
// ----------------------------------------------------
function DrillingBoard({ tasks, dispatch, isReducerOnly }) {
  return (
    <div style={{ background: '#1c1117', border: '1px dashed #f43f5e', borderRadius: '8px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <strong style={{ color: '#f43f5e' }}>⛏️ ProjectBoard (Tầng Trung Gian)</strong>
        <span className="badge badge-rose">
          {isReducerOnly ? '⚠️ Phải nhận & chuyển: tasks, dispatch' : '⚠️ Phải nhận: tasks, onToggle, onDelete'}
        </span>
      </div>
      <p style={{ fontSize: '0.82rem', color: '#fda4af', margin: '0 0 1rem' }}>
        "Tôi không trực tiếp dùng các hàm này nhưng vẫn phải khai báo props để chuyển tiếp xuống dưới!"
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#13090e',
              padding: '0.65rem 1rem',
              borderRadius: '6px',
              border: '1px dashed #e11d48',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch({ type: 'toggled', id: task.id })}
                style={{ width: '1.1rem', height: '1.1rem', accentColor: '#f43f5e' }}
              />
              <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#64748b' : '#f1f5f9' }}>
                {task.title}
              </span>
            </label>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch({ type: 'deleted', id: task.id })}
            >
              🗑️ Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
