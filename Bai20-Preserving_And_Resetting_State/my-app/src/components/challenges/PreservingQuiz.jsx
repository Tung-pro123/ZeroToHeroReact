import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const quizData = [
  {
    id: 1,
    question: 'Điều gì quyết định State của một Component trong React có được bảo toàn (Preserve) qua các lần render hay không?',
    options: [
      { text: 'A. Tên biến State được khai báo trong useState', isCorrect: false },
      { text: 'B. Vị trí cố định của Component trong cây Render (Render Tree) và cùng loại Component', isCorrect: true },
      { text: 'C. Việc người dùng có lưu dữ liệu vào localStorage hay không', isCorrect: false },
      { text: 'D. Số lượng props truyền vào component có thay đổi hay không', isCorrect: false },
    ],
    explanation: 'React lưu trữ State độc lập trong các Fiber Node. Chừng nào tại đúng vị trí đó trong Render Tree vẫn là cùng loại component và cùng key, React sẽ bảo tồn State của nó.',
  },
  {
    id: 2,
    question: 'Nếu bạn có 2 component <Counter isFancy={true} /> và <Counter isFancy={false} /> ở 2 nhánh của toán tử ba ngôi tại CÙNG một vị trí, điều gì xảy ra với điểm số khi đổi isFancy?',
    options: [
      { text: 'A. Điểm số bị reset về 0 vì nằm ở 2 dòng code khác nhau', isCorrect: false },
      { text: 'B. Điểm số được GIỮ NGUYÊN vì React chỉ nhìn vào cấu trúc cây: cùng vị trí #1 và cùng là <Counter />', isCorrect: true },
      { text: 'C. React báo lỗi cú pháp Duplicate Component', isCorrect: false },
      { text: 'D. Component bị unmount và tải lại từ đầu', isCorrect: false },
    ],
    explanation: 'React không đọc câu lệnh if/else hay toán tử ba ngôi. React so sánh kết quả Render: cùng là <Counter /> tại con số 1, nên State được giữ nguyên 100%.',
  },
  {
    id: 3,
    question: 'Tại sao việc khai báo hàm Component con BÊN TRONG thân hàm Component cha lại là một cạm bẫy tử huyệt?',
    options: [
      { text: 'A. Làm tăng dung lượng bundle lên gấp 10 lần', isCorrect: false },
      { text: 'B. Mỗi lần Cha re-render, con trỏ hàm Con bị cấp phát mới trong RAM -> React tưởng Component lạ nên nhổ bỏ DOM cũ, gây mất State và mất focus chuột', isCorrect: true },
      { text: 'C. Không thể sử dụng được các thẻ HTML cơ bản như div, p, span', isCorrect: false },
      { text: 'D. Trình duyệt Chrome sẽ tự động chặn không cho chạy mã JavaScript', isCorrect: false },
    ],
    explanation: 'Mỗi lần render, hàm con bên trong là một function reference mới. React coi oldComponent !== newComponent nên liên tục unmount và remount, khiến input mất focus ngay sau mỗi phím gõ.',
  },
  {
    id: 4,
    question: 'Cách làm chuẩn nhất và nhanh nhất để "Làm mới (Reset)" toàn bộ State của một Form chỉnh sửa khi người dùng chuyển sang chọn một đối tượng khác là gì?',
    options: [
      { text: 'A. Viết useEffect lắng nghe id thay đổi và gọi 10 hàm set khác nhau', isCorrect: false },
      { text: 'B. Gắn thuộc tính key={selectedItem.id} vào component Form', isCorrect: true },
      { text: 'C. Gọi hàm window.location.reload() để tải lại cả trang web', isCorrect: false },
      { text: 'D. Dùng document.getElementById().reset()', isCorrect: false },
    ],
    explanation: 'Gắn key={id} là phương pháp chuẩn mực của React. Khi id thay đổi, React tự động tiêu hủy cây cũ và dựng lại component mới với State ban đầu sạch sẽ ngay trong 1 chu trình render duy nhất.',
  },
];

export default function PreservingQuiz() {
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
        <h2 className="lab-card-title">🧠 7. Thử Thách Trắc Nghiệm Kiến Trúc State</h2>
        <p className="lab-card-desc">
          Đo lường độ thấu hiểu của bạn về thuật toán Reconciliation, vị trí cây Render, và chiến lược dùng <code>key</code>.
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
                    optStyle.borderColor = '#f59e0b';
                    optStyle.background = 'rgba(245, 158, 11, 0.15)';
                    optStyle.color = '#fde68a';
                  }

                  if (showResults) {
                    if (opt.isCorrect) {
                      optStyle.borderColor = '#10b981';
                      optStyle.background = 'rgba(16, 185, 129, 0.25)';
                      optStyle.color = '#34d399';
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
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#0a0f1d', borderRadius: '6px', fontSize: '0.85rem', color: '#fde68a', border: '1px solid #b45309' }}>
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
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>
            Kết quả của bạn: {calculateScore()} / {quizData.length} câu đúng ({Math.round((calculateScore() / quizData.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
