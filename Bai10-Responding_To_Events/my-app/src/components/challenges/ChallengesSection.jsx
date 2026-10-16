import { useState } from 'react';

export default function ChallengesSection() {
  // Challenge 1 State: Light Switch
  const [isLightOn, setIsLightOn] = useState(false);
  const [useBrokenCode, setUseBrokenCode] = useState(false);

  // Challenge 2 State: Color Switch
  const [pageClicks, setPageClicks] = useState(0);
  const [currentColor, setCurrentColor] = useState('#1e293b');
  const [useStopPropagation, setUseStopPropagation] = useState(true);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const colors = ['#1e293b', '#0f766e', '#831843', '#1e3a8a', '#701a75'];

  const handleLightClick = () => {
    setIsLightOn((prev) => !prev);
  };

  const handleColorChange = (e) => {
    if (useStopPropagation) {
      e.stopPropagation(); // ⛔ Dừng sủi bọt lên trang
    }
    const nextColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
    setCurrentColor(nextColor);
  };

  const questions = [
    {
      id: 1,
      question: "1. Đoạn code nào sau đây là ĐÚNG khi muốn truyền hàm xử lý sự kiện trong React?",
      options: [
        { text: "A. <button onClick={handleClick()}>Bấm tôi</button>", isCorrect: false },
        { text: "B. <button onClick={handleClick}>Bấm tôi</button>", isCorrect: true },
        { text: "C. <button onClick=\"handleClick()\">Bấm tôi</button>", isCorrect: false },
        { text: "D. <button click={handleClick}>Bấm tôi</button>", isCorrect: false },
      ],
      explanation: "Chính xác! Bạn phải truyền tham chiếu hàm (Function Reference: onClick={handleClick}), không được thêm dấu () vì nó sẽ khiến hàm chạy ngay lúc render."
    },
    {
      id: 2,
      question: "2. Hàm nào dùng để ngăn sự kiện lan truyền (sủi bọt) lên các thẻ cha trong cây DOM?",
      options: [
        { text: "A. e.preventDefault()", isCorrect: false },
        { text: "B. e.stopPropagation()", isCorrect: true },
        { text: "C. e.cancelBubble()", isCorrect: false },
        { text: "D. e.stopRender()", isCorrect: false },
      ],
      explanation: "Chính xác! e.stopPropagation() ngăn sự kiện sủi bọt lên các thẻ cha, còn e.preventDefault() dùng để ngăn hành vi mặc định của trình duyệt (như reload form)."
    },
    {
      id: 3,
      question: "3. Duy nhất sự kiện nào sau đây KHÔNG sủi bọt (bubble) trong React?",
      options: [
        { text: "A. onClick", isCorrect: false },
        { text: "B. onMouseEnter", isCorrect: false },
        { text: "C. onScroll", isCorrect: true },
        { text: "D. onSubmit", isCorrect: false },
      ],
      explanation: "Chính xác! Theo chuẩn kỹ thuật của React, onScroll là sự kiện duy nhất không sủi bọt ngược lên các phần tử cha."
    },
    {
      id: 4,
      question: "4. Nếu bạn muốn truyền tham số `id` vào hàm handleClick khi người dùng click nút, cách viết nào chuẩn mực nhất?",
      options: [
        { text: "A. <button onClick={handleClick(id)}>Xóa</button>", isCorrect: false },
        { text: "B. <button onClick={() => handleClick(id)}>Xóa</button>", isCorrect: true },
        { text: "C. <button onClick={handleClick.bind(id)}>Xóa</button>", isCorrect: false },
        { text: "D. <button onClick=handleClick(id)>Xóa</button>", isCorrect: false },
      ],
      explanation: "Chính xác! Bọc trong một hàm mũi tên ẩn danh () => handleClick(id) giúp định nghĩa hàm được giữ lại và chỉ chạy khi có hành động click thực sự."
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
          <h2 className="card-title">🎯 Thử Thách Chính Thức &amp; Câu Đố Trắc Nghiệm</h2>
          <p className="card-desc">
            Thực hành giải quyết 2 bài tập thử thách kinh điển từ tài liệu chính thức của React.dev 
            và kiểm tra kiến thức qua bộ câu hỏi trắc nghiệm.
          </p>
        </div>
      </div>

      {/* Thử thách 1 & 2 */}
      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        {/* Challenge 1 */}
        <div className="compare-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>💡</span> Thử Thách 1: Sửa Công Tắc Đèn Bị Liệt</h3>
            <span className="badge badge-event">React.dev #1</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Lỗi gốc của React.dev: Viết <code>onClick=&#123;handleClick()&#125;</code> khiến nút bị liệt.
          </p>

          <div style={{
            background: isLightOn ? '#fef08a' : '#0f172a',
            color: isLightOn ? '#854d0e' : '#94a3b8',
            padding: '2rem',
            borderRadius: '12px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {isLightOn ? '💡' : '🌑'}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
              Đèn đang: {isLightOn ? 'BẬT SÁNG' : 'TẮT TỐI'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', alignItems: 'center' }}>
            <button
              className="btn-primary"
              onClick={useBrokenCode ? undefined : handleLightClick}
            >
              Bấm Bật/Tắt Đèn 💡
            </button>
            <label style={{ fontSize: '0.85rem', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input
                type="checkbox"
                checked={useBrokenCode}
                onChange={(e) => setUseBrokenCode(e.target.checked)}
              />
              Mô phỏng viết sai <code>handleClick()</code>
            </label>
          </div>
        </div>

        {/* Challenge 2 */}
        <div className="compare-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>🎨</span> Thử Thách 2: Đổi Màu Không Tăng Nhầm Clicks</h3>
            <span className="badge badge-react">React.dev #2</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Sự kiện đổi màu không được phép làm tăng bộ đếm click của khung trang bên ngoài.
          </p>

          <div
            onClick={() => setPageClicks((c) => c + 1)}
            style={{
              background: currentColor,
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px dashed rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              🖼️ Khung Nền Trang (Đã click vùng nền: {pageClicks} lần)
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', marginBottom: '1rem' }}>
              Bấm vào khoảng trống này sẽ tăng số lần click nền.
            </p>

            <button
              className="btn-primary"
              onClick={handleColorChange}
              style={{ background: '#ffffff', color: '#0f172a' }}
            >
              Đổi Màu Nền (Có stopPropagation) 🎨
            </button>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '0.85rem', color: '#9ca3af', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input
                type="checkbox"
                checked={useStopPropagation}
                onChange={(e) => setUseStopPropagation(e.target.checked)}
              />
              Sử dụng <code>e.stopPropagation()</code> khi bấm nút đổi màu
            </label>
          </div>
        </div>
      </div>

      {/* Quiz trắc nghiệm */}
      <h3 style={{ fontSize: '1.25rem', color: '#f59e0b', marginBottom: '1rem' }}>
        📝 Trắc Nghiệm Củng Cố Kiến Thức
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
                        borderColor: !showResults && selected === idx ? '#f59e0b' : undefined,
                        background: !showResults && selected === idx ? 'rgba(245, 158, 11, 0.2)' : undefined
                      }}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className={`quiz-feedback ${q.options[selected]?.isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                  <strong>{q.options[selected]?.isCorrect ? '🎉 Chính xác!' : '⚠️ Giải thích:'}</strong> {q.explanation}
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
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.75rem' }}>
              Điểm của bạn: {calculateScore()} / {questions.length}
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
