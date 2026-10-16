export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>📋 React Core Internals</span>
        <span>•</span>
        <span>Bài 14</span>
      </div>
      <h1 className="app-title">Queueing a Series of State Updates</h1>
      <p className="app-subtitle">
        Khám phá cơ chế gom cụm (Automatic Batching), hàm cập nhật (Updater Function), 
        và giải thuật xử lý hàng đợi State độc đáo của React Engine.
      </p>
    </header>
  );
}
