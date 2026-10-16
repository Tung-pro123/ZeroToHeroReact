import { useReducer, useState } from 'react';
import InfoBox from '../common/InfoBox';

// 🌟 THỬ THÁCH 4: TỰ CODE LẠI useReducer BẰNG useState
function useMyReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    // Gọi hàm reducer thuần để tính toán state mới
    const nextState = reducer(state, action);
    // Cập nhật lại state
    setState(nextState);
  }

  return [state, dispatch];
}

// Reducer chung cho cả hai bên
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.step || 1) };
    case 'decrement':
      return { count: state.count - (action.step || 1) };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

export default function CustomReducerLab() {
  // 1. Hook chuẩn của React
  const [officialState, officialDispatch] = useReducer(counterReducer, { count: 0 });

  // 2. Hook do chính tay chúng ta tự chế bằng useState
  const [customState, customDispatch] = useMyReducer(counterReducer, { count: 0 });

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🛠️ 6. Thử Thách 4: Tự Code Hook useReducer Từ Con Số 0</h2>
        <p className="lab-card-desc">
          Bóc tách bí mật đằng sau Hook <code>useReducer</code>: Thực chất nó chỉ là một lớp bọc mỏng (wrapper) 
          gồm 8 dòng mã chạy trên nền tảng của <code>useState</code>!
        </p>
      </div>

      <InfoBox type="tip" title="Bản ChấtuseReducer = useState + Hàm Reducer Ngoại Lai">
        Không hề có phép thuật phức tạp! Hook <code>useMyReducer</code> chỉ nhận vào hàm reducer và giá trị khởi tạo, 
        dùng <code>useState</code> để giữ bộ nhớ, và mỗi khi <code>dispatch(action)</code> được gọi thì đưa dữ liệu cho reducer tính toán rồi gọi <code>setState(nextState)</code>.
      </InfoBox>

      {/* Side by side comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Left: React Official */}
        <div style={{ background: '#0d1527', border: '1px solid #3b82f6', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: '#60a5fa' }}>⚛️ React Official Hook</span>
            <span className="badge badge-blue">import &#123; useReducer &#125;</span>
          </div>

          <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#f3f4f6', margin: '0.75rem 0' }}>
            {officialState.count}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => officialDispatch({ type: 'decrement', step: 1 })}
            >
              -1
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => officialDispatch({ type: 'increment', step: 1 })}
            >
              +1
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => officialDispatch({ type: 'increment', step: 5 })}
            >
              +5
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => officialDispatch({ type: 'reset' })}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right: Custom Made */}
        <div style={{ background: '#0d1527', border: '1px solid #14b8a6', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: '#2dd4bf' }}>🛠️ Hook Tự Code useMyReducer</span>
            <span className="badge badge-teal">Tự Viết Bằng useState</span>
          </div>

          <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#f3f4f6', margin: '0.75rem 0' }}>
            {customState.count}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => customDispatch({ type: 'decrement', step: 1 })}
            >
              -1
            </button>
            <button
              className="btn btn-teal btn-sm"
              onClick={() => customDispatch({ type: 'increment', step: 1 })}
            >
              +1
            </button>
            <button
              className="btn btn-teal btn-sm"
              onClick={() => customDispatch({ type: 'increment', step: 5 })}
            >
              +5
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => customDispatch({ type: 'reset' })}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Code Display */}
      <div style={{ background: '#080d1a', borderRadius: '10px', border: '1px solid #1e293b', padding: '1.25rem' }}>
        <div style={{ fontSize: '0.85rem', color: '#f97316', fontWeight: 600, marginBottom: '0.5rem' }}>
          💻 MÃ NGUỒN TỰ VIẾT LẠI HOOK useReducer TRONG REACT:
        </div>
        <pre style={{ color: '#cbd5e1', fontSize: '0.85rem', overflowX: 'auto', lineHeight: 1.6, margin: 0 }}>
{`function useMyReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}`}
        </pre>
      </div>
    </div>
  );
}
