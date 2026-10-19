export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>📸 React Core Concept</span>
        <span>•</span>
        <span>Bài 13</span>
      </div>
      <h1 className="app-title">State as a Snapshot</h1>
      <p className="app-subtitle">
        Khám phá bí mật tại sao State không thay đổi ngay lập tức, cơ chế đóng băng biến qua Closure, 
        và cách Snapshot bảo vệ ứng dụng khỏi lỗi Race Conditions nguy hiểm.
      </p>
    </header>
  );
}
