// ==========================================================================
// THỬ THÁCH 4 (REACT.DEV): DANH SÁCH CÓ VẠCH PHÂN CÁCH (LIST WITH SEPARATOR)
// Kỹ thuật dùng <Fragment key={...}> khi render nhiều thẻ song song
// ==========================================================================
import React, { Fragment } from 'react';
import Card from '../common/Card';

const POEM = {
  title: 'Haiku Về Mùa Thu',
  author: 'Matsuo Bashō (Tùng Vĩ Ba Tiêu)',
  lines: [
    'Trên cành cây khô héo quạnh quẽ',
    'Một con quạ đen lặng lẽ đậu xuống',
    'Chiều tà mùa thu buông lơi.',
  ],
};

export default function Challenge4PoemSeparator() {
  return (
    <Card
      title="Thử Thách 4: Chèn Vạch Phân Cách Bằng <Fragment key={...}>"
      subtitle="Yêu cầu: Chèn thẻ <hr /> giữa các dòng thơ (trừ dòng đầu tiên), dùng Fragment tường minh để giữ thuộc tính key"
      icon="📜"
    >
      <div className="poem-container">
        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
          {POEM.title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          Tác giả: {POEM.author}
        </p>

        {/* DUYỆT CÁC DÒNG THƠ VÀ CHÈN DẤU PHÂN CÁCH */}
        {POEM.lines.map((line, i) => (
          // ⚠️ QUAN TRỌNG: Cú pháp viết tắt <>...</> KHÔNG nhận thuộc tính key!
          // Bắt buộc phải import và dùng thẻ <Fragment key={i}> tường minh!
          <Fragment key={i}>
            {/* Chỉ chèn vạch kẻ khi không phải dòng đầu tiên (i > 0) */}
            {i > 0 && <hr className="poem-divider" />}
            <p className="poem-line">{line}</p>
          </Fragment>
        ))}
      </div>

      <div className="code-preview">
        <div className="code-comment">
          // 💡 TẠI SAO PHẢI DÙNG &lt;Fragment key={'{...}'}&gt; TƯỜNG MINH?
          <br />
          // - Khi 1 phần tử trong map() cần trả về 2 thẻ ngang hàng nhau (vừa có &lt;hr /&gt; vừa có &lt;p&gt;).
          <br />
          // - Thẻ bọc rút gọn &lt;&gt;...&lt;/&gt; sẽ báo lỗi biên dịch nếu bạn viết &lt; key={'{...}'}&gt;.
          <br />
          // - Giải pháp chuẩn: import {'{ Fragment }'} from 'react' và viết &lt;Fragment key={'{i}'}&gt;!
        </div>
        <code>
          {`import { Fragment } from 'react';

{poem.lines.map((line, i) => (
  <Fragment key={i}>
    {i > 0 && <hr />}
    <p>{line}</p>
  </Fragment>
))}`}
        </code>
      </div>
    </Card>
  );
}
