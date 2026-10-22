// ==========================================================================
// PHÒNG THÍ NGHIỆM TƯƠNG TÁC: CÁC CẠM BẪY CHÍ MẠNG KHI DÙNG KEY
// ==========================================================================
import React, { useState } from 'react';
import Card from '../common/Card';

export default function KeyPitfallsLab() {
  // 1. State danh sách Todo cho thử nghiệm Cạm bẫy Index
  const [indexTodos, setIndexTodos] = useState([
    { id: 'task-101', title: 'Học Spring Data JPA' },
    { id: 'task-102', title: 'Viết Unit Test JUnit 5 & Mockito' },
    { id: 'task-103', title: 'Xây dựng UI với React Virtual DOM' },
  ]);

  const [idTodos, setIdTodos] = useState([
    { id: 'task-101', title: 'Học Spring Data JPA' },
    { id: 'task-102', title: 'Viết Unit Test JUnit 5 & Mockito' },
    { id: 'task-103', title: 'Xây dựng UI với React Virtual DOM' },
  ]);

  // 2. State cho thử nghiệm Math.random()
  const [randomItems, setRandomItems] = useState([
    { id: 'item-1', label: 'Tên người dùng' },
    { id: 'item-2', label: 'Email công ty' },
  ]);
  const [textVal, setTextVal] = useState('');

  // Hàm xóa phần tử đầu tiên của mảng index
  const deleteFirstIndexTodo = () => {
    setIndexTodos((prev) => prev.slice(1));
  };

  // Hàm xóa phần tử đầu tiên của mảng ID
  const deleteFirstIdTodo = () => {
    setIdTodos((prev) => prev.slice(1));
  };

  // Reset lại danh sách
  const resetTodos = () => {
    const initial = [
      { id: 'task-101', title: 'Học Spring Data JPA' },
      { id: 'task-102', title: 'Viết Unit Test JUnit 5 & Mockito' },
      { id: 'task-103', title: 'Xây dựng UI với React Virtual DOM' },
    ];
    setIndexTodos(initial);
    setIdTodos(initial);
  };

  return (
    <Card
      title="Phòng Thí Nghiệm Trực Quan: 2 Cạm Bẫy Chí Mạng Của Key"
      subtitle="Trải nghiệm lỗi sai lệch dữ liệu input khi dùng key={index} và lỗi mất focus khi dùng key={Math.random()}"
      icon="🧪"
    >
      {/* KHU VỰC 1: CẠM BẪY INDEX KHI XÓA / ĐỔI THỨ TỰ */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-text-main)' }}>
              1. Cạm bẫy: Dùng chỉ số mảng làm key (<code>{'key={index}'}</code>)
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              👉 <strong>Cách thử nghiệm:</strong> Gõ ghi chú vào ô input của dòng 1 (ví dụ: "ĐANG LÀM DÒNG 1"), sau đó nhấn nút <strong>"Xóa dòng 1"</strong> ở cả 2 cột!
            </p>
          </div>
          <button className="toggle-btn" onClick={resetTodos}>
            🔄 Khôi phục danh sách mẫu
          </button>
        </div>

        <div className="pitfall-lab-grid">
          {/* CỘT 1: DÙNG KEY = INDEX (BỊ LỖI) */}
          <div className="pitfall-container buggy">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '700', color: 'var(--color-danger)' }}>
                ❌ CỘT LỖI: Dùng key={'{index}'}
              </span>
              <button
                className="btn-action-small"
                onClick={deleteFirstIndexTodo}
                disabled={indexTodos.length === 0}
              >
                🗑️ Xóa dòng đầu
              </button>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-danger)' }}>
              🚨 Khi xóa dòng 1, chữ bạn vừa gõ sẽ bị <strong>gán nhầm sang dòng 2</strong>!
            </p>

            <div className="interactive-todo-list">
              {indexTodos.length === 0 ? (
                <p style={{ color: 'var(--color-text-subtle)', fontStyle: 'italic', fontSize: '0.85rem' }}>Danh sách trống</p>
              ) : (
                indexTodos.map((todo, index) => (
                  // ❌ SAI LẦM: DÙNG INDEX LÀM KEY TRÊN DANH SÁCH CÓ THAY ĐỔI
                  <div key={index} className="todo-item-row">
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)', width: '60px' }}>
                      index: {index}
                    </span>
                    <span style={{ fontSize: '0.85rem', flex: '1', fontWeight: '600' }}>
                      {todo.title}
                    </span>
                    {/* Uncontrolled input để thấy rõ sự sai lệch Virtual DOM */}
                    <input
                      type="text"
                      className="todo-item-input"
                      placeholder="Gõ thử vào đây..."
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CỘT 2: DÙNG KEY = ID (CHUẨN XÁC) */}
          <div className="pitfall-container correct">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '700', color: 'var(--color-success)' }}>
                ✅ CỘT CHUẨN: Dùng key={'{todo.id}'}
              </span>
              <button
                className="btn-action-small"
                onClick={deleteFirstIdTodo}
                disabled={idTodos.length === 0}
              >
                🗑️ Xóa dòng đầu
              </button>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-success)' }}>
              ✨ State của ô input gắn chặt với Entity ID. Dòng nào xóa thì input biến mất theo!
            </p>

            <div className="interactive-todo-list">
              {idTodos.length === 0 ? (
                <p style={{ color: 'var(--color-text-subtle)', fontStyle: 'italic', fontSize: '0.85rem' }}>Danh sách trống</p>
              ) : (
                idTodos.map((todo) => (
                  // ✅ CHUẨN MỰC: DÙNG DATABASE PRIMARY KEY ID LÀM KEY
                  <div key={todo.id} className="todo-item-row">
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', width: '60px' }}>
                      {todo.id.split('-')[1]}
                    </span>
                    <span style={{ fontSize: '0.85rem', flex: '1', fontWeight: '600' }}>
                      {todo.title}
                    </span>
                    <input
                      type="text"
                      className="todo-item-input"
                      placeholder="Gõ thử vào đây..."
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KHU VỰC 2: CẠM BẪY KEY = MATH.RANDOM() */}
      <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <h4 style={{ fontSize: '1.1rem', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
          2. Cạm bẫy: Tự sinh key ngẫu nhiên khi render (<code>{'key={Math.random()}'}</code>)
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
          👉 <strong>Cách thử nghiệm:</strong> Thử gõ 1 từ vào ô bên dưới. Bạn sẽ thấy <strong>ngay khi gõ 1 ký tự, ô input lập tức bị MẤT CON TRỎ (LOST FOCUS)</strong>! Bạn không thể gõ liên tục vì DOM bị đập đi dựng lại mỗi lần bấm phím!
        </p>

        <div className="pitfall-lab-grid">
          {/* MATH.RANDOM DEMO */}
          <div className="pitfall-container buggy">
            <span style={{ fontWeight: '700', color: 'var(--color-danger)' }}>
              ❌ DÙNG <code>{'key={Math.random()}'}</code> (BỊ MẤT FOCUS KHI GÕ):
            </span>

            {randomItems.map((item) => (
              // ❌ TAI HỌA: MỖI LẦN RENDER SINH RA 1 KEY KHÁC HOÀN TOÀN!
              <div key={Math.random()} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.label}:</label>
                <input
                  type="text"
                  className="todo-item-input"
                  value={textVal}
                  onChange={(e) => setTextVal(e.target.value)}
                  placeholder="Gõ thử chữ bất kỳ..."
                />
              </div>
            ))}
          </div>

          {/* GIẢI THÍCH NGUYÊN NHÂN */}
          <div className="callout-box" style={{ margin: 0 }}>
            <div className="callout-title">
              <span>🧠 TẠI SAO LẠI BỊ MẤT FOCUS?</span>
            </div>
            <div className="callout-desc">
              1. Mỗi khi bạn gõ 1 phím, component cập nhật state <code>textVal</code> và kích hoạt Render lại.<br />
              2. Hàm <code>map()</code> chạy lại và <code>Math.random()</code> tạo ra một chuỗi key mới toanh.<br />
              3. React đối soát Virtual DOM và thấy key cũ đã biến mất! React kết luận: <em>"Thẻ input này đã bị xóa, đây là một thẻ hoàn toàn mới"</em>.<br />
              4. Kết quả: React đập bỏ DOM node cũ và chèn DOM node mới, khiến con trỏ chuột (focus) của người dùng bị văng ra ngoài!
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
