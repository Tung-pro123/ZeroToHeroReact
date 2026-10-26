import { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: 'Điểm khác biệt cốt lõi nhất giữa thẻ `<Link to="/about">` của React Router và thẻ `<a href="/about">` của HTML truyền thống là gì?',
    options: [
      '<Link> chỉ chạy được trên điện thoại, <a> chạy trên máy tính',
      '<Link> thực hiện Client-side navigation (gọi pushState, hoán đổi Virtual DOM) không làm chớp trắng/tải lại trang; trong khi <a> gửi HTTP GET mới làm reload toàn bộ document',
      '<a> không hỗ trợ đổi màu chữ CSS',
      '<Link> tự động mã hóa mật khẩu người dùng',
    ],
    correctIndex: 1,
    explanation: '<Link> chặn sự kiện mặc định của trình duyệt và dùng History API để cập nhật URL, giúp SPA giữ nguyên trạng thái ứng dụng mà không cần load lại toàn bộ HTML/CSS/JS.',
  },
  {
    id: 2,
    question: 'Khi nào bạn nên ưu tiên sử dụng `<NavLink>` thay vì `<Link>`?',
    options: [
      'Cho các liên kết nằm trong bài viết hoặc danh sách sản phẩm',
      'Cho Navbar, Sidebar, hoặc Tab Menu cần highlight/đổi màu để người dùng biết họ đang đứng ở trang nào',
      'Chỉ khi gọi API bất đồng bộ',
      'Khi cần liên kết sang trang web ngoài (như Facebook/Google)',
    ],
    correctIndex: 1,
    explanation: 'NavLink có thêm khả năng nhận biết trạng thái active của route và cung cấp callback ({ isActive }) để bạn áp dụng class/style/icon phù hợp cho thanh điều hướng.',
  },
  {
    id: 3,
    question: 'Tại sao khi viết `<NavLink to="/">` cho trang chủ Home, ta hầu như LUÔN LUÔN phải thêm thuộc tính `end`?',
    options: [
      'Vì nếu không có `end`, URL `/` sẽ là tiền tố (prefix) của MỌI route khác (như /products, /about), khiến nút Home luôn luôn bị sáng đèn Active!',
      'Vì thuộc tính `end` giúp tăng tốc độ tải trang',
      'Vì React Router bắt buộc tất cả NavLink phải có `end`',
      'Để đóng thẻ liên kết',
    ],
    correctIndex: 0,
    explanation: 'Cơ chế route matching mặc định kiểm tra prefix. Mọi URL đều bắt đầu bằng `/`, nên không có `end` thì Home sẽ luôn active bất kể bạn đang ở bất kỳ trang nào.',
  },
  {
    id: 4,
    question: 'Tình huống nào sau đây là use case CHUẨN MỰC NHẤT để sử dụng hook `useNavigate()`?',
    options: [
      'Thẻ sản phẩm để người dùng click xem chi tiết',
      'Footer liên kết đến trang Chính sách bảo mật',
      'Điều hướng sau khi nhận phản hồi API Login thành công hoặc sau khi bộ đếm ngược hết giờ',
      'Thay thế hoàn toàn thẻ <Link> trong toàn bộ trang web',
    ],
    correctIndex: 2,
    explanation: 'useNavigate() phục vụ Programmatic Navigation: Điều hướng bằng lệnh code khi việc chuyển trang là kết quả của một chuỗi logic nghiệp vụ (Auth, Submit Form, Timeout).',
  },
  {
    id: 5,
    question: 'Lựa chọn `{ replace: true }` trong `navigate("/dashboard", { replace: true })` có tác dụng gì đối với trải nghiệm người dùng?',
    options: [
      'Ghi đè URL hiện tại trong History Stack thay vì đẩy thêm mục mới, giúp người dùng khi bấm nút "Back" trên trình duyệt sẽ không bị quay ngược lại trang Login',
      'Xóa sạch toàn bộ LocalStorage',
      'Tự động làm mới trang web sau 5 giây',
      'Chặn người dùng tắt trình duyệt',
    ],
    correctIndex: 0,
    explanation: '{ replace: true } thay thế URL hiện tại trong lịch sử duyệt web. Đây là Best Practice kinh điển trong luồng Đăng nhập (Auth flow) để tránh việc user ấn Back lại rơi vào form login.',
  },
];

export default function QuizPage() {
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
          <h2 className="lab-title">💡 Senior Architect Quiz: Session 2 • Bài 2 - Navigating Mastery</h2>
          <p className="lab-desc">
            Đánh giá tư duy kiến trúc chuyên sâu về Client-Side Navigation, Active Matching, và History Stack trong React Router 6.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {QUESTIONS.map((q, idx) => {
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
