export default function Header() {
  return (
    <header className="hero-header">
      <div className="badge-row">
        <span className="badge badge-event">⚡ React SyntheticEvent</span>
        <span className="badge badge-react">📖 Bài 10: Responding to Events</span>
        <span className="badge badge-spring">🌱 Spring Observer / Interceptor</span>
      </div>
      <h1 className="hero-title">Responding to Events</h1>
      <p className="hero-subtitle">
        Khám phá bản chất xử lý tương tác người dùng: Phân biệt <strong>Truyền hàm</strong> vs <strong>Thực thi hàm</strong>, 
        làm chủ cơ chế <strong>Sủi bọt sự kiện (Bubbling)</strong> với <code>e.stopPropagation()</code>, 
        và xây dựng trải nghiệm SPA không giật lag với <code>e.preventDefault()</code>.
      </p>
    </header>
  );
}
