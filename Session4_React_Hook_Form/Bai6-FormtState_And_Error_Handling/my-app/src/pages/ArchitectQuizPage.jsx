import React, { useState } from 'react';
import RenderCounter from '../components/common/RenderCounter';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Sự khác biệt bản chất giữa Form Data và Form State trong React Hook Form là gì?',
    options: [
      { id: 'A', text: 'Form Data là dữ liệu lấy từ API backend, còn Form State là dữ liệu nằm trong LocalStorage.' },
      { id: 'B', text: 'Form Data trả lời câu hỏi "User nhập cái gì?" (chứa giá trị các trường); còn Form State trả lời câu hỏi "Form hiện đang ở tình trạng nào?" (chứa metadata như errors, isDirty, dirtyFields, touchedFields, isValid, isSubmitting).' },
      { id: 'C', text: 'Cả hai là cùng một đối tượng giống nhau, chỉ khác nhau ở chỗ Form Data dùng cho thẻ <input> còn Form State dùng cho thẻ <button>.' },
      { id: 'D', text: 'Form State là cookie phiên làm việc do trình duyệt quản lý.' },
    ],
    correctAnswer: 'B',
    explanation: 'Form Data phản ánh nội dung dữ liệu domain mà user muốn gửi đi; trong khi formState là các cờ siêu dữ liệu (metadata flags) do RHF tính toán để phản ánh tình trạng tương tác của form.',
  },
  {
    id: 2,
    question: 'Giả sử form có defaultValues: { username: "tung" }. Người dùng gõ thêm thành "tung_dev", sau đó xóa đi để trở về đúng "tung". Lúc này isDirty có giá trị là gì?',
    options: [
      { id: 'A', text: 'Luôn luôn là true vì người dùng đã có hành vi tương tác bàn phím.' },
      { id: 'B', text: 'Là false, vì giá trị hiện tại của form đã trùng khớp trở lại với defaultValues ban đầu; RHF so sánh current values với defaultValues chứ không phải lịch sử thao tác.' },
      { id: 'C', text: 'Là undefined vì component bị reset state.' },
      { id: 'D', text: 'Là true nếu không dùng useCallback.' },
    ],
    correctAnswer: 'B',
    explanation: 'isDirty không phải cờ "đã từng gõ phím". Nó là phép so sánh sâu (deep comparison) giữa giá trị hiện tại của form với defaultValues được khởi tạo ban đầu.',
  },
  {
    id: 3,
    question: 'Điểm khác biệt cốt lõi giữa dirtyFields và touchedFields là gì?',
    options: [
      { id: 'A', text: 'dirtyFields ghi nhận các trường có giá trị khác defaultValues; còn touchedFields ghi nhận các trường người dùng đã từng focus rồi blur (rời khỏi), bất kể giá trị có bị sửa hay không.' },
      { id: 'B', text: 'dirtyFields theo dõi toàn form, còn touchedFields chỉ theo dõi trường password.' },
      { id: 'C', text: 'touchedFields chỉ hoạt động trên màn hình cảm ứng di động (touch screen).' },
      { id: 'D', text: 'Hai thuộc tính này hoàn toàn giống hệt nhau.' },
    ],
    correctAnswer: 'A',
    explanation: 'Ví dụ: Khi bạn click vào ô Email rồi lập tức click ra ngoài mà không gõ gì thì touchedFields.email = true (đã chạm rồi rời đi), nhưng dirtyFields.email = false (giá trị không hề đổi).',
  },
  {
    id: 4,
    question: 'Vòng đời (lifecycle) của thuộc tính isSubmitting diễn ra như thế nào?',
    options: [
      { id: 'A', text: 'Tự động là true khi form vừa render và chuyển false sau 3 giây.' },
      { id: 'B', text: 'Tự động chuyển sang true khi handleSubmit vượt qua validation và kích hoạt hàm async onSubmit; rồi tự động trở về false khi Promise đó được hoàn tất (settled).' },
      { id: 'C', text: 'Lập trình viên phải tự viết useState và gọi setIsSubmitting(true) bằng tay.' },
      { id: 'D', text: 'Chỉ hoạt động khi sử dụng thư viện Axios, không hoạt động với Fetch API.' },
    ],
    correctAnswer: 'B',
    explanation: 'RHF theo dõi trạng thái Promise do hàm submit callback trả về. Khi Promise ở trạng thái pending, isSubmitting = true. Khi resolved hoặc rejected, isSubmitting = false.',
  },
  {
    id: 5,
    question: 'Trong form Edit Profile chuẩn doanh nghiệp, điều kiện tối ưu nhất để vô hiệu hóa (disable) nút "Lưu thay đổi" là gì?',
    options: [
      { id: 'A', text: 'disabled={!isDirty}' },
      { id: 'B', text: 'disabled={!isDirty || !isValid || isSubmitting}' },
      { id: 'C', text: 'disabled={Object.keys(errors).length > 0}' },
      { id: 'D', text: 'disabled={!touchedFields}' },
    ],
    correctAnswer: 'B',
    explanation: 'Kết hợp 3 yếu tố: !isDirty (ngăn gửi request vô nghĩa khi chưa sửa gì), !isValid (ngăn submit dữ liệu sai luật), và isSubmitting (ngăn chặn tình trạng double-submit khi mạng chậm).',
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
              Thử Thách Kiến Trúc: formState &amp; Error Handling Masterclass
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Kiểm tra khả năng phân biệt Form Data vs Form State, cơ chế so sánh isDirty, sự khác nhau giữa dirtyFields và touchedFields, và lifecycle isSubmitting.
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
                {score >= 4 ? '🎉 Xuất Sắc! Bạn Đã Làm Chủ Hoàn Toàn formState Của RHF' : '⚠️ Cần Ôn Tập Lại Các Khái Niệm formState Quan Trọng!'}
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

