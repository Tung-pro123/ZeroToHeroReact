// ========================================================================================
// FILE: src/components/spring-comparison/SpringVsReactComparison.jsx
// ========================================================================================
// MỤC TIÊU: CẦU NỐI TƯ DUY TỪ BACKEND SPRING BOOT SANG FRONTEND REACT
// Giúp lập trình viên Spring Boot chuyển đổi mô hình tư duy (Mental Model) mượt mà nhất.
// ========================================================================================

export default function SpringVsReactComparison() {
  const comparisonItems = [
    {
      category: "Bản chất thành phần",
      springBoot: "Class Java được đánh dấu @Component, @Service, @Controller",
      react: "Hàm JavaScript thuần (Function) trả về JSX, tên viết hoa (PascalCase)",
      explanation: "Cả hai đều là đơn vị cơ sở có tính tái sử dụng cao, độc lập và dễ kiểm thử."
    },
    {
      category: "Truyền dữ liệu vào",
      springBoot: "Tham số phương thức, DTO (Data Transfer Object) hoặc RequestBody",
      react: "Props (Properties) truyền dưới dạng thuộc tính thẻ: <Profile name='Dev' />",
      explanation: "Props đóng vai trò như DTO bất biến (Read-only) truyền từ tầng trên xuống tầng dưới."
    },
    {
      category: "Kết quả trả về",
      springBoot: "Trả về JSON (ResponseEntity<T>) hoặc View Template (ModelAndView)",
      react: "Trả về cây JSX biểu diễn cấu trúc UI (Virtual DOM Node)",
      explanation: "React Component không trực tiếp sửa DOM thật, nó trả về mô tả JSX để React tự so sánh và vẽ."
    },
    {
      category: "Quản lý vòng đời",
      springBoot: "Spring IoC Container quản lý Singleton Beans (PostConstruct, PreDestroy)",
      react: "React Reconciliation Engine quản lý Render, Commit và Component Lifecycle",
      explanation: "React gọi lại hàm component mỗi khi dữ liệu thay đổi để tính toán lại giao diện."
    },
    {
      category: "Khai báo lồng nhau",
      springBoot: "Không ai định nghĩa 1 Class/Bean nằm trong thân 1 method xử lý request",
      react: "CẢNH BÁO: Tuyệt đối không định nghĩa hàm Component con lồng trong Component cha",
      explanation: "Lồng hàm sẽ khiến con trỏ hàm bị cấp phát lại ở mỗi lượt chạy -> hủy hoại hiệu năng."
    },
    {
      category: "Kiến trúc thư mục",
      springBoot: "src/main/java/{controller, service, repository, dto, config}",
      react: "src/{components/ui, components/features, hooks, services, utils}",
      explanation: "React chia theo mô hình Component-Driven (UI Primitives kết hợp thành Feature Modules)."
    }
  ];

  return (
    <div className="spring-comparison-container">
      <div className="section-header">
        <div className="badge-pill accent">Bản Đồ Tư Duy Dành Cho Spring Boot Developer</div>
        <h2 className="section-title">Đối Chiếu Kiến Trúc: Spring Boot & React</h2>
        <p className="section-desc">
          Tận dụng nền tảng Backend vững chắc của bạn để làm chủ tư duy Component-Driven của React.
        </p>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Khía cạnh</th>
              <th style={{ width: '35%' }}>🌱 Spring Boot (Backend)</th>
              <th style={{ width: '35%' }}>⚛️ React (Frontend)</th>
              <th style={{ width: '10%' }}>Tư duy cốt lõi</th>
            </tr>
          </thead>
          <tbody>
            {comparisonItems.map((item, index) => (
              <tr key={index}>
                <td className="font-semibold text-primary">{item.category}</td>
                <td className="code-text spring-cell">
                  <code>{item.springBoot}</code>
                </td>
                <td className="code-text react-cell">
                  <code>{item.react}</code>
                </td>
                <td className="text-muted explanation-cell">{item.explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Box lời khuyên kiến trúc chuẩn doanh nghiệp */}
      <div className="enterprise-architecture-box">
        <h4>🚀 Lời khuyên vàng khi làm dự án thực tế tại Doanh nghiệp:</h4>
        <ul>
          <li>
            <strong>1 Component = 1 Trách nhiệm (Single Responsibility Principle - SRP):</strong> Giống như trong Clean Code của Java, 
            nếu một component vượt quá 150-200 dòng, hãy tách nhỏ thành các UI component con (như cách ta tách Avatar, Badge ra khỏi ProfileCard).
          </li>
          <li>
            <strong>Top-Level Exports:</strong> Luôn đặt định nghĩa component ở phạm vi ngoài cùng của file để React engine tối ưu hóa bộ nhớ.
          </li>
          <li>
            <strong>Type Safety:</strong> Trong môi trường doanh nghiệp lớn, các dự án React hiện đại thường dùng TypeScript (giống như Java có kiểu dữ liệu tường minh) để kiểm soát Props chặt chẽ.
          </li>
        </ul>
      </div>
    </div>
  );
}
