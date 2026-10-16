export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>📦 React Core Concept</span>
        <span>•</span>
        <span>Bài 15</span>
      </div>
      <h1 className="app-title">Updating Objects in State</h1>
      <p className="app-subtitle">
        Khắc phục cạm bẫy Đột biến (Mutation), so sánh tham chiếu Object.is, 
        thành thạo toán tử Spread (...) và ứng dụng thư viện Immer cho Object lồng sâu.
      </p>
    </header>
  );
}
