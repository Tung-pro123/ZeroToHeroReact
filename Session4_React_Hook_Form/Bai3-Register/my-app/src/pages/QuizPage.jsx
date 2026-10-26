import React, { useState } from 'react';

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      title: 'Câu 1: Giá trị trả về của register()',
      question: 'Khi gọi `register("email")`, hàm này trả về kiểu dữ liệu gì?',
      options: [
        { id: 'A', text: 'Một chuỗi string "email"' },
        { id: 'B', text: 'Một object chứa các properties và handlers: { name, onChange, onBlur, ref }' },
        { id: 'C', text: 'Một mảng tuple [value, setValue]' },
        { id: 'D', text: 'Một HTMLInputElement DOM Node' },
      ],
      correctAnswer: 'B',
      explanation: 'register("email") trả về một JavaScript Object chứa 4 thuộc tính cốt tử: name, onChange, onBlur, và ref để kết nối input với hệ thống quản lý form của RHF.',
    },
    {
      id: 2,
      title: 'Câu 2: Bản chất của cú pháp spread (...) trong JSX',
      question: 'Dấu ba chấm `...` trong dòng `<input {...register("email")} />` có bản chất là gì?',
      options: [
        { id: 'A', text: 'Là cú pháp đặc biệt do React Hook Form sáng chế ra' },
        { id: 'B', text: 'Là toán tử JavaScript Spread Syntax giúp trải các thuộc tính của object (name, onChange, onBlur, ref) thành props của thẻ input' },
        { id: 'C', text: 'Là ký hiệu bắt buộc của TypeScript để ép kiểu string' },
        { id: 'D', text: 'Là cú pháp của thư viện Babel để biên dịch JSX sang HTML' },
      ],
      correctAnswer: 'B',
      explanation: 'Spread operator (...) là tính năng chuẩn của JavaScript ES6/JSX. Nó giải phóng lập trình viên khỏi việc phải gõ thủ công từng prop: name={...} onChange={...} onBlur={...} ref={...}.',
    },
    {
      id: 3,
      title: 'Câu 3: Xử lý kiểu số trong HTML input type="number"',
      question: 'Tại sao thẻ `<input type="number" {...register("age")} />` mặc định lại trả về chuỗi `"20"` thay vì số `20`, và xử lý thế nào?',
      options: [
        { id: 'A', text: 'Do React Hook Form bị lỗi' },
        { id: 'B', text: 'Do bản chất trình duyệt DOM luôn lưu giá trị input.value dưới dạng chuỗi (String); cần dùng option { valueAsNumber: true } để RHF tự ép kiểu sang Number' },
        { id: 'C', text: 'Phải đổi type="number" thành type="digit"' },
        { id: 'D', text: 'Phải cài đặt thư viện Zod thì mới có kiểu số' },
      ],
      correctAnswer: 'B',
      explanation: 'Theo chuẩn Web API của trình duyệt, thuộc tính value của HTMLInputElement luôn luôn là chuỗi ký tự. Để RHF tự động chuyển đổi sang số nguyên/thực, ta truyền option register("age", { valueAsNumber: true }).',
    },
    {
      id: 4,
      title: 'Câu 4: Cạm bẫy ghi đè props (Override Trap)',
      question: 'Điều gì xảy ra nếu bạn viết: `<input {...register("email")} onChange={(e) => myCustomFn(e)} />`?',
      options: [
        { id: 'A', text: 'Cả hai hàm onChange đều chạy bình thường' },
        { id: 'B', text: 'Trình duyệt báo lỗi Syntax Error' },
        { id: 'C', text: 'myCustomFn sẽ ghi đè và làm mất handler onChange của RHF, khiến RHF không nhận được dữ liệu khi người dùng gõ' },
        { id: 'D', text: 'React Hook Form sẽ ưu tiên chạy trước rồi tự động gọi myCustomFn' },
      ],
      correctAnswer: 'C',
      explanation: 'JSX áp dụng props theo thứ tự từ trái sang phải. Do onChange tùy chỉnh đặt sau {...register}, nó ghi đè hoàn toàn thuộc tính onChange của RHF. Muốn chạy cả hai, ta phải gọi registerObj.onChange(e) bên trong myCustomFn.',
    },
    {
      id: 5,
      title: 'Câu 5: Cấu trúc Nested Data Path',
      question: 'Khi sử dụng `register("address.city")`, dữ liệu trả về trong callback onSubmit(data) sẽ có cấu trúc như thế nào?',
      options: [
        { id: 'A', text: '{ "address.city": "Hà Nội" } (key chứa dấu chấm)' },
        { id: 'B', text: '{ address: { city: "Hà Nội" } } (object lồng nhau sâu)' },
        { id: 'C', text: 'RHF báo lỗi vì tên trường không được chứa dấu chấm' },
        { id: 'D', text: 'Một mảng ["address", "city"]' },
      ],
      correctAnswer: 'B',
      explanation: 'Dấu chấm trong field name được RHF phân giải như một đường dẫn truy cập thuộc tính (Property Path). Vì vậy register("address.city") tự động cấu trúc dữ liệu thành object lồng nhau { address: { city: "..." } } rất tiện lợi khi gửi lên Backend.',
    },
  ];

  const handleSelectOption = (questionId, optionId) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId,
    });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #f59e0b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 className="card-title">
              <span>📝</span> Sát Hạch Kiến Thức: register() & Cú Pháp Spread
            </h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>
              5 câu hỏi phỏng vấn Senior Frontend Engineer sát hạch mức độ am hiểu cơ chế cốt lõi của hàm register().
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="btn btn-primary"
                style={{ opacity: Object.keys(selectedAnswers).length < questions.length ? 0.5 : 1 }}
              >
                Nộp bài sát hạch 🚀
              </button>
            ) : (
              <button onClick={handleReset} className="btn btn-secondary">
                🔄 Làm lại bài kiểm tra
              </button>
            )}
          </div>
        </div>

        {/* Score banner */}
        {submitted && (
          <div style={{ background: score >= 4 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)', border: `1px solid ${score >= 4 ? '#10b981' : '#f43f5e'}`, padding: '1.25rem', borderRadius: '12px', marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ color: score >= 4 ? '#34d399' : '#fb7185', fontSize: '1.25rem', fontWeight: 800 }}>
                {score >= 4 ? '🎉 XUẤT SẮC! BẠN ĐÃ THẤU SUỐT HÀM register() VÀ CÚ PHÁP SPREAD!' : '📚 BẠN CẦN ÔN LẠI MỘT VÀI ĐIỂM CỐT LÕI'}
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                Điểm số đạt được: <strong>{score} / {questions.length}</strong> câu chính xác ({Math.round((score / questions.length) * 100)}%)
              </p>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {score >= 4 ? 'Senior Level Pass' : 'Review Needed'}
            </span>
          </div>
        )}

        {/* Questions list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {questions.map((q) => {
            const isUserAnswer = selectedAnswers[q.id];
            const isCorrect = isUserAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: submitted
                    ? isCorrect
                      ? '1px solid #10b981'
                      : '1px solid #f43f5e'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.9rem' }}>
                    {q.title}
                  </span>
                  {submitted && (
                    <span className={`badge ${isCorrect ? 'badge-emerald' : 'badge-amber'}`}>
                      {isCorrect ? '✓ Đúng' : '✗ Sai'}
                    </span>
                  )}
                </div>

                <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: 600, marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {q.question}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {q.options.map((opt) => {
                    let optionClass = 'quiz-option';
                    if (isUserAnswer === opt.id) optionClass += ' selected';
                    if (submitted) {
                      if (opt.id === q.correctAnswer) optionClass += ' correct';
                      else if (isUserAnswer === opt.id && !isCorrect) optionClass += ' incorrect';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={optionClass}
                      >
                        <strong>{opt.id}.</strong> {opt.text}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div style={{ marginTop: '1rem', padding: '0.85rem 1rem', background: 'rgba(56, 189, 248, 0.08)', borderRadius: '8px', borderLeft: '3px solid #38bdf8', fontSize: '0.88rem', color: '#cbd5e1' }}>
                    <strong style={{ color: '#38bdf8' }}>💡 Phân tích chuyên sâu:</strong> {q.explanation}
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
