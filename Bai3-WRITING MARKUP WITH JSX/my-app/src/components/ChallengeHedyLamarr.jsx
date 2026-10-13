// ============================================================================
// FILE: src/components/ChallengeHedyLamarr.jsx
// MỤC TIÊU: Lời Giải Tương Tác Thử Thách 1 từ react.dev
//           "Chuyển đổi mã HTML tiểu sử Hedy Lamarr sang JSX"
// ============================================================================

import React, { useState } from 'react';

export default function ChallengeHedyLamarr() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Phát minh đèn tín hiệu giao thông kiểu mới (Invent new traffic lights)", done: true },
    { id: 2, text: "Tập dượt một phân cảnh phim điện ảnh (Rehearse a movie scene)", done: false },
    { id: 3, text: "Cải tiến công nghệ nhảy tần số sóng vô tuyến (Improve the spectrum technology - nền tảng Wi-Fi)", done: true }
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="hedy-challenge-container">
      <div className="challenge-header">
        <span className="challenge-tag">🏆 Thử Thách Chính Thức react.dev</span>
        <h2>Thử Thách: Danh Sách Công Việc Của Hedy Lamarr</h2>
        <p>
          Hedy Lamarr là một nữ diễn viên kiêm nhà phát minh vĩ đại. Đoạn mã HTML ban đầu trong tài liệu gặp 3 lỗi 
          (nhiều thẻ gốc, thẻ <code>&lt;img&gt;</code> chưa đóng, và thuộc tính <code>class</code>).
        </p>
      </div>

      <div className="hedy-content-grid">
        {/* Cột 1: Mã nguồn giải pháp chuẩn */}
        <div className="code-card">
          <div className="code-card-top">
            <strong>Mã Nguồn JSX Sau Khi Chuẩn Hóa</strong>
            <span className="lang-pill">JSX</span>
          </div>
          <pre className="code-box">
{`export default function TodoList() {
  return (
    // 1. Bọc tất cả trong Fragment <>...</>
    <>
      <h1>Hedy Lamarr's Todos</h1>
      
      {/* 2. Đổi class thành className & tự đóng thẻ /> */}
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      
      {/* 3. Đóng đầy đủ các thẻ <li></li> */}
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}`}
          </pre>
        </div>

        {/* Cột 2: Giao diện trực tiếp */}
        <div className="live-preview-card">
          <div className="preview-top">
            <strong>Giao Diện Hoạt Động Trực Tiếp</strong>
            <span className="badge-live">LIVE RENDER</span>
          </div>

          <div className="hedy-profile-box">
            <h3 className="hedy-title">Danh Sách Việc Cần Làm Của Hedy Lamarr</h3>
            
            <div className="hedy-avatar-wrap">
              <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                className="hedy-photo"
              />
              <div className="hedy-info">
                <h4>Hedy Lamarr (1914 – 2000)</h4>
                <p>Nữ diễn viên Hollywood & Đồng sáng chế công nghệ trải phổ nhảy tần (tiền thân của Wi-Fi, Bluetooth và GPS).</p>
              </div>
            </div>

            <div className="hedy-todo-list">
              <h5>Nhiệm Vụ Đang Thực Hiện:</h5>
              <ul>
                {todos.map(todo => (
                  <li 
                    key={todo.id} 
                    className={`todo-item ${todo.done ? 'completed' : ''}`}
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <input 
                      type="checkbox" 
                      checked={todo.done} 
                      onChange={() => toggleTodo(todo.id)} 
                    />
                    <span>{todo.text}</span>
                  </li>
                ))}
              </ul>
              <small className="hint-text">💡 Bạn có thể nhấp vào từng mục để đánh dấu hoàn thành công việc!</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
