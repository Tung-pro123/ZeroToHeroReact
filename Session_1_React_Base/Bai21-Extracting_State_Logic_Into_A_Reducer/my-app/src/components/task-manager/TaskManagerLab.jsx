import { useReducer, useState } from 'react';
import InfoBox from '../common/InfoBox';

const initialTasks = [
  { id: 1, text: 'Học lý thuyết Reducer (Nhà Hàng)', done: true },
  { id: 2, text: 'Làm bài tập Thử thách 1, 2, 3 React.dev', done: false },
  { id: 3, text: 'Tự code lại Hook useReducer bằng useState', done: false },
];

// --- REDUCER VERSION LOGIC ---
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => (t.id === action.task.id ? action.task : t));
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Hành động không xác định: ' + action.type);
    }
  }
}

// Sub-component: Một dòng Task có chế độ Edit
function TaskItem({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        background: '#0d1527',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        marginBottom: '0.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, marginRight: '1rem' }}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => onChange({ ...task, done: e.target.checked })}
          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#f97316' }}
        />
        {isEditing ? (
          <input
            type="text"
            className="input-control"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ padding: '0.35rem 0.6rem' }}
          />
        ) : (
          <span
            style={{
              color: task.done ? '#6b7280' : '#f3f4f6',
              textDecoration: task.done ? 'line-through' : 'none',
              fontSize: '0.95rem',
            }}
          >
            {task.text}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {isEditing ? (
          <button
            className="btn btn-teal btn-sm"
            onClick={() => {
              onChange({ ...task, text: editText });
              setIsEditing(false);
            }}
          >
            Lưu
          </button>
        ) : (
          <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>
            Sửa
          </button>
        )}
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
          Xóa
        </button>
      </div>
    </div>
  );
}

export default function TaskManagerLab() {
  const [mode, setMode] = useState('useReducer'); // 'useState' | 'useReducer'

  // State 1: Bản dùng useReducer
  const [reducerTasks, dispatch] = useReducer(tasksReducer, initialTasks);

  // State 2: Bản dùng useState
  const [stateTasks, setStateTasks] = useState(initialTasks);

  // Input text thêm task mới
  const [newTaskText, setNewTaskText] = useState('');

  // --- HANDLERS CHO BẢN useReducer (Chỉ gọi dispatch!) ---
  const handleAddReducer = (text) => {
    dispatch({ type: 'added', id: Date.now(), text });
  };
  const handleChangeReducer = (task) => {
    dispatch({ type: 'changed', task });
  };
  const handleDeleteReducer = (id) => {
    dispatch({ type: 'deleted', id });
  };

  // --- HANDLERS CHO BẢN useState (Logic nằm rải rác trong từng hàm) ---
  const handleAddState = (text) => {
    setStateTasks([...stateTasks, { id: Date.now(), text, done: false }]);
  };
  const handleChangeState = (task) => {
    setStateTasks(stateTasks.map((t) => (t.id === task.id ? task : t)));
  };
  const handleDeleteState = (id) => {
    setStateTasks(stateTasks.filter((t) => t.id !== id));
  };

  const handleAddNewTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    if (mode === 'useReducer') {
      handleAddReducer(newTaskText);
    } else {
      handleAddState(newTaskText);
    }
    setNewTaskText('');
  };

  const currentTasks = mode === 'useReducer' ? reducerTasks : stateTasks;

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">📋 2. Đối Đầu: useState vs useReducer (Task Manager)</h2>
        <p className="lab-card-desc">
          Cùng một tính năng quản lý công việc (Thêm, Sửa, Đổi trạng thái, Xóa), hãy so sánh giữa việc logic nằm rải rác 
          trong Event Handlers (useState) và việc logic được quy về một mối duy nhất (useReducer).
        </p>
      </div>

      {/* Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${mode === 'useReducer' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('useReducer')}
        >
          ✅ Bản useReducer: Logic tập trung trong tasksReducer (Khuyên Dùng)
        </button>
        <button
          className={`btn ${mode === 'useState' ? 'btn-teal' : 'btn-secondary'}`}
          onClick={() => setMode('useState')}
        >
          ⚡ Bản useState: Logic map/filter nằm rải rác trong từng hàm handler
        </button>
      </div>

      <InfoBox
        type={mode === 'useReducer' ? 'tip' : 'info'}
        title={mode === 'useReducer' ? 'Đang chạy với useReducer:' : 'Đang chạy với useState:'}
      >
        {mode === 'useReducer' ? (
          <div>
            Component chỉ cần gọi <code>dispatch(&#123; type: &apos;added&apos;, id, text &#125;)</code>. Toàn bộ logic mảng 
            được đóng gói độc lập trong hàm <code>tasksReducer</code>, sẵn sàng để viết Unit Test tự động!
          </div>
        ) : (
          <div>
            Các hàm <code>handleAdd</code>, <code>handleChange</code>, <code>handleDelete</code> phải tự tay viết 
            <code>[...tasks, new]</code>, <code>map()</code>, <code>filter()</code>. Khi có 20 hàm, code component sẽ phình to khủng khiếp.
          </div>
        )}
      </InfoBox>

      {/* Add Task Input Form */}
      <form onSubmit={handleAddNewTask} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <input
          type="text"
          className="input-control"
          placeholder="Nhập tên công việc mới cần làm..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }} disabled={!newTaskText.trim()}>
          ➕ Thêm Task
        </button>
      </form>

      {/* Task List */}
      <div>
        {currentTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onChange={mode === 'useReducer' ? handleChangeReducer : handleChangeState}
            onDelete={mode === 'useReducer' ? handleDeleteReducer : handleDeleteState}
          />
        ))}
      </div>
    </div>
  );
}
