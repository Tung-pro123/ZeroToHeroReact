export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span>👨‍🍳</span>
        <span>React Core Architecture • Bài 21</span>
      </div>
      <h1 className="app-title">Extracting State Logic into a Reducer</h1>
      <p className="app-subtitle">
        Chuyển dịch tư duy từ &quot;Mệnh lệnh cập nhật State&quot; sang &quot;Khai báo sự kiện Dispatch Action&quot;. 
        Mô hình Bếp Trưởng Nhà Hàng, Hook <code>useReducer</code>, thư viện <code>useImmerReducer</code> và tự code lại Reducer từ con số 0.
      </p>
    </header>
  );
}
