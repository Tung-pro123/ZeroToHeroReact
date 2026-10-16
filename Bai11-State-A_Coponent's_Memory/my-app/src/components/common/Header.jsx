export default function Header() {
  return (
    <header className="hero-header">
      <div className="badge-row">
        <span className="badge badge-memory">🧠 Component Memory</span>
        <span className="badge badge-react">📖 Bài 11: State - A Component's Memory</span>
        <span className="badge badge-spring">🌱 Spring Session / Prototype Scope</span>
      </div>
      <h1 className="hero-title">State: A Component's Memory</h1>
      <p className="hero-subtitle">
        Khám phá bản chất bộ nhớ của Component trong React: Tại sao biến <code>let</code> không đủ, 
        giải phẫu cơ chế <strong>Ngăn kéo &amp; Con trỏ (Call Order Cursor)</strong> dưới nắp máy, 
        luật tối thượng của Hooks và tính năng độc lập riêng tư giữa các thực thể giao diện.
      </p>
    </header>
  );
}
