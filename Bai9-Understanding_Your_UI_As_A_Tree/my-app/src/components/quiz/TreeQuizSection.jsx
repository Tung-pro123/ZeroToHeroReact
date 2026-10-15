import { useState } from 'react';

const quizQuestions = [
  {
    id: 1,
    question: "1. Tại sao các thẻ HTML thông thường (như <h1>, <div>) không xuất hiện trong Render Tree của React?",
    options: [
      { text: "A. Vì React không hỗ trợ thẻ HTML mà chỉ hỗ trợ XML.", isCorrect: false },
      { text: "B. Vì React là Platform Agnostic (độc lập nền tảng), Render Tree chỉ theo dõi các React Component do lập trình viên định nghĩa.", isCorrect: true },
      { text: "C. Vì các thẻ HTML chỉ được tạo ra khi trình duyệt chạy JavaScript thuần.", isCorrect: false },
      { text: "D. Do lỗi biên dịch của Vite và Babel.", isCorrect: false }
    ],
    explanation: "Chính xác! React tách biệt tầng tính toán Component khỏi tầng hiển thị đích. Render Tree chỉ chứa các React Component. Khi chạy trên web, thư viện cầu nối `react-dom` mới chuyển đổi chúng thành thẻ HTML trên Real DOM; khi chạy trên di động, `react-native` sẽ chuyển đổi thành Native Views."
  },
  {
    id: 2,
    question: "2. Cây Render (Render Tree) có đặc tính nào sau đây khi ứng dụng có Conditional Rendering?",
    options: [
      { text: "A. Cố định tĩnh từ lúc biên dịch và không bao giờ thay đổi.", isCorrect: false },
      { text: "B. Chỉ lưu trữ các component có gắn hook useEffect.", isCorrect: false },
      { text: "C. Biến động linh hoạt qua từng lần render; phản ánh ảnh chụp nhanh (snapshot) tại đúng thời điểm hiển thị.", isCorrect: true },
      { text: "D. Giống hệt 100% với Module Dependency Tree.", isCorrect: false }
    ],
    explanation: "Chính xác! Render Tree phản ánh chính xác những component nào thực sự được gọi trong lần render đó. Nếu một nhánh bị ẩn bởi điều kiện if/else, nhánh đó sẽ biến mất (unmount) khỏi Render Tree."
  },
  {
    id: 3,
    question: "3. Cơ chế 'Tree Shaking' của Bundler (Vite / Rollup / Webpack) dựa vào điều kiện tiên quyết nào?",
    options: [
      { text: "A. Sử dụng cú pháp ES Modules tĩnh (import và export) thay vì require() động của CommonJS.", isCorrect: true },
      { text: "B. Tắt hoàn toàn React Strict Mode.", isCorrect: false },
      { text: "C. Bắt buộc mọi component phải là Class Component.", isCorrect: false },
      { text: "D. Đặt tất cả code vào một file duy nhất.", isCorrect: false }
    ],
    explanation: "Chính xác! Nhờ cú pháp static import/export của ES Modules, Bundler có thể quét và xây dựng Module Dependency Tree tĩnh trước khi chạy mã. Các tệp hoặc hàm không có ai import sẽ bị loại bỏ hoàn toàn khỏi gói build production."
  },
  {
    id: 4,
    question: "4. Nếu <App /> truyền <Copyright /> qua prop children vào <Container />, trên Module Dependency Tree, Copyright.jsx là nhánh con của file nào?",
    options: [
      { text: "A. Container.jsx", isCorrect: false },
      { text: "B. App.jsx (vì App.jsx trực tiếp viết dòng lệnh import Copyright)", isCorrect: true },
      { text: "C. main.jsx", isCorrect: false },
      { text: "D. Không thuộc nhánh nào cả.", isCorrect: false }
    ],
    explanation: "Chính xác! Đây là sự lệch pha kinh điển: Trên Render Tree, Copyright nằm dưới Container; nhưng trên Dependency Tree, Copyright.jsx lại là con của App.jsx vì App.jsx mới là nơi viết câu lệnh import!"
  },
  {
    id: 5,
    question: "5. Khi một Component tầng trên cùng (Top-level Component) bị re-render do thay đổi State, chuyện gì xảy ra với cây con bên dưới?",
    options: [
      { text: "A. Chỉ có đúng component đó re-render, toàn bộ con cháu đứng yên.", isCorrect: false },
      { text: "B. Mặc định toàn bộ các component con cháu bên dưới cây sẽ bị đánh giá lại và re-render theo.", isCorrect: true },
      { text: "C. Ứng dụng sẽ bị văng lỗi crash.", isCorrect: false },
      { text: "D. Cây DOM thật của trình duyệt bị xóa sạch và vẽ lại từ đầu.", isCorrect: false }
    ],
    explanation: "Chính xác! Vì luồng dữ liệu của React chạy từ trên xuống dưới (Top-down Data Flow), khi một Top-level component render lại, mặc định nó sẽ gọi lại hàm của tất cả các component con bên dưới nó, trừ khi được can thiệp bằng React.memo hoặc kỹ thuật prop children."
  }
];

export default function TreeQuizSection() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      const selectedIndex = answers[q.id];
      if (selectedIndex !== undefined && q.options[selectedIndex].isCorrect) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🎯 Thử Thách & Câu Đố Tương Tác: Hiểu Giao Diện Dạng Cây</h2>
          <p className="card-desc">
            Kiểm tra mức độ thấu hiểu của bạn về Render Tree, Module Dependency Tree, Tree Shaking và Prop Children.
          </p>
        </div>
        {showResults && (
          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-react" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              Điểm của bạn: {score} / {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
            </span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {quizQuestions.map((q) => {
          const selectedOption = answers[q.id];
          const isAnswered = selectedOption !== undefined;

          return (
            <div key={q.id} className="quiz-card">
              <h3 className="quiz-question">{q.question}</h3>
              <div className="quiz-options">
                {q.options.map((opt, idx) => {
                  let btnClass = 'option-btn';
                  if (showResults) {
                    if (opt.isCorrect) {
                      btnClass += ' selected-correct';
                    } else if (selectedOption === idx) {
                      btnClass += ' selected-wrong';
                    }
                  } else if (selectedOption === idx) {
                    btnClass += ' active';
                  }

                  return (
                    <button
                      key={idx}
                      className={btnClass}
                      onClick={() => !showResults && handleSelect(q.id, idx)}
                      style={{
                        borderColor: !showResults && selectedOption === idx ? '#38bdf8' : undefined,
                        background: !showResults && selectedOption === idx ? 'rgba(56, 189, 248, 0.2)' : undefined
                      }}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className={`quiz-feedback ${q.options[selectedOption]?.isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <strong>{q.options[selectedOption]?.isCorrect ? '🎉 Hoàn toàn chính xác!' : '⚠️ Chưa đúng rồi:'}</strong> {q.explanation}
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
            style={{ opacity: Object.keys(answers).length === 0 ? 0.5 : 1, padding: '0.8rem 2rem', fontSize: '1.05rem' }}
          >
            Chấm Điểm Thử Thách 📝
          </button>
        ) : (
          <button className="btn-secondary" onClick={handleReset} style={{ padding: '0.8rem 2rem', fontSize: '1.05rem' }}>
            Làm Lại Thử Thách 🔄
          </button>
        )}
      </div>
    </div>
  );
}
