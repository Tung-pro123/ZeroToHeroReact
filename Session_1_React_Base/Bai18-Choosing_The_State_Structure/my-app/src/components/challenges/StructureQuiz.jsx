import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function StructureQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: '1. Điều gì sẽ xảy ra nếu bạn viết: const [color, setColor] = useState(props.messageColor)?',
      options: [
        { key: 'A', text: 'Biến color sẽ tự động cập nhật mỗi khi component Cha truyền prop messageColor mới xuống' },
        { key: 'B', text: 'color chỉ nhận giá trị ở lần render đầu tiên duy nhất; nếu Cha đổi màu sau đó, con sẽ bị kẹt màu cũ' },
        { key: 'C', text: 'Trình duyệt sẽ báo lỗi SyntaxError' },
        { key: 'D', text: 'Toàn bộ ứng dụng bị crash ngay khi mount' },
      ],
      correct: 'B',
      explanation: 'useState chỉ khởi tạo một lần duy nhất lúc Mount. Nếu muốn luôn đồng bộ theo Cha, hãy dùng prop trực tiếp const color = props.messageColor.',
    },
    {
      id: 'q2',
      question: '2. Tại sao trong danh sách chọn mục, ta nên lưu selectedId thay vì lưu cả object selectedItem?',
      options: [
        { key: 'A', text: 'Vì React không cho phép lưu Object vào useState' },
        { key: 'B', text: 'Để tránh trùng lặp dữ liệu và tránh lỗi mất đồng bộ (stale data) khi các thuộc tính của món đồ bị sửa đổi trong danh sách gốc' },
        { key: 'C', text: 'Vì lưu ID chạy chậm hơn nên an toàn hơn' },
        { key: 'D', text: 'Để chuyển đổi sang cơ sở dữ liệu MongoDB' },
      ],
      correct: 'B',
      explanation: 'Lưu cả Object bản sao sẽ gây hiện tượng 2 nguồn chân lý (Dual sources of truth). Sửa bên này bên kia không hay biết. Chỉ lưu ID là chuẩn mực!',
    },
    {
      id: 'q3',
      question: '3. Định nghĩa nào sau đây là chính xác nhất về "Derived State" (Trạng thái phái sinh)?',
      options: [
        { key: 'A', text: 'Là State được thừa kế từ một Class Component cha' },
        { key: 'B', text: 'Là giá trị có thể tính toán trực tiếp từ Props hoặc State khác trong quá trình render mà không cần khai báo useState' },
        { key: 'C', text: 'Là State được lưu trữ vĩnh viễn trong LocalStorage' },
        { key: 'D', text: 'Là State chỉ dùng cho ứng dụng di động React Native' },
      ],
      correct: 'B',
      explanation: 'Derived State (như fullName, totalCount, isSelected) nên được tính toán trực tiếp trong hàm component, giúp loại bỏ các bước setState và useEffect dư thừa.',
    },
    {
      id: 'q4',
      question: '4. Khi xây dựng tính năng chọn nhiều phần tử (Multiple Selection), tại sao cấu trúc JavaScript Set lại tối ưu hơn mảng thông thường?',
      options: [
        { key: 'A', text: 'Vì Set tự động nén dữ liệu dạng zip' },
        { key: 'B', text: 'Vì phép kiểm tra set.has(id) có độ phức tạp O(1) tức thì, trong khi mảng arr.includes(id) phải duyệt tuần tự O(N)' },
        { key: 'C', text: 'Vì Set không tiêu tốn bộ nhớ RAM' },
        { key: 'D', text: 'Vì Set tự động gửi request lên server' },
      ],
      correct: 'B',
      explanation: 'Set sử dụng cơ chế Bảng Băm (Hash Table), cho phép thao tác kiểm tra tồn tại (has), thêm (add), và xóa (delete) đều diễn ra trong thời gian O(1) siêu tốc.',
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
          Kiểm tra toàn diện kiến thức về 5 nguyên tắc vàng thiết kế State, Derived State và chuẩn hóa dữ liệu.
        </p>
      </div>

      <InfoBox type="tip" title="Bí Quyết Phỏng Vấn Senior">
        Nắm vững cạm bẫy useState(prop) và tư duy lưu ID thay vì nhân bản Object là câu hỏi kinh điển để đánh giá tư duy kiến trúc của ứng viên!
      </InfoBox>

      {/* Questions */}
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
                      background: 'rgba(168, 85, 247, 0.2)',
                      color: '#c084fc',
                      border: '1px solid #a855f7',
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
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c084fc' }}>
            Kết Quả: {calculateScore()}/{questions.length} câu đúng (
            {Math.round((calculateScore() / questions.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
