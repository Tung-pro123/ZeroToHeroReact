import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const QUESTIONS = [
  {
    id: 1,
    question: 'Khi một component con gọi useContext(MyContext), React tìm kiếm giá trị Context từ đâu?',
    options: [
      { text: 'A. Tìm trong state nội bộ của component cha trực tiếp gần nhất.', isCorrect: false },
      { text: 'B. Leo ngược lên cây component để tìm <MyContext.Provider> gần nhất; nếu không thấy, lấy giá trị mặc định truyền trong createContext(defaultValue).', isCorrect: true },
      { text: 'C. Luôn luôn lấy giá trị mặc định từ createContext() bất kể có Provider hay không.', isCorrect: false },
      { text: 'D. Tìm kiếm trong window.localStorage hoặc biến môi trường toàn cục.', isCorrect: false },
    ],
    explanation:
      'Chính xác! React sẽ duyệt ngược lên cây ảo từ vị trí component gọi useContext để tìm <MyContext.Provider value={...}> gần nhất. Nếu toàn bộ cây phía trên không có Provider nào, React mới sử dụng defaultValue đã truyền vào lúc khởi tạo createContext(defaultValue).',
  },
  {
    id: 2,
    question: 'Hiện tượng "Context Shadowing" (Ghi đè Context theo tầng) xảy ra khi nào?',
    options: [
      { text: 'A. Khi một Provider ở tầng con cung cấp value mới, ghi đè giá trị của Provider cha đối với toàn bộ cây con bên dưới nó.', isCorrect: true },
      { text: 'B. Khi hai Context khác nhau có cùng tên thuộc tính gây xung đột bộ nhớ.', isCorrect: false },
      { text: 'C. Khi Context bị xoá khỏi DOM trong quá trình unmount.', isCorrect: false },
      { text: 'D. Khi sử dụng React Context chung với Zustand hoặc Redux Toolkit.', isCorrect: false },
    ],
    explanation:
      'Chính xác! Tương tự như biến trong Scope lồng nhau của JavaScript, Provider ở tầng sâu hơn sẽ "che khuất" (shadow) Provider ở tầng ngoài đối với các component con của nó. Đây là kỹ thuật cốt lõi giúp các thẻ <Section> tự động tăng cấp độ tiêu đề <Heading>!',
  },
  {
    id: 3,
    question: 'Nếu AppContext.Provider cung cấp value={{ theme, count }}, component ThemeButton chỉ đọc theme. Khi count thay đổi, ThemeButton có bị re-render không?',
    options: [
      { text: 'A. Không, vì React Compiler tự phát hiện component chỉ truy cập thuộc tính theme nên bỏ qua.', isCorrect: false },
      { text: 'B. Có, vì mỗi lần count đổi, object value mới được tạo ra; React so sánh Object.is() trả về false và re-render TẤT CẢ consumer của Context đó!', isCorrect: true },
      { text: 'C. Chỉ re-render trên trình duyệt Safari do cơ chế garbage collection khác biệt.', isCorrect: false },
      { text: 'D. Chỉ re-render nếu ThemeButton được bọc bởi React.memo.', isCorrect: false },
    ],
    explanation:
      'Chính xác! Đây chính là "Cạm bẫy re-render của Context". React không hỗ trợ fine-grained selector tích hợp cho Context. Khi Provider nhận object tham chiếu mới, toàn bộ component gọi useContext(AppContext) đều re-render. Giải pháp là Tách Context (Split Contexts: ThemeContext & CountContext).',
  },
  {
    id: 4,
    question: 'Theo khuyến nghị chính thức của React.dev, khi nào nên ưu tiên Component Composition (children/slots) thay vì Context API?',
    options: [
      { text: 'A. Khi dữ liệu cần được chia sẻ tới hàng trăm component nằm rải rác ở khắp các trang.', isCorrect: false },
      { text: 'B. Khi chỉ có 1 hoặc 2 component con ở sâu cần dữ liệu, việc truyền JSX qua children/slots giúp giữ code đơn giản mà không cần khởi tạo Context.', isCorrect: true },
      { text: 'C. Không bao giờ, Context API luôn luôn là giải pháp tốt nhất trong mọi trường hợp.', isCorrect: false },
      { text: 'D. Chỉ khi dự án không cài đặt Vite hoặc Webpack.', isCorrect: false },
    ],
    explanation:
      'Chính xác! Đội ngũ phát triển React nhấn mạnh: Context rất tiện nhưng làm cho component gắn chặt vào môi trường Context đó và khó tái sử dụng độc lập hơn. Nếu chỉ cần giải quyết việc truyền prop qua 1-2 tầng layout trung gian, truyền JSX qua children hoặc slot prop là giải pháp trong sáng và nhẹ nhàng nhất!',
  },
];

export default function ContextQuiz() {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (questionId, optionIndex) => {
    if (showResult) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUESTIONS.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected !== undefined && q.options[selected].isCorrect) {
        correct++;
      }
    });
    return correct;
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResult(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === QUESTIONS.length;

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🧠</span> Bài Lab 7: Thử Thách Trắc Nghiệm Kiến Trúc Context API
        </h2>
        <p className="lab-card-desc">
          Kiểm tra độ thấu hiểu sâu sắc về cơ chế tìm kiếm Provider, Context Shadowing, Cạm bẫy Re-render và Tư duy lựa chọn giữa Composition vs Context.
        </p>
      </div>

      {showResult && (
        <div style={{
          background: score === QUESTIONS.length ? 'rgba(16, 185, 129, 0.1)' : 'rgba(6, 182, 212, 0.1)',
          border: `1px solid ${score === QUESTIONS.length ? '#10b981' : '#06b6d4'}`,
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            {score === QUESTIONS.length ? '🏆' : '🎯'}
          </div>
          <h3 style={{ margin: '0 0 0.5rem', color: score === QUESTIONS.length ? '#34d399' : '#38bdf8' }}>
            Kết Quả: {score} / {QUESTIONS.length} Câu Đúng
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 1rem' }}>
            {score === QUESTIONS.length
              ? 'Xuất sắc! Bạn đã nắm vững toàn bộ kiến trúc Context API và các kỹ thuật tối ưu hóa Senior!'
              : 'Rất tốt! Hãy đọc kỹ phần giải thích chi tiết bên dưới mỗi câu để củng cố kiến thức nhé.'}
          </p>
          <button className="btn btn-secondary btn-sm" onClick={handleReset}>
            🔄 Làm Lại Bài Trắc Nghiệm
          </button>
        </div>
      )}

      {/* Questions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isAnswered = selected !== undefined;

          return (
            <div
              key={q.id}
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '1.25rem',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>Câu {idx + 1}:</span>
                <span>{q.question}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {q.options.map((option, optIdx) => {
                  let optionStyle = {
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #334155',
                    background: '#0f172a',
                    cursor: showResult ? 'default' : 'pointer',
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    color: 'var(--text-main)',
                    transition: 'all 0.2s ease',
                  };

                  if (selected === optIdx && !showResult) {
                    optionStyle.border = '1px solid #06b6d4';
                    optionStyle.background = 'rgba(6, 182, 212, 0.15)';
                  }

                  if (showResult) {
                    if (option.isCorrect) {
                      optionStyle.border = '1px solid #10b981';
                      optionStyle.background = 'rgba(16, 185, 129, 0.15)';
                      optionStyle.color = '#34d399';
                    } else if (selected === optIdx && !option.isCorrect) {
                      optionStyle.border = '1px solid #ef4444';
                      optionStyle.background = 'rgba(239, 68, 68, 0.15)';
                      optionStyle.color = '#fca5a5';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      style={optionStyle}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div style={{ marginTop: '1rem' }}>
                  <InfoBox
                    type={q.options[selected]?.isCorrect ? 'tip' : 'danger'}
                    title="Giải thích chuyên sâu:"
                  >
                    {q.explanation}
                  </InfoBox>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      {!showResult && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            className="btn btn-primary"
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
            disabled={!allAnswered}
            onClick={() => setShowResult(true)}
          >
            {allAnswered ? '🚀 Nộp Bài & Xem Điểm' : `Hãy chọn đáp án cho tất cả các câu (${Object.keys(userAnswers).length}/${QUESTIONS.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
