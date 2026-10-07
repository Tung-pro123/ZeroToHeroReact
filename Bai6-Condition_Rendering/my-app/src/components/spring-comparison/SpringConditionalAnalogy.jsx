// ==========================================================================
// KIẾN TRÚC ĐỐI CHIẾU: SPRING BOOT & THYMELEAF VS REACT CONDITIONAL RENDERING
// ==========================================================================
import React from 'react';
import Card from '../common/Card';

export default function SpringConditionalAnalogy() {
  return (
    <Card
      title="Cầu nối kiến trúc: Spring Boot / Thymeleaf vs React"
      subtitle="Bản đồ so sánh tư duy xử lý điều kiện giữa Backend Java và Frontend React hiện đại"
      icon="☕"
    >
      {/* Bảng so sánh tổng quan */}
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Tiêu chí</th>
              <th>Spring Boot / Thymeleaf (Backend SSR)</th>
              <th>React (Client-Side Virtual DOM)</th>
              <th>Nguyên lý tương đương</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Cú pháp rẽ nhánh</strong></td>
              <td><code>th:if="${isPacked}"</code><br /><code>th:unless="${isPacked}"</code></td>
              <td><code>{isPacked && &lt;Badge /&gt;}</code><br /><code>{isPacked ? &lt;A /&gt; : &lt;B /&gt;}</code></td>
              <td>Thymeleaf dùng DSL template riêng; React dùng 100% JavaScript gốc.</td>
            </tr>
            <tr>
              <td><strong>Ẩn hoàn toàn giao diện</strong></td>
              <td>Không render thẻ HTML hoặc trả về <code>ResponseEntity.noContent()</code></td>
              <td><code>return null;</code> trong component con</td>
              <td>Không có DOM Node nào được sinh ra trên trình duyệt.</td>
            </tr>
            <tr>
              <td><strong>Toán tử &&</strong></td>
              <td>Bắt buộc kiểu <code>boolean</code> (Biên dịch lỗi nếu truyền <code>int</code>)</td>
              <td>Short-circuit evaluation: Trả về giá trị của toán hạng cuối cùng (Gây bẫy số 0)</td>
              <td>Trong Java <code>&&</code> trả về boolean; trong JS <code>&&</code> trả về operand value!</td>
            </tr>
            <tr>
              <td><strong>Switch / Case nhiều nhánh</strong></td>
              <td><code>th:switch="${drink}"</code><br /><code>th:case="'tea'"</code></td>
              <td>Object Dictionary: <code>drinks[name]</code> hoặc Strategy Map Pattern</td>
              <td>Data Dictionary / Map Lookup O(1) thay vì lồng nhiều if/else/ternary.</td>
            </tr>
            <tr>
              <td><strong>Xử lý dữ liệu DTO</strong></td>
              <td>Gán Model Attribute trong Controller: <code>model.addAttribute("user", dto)</code></td>
              <td>Truyền qua Props: <code>&lt;UserProfile user={userDto} /&gt;</code></td>
              <td>Dữ liệu được đẩy từ ngoài vào; component chỉ lo việc biểu diễn.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* So sánh mã nguồn trực quan Side-by-Side */}
      <div className="grid-2-cols" style={{ marginTop: '1.5rem' }}>
        {/* Cột 1: Mã nguồn Spring Boot Thymeleaf */}
        <div className="pitfall-card">
          <div className="pitfall-title">
            <span style={{ color: '#86efac' }}>🍃 Spring Boot / Thymeleaf (Java)</span>
            <span className="badge badge-success">SERVER-SIDE</span>
          </div>
          <pre className="code-preview" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
{`<!-- 1. Điều kiện 1 chiều: th:if -->
<span th:if="\${user.isVip}" class="badge">
    VIP MEMBER 👑
</span>

<!-- 2. Điều kiện 2 chiều: th:if / th:unless -->
<li th:classappend="\${item.packed} ? 'packed' : ''">
    <span th:if="\${item.packed}">
        <del th:text="\${item.name} + ' ✅'"></del>
    </span>
    <span th:unless="\${item.packed}" 
          th:text="\${item.name}"></span>
</li>

<!-- 3. Tra cứu nhiều nhánh (Switch/Case) -->
<div th:switch="\${drink.type}">
    <p th:case="'tea'">Trà lá tự nhiên</p>
    <p th:case="'coffee'">Cà phê hạt</p>
    <p th:case="*">Đồ uống khác</p>
</div>`}
          </pre>
        </div>

        {/* Cột 2: Mã nguồn React JSX tương đương */}
        <div className="pitfall-card">
          <div className="pitfall-title">
            <span style={{ color: '#93c5fd' }}>⚛️ React (JavaScript JSX)</span>
            <span className="badge badge-info">CLIENT-SIDE</span>
          </div>
          <pre className="code-preview" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
{`// 1. Điều kiện 1 chiều: Toán tử &&
{user.isVip && (
  <span className="badge">VIP MEMBER 👑</span>
)}

// 2. Điều kiện 2 chiều: Toán tử 3 ngôi (? :)
<li className={item.packed ? 'packed' : ''}>
  {item.packed ? (
    <del>{item.name} ✅</del>
  ) : (
    <span>{item.name}</span>
  )}
</li>

// 3. Tra cứu nhiều nhánh: Object Dictionary Map
const drinkDescriptions = {
  tea: 'Trà lá tự nhiên',
  coffee: 'Cà phê hạt',
};
<p>{drinkDescriptions[drink.type] || 'Đồ uống khác'}</p>`}
          </pre>
        </div>
      </div>

      {/* Lời khuyên vàng dành cho Java Developer làm React */}
      <div className="callout-box" style={{ marginTop: '1.5rem' }}>
        <div className="callout-title">
          <span>💎 3 NGUYÊN TẮC VÀNG CHO JAVA FULLSTACK DEVELOPER TRONG REACT:</span>
        </div>
        <div className="callout-desc">
          <strong>1. Luôn bảo vệ toán tử <code>&&</code>:</strong> Đừng bao giờ viết <code>{`{items.length && <List />}`}</code>. Hãy luôn viết <code>{`{items.length > 0 && <List />}`}</code> để không bao giờ bị lộ số 0 ra màn hình người dùng.<br />
          <strong>2. Khi có &gt; 2 nhánh điều kiện lồng nhau, đừng lồng ternary:</strong> Toán tử <code>a ? b : c ? d : e</code> rất khó đọc và dễ sinh bug. Hãy refactor thành <strong>Object Dictionary / Strategy Map</strong> (như bài thử thách số 3).<br />
          <strong>3. Trả về <code>null</code> để ẩn component:</strong> Giúp bạn giữ logic điều kiện ẩn/hiện nằm ngay trong component con khi cần thiết, tương tự như việc trả về empty response trong backend.
        </div>
      </div>
    </Card>
  );
}
