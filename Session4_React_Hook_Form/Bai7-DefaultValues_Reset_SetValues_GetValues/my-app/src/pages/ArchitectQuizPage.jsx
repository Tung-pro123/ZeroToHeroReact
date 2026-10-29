import React, { useState } from 'react';
import RenderCounter from '../components/common/RenderCounter';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Vai trò cốt lõi của defaultValues trong useForm ngoài việc hiển thị dữ liệu ban đầu là gì?',
    options: [
      { id: 'A', text: 'Giúp tự động mã hóa dữ liệu theo chuẩn AES-256.' },
      { id: 'B', text: 'Làm mốc xuất phát chuẩn (baseline) để RHF thực hiện dirty tracking (tính toán isDirty và dirtyFields).' },
      { id: 'C', text: 'Bắt buộc tất cả các input HTML phải chuyển thành uncontrolled components vĩnh viễn.' },
      { id: 'D', text: 'Tự động gửi HTTP GET request lên backend khi vừa mount component.' },
    ],
    correctAnswer: 'B',
    explanation: 'defaultValues thiết lập trạng thái gốc của form. Bất cứ khi nào giá trị hiện tại khác với defaultValues, isDirty sẽ là true. Nếu người dùng xóa và nhập lại trùng defaultValues, isDirty sẽ tự động trở về false.',
  },
  {
    id: 2,
    question: 'Khi nào ta nên sử dụng reset(newData) thay vì gọi setValue() liên tục cho từng trường?',
    options: [
      { id: 'A', text: 'Khi chỉ muốn sửa một trường duy nhất trên form.' },
      { id: 'B', text: 'Khi nhận được dữ liệu hoàn chỉnh từ API (như tải chi tiết sản phẩm cho Edit Form) và muốn bộ dữ liệu này trở thành baseline mặc định mới của form (đưa isDirty về false).' },
      { id: 'C', text: 'Khi muốn xóa sạch toàn bộ cookie và local storage của người dùng.' },
      { id: 'D', text: 'Khi muốn kích hoạt animation xoay nút submit.' },
    ],
    correctAnswer: 'B',
    explanation: 'setValue() mang ngữ nghĩa "thay đổi giá trị 1 field trong form hiện tại", còn reset(data) mang ngữ nghĩa "tái khởi tạo toàn bộ form với một bộ dữ liệu mới làm mốc chuẩn", rất phù hợp cho Edit Form.',
  },
  {
    id: 3,
    question: 'Trong hàm setValue(name, value, options), tùy chọn nào sau đây KHÔNG PHẢI là option chuẩn của RHF?',
    options: [
      { id: 'A', text: 'shouldValidate: kích hoạt kiểm tra validation cho trường đó.' },
      { id: 'B', text: 'shouldDirty: cập nhật cờ isDirty và dirtyFields.' },
      { id: 'C', text: 'shouldTouch: đánh dấu trường là đã được tương tác (touched).' },
      { id: 'D', text: 'shouldEncrypt: mã hóa dữ liệu thành chuỗi Base64.' },
    ],
    correctAnswer: 'D',
    explanation: 'RHF hỗ trợ 3 tùy chọn form state chính trong setValue: shouldValidate (chạy validation), shouldDirty (đánh dấu dirty), và shouldTouch (đánh dấu touched).',
  },
  {
    id: 4,
    question: 'Sự khác biệt bản chất giữa getValues() và watch() là gì?',
    options: [
      { id: 'A', text: 'getValues() đọc snapshot dữ liệu tại thời điểm gọi mà KHÔNG gây re-render; còn watch() là subscription lắng nghe thay đổi và tự động kích hoạt re-render để cập nhật UI thời gian thực.' },
      { id: 'B', text: 'getValues() chỉ dùng được trong thẻ <form>, còn watch() chỉ dùng trong useEffect.' },
      { id: 'C', text: 'getValues() tự động xóa giá trị của trường sau khi đọc.' },
      { id: 'D', text: 'Hai hàm này hoạt động hoàn toàn giống nhau, chỉ khác nhau về tên gọi.' },
    ],
    correctAnswer: 'A',
    explanation: 'getValues() là thao tác đọc ảnh chụp (snapshot) một lần, không đăng ký lắng nghe (zero re-render). Trong khi watch() đăng ký subscription, mỗi khi user gõ ký tự thì React sẽ re-render lại UI phụ thuộc.',
  },
  {
    id: 5,
    question: 'Vì sao trong hàm async onSubmit(data), chúng ta KHÔNG NÊN gọi reset() TRƯỚC KHI hoàn tất lời gọi API mạng?',
    options: [
      { id: 'A', text: 'Vì gọi reset() trước sẽ làm sập server backend.' },
      { id: 'B', text: 'Vì nếu lời gọi API mạng bị lỗi (500, 400 hoặc mất mạng), toàn bộ dữ liệu người dùng vừa nhập sẽ bị xóa trắng và họ phải gõ lại từ đầu, gây ức chế nghiêm trọng về mặt UX.' },
      { id: 'C', text: 'Vì React Hook Form sẽ ném ra lỗi Uncaught TypeError.' },
      { id: 'D', text: 'Vì trình duyệt sẽ tự động refresh trang web ngay lập tức.' },
    ],
    correctAnswer: 'B',
    explanation: 'Nguyên tắc vàng: Chỉ gọi reset() khi submit API đã thành công hoàn toàn (HTTP 200/201). Nếu thất bại, bắt buộc phải bảo lưu dữ liệu đã nhập trên form để người dùng sửa lại và thử lại.',
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
              Thử Thách Kiến Trúc: Bộ 4 API Điều Khiển Dữ Liệu Form Chủ Động
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Kiểm tra mức độ thành thạo về defaultValues baseline, semantics reset vs setValue, snapshot getValues và mô hình Create/Edit Form.
            </p>
          </div>
          <RenderCounter name="ArchitectQuizPage" />
        </div>
      </div>

      {/* Summary Banner when submitted */}
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
                {score >= 4 ? '🎉 Xuất Sắc! Bạn Đã Làm Chủ Toàn Bộ Các API Điều Khiển Form Của RHF' : '⚠️ Cần Ôn Tập Lại Các Khái Niệm Quan Trọng!'}
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
                <h4 style={{ fontSize: '1rem', fontWeight: '700', lineHeight: '1.5' }}>
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

              {/* Feedback */}
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

