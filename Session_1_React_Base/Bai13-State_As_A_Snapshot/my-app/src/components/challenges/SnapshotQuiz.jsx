import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function SnapshotQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: '1. Cho count ban đầu là 0. Khi người dùng click nút thực thi đoạn code sau, số trên màn hình sau khi re-render sẽ là bao nhiêu?',
      code: `setCount(count + 1);\nsetCount(count + 1);`,
      options: [
        { key: 'A', text: '0 (Vì setCount không chạy)' },
        { key: 'B', text: '1 (Vì cả 2 lần đều thế thành setCount(0 + 1))' },
        { key: 'C', text: '2 (Vì tăng 2 lần liên tiếp)' },
        { key: 'D', text: 'Báo lỗi SyntaxError' },
      ],
      correct: 'B',
      explanation: 'Trong lần render hiện tại, count = 0. Cả 2 lệnh đều thế thành setCount(0 + 1) nên React chỉ lên lịch cập nhật count = 1 cho render tới.',
    },
    {
      id: 'q2',
      question: '2. Nếu đặt alert(count) bên trong hàm setTimeout 3000ms, sau 3 giây alert sẽ in ra giá trị nào?',
      code: `setCount(count + 5);\nsetTimeout(() => {\n  alert(count);\n}, 3000);`,
      options: [
        { key: 'A', text: 'Giá trị count mới (đã +5) vì sau 3 giây màn hình đã render xong' },
        { key: 'B', text: 'Giá trị count cũ tại thời điểm bấm nút, do Closure bắt giữ Snapshot' },
        { key: 'C', text: 'undefined' },
        { key: 'D', text: 'NaN' },
      ],
      correct: 'B',
      explanation: 'Hàm callback của setTimeout tạo ra một Closure lưu giữ giá trị của snapshot lúc click. Dù ngoài kia màn hình đã render số 5, Closure vẫn giữ số cũ.',
    },
    {
      id: 'q3',
      question: '3. Bạn muốn vừa cập nhật State vừa gọi API với giá trị mới NGAY LẬP TỨC trong cùng một hàm onClick. Cách nào chuẩn nhất?',
      options: [
        { key: 'A', text: 'Gọi setCount(x); rồi truyền luôn x vào hàm API: callApi(count);' },
        { key: 'B', text: 'Tính trước: const next = count + 1; setCount(next); callApi(next);' },
        { key: 'C', text: 'Dùng await setCount(count + 1);' },
        { key: 'D', text: 'Ép React re-render bằng cách gọi window.location.reload()' },
      ],
      correct: 'B',
      explanation: 'Cách sạch sẽ và tối ưu nhất là tính toán trước giá trị mới vào một biến cục bộ (local variable) rồi tái sử dụng biến đó cho cả setCount và API call.',
    },
    {
      id: 'q4',
      question: '4. Trong bài toán Đèn Giao Thông, việc đổi vị trí đặt câu lệnh alert lên trước hay sau setWalk(!walk) có làm thay đổi nội dung alert không?',
      options: [
        { key: 'A', text: 'Có, nếu đặt sau thì alert sẽ đọc được giá trị mới của walk' },
        { key: 'B', text: 'Hoàn toàn không, vì biến walk bất biến trong suốt một lần render' },
        { key: 'C', text: 'Có, đặt sau sẽ gây vòng lặp vô tận (Infinite loop)' },
        { key: 'D', text: 'Không, nhưng trình duyệt sẽ chặn alert thứ hai' },
      ],
      correct: 'B',
      explanation: 'Biến walk trong lần render này là một hằng số. setWalk(!walk) không đổi giá trị walk ngay tại chỗ mà chỉ chuẩn bị cho lần render sau.',
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
          Kiểm tra toàn diện kiến thức về State as a Snapshot, JavaScript Closures và xử lý bất đồng bộ trong React.
        </p>
      </div>

      <InfoBox type="tip" title="Bí Quyết Phỏng Vấn">
        Các câu hỏi về Snapshot và Stale Closure là đề tài yêu thích nhất của các Tech Lead khi phỏng vấn vị trí React Developer từ Mid đến Senior!
      </InfoBox>

      {/* Quiz questions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '1.5rem 0' }}>
        {questions.map((q, idx) => {
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
                <pre className="code-pill" style={{ color: '#38bdf8', marginBottom: '0.75rem' }}>
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
                      background: 'rgba(56, 189, 248, 0.2)',
                      color: '#38bdf8',
                      border: '1px solid #38bdf8',
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

      {/* Action buttons */}
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
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>
            Kết Quả: {calculateScore()}/{questions.length} câu đúng (
            {Math.round((calculateScore() / questions.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
