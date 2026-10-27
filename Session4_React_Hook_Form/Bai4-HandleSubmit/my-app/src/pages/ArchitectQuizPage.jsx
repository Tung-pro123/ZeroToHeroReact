import React, { useState } from 'react';
import RenderCounter from '../components/common/RenderCounter';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Sự khác biệt cốt lõi giữa handleSubmit và onSubmit trong cú pháp <form onSubmit={handleSubmit(onSubmit)}> là gì?',
    options: [
      { id: 'A', text: 'handleSubmit là hàm do lập trình viên tự viết để gọi API; onSubmit là hook được RHF xuất ra.' },
      { id: 'B', text: 'handleSubmit là API của RHF đóng vai trò Higher-Order Function tạo submit handler; onSubmit là callback nghiệp vụ của bạn nhận data đã qua thẩm định.' },
      { id: 'C', text: 'Cả hai hàm đều là API của React Hook Form, khác nhau ở chỗ handleSubmit chạy trước còn onSubmit chạy sau.' },
      { id: 'D', text: 'onSubmit là thuộc tính của thẻ form HTML; handleSubmit là phương thức mặc định của đối tượng window.document.' },
    ],
    correctAnswer: 'B',
    explanation: 'handleSubmit do useForm() cung cấp, đứng ở giữa nhận submit event từ trình duyệt, ngăn reload trang, validate dữ liệu, rồi mới chuyển giao data sạch cho callback onSubmit do bạn tự đặt tên.',
  },
  {
    id: 2,
    question: 'Khi component render lần đầu, biểu thức onSubmit={handleSubmit(onSubmit)} có gửi form hoặc gọi API ngay lập tức không? Tại sao?',
    options: [
      { id: 'A', text: 'Có, vì có cặp dấu ngoặc () nên hàm được thực thi ngay lập tức lúc render và gọi thẳng vào backend.' },
      { id: 'B', text: 'Không, vì handleSubmit(onSubmit) được gọi lúc render để TRẢ VỀ một hàm event handler mới; hàm này chỉ được React kích hoạt khi người dùng thực sự bấm Submit.' },
      { id: 'C', text: 'Có, nếu component không được bọc bởi React.memo thì form sẽ tự submit ngay khi mount.' },
      { id: 'D', text: 'Không, vì RHF có cơ chế hoãn lại (defer) bằng setTimeout 5000ms.' },
    ],
    correctAnswer: 'B',
    explanation: 'Đây là bản chất Higher-Order Function (Function Factory). Lúc render, handleSubmit(onSubmit) chạy và trả về function submitHandler(event). React giữ function đó và chỉ kích hoạt nó khi sự kiện Submit thực sự xảy ra.',
  },
  {
    id: 3,
    question: 'Đoạn mã sau mắc phải sai lầm nghiêm trọng nào:\nfunction submitForm(event) {\n  handleSubmit(onSubmit);\n}\n<form onSubmit={submitForm}>...</form>',
    options: [
      { id: 'A', text: 'Không có lỗi, đây là cách viết chuẩn để gom nhóm nhiều thao tác trước khi submit.' },
      { id: 'B', text: 'handleSubmit(onSubmit) trả về một hàm xử lý nhưng không hề được gọi (bị vứt bỏ vào hư vô), khiến onSubmit không bao giờ được kích hoạt!' },
      { id: 'C', text: 'Làm trình duyệt bị crash bộ nhớ vì tạo quá nhiều biến closure không được dọn dẹp.' },
      { id: 'D', text: 'Lỗi React Hook Rule vì useForm không được phép gọi lồng bên trong function.' },
    ],
    correctAnswer: 'B',
    explanation: 'Giống như việc bạn gọi một hàm factory createHandler() tạo ra một đối tượng xử lý, nhưng sau đó không gọi handler(event) mà kết thúc hàm luôn. Trừ khi bạn viết handleSubmit(onSubmit)(event), còn không handler đó sẽ bị vứt đi!',
  },
  {
    id: 4,
    question: 'Khi form có ít nhất một trường vi phạm validation (ví dụ bỏ trống email bắt buộc), handleSubmit(onValid, onInvalid) sẽ hành xử như thế nào?',
    options: [
      { id: 'A', text: 'Vẫn gọi onValid(data) nhưng truyền data = null.' },
      { id: 'B', text: 'Ngắt flow, tuyệt đối KHÔNG gọi onValid(data), cập nhật bảng errors và gọi onInvalid(errors) nếu có khai báo.' },
      { id: 'C', text: 'Tự động reload toàn bộ trang web và xóa sạch form của người dùng.' },
      { id: 'D', text: 'Ném ra một Unhandled Promise Rejection làm màn hình trắng (White Screen of Death).' },
    ],
    correctAnswer: 'B',
    explanation: 'handleSubmit bảo vệ chặt chẽ callback nghiệp vụ: chỉ khi form 100% hợp lệ thì onValid mới được gọi. Khi có lỗi, flow rẽ sang nhánh cập nhật formState.errors và gọi onInvalid.',
  },
  {
    id: 5,
    question: 'Trong kiến trúc fullstack chuẩn mực giữa React Client và Spring Boot REST Backend, API POST request nên được đặt ở đâu?',
    options: [
      { id: 'A', text: 'Đặt trong useEffect với dependency là các biến state của form.' },
      { id: 'B', text: 'Đặt trong thân hàm async onSubmit(data) - đây là Event Handler đáp ứng hành động cụ thể của người dùng.' },
      { id: 'C', text: 'Đặt trong file cấu hình vite.config.js để server tự động proxy.' },
      { id: 'D', text: 'Sửa trực tiếp mã nguồn trong node_modules/react-hook-form.' },
    ],
    correctAnswer: 'B',
    explanation: 'Theo nguyên lý vàng của React: "Hành động cụ thể do người dùng kích hoạt (như click submit) PHẢI nằm trong Event Handler, tuyệt đối không lạm dụng useEffect".',
  },
];

export default function ArchitectQuizPage() {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (questionId, optionId) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = QUIZ_QUESTIONS.every((q) => userAnswers[q.id] !== undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Quiz Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-indigo">KNOWLEDGE CHECK</span>
              <span className="badge badge-emerald">5 SENIOR ARCHITECT QUESTIONS</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Thử Thách Kiến Trúc handleSubmit() &amp; Submission Pipeline
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Đánh giá mức độ thấu hiểu sâu sắc về Higher-Order Functions, Event Delegation, Validation Gatekeeper và tương tác API Backend.
            </p>
          </div>
          <RenderCounter name="ArchitectQuizPage" />
        </div>
      </div>

      {/* Quiz Score Summary Banner if submitted */}
      {isSubmitted && (
        <div
          className="card"
          style={{
            background: score >= 4 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
            borderColor: score >= 4 ? 'var(--accent-emerald)' : 'var(--accent-rose)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: score >= 4 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                {score >= 4 ? '🎉 Xuất Sắc! Bạn Đã Làm Chủ Hoàn Toàn handleSubmit()' : '⚠️ Cần Ôn Tập Lại Một Số Khái Niệm Quan Trọng!'}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Bạn đạt <strong>{score} / {QUIZ_QUESTIONS.length}</strong> điểm ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%).
              </p>
            </div>
            <button type="button" className="btn btn-outline" onClick={handleResetQuiz}>
              🔄 Làm Lại Bài Test
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div>
        {QUIZ_QUESTIONS.map((q, index) => {
          const selectedOption = userAnswers[q.id];
          const isCorrect = selectedOption === q.correctAnswer;

          return (
            <div key={q.id} className="quiz-question-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                  <span style={{ color: 'var(--primary-light)', marginRight: '0.5rem' }}>Câu {index + 1}:</span>
                  {q.question}
                </h4>
                {isSubmitted && (
                  <span className={`badge ${isCorrect ? 'badge-emerald' : 'badge-rose'}`}>
                    {isCorrect ? 'ĐÚNG (+1)' : 'SAI (0)'}
                  </span>
                )}
              </div>

              {/* Options */}
              <div style={{ marginTop: '1rem' }}>
                {q.options.map((opt) => {
                  let optionClass = 'quiz-option';
                  if (selectedOption === opt.id) {
                    optionClass += ' selected';
                  }
                  if (isSubmitted) {
                    if (opt.id === q.correctAnswer) {
                      optionClass += ' correct';
                    } else if (selectedOption === opt.id && !isCorrect) {
                      optionClass += ' wrong';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={optionClass}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      disabled={isSubmitted}
                    >
                      <strong style={{ marginRight: '0.5rem', fontFamily: 'var(--font-mono)' }}>{opt.id}.</strong>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation when submitted */}
              {isSubmitted && (
                <div className={`quiz-feedback ${isCorrect ? 'success' : 'error'}`}>
                  <strong>💡 Phân tích chi tiết:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!isSubmitted && (
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Đã hoàn thành:{' '}
              <strong style={{ color: 'var(--text-primary)' }}>
                {Object.keys(userAnswers).length} / {QUIZ_QUESTIONS.length}
              </strong>{' '}
              câu hỏi
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            disabled={!allAnswered}
            onClick={() => setIsSubmitted(true)}
            style={{ padding: '0.75rem 2rem' }}
          >
            <span>🏁</span> Nộp Bài &amp; Xem Kết Quả
          </button>
        </div>
      )}
    </div>
  );
}

