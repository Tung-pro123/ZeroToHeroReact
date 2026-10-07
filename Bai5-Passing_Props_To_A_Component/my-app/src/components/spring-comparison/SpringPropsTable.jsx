// ========================================================================================
// FILE: src/components/spring-comparison/SpringPropsTable.jsx
// ========================================================================================
// MỤC TIÊU: CẦU NỐI KIẾN TRÚC TỪ BACKEND SPRING BOOT SANG REACT PROPS
// ========================================================================================

import Card from '../common/Card';

export default function SpringPropsTable() {
  const comparisons = [
    {
      concept: "Bản chất truyền tham số",
      spring: "Phương thức nhận tham số hoặc DTO: public String render(UserDTO dto, int size)",
      react: "Component nhận duy nhất 1 đối tượng Props: function User({ person, size })",
      note: "Cả hai đều đóng gói dữ liệu đầu vào thành một khối độc lập (Decoupling)."
    },
    {
      concept: "Giá trị mặc định (Default)",
      spring: "@RequestParam(defaultValue = \"100\") int size",
      react: "function Avatar({ size = 100 }) (ES6 Default Parameter)",
      note: "Bảo đảm an toàn chống NullPointer / undefined khi bên ngoài quên truyền."
    },
    {
      concept: "Tính bất biến (Immutability)",
      spring: "Java Record: public record UserDTO(...) hoặc các trường private final",
      react: "Props là Read-Only Snapshot! Tuyệt đối không có hàm setter sửa đổi props.",
      note: "Bảo đảm luồng dữ liệu một chiều (Unidirectional data flow) minh bạch, dễ dự đoán."
    },
    {
      concept: "Khung giao diện (children)",
      spring: "Thymeleaf Layout Decorator (layout:fragment=\"content\") hoặc Decorator Pattern",
      react: "Prop đặc biệt children: nhúng thẳng mã JSX vào giữa <Card>...</Card>",
      note: "Tuân thủ triệt để nguyên lý Open/Closed (OCP) trong SOLID."
    },
    {
      concept: "Vấn đề Prop Drilling",
      spring: "Chuyền tham số qua quá nhiều tầng Service/Method trung gian",
      react: "Phải truyền Prop qua quá nhiều tầng Component con (Giải pháp: dùng children hoặc Context)",
      note: "Kỹ thuật dùng children giúp đưa Component con trực tiếp vào Cha, cắt đứt dây chuyền trung gian."
    }
  ];

  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill accent">Bản Đồ Tư Duy Chuyên Sâu</span>
        <h2 className="section-title">Đối Chiếu Kiến Trúc: Java / Spring Boot & React Props</h2>
        <p className="section-desc">
          So sánh trực quan các mẫu thiết kế (Design Patterns) quen thuộc ở Backend với hệ thống Props của React.
        </p>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{ width: '18%' }}>Khía cạnh</th>
              <th style={{ width: '36%' }}>🌱 Spring Boot / Java</th>
              <th style={{ width: '36%' }}>⚛️ React Props</th>
              <th style={{ width: '10%' }}>Tư duy cốt lõi</th>
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
                <td className="text-muted explanation-cell">{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Card title="🚀 Bí Quyết Doanh Nghiệp (Clean Code Review)" variant="indigo">
        <ul className="clean-code-list">
          <li>
            <strong>Tránh Prop Drilling bằng Children:</strong> Nếu component A chứa B, B chứa C, C chứa D, và chỉ có D cần dữ liệu <code>user</code>, 
            thay vì truyền <code>user</code> qua 4 tầng, hãy tạo D ngay tại A và truyền D như là <code>children</code> của B và C!
          </li>
          <li>
            <strong>Prop Names Rõ Ràng:</strong> Đặt tên Props gợi tả ý nghĩa (như <code>imageSize</code> thay vì chỉ đặt <code>size</code> nếu có nhiều kích thước).
          </li>
          <li>
            <strong>Destructuring Ngay Tại Tham Số Hàm:</strong> Luôn bóc tách <code>{`{ name, size }`}</code> ngay tại đầu hàm để người đọc code biết ngay component này cần những thuộc tính nào.
          </li>
        </ul>
      </Card>
    </div>
  );
}
