import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function ObjectQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: '1. Tại sao thao tác gán trực tiếp position.x = 10 không làm giao diện React re-render?',
      options: [
        { key: 'A', text: 'Vì React chỉ hỗ trợ kiểu dữ liệu số nguyên (number), không hỗ trợ Object' },
        { key: 'B', text: 'Vì bạn không gọi hàm Setter và React kiểm tra Object.is(prev, next) thấy cùng địa chỉ RAM nên hủy render' },
        { key: 'C', text: 'Vì trình duyệt tự động chặn các thao tác sửa Object trong JavaScript' },
        { key: 'D', text: 'Vì position là biến hằng số (const) nên JavaScript ném lỗi SyntaxError' },
      ],
      correct: 'B',
      explanation: 'React chỉ biết có state mới khi bạn gọi hàm Setter. Ngoài ra, React dùng Object.is so sánh tham chiếu ô nhớ; nếu cùng ô nhớ (#0x001), React coi như không có gì thay đổi.',
    },
    {
      id: 'q2',
      question: '2. Cho person = { firstName: "Lê", lastName: "Tùng" }. Đoạn code setPerson({ firstName: "Nam", ...person }) sẽ cho kết quả gì?',
      options: [
        { key: 'A', text: '{ firstName: "Nam", lastName: "Tùng" }' },
        { key: 'B', text: '{ firstName: "Lê", lastName: "Tùng" } (Do ...person đặt sau đã ghi đè ngược lại làm mất giá trị "Nam")' },
        { key: 'C', text: 'Báo lỗi Duplicate Key Error' },
        { key: 'D', text: 'Biến firstName trở thành mảng ["Nam", "Lê"]' },
      ],
      correct: 'B',
      explanation: 'Trong cú pháp Object literal, thuộc tính viết sau sẽ ghi đè thuộc tính viết trước. Vì ...person đặt ở sau nên firstName: "Lê" cũ đã đè bẹp giá trị "Nam"!',
    },
    {
      id: 'q3',
      question: '3. Toán tử Spread (...) trong JavaScript thực hiện phép sao chép nào?',
      options: [
        { key: 'A', text: 'Deep Copy (Sao chép sâu mọi tầng lồng nhau)' },
        { key: 'B', text: 'Shallow Copy (Sao chép nông chỉ ở tầng ngoài cùng cấp 1)' },
        { key: 'C', text: 'Sao chép qua mạng thông qua WebSocket' },
        { key: 'D', text: 'Chuyển đổi Object thành JSON String' },
      ],
      correct: 'B',
      explanation: 'Toán tử Spread chỉ sao chép nông các thuộc tính cấp 1. Các Object lồng sâu bên trong vẫn trỏ chung vào địa chỉ tham chiếu cũ.',
    },
    {
      id: 'q4',
      question: '4. Thư viện Immer (useImmer) sử dụng cơ chế nào để cho phép bạn viết code đột biến draft.city = "HN" mà vẫn an toàn 100%?',
      options: [
        { key: 'A', text: 'Tạo luồng Web Worker chạy ngầm để ghi đè RAM' },
        { key: 'B', text: 'Dùng JavaScript Proxy để ghi nhận các thao tác trên draft và tự sinh ra bản sao bất biến mới (Structural Sharing)' },
        { key: 'C', text: 'Chuyển mã JavaScript sang mã máy C++ WebAssembly' },
        { key: 'D', text: 'Ghi tạm dữ liệu vào LocalStorage của trình duyệt' },
      ],
      correct: 'B',
      explanation: 'Immer bọc draft bằng JavaScript Proxy. Khi bạn sửa thuộc tính, Proxy ghi lại và Immer áp dụng kỹ thuật Structural Sharing để tạo bản sao bất biến mới tối ưu.',
    },
  ];

  const handleSelect = (qId, optionKey) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🎯 Thử Thách & Câu Hỏi Phỏng Vấn</h2>
        <p className="lab-card-desc">
          Kiểm tra độ hiểu sâu về Immutability, cơ chế so sánh Object.is, cú pháp Spread và thư viện Immer.
        </p>
      </div>

      <InfoBox type="tip" title="Bí Quyết Phỏng Vấn Senior">
        Hiểu rõ thứ tự ghi đè trong toán tử Spread và cơ chế Shallow Copy vs Deep Copy là câu hỏi bắt buộc trong mọi buổi phỏng vấn React!
      </InfoBox>

      {/* Question List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '1.5rem 0' }}>
        {questions.map((q) => {
          const isCorrect = selectedAnswers[q.id] === q.correct;

          return (
            <div
              key={q.id}
              style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '1.25rem',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.75rem' }}>
                {q.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.options.map((opt) => {
                  const isSelected = selectedAnswers[q.id] === opt.key;
                  let btnStyle = {
                    background: '#1e293b',
                    color: '#e2e8f0',
                    border: '1px solid #334155',
                  };

                  if (isSelected) {
                    btnStyle = {
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10b981',
                      border: '1px solid #10b981',
                    };
                  }

                  if (submitted) {
                    if (opt.key === q.correct) {
                      btnStyle = {
                        background: 'rgba(16, 185, 129, 0.25)',
                        color: '#10b981',
                        border: '1px solid #10b981',
                        fontWeight: 700,
                      };
                    } else if (isSelected && !isCorrect) {
                      btnStyle = {
                        background: 'rgba(239, 68, 68, 0.25)',
                        color: '#ef4444',
                        border: '1px solid #ef4444',
                      };
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(q.id, opt.key)}
                      style={{
                        ...btnStyle,
                        padding: '0.65rem 1rem',
                        borderRadius: '8px',
                        textAlign: 'left',
                        cursor: submitted ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '0.9rem',
                        display: 'flex',
                        gap: '0.75rem',
                      }}
                    >
                      <strong>{opt.key}.</strong>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderLeft: `3px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
                    fontSize: '0.85rem',
                    color: '#cbd5e1',
                  }}
                >
                  <strong>{isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng!'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
        {!submitted ? (
          <button
            className="btn btn-primary"
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(selectedAnswers).length < questions.length}
          >
            📊 Nộp Bài & Xem Điểm
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handleReset}>
            🔄 Làm Lại Bài Quiz
          </button>
        )}

        {submitted && (
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>
            Kết Quả: {calculateScore()}/{questions.length} câu đúng (
            {Math.round((calculateScore() / questions.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
