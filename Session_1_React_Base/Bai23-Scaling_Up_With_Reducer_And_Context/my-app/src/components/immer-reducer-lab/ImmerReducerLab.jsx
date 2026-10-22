import { useState, createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import InfoBox from '../common/InfoBox';

// Contexts cho Immer Kanban
const KanbanContext = createContext(null);
const KanbanDispatchContext = createContext(null);

const initialColumns = [
  {
    id: 'col-1',
    title: '📝 Cần Làm (To Do)',
    cards: [
      { id: 'c-1', text: 'Thiết kế Schema Database', priority: 'High' },
      { id: 'c-2', text: 'Tích hợp cổng thanh toán VNPay', priority: 'Medium' },
    ],
  },
  {
    id: 'col-2',
    title: '⚡ Đang Thực Hiện (Doing)',
    cards: [
      { id: 'c-3', text: 'Viết Unit Test cho Reducer', priority: 'High' },
    ],
  },
  {
    id: 'col-3',
    title: '✅ Đã Hoàn Thành (Done)',
    cards: [
      { id: 'c-4', text: 'Khởi tạo cấu trúc dự án Vite', priority: 'Low' },
    ],
  },
];

// Immer Reducer: Cho phép đột biến trực tiếp bản nháp draft!
function kanbanImmerReducer(draft, action) {
  switch (action.type) {
    case 'add_card': {
      const col = draft.find((c) => c.id === action.columnId);
      if (col) {
        col.cards.push({ id: 'c-' + Date.now(), text: action.text, priority: action.priority });
      }
      break;
    }
    case 'move_card': {
      const { fromColId, toColId, cardId } = action;
      const fromCol = draft.find((c) => c.id === fromColId);
      const toCol = draft.find((c) => c.id === toColId);
      if (fromCol && toCol) {
        const cardIndex = fromCol.cards.findIndex((c) => c.id === cardId);
        if (cardIndex !== -1) {
          const [movedCard] = fromCol.cards.splice(cardIndex, 1);
          toCol.cards.push(movedCard);
        }
      }
      break;
    }
    case 'delete_card': {
      const col = draft.find((c) => c.id === action.columnId);
      if (col) {
        col.cards = col.cards.filter((c) => c.id !== action.cardId);
      }
      break;
    }
    default:
      break;
  }
}

export default function ImmerReducerLab() {
  const [columns, dispatch] = useImmerReducer(kanbanImmerReducer, initialColumns);
  const [newText, setNewText] = useState('');
  const [targetCol, setTargetCol] = useState('col-1');
  const [priority, setPriority] = useState('Medium');

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    dispatch({ type: 'add_card', columnId: targetCol, text: newText.trim(), priority });
    setNewText('');
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🪄</span> Bài Lab 4: Nâng Cấp Với useImmerReducer & State Đa Tầng Lồng Nhau
        </h2>
        <p className="lab-card-desc">
          Khi cấu trúc dữ liệu trở nên phức tạp (Mảng chứa Đối tượng, Đối tượng lại chứa Mảng con như Bảng Kanban),
          kết hợp <code>useImmerReducer</code> và Context giúp viết logic đột biến trực tiếp (<code>draft.push</code>, <code>splice</code>) mà vẫn đảm bảo 100% tính bất biến (Immutability).
        </p>
      </div>

      <InfoBox type="tip" title="Sự khác biệt khi có Immer:">
        Không có Immer, việc di chuyển 1 thẻ từ Cột A sang Cột B đòi hỏi bạn phải <code>map()</code> qua mảng cột, rồi <code>filter()</code> cột cũ, rồi <code>concat()</code> vào cột mới... viết 20 dòng code rất dễ nhầm lẫn.
        Với <code>useImmerReducer</code>, bạn chỉ cần <code>splice()</code> rồi <code>push()</code> thẳng vào draft!
      </InfoBox>

      {/* Kanban Context Provider */}
      <KanbanContext.Provider value={columns}>
        <KanbanDispatchContext.Provider value={dispatch}>
          {/* Quick Add Form */}
          <form
            onSubmit={handleAddCard}
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '1.25rem',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              className="input-control"
              style={{ flex: 2, minWidth: '220px' }}
              placeholder="Nhập thẻ công việc mới cho Sprint..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <select
              className="input-control"
              style={{ flex: 1, minWidth: '150px' }}
              value={targetCol}
              onChange={(e) => setTargetCol(e.target.value)}
            >
              <option value="col-1">Cột: To Do</option>
              <option value="col-2">Cột: Doing</option>
              <option value="col-3">Cột: Done</option>
            </select>
            <select
              className="input-control"
              style={{ flex: 1, minWidth: '130px' }}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">Ưu tiên Cao (🔴)</option>
              <option value="Medium">Trung bình (🟡)</option>
              <option value="Low">Thấp (🟢)</option>
            </select>
            <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              ➕ Thêm Thẻ
            </button>
          </form>

          {/* Kanban Board Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {columns.map((column) => (
              <KanbanColumn key={column.id} column={column} allColumns={columns} />
            ))}
          </div>
        </KanbanDispatchContext.Provider>
      </KanbanContext.Provider>
    </div>
  );
}

function KanbanColumn({ column, allColumns }) {
  const dispatch = useContext(KanbanDispatchContext);

  const priorityColors = {
    High: '#f43f5e',
    Medium: '#f59e0b',
    Low: '#10b981',
  };

  return (
    <div style={{
      background: '#0d1322',
      border: '1px solid #1e293b',
      borderRadius: '10px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>{column.title}</h4>
        <span className="badge badge-emerald">{column.cards.length}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minHeight: '120px' }}>
        {column.cards.map((card) => (
          <div
            key={card.id}
            style={{
              background: '#111827',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '0.85rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f3f4f6' }}>{card.text}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  background: `${priorityColors[card.priority]}22`,
                  color: priorityColors[card.priority],
                  border: `1px solid ${priorityColors[card.priority]}55`,
                  fontWeight: 600,
                }}
              >
                {card.priority}
              </span>
            </div>

            {/* Actions: Move card to another column or delete */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.6rem', borderTop: '1px solid #1f2937', paddingTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {allColumns.filter((c) => c.id !== column.id).map((otherCol) => (
                  <button
                    key={otherCol.id}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}
                    onClick={() =>
                      dispatch({
                        type: 'move_card',
                        fromColId: column.id,
                        toColId: otherCol.id,
                        cardId: card.id,
                      })
                    }
                  >
                    Sang {otherCol.title.split(' ')[1]} →
                  </button>
                ))}
              </div>

              <button
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
                onClick={() => dispatch({ type: 'delete_card', columnId: column.id, cardId: card.id })}
                title="Xóa thẻ"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {column.cards.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
            Chưa có thẻ nào trong cột này
          </div>
        )}
      </div>
    </div>
  );
}
