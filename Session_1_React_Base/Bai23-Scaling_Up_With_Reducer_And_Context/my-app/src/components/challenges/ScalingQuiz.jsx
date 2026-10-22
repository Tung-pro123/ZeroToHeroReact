import { useState } from 'react';
import InfoBox from '../common/InfoBox';

const QUESTIONS = [
  {
    id: 1,
    question: 'Tại sao React.dev khuyến nghị tách thành 2 Context riêng biệt (TasksContext và TasksDispatchContext) thay vì gộp chung value={{ tasks, dispatch }}?',
    options: [
      { text: 'A. Vì cú pháp React Context không cho phép truyền function chung với array trong cùng một object.', isCorrect: false },
      { text: 'B. Vì hàm dispatch có danh tính ổn định (stable identity); việc tách riêng giúp các component chỉ cần gửi action (như Form thêm mới) không bị re-render vô ích khi tasks thay đổi.', isCorrect: true },
      { text: 'C. Để tương thích với trình duyệt Safari cũ không hỗ trợ object lồng nhau.', isCorrect: false },
      { text: 'D. Để trình duyệt nạp bộ nhớ cache nhanh hơn 20%.', isCorrect: false },
    ],
    explanation:
      'Chính xác! Hàm dispatch từ useReducer được React đảm bảo giữ nguyên tham chiếu giữa mọi lần render. Khi tách TasksDispatchContext, Provider của nó không bao giờ phát tín hiệu re-render. Nhờ đó, các component chỉ cần dispatch (như AddTaskForm, DeleteButton) được cách ly hiệu năng hoàn hảo!',
  },
  {
    id: 2,
    question: 'Kỹ thuật viết Custom Hook có bẫy phòng vệ (Defensive Guard) như "if (!context) throw new Error(...)" giải quyết vấn đề gì?',
    options: [
      { text: 'A. Tự động mã hóa mật khẩu người dùng trước khi gửi lên Backend.', isCorrect: false },
      { text: 'B. Báo lỗi chủ động (Fail Fast) với thông điệp rõ ràng khi ai đó gọi Hook ngoài Provider, tránh lỗi crash ngầm khó hiểu "Cannot read properties of null (reading map)".', isCorrect: true },
      { text: 'C. Tự động tạo bản sao lưu state vào window.localStorage.', isCorrect: false },
      { text: 'D. Ép buộc component con phải re-render 2 lần ở Strict Mode.', isCorrect: false },
    ],
    explanation:
      'Chính xác! Trong thực tế dự án nhiều người làm chung, một lập trình viên có thể vô tình gọi useTasks() ở một trang mà quên bọc <TasksProvider>. Nếu không có guard, context trả về null và gây lỗi crash khó debug ở tận component con. Cơ chế phòng vệ giúp phát hiện lỗi ngay tại dòng gọi Hook!',
  },
  {
    id: 3,
    question: 'Trong tình huống nào việc kết hợp useReducer + useContext là giải pháp TỐT HƠN việc cài đặt Redux Toolkit?',
    options: [
      { text: 'A. Khi bạn cần Time-travel Debugging xem lại lịch sử 50 actions đã qua.', isCorrect: false },
      { text: 'B. Khi bạn quản lý State cho từng cụm tính năng độc lập (như Giỏ hàng, Hộp thoại đa bước), muốn Zero-dependency và có thể tái sử dụng nhiều Provider độc lập ở nhiều trang mà không sợ xung đột Store toàn cục.', isCorrect: true },
      { text: 'C. Khi ứng dụng có hàng triệu người dùng trực tuyến cùng lúc.', isCorrect: false },
      { text: 'D. Khi dự án bắt buộc phải dùng RTK Query.', isCorrect: false },
    ],
    explanation:
      'Chính xác! Redux là Singleton toàn cục (Single Global Store). Còn Reducer + Context sống gắn liền với cây component (Subtree Scope). Bạn có thể bọc 2 thẻ <TasksProvider> ở 2 khu vực khác nhau để có 2 danh sách hoạt động độc lập mà không cần cấu hình key động phức tạp.',
  },
  {
    id: 4,
    question: 'Khi sử dụng thư viện useImmerReducer kết hợp với Context, nhận định nào sau đây là CHÍNH XÁC?',
    options: [
      { text: 'A. Immer thực sự làm thay đổi (đột biến bẩn) state gốc trong bộ nhớ RAM của React.', isCorrect: false },
      { text: 'B. Bạn có thể dùng các phương thức đột biến trực tiếp như draft.push(), draft.splice() hoặc gán draft[0].done = true; Immer sẽ dùng Proxy để tạo ra state mới bất biến 100% ở hậu trường!', isCorrect: true },
      { text: 'C. Phải gọi hàm dispatch(draft) ở cuối mỗi case trong reducer.', isCorrect: false },
      { text: 'D. useImmerReducer chỉ hoạt động trên trình duyệt Chrome.', isCorrect: false },
    ],
    explanation:
      'Chính xác! Immer cho phép bạn viết code theo tư duy đột biến quen thuộc (draft.push, draft[i] = ...), nhưng cơ chế Copy-on-Write thông qua JavaScript Proxy của Immer sẽ tạo ra một State hoàn toàn mới, giữ trọn vẹn nguyên tắc Bất biến (Immutability) của React.',
  },
];

export default function ScalingQuiz() {
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
          <span>🧠</span> Bài Lab 7: Thử Thách Trắc Nghiệm Mở Rộng State (Reducer + Context)
        </h2>
        <p className="lab-card-desc">
          Kiểm tra độ thấu hiểu sâu sắc về kiến trúc Tách Context, Stable Dispatch Identity, Custom Hooks Guard và Tư duy lựa chọn giải pháp quản lý State toàn cục.
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
              ? 'Tuyệt đỉnh! Bạn đã hoàn toàn làm chủ kiến trúc mở rộng State cấp độ Senior Frontend Engineer!'
              : 'Rất tốt! Hãy xem lại phần giải thích chi tiết bên dưới mỗi câu để củng cố nền tảng nhé.'}
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
                <span style={{ color: 'var(--accent-emerald)' }}>Câu {idx + 1}:</span>
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
                    optionStyle.border = '1px solid #10b981';
                    optionStyle.background = 'rgba(16, 185, 129, 0.15)';
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
                    title="Phân tích kiến trúc chuyên sâu:"
                  >
                    {q.explanation}
                  </InfoBox>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!showResult && (
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            className="btn btn-primary"
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
            disabled={!allAnswered}
            onClick={() => setShowResult(true)}
          >
            {allAnswered ? '🚀 Nộp Bài & Xem Điểm' : `Hãy chọn đáp án cho tất cả câu hỏi (${Object.keys(userAnswers).length}/${QUESTIONS.length})`}
          </button>
        </div>
      )}
    </div>
  );
}
