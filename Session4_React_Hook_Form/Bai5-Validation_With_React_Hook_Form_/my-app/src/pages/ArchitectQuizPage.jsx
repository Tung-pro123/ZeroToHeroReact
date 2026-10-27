import React, { useState } from 'react';
import RenderCounter from '../components/common/RenderCounter';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Validation rules của React Hook Form được khai báo và liên kết với input ở vị trí nào trong mã nguồn?',
    options: [
      { id: 'A', text: 'Khai báo tập trung trong options của useForm({ rules: { ... } }).' },
      { id: 'B', text: 'Ở đối số thứ hai của hàm register("fieldName", { ...rules }).' },
      { id: 'C', text: 'Truyền thông qua thuộc tính validationRules={...} trên thẻ HTML <form>.' },
      { id: 'D', text: 'Định nghĩa trong file CSS thông qua thuộc tính @rule constraint.' },
    ],
    correctAnswer: 'B',
    explanation: 'Hàm register("fieldName", rulesObject) nhận đối số thứ nhất là tên trường và đối số thứ hai là object chứa toàn bộ các luật kiểm tra (required, minLength, pattern, validate...).',
  },
  {
    id: 2,
    question: 'Khi muốn thiết lập cả ngưỡng giá trị và thông báo lỗi tùy biến (custom error message) cho rule minLength, cú pháp nào sau đây là chuẩn mực của RHF?',
    options: [
      { id: 'A', text: 'minLength: 8, message: "Mật khẩu phải từ 8 ký tự"' },
      { id: 'B', text: 'minLength: { value: 8, message: "Mật khẩu phải từ 8 ký tự" }' },
      { id: 'C', text: 'minLength: [8, "Mật khẩu phải từ 8 ký tự"]' },
      { id: 'D', text: 'minLength: "8: Mật khẩu phải từ 8 ký tự"' },
    ],
    correctAnswer: 'B',
    explanation: 'Đối với các rule có ngưỡng giá trị (minLength, maxLength, min, max, pattern), RHF chuẩn hóa cấu trúc object { value: <ngưỡng>, message: <thông_báo_lỗi> }.',
  },
  {
    id: 3,
    question: 'Vì sao khi làm việc với trường số (ví dụ trường tuổi age), chúng ta nên bổ sung tùy chọn valueAsNumber: true vào register?',
    options: [
      { id: 'A', text: 'Vì nếu không có nó thì trình duyệt sẽ khóa bàn phím không cho người dùng gõ số.' },
      { id: 'B', text: 'Vì DOM HTML mặc định luôn trả về chuỗi String (ví dụ "25"); valueAsNumber: true giúp RHF trích xuất giá trị dưới dạng Number JavaScript nguyên bản cho việc so sánh min/max và đóng gói payload.' },
      { id: 'C', text: 'Để tự động làm tròn số thực thành số nguyên.' },
      { id: 'D', text: 'Để mã hóa dữ liệu số học bảo vệ chống tấn công SQL Injection.' },
    ],
    correctAnswer: 'B',
    explanation: '<input type="number" /> trong HTML vẫn trả về chuỗi String ("25"). Tùy chọn valueAsNumber: true kích hoạt DOM property valueAsNumber, đảm bảo payload có kiểu number (25) sạch sẽ.',
  },
  {
    id: 4,
    question: 'Khi hàm custom validate: (value) => ... được kích hoạt, giá trị trả về như thế nào sẽ được RHF xác định là HỢP LỆ (PASS)?',
    options: [
      { id: 'A', text: 'Bắt buộc phải trả về số 1 hoặc chuỗi rỗng "".' },
      { id: 'B', text: 'Trả về boolean true. Nếu trả về false hoặc một chuỗi String (ví dụ "Tên bị cấm"), RHF sẽ coi là vi phạm và dùng chính chuỗi đó làm thông báo lỗi.' },
      { id: 'C', text: 'Bắt buộc phải trả về null.' },
      { id: 'D', text: 'Trả về object { status: "OK" }.' },
    ],
    correctAnswer: 'B',
    explanation: 'Hàm validate cho phép return true khi hợp lệ; hoặc return "Error Message" khi không hợp lệ (thường dùng toán tử: value !== "admin" || "Username cannot be admin").',
  },
  {
    id: 5,
    question: 'Sự khác biệt cơ bản về trải nghiệm người dùng (UX) giữa mode: "onSubmit" và mode: "onBlur" trong cấu hình useForm là gì?',
    options: [
      { id: 'A', text: 'mode: "onSubmit" không bao giờ hiển thị lỗi; mode: "onBlur" hiển thị lỗi ngay khi vừa mount component.' },
      { id: 'B', text: 'mode: "onSubmit" thẩm định lazy, không làm phiền người dùng khi đang nhập và chỉ báo lỗi khi bấm Submit; còn mode: "onBlur" thẩm định và hiện lỗi ngay khi người dùng rời con trỏ khỏi trường đó.' },
      { id: 'C', text: 'mode: "onBlur" chỉ hoạt động trên thiết bị di động.' },
      { id: 'D', text: 'Hai mode này hoạt động hoàn toàn giống nhau, chỉ khác nhau về quy ước tên gọi.' },
    ],
    correctAnswer: 'B',
    explanation: 'mode: "onSubmit" (mặc định) giúp form không bị nhấp nháy lỗi khi user vừa mở ô; trong khi mode: "onBlur" hỗ trợ phản hồi sớm ngay khi user rời từng ô, rất lý tưởng cho form dài.',
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
              <span className="badge badge-blue">KNOWLEDGE CHECK</span>
              <span className="badge badge-emerald">5 SENIOR ARCHITECT QUESTIONS</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Thử Thách Kiến Trúc: Bộ Máy Validation Của React Hook Form
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Kiểm tra mức độ thành thạo về Built-in rules, valueAsNumber, Custom validate function và Validation Modes.
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
                {score >= 4 ? '🎉 Xuất Sắc! Bạn Đã Nắm Rất Vững Bộ Máy Validation Của RHF' : '⚠️ Cần Ôn Tập Lại Các Quy Tắc Thẩm Định!'}
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

      {/* Questions */}
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
              Đã trả lời:{' '}
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

