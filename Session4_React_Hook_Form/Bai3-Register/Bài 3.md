# **LESSON 3: register() — ĐĂNG KÝ INPUT**

Lesson 2 chúng ta đã biết:

const {

register,

handleSubmit,

formState

} = useForm();

Mental model:

useForm()

│

├── register → đăng ký field

├── handleSubmit → xử lý submit

└── formState → trạng thái form

Nhưng có một dòng vẫn còn khá "ảo":

&lt;input {...register("email")} /&gt;

Câu hỏi của Lesson 3:

register("email") thực sự làm gì?

Nó trả về cái gì?

Tại sao phải có ... ?

RHF biết user đang gõ gì bằng cách nào?

name / onChange / onBlur / ref từ đâu ra?

Mổ từng phần nhé.

# **1\. register() là gì?**

Ta có:

const {

register

} = useForm();

Sau đó:

register("email");

Hiểu đơn giản:

**register() dùng để đăng ký một field với React Hook Form để RHF có thể theo dõi và quản lý field đó.**

Ví dụ:

register("email");

register("password");

register("username");

Mental model:

React Hook Form

│

┌─────────────┼─────────────┐

▼ ▼ ▼

email password username

Nếu một input không được đăng ký với form thì RHF không tự nhiên biết:

"À input này là field email của form."

# **2\. "email" trong register("email") là gì?**

Ví dụ:

register("email")

"email" là **tên của field**.

Nó cực kỳ quan trọng.

Nếu:

&lt;input {...register("email")} /&gt;

user nhập:

<abc@gmail.com>

thì khi submit, dữ liệu có dạng:

{

email: "<abc@gmail.com>"

}

Nếu:

&lt;input {...register("username")} /&gt;

thì:

{

username: "tung"

}

Nếu có:

&lt;input {...register("username")} /&gt;

&lt;input {...register("email")} /&gt;

&lt;input {...register("password")} /&gt;

thì data:

{

username: "tung",

email: "<abc@gmail.com>",

password: "12345678"

}

Mental model:

register("username")

│

▼

data.username

register("email")

│

▼

data.email

register("password")

│

▼

data.password

# **3\. Nhưng register("email") không chỉ "đăng ký tên"**

Đây mới là phần quan trọng.

Hãy thử tưởng tượng:

const result = register("email");

result không đơn giản là:

"email"

❌

Nó là một object chứa các props/handlers mà input cần để RHF kết nối với field đó.

Về mặt ý tưởng, nó trông kiểu:

{

name: "email",

onChange: ...,

onBlur: ...,

ref: ...

}

Chúng ta chưa cần quan tâm implementation chính xác bên trong.

Chỉ cần mental model:

register("email")

↓

{

name,

onChange,

onBlur,

ref

}

Đây chính là chìa khóa để hiểu:

&lt;input {...register("email")} /&gt;

# **4\. Khoan — vậy dấu ... là gì?**

Đây **không phải syntax của React Hook Form**.

Nó là JavaScript spread syntax mà bạn đã gặp.

Ví dụ:

const user = {

name: "Tung",

age: 20

};

Ta có thể:

const anotherUser = {

...user

};

thành:

{

name: "Tung",

age: 20

}

Trong JSX cũng có thể spread props.

Ví dụ:

const props = {

type: "text",

placeholder: "Email"

};

&lt;input {...props} /&gt;

về ý tưởng tương đương:

<input

type="text"

placeholder="Email"

/>

# **5\. Áp dụng vào register()**

Ta có:

&lt;input {...register("email")} /&gt;

Giả sử về mặt ý tưởng:

register("email")

trả:

{

name: "email",

onChange: handleChange,

onBlur: handleBlur,

ref: someRef

}

Thì:

&lt;input {...register("email")} /&gt;

có thể hình dung được bung thành:

<input

name="email"

onChange={handleChange}

onBlur={handleBlur}

ref={someRef}

/>

💡 **Đây chính là bản chất của dòng code nhìn rất magic kia.**

register("email")

↓

trả object chứa props

↓

...

↓

spread các props vào &lt;input&gt;

# **6\. Chạy tay dòng này**

Cho:

&lt;input {...register("email")} /&gt;

### **Bước 1**

JavaScript gọi:

register("email")

### **Bước 2**

RHF đăng ký field:

field name = "email"

và cung cấp các props cần thiết.

Mental model:

{

name: "email",

onChange: ...,

onBlur: ...,

ref: ...

}

### **Bước 3**

Spread:

{...}

đưa các property đó vào input.

Kết quả về mặt ý tưởng:

<input

name="email"

onChange={...}

onBlur={...}

ref={...}

/>

### **Bước 4**

Input bây giờ được kết nối với React Hook Form.

&lt;input&gt;

│

│ name / handlers / ref

▼

React Hook Form

# **7\. Tại sao cần name?**

Giả sử form có:

&lt;input {...register("email")} /&gt;

&lt;input {...register("password")} /&gt;

RHF phải phân biệt:

Input số 1 là gì?

Input số 2 là gì?

name chính là identity của field.

Input 1

name="email"

Input 2

name="password"

Khi submit:

{

email: "...",

password: "..."

}

Nếu bạn đổi:

register("userEmail")

thì:

{

userEmail: "..."

}

chứ không phải:

{

email: "..."

}

# **8\. onChange dùng để làm gì?**

Nhớ controlled form cũ:

<input

value={email}

onChange={(e) =>

setEmail(e.target.value)

}

/>

Bạn tự viết:

onChange

↓

lấy e.target.value

↓

setEmail(...)

Với RHF:

&lt;input {...register("email")} /&gt;

register() cung cấp onChange handler để RHF có thể nhận biết/thực hiện logic cần thiết khi field thay đổi.

Mental model:

User gõ

↓

Input thay đổi

↓

onChange của RHF

↓

RHF biết field "email"

đã thay đổi

Bạn không cần tự:

onChange={(e) =>

setEmail(e.target.value)

}

cho trường hợp cơ bản.

# **9\. Đây là điểm khác controlled form**

Controlled:

const \[email, setEmail\] =

useState("");

<input

value={email}

onChange={(e) =>

setEmail(e.target.value)

}

/>

Flow:

User gõ

↓

onChange

↓

setEmail

↓

React State thay đổi

↓

Component render

↓

value={email}

↓

Input

RHF với native input thường:

&lt;input {...register("email")} /&gt;

Mental model đơn giản:

User gõ

↓

DOM input giữ current value

↓

RHF đã register input

↓

RHF theo dõi/quản lý field

Bạn không cần tạo:

const \[email, setEmail\]

cho từng field.

# **10\. Nhưng RHF vẫn có onChange**

Đây là điểm dễ hiểu sai.

Bạn có thể nghĩ:

"Uncontrolled thì không có onChange chứ?"

Không.

**Uncontrolled không có nghĩa là không được có event handler.**

Điểm khác nằm ở việc ai đang điều khiển value.

Controlled:

<input

value={email}

onChange={...}

/>

React state quyết định value.

Uncontrolled/native-style:

<input

{...register("email")}

/>

DOM input có thể giữ current value, trong khi RHF vẫn gắn event handlers để theo dõi và quản lý form.

Do đó:

uncontrolled

≠

không có onChange

# **11\. onBlur là gì?**

blur xảy ra khi element mất focus.

Ví dụ:

User click vào Email

↓

input đang focus

↓

User nhập abc

↓

User click sang Password

↓

Email mất focus

↓

blur event

RHF có thể cần biết chuyện này để theo dõi trạng thái field và phục vụ validation/form-state tùy cấu hình.

Mental:

onChange

→ field thay đổi

onBlur

→ user rời khỏi field

Sau này khi học:

touchedFields

bạn sẽ thấy ý nghĩa rõ hơn.

# **12\. ref mới thú vị**

Bạn đã học React ref rồi:

const inputRef = useRef(null);

&lt;input ref={inputRef} /&gt;

Sau commit:

inputRef.current

trỏ tới DOM input.

React Hook Form cũng sử dụng ref trong quá trình đăng ký native input.

Mental model:

register("email")

↓

ref

↓

&lt;input DOM node&gt;

↑

│

RHF có kết nối/reference

với field

Đây là một trong những lý do bài Refs/DOM refs bạn học trước đây rất hữu ích.

# **13\. Nhưng đừng hiểu ref là nơi chứa value**

Một lỗi mental model dễ xảy ra:

ref

↓

chứa email value

Không nên hiểu như vậy.

ref về cơ bản giúp RHF có reference/kết nối tới DOM field.

DOM input bản thân nó có:

value

Ví dụ:

HTMLInputElement

│

├── value

├── name

├── type

└── ...

RHF sử dụng registration/event/ref mechanisms để quản lý field.

Đừng đơn giản hóa thành:

RHF = useRef để chứa data

❌

# **14\. Ghép bốn thứ lại**

Với:

&lt;input {...register("email")} /&gt;

mental model:

register("email")

│

▼

┌──────────────────┐

│ name │

│ onChange │

│ onBlur │

│ ref │

└──────────────────┘

│

│ spread ...

▼

&lt;input&gt;

Vai trò:

name

→ field này là ai?

onChange

→ field thay đổi

onBlur

→ field mất focus

ref

→ kết nối/reference tới DOM field

Đây là 4 thứ quan trọng nhất để hiểu register.

# **15\. Vậy register() đang đăng ký với ai?**

Không phải:

register với React ❌

register với browser ❌

register với Spring Boot ❌

Mà:

Input

↓

register(...)

↓

React Hook Form

Bạn đang nói:

Field này thuộc form mà useForm() đang quản lý.

# **16\. register() đến từ đúng useForm() đó**

Ví dụ:

const {

register

} = useForm();

rồi:

&lt;input {...register("email")} /&gt;

Mental:

useForm()

│

▼

Form Management

│

└── register

│

▼

email field

Nó không phải một global function.

Bạn lấy nó từ instance/form-control setup của useForm().

# **17\. Một form nhiều field**

Ví dụ:

function RegisterForm() {

const {

register,

handleSubmit

} = useForm();

function onSubmit(data) {

console.log(data);

}

return (

<form

onSubmit={handleSubmit(onSubmit)}

\>

<input

{...register("username")}

/>

<input

{...register("email")}

/>

<input

type="password"

{...register("password")}

/>

<input

type="number"

{...register("age")}

/>

&lt;button type="submit"&gt;

Register

&lt;/button&gt;

&lt;/form&gt;

);

}

RHF nhìn form theo mental model:

FORM

│

├── username

│

├── email

│

├── password

│

└── age

User nhập:

username = tung

email = <tung@gmail.com>

password = 12345678

age = 20

Submit:

{

username: "tung",

email: "<tung@gmail.com>",

password: "12345678",

age: "20"

}

Khoan!

Có một chi tiết thú vị:

age: "20"

tại sao không phải:

age: 20

?

# **18\. HTML input thường cho bạn string**

Đây là kiến thức HTML/DOM, không phải riêng RHF.

Ví dụ:

&lt;input type="number" /&gt;

Nhìn UI là number input.

Nhưng value của HTML input thường vẫn được xử lý dưới dạng string.

Ví dụ:

user nhập:

20

input.value:

"20"

Do đó form data có thể là:

{

age: "20"

}

chứ không mặc định chắc chắn:

{

age: 20

}

Sau này RHF có option như:

register("age", {

valueAsNumber: true

})

để xử lý trường hợp này.

Zod cũng sẽ khiến chuyện **string → number** trở nên rất đáng quan tâm.

Chưa cần đào sâu hôm nay.

# **19\. register() còn nhận validation rules**

Hiện tại:

register("email")

Nhưng nó có thể nhận argument thứ hai:

register("email", {

required: true

})

Hoặc:

register("password", {

required: true,

minLength: 8

})

Mental:

register(

FIELD NAME,

OPTIONS

)

Ví dụ:

register("password", {

required: true,

minLength: 8

})

nghĩa:

Field:

password

Rules:

├── required

└── minLength = 8

Lesson 5 chúng ta mới đào sâu validation.

# **20\. Một điều rất hay: field name có thể biểu diễn nested data**

Sau này bạn có thể gặp:

register("user.name")

và:

register("user.email")

Dữ liệu có thể có cấu trúc:

{

user: {

name: "Tung",

email: "<tung@gmail.com>"

}

}

Hay:

register("address.city")

→

{

address: {

city: "Ho Chi Minh City"

}

}

Chưa cần dùng ngay.

Nhưng nó cho bạn thấy:

register name

không đơn giản chỉ là label để hiển thị.

Nó xác định **đường dẫn của dữ liệu form**.

# **21\. Có thể tự viết name nữa không?**

Ví dụ bạn có thể thắc mắc:

<input

name="email"

{...register("email")}

/>

Có cần không?

Thông thường **không cần**.

Vì:

register("email")

đã cung cấp:

name = "email"

Nên:

<input

{...register("email")}

/>

đã đủ cho phần đó.

# **22\. Có thể tự viết onChange nữa không?**

Đây là bẫy đáng biết.

Ví dụ:

<input

{...register("email")}

onChange={handleChange}

/>

Bạn cần cẩn thận vì register() đã cung cấp onChange.

JSX props được áp dụng theo thứ tự, nên việc ghi đè handler có thể làm mất handler mà RHF cần nếu bạn làm không đúng.

Mental model:

{...register("email")}

đã chứa:

onChange

onBlur

name

ref

Nếu cần custom behavior, phải tích hợp mà vẫn giữ cơ chế của RHF, thay vì vô tình thay thế nó.

Ở mức beginner:

**Đừng tự override onChange, onBlur, name, ref mà register() cung cấp nếu chưa có lý do rõ ràng.**

# **23\. Ví dụ nhìn bằng JavaScript thuần**

Để register bớt magic, tưởng tượng một function bình thường:

function getInputProps() {

return {

name: "email",

placeholder: "Enter email",

type: "email"

};

}

Ta có:

&lt;input {...getInputProps()} /&gt;

Function chạy:

getInputProps()

trả:

{

name: "email",

placeholder: "Enter email",

type: "email"

}

Spread vào JSX:

<input

name="email"

placeholder="Enter email"

type="email"

/>

RHF cũng cùng **ý tưởng JavaScript**:

&lt;input {...register("email")} /&gt;

chỉ khác object register() trả về chứa những thứ phục vụ RHF.

# **24\. Chạy tay form hoàn chỉnh**

Cho:

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

onSubmit={handleSubmit(onSubmit)}

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

lấy register

Rồi:

register("email")

↓

RHF đăng ký field email

↓

props cho input

↓

spread vào &lt;input&gt;

Tương tự:

register("password")

↓

RHF đăng ký field password

↓

props cho input

↓

spread vào &lt;input&gt;

# **25\. User gõ email**

User:

<tung@gmail.com>

Flow đơn giản hóa:

User gõ

↓

DOM input

↓

onChange được register cung cấp

↓

RHF nhận biết/thực hiện logic

cho field "email"

Trong khi DOM input vẫn giữ giá trị native của nó.

Không cần:

const \[email, setEmail\] =

useState("");

# **26\. User gõ password**

12345678

Flow:

User gõ

↓

password input

↓

RHF handler

↓

field password được quản lý

Form lúc này về mặt dữ liệu:

email

→ "<tung@gmail.com>"

password

→ "12345678"

# **27\. User Submit**

Click Login

↓

&lt;form&gt; submit

↓

handleSubmit(onSubmit)

↓

RHF xử lý form

↓

onSubmit(data)

data:

{

email: "<tung@gmail.com>",

password: "12345678"

}

Điểm kết nối:

register("email")

│

└──────────→ data.email

register("password")

│

└──────────→ data.password

# **28\. Controlled vs RHF nhìn cạnh nhau**

## **Controlled**

const \[email, setEmail\] =

useState("");

<input

value={email}

onChange={(e) =>

setEmail(e.target.value)

}

/>

Bạn tự quản lý:

state

value

onChange

setState

## **RHF**

<input

{...register("email")}

/>

RHF cung cấp registration props:

name

onChange

onBlur

ref

và quản lý field trong form system.

Đây chính là lý do:

&lt;input {...register("email")} /&gt;

ngắn như vậy.

Không phải vì browser tự nhiên biết RHF.

Mà vì **rất nhiều wiring đã nằm trong object mà register() trả về.**

# **29\. Câu hỏi phỏng vấn: register() làm gì?**

Bạn có thể trả lời:

register connects an input field to React Hook Form. It returns props such as name, onChange, onBlur, and ref, which are spread onto the input so React Hook Form can track and manage that field.

Nếu nói tiếng Việt:

register() đăng ký một input với React Hook Form. Nó trả về các props như name, onChange, onBlur và ref để kết nối input với hệ thống quản lý form của RHF.

Điểm quan trọng không phải học thuộc tiếng Anh.

Mà là hiểu:

register

↓

connect field ↔ RHF

# **30\. Một câu phỏng vấn hay hơn: tại sao có ...?**

Nếu họ chỉ:

&lt;input {...register("email")} /&gt;

và hỏi:

Dấu ... để làm gì?

Đừng trả lời:

Syntax của React Hook Form.

❌

Phải hiểu:

register("email")

↓

returns object

↓

{

name,

onChange,

onBlur,

ref

}

↓

spread syntax

↓

các property trở thành props của input

Đây là JavaScript/JSX.

# **31\. Những gì cần nhớ sau Lesson 3**

### **Một — register() đăng ký field với RHF**

register("email")

Mental:

email field

↕

React Hook Form

### **Hai — string là field name**

register("email")

→

data.email

register("password")

→

data.password

### **Ba — register() trả về props**

Mental model:

register("email")

↓

{

name: "email",

onChange: ...,

onBlur: ...,

ref: ...

}

### **Bốn — ... là spread syntax**

&lt;input {...register("email")} /&gt;

có thể hình dung:

<input

name="email"

onChange={...}

onBlur={...}

ref={...}

/>

### **Năm — vai trò bốn thứ chính**

name

↓

field này là ai?

onChange

↓

field thay đổi

onBlur

↓

field mất focus

ref

↓

kết nối/reference tới DOM field

### **Sáu — RHF không bắt bạn tạo state cho từng native input**

Thay vì:

const \[email, setEmail\] =

useState("");

<input

value={email}

onChange={...}

/>

ta có thể:

<input

{...register("email")}

/>

# **32\. Câu nhớ của Lesson 3**

register("email")

↓

Đăng ký field "email"

với React Hook Form

↓

Trả về

│

├── name

├── onChange

├── onBlur

└── ref

│

▼

spread vào &lt;input&gt;

↓

&lt;input {...register("email")} /&gt;

↓

Input được kết nối với RHF

↓

Submit

↓

data.email

**register() chính là cây cầu nối giữa một input DOM và hệ thống quản lý form của React Hook Form.**

Và đến đây có một câu hỏi rất tự nhiên: **RHF đã biết các field rồi, vậy khi bấm Submit thì handleSubmit(onSubmit) thực sự chạy như thế nào, tại sao onSubmit tự nhiên nhận được data, và preventDefault() biến đâu mất?**

Đó chính xác là **Lesson 4: handleSubmit() — Submit Form**.