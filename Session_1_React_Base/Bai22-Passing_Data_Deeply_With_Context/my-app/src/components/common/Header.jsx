export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>🌌</span>
        <span>React Core Architecture • Bài 22</span>
      </div>
      <h1 className="app-title">Passing Data Deeply with Context</h1>
      <p className="app-subtitle">
        Khám phá cổng dịch chuyển tức thời Context API (<code>useContext</code>), giải pháp triệt tiêu vấn nạn Prop Drilling,
        kỹ thuật ghi đè Context theo tầng (Context Shadowing), và chiến lược phòng tránh cạm bẫy Re-render hàng loạt.
      </p>
    </header>
  );
}
