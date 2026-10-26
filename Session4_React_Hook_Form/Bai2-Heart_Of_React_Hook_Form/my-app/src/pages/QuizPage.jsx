import React, { useState } from 'react';

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      title: 'Câu 1: Bản chất của Hook useForm()',
      question: 'Khẳng định nào sau đây mô tả chính xác nhất về bản chất của useForm() trong React Hook Form?',
      options: [
        { id: 'A', text: 'useForm() là hàm tự động render ra thẻ HTML <form> và gửi request POST đến backend' },
        { id: 'B', text: 'useForm() là Hook trung tâm khởi tạo hệ thống quản lý form và trả về các API công cụ (register, handleSubmit, formState, reset...)' },
        { id: 'C', text: 'useForm() là một component UI của thư viện Material UI' },
        { id: 'D', text: 'useForm() chỉ hoạt động nếu có cài đặt thư viện Redux Toolkit' },
      ],
      correctAnswer: 'B',
      explanation: 'useForm() là entry point khởi tạo hệ thống form management, trả về object chứa các công cụ như register, handleSubmit, formState, reset, watch để component sử dụng.',
    },
    {
      id: 2,
      title: 'Câu 2: Phân biệt handleSubmit và onSubmit',
      question: 'Trong cú pháp `<form onSubmit={handleSubmit(onSubmit)}>`, vai trò của hai hàm này là gì?',
      options: [
        { id: 'A', text: 'handleSubmit và onSubmit là hai tên gọi khác nhau của cùng một hàm' },
        { id: 'B', text: 'onSubmit là của RHF, còn handleSubmit là do lập trình viên tự viết' },
        { id: 'C', text: 'handleSubmit là hàm trung gian của RHF (chặn reload, validate, thu thập data); còn onSubmit là callback của lập trình viên nhận data sạch khi hợp lệ' },
        { id: 'D', text: 'handleSubmit dùng để gửi HTTP request, còn onSubmit dùng để validate' },
      ],
      correctAnswer: 'C',
      explanation: 'handleSubmit là Higher-Order Function do RHF cung cấp, đóng vai trò Middleware xử lý form submission. Khi dữ liệu đã vượt qua vòng kiểm tra hợp lệ, nó mới kích hoạt onSubmit(data) của bạn.',
    },
    {
      id: 3,
      title: 'Câu 3: Phân biệt Form Data và Form State',
      question: 'Phát biểu nào sau đây phân biệt đúng giữa Form Data và Form State trong React Hook Form?',
      options: [
        { id: 'A', text: 'Form Data là thông tin lỗi (errors), còn Form State là chuỗi JSON gửi lên server' },
        { id: 'B', text: 'Form Data trả lời "User đã nhập cái gì?", còn Form State trả lời "Form đang ở trạng thái nào?" (isDirty, isValid, isSubmitting)' },
        { id: 'C', text: 'Cả hai đều chỉ là object lưu trữ trong LocalStorage' },
        { id: 'D', text: 'Form State chỉ tồn tại khi form đã submit thành công' },
      ],
      correctAnswer: 'B',
      explanation: 'Form Data là dữ liệu nghiệp vụ do người dùng nhập ({ email, password }). Form State là siêu dữ liệu (metadata) biểu diễn trạng thái của form (isDirty, touchedFields, isValid, isSubmitting, errors).',
    },
    {
      id: 4,
      title: 'Câu 4: Ý nghĩa của việc cấu hình defaultValues',
      question: 'Tại sao nên cấu hình defaultValues trong useForm({ defaultValues: { ... } })?',
      options: [
        { id: 'A', text: 'Để form chạy nhanh gấp 10 lần' },
        { id: 'B', text: 'Để xác định mốc dữ liệu ban đầu chuẩn mực, giúp cờ isDirty so sánh chính xác sự thay đổi của người dùng' },
        { id: 'C', text: 'Để mã hóa mật khẩu trước khi lưu vào RAM' },
        { id: 'D', text: 'Để ngăn trình duyệt không cho người dùng inspect HTML' },
      ],
      correctAnswer: 'B',
      explanation: 'defaultValues cung cấp dữ liệu khởi tạo chuẩn cho các inputs, đồng thời làm mốc tham chiếu cho cờ isDirty: khi user thay đổi giá trị khác defaultValues thì isDirty=true, khi sửa lại giống hệt ban đầu thì isDirty tự động về false.',
    },
    {
      id: 5,
      title: 'Câu 5: Có được dùng useState cùng useForm không?',
      question: 'Trong một Component đã sử dụng useForm(), việc sử dụng thêm useState có được chấp nhận trong kiến trúc chuẩn không?',
      options: [
        { id: 'A', text: 'Tuyệt đối cấm, vì sẽ gây xung đột làm hỏng React Hook Form' },
        { id: 'B', text: 'Hoàn toàn được chấp nhận, vì useState rất phù hợp để quản lý các trạng thái hiển thị giao diện thuần túy (UI State như show/hide password, modal popup) trong khi RHF quản lý dữ liệu form' },
        { id: 'C', text: 'Chỉ được dùng nếu component đó có dưới 3 inputs' },
        { id: 'D', text: 'Chỉ được dùng useState trong useEffect' },
      ],
      correctAnswer: 'B',
      explanation: 'useForm quản lý Form Data & Form Lifecycle, còn useState xuất sắc trong việc quản lý UI State (như toggle password, đóng mở modal, chọn tab). Kết hợp cả hai là mô hình chuẩn mực trong các ứng dụng thực tế.',
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
              <span>📝</span> Sát Hạch Kiến Thức: Trái Tim useForm()
            </h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>
              5 câu hỏi phỏng vấn Senior Frontend Engineer sát hạch mức độ làm chủ Hook useForm() và kiến trúc 3 tầng.
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
                {score >= 4 ? '🎉 XUẤT SẮC! BẠN ĐÃ LÀM CHỦ useForm() TRÁI TIM RHF!' : '📚 BẠN CẦN ÔN LẠI MỘT VÀI ĐIỂM CỐT LÕI'}
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
