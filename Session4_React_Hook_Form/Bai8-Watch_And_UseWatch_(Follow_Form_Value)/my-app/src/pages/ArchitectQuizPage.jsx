import React, { useState } from "react";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Khi nào bạn NÊN sử dụng getValues() thay vì watch()?",
    options: [
      "Khi cần hiển thị thanh đo độ mạnh mật khẩu realtime lúc người dùng đang gõ.",
      "Khi cần kiểm tra dữ liệu tại thời điểm bấm nút (onClick/onSubmit) hoặc validation cross-field thụ động, không cần bất kỳ re-render nào.",
      "Khi muốn hiển thị các trường nhập liệu có điều kiện (Conditional UI).",
      "Khi muốn lắng nghe sự thay đổi của một ô input để cập nhật state toàn cục.",
    ],
    correctIndex: 1,
    explanation:
      "getValues() là một Snapshot (đọc giá trị tức thì từ ref cache). Nó hoàn toàn không trigger re-render. Do đó nó hoàn hảo cho thời điểm click nút hoặc submit đơn hàng.",
  },
  {
    id: 2,
    question:
      "Bản chất cơ chế tối ưu của useWatch({ control, name }) so với watch() cấp cha là gì?",
    options: [
      "useWatch() chạy trong Web Worker tách biệt khỏi luồng chính của trình duyệt.",
      "useWatch() tự động ghi đè Virtual DOM của React mà không cần re-render.",
      "useWatch() đăng ký subscription trực tiếp qua RHF Subject vào Component con, cô lập re-render chỉ ở component đó mà không làm re-render Component cha.",
      "useWatch() lưu giá trị form vào sessionStorage để tái sử dụng.",
    ],
    correctIndex: 2,
    explanation:
      "useWatch() là giải pháp Render Isolation: thông qua prop control, chỉ component nào gọi useWatch() mới re-render khi trường trong danh sách name thay đổi. Component Form cha giữ nguyên số lượt render.",
  },
  {
    id: 3,
    question:
      "Cần tính toán điểm độ mạnh mật khẩu và số ký tự mô tả từ ô input. Cách triển khai nào sau đây là Best Practice chuẩn Senior?",
    options: [
      'Dùng watch("password") và sync vào useState qua useEffect: useEffect(() => { setStrength(calc(pwd)) }, [pwd]).',
      'Dùng watch("password") và tính toán trực tiếp: const strength = calc(password) ngay trong body của component (Derived State).',
      "Dùng dirtyFields.password để kiểm tra xem đã nhập chưa.",
      'Dùng setInterval định kỳ 100ms gọi getValues("password") để cập nhật state.',
    ],
    correctIndex: 1,
    explanation:
      "KHÔNG BAO GIỜ đồng bộ watch() vào useState qua useEffect! Việc tính toán trực tiếp (Derived State in Render) giúp code gọn gàng, tránh render lặp x2 và luôn đồng bộ tức thì với render phase.",
  },
  {
    id: 4,
    question:
      'Form có 3 option: "personal" (default), "company", "student". Tại sao dùng dirtyFields.accountType để hiện form Mã Số Thuế là sai lầm nghiêm trọng?',
    options: [
      "Vì dirtyFields chỉ lưu giá trị kiểu number.",
      'Vì dirtyFields chỉ đại diện cho Metadata ("giá trị có khác default không?"). Khi chọn "student", dirtyFields vẫn là true, dẫn đến form hiển thị sai mục Doanh nghiệp cho sinh viên.',
      "Vì dirtyFields chỉ hoạt động với input checkbox, không hoạt động với select dropdown.",
      "Vì RHF v7 đã deprecated hoàn toàn thuộc tính dirtyFields.",
    ],
    correctIndex: 1,
    explanation:
      "dirtyFields là boolean metadata (có bị bẩn so với defaultValues không). Khi có từ 3 lựa chọn trở lên, chọn lựa chọn thứ 3 vẫn khiến dirtyFields = true. Muốn kiểm tra chính xác người dùng đang chọn gì, BẮT BUỘC phải dùng watch() để đọc VALUE.",
  },
  {
    id: 5,
    question:
      "Để ghi nhận telemetry analytics âm thầm gửi log lên server mỗi khi form thay đổi mà KHÔNG gây re-render UI, giải pháp nào chuẩn nhất?",
    options: [
      "Gọi watch() không đối số ở đầu component cha.",
      "Đăng ký callback subscription qua watch((values, { name }) => logApi(name)) trong useEffect, và nhớ trả về hàm unsubscribe.",
      "Dùng useWatch() bọc trong toàn bộ 50 component con.",
      "Chặn sự kiện onChange native trên từng thẻ input bằng preventDefault.",
    ],
    correctIndex: 1,
    explanation:
      "watch((data, { name, type }) => {}) kích hoạt cơ chế Observer Callback. Nó không gây bất kỳ re-render nào cho React, lý tưởng cho Auto-save âm thầm, telemetry analytics và audit trail.",
  },
];

export default function ArchitectQuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId, optionIndex) => {
    if (showResults) return; // Khóa khi đã xem kết quả
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="quiz-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <span>🎓</span> Senior Architect Certification Quiz: watch() &
              useWatch()
            </h2>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                marginTop: "0.25rem",
              }}
            >
              Kiểm tra năng lực tư duy kiến trúc quản lý form data subscription,
              render isolation và tránh các cạm bẫy hiệu năng.
            </p>
          </div>
          <span className="badge badge-purple">5 Câu Hỏi Chuyên Sâu</span>
        </div>

        {/* Quiz Progress & Score Banner */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#090d16",
            padding: "1rem",
            borderRadius: "10px",
            border: "1px solid #334155",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
              Tiến độ trả lời:{" "}
            </span>
            <strong
              style={{ color: answeredCount === 5 ? "#10b981" : "#38bdf8" }}
            >
              {answeredCount} / 5 câu
            </strong>
          </div>

          {showResults && (
            <div>
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: score >= 4 ? "#34d399" : "#f59e0b",
                }}
              >
                🎉 Điểm số của bạn: {score} / 5 ({Math.round((score / 5) * 100)}
                %)
              </span>
              <span
                style={{
                  marginLeft: "0.5rem",
                  fontSize: "0.85rem",
                  color: "#94a3b8",
                }}
              >
                {score === 5
                  ? "— Cấp Độ Senior Architect Đỉnh Cao!"
                  : score >= 3
                    ? "— Đạt Tiêu Chuẩn Nắm Vững!"
                    : "— Cần Xem Lại Lab 1-3!"}
              </span>
            </div>
          )}

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {!showResults ? (
              <button
                type="button"
                className="btn btn-primary"
                disabled={answeredCount < 5}
                onClick={() => setShowResults(true)}
              >
                <span>Nộp Bài & Chấm Điểm</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
              >
                <span>🔄 Làm Lại Bài Quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Questions list */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {QUIZ_QUESTIONS.map((q, idx) => {
            const userAnswer = selectedAnswers[q.id];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                style={{
                  background: "#090d16",
                  padding: "1.25rem",
                  borderRadius: "10px",
                  border: "1px solid #334155",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "0.85rem",
                  }}
                >
                  <span style={{ color: "#38bdf8", fontWeight: "bold" }}>
                    Câu {idx + 1}:
                  </span>
                  <span style={{ color: "#f8fafc", fontWeight: 600 }}>
                    {q.question}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {q.options.map((opt, optIdx) => {
                    let optionClass = "quiz-option";
                    if (userAnswer === optIdx) {
                      optionClass += " selected";
                    }
                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionClass += " correct";
                      } else if (userAnswer === optIdx && !isCorrect) {
                        optionClass += " incorrect";
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        className={optionClass}
                        onClick={() => handleSelect(q.id, optIdx)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontWeight: "bold",
                              color: "#94a3b8",
                            }}
                          >
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation when submitted */}
                {showResults && (
                  <div
                    style={{
                      marginTop: "0.75rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "6px",
                      background: isCorrect
                        ? "rgba(16, 185, 129, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                      borderLeft: `4px solid ${isCorrect ? "#10b981" : "#ef4444"}`,
                      fontSize: "0.85rem",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        color: isCorrect ? "#34d399" : "#f87171",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {isCorrect ? "✅ Chính xác!" : "❌ Chưa chính xác!"}
                    </div>
                    <div style={{ color: "#cbd5e1" }}>{q.explanation}</div>
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
