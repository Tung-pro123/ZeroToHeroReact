import { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: 'Chính xác tại thời điểm nào trong vòng đời React thì DOM node thật được gán vào `ref.current`?',
    options: [
      'Ngay tại Render Phase, khi hàm Component vừa được gọi',
      'Tại Commit Phase, sau khi React đã áp dụng các thay đổi vào cây DOM thực tế',
      'Khi trang web tải lần đầu tiên trong file HTML gốc',
      'Khi người dùng click chuột vào màn hình',
    ],
    correctIndex: 1,
    explanation: 'Trong Render Phase, DOM thật chưa được tạo hoặc chưa cập nhật xong nên ref.current là null. React chỉ gán DOM node thật vào ref.current ở Commit Phase.',
  },
  {
    id: 2,
    question: 'Tại sao việc gọi `useRef()` bên trong hàm `.map()` để lấy ref cho từng phần tử trong danh sách lại là điều cấm kỵ?',
    options: [
      'Vì mảng trong JavaScript không hỗ trợ lưu trữ Object',
      'Vì vi phạm Luật tối thượng của Hooks (Rules of Hooks): Hooks không được đặt trong vòng lặp hay điều kiện rẽ nhánh',
      'Vì thẻ HTML không cho phép nhận ref',
      'Vì useRef chỉ hoạt động với chuỗi ký tự',
    ],
    correctIndex: 1,
    explanation: 'React dựa vào thứ tự gọi Hook cố định để nhận diện state/ref giữa các lần render. Đặt Hook trong loop khiến số lượng và thứ tự bị biến động, phá hủy cơ chế Hook Cursor của React.',
  },
  {
    id: 3,
    question: 'Để Component Cha có thể gắn `ref` và can thiệp vào thẻ DOM bên trong Component Con trong React 18, ta phải làm gì?',
    options: [
      'Dùng document.getElementById() bên trong Component Cha',
      'Bọc Component Con bằng hàm forwardRef((props, ref) => ...)',
      'Truyền ref như một State thông thường qua Context API',
      'Component Con không bao giờ cho phép Cha chạm vào DOM',
    ],
    correctIndex: 1,
    explanation: 'Theo mặc định trong React 18, Component tùy biến không nhận prop `ref`. Ta cần bọc nó trong `forwardRef` để chuyển tiếp tham chiếu ref từ Cha xuống con.',
  },
  {
    id: 4,
    question: 'Mục đích kiến trúc quan trọng nhất của Hook `useImperativeHandle` là gì?',
    options: [
      'Tăng tốc độ mạng khi tải video',
      'Bảo vệ tính Đóng Gói (Encapsulation): Giới hạn và tùy biến các phương thức mà Cha được phép gọi, ngăn Cha can thiệp sâu vào DOM thật của Con',
      'Tự động re-render component khi DOM thay đổi',
      'Thay thế hoàn toàn Redux Toolkit',
    ],
    correctIndex: 1,
    explanation: 'useImperativeHandle đóng vai trò như một Interface bảo vệ: Thay vì phơi bày toàn bộ HTML DOM thật, con chỉ mở ra các hàm cần thiết như focus(), reset(), hay scroll().',
  },
  {
    id: 5,
    question: 'Khi nào bạn bắt buộc phải sử dụng `flushSync` từ thư viện `react-dom`?',
    options: [
      'Mọi lúc gọi hàm setState',
      'Khi bạn vừa gọi setState để thêm một phần tử vào danh sách, và ngay lập tức sau đó cần cuộn DOM (scrollIntoView) tới phần tử mới đó một cách đồng bộ',
      'Khi muốn xóa cache trình duyệt',
      'Khi muốn chặn người dùng bấm chuột',
    ],
    correctIndex: 1,
    explanation: 'React gom cụm (batch) state updates bất đồng bộ. Nếu không có flushSync, câu lệnh cuộn DOM chạy ngay sau setState sẽ nhắm vào thẻ DOM cũ vì DOM mới chưa kịp sinh ra.',
  },
];

export default function DomRefMasteryQuiz() {
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
          <h2 className="lab-title">💡 Senior Architect Quiz: Bài 25 - DOM Manipulation with Refs</h2>
          <p className="lab-desc">
            Kiểm tra mức độ thấu hiểu bản chất kiến trúc Commit Phase, forwardRef, Ref Callbacks và flushSync.
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
