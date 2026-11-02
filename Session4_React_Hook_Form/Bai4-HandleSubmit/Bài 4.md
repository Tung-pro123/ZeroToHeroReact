# **LESSON 4: handleSubmit() — SUBMIT FORM**

Ở Lesson 3, chúng ta đã hiểu:

&lt;input {...register("email")} /&gt;

và mental model:

register("email")

↓

đăng ký field với RHF

↓

name / onChange / onBlur / ref

↓

RHF quản lý field

Bây giờ user nhập xong:

email = "<tung@gmail.com>"

password = "12345678"

và bấm:

\[ Login \]

Ta gặp dòng:

&lt;form onSubmit={handleSubmit(onSubmit)}&gt;

Có hàng loạt câu hỏi:

handleSubmit là gì?

onSubmit là gì?

Tại sao lại handleSubmit(onSubmit)?

Ai tạo data?

preventDefault() đâu rồi?

Validation chạy lúc nào?

Invalid thì chuyện gì xảy ra?

Đây là toàn bộ Lesson 4.

# **1\. Trước tiên nhớ lại HTML Form bình thường**

HTML:

&lt;form&gt;

&lt;input name="email" /&gt;

&lt;button type="submit"&gt;

Login

&lt;/button&gt;

&lt;/form&gt;

Khi user click:

Login

browser thực hiện hành vi submit mặc định của form.

Trong ứng dụng React SPA, thông thường chúng ta không muốn browser thực hiện kiểu submit truyền thống khiến document navigation/reload xảy ra.

Vì vậy với React form thuần bạn thường gặp:

function handleSubmit(event) {

event.preventDefault();

// xử lý data

}

return (

&lt;form onSubmit={handleSubmit}&gt;

...

&lt;/form&gt;

);

Mental:

User click Submit

↓

submit event

↓

handleSubmit(event)

↓

event.preventDefault()

↓

ngăn hành vi submit mặc định

↓

JavaScript tự xử lý

# **2\. React Hook Form thì sao?**

Với RHF:

const {

register,

handleSubmit

} = useForm();

và:

function onSubmit(data) {

console.log(data);

}

JSX:

<form

onSubmit={handleSubmit(onSubmit)}

\>

Có hai function khác nhau:

handleSubmit

↑

React Hook Form cung cấp

onSubmit

↑

Bạn tự viết

Đây là điều đầu tiên phải phân biệt.

# **3\. handleSubmit đến từ đâu?**

Từ:

const {

handleSubmit

} = useForm();

Tức là:

useForm()

│

└── handleSubmit

Nó là API của React Hook Form.

Còn:

function onSubmit(data) {

console.log(data);

}

là function của **bạn**.

Có thể đặt tên khác:

function login(data) {

console.log(data);

}

rồi:

<form

onSubmit={handleSubmit(login)}

\>

vẫn được.

onSubmit chỉ là convention phổ biến.

# **4\. Tại sao không viết onSubmit={onSubmit} luôn?**

Ví dụ:

&lt;form onSubmit={onSubmit}&gt;

thì submit event sẽ gọi function của bạn theo cơ chế event bình thường.

Nhưng khi dùng RHF, chúng ta muốn:

Submit Event

↓

React Hook Form

↓

collect form data

↓

validation

↓

valid?

/ \\

no yes

↓ ↓

errors function của bạn

↓

onSubmit(data)

Cho nên RHF phải đứng **ở giữa**.

Đó là:

handleSubmit(onSubmit)

Mental:

&lt;form&gt;

↓

handleSubmit

↓

RHF xử lý

↓

onSubmit

# **5\. handleSubmit(onSubmit) rất dễ bị đọc sai**

Đừng đọc nó như:

Khi submit thì gọi handleSubmit rồi gọi onSubmit.

Chính xác hơn:

handleSubmit(onSubmit)

đang **gọi handleSubmit trong lúc render để tạo ra một submit handler**.

Đây là kiến thức JavaScript function.

Có thể hình dung đơn giản:

function createHandler(callback) {

return function(event) {

// xử lý...

callback();

};

}

Ta gọi:

const handler =

createHandler(myFunction);

handler bây giờ là function.

RHF cũng có pattern tương tự:

const submitHandler =

handleSubmit(onSubmit);

Sau đó:

&lt;form onSubmit={submitHandler}&gt;

# **6\. Bung dòng code ra để hết "magic"**

Code thường thấy:

<form

onSubmit={handleSubmit(onSubmit)}

\>

Có thể viết thành:

const submitHandler =

handleSubmit(onSubmit);

return (

&lt;form onSubmit={submitHandler}&gt;

...

&lt;/form&gt;

);

Mental:

handleSubmit(onSubmit)

↓

trả về

↓

submitHandler function

↓

&lt;form onSubmit={submitHandler}&gt;

Vậy:

onSubmit={...}

cuối cùng vẫn nhận **một function**.

Điểm này rất quan trọng.

# **7\. So sánh với lỗi JavaScript bạn đã gặp trước đây**

Bạn biết:

&lt;button onClick={handleClick}&gt;

khác:

&lt;button onClick={handleClick()}&gt;

Thông thường cái thứ hai gọi function ngay khi render.

Nhưng ở đây:

<form

onSubmit={handleSubmit(onSubmit)}

\>

lại hợp lệ.

Tại sao?

Vì:

handleSubmit(onSubmit)

được gọi lúc render **nhưng nó trả về một function khác**.

Tức là:

render

↓

handleSubmit(onSubmit)

↓

returns submitHandler

↓

onSubmit={submitHandler}

Chứ không phải:

render

↓

gửi form ngay ❌

# **8\. Ví dụ JavaScript thuần để hiểu**

Giả sử:

function wrapper(callback) {

return function() {

console.log("Before");

callback();

console.log("After");

};

}

Ta có:

function hello() {

console.log("Hello");

}

Gọi:

const result = wrapper(hello);

hello chưa chạy.

result là:

function() {

console.log("Before");

hello();

console.log("After");

}

Đến:

result();

mới chạy:

Before

Hello

After

Mental tương tự:

handleSubmit(onSubmit)

↓

returns submit handler

↓

event xảy ra

↓

handler chạy

↓

RHF xử lý

↓

onSubmit(data)

# **9\. Vậy preventDefault() biến đâu rồi?**

Form thuần:

function handleSubmit(event) {

event.preventDefault();

...

}

RHF:

function onSubmit(data) {

console.log(data);

}

Không thấy:

event.preventDefault();

Vì submit handler do handleSubmit(...) tạo ra xử lý submit event cho bạn, bao gồm ngăn hành vi submit mặc định để RHF thực hiện flow của nó.

Mental:

Browser submit event

↓

RHF submit handler

↓

prevent default behavior

↓

collect + validate

↓

your callback

Vì vậy callback thành công của bạn thường tập trung vào:

function onSubmit(data) {

// xử lý data

}

thay vì tự lo boilerplate submit event.

# **10\. Ai tạo data?**

Đây là câu cực quan trọng.

Cho:

<input

{...register("email")}

/>

<input

{...register("password")}

/>

User nhập:

email

→ "<tung@gmail.com>"

password

→ "12345678"

Khi:

handleSubmit(onSubmit)

xử lý form thành công, RHF cung cấp data cho callback:

{

email: "<tung@gmail.com>",

password: "12345678"

}

rồi gọi:

onSubmit(data);

Vậy:

function onSubmit(data) {

data là argument được **RHF truyền vào callback của bạn**.

# **11\. Chạy tay đoạn này**

Code:

function LoginForm() {

const {

register,

handleSubmit

} = useForm();

function onSubmit(data) {

console.log(data);

}

return (

<form

onSubmit={

handleSubmit(onSubmit)

}

\>

<input

{...register("email")}

/>

<input

type="password"

{...register("password")}

/>

&lt;button type="submit"&gt;

Login

&lt;/button&gt;

&lt;/form&gt;

);

}

## **Khi render**

LoginForm()

↓

useForm()

↓

register + handleSubmit

Inputs:

register("email")

register("password")

RHF biết:

FORM

├── email

└── password

# **12\. Trong render, dòng này cũng được chạy**

handleSubmit(onSubmit)

RHF nhận callback của bạn:

onSubmit

và trả về:

submitHandler

React nhận:

&lt;form onSubmit={submitHandler}&gt;

Lúc này **chưa submit**.

# **13\. User bắt đầu nhập**

User nhập:

email:

<tung@gmail.com>

password:

12345678

Các field đã được register().

Mental state của form:

email

→ "<tung@gmail.com>"

password

→ "12345678"

# **14\. User click button**

&lt;button type="submit"&gt;

Login

&lt;/button&gt;

Button nằm trong form.

→ submit event xảy ra.

Click Login

↓

Form Submit Event

React gọi handler:

submitHandler

mà RHF đã tạo.

# **15\. handleSubmit bắt đầu làm việc**

Mental model:

Submit Event

↓

RHF submit handler

↓

ngăn default form behavior

↓

lấy dữ liệu các registered fields

↓

validation

↓

form valid?

Nếu valid:

YES

↓

onSubmit(data)

Và:

data = {

email: "<tung@gmail.com>",

password: "12345678"

}

# **16\. Nhưng hiện tại chưa có validation mà?**

Đúng.

Nếu chúng ta chỉ:

register("email")

và:

register("password")

chưa đưa validation rules, thì chưa có các rule kiểu:

email required

password >= 8

Nhưng handleSubmit vẫn là nơi RHF thực hiện submit/validation flow.

Sau này ta thêm:

register("email", {

required: "Email is required"

})

và:

register("password", {

required: "Password is required",

minLength: {

value: 8,

message:

"Password must be at least 8 characters"

}

})

Lúc đó handleSubmit sẽ cực kỳ có ý nghĩa.

# **17\. Nếu validation FAIL thì sao?**

Giả sử:

<input

{...register("email", {

required: true

})}

/>

User không nhập email:

email = ""

rồi Submit.

Flow:

Submit

↓

handleSubmit

↓

validate email

↓

required?

↓

email = ""

↓

INVALID

Khi validation thất bại:

onSubmit(data)

(success callback) **không được gọi**.

Thay vào đó RHF cập nhật validation errors/form state.

Mental:

handleSubmit

↓

validate

/ \\

VALID INVALID

↓ ↓

onSubmit(data) errors

Đây là flow quan trọng nhất của bài.

# **18\. handleSubmit thực ra có thể nhận hai callback**

Bạn thường thấy:

handleSubmit(onSubmit)

Nhưng nó còn hỗ trợ kiểu:

handleSubmit(

onValid,

onInvalid

)

Ví dụ:

function onValid(data) {

console.log("Valid:", data);

}

function onInvalid(errors) {

console.log("Invalid:", errors);

}

rồi:

<form

onSubmit={

handleSubmit(

onValid,

onInvalid

)

}

\>

Flow:

Submit

↓

handleSubmit

↓

Validation

│

├── VALID

│ ↓

│ onValid(data)

│

└── INVALID

↓

onInvalid(errors)

Trong thực tế bạn thường chỉ cần:

handleSubmit(onSubmit)

và lấy errors qua formState.errors.

Nhưng biết hai callback sẽ giúp bạn hiểu handleSubmit sâu hơn.

# **19\. Đừng nhầm onSubmit của &lt;form&gt; với function tên onSubmit**

Đoạn này:

function onSubmit(data) {

console.log(data);

}

return (

<form

onSubmit={handleSubmit(onSubmit)}

\>

có hai chữ onSubmit mang hai vai trò khác nhau.

### **Cái thứ nhất:**

&lt;form onSubmit={...}&gt;

là **React event prop** của &lt;form&gt;.

### **Cái thứ hai:**

function onSubmit(data)

là **function do bạn đặt tên**.

Bạn hoàn toàn có thể đổi thành:

function loginUser(data) {

console.log(data);

}

<form

onSubmit={handleSubmit(loginUser)}

\>

Lúc này dễ nhìn hơn:

&lt;form onSubmit={...}&gt;

↑

React event prop

loginUser

↑

function của bạn

# **20\. handleSubmit không phải HTTP submit**

Một hiểu lầm khác.

Tên:

handleSubmit

không có nghĩa:

handleSubmit

↓

POST /api/login

❌

RHF không tự gọi backend.

Ví dụ:

function onSubmit(data) {

console.log(data);

}

thì submit chỉ log.

Muốn gọi API:

async function onSubmit(data) {

const response =

await fetch(

"<http://localhost:8080/api/auth/login>",

{

method: "POST",

headers: {

"Content-Type":

"application/json"

},

body: JSON.stringify(data)

}

);

// ...

}

Flow:

RHF

handleSubmit

↓

validation

↓

onSubmit(data)

↓

YOUR CODE

↓

fetch()

↓

HTTP POST

↓

Spring Boot

# **21\. Đây là Event Handler, không phải Effect**

Kiến thức React cũ quay lại.

User bấm:

Login

và chúng ta muốn:

POST login

Đây là:

USER ACTION

↓

EVENT

↓

SUBMIT HANDLER

Cho nên API call thường nằm trong:

async function onSubmit(data) {

await fetch(...);

}

Không cần:

useEffect(() => {

// POST login

}, \[...\]);

❌

Bạn đã học quy tắc:

Specific user action

→ Event Handler

Synchronize with external system

because component is displayed/state requires it

→ Effect

RHF không thay đổi nguyên tắc đó.

# **22\. onSubmit có thể là async**

Hoàn toàn được.

async function onSubmit(data) {

const response =

await fetch("/api/register", {

method: "POST",

headers: {

"Content-Type":

"application/json"

},

body: JSON.stringify(data)

});

const result =

await response.json();

console.log(result);

}

Sau này điều này còn liên quan tới:

formState.isSubmitting

Ví dụ:

Submit bắt đầu

↓

isSubmitting = true

await API

↓

request hoàn thành

isSubmitting = false

Ta học kỹ ở Lesson 6.

# **23\. Một bẫy: đừng tự gọi callback**

Đúng:

<form

onSubmit={handleSubmit(onSubmit)}

\>

Không phải:

<form

onSubmit={

handleSubmit(onSubmit())

}

\>

❌

Tại sao?

Vì:

onSubmit()

sẽ chạy ngay trong render.

Bạn muốn **truyền function**:

onSubmit

cho RHF.

Mental:

handleSubmit(onSubmit)

↑

truyền function

không phải:

handleSubmit(onSubmit())

↑

gọi ngay

# **24\. Một bẫy khác: gọi handleSubmit nhưng không thực thi handler**

Đôi khi người mới tự viết:

function submitForm(event) {

handleSubmit(onSubmit);

}

Cái này chỉ tạo submit handler rồi vứt nó đi.

Vì nhớ:

handleSubmit(onSubmit)

**trả về function**.

Nếu thực sự wrapper thủ công thì phải xử lý đúng function trả về/event, nhưng thông thường chẳng cần làm vòng vèo.

Cứ:

<form

onSubmit={handleSubmit(onSubmit)}

\>

là chuẩn và rõ nhất.

# **25\. Tại sao callback nhận data chứ không phải event?**

Form React thuần:

function handleSubmit(event) {

event.preventDefault();

// event...

}

RHF:

function onSubmit(data) {

console.log(data);

}

Vì có một tầng ở giữa:

Browser/React

↓

submit event

↓

RHF submit handler

↓

RHF xử lý event

↓

RHF collect + validate form

↓

your callback

↓

data

Nói đơn giản:

**RHF nhận event; callback thành công của bạn nhận form data.**

Đây là một câu nhớ rất tốt.

# **26\. Chạy tay một ví dụ có validation**

Cho:

function RegisterForm() {

const {

register,

handleSubmit

} = useForm();

function onSubmit(data) {

console.log("SEND:", data);

}

return (

<form

onSubmit={handleSubmit(onSubmit)}

\>

<input

{...register("username", {

required: true

})}

/>

<input

{...register("password", {

required: true,

minLength: 8

})}

/>

&lt;button type="submit"&gt;

Register

&lt;/button&gt;

&lt;/form&gt;

);

}

### **Trường hợp 1**

User:

username = "tung"

password = "12345678"

Submit:

Click Register

↓

submit event

↓

RHF handler

↓

username required

→ PASS

↓

password required

→ PASS

↓

password minLength 8

→ PASS

↓

VALID

↓

onSubmit(data)

Output:

{

username: "tung",

password: "12345678"

}

# **27\. Trường hợp 2 — password quá ngắn**

User:

username = "tung"

password = "123"

Submit:

Click Register

↓

handleSubmit

↓

validation

↓

username required

→ PASS

↓

password required

→ PASS

↓

password minLength 8

→ FAIL

↓

INVALID

↓

onSubmit(data)

KHÔNG chạy

↓

validation error

Sau này:

formState.errors.password

sẽ giúp chúng ta lấy lỗi đó.

# **28\. Trường hợp 3 — bỏ trống hết**

username = ""

password = ""

Submit:

handleSubmit

↓

validate

│

├── username required → FAIL

│

└── password required → FAIL

↓

INVALID

↓

onSubmit không chạy

↓

errors

Vậy RHF đang giúp chúng ta đảm bảo:

Valid form

↓

business/API submit callback

thay vì tự viết hàng đống:

if (...) {

return;

}

if (...) {

return;

}

if (...) {

return;

}

# **29\. Nhưng validation phía frontend KHÔNG đảm bảo backend an toàn**

Cực kỳ quan trọng.

Giả sử:

register("age", {

min: 18

})

không có nghĩa Spring Boot được phép tin:

age chắc chắn >= 18

Người khác có thể không dùng React app của bạn mà gửi request thẳng:

Postman

↓

POST /api/register

↓

{

"age": 10

}

↓

Spring Boot

Cho nên:

Frontend Validation

↓

UX + ngăn input sai thông thường

Backend Validation

↓

bắt buộc vẫn phải có

Sau này Zod cũng vậy.

# **30\. Toàn bộ trách nhiệm của từng thằng**

Đây là sơ đồ tôi muốn bạn giữ:

&lt;input {...register("email")}&gt;

│

│ user nhập

▼

React Hook Form

│

│ submit

▼

handleSubmit(onSubmit)

│

▼

Validation

/ \\

FAIL PASS

│ │

▼ ▼

errors data object

│

▼

onSubmit(data)

│

▼

fetch()

│

▼

HTTP POST

│

▼

Spring Boot

│

▼

Backend Validation

Mỗi tầng một trách nhiệm.

# **31\. So sánh React thuần và RHF**

## **React thuần**

function handleSubmit(e) {

e.preventDefault();

if (!email) {

// error

return;

}

if (password.length < 8) {

// error

return;

}

const data = {

email,

password

};

// API

}

&lt;form onSubmit={handleSubmit}&gt;

Bạn tự:

preventDefault

collect values

validation

errors

construct data

## **React Hook Form**

function onSubmit(data) {

// API

}

<form

onSubmit={handleSubmit(onSubmit)}

\>

RHF phụ trách phần form-management/validation flow để callback thành công nhận dữ liệu hợp lệ theo các rule đã cấu hình.

# **32\. Câu hỏi phỏng vấn: handleSubmit làm gì?**

Có thể trả lời:

handleSubmit is a function provided by React Hook Form that handles form submission and validation. It creates a submit handler, validates the registered fields, and calls the success callback with the form data when validation passes.

Tiếng Việt:

handleSubmit() của React Hook Form tạo submit handler, xử lý quá trình submit và validation; nếu form hợp lệ thì nó gọi callback của mình với dữ liệu form.

Điểm cốt lõi:

handleSubmit

↓

returns submit handler

↓

validate

↓

valid

↓

callback(data)

# **33\. Câu hỏi phỏng vấn hay: Tại sao viết handleSubmit(onSubmit)?**

Bạn có thể giải thích:

onSubmit

\= callback của mình

handleSubmit(onSubmit)

\= đưa callback đó cho RHF

handleSubmit(...)

\= trả về submit handler

&lt;form onSubmit={...}&gt;

\= React nhận submit handler đó

Flow:

RENDER

↓

handleSubmit(onSubmit)

↓

submitHandler

↓

&lt;form onSubmit={submitHandler}&gt;

LATER: USER SUBMITS

↓

submitHandler(event)

↓

RHF validation

↓

onSubmit(data)

Nếu hiểu được sự khác biệt giữa **render time** và **event time** ở đây thì bạn hiểu khá sâu rồi.

# **34\. Những gì cần nhớ sau Lesson 4**

### **1\. Hai function khác nhau**

handleSubmit

→ RHF cung cấp

onSubmit

→ bạn viết

### **2\. Dòng này:**

handleSubmit(onSubmit)

không có nghĩa onSubmit chạy ngay.

Nó tạo submit handler:

handleSubmit(onSubmit)

↓

submitHandler

### **3\. User submit:**

Form submit

↓

RHF submit handler

↓

collect + validate

↓

valid?

### **4\. Nếu valid:**

VALID

↓

onSubmit(data)

Ví dụ:

{

email: "<tung@gmail.com>",

password: "12345678"

}

### **5\. Nếu invalid:**

INVALID

↓

onSubmit success callback không chạy

↓

errors

### **6\. RHF xử lý submit event/default form behavior cho flow này**

Nên callback thành công thường là:

function onSubmit(data) {

// ...

}

thay vì tự bắt đầu bằng:

event.preventDefault();

### **7\. handleSubmit không gửi API**

handleSubmit

↓

Form handling

onSubmit(data)

↓

YOUR CODE

↓

fetch / Axios

↓

API

# **35\. Câu nhớ của Lesson 4**

register()

↓

RHF biết các field

User nhập

↓

User Submit

↓

handleSubmit(onSubmit)

↓

RHF xử lý submit event

↓

collect data

↓

validate

│

┌───┴────┐

▼ ▼

FAIL PASS

│ │

errors data

│

▼

onSubmit(data)

│

▼

API

**register() kết nối input với RHF; handleSubmit() là cánh cổng mà dữ liệu phải đi qua trước khi callback submit của chúng ta được gọi.**

Và bây giờ chúng ta đã chạm đúng câu hỏi tiếp theo: **"validate" ở giữa sơ đồ kia thực sự kiểm tra bằng cách nào? required, minLength, pattern, validate hoạt động ra sao?**

Đó chính xác là **Lesson 5 — Validation với React Hook Form**.

**Câu hỏi thắc mắc và câu trả lời:**

Đôi khi người mới tự viết:

function submitForm(event) {

handleSubmit(onSubmit);

}

Cái này chỉ tạo submit handler rồi vứt nó đi.

Vì nhớ:

handleSubmit(onSubmit)

**trả về function**.

Nếu thực sự wrapper thủ công thì phải xử lý đúng function trả về/event, nhưng thông thường chẳng cần làm vòng vèo.

tôi ko hiểu chỗ này

Đúng, chỗ này hơi dễ rối vì có **function trả về function**. Tôi chạy tay cực chậm nhé.

## **36\. Nhớ lại handleSubmit(onSubmit) thực chất trả về gì?**

Giả sử:

function onSubmit(data) {

console.log(data);

}

Khi bạn viết:

handleSubmit(onSubmit)

hãy tưởng tượng RHF làm kiểu:

function handleSubmit(onSubmit) {

function submitHandler(event) {

event.preventDefault();

// lấy data

// validate...

onSubmit(data);

}

return submitHandler;

}

Đây chỉ là code **minh họa mental model**, không phải source code thật của RHF.

Như vậy:

handleSubmit(onSubmit)

trả về:

submitHandler

tức là **một function khác**.

# **37\. Cách bình thường**

Bạn viết:

&lt;form onSubmit={handleSubmit(onSubmit)}&gt;

Chạy tay:

### **Lúc render**

JavaScript chạy:

handleSubmit(onSubmit)

và nhận về:

submitHandler

Nên có thể tưởng tượng JSX cuối cùng thành:

&lt;form onSubmit={submitHandler}&gt;

Sau đó **chưa có gì xảy ra cả**.

Đến khi user submit:

User click Submit

↓

Form phát submit event

↓

submitHandler(event)

↓

RHF xử lý event

↓

validate

↓

onSubmit(data)

Cái này đúng.

# **38\. Bây giờ xem code bạn hỏi**

Code:

function submitForm(event) {

handleSubmit(onSubmit);

}

rồi giả sử:

&lt;form onSubmit={submitForm}&gt;

User submit.

React gọi:

submitForm(event);

Chúng ta bước vào:

function submitForm(event) {

handleSubmit(onSubmit);

}

Dòng:

handleSubmit(onSubmit)

chạy và **trả về một function**.

Giả sử nó trả:

submitHandler

Vậy về bản chất code của bạn giống:

function submitForm(event) {

const submitHandler =

handleSubmit(onSubmit);

}

Sau đó?

**Hết function.**

Bạn tạo ra submitHandler nhưng **không gọi nó**.

submitForm(event)

↓

handleSubmit(onSubmit)

↓

trả về submitHandler

↓

???

↓

không ai gọi submitHandler

↓

HẾT

Đó là ý tôi nói **"tạo submit handler rồi vứt nó đi"**.

# **39\. Ví dụ JavaScript thuần sẽ dễ thấy hơn**

Không nói RHF nữa.

Cho:

function createHello() {

return function () {

console.log("HELLO");

};

}

Bây giờ:

function test() {

createHello();

}

Gọi:

test();

Bạn nghĩ "HELLO" có được in không?

**Không.**

Vì:

createHello();

chỉ trả về function:

function () {

console.log("HELLO");

}

nhưng bạn không gọi function đó.

# **40\. Muốn nó chạy thì phải gọi function được trả về**

Ví dụ:

function test() {

const hello =

createHello();

hello();

}

Bây giờ:

test()

↓

createHello()

↓

return function

↓

hello = function

↓

hello()

↓

HELLO

Hoặc viết gọn:

function test() {

createHello()();

}

Nhìn hơi quái nhưng nghĩa là:

createHello()

↓

trả về function

↓

()

↓

gọi function vừa trả về

# **41\. Quay lại RHF**

Sai:

function submitForm(event) {

handleSubmit(onSubmit);

}

Vì:

handleSubmit(onSubmit)

↓

trả về submitHandler

↓

không gọi

Nếu cố wrapper thủ công thì về ý tưởng phải làm:

function submitForm(event) {

const submitHandler =

handleSubmit(onSubmit);

submitHandler(event);

}

Bây giờ mới có:

submitForm(event)

↓

handleSubmit(onSubmit)

↓

return submitHandler

↓

submitHandler(event)

↓

RHF xử lý submit

↓

validation

↓

onSubmit(data)

Hoặc viết gọn:

function submitForm(event) {

handleSubmit(onSubmit)(event);

}

Nhưng nhìn rối và **không có lý do gì phải làm vậy** trong trường hợp bình thường.

Cứ:

&lt;form onSubmit={handleSubmit(onSubmit)}&gt;

# **42\. Chỗ dễ nhầm nhất nằm ở đây**

Bạn có thể đang nghĩ:

handleSubmit(onSubmit);

nghĩa là:

"handleSubmit sẽ xử lý submit."

**Chưa.**

Nó giống:

const submitHandler =

handleSubmit(onSubmit);

Nó đang **tạo ra handler**.

Handler đó phải được gọi khi event xảy ra.

Và khi bạn viết:

&lt;form onSubmit={handleSubmit(onSubmit)}&gt;

thì React chính là thằng sẽ giữ handler đó và **gọi nó sau này khi submit event xảy ra**.

# **43\. So sánh 3 trường hợp**

### **Trường hợp 1 — Chuẩn**

&lt;form onSubmit={handleSubmit(onSubmit)}&gt;

Tương đương mental model:

const submitHandler =

handleSubmit(onSubmit);

&lt;form onSubmit={submitHandler}&gt;

Sau này:

submit event

↓

React gọi submitHandler(event)

↓

RHF xử lý

✅

### **Trường hợp 2 — Wrapper nhưng sai**

function submitForm(event) {

handleSubmit(onSubmit);

}

&lt;form onSubmit={submitForm}&gt;

Flow:

submit event

↓

submitForm(event)

↓

handleSubmit(onSubmit)

↓

tạo submitHandler

↓

không gọi

↓

HẾT

❌

### **Trường hợp 3 — Wrapper và thực sự gọi**

function submitForm(event) {

const submitHandler =

handleSubmit(onSubmit);

submitHandler(event);

}

&lt;form onSubmit={submitForm}&gt;

Flow:

submit event

↓

submitForm(event)

↓

tạo submitHandler

↓

submitHandler(event)

↓

RHF xử lý

↓

onSubmit(data)

✅ nhưng vòng vèo không cần thiết.

# **44\. Câu nhớ**

Đừng nghĩ:

handleSubmit(onSubmit)

là:

"SUBMIT FORM NGAY"

Hãy nghĩ:

handleSubmit(onSubmit)

↓

"TẠO CHO TÔI MỘT FUNCTION

ĐỂ XỬ LÝ SUBMIT"

↓

submitHandler

Sau đó:

&lt;form onSubmit={submitHandler}&gt;

React giữ function đó.

**Đến khi user submit thì React mới gọi nó.**

Đây cũng chính là lý do dòng:

&lt;form onSubmit={handleSubmit(onSubmit)}&gt;

không làm form submit ngay mỗi lần component render.