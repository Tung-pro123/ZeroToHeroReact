import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function QueuePipelineLab() {
  const [baseState, setBaseState] = useState(0);
  const [finalState, setFinalState] = useState(0);

  // Mảng các phần tử trong hàng đợi
  const [queue, setQueue] = useState([
    { type: 'replace', label: 'Ghi đè: 5', value: 5 },
    { type: 'updater', label: 'Hàm: n => n + 1', fn: (n) => n + 1, desc: 'n + 1' },
    { type: 'replace', label: 'Ghi đè: 42', value: 42 },
  ]);

  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [executionTrace, setExecutionTrace] = useState([]);

  // Chạy mô phỏng từng bước
  const handleRunSimulation = () => {
    let current = baseState;
    const trace = [];

    queue.forEach((item, index) => {
      let next;
      if (item.type === 'updater') {
        next = item.fn(current);
        trace.push({
          step: index + 1,
          type: 'Hàm Updater',
          input: current,
          action: item.desc,
          output: next,
        });
      } else {
        next = item.value;
        trace.push({
          step: index + 1,
          type: 'Ghi đè Giá trị',
          input: current,
          action: `Ghi đè = ${item.value}`,
          output: next,
        });
      }
      current = next;
    });

    setExecutionTrace(trace);
    setFinalState(current);
  };

  const loadPreset = (presetName) => {
    setActiveStepIndex(-1);
    setExecutionTrace([]);
    if (presetName === 'triple') {
      setBaseState(0);
      setQueue([
        { type: 'updater', label: 'n => n + 1', fn: (n) => n + 1, desc: 'n + 1' },
        { type: 'updater', label: 'n => n + 1', fn: (n) => n + 1, desc: 'n + 1' },
        { type: 'updater', label: 'n => n + 1', fn: (n) => n + 1, desc: 'n + 1' },
      ]);
    } else if (presetName === 'mix_then_updater') {
      setBaseState(0);
      setQueue([
        { type: 'replace', label: 'Ghi đè: 5', value: 5 },
        { type: 'updater', label: 'n => n + 1', fn: (n) => n + 1, desc: 'n + 1' },
      ]);
    } else if (presetName === 'override_42') {
      setBaseState(0);
      setQueue([
        { type: 'replace', label: 'Ghi đè: 5', value: 5 },
        { type: 'updater', label: 'n => n + 1', fn: (n) => n + 1, desc: 'n + 1' },
        { type: 'replace', label: 'Ghi đè: 42', value: 42 },
      ]);
    }
  };

  const handleAddItem = (type, param) => {
    if (type === 'updater_plus1') {
      setQueue((prev) => [...prev, { type: 'updater', label: 'n => n + 1', fn: (n) => n + 1, desc: 'n + 1' }]);
    } else if (type === 'updater_double') {
      setQueue((prev) => [...prev, { type: 'updater', label: 'n => n * 2', fn: (n) => n * 2, desc: 'n * 2' }]);
    } else if (type === 'replace_100') {
      setQueue((prev) => [...prev, { type: 'replace', label: 'Ghi đè: 100', value: 100 }]);
    }
    setExecutionTrace([]);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🔄 Hàng Đợi Updater Step-by-Step</h2>
        <p className="lab-card-desc">
          Trực quan hóa thuật toán xử lý hàng đợi của React: Xem từng giá trị biến đổi khi trộn lẫn giữa hàm và số cố định.
        </p>
      </div>

      <InfoBox type="info" title="Quy Luật Vận Hành Của Hàng Đợi (Queue)">
        Nếu gặp <strong>Hàm</strong>: React truyền Pending State hiện tại vào hàm để lấy giá trị mới.  
        Nếu gặp <strong>Giá trị</strong>: React xóa bỏ kết quả trước đó và ghi đè thẳng giá trị này.
      </InfoBox>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Kịch bản mẫu:</span>
        <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => loadPreset('triple')}>
          +3 Updater (1+1+1)
        </button>
        <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => loadPreset('mix_then_updater')}>
          Gán 5 rồi n =&gt; n + 1 (=6)
        </button>
        <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => loadPreset('override_42')}>
          Gán 5, +1, rồi Đè 42 (=42)
        </button>
      </div>

      {/* Visual Queue Pipeline */}
      <div style={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '12px', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 600 }}>
            📦 HÀNG ĐỢI ĐANG CHỜ XỬ LÝ (QUEUE):
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Base State: <strong>{baseState}</strong>
          </span>
        </div>

        <div className="queue-strip">
          <div className="queue-item-card" style={{ borderColor: '#6366f1' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Bắt đầu</div>
            <div style={{ fontWeight: 800, color: '#6366f1', fontSize: '1.2rem' }}>{baseState}</div>
          </div>

          {queue.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="queue-arrow">➔</div>
              <div
                className={`queue-item-card ${activeStepIndex === idx ? 'active-step' : ''}`}
                style={{ borderColor: item.type === 'updater' ? '#a855f7' : '#f59e0b' }}
              >
                <div style={{ fontSize: '0.75rem', color: item.type === 'updater' ? '#c084fc' : '#fbbf24' }}>
                  {item.type === 'updater' ? 'Hàm Updater' : 'Ghi đè'}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc', marginTop: '0.2rem' }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar to add items */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
          <button className="btn btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem' }} onClick={() => handleAddItem('updater_plus1')}>
            ➕ Thêm n =&gt; n + 1
          </button>
          <button className="btn btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem' }} onClick={() => handleAddItem('updater_double')}>
            ✖️ Thêm n =&gt; n * 2
          </button>
          <button className="btn btn-secondary" style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem' }} onClick={() => handleAddItem('replace_100')}>
            📌 Thêm Ghi đè 100
          </button>
          <button className="btn btn-danger" style={{ padding: '0.35rem 0.7rem', fontSize: '0.8rem', marginLeft: 'auto' }} onClick={() => setQueue([])}>
            🗑️ Xóa sạch hàng đợi
          </button>
        </div>
      </div>

      {/* Run button */}
      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
        <button className="btn btn-primary" onClick={handleRunSimulation} disabled={queue.length === 0} style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
          🚀 Thực Thi Thuật Toán Hàng Đợi (Calculate Final State)
        </button>
      </div>

      {/* Trace Table */}
      {executionTrace.length > 0 && (
        <div style={{ marginTop: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#1e293b', borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '0.75rem' }}>Bước</th>
                <th style={{ padding: '0.75rem' }}>Loại Lệnh</th>
                <th style={{ padding: '0.75rem' }}>Pending State Vào</th>
                <th style={{ padding: '0.75rem' }}>Phép Tính / Hành Động</th>
                <th style={{ padding: '0.75rem' }}>Kết Quả Đầu Ra</th>
              </tr>
            </thead>
            <tbody>
              {executionTrace.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>#{row.step}</td>
                  <td style={{ padding: '0.75rem' }}>{row.type}</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'var(--font-mono)' }}>{row.input}</td>
                  <td style={{ padding: '0.75rem', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>{row.action}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                    {row.output}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: 'center', marginTop: '1.25rem', padding: '1rem', background: '#090d16', borderRadius: '8px' }}>
            <span style={{ fontSize: '1rem', color: '#94a3b8' }}>Trạng Thái Cuối Cùng Sau Render (Final State):</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              {finalState}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
