import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Thuật toán cốt lõi tự viết theo đúng yêu cầu Challenge 2 của React Docs
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      finalState = update(finalState);
    } else {
      finalState = update;
    }
  }

  return finalState;
}

export default function CustomQueueEngineLab() {
  const [testResults, setTestResults] = useState(null);

  const testCases = [
    {
      id: 1,
      title: 'Test 1: Chỉ toàn giá trị thay thế (Replace only)',
      baseState: 0,
      queue: [1, 1, 1],
      codeDesc: '[1, 1, 1]',
      expected: 1,
      reason: '3 lần ghi đè số 1 liên tiếp, kết quả cuối là 1.',
    },
    {
      id: 2,
      title: 'Test 2: Chỉ toàn hàm cập nhật (Updaters only)',
      baseState: 0,
      queue: [(n) => n + 1, (n) => n + 1, (n) => n + 1],
      codeDesc: '[n => n + 1, n => n + 1, n => n + 1]',
      expected: 3,
      reason: '0 + 1 = 1 -> 1 + 1 = 2 -> 2 + 1 = 3.',
    },
    {
      id: 3,
      title: 'Test 3: Trộn lẫn - Giá trị trước, Hàm sau',
      baseState: 0,
      queue: [5, (n) => n + 1],
      codeDesc: '[5, n => n + 1]',
      expected: 6,
      reason: 'Ghi đè bằng 5, sau đó hàm lấy 5 + 1 = 6.',
    },
    {
      id: 4,
      title: 'Test 4: Trộn lẫn - Hàm trước, Giá trị đè sau cùng',
      baseState: 0,
      queue: [5, (n) => n + 1, 42],
      codeDesc: '[5, n => n + 1, 42]',
      expected: 42,
      reason: 'Tính ra 6 nhưng cuối cùng bị số 42 ghi đè thẳng.',
    },
  ];

  const runAllTests = () => {
    const results = testCases.map((tc) => {
      const actual = getFinalState(tc.baseState, tc.queue);
      return {
        ...tc,
        actual,
        passed: actual === tc.expected,
      };
    });
    setTestResults(results);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">⚙️ Thử Thách 2: Tự Viết Lõi getFinalState</h2>
        <p className="lab-card-desc">
          Triển khai và kiểm thử thuật toán tính toán hàng đợi của React: Tự tay viết hàm <code>getFinalState(baseState, queue)</code>.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất Lõi Thuật Toán">
        Hàm chỉ cần duyệt qua mảng <code>queue</code>. Nếu phần tử là hàm (<code>typeof update === 'function'</code>), 
        gọi hàm với state tích lũy. Nếu là giá trị thường, gán đè trực tiếp!
      </InfoBox>

      {/* Code Editor Preview */}
      <div style={{ margin: '1.25rem 0' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn hàm getFinalState tự xây dựng:</span>
        <pre className="code-pill">
{`export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // Nếu là Updater Function: Áp dụng hàm lên kết quả liền trước
      finalState = update(finalState);
    } else {
      // Nếu là Giá trị thông thường: Ghi đè thẳng
      finalState = update;
    }
  }

  return finalState;
}`}
        </pre>
      </div>

      {/* Run Tests Button */}
      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
        <button className="btn btn-primary" onClick={runAllTests} style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
          🧪 Chạy Toàn Bộ 4 Test Cases Chuẩn Của React Docs
        </button>
      </div>

      {/* Test Cases List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {(testResults || testCases).map((tc) => {
          const isEvaluated = testResults !== null;

          return (
            <div
              key={tc.id}
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ flex: 1, minWidth: '260px' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', marginBottom: '0.25rem' }}>{tc.title}</h4>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  Hàng đợi: <code style={{ color: '#38bdf8' }}>{tc.codeDesc}</code>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  {tc.reason}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Kỳ vọng: {tc.expected}</div>
                  {isEvaluated && (
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: tc.passed ? '#10b981' : '#ef4444' }}>
                      Thực tế: {tc.actual}
                    </div>
                  )}
                </div>

                {isEvaluated && (
                  <span
                    style={{
                      background: tc.passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: tc.passed ? '#10b981' : '#ef4444',
                      border: `1px solid ${tc.passed ? '#10b981' : '#ef4444'}`,
                      padding: '0.35rem 0.8rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                    }}
                  >
                    {tc.passed ? 'PASSED ✅' : 'FAILED ❌'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
