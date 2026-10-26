import { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: 'Bản chất cốt lõi của khái niệm "Routing" trong một ứng dụng Single Page Application (SPA) là gì?',
    options: [
      'Gửi request lên server để tải lại toàn bộ file index.html từ đầu',
      'Định nghĩa quy tắc ánh xạ: "URL nào trên thanh địa chỉ -> Hiển thị Component giao diện nào" mà không làm tải lại trang',
      'Chỉ để định cấu hình mật khẩu người dùng',
      'Chỉ hỗ trợ việc chuyển hướng giữa các website khác nhau',
    ],
    correctIndex: 1,
    explanation: 'Routing là cơ chế điều phối: Khi URL thay đổi, React Router tìm Component tương ứng để render vào DOM mà không cần reload trang web.',
  },
  {
    id: 2,
    question: 'Tại sao component `<BrowserRouter>` thường phải được đặt ở vị trí cao nhất (gần root) trong ứng dụng?',
    options: [
      'Để tăng tốc độ mạng của máy chủ',
      'Vì BrowserRouter kích hoạt môi trường Routing, lắng nghe sự kiện popstate của trình duyệt và cung cấp Context cho mọi component con bên trong sử dụng',
      'Để bắt buộc mọi thẻ HTML phải viết hoa',
      'Vì React chỉ cho phép chạy đúng 1 component',
    ],
    correctIndex: 1,
    explanation: 'BrowserRouter tạo ra Routing Context. Bất kỳ Hook (như useNavigate, useParams) hay component (Link, Routes) nào đều phải nằm bên trong phạm vi của BrowserRouter.',
  },
  {
    id: 3,
    question: 'Trong kiến trúc Nested Routes (Định tuyến lồng nhau) của React Router 6, component `<Outlet />` đóng vai trò gì?',
    options: [
      'Một ổ cắm điện mô phỏng',
      'Một vị trí "chờ sẵn" (Placeholder) trong Layout Cha để React Router nhét các Component Con tương ứng với URL vào đó',
      'Nút bấm để chuyển trang',
      'Trang hiển thị lỗi 404',
    ],
    correctIndex: 1,
    explanation: '<Outlet /> chính là cánh cổng kết nối: Layout cha giữ nguyên các phần dùng chung (Header, Sidebar), còn <Outlet /> sẽ hoán đổi component con tùy theo URL nhánh.',
  },
  {
    id: 4,
    question: 'Thuộc tính `index` trong `<Route index element={<AdminDashboard />} />` có ý nghĩa gì?',
    options: [
      'Đánh số thứ tự của Route trong mảng',
      'Khai báo đây là Index Route (Trang mặc định) được render vào <Outlet /> khi người dùng truy cập chính xác URL của Route cha',
      'Ép Google lập chỉ mục SEO',
      'Chỉ chạy khi có tham số tìm kiếm',
    ],
    correctIndex: 1,
    explanation: 'Index Route là component con mặc định được hiển thị khi đường dẫn URL trùng khít với đường dẫn của Route cha (không có sub-path phía sau).',
  },
  {
    id: 5,
    question: 'Cấu hình `<Route path="*" element={<NotFoundPage />} />` hoạt động như thế nào?',
    options: [
      'Báo lỗi cú pháp vì dấu * không phải là ký tự hợp lệ',
      'Là Wildcard (Catch-All Route) với độ ưu tiên thấp nhất, chỉ khớp khi URL hiện tại không trùng với bất kỳ Route nào được khai báo trước đó',
      'Tự động chặn tất cả người dùng truy cập',
      'Khóa ứng dụng web',
    ],
    correctIndex: 1,
    explanation: 'Dấu `*` đại diện cho mọi đường dẫn còn lại. Khi người dùng gõ một URL không tồn tại, Route này sẽ khớp và hiển thị trang 404 thân thiện.',
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
          <h2 className="lab-title">💡 Senior Architect Quiz: Session 2 • Bài 1 - Routing Fundamentals</h2>
          <p className="lab-desc">
            Kiểm tra mức độ thấu hiểu bản chất kiến trúc React Router 6, Nested Routes, Outlet và Index Routes.
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
