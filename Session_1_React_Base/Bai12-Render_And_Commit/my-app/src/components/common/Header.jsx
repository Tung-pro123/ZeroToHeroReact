export default function Header() {
  return (
    <header className="hero-header">
      <div className="badge-row">
        <span className="badge badge-pipeline">🍽️ Render &amp; Commit Pipeline</span>
        <span className="badge badge-react">📖 Bài 12: Render and Commit</span>
        <span className="badge badge-spring">🌱 Hibernate Dirty Checking / Spring MVC</span>
      </div>
      <h1 className="hero-title">Render and Commit</h1>
      <p className="hero-subtitle">
        Khám phá quy trình 3 giai đoạn đưa giao diện lên màn hình: 
        <strong> Trigger</strong> (gọi món) $\rightarrow$ <strong> Render</strong> (tính toán JSX thuần túy trong RAM) $\rightarrow$ <strong> Commit</strong> (chỉ sửa node DOM thật có thay đổi), và kết thúc bằng <strong> Browser Paint</strong>.
      </p>
    </header>
  );
}
