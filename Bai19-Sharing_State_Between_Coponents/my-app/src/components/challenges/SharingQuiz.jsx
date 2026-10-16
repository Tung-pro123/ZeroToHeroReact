import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const quizData = [
  {
    id: 1,
    question: 'Khi hai Component anh em (Siblings) cần đồng bộ trạng thái với nhau trong React, cách làm chuẩn mực nhất là gì?',
    options: [
      { text: 'A. Dùng biến toàn cục (window.sharedState) để cả hai cùng đọc/ghi', isCorrect: false },
      { text: 'B. Dùng DOM API (document.querySelector) để can thiệp trực tiếp vào component bên cạnh', isCorrect: false },
      { text: 'C. Kéo State lên Component Cha chung gần nhất (Lifting State Up) và truyền xuống qua Props', isCorrect: true },
      { text: 'D. Tạo useState ở cả 2 component rồi dùng useEffect lắng nghe lẫn nhau', isCorrect: false },
    ],
    explanation: 'React hoạt động theo luồng dữ liệu 1 chiều (Top-Down). Giải pháp chính thống và an toàn nhất là kéo State lên Component Cha chung gần nhất, biến 2 con thành Controlled components.',
  },
  {
    id: 2,
    question: 'Thế nào là một "Controlled Component" trong React?',
    options: [
      { text: 'A. Là component tự quản lý state bằng useState bên trong ruột của nó', isCorrect: false },
      { text: 'B. Là component mà trạng thái quan trọng của nó được điều khiển hoàn toàn bởi Props từ Cha truyền xuống', isCorrect: true },
      { text: 'C. Là component được điều khiển bởi Redux hoặc cơ sở dữ liệu bên ngoài', isCorrect: false },
      { text: 'D. Là component không cho phép người dùng bấm click hay gõ phím', isCorrect: false },
    ],
    explanation: 'Controlled Component không nắm giữ "nguồn sự thật" trong ruột nó; giá trị hiển thị và hành vi thay đổi của nó phụ thuộc 100% vào Props và Callbacks từ Cha.',
  },
  {
    id: 3,
    question: 'Hậu quả nguy hiểm nhất khi bạn tạo 2 biến State độc lập để lưu trữ cùng một thông tin (Vi phạm Single Source of Truth) là gì?',
    options: [
      { text: 'A. React sẽ tự động báo lỗi compile và dừng build ứng dụng', isCorrect: false },
      { text: 'B. Lỗi lệch pha dữ liệu (Desynchronization): Nơi này cập nhật nhưng nơi kia vẫn giữ dữ liệu cũ, hoặc vòng lặp vô tận', isCorrect: true },
      { text: 'C. Tốc độ tải trang web bị chậm đi 50%', isCorrect: false },
      { text: 'D. Trình duyệt không thể render ra mã HTML', isCorrect: false },
    ],
    explanation: 'Vi phạm nguyên lý Nguồn Sự Thật Duy Nhất dẫn đến việc bạn phải viết code thủ công để cố gắng giữ 2 state đồng bộ, thường gây ra bug Stale State hoặc infinite re-render loops.',
  },
  {
    id: 4,
    question: 'Khi việc "Kéo State lên Cha" dẫn đến hiện tượng Prop Drilling qua nhiều tầng trung gian, bạn có thể giải quyết bằng kỹ thuật cốt lõi nào của React mà chưa cần đến Context/Redux?',
    options: [
      { text: 'A. Đặt State vào localStorage của trình duyệt', isCorrect: false },
      { text: 'B. Dùng Component Composition: Truyền trực tiếp Component con vào thẻ cha qua prop `children`', isCorrect: true },
      { text: 'C. Ép kiểu các component con thành PureComponent', isCorrect: false },
      { text: 'D. Sử dụng hàm eval() để đọc biến từ xa', isCorrect: false },
    ],
    explanation: 'Component Composition (sử dụng prop `children` hoặc các slot JSX) giúp bạn khai báo component nhận dữ liệu ngay tại nơi Cha sở hữu State, loại bỏ hoàn toàn các tầng trung gian.',
  },
];

export default function SharingQuiz() {
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
          Kiểm tra độ thấu hiểu của bạn về kỹ thuật Lifting State Up, Controlled vs Uncontrolled, và triết lý Single Source of Truth.
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
                    optStyle.borderColor = '#10b981';
                    optStyle.background = 'rgba(16, 185, 129, 0.15)';
                    optStyle.color = '#a7f3d0';
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
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#0a0f1d', borderRadius: '6px', fontSize: '0.85rem', color: '#93c5fd', border: '1px solid #1d4ed8' }}>
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
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399' }}>
            Kết quả của bạn: {calculateScore()} / {quizData.length} câu đúng ({Math.round((calculateScore() / quizData.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
