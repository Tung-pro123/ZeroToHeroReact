import { useState } from 'react';

const quizQuestions = [
  {
    id: 1,
    question: "1. Trong từ điển kỹ thuật của React, từ 'Rendering' mang ý nghĩa chính xác là gì?",
    options: [
      { text: "A. Quá trình trình duyệt vẽ các điểm ảnh pixel lên màn hình máy tính.", isCorrect: false },
      { text: "B. Quá trình React GỌI THỰC THI CÁC HÀM COMPONENT trong bộ nhớ RAM để lấy cấu trúc JSX mới.", isCorrect: true },
      { text: "C. Quá trình biên dịch mã JavaScript sang mã nhị phân.", isCorrect: false },
      { text: "D. Quá trình gửi request HTTP lên server.", isCorrect: false }
    ],
    explanation: "Chính xác! 'Render' trong React thuần túy là việc gọi hàm Component để tính toán bản vẽ giao diện trong RAM. Việc vẽ điểm ảnh lên màn hình thuộc về khâu Browser Paint của trình duyệt."
  },
  {
    id: 2,
    question: "2. Giai đoạn nào trong chu trình là nơi thư viện react-dom trực tiếp can thiệp và sửa đổi cây Real DOM thật?",
    options: [
      { text: "A. Trigger Phase", isCorrect: false },
      { text: "B. Render Phase", isCorrect: false },
      { text: "C. Commit Phase", isCorrect: true },
      { text: "D. Parse Phase", isCorrect: false }
    ],
    explanation: "Chính xác! Ở Render Phase, React chỉ tính toán trong RAM. Đến Commit Phase, React mới gõ cửa Real DOM và áp dụng những điểm khác biệt nhỏ nhất đã tính toán."
  },
  {
    id: 3,
    question: "3. Tại sao trong ví dụ Đồng Hồ đếm giây, người dùng gõ chữ vào ô <input> thì chữ không bị mất dù component re-render liên tục?",
    options: [
      { text: "A. Vì React lưu chữ đó vào localStorage của trình duyệt.", isCorrect: false },
      { text: "B. Vì ở bước Commit, React thấy thẻ <input> không thay đổi nên giữ nguyên 100% node DOM thật đó, không phá hủy hay tạo lại.", isCorrect: true },
      { text: "C. Vì thẻ <input> không phải là phần tử của React.", isCorrect: false },
      { text: "D. Do trình duyệt tự động ghi đè lại dữ liệu cũ.", isCorrect: false }
    ],
    explanation: "Chính xác! Thuật toán Diffing của React nhận thấy chỉ có nội dung chữ trong <h1> đổi, còn node DOM của thẻ <input> giữ nguyên cấu trúc nên React không hề đụng chạm vào node DOM thật đó."
  },
  {
    id: 4,
    question: "4. Trong môi trường Development, React Strict Mode gọi thực thi hàm Component 2 lần ở giai đoạn nào?",
    options: [
      { text: "A. Render Phase (để kiểm tra xem hàm có tinh khiết không)", isCorrect: true },
      { text: "B. Commit Phase (để gắn thẻ HTML 2 lần vào DOM)", isCorrect: false },
      { text: "C. Browser Paint Phase", isCorrect: false },
      { text: "D. Trigger Phase", isCorrect: false }
    ],
    explanation: "Chính xác! Strict Mode chỉ gọi đúp hàm ở Render Phase (trong RAM) để phát hiện Side Effects vi phạm tính tinh khiết. Bước Commit Phase chỉ chạy đúng một lần duy nhất lên Real DOM."
  }
];

export default function RenderCommitQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId, optIdx) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      const selected = answers[q.id];
      if (selected !== undefined && q.options[selected].isCorrect) score += 1;
    });
    return score;
  };

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🎯 Trắc Nghiệm Đánh Giá: Làm Chủ Chu Trình Render &amp; Commit</h2>
          <p className="card-desc">
            Kiểm tra mức độ thấu hiểu của bạn về bản chất của các pha Trigger, Render, Commit và thuật toán Diffing.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {quizQuestions.map((q) => {
          const selected = answers[q.id];
          return (
            <div key={q.id} className="quiz-card">
              <h4 className="quiz-question">{q.question}</h4>
              <div className="quiz-options">
                {q.options.map((opt, idx) => {
                  let cls = 'option-btn';
                  if (showResults) {
                    if (opt.isCorrect) cls += ' selected-correct';
                    else if (selected === idx) cls += ' selected-wrong';
                  } else if (selected === idx) {
                    cls += ' active';
                  }

                  return (
                    <button
                      key={idx}
                      className={cls}
                      onClick={() => !showResults && handleSelect(q.id, idx)}
                      style={{
                        borderColor: !showResults && selected === idx ? '#06b6d4' : undefined,
                        background: !showResults && selected === idx ? 'rgba(6, 182, 212, 0.2)' : undefined
                      }}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className={`quiz-feedback ${q.options[selected]?.isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <strong>{q.options[selected]?.isCorrect ? '🎉 Hoàn toàn chính xác!' : '⚠️ Giải thích:'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        {!showResults ? (
          <button
            className="btn-primary"
            onClick={() => setShowResults(true)}
            disabled={Object.keys(answers).length === 0}
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
          >
            Chấm Điểm Trắc Nghiệm 📝
          </button>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4', marginBottom: '0.75rem' }}>
              Điểm của bạn: {calculateScore()} / {quizQuestions.length} ({Math.round((calculateScore() / quizQuestions.length) * 100)}%)
            </div>
            <button
              className="btn-secondary"
              onClick={() => { setAnswers({}); setShowResults(false); }}
              style={{ padding: '0.6rem 1.5rem' }}
            >
              Làm lại 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
