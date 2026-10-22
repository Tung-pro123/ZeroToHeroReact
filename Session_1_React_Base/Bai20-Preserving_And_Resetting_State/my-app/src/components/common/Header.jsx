export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>💾</span>
        <span>React Core Architecture • Bài 20</span>
      </div>
      <h1 className="app-title">Preserving and Resetting State</h1>
      <p className="app-subtitle">
        Khám phá bí mật vị trí trong Cây Render (Render Tree Position), hai quy tắc vàng bảo toàn và làm mới State,
        chiến thuật dùng thuộc tính <code>key</code>, và cách phòng tránh cạm bẫy khai báo Component lồng nhau.
      </p>
    </header>
  );
}
