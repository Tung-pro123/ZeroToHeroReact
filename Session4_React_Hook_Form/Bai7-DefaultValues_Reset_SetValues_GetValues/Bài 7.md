# **LESSON 7: defaultValues / reset() / setValue() / getValues()**

Đến Lesson 6, chúng ta đã có:

useForm()

│

├── register()

│ └── đăng ký field

│

├── handleSubmit()

│ └── xử lý submit + validation

│

└── formState

├── errors

├── isDirty

├── dirtyFields

├── touchedFields

├── isValid

└── isSubmitting

Nhưng bây giờ xuất hiện những bài toán thực tế:

① Form mở ra phải có dữ liệu sẵn thì sao?

② Muốn xóa/reset toàn bộ form thì sao?

③ Muốn code tự thay đổi một field thì sao?

④ Muốn lấy giá trị hiện tại của field mà không submit thì sao?

Đây chính là 4 API hôm nay:

defaultValues

reset()

setValue()

getValues()

# **1\. defaultValues — Giá trị ban đầu của form**

Form đơn giản:

const {

register

} = useForm();

Input:

&lt;input {...register("username")} /&gt;

Thông thường ban đầu username sẽ chưa có giá trị mà bạn cung cấp.

Nhưng giả sử muốn:

Username:

\[ tung \]

ngay khi form xuất hiện.

Ta có:

const {

register

} = useForm({

defaultValues: {

username: "tung"

}

});

Mental model:

useForm({

defaultValues: {

username: "tung"

}

})

↓

RHF khởi tạo form

↓

username có default value

↓

\[ tung \]

# **2\. Nhiều defaultValues**

Ví dụ:

const {

register

} = useForm({

defaultValues: {

username: "tung",

email: "<tung@gmail.com>",

age: 20

}

});

Fields:

&lt;input {...register("username")} /&gt;

&lt;input {...register("email")} /&gt;

<input

type="number"

{...register("age", {

valueAsNumber: true

})}

/>

Form ban đầu:

Username

\[ tung \]

Email

\[ <tung@gmail.com> \]

Age

\[ 20 \]

Mental:

defaultValues

│

├── username → register("username")

├── email → register("email")

└── age → register("age")

Tên phải tương ứng với field name.

# **3\. Tại sao defaultValues quan trọng?**

Không chỉ để hiển thị dữ liệu ban đầu.

Nó còn là **mốc ban đầu của form**.

Nhớ Lesson 6:

isDirty

↓

current values có khác default values không?

Ví dụ:

useForm({

defaultValues: {

username: "tung"

}

});

Ban đầu:

DEFAULT

"tung"

CURRENT

"tung"

↓

isDirty = false

User sửa:

"tung"

↓

"tung123"

Bây giờ:

DEFAULT

"tung"

CURRENT

"tung123"

↓

isDirty = true

Đây là lý do defaultValues liên quan rất chặt với dirty tracking.

# **4\. Create Form và Edit Form**

Đây là hai case cực kỳ phổ biến.

### **Create Form**

Ví dụ tạo product mới:

useForm({

defaultValues: {

name: "",

price: 0,

description: ""

}

});

Mental:

CREATE PRODUCT

↓

form ban đầu gần như trống

### **Edit Form**

Ví dụ backend trả:

const product = {

id: 10,

name: "iPhone 17",

price: 25000000

};

Edit form muốn hiển thị:

Name

\[ iPhone 17 \]

Price

\[ 25000000 \]

Mental:

SERVER DATA

↓

FORM VALUES

↓

user chỉnh sửa

↓

PUT / PATCH

Đây là lúc defaultValues/reset() trở nên cực kỳ thực tế.

# **5\. Nhưng có một cái bẫy với dữ liệu API**

Giả sử:

const {

register

} = useForm({

defaultValues: product

});

Nhưng product đến từ API.

Flow thực tế:

Component render lần đầu

↓

product chưa về

↓

defaultValues chưa có server data

...

fetch hoàn thành

↓

product có dữ liệu

Đừng đơn giản nghĩ:

product thay đổi

↓

defaultValues tự động reset lại toàn form

defaultValues là các giá trị mặc định được RHF khởi tạo/cached cho form; khi dữ liệu async về sau, một pattern phổ biến là dùng:

reset(product)

để đưa dữ liệu đó vào form.

Đó dẫn tới API tiếp theo.

# **6\. reset() là gì?**

Lấy từ:

const {

register,

reset

} = useForm();

reset() dùng để **reset form**.

Ví dụ:

reset();

Mental:

CURRENT FORM

↓

reset()

↓

trở về default values

# **7\. Ví dụ reset() đơn giản**

const {

register,

reset

} = useForm({

defaultValues: {

username: "",

email: ""

}

});

User nhập:

username = "tung"

email = "<tung@gmail.com>"

Current:

{

username: "tung",

email: "<tung@gmail.com>"

}

Gọi:

reset();

Form trở về:

{

username: "",

email: ""

}

UI:

Username

\[ \]

Email

\[ \]

# **8\. reset() không chỉ reset value**

Đây là điểm quan trọng.

Tên reset() dễ làm bạn tưởng nó chỉ:

xóa text input

Nhưng nó thuộc **form management**.

Nó có thể reset form state liên quan nữa theo behavior/options của RHF.

Mental đơn giản:

reset()

↓

đưa FORM trở về trạng thái mặc định

Ví dụ trước:

isDirty = true

Sau reset về defaults:

isDirty = false

# **9\. reset() có thể nhận data mới**

Đây mới là phần cực hay:

reset({

username: "tung",

email: "<tung@gmail.com>"

});

Không nhất thiết reset về chuỗi rỗng.

Bạn đang nói:

Đưa form về bộ values này.

Mental:

reset(newValues)

↓

form nhận values mới

↓

các values đó trở thành baseline/default mới

cho form reset/dirty tracking

Đây cực kỳ hữu ích cho **Edit Form**.

# **10\. Ví dụ Edit Product**

Giả sử ban đầu:

const {

register,

reset

} = useForm({

defaultValues: {

name: "",

price: 0

}

});

Component render:

Name

\[ \]

Price

\[ 0 \]

Sau đó API trả:

const product = {

name: "MacBook Pro",

price: 50000000

};

Ta:

reset(product);

Form thành:

Name

\[ MacBook Pro \]

Price

\[ 50000000 \]

Mental:

GET /products/10

↓

product

↓

reset(product)

↓

RHF Form

↓

inputs hiển thị product

# **11\. Liên hệ với useEffect**

Case này là một ví dụ có thể gặp:

useEffect(() => {

if (product) {

reset(product);

}

}, \[product, reset\]);

Tại sao Effect hợp lý?

Vì:

product từ external/server data

↓

product thay đổi khi request hoàn thành

↓

form cần synchronize với product đó

Mental:

Server data về

↓

React state/query data thay đổi

↓

Effect

↓

reset(product)

↓

Form sync với server data

Khác với:

User click Submit

↓

POST

cái đó vẫn nằm trong event handler.

# **12\. reset() sau submit thành công**

Một case cực phổ biến khác.

Ví dụ Create Product:

async function onSubmit(data) {

await fetch("/api/products", {

method: "POST",

headers: {

"Content-Type":

"application/json"

},

body: JSON.stringify(data)

});

reset();

}

Flow:

User nhập form

↓

Submit

↓

handleSubmit

↓

VALID

↓

onSubmit(data)

↓

POST /products

↓

Server success

↓

reset()

↓

form trống lại

Ví dụ:

Name

\[ Coca Cola \]

Price

\[ 10000 \]

↓ Submit success

Name

\[ \]

Price

\[ 0 \]

# **13\. Đừng reset quá sớm**

Ví dụ:

async function onSubmit(data) {

reset();

await fetch(...);

}

Giả sử request fail.

User vừa nhập cả đống dữ liệu:

name

description

price

category

...

Bạn reset trước.

Sau đó:

POST

↓

500 Internal Server Error

Form mất dữ liệu.

UX khá tệ.

Thường logic sẽ là:

Submit

↓

API

↓

SUCCESS?

/ \\

No Yes

↓ ↓

giữ reset()

form

Tùy product requirements, nhưng đây là mental model tốt.

# **14\. setValue() — thay đổi một field bằng code**

Lấy từ:

const {

register,

setValue

} = useForm();

Syntax:

setValue(

"fieldName",

newValue

);

Ví dụ:

setValue(

"username",

"tung"

);

Mental:

setValue("username", "tung")

↓

username field

↓

"tung"

# **15\. Ví dụ setValue()**

function ProfileForm() {

const {

register,

setValue

} = useForm({

defaultValues: {

username: ""

}

});

return (

<>

<input

{...register("username")}

/>

<button

type="button"

onClick={() =>

setValue(

"username",

"tung"

)

}

\>

Set Username

&lt;/button&gt;

&lt;/&gt;

);

}

Ban đầu:

Username

\[ \]

Click:

Set Username

→

Username

\[ tung \]

# **16\. setValue() khác reset() như thế nào?**

Cực kỳ quan trọng.

### **setValue**

setValue("email", "<abc@gmail.com>");

Mental:

thay đổi MỘT FIELD

### **reset**

reset({

username: "tung",

email: "<abc@gmail.com>"

});

Mental:

reset/reinitialize FORM

với một bộ values

Đừng coi:

reset()

\=

setValue() nhiều lần

Chúng có semantics khác nhau, đặc biệt liên quan đến form state/default baseline.

# **17\. Ví dụ dễ thấy**

Bạn có form:

{

username: "",

email: "",

age: 0

}

Muốn chỉ đổi email:

setValue(

"email",

"<tung@gmail.com>"

);

Hợp lý.

Không cần:

reset({

username: ...,

email: "<tung@gmail.com>",

age: ...

});

Ngược lại, server vừa trả toàn bộ Product và bạn muốn form lấy product đó làm bộ dữ liệu edit:

reset(product);

thường tự nhiên hơn việc:

setValue("name", product.name);

setValue("price", product.price);

setValue(

"description",

product.description

);

setValue(

"category",

product.category

);

# **18\. setValue() và dirty state**

Giả sử:

useForm({

defaultValues: {

username: ""

}

});

Bạn:

setValue(

"username",

"tung"

);

Có một nuance quan trọng:

Programmatic setValue() có các option để bạn yêu cầu RHF cập nhật dirty/touched/validation state theo nhu cầu.

Ví dụ:

setValue(

"username",

"tung",

{

shouldDirty: true

}

);

Mental:

setValue(...)

↓

change field value

shouldDirty: true

↓

đồng thời cập nhật dirty state phù hợp

# **19\. Các option hay gặp của setValue()**

Bạn có thể gặp:

setValue(

"email",

"<tung@gmail.com>",

{

shouldValidate: true,

shouldDirty: true,

shouldTouch: true

}

);

Ý nghĩa:

shouldValidate

→ chạy/cập nhật validation liên quan

shouldDirty

→ cập nhật dirty state

shouldTouch

→ đánh dấu field touched

Không cần lúc nào cũng bật cả ba.

Chỉ cần biết:

setValue cho phép bạn kiểm soát việc programmatic update đó ảnh hưởng đến form state thế nào.

# **20\. Tại sao setValue() không đơn giản là sửa DOM?**

Bạn có thể nghĩ:

inputRef.current.value = "tung";

cũng đổi input mà?

Đúng là DOM có thể đổi.

Nhưng RHF là một **form management system**.

Nếu bạn chỉ tự ý:

inputRef.current.value = ...

bạn đang bypass cách RHF quản lý/tracking field.

Trong form do RHF quản lý, khi muốn programmatically cập nhật field:

setValue(...)

thường là API đúng abstraction hơn.

Mental:

Không phải:

"tôi sửa DOM"

Mà:

"RHF, hãy cập nhật field này"

# **21\. getValues() — lấy dữ liệu hiện tại**

Bây giờ chiều ngược lại.

setValue:

CODE

↓

FORM

getValues:

FORM

↓

CODE

Lấy:

const {

register,

getValues

} = useForm();

Gọi:

getValues();

→ lấy current form values.

# **22\. Ví dụ getValues()**

Form:

<input

{...register("username")}

/>

<input

{...register("email")}

/>

User nhập:

username = "tung"

email = "<tung@gmail.com>"

Code:

const data =

getValues();

data:

{

username: "tung",

email: "<tung@gmail.com>"

}

# **23\. Lấy riêng một field**

Không nhất thiết lấy cả form.

getValues("email");

Ví dụ current email:

<tung@gmail.com>

thì:

const email =

getValues("email");

→

email === "<tung@gmail.com>"

Mental:

getValues()

↓

toàn form

getValues("email")

↓

một field

# **24\. Ví dụ thực tế**

function RegisterForm() {

const {

register,

getValues

} = useForm();

function showCurrentValues() {

console.log(

getValues()

);

}

return (

<>

<input

{...register("username")}

/>

<input

{...register("email")}

/>

<button

type="button"

onClick={showCurrentValues}

\>

Show Values

&lt;/button&gt;

&lt;/&gt;

);

}

User nhập:

username = tung

email = <tung@gmail.com>

Click:

Show Values

Console:

{

username: "tung",

email: "<tung@gmail.com>"

}

# **25\. getValues() có làm component re-render không?**

Đây là điểm cực quan trọng trước Lesson 8.

getValues() về cơ bản là:

**Đọc giá trị hiện tại tại thời điểm bạn gọi nó.**

Nó **không phải subscription** để UI tự động render lại mỗi khi field thay đổi.

Ví dụ:

&lt;p&gt;

{getValues("username")}

&lt;/p&gt;

Đừng nghĩ:

user gõ username

↓

getValues tự thông báo React

↓

&lt;p&gt; tự rerender

Không nên dùng mental model đó.

# **26\. Snapshot vs Subscribe**

Đây là cách hiểu cực đẹp:

getValues()

\=

"Cho tôi giá trị NGAY BÂY GIỜ"

watch()/useWatch()

\=

"Hãy THEO DÕI giá trị này cho tôi"

Ví dụ analogy:

getValues()

↓

Bạn nhìn đồng hồ một lần:

09:00

watch()

↓

Bạn đăng ký theo dõi:

mỗi khi giá trị thay đổi

UI cần biết

Đây chính là cầu nối sang Lesson 8.

# **27\. getValues() rất hợp trong Event Handler**

Ví dụ:

function handleCheck() {

const password =

getValues("password");

console.log(password);

}

Button:

<button

type="button"

onClick={handleCheck}

\>

Check Password

&lt;/button&gt;

Khi click:

Event

↓

getValues("password")

↓

đọc current value

↓

xử lý

Hoàn toàn hợp lý.

Vì bạn chỉ cần:

Khi event xảy ra, lấy giá trị hiện tại cho tôi.

# **28\. getValues() với Confirm Password**

Ta đã preview ở Lesson 5.

Ví dụ:

<input

type="password"

{...register("password")}

/>

<input

type="password"

{...register(

"confirmPassword",

{

validate: (value) =>

value ===

getValues("password") ||

"Passwords do not match"

}

)}

/>

Chạy tay.

User:

password

\=

12345678

confirmPassword

\=

1234

Validation confirmPassword:

value

\=

"1234"

getValues("password")

\=

"12345678"

So sánh:

"1234"

\===

"12345678"

↓

false

→

Passwords do not match

# **29\. Nếu giống nhau**

password

\=

12345678

confirmPassword

\=

12345678

Validation:

value

\===

getValues("password")

↓

"12345678"

\===

"12345678"

↓

true

→ PASS.

Sau này Zod sẽ cho chúng ta một cách schema-based để xử lý cross-field validation.

Nhưng giờ bạn đã hiểu getValues() dùng được ở đâu.

# **30\. getValues() khác handleSubmit data thế nào?**

Bạn có thể hỏi:

Nếu getValues() lấy được data thì cần handleSubmit làm gì?

Hai mục đích khác nhau.

### **getValues()**

getValues()

nghĩa:

Cho tôi current values.

Không đồng nghĩa:

validate form

↓

chỉ cho data nếu valid

### **handleSubmit(onSubmit)**

Flow:

submit

↓

validation

↓

VALID?

↓

onSubmit(data)

Cho nên:

getValues

→ READ current values

handleSubmit

→ SUBMIT + VALIDATION FLOW

Không thay thế nhau.

# **31\. Tổng hợp 4 thứ bằng một sơ đồ**

RHF FORM

│

┌────────────┼────────────┐

│ │ │

▼ ▼ ▼

defaultValues setValue getValues

│ │ │

│ │ │

giá trị ban đầu CODE → FORM FORM → CODE

│

▼

reset()

│

▼

reset/reinitialize form

Hay nhớ kiểu:

defaultValues

→ FORM BẮT ĐẦU THẾ NÀO?

reset()

→ ĐƯA FORM VỀ MỘT BASELINE

setValue()

→ CODE MUỐN THAY ĐỔI FIELD

getValues()

→ CODE MUỐN ĐỌC CURRENT VALUE

# **32\. Một ví dụ Create Form thực tế**

function CreateProductForm() {

const {

register,

handleSubmit,

reset,

formState: {

errors,

isSubmitting

}

} = useForm({

defaultValues: {

name: "",

price: 0

}

});

async function onSubmit(data) {

const response =

await fetch("/api/products", {

method: "POST",

headers: {

"Content-Type":

"application/json"

},

body:

JSON.stringify(data)

});

if (!response.ok) {

throw new Error(

"Create product failed"

);

}

reset();

}

return (

<form

onSubmit={handleSubmit(onSubmit)}

\>

<input

{...register("name", {

required:

"Name is required"

})}

/>

{errors.name && (

&lt;p&gt;

{errors.name.message}

&lt;/p&gt;

)}

<input

type="number"

{...register("price", {

valueAsNumber: true,

min: {

value: 0,

message:

"Price cannot be negative"

}

})}

/>

<button

disabled={isSubmitting}

\>

Create

&lt;/button&gt;

&lt;/form&gt;

);

}

Flow:

defaultValues

↓

empty create form

↓

user nhập

↓

handleSubmit

↓

validation

↓

onSubmit(data)

↓

POST

↓

SUCCESS

↓

reset()

↓

empty create form

# **33\. Một ví dụ Edit Form thực tế**

Concept:

function EditProductForm({

product

}) {

const {

register,

handleSubmit,

reset

} = useForm({

defaultValues: {

name: "",

price: 0

}

});

useEffect(() => {

if (product) {

reset({

name: product.name,

price: product.price

});

}

}, \[product, reset\]);

async function onSubmit(data) {

await fetch(

\`/api/products/\${product.id}\`,

{

method: "PUT",

headers: {

"Content-Type":

"application/json"

},

body:

JSON.stringify(data)

}

);

}

return (

<form

onSubmit={handleSubmit(onSubmit)}

\>

<input

{...register("name")}

/>

<input

type="number"

{...register("price", {

valueAsNumber: true

})}

/>

&lt;button type="submit"&gt;

Save

&lt;/button&gt;

&lt;/form&gt;

);

}

# **34\. Chạy tay Edit Form**

### **Render đầu tiên**

Giả sử product chưa về:

product = undefined

Form dùng:

{

name: "",

price: 0

}

UI:

Name

\[ \]

Price

\[ 0 \]

### **API hoàn thành**

Giả sử:

product = {

id: 10,

name: "MacBook Pro",

price: 50000000

};

Component render lại.

Effect synchronization chạy:

reset({

name: product.name,

price: product.price

});

→

reset({

name: "MacBook Pro",

price: 50000000

});

Form:

Name

\[ MacBook Pro \]

Price

\[ 50000000 \]

### **User sửa**

MacBook Pro

↓

MacBook Pro M5

Form dirty.

isDirty = true

User Save:

handleSubmit

↓

validation

↓

onSubmit(data)

↓

PUT /products/10

Data:

{

name: "MacBook Pro M5",

price: 50000000

}

Đây chính là form Edit thực tế mà bạn sẽ gặp rất nhiều.

# **35\. Một bẫy: defaultValues không phải placeholder**

Hai cái hoàn toàn khác nhau.

### **Placeholder**

<input

placeholder="Enter username"

/>

UI:

\[ Enter username \]

nhưng đó chỉ là hint.

Không phải actual value.

### **Default value của form**

useForm({

defaultValues: {

username: "tung"

}

});

Input thực sự có form value:

\[ tung \]

Submit:

{

username: "tung"

}

Mental:

placeholder

→ gợi ý cho user

defaultValues

→ dữ liệu thực sự ban đầu của form

# **36\. Một bẫy khác: đừng dùng setValue hàng loạt khi ý định thật sự là reset form**

Giả sử server trả:

product = {

name: "iPhone",

price: 20000000,

stock: 50,

description: "..."

};

Bạn có thể làm:

setValue("name", product.name);

setValue("price", product.price);

setValue("stock", product.stock);

setValue(

"description",

product.description

);

Nhưng nếu ý định là:

"Đây là bộ dữ liệu mới mà Edit Form phải bắt đầu từ đó."

thì thường:

reset(product);

diễn tả intent rõ hơn.

Câu hỏi để chọn:

Tôi muốn cập nhật MỘT/VÀI field

trong form hiện tại?

↓

setValue()

Tôi muốn form nhận một bộ dữ liệu

làm trạng thái/baseline mới?

↓

reset(...)

# **37\. reset() vs setValue() vs getValues()**

Bảng này rất đáng nhớ:

| **API**                 | **Mục đích**                                 |
| ----------------------- | -------------------------------------------- |
| `defaultValues`         | Định nghĩa giá trị ban đầu/baseline của form |
| ---                     | ---                                          |
| `reset()`               | Reset/reinitialize form                      |
| ---                     | ---                                          |
| `reset(data)`           | Đưa form về một bộ values mới                |
| ---                     | ---                                          |
| `setValue(name, value)` | Programmatically cập nhật field              |
| ---                     | ---                                          |
| `getValues()`           | Đọc current values                           |
| ---                     | ---                                          |
| `getValues(name)`       | Đọc current value của một field              |
| ---                     | ---                                          |

# **38\. Câu hỏi phỏng vấn: defaultValues dùng để làm gì?**

Bạn có thể trả lời:

defaultValues defines the initial values of a React Hook Form and provides the baseline used by form state such as dirty tracking.

Mental:

defaultValues

\=

FORM BẮT ĐẦU VỚI DỮ LIỆU GÌ?

# **39\. Câu hỏi phỏng vấn: reset() và setValue() khác gì?**

Trả lời theo bản chất:

setValue updates a particular field programmatically, while reset resets or reinitializes the form values and related form state according to the reset behavior.

Mental:

setValue

→ UPDATE FIELD

reset

→ RESET / REINITIALIZE FORM

# **40\. Câu hỏi phỏng vấn: getValues() vs watch()?**

Chúng ta chưa học watch() kỹ, nhưng có thể preview:

getValues()

↓

đọc current value khi được gọi

↓

KHÔNG phải subscription

watch()/useWatch()

↓

theo dõi value thay đổi

↓

dùng khi UI cần phản ứng theo value

Ví dụ:

Khi user click nút:

"email hiện tại là gì?"

↓

getValues()

UI cần:

"country thay đổi thì hiện field tương ứng"

↓

watch / useWatch

Lesson 8 sẽ đào đúng chỗ này.

# **41\. Nối toàn bộ Lesson 1 → 7**

Bây giờ RHF mental model của bạn đã khá đầy đủ:

useForm()

│

┌────────────────┼─────────────────┐

│ │ │

▼ ▼ ▼

register() handleSubmit() formState

│ │ │

│ │ errors/isDirty/

│ │ isValid/...

▼ │

INPUTS │

│ │

▼ │

VALUES │

│ │

└───────┐ │

▼ ▼

SUBMIT

│

▼

VALIDATION

/ \\

FAIL PASS

│ │

▼ ▼

errors onSubmit(data)

Và thêm nhóm điều khiển form:

defaultValues

↓

initial form

reset()

↓

reset/reinitialize

setValue()

↓

code → form

getValues()

↓

form → code

# **42\. Những gì cần nhớ sau Lesson 7**

**Một:**

useForm({

defaultValues: {

username: "",

email: ""

}

});

→ thiết lập giá trị ban đầu/baseline.

**Hai:**

reset();

→ reset form về defaults hiện tại.

**Ba:**

reset(product);

→ đưa form về một bộ values mới; cực hữu ích cho Edit Form.

**Bốn:**

setValue(

"username",

"tung"

);

→ code chủ động cập nhật field.

**Năm:**

getValues();

→ lấy current form values.

**Sáu:**

getValues("email");

→ lấy một field.

**Bảy:**

getValues

≠

subscription

Nó đọc value tại thời điểm được gọi.

# **43\. Câu nhớ của Lesson 7**

RHF FORM

│

┌───────────────┼───────────────┐

│ │ │

▼ ▼ ▼

defaultValues setValue getValues

│ │ │

FORM bắt đầu CODE → FORM FORM → CODE

thế nào?

│

▼

reset()

│

▼

RESET / REINITIALIZE

**defaultValues đặt điểm xuất phát; reset() đưa form về một baseline; setValue() ghi giá trị vào form bằng code; getValues() đọc giá trị hiện tại từ form.**

Và từ getValues() xuất hiện câu hỏi rất tự nhiên:

Nếu tôi không muốn chỉ "đọc một lần",

mà muốn UI THEO DÕI một field liên tục thì sao?

Đó chính xác là **Lesson 8 — watch() và useWatch()**.