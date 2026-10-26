import React, { useState } from 'react';

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      title: 'Câu 1: Bản chất kiểu dữ liệu của useParams()',
      question: 'Khi URL là `/users/100`, kết quả của `const { id } = useParams()` và biểu thức `id === 100` sẽ là gì?',
      options: [
        { id: 'A', text: 'id là number (100), biểu thức trả về true vì React Router tự parse số nguyên' },
        { id: 'B', text: 'id là string ("100"), biểu thức trả về false vì so sánh nghiêm ngặt giữa string và number' },
        { id: 'C', text: 'id là undefined vì chưa khai báo kiểu dữ liệu trong Route' },
        { id: 'D', text: 'id là Object chứa { value: 100 }' },
      ],
      correctAnswer: 'B',
      explanation: 'useParams() luôn trả về chuỗi String (hoặc undefined nếu segment không tồn tại). Vì vậy "100" === 100 sẽ là false. Cần dùng Number(id) === 100.',
    },
    {
      id: 2,
      title: 'Câu 2: Phân biệt useLocation().search và useSearchParams()',
      question: 'Tại sao khi làm bộ lọc tìm kiếm & phân trang, ta nên ưu tiên dùng `useSearchParams()` thay vì `useLocation().search`?',
      options: [
        { id: 'A', text: 'useLocation().search bị lỗi khi chạy trên trình duyệt di động' },
        { id: 'B', text: 'useSearchParams() cung cấp API URLSearchParams (get, set, has, delete) và hàm setSearchParams để cập nhật URL dễ dàng' },
        { id: 'C', text: 'useLocation().search không chứa dấu ? ở đầu chuỗi' },
        { id: 'D', text: 'useSearchParams() lưu dữ liệu vào LocalStorage thay vì URL' },
      ],
      correctAnswer: 'B',
      explanation: 'location.search chỉ là chuỗi text thô (raw string). Trong khi đó, useSearchParams() cung cấp bộ công cụ URLSearchParams với các method get/set chuẩn mực và hàm setSearchParams giúp ghi đè trạng thái lên URL mượt mà.',
    },
    {
      id: 3,
      title: 'Câu 3: Xử lý giá trị Query Parameter không tồn tại',
      question: 'Nếu user truy cập `/products` (hoàn toàn không có param page), `searchParams.get("page")` trả về gì?',
      options: [
        { id: 'A', text: 'undefined' },
        { id: 'B', text: 'Chuỗi rỗng ""' },
        { id: 'C', text: 'null' },
        { id: 'D', text: 'Ném ra ngoại lệ NullPointerException' },
      ],
      correctAnswer: 'C',
      explanation: 'Theo chuẩn Web API URLSearchParams, method .get(name) trả về null nếu param không tồn tại trong query string. Vì vậy lập trình viên thường dùng Nullish Coalescing: searchParams.get("page") ?? "1".',
    },
    {
      id: 4,
      title: 'Câu 4: Kiến trúc RESTful — Path Variable vs Query Param',
      question: 'Tại sao ID sản phẩm nên thiết kế dưới dạng Path (`/products/123`), trong khi bộ lọc và số trang lại là Query (`?category=phone&page=2`)?',
      options: [
        { id: 'A', text: 'Path Parameter xác định danh tính duy nhất của Tài nguyên (Resource Identity), trong khi Query Parameter điều khiển cách biểu diễn tập hợp (Search, Sort, Pagination)' },
        { id: 'B', text: 'Chỉ vì quy ước viết code của React Router, không có ý nghĩa gì về kiến trúc' },
        { id: 'C', text: 'Query Parameter không thể chứa số' },
        { id: 'D', text: 'Path Parameter tải trang nhanh hơn Query Parameter' },
      ],
      correctAnswer: 'A',
      explanation: 'Đây là nguyên lý cốt lõi của RESTful Architecture: Đường dẫn (Path) xác định cây tài nguyên hệ thống (What resource). Query string xác định trạng thái truy vấn và lọc dữ liệu của tài nguyên đó (How to present).',
    },
    {
      id: 5,
      title: 'Câu 5: Cập nhật an toàn một tham số trong setSearchParams',
      question: 'Khi URL đang có `?q=iphone&page=2`, làm sao để chỉ đổi `page=3` mà KHÔNG làm mất tham số `q=iphone`?',
      options: [
        { id: 'A', text: 'setSearchParams({ page: 3 })' },
        { id: 'B', text: 'setSearchParams(prev => { prev.set("page", 3); return prev; })' },
        { id: 'C', text: 'window.location.search = "?page=3"' },
        { id: 'D', text: 'navigate("/products?page=3")' },
      ],
      correctAnswer: 'B',
      explanation: 'Nếu truyền object tĩnh setSearchParams({ page: 3 }), toàn bộ query cũ (q=iphone) sẽ bị xóa sạch! Truyền updater callback function nhận prev URLSearchParams, gọi prev.set("page", 3) và return prev là cách chuẩn để merge an toàn.',
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
              <span>📝</span> Sát Hạch Kiến Thức: URL State & React Router v6
            </h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>
              5 câu hỏi thiết kế kiến trúc chuẩn Senior Frontend Engineer kiểm tra khả năng làm chủ URL Values.
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
                {score >= 4 ? '🎉 XUẤT SẮC! BẠN ĐÃ LÀM CHỦ URL STATE ENGINE!' : '📚 BẠN CẦN ÔN LẠI MỘT SỐ NGUYÊN TẮC CỐT LÕI'}
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
          {questions.map((q, index) => {
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
                    <strong style={{ color: '#38bdf8' }}>💡 Giải thích chuyên sâu:</strong> {q.explanation}
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
