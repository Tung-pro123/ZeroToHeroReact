import React, { useState } from 'react';

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      title: 'Câu 1: Bản chất của thẻ Input trong React & DOM',
      question: 'Trong React, một thẻ `<input name="username" />` thông thường có bắt buộc phải gắn với `useState` thì người dùng mới gõ được chữ vào không?',
      options: [
        { id: 'A', text: 'Bắt buộc, vì nếu không có useState thì React sẽ không cho phép DOM nhận sự kiện bàn phím' },
        { id: 'B', text: 'Không bắt buộc, bản thân phần tử DOM của trình duyệt vốn đã có khả năng tự lưu giữ và quản lý input.value' },
        { id: 'C', text: 'Bắt buộc phải có Redux hoặc React Hook Form thì mới nhập được' },
        { id: 'D', text: 'Chỉ bắt buộc đối với thẻ input type="password"' },
      ],
      correctAnswer: 'B',
      explanation: 'Browser DOM luôn tự động lưu giữ và cập nhật thuộc tính value của thẻ input. Trong React, việc gắn useState là do lập trình viên muốn React đồng bộ hóa trạng thái đó vào Virtual DOM, chứ DOM không bắt buộc phải có state mới gõ được.',
    },
    {
      id: 2,
      title: 'Câu 2: Định nghĩa chính xác về Controlled Component',
      question: 'Phát biểu nào sau đây mô tả đúng nhất bản chất của một Controlled Input trong React?',
      options: [
        { id: 'A', text: 'Là input có gắn thuộc tính disabled={true}' },
        { id: 'B', text: 'Là input có giá trị (value) được điều khiển trực tiếp bởi React State (Single Source of Truth)' },
        { id: 'C', text: 'Là input được quản lý bởi thẻ form có gắn e.preventDefault()' },
        { id: 'D', text: 'Là input chỉ nhận dữ liệu từ LocalStorage' },
      ],
      correctAnswer: 'B',
      explanation: 'Controlled component = giá trị hiển thị của phần tử form được kiểm soát và cung cấp bởi React state thông qua prop `value`, và cập nhật thông qua event handler `onChange`.',
    },
    {
      id: 3,
      title: 'Câu 3: Nguyên nhân gây Re-render trong Controlled Input',
      question: 'Tại sao khi gõ một ký tự vào Controlled Input, toàn bộ Component cha lại bị re-render lại từ đầu?',
      options: [
        { id: 'A', text: 'Vì bàn phím gửi xung điện làm reload lại trang' },
        { id: 'B', text: 'Vì sự kiện onChange gọi setState, và việc cập nhật state sẽ kích hoạt chu trình Re-render của React' },
        { id: 'C', text: 'Vì thẻ input tự động kích hoạt useEffect' },
        { id: 'D', text: 'Vì React Router phát hiện sự thay đổi URL' },
      ],
      correctAnswer: 'B',
      explanation: 'Luồng hoạt động: Keystroke -> onChange event -> setState() -> React xếp lịch cập nhật -> Component re-render -> Virtual DOM tính toán -> Paint lại UI.',
    },
    {
      id: 4,
      title: 'Câu 4: Cơ chế hoạt động của Uncontrolled Component',
      question: 'Uncontrolled Component trong React hoạt động dựa trên cơ chế nào để không gây re-render khi gõ phím?',
      options: [
        { id: 'A', text: 'Để DOM tự lưu giữ dữ liệu và dùng useRef để truy cập trực tiếp node DOM (ref.current.value) khi cần submit' },
        { id: 'B', text: 'Sử dụng Web Worker chạy ở background' },
        { id: 'C', text: 'Dùng CSS display: none để ẩn input' },
        { id: 'D', text: 'Dùng WebSocket kết nối trực tiếp với Database' },
      ],
      correctAnswer: 'A',
      explanation: 'Uncontrolled component để DOM tự quản lý trạng thái nhập liệu. Bằng cách gắn ref={inputRef}, ta có thể đọc inputRef.current.value tại thời điểm submit mà hoàn toàn không cần kích hoạt bất kỳ lần re-render nào khi người dùng đang gõ.',
    },
    {
      id: 5,
      title: 'Câu 5: Ranh giới kiến trúc giữa React Hook Form & Zod',
      question: 'Khẳng định nào sau đây là ĐÚNG về mối quan hệ giữa React Hook Form (RHF) và Zod?',
      options: [
        { id: 'A', text: 'RHF và Zod là cùng một thư viện do một tác giả viết và bắt buộc phải import chung' },
        { id: 'B', text: 'RHF chịu trách nhiệm quản lý Form (vòng đời, submit, errors), còn Zod chịu trách nhiệm định nghĩa Schema & Xác thực dữ liệu' },
        { id: 'C', text: 'Zod dùng để render giao diện HTML, còn RHF dùng để gọi API Spring Boot' },
        { id: 'D', text: 'RHF chỉ là một wrapper bọc lại hook useRef, không có chức năng nào khác' },
      ],
      correctAnswer: 'B',
      explanation: 'RHF là Form Engine (quản lý fields, lifecycle, submit, proxy-based state). Zod là Schema Validation Engine (định nghĩa quy tắc, ràng buộc dữ liệu, suy luận type). Chúng bổ trợ cho nhau nhưng hoàn toàn độc lập.',
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
              <span>📝</span> Sát Hạch Kiến Thức: Bản Chất Form & Vấn Đề Của React
            </h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>
              5 câu hỏi phỏng vấn Senior Frontend Engineer sát hạch tư duy cốt lõi trước khi bước vào thực chiến React Hook Form.
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
                {score >= 4 ? '🎉 XUẤT SẮC! BẠN ĐÃ THẤU SUỐT VẤN ĐỀ CỦA FORM TRONG REACT!' : '📚 BẠN CẦN ÔN LẠI MỘT VÀI ĐIỂM CỐT LÕI'}
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
