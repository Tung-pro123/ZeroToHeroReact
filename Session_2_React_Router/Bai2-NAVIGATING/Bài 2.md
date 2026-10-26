## **1\. Navigating là gì?**

**Navigating** là việc chuyển người dùng từ URL này sang URL khác trong ứng dụng React.

Ví dụ:

/products

↓

người dùng chuyển trang

↓

/profile

↓

React Router kiểm tra Route

↓

&lt;Profile /&gt; được render

React Router cho chúng ta các công cụ để thực hiện việc chuyển URL này **mà không cần reload toàn bộ trang**.

## **2\. Hai kiểu điều hướng chính**

Có thể chia thành 2 nhóm:

NAVIGATION

│

├── 1. Declarative Navigation

│ │

│ ├── &lt;Link&gt;

│ └── &lt;NavLink&gt;

│

└── 2. Programmatic Navigation

│

└── useNavigate()

### **Declarative Navigation**

Bạn khai báo:

&lt;Link to="/products"&gt;

Products

&lt;/Link&gt;

hoặc:

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

Người dùng **bấm vào link** để chuyển trang.

### **Programmatic Navigation**

Code chủ động ra lệnh chuyển trang:

const navigate = useNavigate();

navigate("/products");

Ví dụ rất thực tế:

User submit Login

↓

Login thành công

↓

Code tự động chuyển

↓

/dashboard

Phần này chúng ta sẽ học kỹ khi tới useNavigate().

# **3\. &lt;NavLink&gt; — Link dành cho Navigation UI**

NavLink cũng dùng để điều hướng giống Link:

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

Nhưng NavLink có thêm khả năng biết trạng thái của chính link đó, đặc biệt là:

isActive

Có thể hiểu:

Link

│

└── Điều hướng

NavLink

│

├── Điều hướng

│

└── Biết mình có ACTIVE hay không

Vì vậy NavLink rất phù hợp với:

Navbar

Sidebar

Menu

Tabs

# **4\. Active là gì?**

Giả sử Navbar:

&lt;NavLink to="/"&gt;

Home

&lt;/NavLink&gt;

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

&lt;NavLink to="/profile"&gt;

Profile

&lt;/NavLink&gt;

URL hiện tại:

/products

React Router có thể xác định:

Home

isActive = false

Products

isActive = true ← URL hiện tại match

Profile

isActive = false

Nhờ vậy chúng ta có thể làm:

Home Products Profile

^^^^^^^^

ACTIVE

# **5\. Active class**

NavLink hỗ trợ trạng thái active để bạn style link đang được chọn.

Ví dụ CSS:

a.active {

color: red;

font-weight: bold;

}

Khi /products đang active, link tương ứng có thể nhận trạng thái/class active để CSS áp dụng.

Kết quả:

Home PRODUCTS Profile

^^^^^^^^

màu đỏ

# **6\. Vấn đề đặc biệt của /**

Giả sử:

&lt;NavLink to="/"&gt;

Home

&lt;/NavLink&gt;

&lt;NavLink to="/concerts"&gt;

Concerts

&lt;/NavLink&gt;

Ta có:

/

và:

/concerts

Route matching có khái niệm match cha/prefix, nên với navigation ở root /, chúng ta thường muốn Home chỉ active khi thực sự ở /.

Đó là lúc dùng:

&lt;NavLink to="/" end&gt;

Home

&lt;/NavLink&gt;

# **7\. Thuộc tính end**

end yêu cầu việc active matching **kết thúc tại to** thay vì tiếp tục match các URL sâu hơn.

Ví dụ:

&lt;NavLink to="/" end&gt;

Home

&lt;/NavLink&gt;

Khi:

URL = /

→ Home:

ACTIVE ✅

Khi:

URL = /concerts

→ Home:

NOT ACTIVE ❌

Bạn có thể nhớ:

end

↓

"Match tới đây là hết."

Một ví dụ khác dễ thấy hơn:

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

có thể liên quan tới các URL sâu hơn như:

/products

/products/10

/products/create

Nếu trường hợp thiết kế của bạn yêu cầu active chỉ khi match tới /products, end giúp giới hạn matching:

&lt;NavLink to="/products" end&gt;

Products

&lt;/NavLink&gt;

# **8\. Callback ({ isActive })**

Đây chính là đoạn chúng ta vừa học rất kỹ:

<NavLink

to="/messages"

className={({ isActive }) =>

isActive

? "text-red-500 font-bold"

: "text-black"

}

\>

Messages

&lt;/NavLink&gt;

React Router cung cấp một object chứa trạng thái cho function.

Có thể hình dung:

{

isActive: true,

...

}

Ta destructuring:

({ isActive })

tương đương tư duy với:

(info) => {

const isActive = info.isActive;

}

# **9\. Chạy tay className={({ isActive }) => ...}**

Giả sử:

URL hiện tại = /messages

và:

&lt;NavLink to="/messages"&gt;

React Router xác định:

isActive = true

Function:

({ isActive }) =>

isActive

? "text-red-500 font-bold"

: "text-black"

nhận:

isActive = true

Ternary:

true

? "text-red-500 font-bold"

: "text-black"

→ trả về:

"text-red-500 font-bold"

Cuối cùng link được style active.

# **10\. Khi không Active**

Giả sử:

URL = /profile

nhưng:

&lt;NavLink to="/messages"&gt;

thì:

isActive = false

Function:

false

? "text-red-500 font-bold"

: "text-black"

→

"text-black"

Flow đầy đủ:

URL hiện tại

↓

React Router

↓

NavLink có match không?

↓

isActive = true / false

↓

callback className

↓

trả về STRING

↓

className được áp dụng

Đúng với câu chúng ta vừa chốt:

**Function chỉ là "máy tính" để tính ra string cho className.**

# **11\. Dùng isActive với style**

Không chỉ className.

Có thể:

<NavLink

to="/messages"

style={({ isActive }) => ({

color: isActive ? "red" : "black"

})}

\>

Messages

&lt;/NavLink&gt;

Nếu:

isActive = true

thì function trả:

{

color: "red"

}

Nếu:

isActive = false

thì:

{

color: "black"

}

Khác với className:

className callback

↓

trả STRING

còn:

style callback

↓

trả OBJECT style

# **12\. Tại sao có ({ ... }) sau =>?**

Đoạn này:

style={({ isActive }) => ({

color: isActive ? "red" : "black"

})}

có một cú pháp JS đáng chú ý:

() => ({ ... })

Ta muốn arrow function **return object trực tiếp**.

Nếu viết:

() => {

color: "red"

}

thì {} dễ được hiểu là **function body**, không phải object được return.

Cách đầy đủ:

() => {

return {

color: "red"

};

}

Rút gọn:

() => ({

color: "red"

})

Nên:

({ isActive }) => ({

color: isActive ? "red" : "black"

})

đọc là:

Nhận object → bóc isActive → return một object style.

# **13\. NavLink callback trong children**

NavLink còn có thể sử dụng trạng thái trong nội dung bên trong:

&lt;NavLink to="/tasks"&gt;

{({ isActive }) => (

&lt;span className={isActive ? "active" : ""}&gt;

{isActive ? "👉 " : ""}

Danh sách công việc

&lt;/span&gt;

)}

&lt;/NavLink&gt;

Bình thường children là:

&lt;NavLink to="/tasks"&gt;

Danh sách công việc

&lt;/NavLink&gt;

Nhưng ở đây children là một function.

React Router cung cấp trạng thái cho function:

NavLink

↓

cung cấp trạng thái

↓

{ isActive: true/false }

↓

children function

↓

quyết định render UI gì

# **14\. Chạy tay children**

Giả sử:

URL = /tasks

→

isActive = true

Đoạn:

{isActive ? "👉 " : ""}

→

"👉 "

và:

className={isActive ? "active" : ""}

→

className="active"

Kết quả:

👉 Danh sách công việc

Nếu chuyển sang:

/products

thì:

isActive = false

→ không có icon:

Danh sách công việc

# **15\. className, style, children với NavLink**

Đây là phần nên nhớ:

NavLink

│

│ biết trạng thái route

▼

isActive

│

┌─────────┼──────────┐

▼ ▼ ▼

className style children

│ │ │

▼ ▼ ▼

đổi class đổi CSS đổi UI

Ví dụ:

<NavLink

to="/messages"

className={({ isActive }) =>

isActive ? "active" : ""

}

style={({ isActive }) => ({

fontWeight: isActive ? "bold" : "normal"

})}

\>

{({ isActive }) =>

isActive

? "👉 Messages"

: "Messages"

}

&lt;/NavLink&gt;

Không nhất thiết phải dùng cả ba cùng lúc. Đây chỉ để thấy chúng đều có thể phụ thuộc vào trạng thái của NavLink.

# **16\. &lt;Link&gt; vs &lt;NavLink&gt;**

Đến đây phân biệt rất rõ:

&lt;Link&gt;

│

├── điều hướng

│

└── không tập trung vào active-state UI

&lt;NavLink&gt;

│

├── điều hướng

│

├── biết trạng thái active

│

└── rất phù hợp navigation UI

Ví dụ **Product Card**:

&lt;Link to={\`/products/\${product.id}\`}&gt;

Xem chi tiết

&lt;/Link&gt;

→ thường dùng Link.

Navbar:

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

→ thường dùng NavLink.

# **17\. Khi nào dùng cái nào?**

Câu nhớ:

Người dùng BẤM link để đi

↓

Link / NavLink

Navbar / Sidebar cần biết

"tao đang ở trang nào?"

↓

NavLink

Code TỰ QUYẾT ĐỊNH chuyển trang

↓

useNavigate()

Ví dụ:

Product Card

→ Link

Navbar

→ NavLink

Sidebar

→ NavLink

Login thành công

→ useNavigate()

Create Product thành công

→ useNavigate()

Cancel Form rồi quay về

→ useNavigate() hoặc Link tùy UI/semantics

# **18\. Tổng kết phần NavLink**

Bạn cần nhớ 5 thứ:

NavLink

│

├── 1. Điều hướng giống Link

│

├── 2. Có trạng thái active

│

├── 3. \`end\` giới hạn active matching

│

├── 4. Callback có thể nhận \`isActive\`

│

└── 5. Có thể dùng trạng thái cho

className / style / children

Và cú pháp lúc đầu nhìn rất dị:

className={({ isActive }) =>

isActive ? "active" : ""

}

bây giờ nên đọc được thành:

className cần một giá trị

↓

ta đưa function cho NavLink

↓

NavLink gọi function

↓

truyền object trạng thái vào

↓

{ isActive: true/false }

↓

destructuring lấy isActive

↓

ternary

↓

return string

↓

className

# **19\. &lt;Link&gt; — Dành cho liên kết thông thường**

Ở phần trước ta đã chốt:

Link

\=

ĐI ĐÂU?

NavLink

\=

ĐI ĐÂU?

-

TAO CÓ ĐANG ACTIVE KHÔNG?

Khi bạn chỉ cần người dùng **click để chuyển sang một route khác**, mà không cần biết link đó có đang active hay không → dùng &lt;Link&gt;.

Ví dụ:

import { Link } from "react-router";

export function LoggedOutMessage() {

return (

&lt;p&gt;

Bạn đã đăng xuất.

&lt;Link to="/login"&gt;

Đăng nhập lại tại đây

&lt;/Link&gt;

&lt;/p&gt;

);

}

Giao diện:

Bạn đã đăng xuất. Đăng nhập lại tại đây

^^^^^^^^^^^^^^^^^^^^

│

click

↓

/login

Flow:

&lt;Link to="/login"&gt;

↓

User click

↓

React Router thay đổi URL

↓

/login

↓

Routes match lại

↓

&lt;LoginPage /&gt;

Không cần full-page reload.

# **20\. to của &lt;Link&gt;**

Trong:

&lt;Link to="/login"&gt;

Đăng nhập

&lt;/Link&gt;

to chính là:

**Route/địa chỉ mà bạn muốn điều hướng tới.**

Ví dụ:

&lt;Link to="/"&gt;Home&lt;/Link&gt;

&lt;Link to="/products"&gt;Products&lt;/Link&gt;

&lt;Link to="/profile"&gt;Profile&lt;/Link&gt;

Hoặc kết hợp kiến thức Dynamic Route đã học:

&lt;Link to={\`/products/\${product.id}\`}&gt;

Xem chi tiết

&lt;/Link&gt;

Giả sử:

product.id = 15;

thì:

to={\`/products/\${product.id}\`}

→

to="/products/15"

→ click:

/products/15

→ match:

<Route

path="/products/:productId"

element={&lt;ProductDetail /&gt;}

/>

→ trong ProductDetail:

const { productId } = useParams();

→

productId = "15"

Đây là một flow cực kỳ phổ biến trong project thật:

Product List

↓

&lt;Link to={\`/products/\${id}\`}&gt;

↓

/products/15

↓

Dynamic Route

↓

useParams()

↓

id = 15

↓

gọi API lấy Product 15

# **21\. &lt;Link&gt; cuối cùng tạo ra link HTML**

Một điểm rất quan trọng trong tài liệu bạn gửi:

&lt;Link to="/login"&gt;

Đăng nhập

&lt;/Link&gt;

React Router sử dụng semantics của một hyperlink, cuối cùng người dùng tương tác với một liên kết kiểu &lt;a&gt;.

Có thể tư duy:

React code

&lt;Link to="/login"&gt;

Login

&lt;/Link&gt;

↓

Browser / DOM

&lt;a href="/login"&gt;

Login

&lt;/a&gt;

Nhưng React Router can thiệp vào navigation nội bộ để thực hiện **client-side navigation** thay vì mặc định tải lại document trong trường hợp phù hợp.

# **22\. Tại sao Link tốt hơn button + navigate cho một link bình thường?**

Giả sử bạn chỉ muốn:

User bấm "About" → đi /about.

Có thể bạn nghĩ:

&lt;button onClick={() =&gt; navigate("/about")}>

About

&lt;/button&gt;

Nó có thể chuyển route.

Nhưng về mặt ý nghĩa UI:

About

↓

đây là một LIÊN KẾT đến tài nguyên/trang khác

thì &lt;Link&gt; phù hợp hơn:

&lt;Link to="/about"&gt;

About

&lt;/Link&gt;

Bởi vì nó giữ đúng **semantics của hyperlink**.

Người dùng/browser có các hành vi quen thuộc của link, ví dụ mở link theo cách của trình duyệt, điều hướng bằng bàn phím và các công cụ accessibility cũng hiểu đây là một liên kết.

Câu nhớ:

Đây là HÀNH ĐỘNG

→ &lt;button&gt;

Đây là ĐƯỜNG DẪN đến nơi khác

→ &lt;Link&gt; / &lt;NavLink&gt;

# **23\. Link hoàn toàn có thể nhìn giống Button**

Đây là chỗ rất dễ nhầm:

"Nhưng thiết kế Figma của tôi là một cái nút!"

**Hình dáng không quyết định element.**

Ví dụ:

<Link

to="/register"

className="px-4 py-2 bg-blue-500 text-white rounded"

\>

Đăng ký

&lt;/Link&gt;

Nhìn trên giao diện có thể giống:

┌─────────────────┐

│ Đăng ký │

└─────────────────┘

nhưng về ý nghĩa nó vẫn là:

LINK

↓

đi tới /register

Nên có thể style &lt;Link&gt; giống button.

# **24\. Khi nào dùng &lt;Link&gt;?**

Ví dụ rất điển hình:

Product Card

└── Xem chi tiết

Bài viết

└── Xem bài tiếp theo

Thông báo

└── Xem đơn hàng

Footer

└── Chính sách bảo mật

Login

└── Chưa có tài khoản? Đăng ký

404

└── Quay về Home

Ví dụ:

&lt;p&gt;

Chưa có tài khoản?

&lt;Link to="/register"&gt;

Đăng ký

&lt;/Link&gt;

&lt;/p&gt;

Bạn không quan tâm:

Đăng ký có active không?

→ &lt;Link&gt; là đủ.

# **25\. Tổng kết Link và NavLink**

Đến đây hai thằng phải tách rất rõ:

&lt;Link&gt;

│

├── User click

├── Chuyển route

├── Client-side navigation

└── Không cần active-state UI

&lt;NavLink&gt;

│

├── User click

├── Chuyển route

├── Client-side navigation

│

└── Có trạng thái navigation

│

└── isActive

Quy tắc đơn giản:

"Có cần biết link đang active không?"

│

┌────┴────┐

│ │

KHÔNG CÓ

│ │

▼ ▼

Link NavLink

# **26\. useNavigate() — Programmatic Navigation**

Bây giờ tới thằng thứ ba.

Import:

import { useNavigate } from "react-router";

Sau đó:

const navigate = useNavigate();

navigate là một **function**.

Bạn có thể gọi:

navigate("/dashboard");

để yêu cầu React Router điều hướng đến:

/dashboard

# **27\. Điểm khác biệt lớn nhất của useNavigate**

Link:

&lt;Link to="/dashboard"&gt;

Dashboard

&lt;/Link&gt;

Flow:

USER CLICK LINK

↓

navigation

↓

/dashboard

Trong khi:

const navigate = useNavigate();

navigate("/dashboard");

thì:

CODE

↓

gọi navigate()

↓

navigation

↓

/dashboard

Đây là lý do nó được gọi là:

**Programmatic Navigation**

Tức là:

**Điều hướng bằng code.**

# **28\. Chạy tay useNavigate()**

Code:

function LoginPage() {

const navigate = useNavigate();

return (

<MyLoginForm

onSuccess={() => {

navigate("/dashboard");

}}

/>

);

}

Chạy tay:

LoginPage render

↓

useNavigate()

↓

trả về function navigate

↓

const navigate = ...

Bây giờ:

navigate

có thể được dùng để yêu cầu Router chuyển route.

Nhưng nó **chưa chạy**:

const navigate = useNavigate();

không có nghĩa:

CHUYỂN TRANG NGAY ❌

Nó chỉ lấy function điều hướng để chúng ta sử dụng.

# **29\. Khi Login thành công**

Giả sử user nhập:

Email: <tung@gmail.com>

Password: \*\*\*\*\*\*\*\*

Bấm:

Login

Flow thực tế có thể là:

User submit Login

↓

Frontend

↓

POST /api/auth/login

↓

Spring Boot

↓

kiểm tra account

↓

Login thành công

↓

Frontend nhận response

↓

navigate("/dashboard")

↓

URL = /dashboard

↓

React Router match

↓

&lt;Dashboard /&gt;

Đây là một trường hợp cực kỳ hợp lý cho useNavigate.

Bởi vì user không click vào:

"Đi tới Dashboard"

Mà user thực hiện:

LOGIN

Sau khi logic login thành công, **code quyết định** rằng bước tiếp theo là /dashboard.

# **30\. Ví dụ gần với Spring Boot project**

Sau này bạn có thể gặp code kiểu:

const navigate = useNavigate();

async function handleLogin() {

try {

await login(email, password);

navigate("/dashboard");

} catch (error) {

console.error(error);

}

}

Chạy tay:

handleLogin()

↓

await login(...)

↓

API đang xử lý...

↓

SUCCESS

↓

code chạy tiếp

↓

navigate("/dashboard")

↓

Dashboard

Nếu API lỗi và control flow đi vào:

catch

thì đoạn:

navigate("/dashboard");

không được thực thi trong flow thành công đó.

→ User vẫn ở Login để xử lý lỗi.

# **31\. Trường hợp Form Submit**

Không chỉ Login.

Ví dụ:

/products/create

User tạo sản phẩm.

Sau khi API thành công:

async function handleSubmit() {

await createProduct(formData);

navigate("/products");

}

Flow:

Create Product Form

↓

Submit

↓

POST /api/products

↓

Backend tạo thành công

↓

navigate("/products")

↓

quay lại Product List

Đây cũng là **Programmatic Navigation**.

# **32\. Trường hợp Timer**

Ví dụ Quiz:

setTimeout(() => {

navigate("/result");

}, 5000);

Flow:

Quiz

↓

Timer chạy

↓

hết thời gian

↓

code gọi navigate()

↓

/result

Không có:

User click link

→ useNavigate phù hợp.

# **33\. Trường hợp Session / Logic ứng dụng**

Ví dụ về mặt ý tưởng:

User đang sử dụng app

↓

một điều kiện session/auth xảy ra

↓

logic ứng dụng xử lý

↓

navigate("/login")

Điểm cần nhớ vẫn là:

Navigation xảy ra

vì LOGIC

không phải vì user

click một hyperlink

→ đây là nhóm use case của useNavigate.

# **34\. Tại sao không dùng navigate() cho tất cả?**

Bạn hoàn toàn có thể thấy:

<button

onClick={() => navigate("/about")}

\>

About

&lt;/button&gt;

và nó có thể hoạt động.

Nhưng nếu bản chất UI chỉ đơn giản là:

Đây là một link đưa user đến /about.

thì nên biểu diễn nó thành link:

&lt;Link to="/about"&gt;

About

&lt;/Link&gt;

Thay vì biến hyperlink thành một button có JavaScript điều hướng.

# **35\. Đừng phân biệt bằng "có click hay không"**

Có một nuance quan trọng.

Đừng học cứng:

Có click

→ Link

Không click

→ navigate

Bởi vì Login cũng có click:

User click Submit

nhưng:

Submit

↓

API

↓

thành công

↓

navigate("/dashboard")

Vẫn dùng navigate.

Câu hỏi chính xác hơn là:

**User đang click một LINK để đi đâu đó, hay navigation là KẾT QUẢ của một logic/hành động?**

Ví dụ:

"Xem sản phẩm"

↓

user muốn ĐI đến product

↓

Link

"Đăng nhập"

↓

user muốn THỰC HIỆN login

↓

API thành công

↓

app quyết định đi Dashboard

↓

useNavigate

Đây là cách phân biệt tốt hơn.

# **36\. So sánh 3 công cụ**

Đây là bảng tư duy quan trọng nhất của Lesson này:

| **Công cụ**     | **Mục đích**                                                 |
| --------------- | ------------------------------------------------------------ |
| `<Link>`        | User chủ động đi tới một route                               |
| ---             | ---                                                          |
| `<NavLink>`     | Giống Link nhưng cần biết trạng thái navigation như isActive |
| ---             | ---                                                          |
| `useNavigate()` | Code chủ động điều hướng do kết quả của logic                |
| ---             | ---                                                          |

Ví dụ:

"Xem chi tiết sản phẩm"

→ Link

Navbar "Products"

→ NavLink

Login thành công

→ useNavigate

Create Product thành công

→ useNavigate

Sidebar "Settings"

→ NavLink

"Đăng ký tại đây"

→ Link

# **37\. Một cách nhớ bằng Java/Spring mindset**

Bạn có thể hình dung UI:

Link / NavLink

≈ user nói:

"TÔI MUỐN ĐI TỚI ĐÂY"

Còn:

useNavigate

≈ application logic nói:

"XỬ LÝ XONG RỒI,

BÂY GIỜ CHUYỂN USER ĐẾN ĐÂY."

Ví dụ:

User

│

│ submit login

▼

Login logic

│

│ API success

▼

Application quyết định

│

│ navigate("/dashboard")

▼

Dashboard

# **38\. Một câu rất đáng nhớ**

Link / NavLink

\=

NAVIGATION LÀ Ý ĐỊNH CỦA USER

useNavigate

\=

NAVIGATION LÀ KẾT QUẢ CỦA LOGIC

Ví dụ:

User:

"Tôi muốn xem Product 15"

→ Link

User:

"Tôi muốn đăng nhập"

→ submit form

App:

"Đăng nhập thành công,

giờ tôi đưa anh sang Dashboard"

→ useNavigate

Nếu bạn nhớ được ví dụ này thì gần như không bao giờ nhầm Link với useNavigate.

# **39\. Tổng kết Lesson Navigating tới đây**

Bây giờ bạn đã có ba công cụ:

NAVIGATING

│

┌─────────┴─────────┐

│ │

▼ ▼

User chủ động đi Logic quyết định đi

│ │

┌────┴────┐ │

▼ ▼ ▼

Link NavLink useNavigate

│ │ │

│ │ └── API success

│ │ Timer

│ │ Form xử lý xong

│ │ application logic

│ │

│ └── cần active state

│

└── không cần active state

### **Câu chốt để lưu vào docs**

**Link** dùng cho các liên kết nội bộ thông thường mà người dùng chủ động click để điều hướng. **NavLink** cũng dùng để điều hướng nhưng có thêm trạng thái như isActive, phù hợp Navbar/Sidebar/Menu. **useNavigate** dùng cho programmatic navigation, khi việc chuyển route là kết quả của logic như đăng nhập thành công, submit form thành công hoặc timer kết thúc.

**Link vs NavLink — Bản chất khác nhau ở đâu?**

## **1\. Trước tiên: Cả hai đều dùng để chuyển trang**

Ví dụ Link:

&lt;Link to="/products"&gt;

Products

&lt;/Link&gt;

NavLink:

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

Nếu đang ở:

/

và click vào một trong hai:

/products

thì **cả hai đều làm được cùng việc**:

Click

↓

URL đổi thành /products

↓

React Router match Route

↓

Products render

↓

KHÔNG full page reload

👉 Nếu chỉ hỏi:

"Hai thằng có chuyển trang được không?"

Thì:

Link ✅

NavLink ✅

# **2\. Khác biệt nằm ở ACTIVE**

Giả sử Navbar có:

Home Products Profile

và hiện tại bạn đang ở:

/products

Bạn muốn giao diện:

Home PRODUCTS Profile

^^^^^^^^

màu đỏ

Tức là Navbar phải biết:

**"À, user hiện đang đứng ở Products."**

Đây là việc NavLink sinh ra để hỗ trợ.

# **3\. Nếu dùng Link**

&lt;Link to="/products"&gt;

Products

&lt;/Link&gt;

Link chủ yếu nói:

Bấm tao → đi /products.

Nó không cung cấp API active-state kiểu NavLink để bạn viết:

({ isActive }) => ...

Nên cái này không phải cách dùng của Link:

<Link

to="/products"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Products

&lt;/Link&gt;

❌ Link không đưa isActive cho callback như NavLink.

# **4\. Nếu dùng NavLink**

<NavLink

to="/products"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Products

&lt;/NavLink&gt;

NavLink nói:

Bấm tao → đi /products.

**VÀ**

Tao còn biết URL hiện tại có làm tao active hay không.

Ví dụ URL hiện tại:

/products

React Router:

&lt;NavLink to="/products"&gt;

│

│ so với

▼

URL = /products

↓

isActive = true

Nên:

isActive ? "active" : ""

→

"active"

# **5\. Ví dụ thực tế để thấy tại sao cần cả hai**

Giả sử website bán hàng:

┌──────────────────────────────────────────────┐

│ Home Products Cart Profile │

├──────────────────────────────────────────────┤

│ │

│ iPhone 15 │

│ Giá: 20.000.000 │

│ │

│ \[Xem chi tiết\] │

│ │

└──────────────────────────────────────────────┘

Có **2 loại link** ở đây.

### **Navbar**

Home Products Cart Profile

^^^^^^^^

Bạn cần biết:

Trang nào đang active?

→ dùng:

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

### **Xem chi tiết sản phẩm**

iPhone 15

\[Xem chi tiết\]

Khi bấm chỉ cần:

/products/15

Bạn **không cần** nút "Xem chi tiết" phải biết:

Tao có đang active không?

Nên:

&lt;Link to="/products/15"&gt;

Xem chi tiết

&lt;/Link&gt;

là đủ.

# **6\. Đây là cách phân biệt dễ nhất**

Đừng học:

Link là cái này, NavLink là cái kia...

Hãy hỏi một câu:

**"Cái link này có cần biết nó đang ACTIVE hay không?"**

Nếu **không**:

Không cần active

↓

Link

Nếu **có**:

Cần active

↓

NavLink

# **7\. Ví dụ Navbar**

Navbar:

function Navbar() {

return (

&lt;nav&gt;

<NavLink

to="/"

end

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Home

&lt;/NavLink&gt;

<NavLink

to="/products"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Products

&lt;/NavLink&gt;

<NavLink

to="/profile"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Profile

&lt;/NavLink&gt;

&lt;/nav&gt;

);

}

Giả sử URL:

/products

thì tư duy:

NavLink Home

to="/"

isActive = false

NavLink Products

to="/products"

```
isActive = true  ⭐
```

NavLink Profile

to="/profile"

isActive = false

Kết quả:

Home Products Profile

^^^^^^^^

ACTIVE

Đây chính là **NAV** trong NavLink:

NavLink

^^^

Navigation Link

Nó cực hợp với:

Navbar

Sidebar

Tabs

Menu

# **8\. Còn danh sách Product thì dùng Link**

function ProductCard({ product }) {

return (

&lt;div&gt;

&lt;h2&gt;{product.name}&lt;/h2&gt;

&lt;Link to={\`/products/\${product.id}\`}&gt;

Xem chi tiết

&lt;/Link&gt;

&lt;/div&gt;

);

}

Ví dụ:

product.id = 15

thì:

&lt;Link to="/products/15"&gt;

Xem chi tiết

&lt;/Link&gt;

Click:

/products/15

Router:

<Route

path="/products/:productId"

element={&lt;ProductDetail /&gt;}

/>

→

const { productId } = useParams();

→

productId = "15"

Bạn thấy kiến thức cũ bắt đầu nối vào nhau rồi:

Product Card

↓

&lt;Link to="/products/15"&gt;

↓

URL thay đổi

↓

&lt;Route path="/products/:productId"&gt;

↓

&lt;ProductDetail /&gt;

↓

useParams()

↓

productId = "15"

Không cần NavLink ở đây vì "Xem chi tiết" không phải một navigation item cần hiển thị trạng thái active.

# **9\. Một hiểu nhầm cần tránh**

Đừng hiểu:

Link

→ link thường

NavLink

→ chuyển trang tốt hơn

❌ Không phải.

Cũng đừng hiểu:

Link

→ chuyển trang

NavLink

→ chỉ để đổi màu

❌ Chưa đủ.

Đúng hơn:

Link

│

│

Điều hướng SPA

│

▼

/page

NavLink

│

┌─────────┴─────────┐

▼ ▼

Điều hướng SPA Route-state awareness

│ │

▼ ▼

/page isActive

Có thể tư duy:

NavLink ≈ Link + thông tin trạng thái navigation

# **10\. Thế tại sao không dùng NavLink cho TẤT CẢ?**

Về mặt kỹ thuật nhiều chỗ bạn **có thể** dùng NavLink dù chẳng cần active.

Ví dụ:

&lt;NavLink to={\`/products/\${product.id}\`}&gt;

Xem chi tiết

&lt;/NavLink&gt;

Nó vẫn điều hướng.

Nhưng bạn chẳng sử dụng khả năng đặc biệt của NavLink.

Giống kiểu:

Tôi chỉ cần:

"bấm → chuyển trang"

nhưng lại lấy thằng có thêm:

"bấm → chuyển trang

\+ tao còn theo dõi trạng thái navigation"

Không cần thiết.

Code thể hiện ý định rõ hơn nếu:

Navigation/Menu item

→ NavLink

Link bình thường trong nội dung

→ Link

# **11\. Đặt Link, NavLink, &lt;a&gt; cạnh nhau**

Đây mới là bộ ba bạn nên phân biệt:

CẦN ĐI ĐÂU?

│

┌────────────┴────────────┐

▼ ▼

Trong React App Website khác

│ │

▼ ▼

Link / NavLink &lt;a&gt;

│

┌─────┴─────┐

▼ ▼

Không cần Cần trạng thái

active active

│ │

▼ ▼

Link NavLink

Ví dụ:

**Trang chi tiết:**

&lt;Link to="/products/15"&gt;

Xem sản phẩm

&lt;/Link&gt;

**Navbar:**

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

**Đi GitHub:**

&lt;a href="<https://github.com>"&gt;

GitHub

&lt;/a&gt;

# **12\. Câu nhớ để đi phỏng vấn**

Bạn có thể trả lời:

**Link và NavLink đều dùng để client-side navigation trong React Router mà không cần full-page reload. NavLink có thêm khả năng cung cấp trạng thái của link như isActive, nên thường dùng cho Navbar, Sidebar hoặc Menu cần highlight route hiện tại. Link phù hợp với những liên kết nội bộ chỉ cần điều hướng.**

Và trong đầu chỉ cần giữ:

Link

\=

ĐI ĐÂU?

NavLink

\=

ĐI ĐÂU?

-

TAO CÓ ĐANG ACTIVE KHÔNG?