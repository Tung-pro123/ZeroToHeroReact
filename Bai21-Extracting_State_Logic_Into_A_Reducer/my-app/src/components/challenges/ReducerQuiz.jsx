import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const quizData = [
  {
    id: 1,
    question: 'Sự khác biệt cốt lõi nhất về mặt tư duy giữa useState và useReducer là gì?',
    options: [
      { text: 'A. useReducer chạy nhanh hơn useState gấp 10 lần trong mọi trường hợp', isCorrect: false },
      { text: 'B. useState nói cho React biết "Cách cập nhật State ra sao", còn useReducer chỉ thông báo "Người dùng vừa làm hành động gì (Action)"', isCorrect: true },
      { text: 'C. useState chỉ lưu được số nguyên, còn useReducer mới lưu được Object', isCorrect: false },
      { text: 'D. useReducer chỉ dùng được trên trình duyệt Chrome', isCorrect: false },
    ],
    explanation: 'Với useState, bạn trực tiếp ra lệnh tính toán (Imperative). Với useReducer, bạn chuyển sang tư duy Khai báo (Declarative): Bạn chỉ dispatch một Action mô tả sự kiện, còn toàn bộ việc tính toán do hàm Reducer lo.',
  },
  {
    id: 2,
    question: 'Tại sao hàm Reducer bắt buộc phải là một Hàm Tinh Khiết (Pure Function)?',
    options: [
      { text: 'A. Để React có thể nén mã nguồn nhỏ gọn hơn khi build', isCorrect: false },
      { text: 'B. Vì nếu gọi API hoặc Math.random() trong Reducer, các tính năng như Time-travel Debugging sẽ bị phá vỡ và StrictMode sẽ kích hoạt trùng lặp request', isCorrect: true },
      { text: 'C. Để hàm có thể chạy được trên Node.js', isCorrect: false },
      { text: 'D. Vì JavaScript không hỗ trợ hàm bất đồng bộ trong câu lệnh switch/case', isCorrect: false },
    ],
    explanation: 'Reducer phải nhận vào (state, action) và trả về newState một cách đồng bộ và tất định. Side Effects (như gọi API, setTimeout) phải được thực hiện ở Event Handlers hoặc useEffect, không bao giờ được đặt trong Reducer.',
  },
  {
    id: 3,
    question: 'Khi sử dụng useImmerReducer từ thư viện use-immer, cú pháp cập nhật mảng trong Reducer sẽ thay đổi như thế nào?',
    options: [
      { text: 'A. Vẫn phải viết return [...draft, newItem] như bình thường', isCorrect: false },
      { text: 'B. Được phép dùng các hàm đột biến trực tiếp như draft.push() hoặc draft.splice() và kết thúc bằng break;', isCorrect: true },
      { text: 'C. Phải gọi hàm draft.save() để lưu dữ liệu', isCorrect: false },
      { text: 'D. draft tự động biến thành mảng bất biến read-only', isCorrect: false },
    ],
    explanation: 'Immer cung cấp một đối tượng trung gian gọi là "draft". Bạn có thể tự do dùng các hàm đột biến (mutation) như push, splice, gán thuộc tính trực tiếp. Immer đứng phía sau sẽ tạo ra state bất biến mới an toàn.',
  },
  {
    id: 4,
    question: 'Bản chất bên dưới của Hook useReducer trong React là gì?',
    options: [
      { text: 'A. Một API cấp thấp được nhúng trực tiếp bằng C++ trong nhân V8', isCorrect: false },
      { text: 'B. Một lớp vỏ bọc (wrapper) đơn giản sử dụng useState để lưu bộ nhớ và gọi hàm reducer mỗi khi dispatch', isCorrect: true },
      { text: 'C. Một cơ chế kết nối trực tiếp với Redux store toàn cục', isCorrect: false },
      { text: 'D. Một Web Worker chạy ngầm ngoài main thread', isCorrect: false },
    ],
    explanation: 'useReducer không hề có phép thuật thần bí. Nó hoàn toàn có thể được tự code lại chỉ bằng 8 dòng mã sử dụng useState: mỗi khi dispatch(action), nó đưa action vào reducer tính ra nextState rồi gọi setState(nextState).',
  },
];

export default function ReducerQuiz() {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (qId, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((q) => {
      if (userAnswers[q.id] !== undefined && q.options[userAnswers[q.id]].isCorrect) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🧠 7. Thử Thách Trắc Nghiệm Kiến Trúc useReducer</h2>
        <p className="lab-card-desc">
          Đo lường độ thấu hiểu của bạn về tư duy Dispatch Action, Pure Function Reducer, và thư viện Immer.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        {quizData.map((q, idx) => {
          const selectedOption = userAnswers[q.id];
          return (
            <div
              key={q.id}
              style={{
                background: '#0d1527',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '1.25rem',
              }}
            >
              <h3 style={{ fontSize: '1.05rem', color: '#f3f4f6', fontWeight: 600, marginBottom: '0.85rem' }}>
                Câu {idx + 1}: {q.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.options.map((opt, optIdx) => {
                  const isChosen = selectedOption === optIdx;
                  let optStyle = {
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #1f293d',
                    background: '#111827',
                    color: '#d1d5db',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.92rem',
                    transition: 'all 0.2s',
                  };

                  if (isChosen) {
                    optStyle.borderColor = '#f97316';
                    optStyle.background = 'rgba(249, 115, 22, 0.15)';
                    optStyle.color = '#fed7aa';
                  }

                  if (showResults) {
                    if (opt.isCorrect) {
                      optStyle.borderColor = '#14b8a6';
                      optStyle.background = 'rgba(20, 184, 166, 0.25)';
                      optStyle.color = '#2dd4bf';
                      optStyle.fontWeight = 600;
                    } else if (isChosen && !opt.isCorrect) {
                      optStyle.borderColor = '#ef4444';
                      optStyle.background = 'rgba(239, 68, 68, 0.2)';
                      optStyle.color = '#fca5a5';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      style={optStyle}
                      onClick={() => !showResults && handleSelectOption(q.id, optIdx)}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#0a0f1d', borderRadius: '6px', fontSize: '0.85rem', color: '#fed7aa', border: '1px solid #c2410c' }}>
                  💡 <strong>Giải thích:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {!showResults ? (
          <button
            className="btn btn-primary"
            onClick={() => setShowResults(true)}
            disabled={Object.keys(userAnswers).length === 0}
          >
            📋 Chấm Điểm Thử Thách
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handleReset}>
            🔄 Làm Lại Bài Quiz
          </button>
        )}

        {showResults && (
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f97316' }}>
            Kết quả của bạn: {calculateScore()} / {quizData.length} câu đúng ({Math.round((calculateScore() / quizData.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
