import { useState, useReducer, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// ----------------------------------------------------
// ENCAPSULATED CONTEXT & DEFENSIVE CUSTOM HOOKS
// ----------------------------------------------------
const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'add':
      return [...tasks, { id: Date.now(), title: action.title, status: 'in-progress' }];
    case 'toggle':
      return tasks.map((t) =>
        t.id === action.id ? { ...t, status: t.status === 'done' ? 'in-progress' : 'done' } : t
      );
    default:
      return tasks;
  }
}

const initialTasks = [
  { id: 1, title: 'Tạo Custom Hook useTasks', status: 'done' },
  { id: 2, title: 'Bắt lỗi phòng vệ null check', status: 'in-progress' },
];

function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// Custom Hook với cơ chế tự vệ
function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('🚨 LỖI LẬP TRÌNH: useTasks() BẮT BUỘC phải được gọi bên trong <TasksProvider>!');
  }
  return context;
}

function useTasksDispatch() {
  const context = useContext(TasksDispatchContext);
  if (!context) {
    throw new Error('🚨 LỖI LẬP TRÌNH: useTasksDispatch() BẮT BUỘC phải được gọi bên trong <TasksProvider>!');
  }
  return context;
}

export default function CustomHooksGuardLab() {
  const [isInsideProvider, setIsInsideProvider] = useState(true);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>📦</span> Bài Lab 3: Đóng Gói Tinh Gọn & Cơ Chế Phòng Vệ Custom Hooks
        </h2>
        <p className="lab-card-desc">
          Chuẩn mực thiết kế Clean Code: Gom toàn bộ Reducer, Context và Provider vào 1 file; xuất ra các Custom Hook
          (<code>useTasks</code>, <code>useTasksDispatch</code>) có tích hợp sẵn cơ chế chặn lỗi (Defensive Guard).
        </p>
      </div>

      <InfoBox type="tip" title="Tại sao không nên export Context trực tiếp?">
        Nếu bạn <code>export const TasksContext</code> trực tiếp, mọi component đều phải import cả <code>TasksContext</code> lẫn hook <code>useContext</code>.
        Hơn nữa, nếu ai đó quên bọc Provider ở component cha, <code>useContext</code> sẽ trả về <code>null</code> âm thầm và gây crash app ở <code>null.map()</code>.
        Xuất ra Custom Hook <code>useTasks()</code> giải quyết cả 2 vấn đề trên trong 1 nốt nhạc!
      </InfoBox>

      {/* Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${isInsideProvider ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setIsInsideProvider(true)}
        >
          ✅ Trường Hợp 1: Nằm Trong &lt;TasksProvider&gt; (Hoạt động hoàn hảo)
        </button>
        <button
          className={`btn ${!isInsideProvider ? 'btn-danger' : 'btn-secondary'} btn-sm`}
          onClick={() => setIsInsideProvider(false)}
        >
          🚨 Trường Hợp 2: Quên Bọc Provider (Kích hoạt bẫy phòng vệ)
        </button>
      </div>

      {/* Live Area */}
      <div style={{
        background: '#090d16',
        borderRadius: '12px',
        border: '1px solid #1e293b',
        padding: '1.5rem',
      }}>
        {isInsideProvider ? (
          <TasksProvider>
            <div style={{ background: '#0a192f', border: '1px solid #10b981', borderRadius: '8px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <strong style={{ color: '#34d399' }}>🟢 Component Được Bọc Bởi &lt;TasksProvider&gt;</strong>
                <span className="badge badge-emerald">useTasks() Thành Công</span>
              </div>
              <GuardedConsumerComponent />
            </div>
          </TasksProvider>
        ) : (
          <div style={{ background: '#1c1117', border: '1px dashed #f43f5e', borderRadius: '8px', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <strong style={{ color: '#f43f5e' }}>🔴 Component Đứng Trơ Trọi (Không Có Provider)</strong>
              <span className="badge badge-rose">Bắt Lỗi Chủ Động</span>
            </div>
            <SimulatedErrorBoundary />
          </div>
        )}
      </div>

      {/* Code Snippet Blueprint */}
      <div style={{ marginTop: '2rem', background: '#0a101d', padding: '1.25rem', borderRadius: '10px', border: '1px solid #1e293b' }}>
        <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
          📝 Mẫu Thiết Kế Chuẩn Senior: src/context/TasksContext.jsx
        </h4>
        <pre style={{ margin: 0, fontSize: '0.82rem', color: '#93c5fd', fontFamily: 'var(--font-mono)', overflowX: 'auto' }}>
{`// 1. Giữ Context là private (KHÔNG export ra ngoài)
const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

// 2. Export Provider duy nhất
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

// 3. Export 2 Custom Hooks có guard
export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasks must be used within TasksProvider');
  return context;
}

export function useTasksDispatch() {
  const context = useContext(TasksDispatchContext);
  if (!context) throw new Error('useTasksDispatch must be used within TasksProvider');
  return context;
}`}
        </pre>
      </div>
    </div>
  );
}

function GuardedConsumerComponent() {
  const tasks = useTasks();
  const dispatch = useTasksDispatch();

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#031024',
              padding: '0.65rem 1rem',
              borderRadius: '6px',
            }}
          >
            <span>{task.title}</span>
            <button
              className={`btn btn-sm ${task.status === 'done' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => dispatch({ type: 'toggle', id: task.id })}
            >
              {task.status === 'done' ? '✓ Hoàn thành' : 'Đang làm'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimulatedErrorBoundary() {
  return (
    <div style={{ color: '#fda4af', fontSize: '0.88rem' }}>
      <p style={{ marginBottom: '0.5rem' }}>
        Khi một lập trình viên trong đội ngũ gọi <code>const tasks = useTasks()</code> mà quên bọc <code>&lt;TasksProvider&gt;</code> ở file gốc, hệ thống sẽ <strong>bật cảnh báo đỏ rõ ràng ngay lập tức</strong> thay vì crash ứng dụng trong im lặng:
      </p>
      <div style={{
        background: '#2d0612',
        border: '1px solid #ef4444',
        borderRadius: '6px',
        padding: '0.85rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: '#fecdd3',
      }}>
        Uncaught Error: 🚨 LỖI LẬP TRÌNH: useTasks() BẮT BUỘC phải được gọi bên trong &lt;TasksProvider&gt;!<br />
        &nbsp;&nbsp;at useTasks (TasksContext.jsx:24)<br />
        &nbsp;&nbsp;at GuardedConsumerComponent (App.jsx:42)
      </div>
    </div>
  );
}
