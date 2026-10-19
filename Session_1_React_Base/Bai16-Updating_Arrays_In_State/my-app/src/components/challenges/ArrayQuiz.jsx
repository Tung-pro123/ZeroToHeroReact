import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function ArrayQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: '1. Phân biệt sự khác nhau cốt tử giữa hàm slice() và splice() khi xử lý Mảng trong React?',
      options: [
        { key: 'A', text: 'slice() cắt tạo mảng mới an toàn; splice() biến đổi trực tiếp trên mảng gốc gây lỗi Mutation' },
        { key: 'B', text: 'splice() chạy nhanh hơn slice() nên được khuyên dùng trong React' },
        { key: 'C', text: 'Cả hai hàm đều tạo mảng mới, chỉ khác nhau về số lượng tham số' },
        { key: 'D', text: 'slice() chỉ dùng cho chuỗi (String), splice() mới dùng cho mảng (Array)' },
      ],
      correct: 'A',
      explanation: 'slice(start, end) là hàm thuần khiết trả về mảng bản sao mới. Trong khi đó splice() cắt xẻ trực tiếp mảng gốc, vi phạm luật Immutability của React.',
    },
    {
      id: 'q2',
      question: '2. Cho đoạn mã: const next = [...list]; next[0].done = true; setList(next); Tại sao đây vẫn là lỗi Mutation nghiêm trọng?',
      options: [
        { key: 'A', text: 'Vì [...list] bị cấm trong JavaScript hiện đại' },
        { key: 'B', text: 'Vì [...list] chỉ là Shallow Copy, các object bên trong vẫn là con trỏ cũ; sửa next[0] đã đột biến trực tiếp object của snapshot hiện tại' },
        { key: 'C', text: 'Vì hàm setList không chấp nhận mảng làm đối số' },
        { key: 'D', text: 'Vì biến done phải khai báo bằng từ khóa var' },
      ],
      correct: 'B',
      explanation: 'Toán tử Spread chỉ sao chép nông mảng ngoài cùng. Object { done: false } ở vị trí số 0 vẫn dùng chung địa chỉ RAM với mảng cũ.',
    },
    {
      id: 'q3',
      question: '3. Cách chuẩn mực và ngắn gọn nhất để xóa một phần tử có id = 5 ra khỏi mảng State trong React?',
      options: [
        { key: 'A', text: 'items.splice(items.indexOf(5), 1); setItems(items);' },
        { key: 'B', text: 'setItems(items.filter(item => item.id !== 5));' },
        { key: 'C', text: 'delete items[5]; setItems(items);' },
        { key: 'D', text: 'items.pop(); setItems(items);' },
      ],
      correct: 'B',
      explanation: 'filter() trả về một mảng mới chỉ gồm các phần tử thỏa mãn điều kiện logic mà không đụng chạm đến mảng ban đầu.',
    },
    {
      id: 'q4',
      question: '4. Khi sử dụng useImmer để cập nhật mảng, bạn có được phép dùng các hàm như draft.push() hay draft.splice() không?',
      options: [
        { key: 'A', text: 'Hoàn toàn không, vì các hàm đó vẫn gây lỗi Mutation' },
        { key: 'B', text: 'Được phép 100%, vì draft là một Proxy, Immer sẽ tự động dịch các thao tác đột biến thành bản sao bất biến mới' },
        { key: 'C', text: 'Chỉ được dùng push, không được dùng splice' },
        { key: 'D', text: 'Chỉ dùng được nếu mảng có dưới 10 phần tử' },
      ],
      correct: 'B',
      explanation: 'Immer bọc draft bằng JavaScript Proxy, cho phép bạn viết code đột biến tự nhiên (push, splice, gán chỉ mục) mà vẫn đảm bảo tính an toàn bất biến tuyệt đối.',
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
          Kiểm tra toàn diện kiến thức về mảng bất biến, các hàm thuần khiết của Array và kỹ thuật xử lý dữ liệu với useImmer.
        </p>
      </div>

      <InfoBox type="tip" title="Bí Quyết Phỏng Vấn Senior">
        Sự khác biệt giữa slice vs splice và cơ chế Shallow Copy của mảng chứa Object là 2 chủ đề được hỏi nhiều nhất trong các bài test kỹ thuật React!
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
                      background: 'rgba(245, 158, 11, 0.2)',
                      color: '#f59e0b',
                      border: '1px solid #f59e0b',
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
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>
            Kết Quả: {calculateScore()}/{questions.length} câu đúng (
            {Math.round((calculateScore() / questions.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
