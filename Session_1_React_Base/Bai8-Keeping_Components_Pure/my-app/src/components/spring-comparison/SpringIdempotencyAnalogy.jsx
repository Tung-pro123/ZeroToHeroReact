// ========================================================================================
// FILE: src/components/spring-comparison/SpringIdempotencyAnalogy.jsx
// ========================================================================================
// MỤC TIÊU: CẦU NỐI TƯ DUY: SPRING BOOT IDEMPOTENCE (TÍNH BẤT BIẾN) & REACT PURITY
// ========================================================================================

import Card from '../common/Card';

export default function SpringIdempotencyAnalogy() {
  const comparisons = [
    {
      concept: "Bản chất tính tinh khiết",
      spring: "HTTP GET Idempotent: Gọi 1 lần hay 100 lần với cùng tham số đều trả về cùng JSON, không làm đổi dữ liệu DB",
      react: "Pure Component: Truyền cùng Props thì gọi 1 hay 10 lần đều trả về cùng cây JSX",
      moral: "Hàm đọc/tính toán (Read/Calculation) tuyệt đối không được gây đột biến dữ liệu ngầm."
    },
    {
      concept: "Thảm họa biến toàn cục",
      spring: "Khai báo biến 'static int count = 0' trong Singleton @Service: Gây Race Condition lỗi đa luồng khi nhiều request gọi tới",
      react: "Khai báo biến 'let count = 0' ngoài hàm Component: Gây ô nhiễm bộ nhớ, render nhảy số loạn xạ trong StrictMode",
      moral: "Singleton Bean và Component đều phải là Stateless (Không lưu trạng thái khả biến tự do)."
    },
    {
      concept: "Tác dụng phụ (Side Effect)",
      spring: "Chỉ được thực hiện trong @PostMapping, @PutMapping hoặc @Transactional Service method khi có yêu cầu cụ thể",
      react: "Chỉ được thực hiện trong Event Handlers (onClick) hoặc useEffect sau khi vẽ xong giao diện",
      moral: "Tách bạch tuyệt đối pha tính toán (Pure) và pha thay đổi thế giới thật (Mutation)."
    },
    {
      concept: "Thao tác mảng",
      spring: "Java 8 Stream API: list.stream().filter(...).map(...).toList() (Tạo list mới, không sửa list gốc)",
      react: "ES6 Immutable Arrays: [...list].filter(...).map(...) (Tạo array mới, không dùng push/splice)",
      moral: "Lập trình hàm (Functional Programming) luôn ưu tiên dữ liệu bất biến (Immutability)."
    }
  ];

  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill accent">Bản Đồ Tư Duy Dành Cho Spring Boot Developer</span>
        <h2 className="section-title">Đối Chiếu Kiến Trúc: Spring Boot & React Purity</h2>
        <p className="section-desc">
          Tận dụng nguyên lý thiết kế Idempotent và Stateless Service trong Spring Boot để làm chủ 
          tính tinh khiết của React.
        </p>
      </div>

      <div className="spring-table-wrapper">
        <table className="pure-table">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Khái niệm</th>
              <th style={{ width: '35%' }}>🌱 Spring Boot (Backend)</th>
              <th style={{ width: '35%' }}>⚛️ React (Frontend)</th>
              <th style={{ width: '10%' }}>Nguyên lý cốt lõi</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((item, idx) => (
              <tr key={idx}>
                <td className="font-semibold text-primary">{item.concept}</td>
                <td className="code-text spring-cell">
                  <code>{item.spring}</code>
                </td>
                <td className="code-text react-cell">
                  <code>{item.react}</code>
                </td>
                <td className="text-muted explanation-cell">{item.moral}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Card title="🚀 Bài Học Doanh Nghiệp (Senior Code Review Standards)" variant="indigo">
        <ul className="senior-rules-list">
          <li>
            <strong>1. Component là Công Thức Toán Học:</strong> Xem mỗi component như một hàm toán <code>y = f(x)</code>. 
            Nếu cùng một trang profile mà F5 lại 3 lần ra 3 giao diện khác nhau vì biến rò rỉ, đó là bug nghiêm trọng.
          </li>
          <li>
            <strong>2. Tuyệt Đối Không Sửa DOM Trực Tiếp:</strong> Đừng bao giờ viết <code>document.getElementById()</code> trong thân component. 
            Mọi thuộc tính (class, style, text) phải được tính toán và đưa vào JSX.
          </li>
          <li>
            <strong>3. Stream / Immutable First:</strong> Giống như không ai dùng <code>list.remove()</code> khi đang duyệt for trong Java, 
            trong React luôn dùng <code>filter()</code>, <code>map()</code>, <code>slice()</code> để đảm bảo an toàn bộ nhớ.
          </li>
        </ul>
      </Card>
    </div>
  );
}
