import React, { useState } from 'react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Khi nào bạn BẮT BUỘC phải sử dụng <Controller /> thay vì register()?',
    options: [
      'Bất cứ khi nào bạn tự viết một Custom React Component.',
      'Khi làm việc với các controlled component bên thứ 3 (như MUI, Ant Design, React-Select) hoặc custom component không nhận API native (name, onChange, onBlur, ref) mà cần mapping prop riêng.',
      'Khi form có nhiều hơn 5 trường nhập liệu.',
      'Khi cần validate dữ liệu bằng Regex.'
    ],
    correctIndex: 1,
    explanation:
      'Controller đóng vai trò là một Adapter. Nó sinh ra để kết nối RHF với các controlled/custom components không thể spread trực tiếp {...register()} do khác biệt về tên prop (ví dụ: rating, onRatingChange, checked) hoặc kiểu dữ liệu trả về.'
  },
  {
    id: 2,
    question: 'Nếu component <MyInput /> sử dụng React.forwardRef và forward toàn bộ props xuống thẻ <input {...props} ref={ref} />, bạn có cần dùng Controller không?',
    options: [
      'Bắt buộc phải dùng Controller vì nó là component do người dùng tự định nghĩa.',
      'Không cần thiết. Vì component forward đúng ref và các sự kiện native, bạn hoàn toàn có thể dùng <MyInput {...register("email")} /> một cách tự nhiên và gọn gàng.',
      'Chỉ được dùng nếu component bọc trong Redux hoặc Context.',
      'React Hook Form sẽ báo lỗi crash ứng dụng nếu không bọc Controller.'
    ],
    correctIndex: 1,
    explanation:
      'Custom Component ≠ Bắt buộc dùng Controller. Miễn là component tuân thủ cơ chế forwardRef và spread props xuống native element, register() vẫn hoạt động hoàn hảo và mang lại hiệu năng cao nhất.'
  },
  {
    id: 3,
    question: 'Trong hàm render của Controller: render={({ field, fieldState }) => ...}, sự khác biệt bản chất giữa field và fieldState là gì?',
    options: [
      'field chứa lỗi validation, fieldState chứa giá trị chuỗi.',
      'field là DỮ LIỆU & HÀM KẾT NỐI (value, onChange, onBlur, ref), còn fieldState là METADATA mô tả trạng thái (error, isDirty, isTouched, invalid).',
      'field chỉ hoạt động với text input, fieldState chỉ hoạt động với checkbox.',
      'Hai biến này hoàn toàn đồng nhất và có thể thay thế cho nhau.'
    ],
    correctIndex: 1,
    explanation:
      'field đóng vai trò cầu nối dữ liệu hai chiều giữa RHF và UI component. Trong khi đó, fieldState cung cấp các cờ trạng thái (metadata) như error để render thông báo lỗi hoặc đổi màu viền input.'
  },
  {
    id: 4,
    question: 'Đoạn mã nào sau đây là Anti-Pattern nghiêm trọng (Double Registration)?',
    options: [
      '<input {...register("email")} />',
      '<Controller name="email" control={control} render={({ field }) => <input {...field} {...register("email")} />} />',
      '<Controller name="rating" control={control} render={({ field }) => <Rating rating={field.value} onRatingChange={field.onChange} />} />',
      '<CustomSwitch checked={field.value} onToggle={field.onChange} />'
    ],
    correctIndex: 1,
    explanation:
      'Việc vừa truyền {...field} vừa gọi {...register("email")} lên cùng một thẻ input là lỗi đăng ký 2 lần cho cùng một trường, dẫn đến xung đột sự kiện onChange, mất đồng bộ và lỗi khó debug.'
  },
  {
    id: 5,
    question: 'Nếu bạn viết <Rating rating={field.value} /> trong Controller nhưng quên truyền onRatingChange={field.onChange}, điều gì sẽ xảy ra?',
    options: [
      'Trình duyệt báo lỗi Fatal Error và đóng ứng dụng.',
      'Bị đứt luồng Component ➔ RHF: Người dùng click chọn sao trên UI nhưng RHF Form không hề nhận được dữ liệu mới, form values vẫn giữ nguyên giá trị cũ.',
      'RHF sẽ tự động lắng nghe DOM click để suy luận giá trị.',
      'Form tự động submit ngay lập tức.'
    ],
    correctIndex: 1,
    explanation:
      'Controller là dòng chảy hai chiều (2-Way Data Flow). field.value truyền dữ liệu từ RHF xuống component; field.onChange báo dữ liệu từ component ngược về RHF. Thiếu field.onChange thì chiều ngược lại bị ngắt hoàn toàn!'
  }
];

export default function ArchitectQuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId, optionIndex) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="quiz-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>🎓</span> Senior Architect Certification Quiz: Controller & Adapter Pattern
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '0.25rem' }}>
              Kiểm tra kiến thức kiến trúc tích hợp Controlled Components, 2-Way Flow và tránh các lỗi phổ biến trong dự án thực tế.
            </p>
          </div>
          <span className="badge badge-purple">5 Câu Hỏi Chuyên Sâu</span>
        </div>

        {/* Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#090d16', padding: '1rem', borderRadius: '10px', border: '1px solid #334155', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Tiến độ: </span>
            <strong style={{ color: answeredCount === 5 ? '#10b981' : '#38bdf8' }}>
              {answeredCount} / 5 câu
            </strong>
          </div>

          {showResults && (
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: score >= 4 ? '#34d399' : '#f59e0b' }}>
                🎉 Điểm số của bạn: {score} / 5 ({Math.round((score / 5) * 100)}%)
              </span>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                {score === 5 ? '— Kiến Trúc Sư Master Controller!' : score >= 3 ? '— Đạt Tiêu Chuẩn Nắm Vững!' : '— Cần Xem Lại Lab 1-3!'}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!showResults ? (
              <button
                type="button"
                className="btn btn-primary"
                disabled={answeredCount < 5}
                onClick={() => setShowResults(true)}
              >
                <span>Nộp Bài & Chấm Điểm</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
              >
                <span>🔄 Làm Lại Bài Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Questions list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {QUIZ_QUESTIONS.map((q, idx) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                style={{
                  background: '#090d16',
                  padding: '1.25rem',
                  borderRadius: '10px',
                  border: '1px solid #334155'
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>Câu {idx + 1}:</span>
                  <span style={{ color: '#f8fafc', fontWeight: 600 }}>{q.question}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map((opt, optIdx) => {
                    let optionClass = 'quiz-option';
                    if (userAnswer === optIdx) {
                      optionClass += ' selected';
                    }
                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionClass += ' correct';
                      } else if (userAnswer === optIdx && !isCorrect) {
                        optionClass += ' incorrect';
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        className={optionClass}
                        onClick={() => handleSelect(q.id, optIdx)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#94a3b8' }}>
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {showResults && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      borderLeft: `4px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: isCorrect ? '#34d399' : '#f87171', marginBottom: '0.2rem' }}>
                      {isCorrect ? '✅ Chính xác!' : '❌ Chưa chính xác!'}
                    </div>
                    <div style={{ color: '#cbd5e1' }}>{q.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

