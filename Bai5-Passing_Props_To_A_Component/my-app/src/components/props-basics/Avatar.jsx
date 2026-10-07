// ========================================================================================
// FILE: src/components/props-basics/Avatar.jsx
// ========================================================================================
// KIẾN THỨC BÀI 5: TRUYỀN & NHẬN PROPS CƠ BẢN + DEFAULT VALUE + CHALLENGE 2
//
// 1. [ẢNH TRONG BÀI HỌC MỤC 2 - BƯỚC 1]:
//    - Khi gọi: <Avatar person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />
//    - Tại sao có 2 dấu ngoặc nhọn {{ }}?
//      + Dấu { ngoài cùng: Báo cho JSX biết bên trong là biểu thức JavaScript.
//      + Dấu { bên trong: Định nghĩa một Object JS thông thường { name: ..., imageId: ... }.
//
// 2. [ẢNH TRONG BÀI HỌC MỤC 2 - BƯỚC 2]:
//    - Ở dòng khai báo hàm: export default function Avatar({ person, size = 100 })
//    - BẮT BUỘC phải có cặp ngoặc nhọn { person, size } để bóc tách (Destructure) từ đối tượng props!
//    - ⚠️ CẠM BẪY KINH ĐIỂN: Nếu viết "function Avatar(person, size)":
//      React sẽ gán TOÀN BỘ đối tượng props vào tham số thứ nhất 'person',
//      còn tham số thứ hai 'size' sẽ bị UNDEFINED!
//
// 3. [GIÁ TRỊ MẶC ĐỊNH (DEFAULT VALUE)]:
//    - size = 100: Nếu Component cha không truyền size, tự động lấy 100px.
//
// 4. [LOGIC CHALLENGE 2]:
//    - Nếu size < 90px -> Lấy ảnh thumbnail nhỏ ('s').
//    - Nếu size >= 90px -> Lấy ảnh độ phân giải cao ('b').
// ========================================================================================

import { getImageUrl } from '../../utils/imageUrl';

export default function Avatar({ 
  person = { name: "Nhà Khoa Học Ẩn Danh", imageId: "1bX5QH6" }, 
  size = 100 
}) {
  // Logic Challenge 2: Tối ưu băng thông mạng dựa theo kích thước Prop
  const thumbnailType = size < 90 ? 's' : 'b';

  return (
    <div className="avatar-wrapper" style={{ width: size, height: size }}>
      <img
        className="avatar-img"
        src={getImageUrl(person, thumbnailType)}
        alt={person.name}
        width={size}
        height={size}
        loading="lazy"
      />
    </div>
  );
}
