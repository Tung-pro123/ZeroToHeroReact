import { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: 'Hook useRef(initialValue) thực sự trả về đối tượng gì?',
    options: [
      'Một mảng gồm 2 phần tử [value, setValue] giống useState',
      'Một đối tượng JavaScript thuần túy có dạng { current: initialValue } với tham chiếu không đổi qua các lần render',
      'Một DOM Node thực thể trong trình duyệt',
      'Một hàm Setter bất đồng bộ',
    ],
    correctIndex: 1,
    explanation: 'useRef trả về một plain JavaScript object { current: initialValue }. React đảm bảo trả về cùng một đối tượng này ở mọi lần render tiếp theo.',
  },
  {
    id: 2,
    question: 'Điều gì xảy ra với giao diện người dùng (UI) khi bạn thực thi lệnh `myRef.current = 10`?',
    options: [
      'React lập tức lên lịch re-render component để cập nhật con số 10 lên màn hình',
      'React báo lỗi Mutation Exception vì dữ liệu trong React phải là bất biến',
      'Không có gì xảy ra trên UI vì việc thay đổi ref.current KHÔNG kích hoạt re-render',
      'React xóa component khỏi cây DOM',
    ],
    correctIndex: 2,
    explanation: 'Khác với State setter, thay đổi trực tiếp `ref.current` là một mutation bình thường của JS object và React không hề lắng nghe để kích hoạt render lại.',
  },
  {
    id: 3,
    question: 'Tại sao React nghiêm cấm đọc và ghi `ref.current` ngay trong quá trình Render (thân hàm Component)?',
    options: [
      'Vì làm như vậy sẽ vi phạm tính Tinh Khiết (Purity) của hàm render, gây lỗi x2 số liệu trong Strict Mode và phá hủy tính năng Concurrent React',
      'Vì JavaScript không cho phép truy cập thuộc tính .current trong hàm',
      'Vì ref sẽ tự động bị xóa về null nếu đọc trong render',
      'Vì React chỉ hỗ trợ TypeScript, không hỗ trợ JavaScript',
    ],
    correctIndex: 0,
    explanation: 'Component phải là pure function (cùng input props/state luôn trả về cùng JSX). Ghi ref khi render làm biến đổi trạng thái ngoài luồng, khiến Strict Mode chạy 2 lần bị sai lệch và làm hỏng Concurrent Rendering.',
  },
  {
    id: 4,
    question: 'Trường hợp nào sau đây là tình huống CHUẨN MỰC nhất để sử dụng `useRef`?',
    options: [
      'Lưu trữ nội dung của ô tìm kiếm hiển thị cho người dùng xem',
      'Lưu trữ danh sách sản phẩm trong giỏ hàng để render ra thẻ <li>',
      'Lưu trữ ID của Timer (setInterval/setTimeout) hoặc tham chiếu trực tiếp đến DOM Node',
      'Thay thế hoàn toàn Redux và Context API trong toàn bộ dự án',
    ],
    correctIndex: 2,
    explanation: 'Ref sinh ra như một "Lối thoát hiểm" (Escape Hatch) để lưu trữ các thông tin phụ trợ không tham gia vào luồng tính toán JSX như Timer ID, WebSocket, cờ kiểm tra unmount, hoặc DOM element.',
  },
  {
    id: 5,
    question: 'Làm thế nào `useRef` giúp giải quyết hiện tượng Closure Trap (Stale State) trong các callback bất đồng bộ (như setTimeout)?',
    options: [
      'Bằng cách ép trình duyệt xóa bỏ Call Stack',
      'Vì ref object giữ nguyên tham chiếu vùng nhớ; khi callback chạy ở tương lai, đọc `ref.current` sẽ luôn lấy giá trị mới nhất được gán vào thời điểm đó',
      'Bằng cách biến hàm bất đồng bộ thành hàm đồng bộ',
      'useRef không giải quyết được Closure Trap',
    ],
    correctIndex: 1,
    explanation: 'State trong JavaScript closure bị "đóng băng" theo giá trị tại thời điểm tạo closure (Snapshot). Ngược lại, Ref là một tham chiếu đối tượng không đổi, việc truy xuất `.current` tại thời điểm thực thi luôn trả về giá trị mới nhất.',
  },
];

export default function RefMasteryQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId, optionIndex) => {
    if (showResults) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">💡 Senior Architect Quiz: Bài 24 - useRef Mastery</h2>
          <p className="lab-desc">
            Kiểm tra mức độ thấu hiểu bản chất kiến trúc React Escape Hatches và cơ chế quản lý bộ nhớ của Hooks.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {QUESTIONS.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCorrect = selectedAnswers[q.id] === q.correctIndex;

            return (
              <div
                key={q.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.75rem', color: '#f8fafc' }}>
                  Câu {idx + 1}: {q.question}
                </div>

                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {q.options.map((opt, optIdx) => {
                    let btnStyle = {
                      textAlign: 'left',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      cursor: showResults ? 'default' : 'pointer',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(0, 0, 0, 0.2)',
                      color: '#cbd5e1',
                      transition: 'all 0.15s ease',
                    };

                    if (selectedAnswers[q.id] === optIdx) {
                      btnStyle.border = '1px solid #38bdf8';
                      btnStyle.background = 'rgba(56, 189, 248, 0.15)';
                      btnStyle.color = '#38bdf8';
                    }

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        btnStyle.border = '1px solid #10b981';
                        btnStyle.background = 'rgba(16, 185, 129, 0.2)';
                        btnStyle.color = '#6ee7b7';
                      } else if (selectedAnswers[q.id] === optIdx && !isCorrect) {
                        btnStyle.border = '1px solid #ef4444';
                        btnStyle.background = 'rgba(239, 68, 68, 0.2)';
                        btnStyle.color = '#fca5a5';
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        style={btnStyle}
                        onClick={() => handleSelect(q.id, optIdx)}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt}
                      </div>
                    );
                  })}
                </div>

                {showResults && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      fontSize: '0.82rem',
                      color: isCorrect ? '#6ee7b7' : '#fca5a5',
                    }}
                  >
                    <strong>{isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng.'}</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {!showResults ? (
            <button
              className="btn btn-primary"
              disabled={Object.keys(selectedAnswers).length < QUESTIONS.length}
              onClick={() => setShowResults(true)}
              style={{ minWidth: '160px' }}
            >
              📊 Nộp Bài & Xem Điểm
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>
                Kết quả: <span style={{ color: calculateScore() >= 4 ? '#10b981' : '#f59e0b' }}>{calculateScore()} / {QUESTIONS.length}</span> câu đúng!
              </div>
              <button className="btn btn-outline" onClick={handleReset}>
                🔄 Làm lại
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
