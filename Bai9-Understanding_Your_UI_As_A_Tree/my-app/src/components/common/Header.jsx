export default function Header() {
  return (
    <header className="hero-header">
      <div className="badge-row">
        <span className="badge badge-react">⚛️ React 18 Core</span>
        <span className="badge badge-lesson">📖 Bài 9: Describing the UI</span>
        <span className="badge badge-backend">🌱 Spring Boot / IoC Comparison</span>
      </div>
      <h1 className="hero-title">Understanding Your UI as a Tree</h1>
      <p className="hero-subtitle">
        Khám phá bản chất mô hình hóa giao diện của React: Phân biệt rạch ròi giữa 
        <strong> Render Tree</strong> (quan hệ hiển thị cha-con động) và 
        <strong> Module Dependency Tree</strong> (quan hệ import mã nguồn tĩnh), 
        cơ chế Tree-shaking và tính năng Decoupling với prop <code>children</code>.
      </p>
    </header>
  );
}
