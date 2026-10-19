import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function QueueQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: '1. Cho number ban đầu = 0. Sau khi đoạn code sau kết thúc, giá trị number trên màn hình sau render là bao nhiêu?',
      code: `setNumber(number + 5);\nsetNumber(n => n + 1);\nsetNumber(42);`,
      options: [
        { key: 'A', text: '42 (Vì số 42 ghi đè thẳng kết quả trước đó)' },
        { key: 'B', text: '48 (5 + 1 + 42)' },
        { key: 'C', text: '6 (Bỏ qua 42)' },
        { key: 'D', text: '0 (Vì bị hủy lệnh)' },
      ],
      correct: 'A',
      explanation: 'Hàng đợi tính: thay thế 5 -> n => 5 + 1 = 6 -> đột ngột gặp số 42 ghi đè thẳng. Kết quả cuối là 42.',
    },
    {
      id: 'q2',
      question: '2. Cơ chế Automatic Batching trong React 18 áp dụng ở những phạm vi nào?',
      options: [
        { key: 'A', text: 'Chỉ áp dụng trong các React Synthetic Events như onClick, onChange' },
        { key: 'B', text: 'Áp dụng trên mọi ngữ cảnh: Promises, setTimeout, fetch, và native event listeners' },
        { key: 'C', text: 'Chỉ áp dụng khi bật Redux Toolkit' },
        { key: 'D', text: 'Chỉ áp dụng trong Component Class' },
      ],
      correct: 'B',
      explanation: 'Từ React 18 trở đi, Automatic Batching hoạt động toàn diện trên mọi tác vụ bất đồng bộ và sự kiện native.',
    },
    {
      id: 'q3',
      question: '3. Tại sao Updater Function (ví dụ: n => n + 1) bắt buộc phải là một Pure Function?',
      options: [
        { key: 'A', text: 'Để React có thể chạy nó trên Web Worker' },
        { key: 'B', text: 'Vì trong Strict Mode, React sẽ gọi nó 2 lần để phát hiện side-effects ngoài ý muốn' },
        { key: 'C', text: 'Vì nếu không pure, trình duyệt sẽ báo lỗi CSP (Content Security Policy)' },
        { key: 'D', text: 'Để chuyển đổi sang WebAssembly' },
      ],
      correct: 'B',
      explanation: 'Trong môi trường phát triển với Strict Mode, React chủ động chạy Updater Function 2 lần với cùng một tham số để đảm bảo hàm không gây ra side-effects hoặc đột biến biến ngoài.',
    },
    {
      id: 'q4',
      question: '4. Hàm flushSync từ package "react-dom" được dùng với mục đích gì?',
      options: [
        { key: 'A', text: 'Đồng bộ dữ liệu LocalStorage vào State' },
        { key: 'B', text: 'Ép React bỏ qua Batching và render/commit thay đổi lên Real DOM ngay lập tức' },
        { key: 'C', text: 'Dọn dẹp rác (Garbage Collection) trong bộ nhớ' },
        { key: 'D', text: 'Tạo kết nối WebSocket tới server' },
      ],
      correct: 'B',
      explanation: 'flushSync là lối thoát hiểm ép React thoát khỏi hàng đợi batching và cập nhật Real DOM tức thì (thường chỉ dùng khi cần đo kích thước DOM ngay sau state update).',
    },
  ];

  const handleSelect = (qId, optionKey) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🎯 Thử Thách & Câu Hỏi Phỏng Vấn</h2>
        <p className="lab-card-desc">
          Kiểm tra toàn diện kiến thức về State Updates Queue, Automatic Batching và xử lý bất đồng bộ.
        </p>
      </div>

      <InfoBox type="tip" title="Bí Quyết Phỏng Vấn Senior">
        Hiểu sâu về Automatic Batching của React 18 và cơ chế Queueing chứng minh bạn nắm chắc Reconciler Internals chứ không chỉ biết dùng cú pháp bề mặt.
      </InfoBox>

      {/* Questions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '1.5rem 0' }}>
        {questions.map((q) => {
          const isCorrect = selectedAnswers[q.id] === q.correct;

          return (
            <div
              key={q.id}
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '1.25rem',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.5rem' }}>
                {q.question}
              </h3>

              {q.code && (
                <pre className="code-pill" style={{ color: '#c084fc', marginBottom: '0.75rem' }}>
                  {q.code}
                </pre>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.options.map((opt) => {
                  const isSelected = selectedAnswers[q.id] === opt.key;
                  let btnStyle = {
                    background: '#1e293b',
                    color: '#e2e8f0',
                    border: '1px solid #334155',
                  };

                  if (isSelected) {
                    btnStyle = {
                      background: 'rgba(168, 85, 247, 0.2)',
                      color: '#c084fc',
                      border: '1px solid #a855f7',
                    };
                  }

                  if (submitted) {
                    if (opt.key === q.correct) {
                      btnStyle = {
                        background: 'rgba(16, 185, 129, 0.25)',
                        color: '#10b981',
                        border: '1px solid #10b981',
                        fontWeight: 700,
                      };
                    } else if (isSelected && !isCorrect) {
                      btnStyle = {
                        background: 'rgba(239, 68, 68, 0.25)',
                        color: '#ef4444',
                        border: '1px solid #ef4444',
                      };
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(q.id, opt.key)}
                      style={{
                        ...btnStyle,
                        padding: '0.65rem 1rem',
                        borderRadius: '8px',
                        textAlign: 'left',
                        cursor: submitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '0.9rem',
                        display: 'flex',
                        gap: '0.75rem',
                      }}
                    >
                      <strong>{opt.key}.</strong>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderLeft: `3px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                    fontSize: '0.85rem',
                    color: '#cbd5e1',
                  }}
                >
                  <strong>{isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng!'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
        {!submitted ? (
          <button
            className="btn btn-primary"
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(selectedAnswers).length < questions.length}
          >
            📊 Nộp Bài & Xem Điểm
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handleReset}>
            🔄 Làm Lại Bài Quiz
          </button>
        )}

        {submitted && (
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c084fc' }}>
            Kết Quả: {calculateScore()}/{questions.length} câu đúng (
            {Math.round((calculateScore() / questions.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
