import { useState } from 'react';

const sculptures = [
  { name: 'Floralis Genérica', artist: 'Eduardo Catalano', icon: '🌸' },
  { name: 'Kỳ Quan Eternal', artist: 'Hà Văn', icon: '🏛️' },
  { name: 'Cánh Bướm Tương Lai', artist: 'Marta Minujín', icon: '🦋' }
];

export default function ChallengesSection() {
  // Challenge 1: Bounded Gallery
  const [index, setIndex] = useState(0);
  const hasPrev = index > 0;
  const hasNext = index < sculptures.length - 1;

  // Challenge 2: Fixed Form
  const [isBrokenForm, setIsBrokenForm] = useState(false);
  const [fixedName, setFixedName] = useState('Tùng');
  // Biến let mô phỏng form bị kẹt
  let brokenName = 'Tùng';

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "1. Để giao diện React thay đổi sau tương tác, cần thỏa mãn ĐỒNG THỜI 2 yếu tố nào?",
      options: [
        { text: "A. Lưu trữ dữ liệu vào localStorage và gọi window.location.reload()", isCorrect: false },
        { text: "B. Lưu giữ dữ liệu qua các lần render (Retain) và Kích hoạt React vẽ lại màn hình (Trigger Re-render)", isCorrect: true },
        { text: "C. Dùng biến toàn cục window.myVariable và hàm console.log()", isCorrect: false },
        { text: "D. Gọi hook useEffect và thẻ <div>", isCorrect: false },
      ],
      explanation: "Chính xác! Biến thông thường let chỉ tăng trong RAM JS mà không kích hoạt re-render và bị reset về 0 ở lần gọi sau. useState đáp ứng đồng thời cả Retain và Trigger."
    },
    {
      id: 2,
      question: "2. Tại sao tuyệt đối KHÔNG ĐƯỢC đặt Hook useState bên trong câu lệnh điều kiện if hoặc vòng lặp for?",
      options: [
        { text: "A. Vì React dựa vào thứ tự cuộc gọi cố định (Call Order Cursor) để bốc đúng giá trị từ mảng RAM.", isCorrect: true },
        { text: "B. Vì JavaScript không hỗ trợ cấu trúc if bên trong hàm.", isCorrect: false },
        { text: "C. Vì if/else làm tăng dung lượng file CSS.", isCorrect: false },
        { text: "D. Vì trình duyệt sẽ chặn đứng mã nguồn.", isCorrect: false },
      ],
      explanation: "Chính xác! React quản lý State bằng chỉ số mảng 0, 1, 2... Nếu một Hook nằm trong if bị bỏ qua, toàn bộ các Hook bên dưới sẽ bị lệch ngăn kéo, gán nhầm kiểu dữ liệu và gây sập ứng dụng."
    },
    {
      id: 3,
      question: "3. Nếu một component <Gallery /> được render 2 lần ở 2 vị trí khác nhau trên cùng một trang:",
      options: [
        { text: "A. Hai component sẽ dùng chung 1 State, bấm Next ở cái này thì cái kia nhảy theo.", isCorrect: false },
        { text: "B. Mỗi component sở hữu một bộ State hoàn toàn độc lập và riêng tư trong bộ nhớ.", isCorrect: true },
        { text: "C. Component thứ hai sẽ bị ghi đè và mất hiển thị.", isCorrect: false },
        { text: "D. Ứng dụng sẽ báo lỗi Duplicate Key.", isCorrect: false },
      ],
      explanation: "Chính xác! State là tài sản riêng tư gắn liền với vị trí của từng thực thể component trên màn hình. Chúng hoàn toàn độc lập với nhau."
    },
    {
      id: 4,
      question: "4. Khi người dùng bấm nút thay đổi State, giá trị truyền vào useState(initialValue) ở lần render kế tiếp sẽ như thế nào?",
      options: [
        { text: "A. Sẽ ghi đè lại giá trị của State về initialValue.", isCorrect: false },
        { text: "B. Bị React bỏ qua hoàn toàn, React sẽ ưu tiên bốc giá trị mới nhất đang lưu trong RAM.", isCorrect: true },
        { text: "C. Bị xóa sạch khỏi bộ nhớ máy tính.", isCorrect: false },
        { text: "D. Gây ra lỗi cú pháp runtime.", isCorrect: false },
      ],
      explanation: "Chính xác! Tham số initialValue chỉ có tác dụng một lần duy nhất lúc component mới sinh ra (Mounting). Từ lần render thứ 2 trở đi, React lấy giá trị từ kho RAM và phớt lờ tham số này."
    }
  ];

  const handleSelectQuiz = (qId, optIdx) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      const ans = quizAnswers[q.id];
      if (ans !== undefined && q.options[ans].isCorrect) score += 1;
    });
    return score;
  };

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🎯 Lời Giải Thử Thách React.dev &amp; Câu Đố Trắc Nghiệm</h2>
          <p className="card-desc">
            Trải nghiệm tương tác với lời giải 100% các bài tập thử thách chính thức của React.dev 
            và kiểm tra độ thấu hiểu của bạn về cơ chế State.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        {/* Challenge 1: Bounded Gallery */}
        <div className="compare-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>🖼️</span> Thử Thách 1: Chặn Crash &amp; Nút Previous</h3>
            <span className="badge badge-react">React.dev #1</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Kiểm tra biên an toàn: Vô hiệu hóa nút khi ở đầu hoặc cuối danh sách tranh.
          </p>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {sculptures[index].icon}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f3f4f6' }}>
              {sculptures[index].name}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              Nghệ sĩ: {sculptures[index].artist} ({index + 1} / {sculptures.length})
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              className="btn-secondary"
              onClick={() => hasPrev && setIndex(index - 1)}
              disabled={!hasPrev}
              style={{ flex: 1, padding: '0.45rem' }}
            >
              ⬅️ Previous ({hasPrev ? 'Sẵn sàng' : 'Hết'})
            </button>
            <button
              className="btn-primary"
              onClick={() => hasNext && setIndex(index + 1)}
              disabled={!hasNext}
              style={{ flex: 1, padding: '0.45rem' }}
            >
              Next ➡️ ({hasNext ? 'Sẵn sàng' : 'Hết'})
            </button>
          </div>
        </div>

        {/* Challenge 2: Fixed Form Inputs */}
        <div className="compare-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>✍️</span> Thử Thách 2: Sửa Ô Nhập Bị Kẹt Chữ</h3>
            <span className="badge badge-memory">React.dev #2</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Ô nhập bị kẹt chữ do dùng biến <code>let</code> thay vì <code>useState</code>.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
              {isBrokenForm ? '❌ Đang dùng let (Gõ chữ sẽ bị kẹt/reset):' : '✅ Đang dùng useState (Gõ mượt mà):'}
            </label>
            <input
              type="text"
              value={isBrokenForm ? brokenName : fixedName}
              onChange={(e) => {
                if (isBrokenForm) {
                  brokenName = e.target.value; // ❌ Không re-render!
                } else {
                  setFixedName(e.target.value); // ✅ Re-render mượt mà!
                }
              }}
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: `1px solid ${isBrokenForm ? '#f43f5e' : '#a855f7'}`,
                color: '#ffffff',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '0.85rem', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input
                type="checkbox"
                checked={isBrokenForm}
                onChange={(e) => setIsBrokenForm(e.target.checked)}
              />
              Mô phỏng lỗi dùng biến <code>let brokenName = ''</code>
            </label>
          </div>
        </div>
      </div>

      {/* Trắc nghiệm củng cố */}
      <h3 style={{ fontSize: '1.25rem', color: '#c084fc', marginBottom: '1rem' }}>
        📝 Trắc Nghiệm Đánh Giá Năng Lực
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {questions.map((q) => {
          const selected = quizAnswers[q.id];
          return (
            <div key={q.id} className="quiz-card">
              <h4 className="quiz-question">{q.question}</h4>
              <div className="quiz-options">
                {q.options.map((opt, idx) => {
                  let cls = 'option-btn';
                  if (showResults) {
                    if (opt.isCorrect) cls += ' selected-correct';
                    else if (selected === idx) cls += ' selected-wrong';
                  } else if (selected === idx) {
                    cls += ' active';
                  }

                  return (
                    <button
                      key={idx}
                      className={cls}
                      onClick={() => !showResults && handleSelectQuiz(q.id, idx)}
                      style={{
                        borderColor: !showResults && selected === idx ? '#a855f7' : undefined,
                        background: !showResults && selected === idx ? 'rgba(168, 85, 247, 0.2)' : undefined
                      }}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className={`quiz-feedback ${q.options[selected]?.isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <strong>{q.options[selected]?.isCorrect ? '🎉 Hoàn toàn chính xác!' : '⚠️ Giải thích:'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        {!showResults ? (
          <button
            className="btn-primary"
            onClick={() => setShowResults(true)}
            disabled={Object.keys(quizAnswers).length === 0}
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
          >
            Chấm Điểm Trắc Nghiệm 📝
          </button>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.75rem' }}>
              Điểm của bạn: {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
            </div>
            <button
              className="btn-secondary"
              onClick={() => { setQuizAnswers({}); setShowResults(false); }}
              style={{ padding: '0.6rem 1.5rem' }}
            >
              Làm lại 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
