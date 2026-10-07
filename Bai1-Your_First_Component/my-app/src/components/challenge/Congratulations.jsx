// ========================================================================================
// FILE: src/components/challenge/Congratulations.jsx
// ========================================================================================
// MỤC TIÊU: GIẢI QUYẾT BÀI TẬP THỬ THÁCH (CHALLENGE 4: YOUR OWN COMPONENT) TRONG BÀI 1
//
// LỖI KINH ĐIỂN BAN ĐẦU TRONG BÀI HỌC CỦA REACT.DEV:
// "Element type is invalid: expected a string (for built-in components) or a class/function 
// (for composite components) but got: undefined/object."
//
// NGUYÊN NHÂN SÂU XA:
// - File import component này bằng cú pháp: import Congratulations from './Congratulations';
// - Nhưng bên trong file quên viết "export default" hoặc chỉ viết "function Congratulations()".
// - Khi đó import nhận về "undefined", React cố render <undefined /> và nổ tung ứng dụng!
//
// ĐỐI CHIẾU SPRING BOOT:
// - Giống hệt lỗi "NoSuchBeanDefinitionException: No qualifying bean of type...":
//   Bạn cố @Autowired 1 Service vào Controller nhưng quên đánh dấu @Service hoặc @Component trên đầu class!
// ========================================================================================

// BƯỚC 1: Xuất Component ra ngoài bằng "export default"
// BƯỚC 2: Tên hàm bắt buộc viết hoa chữ cái đầu: Congratulations
export default function Congratulations() {
  // BƯỚC 3: Trả về JSX có cấu trúc phân cấp rõ ràng
  return (
    <article className="challenge-card">
      <div className="challenge-icon-badge">🎉</div>
      <h3 className="challenge-title">Chúc mừng bạn đã hoàn thành Bài 1!</h3>
      <p className="challenge-message">
        Bạn đã tạo thành công một <strong>React Component</strong> độc lập, tuân thủ đúng 3 bước:
        <br />
        <span className="step-tag">1. export default</span> &rarr;{" "}
        <span className="step-tag">2. function PascalCase</span> &rarr;{" "}
        <span className="step-tag">3. return ( JSX )</span>
      </p>
      <div className="challenge-tip-box">
        <span className="tip-label">💡 Ghi chú cốt lõi:</span>
        Luôn nhớ từ khóa <code>export default</code> để các file khác có thể nạp Component vào sử dụng, 
        giống như việc đặt <code>@Component</code> để Spring Container quản lý Bean.
      </div>
    </article>
  );
}
