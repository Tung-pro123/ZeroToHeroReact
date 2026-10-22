export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>🔄</span>
        <span>React Core Architecture • Bài 19</span>
      </div>
      <h1 className="app-title">Sharing State Between Components</h1>
      <p className="app-subtitle">
        Khám phá kỹ thuật Kéo State lên Cha (Lifting State Up), Luồng dữ liệu một chiều (Top-Down Flow),
        phân định Controlled vs Uncontrolled Components, và Triết lý Nguồn Sự Thật Duy Nhất (Single Source of Truth).
      </p>
    </header>
  );
}
