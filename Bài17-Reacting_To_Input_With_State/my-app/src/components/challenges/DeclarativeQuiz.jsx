import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function DeclarativeQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: '1. Điểm khác biệt bản chất nhất giữa Lập trình Mệnh lệnh (Imperative) và Khai báo (Declarative) trong xây dựng UI là gì?',
      options: [
        { key: 'A', text: 'Imperative dùng thư viện React, còn Declarative dùng jQuery' },
        { key: 'B', text: 'Imperative tập trung vào CÁCH THỨC (HOW) ra lệnh trực tiếp cho DOM; Declarative tập trung vào KẾT QUẢ (WHAT) mô tả UI theo từng trạng thái State' },
        { key: 'C', text: 'Imperative chỉ chạy trên server, còn Declarative chỉ chạy trên trình duyệt' },
        { key: 'D', text: 'Declarative bắt buộc phải viết bằng TypeScript' },
      ],
      correct: 'B',
      explanation: 'Trong React Declarative, bạn không bao giờ gọi các hàm DOM như hide(), show() hay addClass(). Bạn chỉ mô tả giao diện trông như thế nào ở từng trạng thái.',
    },
    {
      id: 'q2',
      question: '2. "State Paradox" (Nghịch lý State) xảy ra khi nào và cách khắc phục chuẩn mực nhất là gì?',
      options: [
        { key: 'A', text: 'Xảy ra khi dùng quá nhiều Component con; khắc phục bằng cách gộp vào 1 file duy nhất' },
        { key: 'B', text: 'Xảy ra khi các cờ boolean độc lập mâu thuẫn lẫn nhau (ví dụ vừa isSubmitting vừa isSuccess); khắc phục bằng cách gộp thành 1 biến trạng thái hữu hạn (FSM status)' },
        { key: 'C', text: 'Xảy ra khi máy tính hết bộ nhớ RAM' },
        { key: 'D', text: 'Xảy ra khi cài đặt 2 phiên bản React khác nhau' },
      ],
      correct: 'B',
      explanation: 'Dùng nhiều cờ boolean rất dễ dẫn đến trạng thái phi lý. Giải pháp chuẩn là gộp thành 1 biến status duy nhất (Finite State Machine).',
    },
    {
      id: 'q3',
      question: '3. Tại sao KHÔNG NÊN đưa các dữ liệu có thể tính toán được (Derived State - ví dụ: fullName, isEmpty) vào useState?',
      options: [
        { key: 'A', text: 'Vì React không hỗ trợ kiểu dữ liệu chuỗi nối nhau' },
        { key: 'B', text: 'Vì sẽ gây dư thừa bộ nhớ và dễ dính lỗi lệch pha dữ liệu (Out-of-sync) khi một trong các biến nguồn thay đổi mà biến kia chưa kịp update' },
        { key: 'C', text: 'Vì trình duyệt sẽ ném lỗi MemoryLeakException' },
        { key: 'D', text: 'Vì biến Derived State luôn có giá trị null' },
      ],
      correct: 'B',
      explanation: 'Dữ liệu phái sinh (Derived State) nên được tính toán trực tiếp trong thân hàm component trong mỗi lần render để luôn đảm bảo tính nhất quán 100%.',
    },
    {
      id: 'q4',
      question: '4. Trong bài tập Đổi Viền Ảnh (Challenge 1), tại sao bắt buộc phải gọi e.stopPropagation() ở thẻ <img>?',
      options: [
        { key: 'A', text: 'Để ngăn trình duyệt tải lại trang (Reload)' },
        { key: 'B', text: 'Để ngăn sự kiện click sủi bọt (Event Bubbling) lan ra thẻ <div> bọc ngoài làm tắt ngay trạng thái isActive' },
        { key: 'C', text: 'Để tối ưu hóa SEO hình ảnh' },
        { key: 'D', text: 'Để kích hoạt tăng tốc phần cứng WebGL' },
      ],
      correct: 'B',
      explanation: 'Nếu không có e.stopPropagation(), sự kiện click ảnh sẽ nổi bọt lên thẻ div nền ngoài, kích hoạt hàm onClick của nền khiến isActive bị set về false ngay lập tức.',
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
          Kiểm tra toàn diện kiến thức về tư duy Declarative, mô hình hóa Finite State Machine và quản lý Derived State.
        </p>
      </div>

      <InfoBox type="tip" title="Bí Quyết Phỏng Vấn Senior">
        Khả năng phân tích và tinh gọn State, phát hiện State Paradox và Derived State là thước đo rõ ràng nhất để phân biệt một Junior và một Senior React Developer!
      </InfoBox>

      {/* Questions list */}
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
                      background: 'rgba(56, 189, 248, 0.2)',
                      color: '#38bdf8',
                      border: '1px solid #38bdf8',
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
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>
            Kết Quả: {calculateScore()}/{questions.length} câu đúng (
            {Math.round((calculateScore() / questions.length) * 100)}%)
          </div>
        )}
      </div>
    </div>
  );
}
