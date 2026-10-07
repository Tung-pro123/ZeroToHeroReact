// ==========================================================================
// CẦU NỐI KIẾN TRÚC: SPRING BOOT & JAVA STREAM API VS REACT RENDERING LISTS
// ==========================================================================
import React from 'react';
import Card from '../common/Card';

export default function SpringListAnalogy() {
  return (
    <Card
      title="Cầu Nối Kiến Trúc: Java Stream API & Spring Boot vs React"
      subtitle="Bản đồ so sánh tư duy xử lý danh sách giữa Backend Java (Streams, JPA @Id) và Frontend React (map, key)"
      icon="☕"
    >
      {/* Bảng so sánh tổng quan */}
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Tiêu chí</th>
              <th>Java / Spring Boot Backend</th>
              <th>React Frontend (Virtual DOM)</th>
              <th>Bản chất kiến trúc</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Lọc danh sách</strong></td>
              <td><code>{'list.stream().filter(item -> ...)'}</code></td>
              <td><code>{'list.filter(item => ...)'}</code></td>
              <td>Cùng nhận hàm Predicate kiểm tra điều kiện trả về boolean.</td>
            </tr>
            <tr>
              <td><strong>Biến đổi phần tử</strong></td>
              <td><code>{'.map(item -> new DTO(item))'}</code></td>
              <td><code>{'.map(item => <Card key={item.id} />)'}</code></td>
              <td>Ánh xạ từng phần tử thành một đối tượng mới (Java DTO ↔ React JSX Node).</td>
            </tr>
            <tr>
              <td><strong>Định danh duy nhất</strong></td>
              <td>JPA Entity <code>@Id</code> / Primary Key / UUID</td>
              <td>Thuộc tính <code>{'key={entity.id}'}</code></td>
              <td>JPA dùng ID để quản lý First-Level Cache; React dùng key để đối soát Virtual DOM.</td>
            </tr>
            <tr>
              <td><strong>Template lặp thẻ</strong></td>
              <td>Thymeleaf <code>{'th:each="item : ${items}"'}</code></td>
              <td>JavaScript <code>{'{items.map(item => ...)}'}</code></td>
              <td>Thymeleaf sinh HTML tĩnh trên Server; React duy trì danh sách động có state trên Client.</td>
            </tr>
            <tr>
              <td><strong>Thu thập kết quả</strong></td>
              <td><code>{'.collect(Collectors.toList())'}</code></td>
              <td>Mảng JSX tự động nhả ra (Direct Array)</td>
              <td>React cho phép render mảng các thẻ JSX trực tiếp vào cây DOM.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* So sánh Side-by-Side mã nguồn */}
      <div className="grid-2-cols" style={{ marginTop: '1.5rem' }}>
        {/* Cột 1: Java Spring Boot */}
        <div className="pitfall-container">
          <span style={{ fontWeight: '700', color: '#86efac' }}>
            🍃 1. Java Stream API & JPA (Backend):
          </span>
          <pre className="code-preview" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
{`// Trong Spring Boot Service:
public List<ScientistDTO> getChemists() {
    return scientistRepository.findAll()
        .stream()
        // 1. Lọc điều kiện
        .filter(s -> "chemist".equals(s.getProfession()))
        // 2. Chuyển đổi thành DTO
        .map(s -> new ScientistDTO(
            s.getId(), // Primary Key @Id
            s.getName(),
            s.getAccomplishment()
        ))
        // 3. Thu thập danh sách
        .collect(Collectors.toList());
}`}
          </pre>
        </div>

        {/* Cột 2: React JSX */}
        <div className="pitfall-container">
          <span style={{ fontWeight: '700', color: '#93c5fd' }}>
            ⚛️ 2. React List Transformation (Frontend):
          </span>
          <pre className="code-preview" style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
{`// Trong React Component:
export default function ScientistList({ scientists }) {
  // 1. Lọc điều kiện
  const chemists = scientists.filter(
    s => s.profession === 'chemist'
  );

  // 2. Chuyển đổi thành mảng JSX
  return (
    <ul>
      {chemists.map(s => (
        // 3. Dùng Primary Key làm key
        <ScientistCard
          key={s.id} // Bắt buộc!
          {...s}
        />
      ))}
    </ul>
  );
}`}
          </pre>
        </div>
      </div>

      {/* Bảng xếp hạng nguồn Key chuẩn doanh nghiệp */}
      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ color: 'var(--color-text-main)', marginBottom: '0.75rem' }}>
          🏆 Bảng Xếp Hạng Nguồn Lấy Key Chuẩn Enterprise:
        </h4>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Nguồn cung cấp Key</th>
                <th>Mức độ an toàn</th>
                <th>Đánh giá kiến trúc</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Primary Key từ Database (id / UUID)</strong></td>
                <td><span style={{ color: 'var(--color-success)' }}>⭐⭐⭐⭐⭐ Tuyệt đối an toàn</span></td>
                <td>Chuẩn mực cao nhất, bền vững qua mọi thao tác lọc, xóa, đảo thứ tự.</td>
              </tr>
              <tr>
                <td><strong>Hàm <code>crypto.randomUUID()</code></strong></td>
                <td><span style={{ color: 'var(--color-success)' }}>⭐⭐⭐⭐⭐ Tuyệt đối an toàn</span></td>
                <td>Sinh 1 lần duy nhất lúc khởi tạo Object mới trong state.</td>
              </tr>
              <tr>
                <td><strong>Chuỗi tự nhiên duy nhất (Slug, Email, Code)</strong></td>
                <td><span style={{ color: 'var(--color-cyan)' }}>⭐⭐⭐⭐ Rất an toàn</span></td>
                <td>Tốt nếu dữ liệu đảm bảo không bao giờ bị trùng lặp.</td>
              </tr>
              <tr>
                <td><strong>Chỉ số mảng (index)</strong></td>
                <td><span style={{ color: 'var(--color-warning)' }}>⚠️ Thận trọng</span></td>
                <td>Chỉ chấp nhận cho danh sách tĩnh hoàn toàn (không thêm, xóa, sắp xếp).</td>
              </tr>
              <tr>
                <td><strong><code>Math.random()</code> trong hàm map()</strong></td>
                <td><span style={{ color: 'var(--color-danger)' }}>❌ Nghiêm cấm hoàn toàn</span></td>
                <td>Phá vỡ Virtual DOM, gây mất focus form và tụt hiệu năng nghiêm trọng.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
