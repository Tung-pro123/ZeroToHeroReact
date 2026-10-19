// ========================================================================================
// FILE: src/components/array-methods/ArrayMutationCheatSheet.jsx
// ========================================================================================
// KIẾN THỨC BÀI 8 (MỤC 6): THAO TÁC MẢNG ĐỘT BIẾN (MUTATING) VS KHÔNG ĐỘT BIẾN (PURE)
// ========================================================================================

import { useState } from 'react';
import Card from '../common/Card';

export default function ArrayMutationCheatSheet() {
  // Mảng số ban đầu dùng để thử nghiệm
  const initialNumbers = [42, 7, 89, 15, 3];
  const [currentNumbers, setCurrentNumbers] = useState(initialNumbers);
  const [testResult, setTestResult] = useState(null);

  // Thử nghiệm 1: Cách sai (Đột biến mảng gốc bằng .reverse() trực tiếp)
  const handleMutatingReverse = () => {
    // ❌ LỖI KINH ĐIỂN: .reverse() đảo ngược ngay trên chính mảng hiện tại!
    const copy = currentNumbers;
    copy.reverse();
    setTestResult({
      type: 'danger',
      message: '❌ .reverse() đã làm thay đổi (đột biến) mảng gốc trong bộ nhớ!'
    });
    setCurrentNumbers([...copy]); // buộc render lại
  };

  // Thử nghiệm 2: Cách đúng (Tạo bản sao bằng [...arr].reverse())
  const handlePureReverse = () => {
    // ✅ CHUẨN TINH KHIẾT: Dùng spread [...] nhân bản ra mảng mới trước khi đảo
    const reversed = [...currentNumbers].reverse();
    setTestResult({
      type: 'success',
      message: '✅ [...arr].reverse() tạo mảng mới an toàn 100%, bảo toàn dữ liệu gốc!'
    });
    setCurrentNumbers(reversed);
  };

  const handleReset = () => {
    setCurrentNumbers(initialNumbers);
    setTestResult(null);
  };

  const arrayRules = [
    {
      action: "Thêm phần tử (Add)",
      bad: "push(), unshift()",
      good: "[...arr, newItem], concat()",
      desc: "Trải phẳng mảng cũ vào mảng mới kèm phần tử thêm vào"
    },
    {
      action: "Xóa phần tử (Remove)",
      bad: "pop(), shift(), splice()",
      good: "filter(), slice()",
      desc: "Lọc ra mảng mới loại trừ các phần tử không mong muốn"
    },
    {
      action: "Biến đổi phần tử (Transform)",
      bad: "arr[i] = newValue",
      good: "map()",
      desc: "Tạo mảng mới với từng phần tử được ánh xạ theo điều kiện"
    },
    {
      action: "Sắp xếp / Đảo ngược (Sort / Reverse)",
      bad: "sort(), reverse()",
      good: "[...arr].sort(), [...arr].reverse()",
      desc: "Luôn clone bằng [...] trước khi sort/reverse vì hàm gốc đổi in-place"
    }
  ];

  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill">Mục 6: Bảng Tra Cứu Thao Tác Mảng</span>
        <h2 className="section-title">Thao Tác Mảng: Đột Biến (Mutating) vs Tinh Khiết (Pure)</h2>
        <p className="section-desc">
          Khi làm việc với Props hoặc State dạng Mảng trong React, luôn chọn hàm trả về mảng mới
          thay vì hàm sửa đổi mảng gốc.
        </p>
      </div>

      <div className="array-table-wrapper">
        <table className="pure-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Nhu cầu thao tác</th>
              <th style={{ width: '28%' }}>❌ Hàm làm hỏng mảng gốc (Tránh)</th>
              <th style={{ width: '32%' }}>✅ Cú pháp tinh khiết (Khuyên dùng)</th>
              <th style={{ width: '18%' }}>Cơ chế</th>
            </tr>
          </thead>
          <tbody>
            {arrayRules.map((rule, idx) => (
              <tr key={idx}>
                <td className="font-semibold text-primary">{rule.action}</td>
                <td className="code-text bad-cell">
                  <code>{rule.bad}</code>
                </td>
                <td className="code-text good-cell">
                  <code>{rule.good}</code>
                </td>
                <td className="text-muted explanation-cell">{rule.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phòng thí nghiệm tương tác thực tế với Array */}
      <Card title="🧪 Phòng Thí Nghiệm Đảo Ngược Mảng" variant="indigo">
        <div className="array-lab-content">
          <div className="array-display-row">
            <span>Mảng hiện tại: </span>
            <div className="array-chips">
              {currentNumbers.map((num, i) => (
                <span key={i} className="num-chip">{num}</span>
              ))}
            </div>
          </div>

          <div className="array-lab-buttons">
            <button className="action-btn danger" onClick={handleMutatingReverse}>
              ❌ Đảo trực tiếp: <code>arr.reverse()</code>
            </button>
            <button className="action-btn success" onClick={handlePureReverse}>
              ✅ Đảo qua bản sao: <code>[...arr].reverse()</code>
            </button>
            <button className="action-btn secondary" onClick={handleReset}>
              ⏮️ Reset
            </button>
          </div>

          {testResult && (
            <div className={`test-feedback-box ${testResult.type}`}>
              {testResult.message}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
