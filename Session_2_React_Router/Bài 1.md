# **BÀI HỌC 1: ROUTING (CẤU HÌNH ĐỊNH TUYẾN CƠ BẢN)**

# **1\. Routing trong React là gì?**

## **1.1. Trước tiên: Routing nghĩa là gì?**

Routing đơn giản là:

**URL nào → hiển thị giao diện nào.**

Ví dụ website bán hàng:

URL Component cần hiển thị

/ → &lt;Home /&gt;

/products → &lt;ProductList /&gt;

/products/10 → &lt;ProductDetail /&gt;

/cart → &lt;Cart /&gt;

/login → &lt;Login /&gt;

Ví dụ người dùng đang truy cập:

/products

React Router nhìn URL và quyết định:

/products

↓

&lt;ProductList /&gt;

Nếu URL đổi thành:

/cart

thì:

/cart

↓

&lt;Cart /&gt;

Đó chính là **routing**.

# **2\. Tại sao React cần React Router?**

## **Website truyền thống**

Với cách làm web truyền thống, có thể hình dung:

User truy cập:

<https://abc.com/products>

↓

Browser gửi request lên Server

↓

Server trả về HTML

↓

Browser tải trang

Sau đó người dùng chuyển:

/products

↓

/cart

thì server có thể trả về một tài liệu/trang mới.

Browser

│

│ GET /cart

↓

Server

│

│ HTML

↓

Browser hiển thị trang mới

# **3\. React SPA khác ở đâu?**

Một ứng dụng React SPA thường có một HTML entry document, ví dụ:

&lt;div id="root"&gt;&lt;/div&gt;

React được mount vào:

# root

Sau đó React thay đổi UI bằng JavaScript.

Ví dụ:

URL: /products

&lt;div id="root"&gt;

&lt;ProductList /&gt;

&lt;/div&gt;

Người dùng chuyển sang:

/cart

React Router nhận thấy URL thay đổi và React render giao diện phù hợp:

&lt;div id="root"&gt;

&lt;Cart /&gt;

&lt;/div&gt;

Không cần full-page reload chỉ để chuyển giữa các route phía client.

Có thể nhớ:

URL

│

▼

React Router

│

"URL hiện tại là gì?"

│

┌──────┼─────────┐

▼ ▼ ▼

/ /products /cart

│ │ │

▼ ▼ ▼

Home Products Cart

React Router giống như **người điều phối giao diện dựa trên URL**.

# **4\. BrowserRouter là gì?**

Đầu tiên ta có:

&lt;BrowserRouter&gt;

...

&lt;/BrowserRouter&gt;

Bạn có thể hiểu:

BrowserRouter bật môi trường routing cho ứng dụng và đồng bộ routing với URL/history của browser.

Ví dụ:

&lt;BrowserRouter&gt;

&lt;App /&gt;

&lt;/BrowserRouter&gt;

Nhờ đó các component bên trong có thể sử dụng những tính năng của React Router.

Hình dung:

&lt;BrowserRouter&gt;

TOÀN BỘ KHU VỰC NÀY

ĐƯỢC SỬ DỤNG ROUTER

&lt;App /&gt;

&lt;/BrowserRouter&gt;

Thông thường nó được đặt rất cao trong cây component.

# **5\. Routes là gì?**

Tiếp theo:

&lt;Routes&gt;

&lt;/Routes&gt;

Routes là nơi chứa các Route và giúp React Router chọn route phù hợp với URL hiện tại.

Ví dụ:

&lt;Routes&gt;

&lt;Route path="/" element={<Home /&gt;} />

<Route

path="/products"

element={&lt;ProductList /&gt;}

/>

<Route

path="/cart"

element={&lt;Cart /&gt;}

/>

&lt;/Routes&gt;

Bạn có thể đọc nó như một bảng:

URL COMPONENT

/ → &lt;Home /&gt;

/products → &lt;ProductList /&gt;

/cart → &lt;Cart /&gt;

# **6\. Route là gì?**

Một Route cơ bản:

<Route

path="/products"

element={&lt;ProductList /&gt;}

/>

Có 2 phần quan trọng:

path

↓

URL nào?

element

↓

hiển thị Component nào?

Nên đọc câu trên bằng tiếng Việt:

Nếu URL match /products thì render &lt;ProductList /&gt;.

Hay:

/products

↓

match?

↓ YES

&lt;ProductList /&gt;

# **7\. Ghép cả ba lại**

Bây giờ:

&lt;BrowserRouter&gt;

&lt;Routes&gt;

<Route

path="/"

element={&lt;Home /&gt;}

/>

<Route

path="/products"

element={&lt;ProductList /&gt;}

/>

<Route

path="/cart"

element={&lt;Cart /&gt;}

/>

&lt;/Routes&gt;

&lt;/BrowserRouter&gt;

Hãy đọc từ ngoài vào:

BrowserRouter

│

│ Cho app sử dụng routing

│

└── Routes

│

│ Chọn Route phù hợp

│

├── "/" → Home

│

├── "/products" → ProductList

│

└── "/cart" → Cart

# **8\. Chạy tay một lần**

Giả sử người dùng vào:

<http://localhost:5173/products>

### **Bước 1**

BrowserRouter đọc location hiện tại:

/products

### **Bước 2**

Routes xem các Route:

&lt;Route path="/" ... /&gt;

&lt;Route path="/products" ... /&gt; // ← MATCH

&lt;Route path="/cart" ... /&gt;

### **Bước 3**

Route match:

<Route

path="/products"

element={&lt;ProductList /&gt;}

/>

### **Bước 4**

React render:

&lt;ProductList /&gt;

Kết quả:

Browser URL

localhost:5173/products

│

▼

React Router

│

▼

&lt;ProductList /&gt;

Đó là bản chất routing cơ bản.

# **9\. Nested Route là gì?**

Bây giờ mới đến phần dễ lú.

**Nested Route = Route con nằm trong Route cha.**

Ví dụ website có Dashboard:

/dashboard

/dashboard/settings

/dashboard/profile

/dashboard/orders

Ta nhận thấy tất cả đều chung:

/dashboard

Vì vậy có thể tổ chức:

&lt;Routes&gt;

<Route

path="dashboard"

element={&lt;Dashboard /&gt;}

\>

<Route

path="settings"

element={&lt;Settings /&gt;}

/>

<Route

path="profile"

element={&lt;Profile /&gt;}

/>

<Route

path="orders"

element={&lt;Orders /&gt;}

/>

&lt;/Route&gt;

&lt;/Routes&gt;

Cấu trúc:

dashboard

│

├── settings

│

├── profile

│

└── orders

URL tương ứng:

/dashboard/settings

/dashboard/profile

/dashboard/orders

Vì route con được đặt trong route cha nên path được ghép theo cấu trúc route.

# **10\. Nhưng tại sao cần &lt;Outlet /&gt;?**

Đây mới là điểm quan trọng nhất.

Giả sử Dashboard có giao diện:

function Dashboard() {

return (

&lt;div&gt;

&lt;h1&gt;Dashboard&lt;/h1&gt;

&lt;nav&gt;

Menu

&lt;/nav&gt;

&lt;/div&gt;

);

}

Người dùng vào:

/dashboard/settings

Router biết:

dashboard

↓

&lt;Dashboard /&gt;

settings

↓

&lt;Settings /&gt;

Nhưng có một vấn đề:

**&lt;Settings /&gt; phải được đặt ở đâu bên trong &lt;Dashboard /&gt;?**

React Router không tự đoán vị trí đó.

Bạn phải chỉ cho nó bằng:

&lt;Outlet /&gt;

# **11\. &lt;Outlet /&gt; = chỗ để Route con render**

Ta sửa Dashboard:

import { Outlet } from "react-router";

function Dashboard() {

return (

&lt;div&gt;

&lt;h1&gt;Dashboard&lt;/h1&gt;

&lt;nav&gt;

Menu

&lt;/nav&gt;

&lt;Outlet /&gt;

&lt;/div&gt;

);

}

Outlet có thể hiểu đơn giản là:

**"Cái lỗ/chỗ trống dành cho Component của Route con."**

# **12\. Chạy tay Nested Route**

Cấu hình:

<Route

path="dashboard"

element={&lt;Dashboard /&gt;}

\>

<Route

path="settings"

element={&lt;Settings /&gt;}

/>

&lt;/Route&gt;

và:

function Dashboard() {

return (

&lt;div&gt;

&lt;h1&gt;Dashboard&lt;/h1&gt;

&lt;Outlet /&gt;

&lt;/div&gt;

);

}

Người dùng truy cập:

/dashboard/settings

### **Bước 1 — Match cha**

/dashboard

↓

&lt;Dashboard /&gt;

### **Bước 2 — Match con**

settings

↓

&lt;Settings /&gt;

### **Bước 3 — render cha**

React bắt đầu có:

&lt;div&gt;

&lt;h1&gt;Dashboard&lt;/h1&gt;

&lt;Outlet /&gt;

&lt;/div&gt;

### **Bước 4 — Router lấy component của route con**

&lt;Settings /&gt;

và đặt nó **vào vị trí &lt;Outlet /&gt;**.

Có thể tưởng tượng:

&lt;Dashboard&gt;

&lt;h1&gt;Dashboard&lt;/h1&gt;

&lt;Outlet /&gt;

↑

│

nhét vào

│

&lt;Settings /&gt;

&lt;/Dashboard&gt;

Kết quả tương đương:

&lt;div&gt;

&lt;h1&gt;Dashboard&lt;/h1&gt;

&lt;Settings /&gt;

&lt;/div&gt;

# **13\. Ví dụ thực tế hơn: Dashboard có Sidebar**

Đây là lúc Nested Route cực kỳ có ý nghĩa.

function Dashboard() {

return (

&lt;div&gt;

&lt;Sidebar /&gt;

&lt;main&gt;

&lt;Outlet /&gt;

&lt;/main&gt;

&lt;/div&gt;

);

}

Routes:

<Route

path="dashboard"

element={&lt;Dashboard /&gt;}

\>

<Route

path="profile"

element={&lt;Profile /&gt;}

/>

<Route

path="settings"

element={&lt;Settings /&gt;}

/>

<Route

path="orders"

element={&lt;Orders /&gt;}

/>

&lt;/Route&gt;

Nếu URL:

/dashboard/profile

thì màn hình:

┌─────────────────────────────────────┐

│ DASHBOARD │

├────────────┬────────────────────────┤

│ │ │

│ Sidebar │ Profile │

│ │ &lt;Outlet&gt; │

│ Profile │ │

│ Settings │ │

│ Orders │ │

│ │ │

└────────────┴────────────────────────┘

Đổi URL:

/dashboard/settings

thì:

┌─────────────────────────────────────┐

│ DASHBOARD │

├────────────┬────────────────────────┤

│ │ │

│ Sidebar │ Settings │

│ │ &lt;Outlet&gt; │

│ Profile │ │

│ Settings │ │

│ Orders │ │

│ │ │

└────────────┴────────────────────────┘

**Dashboard/Sidebar vẫn là layout cha.**

Chỉ phần:

&lt;Outlet /&gt;

thay đổi.

Đó chính là lý do Nested Routes rất hữu ích cho:

Dashboard

Admin Panel

User Profile

Settings

Layout có Header/Sidebar

# **14\. Một câu cực dễ nhớ về từng thằng**

Bạn có thể cho nguyên phần này vào cuối docs:

BrowserRouter

→ Cho ứng dụng sử dụng routing dựa trên browser URL/history.

Routes

→ Khu vực chứa các Route và chọn route phù hợp.

Route

→ Quy định:

"URL này → render Component này"

Nested Route

→ Route con nằm trong Route cha.

Path con được ghép theo cấu trúc cha/con.

Outlet

→ Vị trí trong Component cha

nơi Component của Route con được render.

Và sơ đồ tổng kết:

BrowserRouter

│

└── Routes

│

├── Route "/"

│ ↓

│ Home

│

├── Route "/products"

│ ↓

│ Products

│

└── Route "dashboard"

↓

Dashboard

│

│ &lt;Outlet /&gt;

│

├── "profile"

│ ↓

│ Profile

│

└── "settings"

↓

Settings

### **Câu chốt để đi phỏng vấn**

**React Router ánh xạ URL tới UI trong ứng dụng React. Route xác định path nào render element nào. Nested Routes cho phép xây dựng UI theo cấu trúc cha-con, và Outlet là vị trí trong layout của route cha nơi route con được render.**

# **15\. Index Route — Route mặc định của Route cha**

Ở phần trước ta có Nested Routes:

<Route

path="dashboard"

element={&lt;Dashboard /&gt;}

\>

<Route

path="settings"

element={&lt;Settings /&gt;}

/>

&lt;/Route&gt;

Trong Dashboard:

function Dashboard() {

return (

&lt;div&gt;

&lt;h1&gt;Dashboard&lt;/h1&gt;

&lt;Outlet /&gt;

&lt;/div&gt;

);

}

Ta đã biết:

/dashboard/settings

↓

Dashboard

↓

&lt;Outlet /&gt;

↓

Settings

Nhưng có một vấn đề.

# **16\. Vấn đề khi chỉ truy cập /dashboard**

Nếu người dùng truy cập:

/dashboard

Route cha match:

<Route

path="dashboard"

element={&lt;Dashboard /&gt;}

/>

nên &lt;Dashboard /&gt; vẫn được render.

Nhưng **không có Route con nào match**.

Kết quả:

/dashboard

↓

&lt;Dashboard /&gt;

↓

&lt;h1&gt;Dashboard&lt;/h1&gt;

&lt;Outlet /&gt;

↓

???

Outlet không có component con nào để hiển thị.

Ví dụ giao diện có thể thành:

┌──────────────────────────────────┐

│ DASHBOARD │

├───────────┬──────────────────────┤

│ Sidebar │ │

│ │ TRỐNG │

│ Home │ │

│ Settings │ &lt;Outlet /&gt; │

│ Profile │ │

│ │ │

└───────────┴──────────────────────┘

Trong thực tế, ta thường muốn:

Khi người dùng vào /dashboard, hãy tự động hiển thị trang Home của Dashboard.

Đây là nhiệm vụ của **Index Route**.

# **17\. Cách sử dụng Index Route**

Ta viết:

<Route

path="dashboard"

element={&lt;Dashboard /&gt;}

\>

<Route

index

element={&lt;DashboardHome /&gt;}

/>

<Route

path="settings"

element={&lt;Settings /&gt;}

/>

&lt;/Route&gt;

Điểm đặc biệt:

&lt;Route index element={<DashboardHome /&gt;} />

không có:

path="..."

mà sử dụng:

index

Có thể hiểu:

**Index Route = Route con mặc định của Route cha.**

# **18\. Chạy tay Index Route**

## **Trường hợp 1: /dashboard**

Người dùng truy cập:

/dashboard

Route cha match:

dashboard

↓

&lt;Dashboard /&gt;

Không có thêm đoạn URL phía sau.

Router tìm thấy:

<Route

index

element={&lt;DashboardHome /&gt;}

/>

nên:

/dashboard

↓

Dashboard

↓

&lt;Outlet /&gt;

↓

DashboardHome

Kết quả tương đương:

&lt;Dashboard&gt;

&lt;DashboardHome /&gt;

&lt;/Dashboard&gt;

Giao diện:

┌──────────────────────────────────┐

│ DASHBOARD │

├───────────┬──────────────────────┤

│ Sidebar │ │

│ │ Dashboard Home │

│ Home │ │

│ Settings │ &lt;Outlet /&gt; │

│ Profile │ │

│ │ │

└───────────┴──────────────────────┘

# **19\. Nếu truy cập /dashboard/settings thì sao?**

URL:

/dashboard/settings

Lúc này:

&lt;Route path="settings" element={<Settings /&gt;} />

match.

Do đó:

/dashboard/settings

↓

Dashboard

↓

&lt;Outlet /&gt;

↓

Settings

Giao diện:

┌──────────────────────────────────┐

│ DASHBOARD │

├───────────┬──────────────────────┤

│ Sidebar │ │

│ │ Settings │

│ Home │ │

│ Settings │ &lt;Outlet /&gt; │

│ Profile │ │

│ │ │

└───────────┴──────────────────────┘

Vậy cùng một &lt;Outlet /&gt;:

/dashboard

↓

&lt;DashboardHome /&gt;

/dashboard/settings

↓

&lt;Settings /&gt;

# **20\. Cách nhớ Index Route**

Hãy coi index giống như:

**"Trang mặc định của cha."**

Ví dụ:

dashboard

│

├── index → DashboardHome

│

├── settings → Settings

│

└── profile → Profile

Tương ứng:

/dashboard

→ DashboardHome

/dashboard/settings

→ Settings

/dashboard/profile

→ Profile

Code:

&lt;Route path="dashboard" element={<Dashboard /&gt;}>

<Route

index

element={&lt;DashboardHome /&gt;}

/>

<Route

path="settings"

element={&lt;Settings /&gt;}

/>

<Route

path="profile"

element={&lt;Profile /&gt;}

/>

&lt;/Route&gt;

**Lưu ý:** Index Route là route mặc định ở một cấp route, nên nó không có path và không được có route con.

# **21\. Layout Route là gì?**

Bây giờ đến một trường hợp khác.

Giả sử website có:

/login

/register

Hai trang này có giao diện chung:

┌────────────────────────────────┐

│ │

│ MY WEBSITE │

│ │

│ ┌──────────────────┐ │

│ │ │ │

│ │ Login/Register │ │

│ │ │ │

│ └──────────────────┘ │

│ │

│ © 2026 My Website │

│ │

└────────────────────────────────┘

Bạn muốn:

Login

Register

đều nằm trong cùng một:

&lt;AuthLayout /&gt;

nhưng **không muốn URL có thêm /auth**.

Tức là vẫn muốn:

/login

/register

chứ không phải:

/auth/login

/auth/register

Đây là lúc dùng **Layout Route**.

# **22\. Cách khai báo Layout Route**

&lt;Route element={<AuthLayout /&gt;}>

<Route

path="login"

element={&lt;Login /&gt;}

/>

<Route

path="register"

element={&lt;Register /&gt;}

/>

&lt;/Route&gt;

Hãy chú ý Route cha:

&lt;Route element={<AuthLayout /&gt;}>

có:

element ✅

path ❌

Đây là ý quan trọng.

Vì **không có path**, Route này không thêm đoạn nào vào URL.

# **23\. AuthLayout cũng cần &lt;Outlet /&gt;**

Ví dụ:

function AuthLayout() {

return (

&lt;div&gt;

&lt;h1&gt;My Website&lt;/h1&gt;

&lt;main&gt;

&lt;Outlet /&gt;

&lt;/main&gt;

&lt;footer&gt;

© 2026 My Website

&lt;/footer&gt;

&lt;/div&gt;

);

}

Outlet vẫn có nhiệm vụ:

Đây là vị trí để component của Route con xuất hiện.

# **24\. Chạy tay Layout Route**

Routes:

&lt;Route element={<AuthLayout /&gt;}>

<Route

path="login"

element={&lt;Login /&gt;}

/>

<Route

path="register"

element={&lt;Register /&gt;}

/>

&lt;/Route&gt;

Người dùng truy cập:

/login

Router match:

AuthLayout

↓

Login

và:

&lt;AuthLayout&gt;

Header

&lt;Outlet /&gt;

↓

Login

Footer

&lt;/AuthLayout&gt;

Kết quả:

┌─────────────────────────────┐

│ My Website │

│ │

│ LOGIN │

│ Email │

│ Password │

│ │

│ © 2026 My Website │

└─────────────────────────────┘

URL vẫn chỉ là:

/login

**Không xuất hiện /auth** vì Layout Route không có path.

# **25\. Nếu truy cập /register**

Tương tự:

/register

↓

AuthLayout

↓

&lt;Outlet /&gt;

↓

Register

Giao diện cha vẫn giữ nguyên:

┌─────────────────────────────┐

│ My Website │

│ │

│ REGISTER │

│ Name │

│ Email │

│ Password │

│ │

│ © 2026 My Website │

└─────────────────────────────┘

Chỉ nội dung trong:

&lt;Outlet /&gt;

thay đổi.

# **26\. Cách nhớ Layout Route**

&lt;Route element={<AuthLayout /&gt;}>

có:

element ✅

path ❌

Nên:

CÓ giao diện cha

↓

AuthLayout

NHƯNG

KHÔNG thêm URL

Câu nhớ:

**Layout Route = thêm khung giao diện nhưng không thêm URL.**

# **27\. Route Prefix là gì?**

Bây giờ ta làm **ngược lại Layout Route**.

Giả sử website có:

/projects

/projects/1

/projects/2

/projects/3

Tất cả đều có chung:

/projects

Ta muốn gom chúng lại cho routes dễ quản lý:

&lt;Route path="projects"&gt;

<Route

index

element={&lt;ProjectsHome /&gt;}

/>

<Route

path=":pid"

element={&lt;Project /&gt;}

/>

&lt;/Route&gt;

Hãy chú ý Route cha:

&lt;Route path="projects"&gt;

có:

path ✅

element ❌

Nó không có component giao diện riêng.

# **28\. Route Prefix làm gì?**

Route cha:

&lt;Route path="projects"&gt;

đóng vai trò:

**Thêm projects vào phía trước path của các Route con.**

Ví dụ con:

<Route

path=":pid"

element={&lt;Project /&gt;}

/>

Cha:

projects

Con:

:pid

\=

/projects/:pid

# **29\. Chạy tay Route Prefix**

Ta có:

&lt;Route path="projects"&gt;

<Route

index

element={&lt;ProjectsHome /&gt;}

/>

<Route

path=":pid"

element={&lt;Project /&gt;}

/>

&lt;/Route&gt;

## **Trường hợp /projects**

/projects

↓

projects

↓

index

↓

&lt;ProjectsHome /&gt;

## **Trường hợp /projects/123**

/projects/123

│ │

│ └── :pid = 123

│

└── projects

Router match:

projects

-

:pid

↓

/projects/:pid

và render:

&lt;Project /&gt;

Trong Project sau này bạn có thể lấy:

const { pid } = useParams();

và nhận:

pid = "123"

# **30\. Tại sao Route Prefix không cần &lt;Outlet /&gt;?**

Đây là điểm rất dễ nhầm với Nested Route có layout.

Ví dụ:

&lt;Route path="projects"&gt;

không có:

element={&lt;Something /&gt;}

Tức là **không có component cha nào được render**.

Vì vậy cũng không có component cha nào cần đặt:

&lt;Outlet /&gt;

Nó chỉ tổ chức URL:

projects

│

├── index

│

└── :pid

Chứ không tạo thêm UI cha.

# **31\. So sánh Layout Route và Route Prefix**

Đây là phần **nên nhớ nhất**:

<div class="joplin-table-wrapper"><table><thead><tr><th></th><th><pre><code><strong>path</strong></code></pre></th><th><pre><code><strong>element</strong></code></pre></th><th><p><strong>Tác dụng</strong></p></th></tr><tr><th><p>Layout Route</p></th><th><p>❌</p></th><th><p>✅</p></th><th><p>Thêm giao diện/layout</p></th></tr><tr><th><p>Route Prefix</p></th><th><p>✅</p></th><th><p>❌</p></th><th><p>Thêm tiền tố URL</p></th></tr><tr><th><p>Route bình thường</p></th><th><p>✅</p></th><th><p>✅</p></th><th><p>Có URL + giao diện</p></th></tr></thead></table></div>

Ví dụ:

### **Layout Route**

&lt;Route element={<AuthLayout /&gt;}>

Có:

element ✅

path ❌

→ **Thêm UI nhưng không thêm URL.**

### **Route Prefix**

&lt;Route path="projects"&gt;

Có:

path ✅

element ❌

→ **Thêm URL nhưng không thêm UI.**

### **Route bình thường**

<Route

path="dashboard"

element={&lt;Dashboard /&gt;}

/>

Có:

path ✅

element ✅

→ **Vừa có URL vừa có UI.**

# **32\. Tổng hợp 4 loại Route vừa học**

Bây giờ có thể gom toàn bộ lại:

1\. NORMAL ROUTE

────────────────────────────

path ✅

element ✅

<Route

path="dashboard"

element={&lt;Dashboard /&gt;}

/>

→ Có URL

→ Có Component

2\. INDEX ROUTE

────────────────────────────

index ✅

path ❌

<Route

index

element={&lt;DashboardHome /&gt;}

/>

→ Component mặc định của cha

3\. LAYOUT ROUTE

────────────────────────────

path ❌

element ✅

&lt;Route element={<AuthLayout /&gt;}>

→ Có Layout/UI

→ Không thêm URL

4\. ROUTE PREFIX

────────────────────────────

path ✅

element ❌

&lt;Route path="projects"&gt;

→ Thêm prefix URL

→ Không thêm UI

## **🧠 Câu thần chú để nhớ**

INDEX

→ "Con mặc định của cha"

LAYOUT ROUTE

→ "Có UI, không thêm URL"

ROUTE PREFIX

→ "Có thêm URL, không thêm UI"

NORMAL ROUTE

→ "Có URL, có UI"

Và đặc biệt đừng học thuộc code trước. Chỉ cần nhìn:

&lt;Route path="..." element={...}&gt;

rồi hỏi **2 câu**:

Có path không?

↓

Có → ảnh hưởng URL

Có element không?

↓

Có → render giao diện

# **33\. URL Parameters là gì?**

Giả sử website bán hàng có hàng nghìn sản phẩm:

/products/1

/products/2

/products/3

/products/100

/products/999

Ta **không thể** khai báo 999 Route như:

&lt;Route path="/products/1" element={<Product /&gt;} />

&lt;Route path="/products/2" element={<Product /&gt;} />

&lt;Route path="/products/3" element={<Product /&gt;} />

...

Trong thực tế, tất cả URL trên đều có chung cấu trúc:

/products/{ID sản phẩm}

Chỉ có ID thay đổi.

React Router cho phép biểu diễn phần thay đổi đó bằng **Dynamic Segment**:

<Route

path="/products/:productId"

element={&lt;Product /&gt;}

/>

Trong đó:

/products/:productId

└────┬─────┘

│

giá trị động

Có thể hiểu:

:productId là một biến nằm trong URL.

# **34\. Dynamic Segment — dấu :**

Cú pháp:

:tênBiến

Ví dụ:

<Route

path="/products/:productId"

element={&lt;Product /&gt;}

/>

Route này có thể match:

/products/1

/products/10

/products/999

/products/iphone-15

/products/abc

Bởi vì:

/products/:productId

↑

│

chỗ này động

# **35\. Liên hệ với Spring Boot**

Nếu bạn đã biết:

@GetMapping("/products/{productId}")

public Product getProduct(

@PathVariable Long productId

) {

...

}

thì React Router:

<Route

path="/products/:productId"

element={&lt;Product /&gt;}

/>

Có thể liên hệ:

SPRING BOOT

────────────────────────

/products/{productId}

@PathVariable

↓

productId

REACT ROUTER

────────────────────────

/products/:productId

useParams()

↓

productId

Hai bên đều đang lấy **một phần động từ URL**.

Chỉ khác syntax:

Spring Boot React Router

{productId} :productId

# **36\. useParams() dùng để làm gì?**

Khai báo Route:

<Route

path="/products/:productId"

element={&lt;Product /&gt;}

/>

Nếu người dùng truy cập:

/products/15

React Router biết:

productId = "15"

Nhưng Component &lt;Product /&gt; cần lấy giá trị đó ra để sử dụng.

Ta dùng:

import { useParams } from "react-router";

function Product() {

const params = useParams();

console.log(params);

}

Kết quả có thể hiểu là:

{

productId: "15"

}

useParams() trả về một object chứa các dynamic parameters của URL.

# **37\. Destructuring useParams()**

Thay vì:

const params = useParams();

console.log(params.productId);

ta thường viết:

const { productId } = useParams();

Đây chính là **Object Destructuring** mà bạn đã học trong JavaScript.

useParams()

↓

{

productId: "15"

}

↓ destructuring

const { productId } = useParams();

↓

productId = "15"

Không phải syntax đặc biệt của React.

Phần:

const { productId }

chỉ là JavaScript destructuring.

# **38\. Chạy tay Dynamic Parameter**

Route:

<Route

path="/products/:productId"

element={&lt;Product /&gt;}

/>

Người dùng truy cập:

<http://localhost:5173/products/15>

### **Bước 1 — Router kiểm tra URL**

Route:

/products/:productId

URL:

/products/15

So sánh:

/products/:productId

│ │

│ ↓

│ "15"

│

└── products khớp

→ Route match.

### **Bước 2 — Render Component**

&lt;Product /&gt;

### **Bước 3 — Component gọi**

const { productId } = useParams();

React Router trả:

productId = "15"

# **39\. Dynamic Parameter dùng để gọi Backend API**

Đây mới là ứng dụng thực tế quan trọng.

Frontend:

/products/15

React Router lấy:

productId = "15"

Sau đó có thể gọi:

fetch(\`/api/products/\${productId}\`);

Request:

GET /api/products/15

Spring Boot:

@GetMapping("/api/products/{id}")

public Product getProduct(

@PathVariable Long id

) {

...

}

Toàn bộ flow:

User

│

│ truy cập

▼

/products/15

│

▼

React Router

│

│ useParams()

▼

productId = "15"

│

│

│ fetch("/api/products/15")

▼

Spring Boot

│

│ @PathVariable

▼

id = 15

│

▼

Database

│

▼

Product #15

│

▼

React

│

▼

&lt;Product /&gt;

Đây là use case bạn sẽ dùng rất nhiều.

# **40\. Một Route có thể có nhiều Dynamic Segments**

Ví dụ:

<Route

path="/c/:categoryId/p/:productId"

element={&lt;Product /&gt;}

/>

Người dùng truy cập:

/c/dien-thoai/p/iphone-15

So sánh:

/c/:categoryId/p/:productId

/c/dien-thoai/p/iphone-15

└────┬────┘ └────┬────┘

│ │

▼ ▼

categoryId productId

│ │

"dien-thoai" "iphone-15"

Trong Component:

function Product() {

const {

categoryId,

productId

} = useParams();

}

Kết quả:

categoryId = "dien-thoai"

productId = "iphone-15"

# **41\. Tên trong useParams() phải khớp với tên trong Route**

Nếu khai báo:

&lt;Route path="/products/:productId" /&gt;

thì:

const { productId } = useParams();

✅ Đúng.

Nhưng:

const { id } = useParams();

❌ Không lấy được productId.

Bởi vì bạn đã đặt tên parameter là:

:productId

Có thể nhớ:

Route

/products/:productId

│

└─────────────┐

▼

useParams()

│

▼

{ productId: "15" }

# **42\. Lưu ý: URL Parameter thường là String**

Ví dụ:

/products/15

thì:

const { productId } = useParams();

giá trị lấy ra về cơ bản là:

productId === "15"

chứ không phải:

productId === 15

Nếu thực sự cần number, bạn có thể chuyển:

const id = Number(productId);

Điểm này khá dễ dính bug:

"15" === 15

// false

# **43\. Optional Segment — dấu ?**

Bây giờ giả sử website hỗ trợ ngôn ngữ:

/categories

/vn/categories

/en/categories

Bạn muốn phần ngôn ngữ:

vn

en

**có cũng được, không có cũng được.**

Ta có thể khai báo:

<Route

path=":lang?/categories"

element={&lt;Categories /&gt;}

/>

Dấu:

?

có nghĩa:

Segment này là **optional — tùy chọn**.

# **44\. Chạy tay Optional Segment**

Route:

:lang?/categories

## **URL 1**

/categories

Vẫn match.

Lúc này:

const { lang } = useParams();

thì lang không có giá trị.

## **URL 2**

/vn/categories

Cũng match.

lang = "vn"

## **URL 3**

/en/categories

Cũng match:

lang = "en"

Hình dung:

:lang?/categories

│

│ optional

▼

┌───────────────┐

│ │

/categories /vn/categories

│

▼

lang = "vn"

# **45\. Optional Static Segment**

Không phải lúc nào phần optional cũng phải là biến.

Ví dụ:

<Route

path="users/:userId/edit?"

element={&lt;User /&gt;}

/>

Ở đây:

:userId

là dynamic segment.

Còn:

edit?

là một static segment tùy chọn.

Vì vậy cả hai đều match:

/users/123

và:

/users/123/edit

Có thể hiểu:

/users/:userId/edit?

│ │

│ └── "edit" có hoặc không đều được

│

└── giá trị động

# **46\. Splats / Catch-All — \***

Bây giờ đến một loại khác.

Giả sử website quản lý file:

/files/images

/files/images/avatar.png

/files/images/2026/avatar.png

/files/documents/java/spring/lesson.pdf

Bạn không biết phía sau /files/ sẽ có:

1 đoạn URL?

5 đoạn?

10 đoạn?

Nếu dùng parameter bình thường:

/files/:something

thì không phù hợp khi muốn bắt **toàn bộ phần đường dẫn còn lại**.

Ta sử dụng:

\*

# **47\. Khai báo Splat Route**

<Route

path="files/\*"

element={&lt;File /&gt;}

/>

Ý nghĩa:

files/\*

↑

│

└── lấy toàn bộ phần còn lại

Ví dụ:

/files/images/2026/avatar.png

└───────────┬───────────┘

│

\*

Giá trị của \*:

images/2026/avatar.png

# **48\. Lấy giá trị \* bằng useParams()**

Ta vẫn sử dụng:

useParams()

Ví dụ:

const params = useParams();

có thể hình dung kết quả:

{

"\*": "images/2026/avatar.png"

}

Nhưng tên property ở đây lại là:

"\*"

nên có thể destructuring và đổi tên:

const { "\*": filePath } = useParams();

Đừng bị cú pháp này dọa. 😆

Đây vẫn chỉ là **Object Destructuring + đổi tên biến**.

Bạn từng học kiểu:

const {

name: userName

} = user;

Nghĩa là:

property name

↓

đổi tên thành

↓

userName

Thì ở đây:

const {

"\*": filePath

} = useParams();

nghĩa là:

property "\*"

↓

đổi tên thành

↓

filePath

# **49\. Chạy tay Splat**

Route:

<Route

path="files/\*"

element={&lt;File /&gt;}

/>

URL:

/files/images/2026/avatar.png

Router tách:

/files/images/2026/avatar.png

│ └───────────┬───────────┘

│ │

files \*

│

▼

images/2026/avatar.png

Component:

function File() {

const { "\*": filePath } = useParams();

console.log(filePath);

}

Kết quả:

images/2026/avatar.png

# **50\. Splat dùng để làm gì?**

Một use case dễ hiểu là **file browser**:

/files

│

├── images

│ ├── avatar.png

│ └── products

│ └── iphone.png

│

└── documents

└── report.pdf

Bạn muốn URL:

/files/images/avatar.png

/files/images/products/iphone.png

/files/documents/report.pdf

Thay vì phải đoán trước có bao nhiêu cấp thư mục:

folder1

folder2

folder3

folder4

...

chỉ cần:

&lt;Route path="files/\*" element={<File /&gt;} />

và lấy toàn bộ phần còn lại.

\* cũng thường xuất hiện trong routing để xử lý các đường dẫn không khớp, chẳng hạn route 404, tùy cách tổ chức route của ứng dụng.

# **51\. Phân biệt Dynamic, Optional và Splat**

Đây là bảng nên nhớ:

<div class="joplin-table-wrapper"><table><thead><tr><th><p><strong>Loại</strong></p></th><th><p><strong>Syntax</strong></p></th><th><p><strong>Ý nghĩa</strong></p></th></tr><tr><th><p>Dynamic</p></th><th><pre><code>:id</code></pre></th><th><p>Một segment động</p></th></tr><tr><th><p>Optional</p></th><th><p>:id? / edit?</p></th><th><p>Segment có hoặc không</p></th></tr><tr><th><p>Splat</p></th><th><pre><code>*</code></pre></th><th><p>Toàn bộ phần URL còn lại</p></th></tr></thead></table></div>

Ví dụ:

DYNAMIC

────────────────────────

/products/:id

/products/123

id = "123"

OPTIONAL

────────────────────────

:lang?/products

/products

/vn/products

lang có thể không có

hoặc lang = "vn"

SPLAT

────────────────────────

/files/\*

/files/images/2026/avatar.png

\* = "images/2026/avatar.png"

# **52\. Dynamic Segment vs Splat rất dễ nhầm**

### **Dynamic Segment**

/products/:id

:id đại diện cho **một segment**:

/products/123

↑

id

### **Splat**

/files/\*

\* có thể lấy **phần đường dẫn còn lại gồm nhiều segment**:

/files/images/2026/avatar.png

└───────────┬───────────┘

\*

Nên nhớ:

:id

→ một khúc

\*

→ vét phần còn lại

# **53\. Tổng kết URL Parameters**

Bạn có thể chốt phần này trong docs bằng sơ đồ:

URL PARAMETERS

│

├── Dynamic Segment

│

│ :productId

│

│ /products/15

│ ↓

│ productId = "15"

│

├── Optional Segment

│

│ :lang?

│

│ /categories

│ /vn/categories

│

│ → có hoặc không đều được

│

└── Splat / Catch-All

│

\*

│

/files/images/2026/avatar.png

└───────────┬───────────┘

↓

"images/2026/avatar.png"

Và Hook quan trọng nhất của cả phần:

const params = useParams();

Có thể nhớ một câu:

**useParams() = lấy những giá trị động mà React Router đã bóc ra từ URL.**

Đối với bạn có background Spring Boot thì nhớ cặp này là đẹp nhất:

React Router Spring Boot

────────────────────────────────────────────

:productId {productId}

useParams() @PathVariable

/products/15 /products/15

│ │

▼ ▼

productId = "15" productId = 15

Đặc biệt phần **#39** rất đáng nhớ cho lúc làm project, vì sau này flow thực tế gần như sẽ là:

Route :id

↓

useParams()

↓

Axios / fetch

↓

Spring @PathVariable

↓

Database

↓

Response

↓

Render Component

# **54\. Chuyển trang trong React: &lt;Link&gt; và &lt;NavLink&gt;**

Sau các phần trước, ta đã biết cách **khai báo Route**:

&lt;Routes&gt;

&lt;Route path="/" element={<Home /&gt;} />

&lt;Route path="/products" element={<Products /&gt;} />

&lt;Route path="/cart" element={<Cart /&gt;} />

&lt;/Routes&gt;

Nghĩa là:

/ → Home

/products → Products

/cart → Cart

Nhưng còn một vấn đề:

Người dùng **bấm vào đâu** để chuyển từ / sang /products?

Đó là nhiệm vụ của:

&lt;Link&gt;

&lt;NavLink&gt;

# **55\. Trước tiên: tại sao không dùng &lt;a href&gt; cho internal navigation?**

HTML bình thường:

&lt;a href="/products"&gt;

Products

&lt;/a&gt;

Khi click:

User click

↓

&lt;a href="/products"&gt;

↓

Browser điều hướng tới URL mới

↓

Request document mới

↓

Trang hiện tại bị unload

↓

App React khởi động lại

Đây là **full-page navigation/reload**.

Trong khi React Router muốn:

User click

↓

&lt;Link to="/products"&gt;

↓

React Router cập nhật URL

↓

Không full-page reload

↓

Router match URL mới

↓

React render Component tương ứng

Ví dụ:

URL ban đầu:

localhost:5173/

↓

&lt;Home /&gt;

User click Products

↓

localhost:5173/products

↓

&lt;Products /&gt;

Ứng dụng React vẫn đang chạy.

# **56\. &lt;Link&gt; là gì?**

Có thể hiểu:

**&lt;Link&gt; là cách React Router tạo liên kết để điều hướng nội bộ trong SPA.**

Ví dụ:

import { Link } from "react-router";

function Header() {

return (

&lt;nav&gt;

&lt;Link to="/"&gt;

Home

&lt;/Link&gt;

&lt;Link to="/products"&gt;

Products

&lt;/Link&gt;

&lt;Link to="/cart"&gt;

Cart

&lt;/Link&gt;

&lt;/nav&gt;

);

}

Chú ý:

HTML:

&lt;a href="/products"&gt;

React Router:

&lt;Link to="/products"&gt;

Có thể nhớ:

&lt;a&gt;

href="/products"

&lt;Link&gt;

to="/products"

# **57\. Chạy tay &lt;Link&gt;**

Ta có:

&lt;BrowserRouter&gt;

&lt;Header /&gt;

&lt;Routes&gt;

&lt;Route path="/" element={<Home /&gt;} />

&lt;Route path="/products" element={<Products /&gt;} />

&lt;Route path="/cart" element={<Cart /&gt;} />

&lt;/Routes&gt;

&lt;/BrowserRouter&gt;

Trong Header:

&lt;Link to="/products"&gt;

Products

&lt;/Link&gt;

Ban đầu:

URL:

/

↓

Routes tìm Route match

↓

&lt;Home /&gt;

Người dùng click:

Products

### **Bước 1**

Link yêu cầu React Router chuyển đến:

/products

### **Bước 2**

URL browser thay đổi:

/

↓

/products

### **Bước 3**

Routes kiểm tra lại:

&lt;Route path="/" ... /&gt;

<Route

path="/products"

element={&lt;Products /&gt;}

/> // ← MATCH

&lt;Route path="/cart" ... /&gt;

### **Bước 4**

React render:

&lt;Products /&gt;

Flow:

&lt;Link to="/products"&gt;

↓

URL = /products

↓

&lt;Routes&gt;

↓

tìm Route phù hợp

↓

&lt;Route path="/products"&gt;

↓

&lt;Products /&gt;

# **58\. &lt;Link&gt; có làm mất State không?**

Đây là một trong những lợi ích quan trọng của client-side navigation.

Giả sử một phần state của app đang có:

const \[cart, setCart\] = useState(\[

{ id: 1, name: "iPhone" }

\]);

Nếu ứng dụng bị **full-page reload**, toàn bộ JavaScript app được khởi tạo lại nên state nằm trong memory có thể bị mất/reset.

Nhưng khi chuyển route bằng:

&lt;Link to="/products"&gt;

React Router thực hiện client-side navigation.

App không bị khởi động lại toàn bộ chỉ vì chuyển route.

Tuy nhiên cần hiểu chính xác:

Link **không đảm bảo mọi local state của mọi component luôn tồn tại**.

Ví dụ nếu chuyển route khiến một component bị unmount:

&lt;ProductDetail /&gt;

↓

unmount

thì local state của chính component đó cũng biến mất.

Vì vậy câu đúng hơn là:

Link

→ không full-page reload

→ không reset toàn bộ React application

NHƯNG

Component bị unmount

→ local state của component đó vẫn có thể mất

Điểm này rất đáng nhớ khi phỏng vấn.

# **59\. Vậy &lt;NavLink&gt; là gì?**

NavLink có chức năng điều hướng giống Link.

Ví dụ:

&lt;NavLink to="/products"&gt;

Products

&lt;/NavLink&gt;

vẫn chuyển đến:

/products

Nhưng NavLink có thêm khả năng:

**Biết link của mình có đang active theo URL hiện tại hay không.**

Ví dụ Navbar:

Home Products Cart

↑

đang ở đây

Nếu URL:

/products

ta muốn Products được highlight.

Ví dụ:

Home \[ PRODUCTS \] Cart

Đây là use case chính của NavLink.

# **60\. isActive là gì?**

Ví dụ:

<NavLink

to="/products"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Products

&lt;/NavLink&gt;

React Router cung cấp:

isActive

cho callback này.

Có thể hiểu:

URL hiện tại

↓

/products

NavLink:

to="/products"

↓

Có active không?

↓

YES

↓

isActive = true

Còn:

&lt;NavLink to="/cart"&gt;

trong khi URL đang là:

/products

thì:

isActive = false

# **61\. Đừng sợ syntax className={({ isActive }) => ...}**

Đoạn này nhìn lần đầu khá đáng sợ:

className={({ isActive }) =>

isActive ? "active" : ""

}

Nhưng toàn bộ đều là JavaScript bạn đã học.

Tách ra sẽ dễ hiểu.

React Router đưa cho function một object đại loại:

{

isActive: true

}

Ta destructuring:

({ isActive })

Sau đó arrow function:

({ isActive }) => {

...

}

Rồi ternary:

isActive ? "active" : ""

Ghép lại:

({ isActive }) =>

isActive ? "active" : ""

Nghĩa là:

Nếu isActive = true

↓

return "active"

Nếu isActive = false

↓

return ""

# **62\. Chạy tay NavLink**

Ta có:

<NavLink

to="/products"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Products

&lt;/NavLink&gt;

CSS:

.active {

font-weight: bold;

}

## **Trường hợp 1**

URL:

/cart

NavLink:

to="/products"

Không active:

isActive = false

nên:

false ? "active" : ""

kết quả:

""

Không có class active.

## **Trường hợp 2**

URL:

/products

NavLink:

to="/products"

active:

isActive = true

nên:

true ? "active" : ""

kết quả:

"active"

HTML render ra sẽ có class tương ứng và CSS highlight nó.

# **63\. Ví dụ Navbar hoàn chỉnh**

import { NavLink } from "react-router";

function Header() {

return (

&lt;nav&gt;

<NavLink

to="/"

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

to="/cart"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Cart

&lt;/NavLink&gt;

&lt;/nav&gt;

);

}

CSS:

nav a {

margin-right: 20px;

}

.active {

font-weight: bold;

text-decoration: underline;

}

Nếu URL:

/products

thì có thể hình dung:

Home PRODUCTS Cart

────────

↑

active

# **64\. Link và NavLink khác nhau ở đâu?**

Cả hai đều:

Chuyển URL

↓

không full-page reload

↓

React Router render Route mới

Khác nhau ở:

<div class="joplin-table-wrapper"><table><thead><tr><th></th><th><pre><code><strong>Link</strong></code></pre></th><th><pre><code><strong>NavLink</strong></code></pre></th></tr><tr><th><p>Điều hướng</p></th><th><p>✅</p></th><th><p>✅</p></th></tr><tr><th><p>Không full-page reload</p></th><th><p>✅</p></th><th><p>✅</p></th></tr><tr><th><p>Biết active state</p></th><th><p>❌</p></th><th><p>✅</p></th></tr><tr><th><p>Phù hợp menu/navbar</p></th><th><p>Có thể</p></th><th><p>⭐ Rất phù hợp</p></th></tr></thead></table></div>

Cách nhớ:

Link

→ "Tao chỉ cần chuyển trang."

NavLink

→ "Tao chuyển trang

\+ tao cần biết link này

có đang active không."

# **65\. Khi nào dùng Link?**

Ví dụ Product Card:

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

Giả sử:

product.id = 15;

thì:

to={\`/products/\${product.id}\`}

trở thành:

/products/15

Sau đó Route:

<Route

path="/products/:productId"

element={&lt;ProductDetail /&gt;}

/>

match.

Bạn thấy kiến thức phần trước bắt đầu nối lại:

Product Card

↓

&lt;Link to="/products/15"&gt;

↓

URL

/products/15

↓

Route

/products/:productId

↓

useParams()

↓

productId = "15"

↓

fetch / Axios

↓

GET /api/products/15

🔥 Đây chính là flow cực kỳ thực tế.

# **66\. Khi nào dùng NavLink?**

NavLink đặc biệt phù hợp cho:

Navbar

Sidebar

Dashboard menu

Tab navigation

Ví dụ Dashboard:

&lt;NavLink to="/dashboard"&gt;

Home

&lt;/NavLink&gt;

&lt;NavLink to="/dashboard/profile"&gt;

Profile

&lt;/NavLink&gt;

&lt;NavLink to="/dashboard/settings"&gt;

Settings

&lt;/NavLink&gt;

Nếu đang ở:

/dashboard/settings

thì có thể highlight:

Dashboard

Home

Profile

\> SETTINGS

Người dùng nhìn vào là biết:

"Mình đang đứng ở Settings."

# **67\. Một lưu ý quan trọng với NavLink to="/"**

Có một trường hợp bạn rất dễ gặp.

Giả sử:

&lt;NavLink to="/"&gt;

Home

&lt;/NavLink&gt;

Ta thường chỉ muốn Home active khi URL **chính xác là**:

/

Vì vậy với menu Home, bạn thường sẽ gặp:

<NavLink

to="/"

end

\>

Home

&lt;/NavLink&gt;

end yêu cầu việc active matching kết thúc tại đó.

Có thể nhớ đơn giản:

to="/"

-

end

→ chỉ coi Home active khi đang ở "/"

Đây là một chi tiết nhỏ nhưng khá hữu ích khi bạn tự làm Navbar.

# **68\. &lt;Link&gt; khác &lt;a&gt; như thế nào?**

Đây là câu có thể xuất hiện khi phỏng vấn fresher.

### **&lt;a href&gt;**

&lt;a href="/products"&gt;

Products

&lt;/a&gt;

Thông thường thực hiện browser navigation tới document/URL mới.

Với internal SPA route, điều đó có thể khiến app bị reload.

### **&lt;Link&gt;**

&lt;Link to="/products"&gt;

Products

&lt;/Link&gt;

React Router xử lý navigation phía client.

URL thay đổi

↓

Router match Route

↓

React render UI tương ứng

không cần full-page reload.

# **69\. Có phải tuyệt đối không bao giờ dùng &lt;a&gt; trong React?**

**Không.**

Câu trong tài liệu:

"Trong React, tuyệt đối không dùng &lt;a href&gt;"

nói hơi mạnh quá.

Quy tắc chính xác hơn:

### **Điều hướng nội bộ trong React app**

Ví dụ:

/products

/cart

/profile

→ dùng:

&lt;Link&gt;

hoặc:

&lt;NavLink&gt;

### **Link sang website bên ngoài**

Ví dụ:

GitHub

Google

YouTube

thì &lt;a&gt; hoàn toàn bình thường:

<a

href="<https://github.com>"

target="\_blank"

rel="noreferrer"

\>

GitHub

&lt;/a&gt;

Vậy nhớ:

INTERNAL SPA NAVIGATION

↓

Link / NavLink

EXTERNAL WEBSITE

↓

&lt;a href&gt;

# **70\. Tổng kết Link và NavLink**

NAVIGATION

│

┌───────────┴───────────┐

▼ ▼

Link NavLink

│ │

│ │

chuyển Route chuyển Route

│ │

│ +

│ biết isActive

│ │

▼ ▼

Product Card Navbar

Button-like link Sidebar

Detail link Menu

Câu nhớ:

**Link = chuyển route mà không full-page reload.**

**NavLink = Link + biết trạng thái active, phù hợp cho menu/navigation.**

Và ghép với tất cả những gì vừa học:

&lt;NavLink to="/products"&gt;

│

│ click

▼

/products

│

▼

&lt;Routes&gt;

│

▼

&lt;Route path="/products"&gt;

│

▼

&lt;Products /&gt;

Còn khi có ID:

&lt;Link to="/products/15"&gt;

│

▼

/products/15

│

▼

/products/:productId

│

▼

useParams()

│

▼

productId = "15"

│

▼

API Backend

Câu hỏi thắc mắc và câu trả lời:  
**1\. Component bị unmount là gì?**

Trước tiên có 3 từ bạn sẽ gặp liên tục trong React:

Mount

→ Component xuất hiện / được đưa vào UI

Re-render

→ Component vẫn tồn tại, nhưng React chạy render lại để cập nhật UI

Unmount

→ Component bị loại khỏi UI/component tree

### **Ví dụ cực đơn giản**

function App() {

const \[show, setShow\] = useState(true);

return (

<>

&lt;button onClick={() =&gt; setShow(false)}>

Hide

&lt;/button&gt;

{show && &lt;Counter /&gt;}

&lt;/&gt;

);

}

Ban đầu:

show = true

&lt;App&gt;

│

├── Button

│

└── Counter ← đang tồn tại

Counter có:

function Counter() {

const \[count, setCount\] = useState(0);

return (

&lt;button onClick={() =&gt; setCount(count + 1)}>

{count}

&lt;/button&gt;

);

}

Bạn bấm đến:

count = 5

Sau đó bấm Hide:

setShow(false);

React render lại:

show = false

&lt;App&gt;

│

└── Button

Counter ❌

&lt;Counter /&gt; **không còn nằm trong component tree nữa**.

Đó gọi là:

**Counter bị unmount.**

Local state của Counter:

count = 5

cũng không còn được giữ cho instance đó nữa.

Nếu sau này:

setShow(true);

Counter xuất hiện trở lại thì đây là một **mount mới**, nên:

const \[count, setCount\] = useState(0);

lại bắt đầu:

count = 0

### **Liên hệ React Router**

Giả sử:

&lt;Routes&gt;

&lt;Route path="/" element={<Home /&gt;} />

&lt;Route path="/products" element={<Products /&gt;} />

&lt;/Routes&gt;

Bạn đang:

/

↓

&lt;Home /&gt;

Sau đó:

&lt;Link to="/products"&gt;

Products

&lt;/Link&gt;

Route thay đổi:

/

↓

/products

UI có thể thay đổi từ:

&lt;App&gt;

└── Home

thành:

&lt;App&gt;

└── Products

Home không còn ở vị trí đó nữa:

Home

↓

UNMOUNT ❌

và Products xuất hiện:

Products

↓

MOUNT ✅

Vì vậy câu mình nói lúc trước:

&lt;Link&gt; không reload toàn bộ React app, **nhưng component nào bị route thay thế thì vẫn có thể bị unmount.**

Hai chuyện này khác nhau:

FULL PAGE RELOAD

────────────────────────

Toàn bộ document/app được tải lại ❌

ROUTE CHANGE

────────────────────────

React app vẫn chạy ✅

Nhưng:

Home → unmount

Products → mount

Đây cũng là lý do nếu bạn có state quan trọng chỉ nằm trong Home:

function Home() {

const \[something, setSomething\] = useState(...);

}

thì khi Home unmount, state đó không nên được kỳ vọng tồn tại mãi.

# **2\. Tại sao className bình thường là string mà ở đây lại truyền function?**

Bạn nhớ hoàn toàn đúng.

Bình thường:

&lt;div className="container"&gt;

hoặc:

&lt;Link className="menu"&gt;

className nhận một string:

className

↓

"menu"

Nhưng đây:

<NavLink

to="/products"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Products

&lt;/NavLink&gt;

lại truyền:

className

↓

FUNCTION

Tại sao?

**Vì đây không phải className của một thẻ HTML &lt;div&gt;.**

Đây là prop className của **React Router NavLink component**.

Đây là điểm quan trọng.

## **3\. So sánh &lt;div&gt; và &lt;NavLink&gt;**

### **HTML element**

&lt;div className="container"&gt;

Ở đây React hiểu:

className = "container"

rồi tạo DOM:

&lt;div class="container"&gt;

### **React Component**

Còn:

&lt;NavLink className={...}&gt;

NavLink là **một Component** do React Router cung cấp.

Giống như bạn tự viết:

&lt;ProductCard name="iPhone" /&gt;

Ở đây:

name

là prop.

Tương tự:

&lt;NavLink className={...} /&gt;

thì className là **prop mà NavLink nhận**.

Và React Router thiết kế prop này cho phép bạn truyền:

string

HOẶC

function

# **4\. Vì vậy cả hai cách này đều hợp lệ**

### **Cách 1 — String bình thường**

<NavLink

to="/products"

className="menu-item"

\>

Products

&lt;/NavLink&gt;

Bạn đang nói:

Class lúc nào cũng là "menu-item".

### **Cách 2 — Function**

<NavLink

to="/products"

className={({ isActive }) =>

isActive ? "active" : ""

}

\>

Products

&lt;/NavLink&gt;

Bạn đang nói:

React Router ơi, class của tao **phụ thuộc vào trạng thái hiện tại**, nên mày hãy gọi function này rồi đưa isActive cho tao.

Đây là lý do function cần thiết.

# **5\. Chạy tay đoạn code đáng sợ này**

Đừng nhìn cả cục:

className={({ isActive }) =>

isActive ? "active" : ""

}

Tách ra.

Giả sử viết function riêng:

function taoClassName(thongTin) {

if (thongTin.isActive) {

return "active";

}

return "";

}

Sau đó:

<NavLink

to="/products"

className={taoClassName}

\>

Products

&lt;/NavLink&gt;

🔥 **Đây chính xác là cùng ý tưởng.**

React Router sẽ gọi function của bạn và cung cấp thông tin trạng thái route.

Ví dụ URL hiện tại:

/products

NavLink:

&lt;NavLink to="/products"&gt;

React Router xác định:

isActive = true

Rồi về mặt tư duy:

taoClassName({

isActive: true

});

Function chạy:

if (true) {

return "active";

}

trả:

"active"

Cuối cùng NavLink nhận class:

active

# **6\. Bây giờ rút gọn function**

Từ:

function taoClassName(thongTin) {

if (thongTin.isActive) {

return "active";

}

return "";

}

Đổi thành arrow function:

const taoClassName = (thongTin) => {

if (thongTin.isActive) {

return "active";

}

return "";

};

Destructuring:

const taoClassName = ({ isActive }) => {

if (isActive) {

return "active";

}

return "";

};

Đổi if thành ternary:

const taoClassName = ({ isActive }) => {

return isActive ? "active" : "";

};

Rút gọn arrow:

const taoClassName =

({ isActive }) => isActive ? "active" : "";

Và thay function trực tiếp vào prop:

<NavLink

className={

({ isActive }) =>

isActive ? "active" : ""

}

/>

Bỏ xuống dòng:

<NavLink

className={({ isActive }) =>

isActive ? "active" : ""

}

/>

💥 Thế là ra đúng cái bạn đang thấy.

Không có syntax ma thuật nào mới cả.

# **7\. Nhưng tại sao phải có { } ngoài function?**

Bạn còn một lớp nữa:

className={ ... }

Trong JSX:

className="abc"

là string literal.

Còn:

className={something}

nghĩa là:

Bên trong {} là **JavaScript expression**.

Ví dụ:

const name = "red";

&lt;div className={name} /&gt;

hoặc:

&lt;div className={10 &gt; 5 ? "yes" : "no"} />

hoặc function:

&lt;NavLink className={taoClassName} /&gt;

hoặc anonymous arrow function:

<NavLink

className={({ isActive }) =>

isActive ? "active" : ""

}

/>

Cho nên hãy chia cú pháp thành từng lớp:

className={

({ isActive }) =>

isActive ? "active" : ""

}

│ │

│ └── JavaScript function

│

└── {} = tao đang nhét JavaScript expression vào JSX

# **8\. Có một distinction cực kỳ quan trọng**

Đừng từ ví dụ này suy ra:

"className của React lúc nào cũng nhận function."

❌ Không.

Ví dụ DOM element:

<div

className={({ isActive }) =>

isActive ? "active" : ""

}

/>

Không phải cách sử dụng thông thường hợp lệ để React tự cung cấp isActive.

Bởi vì &lt;div&gt; không phải NavLink.

NavLink đặc biệt vì **React Router định nghĩa API của component đó** cho phép className là function.

&lt;div&gt;

className

↓

thường là STRING

&lt;NavLink&gt;

className

↓

STRING

hoặc

FUNCTION do React Router hỗ trợ

# **9\. Tại sao React Router thiết kế như vậy?**

Bởi vì **React Router mới là thằng biết route có active hay không**.

Component của bạn không cần tự viết:

if (window.location.pathname === "/products") {

...

}

React Router đã biết:

URL hiện tại

↓

/products

NavLink.to

↓

/products

↓

isActive = true

Nó đưa thông tin đó cho function của bạn:

({ isActive })

Bạn chỉ quyết định:

Nếu active

→ class nào?

Nếu không active

→ class nào?

Ví dụ:

className={({ isActive }) =>

isActive

? "menu-item active"

: "menu-item"

}

# **10\. Hai câu của bạn gói lại như này**

### **Unmount**

Component xuất hiện

↓

MOUNT

Component vẫn tồn tại nhưng cập nhật

↓

RE-RENDER

Component bị loại khỏi UI tree

↓

UNMOUNT

**Unmount ≠ reload toàn website.**

Một component có thể unmount trong khi React app vẫn chạy bình thường.

### **className của NavLink**

Bình thường:

className="active"

→ đưa class trực tiếp.

Còn:

className={({ isActive }) =>

isActive ? "active" : ""

}

→ đưa **function** cho NavLink.

React Router về mặt tư duy sẽ làm:

URL hiện tại

↓

kiểm tra NavLink active?

↓

isActive = true/false

↓

gọi function của bạn

↓

function trả về String

↓

"active" hoặc ""

↓

đặt thành class

Nên cuối cùng **class vẫn là string**.

Chỉ khác là string đó **không cố định**, mà được một function tính ra dựa trên isActive.

Đây chính là điểm mấu chốt:

className="active"

→ class TĨNH

className={({ isActive }) =>

isActive ? "active" : ""

}

→ class ĐỘNG

→ React Router đưa trạng thái vào

→ function tính class cần dùng