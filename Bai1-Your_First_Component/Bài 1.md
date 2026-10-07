# **BÀI HỌC 1: YOUR FIRST COMPONENT (COMPONENT ĐẦU TIÊN CỦA BẠN)**

### **1\. Bản chất: Component là gì trong kiến trúc React?**

- **Khối xây dựng giao diện (UI Building Blocks):**
  - Trong web truyền thống, tài liệu được tạo từ các thẻ HTML cố định (&lt;h1&gt;, &lt;article&gt;, &lt;ol&gt;, &lt;li&gt;). Muốn có tương tác động, lập trình viên phải viết thêm JS gắn sự kiện từ bên ngoài.
  - Trong React, tư duy đảo ngược lại: Giao diện, định kiểu (CSS) và logic tương tác (JavaScript) được gom chung vào một khối độc lập gọi là **Component**.
- **Khả năng lồng ghép (Composition):**
  - Tương tự cách các thẻ HTML lồng nhau, bạn có thể ghép nối nhiều component nhỏ (nút bấm, thanh tìm kiếm, ảnh đại diện) để tạo thành các khối lớn hơn (thanh điều hướng, thanh bên, bố cục trang web).
- **Tư duy đối chiếu Backend (Java/OOP):**
  - Component trong React có vai trò tương đương một lớp hoặc một hàm tiện ích trả về khối đối tượng hiển thị. Khi bạn cần hiển thị ở nhiều trang khác nhau, bạn chỉ cần gọi tên component đó thay vì sao chép lại toàn bộ mã HTML.

### **2\. Ba bước cốt lõi để tạo một Component**

Để tạo nên một component hoàn chỉnh, ta thực hiện 3 bước tiêu chuẩn:

- **Bước 1: Xuất Component (export default):**
  - Sử dụng từ khóa tiêu chuẩn của JavaScript để đánh dấu component chính của tập tin.
  - Giúp các tập tin khác trong dự án có thể nạp và sử dụng lại component này một cách thuận tiện.
- **Bước 2: Khai báo hàm xử lý:**
  - Component trong React hiện đại thực chất là một hàm JavaScript thông thường.
  - **Quy tắc bắt buộc:** Tên hàm phải bắt đầu bằng **chữ cái in hoa (PascalCase)** (ví dụ: Profile, Header, NavigationBar).
- **Bước 3: Trả về phần tử giao diện (JSX):**
  - Bên trong hàm, ta dùng lệnh return để trả về cấu trúc giao diện viết bằng cú pháp JSX.
  - Nhìn bề ngoài JSX rất giống HTML nhưng bản chất bên dưới là mã JavaScript được trình biên dịch chuyển đổi thành các lệnh gọi hàm tạo phần tử của React.

### **3\. Hai cạm bẫy kinh điển (Pitfalls) cần tránh**

- **Cạm bẫy 1 - Quên viết hoa chữ cái đầu của Component:**
  - Nếu đặt tên hàm là chữ thường, trình xử lý của React sẽ hiểu nhầm đó là một thẻ HTML có sẵn của trình duyệt và bỏ qua hàm của bạn.
  - _Quy ước:_
    - Chữ thường (&lt;section&gt;, &lt;div&gt;, &lt;img /&gt;) = Thẻ HTML gốc.
    - Chữ hoa (&lt;Profile/&gt;, &lt;Gallery/&gt;) = Component tự định nghĩa.
- **Cạm bẫy 2 - Bẫy tự động chèn dấu chấm phẩy (ASI) khi thiếu ngoặc tròn return (...):**
  - Trong JavaScript, cơ chế Automatic Semicolon Insertion sẽ tự động ngắt dòng và thêm dấu ; ngay sau từ khóa return nếu bạn xuống dòng mà không có dấu mở ngoặc tròn (.
  - _Hậu quả:_ Toàn bộ phần mã giao diện ở các dòng bên dưới sẽ bị bỏ qua, hàm trả về giá trị rỗng (undefined) và giao diện không hiển thị.
  - _Quy chuẩn an toàn:_ Luôn bọc toàn bộ khối giao diện nhiều dòng trong cặp ngoặc tròn return ( ... );.

### **4\. Mối quan hệ Cha - Con (Parent - Child Component)**

- **Khái niệm:** Khi một component được gọi và hiển thị bên trong phần thân của một component khác, ta thiết lập mối quan hệ cấp bậc:
  - Component bao bọc bên ngoài đóng vai trò là **Component cha (Parent)**.
  - Các component được gọi bên trong là **Component con (Child)**.
- **Cơ chế biên dịch của trình duyệt:**
  - Trình duyệt không hiểu thẻ viết hoa tự tạo (như &lt;Profile/&gt;).
  - Khi xử lý, React sẽ phân giải toàn bộ các hàm component con cho tới khi chỉ còn lại cây thẻ HTML gốc (&lt;section&gt;, &lt;h1&gt;, &lt;img&gt;) rồi mới chuyển giao cho trình duyệt vẽ lên màn hình.

### **5\. Cảnh báo kỹ thuật: Vị trí khai báo Component**

- **Quy tắc:** Mọi component phải được khai báo ở **phạm vi ngoài cùng (Top Level)** của tập tin.
- **Hậu quả khi khai báo lồng:** Nếu đặt định nghĩa một hàm component nằm gọn bên trong thân của một hàm component khác:
  - Hàm con sẽ bị tạo mới lại trong bộ nhớ sau mỗi lần component cha chạy lại.
  - Gây suy giảm hiệu năng nghiêm trọng và làm mất toàn bộ trạng thái dữ liệu (state) đang lưu trữ.
- **Cách truyền dữ liệu chuẩn:** Khi component con cần nhận thông tin từ component cha, hãy truyền thông qua cơ chế **Props** thay vì lồng định nghĩa hàm vào nhau.

### **6\. Bảng tóm tắt quy chuẩn viết Component**

| **Thành phần**        | **Quy tắc chuẩn**                          | **Lỗi thường gặp**                                |
| --------------------- | ------------------------------------------ | ------------------------------------------------- |
| **Tên Component**     | Bắt buộc viết hoa chữ cái đầu (PascalCase) | Viết chữ thường khiến React nhận diện sai         |
| ---                   | ---                                        | ---                                               |
| **Cú pháp hàm**       | Dùng Function chuẩn trả về JSX             | Khai báo component lồng bên trong hàm khác        |
| ---                   | ---                                        | ---                                               |
| **Lệnh return**       | Bọc khối mã trong cặp ngoặc tròn ( )       | Xuống dòng tự do khiến lệnh return bị ngắt sớm    |
| ---                   | ---                                        | ---                                               |
| **Thẻ đơn trong JSX** | Luôn có dấu tự đóng />                     | Bỏ quên dấu gạch chéo khiến lỗi cú pháp biên dịch |
| ---                   | ---                                        | ---                                               |

### **7\. Giải bài tập thử thách (Challenge 4: Your Own Component)**

- **Hiện tượng lỗi ban đầu:**
  1. Thông báo: Element type is invalid: expected a string... but got: object.
  2. _Nguyên nhân:_ Môi trường chạy thử của bài học đang chờ đợi một component chính được xuất ra ngoài, nhưng tập tin hiện tại đang rỗng hoặc thiếu từ khóa export default.
- **Mã nguồn hoàn thiện:**
- JavaScript
  1. // Định nghĩa hàm component có tên viết hoa chữ cái đầu
  2. // Sử dụng export default để xuất làm thành phần chính
  3. export default function Congratulations() {
  4. return (
  5. &lt;article className="p-4 text-center"&gt;
  6. &lt;h1 className="text-2xl font-bold text-green-600"&gt;Good job!&lt;/h1&gt;
  7. &lt;p className="text-gray-600"&gt;Bạn đã hoàn thành việc tạo component độc lập đầu tiên.&lt;/p&gt;
  8. &lt;/article&gt;
  9. );
  10. }
- **Điểm lưu ý:**
  1. Tên hàm Congratulations viết hoa chữ cái đầu.
  2. Lệnh return bọc trong ngoặc tròn trả về cấu trúc JSX hợp lệ.
  3. Có từ khóa export default để xuất ra ngoài.