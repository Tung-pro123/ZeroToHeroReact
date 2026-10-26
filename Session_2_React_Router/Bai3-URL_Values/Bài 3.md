# **BÀI HỌC: URL VALUES (ĐỌC DỮ LIỆU TỪ THANH ĐỊA CHỈ URL)**

# **_1\. Bản chất: URL không chỉ dùng để chuyển trang_**

_Khi mới học Router, chúng ta thường nghĩ:_

_URL_

_↓_

_React Router_

_↓_

_Component_

_Ví dụ:_

_/products_

_↓_

_&lt;Products /&gt;_

_Nhưng trong ứng dụng thật, URL còn có thể_ **_chứa dữ liệu_**_._

_Ví dụ:_

_<https://shop.com/concerts/hanoi?q=rock&page=2>_

_Tách URL này ra:_

_<https://shop.com/concerts/hanoi?q=rock&page=2>_

_│ │ │_

_│ │ └── Search / Query Parameters_

_│ │_

_│ └── Path + Route Parameter_

_│_

_└── Domain_

_Cụ thể:_

_/concerts/hanoi_

_↑_

_city_

_?q=rock&page=2_

_↑ ↑_

_q page_

_React Router cung cấp các hook để đọc những thông tin này._

# **_2\. Ba Hook quan trọng_**

_Trong lesson này có 3 hook:_

_URL_

_│_

_├── useParams()_

_│ ↓_

_│ Dynamic Route Parameters_

_│_

_├── useSearchParams()_

_│ ↓_

_│ ?key=value&key=value_

_│_

_└── useLocation()_

_↓_

_thông tin location hiện tại_

_Ví dụ:_

_/concerts/hanoi?q=rock&page=2_

_Ta có thể hình dung:_

_useParams()_

_↓_

_city = "hanoi"_

_useSearchParams()_

_↓_

_q = "rock"_

_page = "2"_

_useLocation()_

_↓_

_thông tin về location hiện tại_

_như pathname, search, hash, state..._

_Đừng cố học thuộc ngay. Ta tách từng thằng._

# **_3\. useParams() — Đọc Dynamic Route Parameter_**

_Phần này bạn_ **_đã học rồi_**_._

_Giả sử Route:_

_<Route_

_path="/concerts/:city"_

_element={&lt;City /&gt;}_

_/>_

_Phần:_

_:city_

_là_ **_Dynamic Segment_**_._

_Có nghĩa:_

_/concerts/hanoi_

_↑_

_city_

_/concerts/saigon_

_↑_

_city_

_/concerts/danang_

_↑_

_city_

_city có thể thay đổi tùy URL._

# **_4\. useParams() lấy giá trị đó ra_**

_Trong component:_

_import { useParams } from "react-router";_

_function City() {_

_const { city } = useParams();_

_return &lt;h1&gt;{city}&lt;/h1&gt;;_

_}_

_Giả sử user truy cập:_

_/concerts/saigon_

_Router match:_

_Route:_

_/concerts/:city_

_URL:_

_/concerts/saigon_

_→ React Router xác định:_

_city = "saigon"_

_→ useParams() cho component đọc giá trị đó._

# **_5\. Chạy tay useParams()_**

_Code:_

_<Route_

_path="/concerts/:city"_

_element={&lt;City /&gt;}_

_/>_

_User nhập:_

_/concerts/hanoi_

_Chạy:_

_URL_

_/concerts/hanoi_

_↓_

_React Router tìm Route phù hợp_

_↓_

_/concerts/:city_

_↓_

_:hanoi? ❌_

_Không phải!_

_:city là TÊN BIẾN_

_hanoi là GIÁ TRỊ_

_↓_

_city = "hanoi"_

_↓_

_&lt;City /&gt; render_

_↓_

_useParams()_

_↓_

_{_

_city: "hanoi"_

_}_

_Cho nên:_

_const params = useParams();_

_có thể hình dung kết quả:_

_{_

_city: "hanoi"_

_}_

# **_6\. Tại sao viết { city } = useParams()?_**

_Bạn đã học destructuring JavaScript rồi._

_Viết:_

_const params = useParams();_

_const city = params.city;_

_hoàn toàn được._

_Nhưng có thể viết gọn:_

_const { city } = useParams();_

_Vì:_

_{_

_city: "hanoi"_

_}_

_destructuring:_

_const { city } = {_

_city: "hanoi"_

_};_

_→_

_city = "hanoi"_

_Cho nên:_

_const { city } = useParams();_

_không phải syntax đặc biệt của React._

_Nó là:_

_JavaScript Object Destructuring_

# **_7\. Tên phải khớp với Dynamic Segment_**

_Nếu Route khai báo:_

_&lt;Route path="/concerts/:city" element={<City /&gt;} />_

_thì:_

_const { city } = useParams();_

_✅ đúng._

_Bởi vì:_

_:city_

_↓_

_city_

_Nếu Route là:_

_<Route_

_path="/products/:productId"_

_element={&lt;ProductDetail /&gt;}_

_/>_

_thì:_

_const { productId } = useParams();_

_Nếu Route là:_

_<Route_

_path="/users/:userId"_

_element={&lt;UserDetail /&gt;}_

_/>_

_thì:_

_const { userId } = useParams();_

_Câu nhớ:_

_Route_

_:productId_

_│_

_▼_

_useParams()_

_│_

_▼_

_{ productId }_

# **_8\. useParams() thường được dùng để gọi API_**

_Đây mới là ứng dụng thực tế quan trọng nhất._

_Giả sử:_

_/products_

_hiển thị:_

_iPhone 15_

_Samsung S25_

_MacBook Pro_

_Mỗi sản phẩm có:_

_&lt;Link to={\`/products/\${product.id}\`}&gt;_

_Xem chi tiết_

_&lt;/Link&gt;_

_Giả sử:_

_product.id = 15_

_→ Link:_

_/products/15_

_Router:_

_<Route_

_path="/products/:productId"_

_element={&lt;ProductDetail /&gt;}_

_/>_

_Trong component:_

_function ProductDetail() {_

_const { productId } = useParams();_

_// sau này dùng productId gọi API_

_}_

# **_9\. Flow hoàn chỉnh Link → Route → useParams → API_**

_Đây là flow bạn nên nhớ:_

_Product List_

_│_

_│ user click_

_▼_

_&lt;Link to="/products/15"&gt;_

_│_

_▼_

_URL_

_/products/15_

_│_

_▼_

_React Router_

_│_

_│ match_

_▼_

_/products/:productId_

_│_

_▼_

_&lt;ProductDetail /&gt;_

_│_

_▼_

_useParams()_

_│_

_▼_

_productId = "15"_

_│_

_▼_

_GET /api/products/15_

_│_

_▼_

_Spring Boot_

_│_

_▼_

_Database_

_│_

_▼_

_Product 15_

_│_

_▼_

_React render Product Detail_

_Đây chính là lý do useParams() rất quan trọng._

# **_10\. Liên hệ với Spring Boot_**

_Tài liệu của bạn nói:_

_useParams tương đương 100% với @PathVariable._

_Ý tưởng mà tài liệu muốn truyền đạt là_ **_hai bên đang đọc cùng loại dữ liệu nằm trong path_**_, nhưng không nên hiểu chúng là cùng một API/cơ chế._

_Frontend:_

_&lt;Route path="/products/:productId" /&gt;_

_const { productId } = useParams();_

_Backend Spring:_

_@GetMapping("/products/{productId}")_

_public Product getProduct(_

_@PathVariable Long productId_

_) {_

_..._

_}_

_Nhìn song song:_

_FRONTEND BACKEND_

_/products/:productId /products/{productId}_

_│ │_

_▼ ▼_

_useParams() @PathVariable_

_│ │_

_▼ ▼_

_productId = "15" productId = 15_

_Tư duy:_

_URL:_

_/products/15_

_│_

_├──────────────────┐_

_▼ ▼_

_React Router Spring Controller_

_│ │_

_useParams() @PathVariable_

_│ │_

_▼ ▼_

_"15" 15_

_Vì vậy với background Spring Boot của bạn, hãy nhớ:_

**_useParams() bên React Router giúp frontend đọc route params; @PathVariable bên Spring giúp backend đọc path variable của request._**

# **_11\. Một điểm quan trọng: Params lấy ra thường là String_**

_Giả sử:_

_/products/15_

_Bạn lấy:_

_const { productId } = useParams();_

_Đừng mặc định nghĩ:_

_productId === 15_

_Mà về cơ bản giá trị URL bạn đọc được là dạng text:_

_productId === "15"_

_Nếu thực sự cần number:_

_const id = Number(productId);_

_thì:_

_"15"_

_↓ Number()_

_15_

_Điều này đặc biệt đáng nhớ khi bạn bắt đầu TypeScript._

# **_12\. Một URL có thể có nhiều Params_**

_Không phải chỉ một._

_Ví dụ Route:_

_<Route_

_path="/shops/:shopId/products/:productId"_

_element={&lt;ProductDetail /&gt;}_

_/>_

_URL:_

_/shops/10/products/25_

_React Router xác định:_

_shopId = "10"_

_productId = "25"_

_Ta lấy:_

_const {_

_shopId,_

_productId_

_} = useParams();_

_Flow:_

_/shops/10/products/25_

_│ │_

_▼ ▼_

_shopId productId_

_"10" "25"_

# **_13\. Bây giờ xuất hiện vấn đề mới_**

_Giả sử trang Product List:_

_/products_

_User muốn:_

_Tìm kiếm: iphone_

_Trang: 2_

_Sắp xếp: giá tăng dần_

_Có nên thiết kế:_

_/products/iphone/2/price-asc_

_không?_

_Không phải lúc nào cũng hợp lý._

_Một cách phổ biến là:_

_/products?q=iphone&page=2&sort=price-asc_

_Nhìn kỹ:_

_/products ? q=iphone & page=2 & sort=price-asc_

_│ │ │ │ │_

_│ │ │ │ └── sort_

_│ │ │ │_

_│ │ │ └── page_

_│ │ │_

_│ │ └── q_

_│ │_

_│ └── bắt đầu Search Params_

_│_

_└── pathname_

_Và đây chính là phần_ **_mới thực sự_** _so với những gì bạn đã học:_

_useSearchParams()_

# **_14\. useParams() và useSearchParams() khác nhau ở đâu?_**

_Ví dụ:_

_/products/15?tab=reviews&page=2_

_Tách:_

_/products/15_

_↑_

_Route Param_

_?tab=reviews&page=2_

_↑ ↑_

_Search Params_

_Route:_

_<Route_

_path="/products/:productId"_

_element={&lt;ProductDetail /&gt;}_

_/>_

_useParams():_

_const { productId } = useParams();_

_→_

_productId = "15"_

_Còn:_

_?tab=reviews&page=2_

_sẽ là phần dành cho:_

_useSearchParams()_

# **_15\. Câu nhớ trước khi sang useSearchParams()_**

_Chỉ cần nhìn URL:_

_/products/15?page=2_

_hãy cắt ngay tại dấu ?:_

_/products/15 ? page=2_

_│ │_

_▼ ▼_

_PATH SEARCH/QUERY_

_│ │_

_▼ ▼_

_useParams() useSearchParams()_

_│ │_

_▼ ▼_

_productId="15" page="2"_

**_Câu nhớ:_**

_useParams() đọc_ **_biến nằm trong đường dẫn_** _được định nghĩa bởi :param.  
useSearchParams() đọc và thay đổi_ **_query/search parameters nằm sau dấu ?_**_.  
useLocation() cho bạn_ **_thông tin tổng quan về location hiện tại_**_._

_Phần useParams() này bạn gần như đã biết từ lesson Routing._ **_Từ useSearchParams() trở đi mới là phần bạn cần tập trung kỹ trong bài URL Values này._**

# **16\. useSearchParams() — Đọc Query String sau dấu ?**

- Giả sử URL:
- /products?q=iphone&page=2
- Ta tách:
- /products ? q=iphone&page=2
- │ │
- ▼ ▼
- pathname search params
- Phần:
- ?q=iphone&page=2
- được gọi là **URL Search Params / Query String**.
- Trong đó:
- q=iphone
- │ │
- │ └── value
- │
- └── key
- page=2
- │ │
- │ └── value
- │
- └── key
- Có thể hình dung nó giống một tập các cặp:
- q → iphone
- page → 2

# **17\. Search Params dùng để làm gì?**

- Nó cực kỳ phổ biến cho những dữ liệu như:
- Search
- Filter
- Sort
- Pagination
- Tab đang chọn
- Ví dụ trang thương mại điện tử:
- /products?q=iphone&color=black&page=2&sort=price
- Có thể hiểu:
- /products
- │
- └── Trang danh sách Product
- q=iphone
- │
- └── tìm "iphone"
- color=black
- │
- └── lọc màu đen
- page=2
- │
- └── trang số 2
- sort=price
- │
- └── sắp xếp theo giá
- Đây là lý do URL có thể được xem như một nơi lưu **một phần trạng thái của UI**.
- User copy URL này gửi cho người khác thì người kia có thể mở đúng trạng thái tìm kiếm/lọc đó, nếu ứng dụng được xây dựng theo cách đó.

# **18\. Sử dụng useSearchParams()**

- Import:
- import { useSearchParams } from "react-router";
- Sau đó:
- const \[searchParams, setSearchParams\] = useSearchParams();
- Nhìn rất giống:
- const \[count, setCount\] = useState(0);
- Tư duy:
- useSearchParams()
- ↓
- trả về 2 giá trị
- ↓
- ┌───────────────┬─────────────────┐
- ▼ ▼
- searchParams setSearchParams
- │ │
- │ └── cập nhật search params
- │
- └── đọc search params hiện tại
- Nhưng lưu ý:
- Nó **không phải useState**. Chỉ là cú pháp destructuring nhìn giống nhau.

# **19\. searchParams là gì?**

- Ví dụ:
- const \[searchParams, setSearchParams\] = useSearchParams();
- searchParams là một đối tượng URLSearchParams.
- Nó cung cấp các method để làm việc với query string.
- Ví dụ quan trọng nhất hiện tại:
- searchParams.get("q");
- Giả sử URL:
- /search?q=react
- thì:
- const keyword = searchParams.get("q");
- →
- keyword = "react"

# **20\. Chạy tay searchParams.get()**

- Code:
- function SearchResults() {
- const \[searchParams\] = useSearchParams();
- const keyword = searchParams.get("q");
- return (
- &lt;p&gt;
- Bạn đang tìm: {keyword}
- &lt;/p&gt;
- );
- }
- User truy cập:
- /search?q=react
- Chạy tay:
- URL
- /search?q=react
- ↓
- useSearchParams()
- ↓
- searchParams
- ↓
- searchParams.get("q")
- ↓
- tìm key "q"
- ↓
- q=react
- ^^^^^
- ↓
- "react"
- ↓
- keyword = "react"
- UI:
- Bạn đang tìm: react

# **21\. Nếu có nhiều Search Params thì sao?**

- URL:
- /products?q=iphone&page=2&sort=asc
- Ta có thể:
- const \[searchParams\] = useSearchParams();
- const keyword = searchParams.get("q");
- const page = searchParams.get("page");
- const sort = searchParams.get("sort");
- Kết quả:
- keyword = "iphone"
- page = "2"
- sort = "asc"
- Lưu ý tiếp:
- page = "2"
- ↑
- STRING
- Không phải:
- page = 2
- Nếu cần number:
- const page = Number(searchParams.get("page"));

# **22\. Nếu parameter không tồn tại?**

- Ví dụ URL:
- /products?q=iphone
- nhưng bạn:
- searchParams.get("page");
- thì kết quả là:
- null
- Vì URL không có:
- page=...
- Nên TypeScript sau này bạn sẽ thường thấy type kiểu:
- string | null
- Tức là:
- có parameter
- → string
- không có parameter
- → null
- Ví dụ có thể đặt mặc định:
- const page =
- searchParams.get("page") ?? "1";
- Nếu không có page:
- null ?? "1"
- ↓
- "1"

# **23\. setSearchParams() — Ghi dữ liệu ngược lên URL**

- Đây là phần rất hay.
- Không chỉ đọc:
- searchParams.get(...)
- mà còn có thể **thay đổi query string**:
- setSearchParams({
- q: "nextjs",
- page: "2"
- });
- URL có thể chuyển thành:
- ?q=nextjs&page=2
- Nếu đang ở:
- /search
- thì thành:
- /search?q=nextjs&page=2

# **24\. Chạy tay setSearchParams()**

- Ví dụ:
- function Products() {
- const \[searchParams, setSearchParams\] =
- useSearchParams();
- function searchIphone() {
- setSearchParams({
- q: "iphone",
- page: "1"
- });
- }
- return (
- &lt;button onClick={searchIphone}&gt;
- Search iPhone
- &lt;/button&gt;
- );
- }
- Ban đầu:
- /products
- User click:
- Search iPhone
- →
- searchIphone()
- ↓
- setSearchParams({
- q: "iphone",
- page: "1"
- })
- ↓
- URL search params thay đổi
- ↓
- /products?q=iphone&page=1
- Và vì URL thay đổi, component sử dụng search params sẽ nhận được giá trị tương ứng ở lần render tiếp theo.

# **25\. Ví dụ thực tế: Pagination**

- Giả sử:
- /products?page=1
- UI:
- Products
- iPhone
- Samsung
- MacBook
- \[1\] \[2\] \[3\]
- User click:
- 2
- Bạn có thể cập nhật:
- setSearchParams({
- page: "2"
- });
- URL:
- /products?page=2
- Sau đó:
- const page =
- searchParams.get("page");
- →
- page = "2"
- Sau này bạn có thể dùng nó gọi backend:
- React
- /products?page=2
- ↓
- useSearchParams()
- ↓
- page = "2"
- ↓
- API
- GET /api/products?page=2
- ↓
- Spring Boot

# **26\. Liên hệ Spring Boot @RequestParam**

- Đây là liên hệ rất dễ nhớ.
- Frontend React Router:
- const \[searchParams\] = useSearchParams();
- const page = searchParams.get("page");
- Backend Spring:
- @GetMapping("/products")
- public List&lt;Product&gt; getProducts(
- @RequestParam int page
- ) {
- ...
- }
- Tư duy:
- URL
- /products?page=2
- │
- └──────────────┐
- │
- ┌─────────────┴─────────────┐
- ▼ ▼
- FRONTEND BACKEND
- │ │
- useSearchParams() @RequestParam
- │ │
- ▼ ▼
- page = "2" page = 2
- Giống phần trước:
- PATH VALUE
- React Router
- useParams()
- Spring
- @PathVariable
- Còn:
- QUERY/SEARCH VALUE
- React Router
- useSearchParams()
- Spring
- @RequestParam
- Không phải chúng là cùng một cơ chế, nhưng đây là **liên hệ tư duy rất tốt** giữa frontend và backend.

# **27\. useParams() vs useSearchParams()**

- Đây là phần phải phân biệt chắc.
- URL:
- /products/123?color=red&page=2
- Route:
- <Route
- path="/products/:productId"
- element={&lt;ProductDetail /&gt;}
- />
- Ta có:
- /products/123 ? color=red&page=2
- │ │ │
- │ │ │
- ▼ ▼ ▼
- productId color page
- React:
- const { productId } = useParams();
- const \[searchParams\] = useSearchParams();
- const color = searchParams.get("color");
- const page = searchParams.get("page");
- Kết quả:
- productId = "123"
- color = "red"
- page = "2"
- Câu nhớ:
- :xxx trong PATH
- ↓
- useParams()
- ?xxx=yyy
- ↓
- useSearchParams()

# **28\. Khi nào nên dùng cái nào?**

- Tư duy đơn giản:
- /products/123
- ↑
- "Tôi đang nói về PRODUCT NÀO?"
- → useParams()
- /products?page=2
- ↑
- "Tôi đang xem DANH SÁCH theo trạng thái nào?"
- → useSearchParams()
- Một ví dụ khác:
- /users/15
- 15 xác định **user cụ thể nào**.
- → Route Param.
- Trong khi:
- /users?role=admin&page=2
- đang nói:
- Lọc danh sách users theo role admin và trang 2.
- → Search Params.
- Đây là quy tắc tư duy tốt hơn việc chỉ học thuộc dấu / và ?.

# **29\. useLocation() — Đọc thông tin Location hiện tại**

- Bây giờ tới hook cuối:
- import { useLocation } from "react-router";
- Sử dụng:
- const location = useLocation();
- Khác với hai thằng trước:
- useParams()
- → Tôi muốn lấy route param.
- useSearchParams()
- → Tôi muốn làm việc với query/search params.
- useLocation()
- → Cho tôi thông tin về LOCATION hiện tại.

# **30\. location chứa gì?**

- Giả sử URL:
- /products/123?color=red&page=2
- Ta:
- const location = useLocation();
- location có các thông tin như:
- location
- │
- ├── pathname
- ├── search
- ├── hash
- ├── state
- └── key
- Trong bài hiện tại, tập trung trước vào:
- pathname
- search
- key

# **31\. location.pathname**

- Giả sử URL:
- /products/123?color=red&page=2
- thì:
- location.pathname
- →
- "/products/123"
- Không chứa:
- ?color=red&page=2
- Tư duy:
- /products/123 ? color=red&page=2
- ^^^^^^^^^^^^^
- │
- ▼
- pathname

# **32\. location.search**

- Cùng URL:
- /products/123?color=red&page=2
- thì:
- location.search
- →
- "?color=red&page=2"
- Khác với useSearchParams().
- location.search cho bạn **chuỗi search/query**.
- location.search
- "?color=red&page=2"
- Còn:
- searchParams.get("color")
- cho bạn:
- "red"
- Tức là:
- useLocation().search
- ↓
- cho tôi NGUYÊN CHUỖI
- useSearchParams()
- ↓
- cho tôi công cụ để
- ĐỌC / CẬP NHẬT từng parameter

# **33\. location.key**

- React Router location còn có:
- location.key
- Có thể hiểu ở mức hiện tại:
- Một key gắn với location/history entry, giúp phân biệt các entry điều hướng.
- Bạn **không cần đào sâu phần này ở giai đoạn Fresher**.
- Chỉ cần biết nó tồn tại và một số cơ chế liên quan lịch sử/scroll có thể dùng nó để phân biệt các lần điều hướng.

# **34\. useLocation() + useEffect()**

- Tài liệu đưa ví dụ:
- function useAnalytics() {
- const location = useLocation();
- useEffect(() => {
- sendFakeAnalytics(location.pathname);
- }, \[location\]);
- }
- Bạn chưa cần học sâu useEffect ở đây vì roadmap của chúng ta sẽ quay lại React.dev và học Effects sau.
- Hiện tại chỉ hiểu **ý tưởng**:
- User đang ở:
- /products
- ↓
- User chuyển sang:
- /profile
- ↓
- location thay đổi
- ↓
- logic nào đó có thể phản ứng
- với sự thay đổi này
- Ví dụ analytics:
- User vào /products
- ↓
- ghi nhận:
- "User viewed Products"
- User vào /profile
- ↓
- ghi nhận:
- "User viewed Profile"
- Sau này khi học useEffect, chúng ta sẽ quay lại cơ chế này và lúc đó nó sẽ rõ hơn nhiều.

# **35\. Ví dụ Analytics**

- const location = useLocation();
- useEffect(() => {
- sendAnalytics(location.pathname);
- }, \[location\]);
- Có thể hình dung:
- URL = /products
- ↓
- location.pathname
- ↓
- "/products"
- ↓
- sendAnalytics("/products")
- Sau đó user chuyển:
- /profile
- → location thay đổi.
- → effect có thể chạy lại.
- →
- sendAnalytics("/profile")
- Nhưng hiện tại chỉ cần biết **useLocation cung cấp location**. Việc useEffect tại sao chạy lại chúng ta để đúng lesson Effects xử lý.

# **36\. Ví dụ Scroll Restoration**

- Tài liệu còn có:
- function useScrollRestoration() {
- const location = useLocation();
- useEffect(() => {
- fakeRestoreScroll(location.key);
- }, \[location\]);
- }
- Ý tưởng:
- Location A
- │
- └── có key
- Location B
- │
- └── có key khác
- Ứng dụng có thể dùng thông tin history/location để hỗ trợ quản lý vị trí scroll.
- Phần này:
- 🟡 BIẾT Ý TƯỞNG LÀ ĐỦ
- Không cần dành thời gian implement thủ công lúc này.

# **37\. useSearchParams() vs useLocation().search**

- Hai thằng này rất dễ khiến người mới hỏi:
- "Ủa cả hai đều liên quan phần ?, vậy cần hai thằng làm gì?"
- Ví dụ:
- /products?q=iphone&page=2
- useLocation():
- const location = useLocation();
- console.log(location.search);
- →
- "?q=iphone&page=2"
- Bạn nhận **nguyên chuỗi**.
- Trong khi:
- const \[searchParams\] = useSearchParams();
- searchParams.get("q");
- →
- "iphone"
- và:
- searchParams.get("page");
- →
- "2"
- Nên:
- useLocation().search
- \=
- "Cho tôi biết search string hiện tại là gì."
- useSearchParams()
- \=
- "Cho tôi làm việc với từng search parameter."
- Làm Search/Filter/Pagination → đa số bạn sẽ quan tâm useSearchParams() hơn.

# **38\. Gom cả 3 Hook vào cùng một URL**

- Đây là phần quan trọng nhất của lesson.
- Giả sử:
- <https://web.com/products/123?color=red&page=2>
- Bỏ domain ra:
- /products/123?color=red&page=2
- Tách:
- /products/123 ? color=red & page=2
- │ │ │
- │ │ │
- ▼ ▼ ▼
- 123 red 2
- Route:
- <Route
- path="/products/:productId"
- element={&lt;ProductDetail /&gt;}
- />
- Trong component:
- function ProductDetail() {
- const { productId } = useParams();
- const \[searchParams\] = useSearchParams();
- const location = useLocation();
- const color = searchParams.get("color");
- const page = searchParams.get("page");
- // ...
- }
- Kết quả:
- useParams()
- ↓
- productId = "123"
- useSearchParams()
- ↓
- color = "red"
- page = "2"
- useLocation()
- ↓
- pathname = "/products/123"
- search = "?color=red&page=2"
- key = ...

# **39\. Liên hệ React Router ↔ Spring Boot**

- Với background của bạn, có thể xây mental model:
- URL
- /products/123?color=red&page=2
- │
- ┌───────┴────────┐
- │ │
- ▼ ▼
- PATH VALUE QUERY VALUE
- 123 color=red
- page=2
- │ │
- ┌─────┴─────┐ ┌─────┴──────┐
- ▼ ▼ ▼ ▼
- React Spring React Spring
- │ │ │ │
- useParams @Path useSearch @Request
- () Variable Params() Param
- Cụ thể:
- React Router Spring Boot
- useParams() @PathVariable
- ↓ ↓
- productId="123" productId=123
- useSearchParams() @RequestParam
- ↓ ↓
- color="red" color="red"
- page="2" page=2
- Còn:
- useLocation()
- không cần cố tìm một annotation Spring tương đương.
- Nó là API phía Router để component biết thông tin về location phía client.

# **40\. Đừng nhầm Params và Search Params**

- Một câu hỏi rất dễ gặp:
- Tại sao Product ID lại để /products/123, còn page lại để /products?page=2?
- Mental model cơ bản:
- /products/123
- ↑
- │
- "RESOURCE CỤ THỂ NÀO?"
- │
- Params
- Còn:
- /products?page=2&sort=asc
- ↑
- │
- "DANH SÁCH NÀY ĐANG ĐƯỢC
- XEM / LỌC / SẮP XẾP THẾ NÀO?"
- │
- Search Params
- Không phải quy luật tuyệt đối cho mọi API/website, nhưng là cách thiết kế rất phổ biến và dễ hiểu.

# **41\. Tổng kết Lesson URL Values**

- Giả sử:
- /products/123?color=red&page=2
- Hãy nhìn nó thành:
- /products/123 ? color=red&page=2
- │ │
- │ │
- ▼ ▼
- Route Param Search Params
- │ │
- ▼ ▼
- useParams() useSearchParams()
- Và nếu muốn thông tin tổng quan về location hiện tại:
- URL hiện tại
- │
- ▼
- useLocation()
- │
- ┌──────────┼──────────┐
- ▼ ▼ ▼
- pathname search key

### **Câu nhớ cuối cùng**

- useParams()
- \=
- "Đọc BIẾN nằm trong PATH"
- :productId
- ↓
- "123"
- useSearchParams()
- \=
- "Đọc / cập nhật dữ liệu sau ?"
- ?color=red&page=2
- ↓
- color="red"
- page="2"
- useLocation()
- \=
- "Cho tôi thông tin về LOCATION hiện tại"
- pathname
- search
- key
- ...
- Và nối sang Spring Boot:
- React Router Spring Boot
- useParams() ≈ @PathVariable
- useSearchParams() ≈ @RequestParam
- Với phạm vi React Router mà chúng ta đặt ra cho roadmap hiện tại, **học xong phần này là bạn có thể dừng React Router cơ bản**. Bạn đã đi qua Routing → nested/index/layout/prefix routes → dynamic params → Link/NavLink → navigating/useNavigate → URL values. Bước tiếp theo trong roadmap là **HTTP/REST → Fetch → nối React với Spring Boot**, thay vì tiếp tục đào sâu React Router.