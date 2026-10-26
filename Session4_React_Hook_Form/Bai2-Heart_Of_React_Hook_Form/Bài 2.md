# **LESSON 2: useForm() — TRÁI TIM CỦA REACT HOOK FORM**

Lesson 1 chúng ta đã có vấn đề:

Form càng lớn

↓

values

validation

errors

dirty

touched

submit

reset

...

↓

Tự quản lý bắt đầu rườm rà

Bây giờ React Hook Form xuất hiện.

Và thứ đầu tiên bạn gần như chắc chắn gặp là:

const {

register,

handleSubmit,

formState

} = useForm();

Bài này mục tiêu là hiểu **useForm() thực sự làm gì**, chưa đào sâu register().

# **1\. Cài React Hook Form**

Trong Vite project:

npm install react-hook-form

Sau đó import:

import { useForm } from "react-hook-form";

Rồi trong component:

function RegisterForm() {

const form = useForm();

return (

// ...

);

}

Điểm đầu tiên:

useForm

↓

là một React Hook

↓

được React Hook Form cung cấp

Nó không phải hook built-in của React như:

useState()

useEffect()

useRef()

# **2\. useForm() dùng để làm gì?**

Mental model đầu tiên:

**useForm() tạo ra một hệ thống quản lý form cho component của bạn.**

Ví dụ:

const form = useForm();

Có thể tưởng tượng form chứa một đống công cụ:

form

│

├── register

├── handleSubmit

├── formState

├── watch

├── reset

├── setValue

├── getValues

├── control

└── ...

Chúng ta chưa cần học tất cả.

Hiện tại chỉ quan tâm:

useForm()

│

├── register

│

├── handleSubmit

│

└── formState

# **3\. Đầu tiên cứ viết nguyên object để nhìn**

Thay vì destructuring ngay:

const {

register,

handleSubmit,

formState

} = useForm();

hãy tưởng tượng:

const form = useForm();

Sau đó:

form.register

form.handleSubmit

form.formState

form.reset

form.watch

Giống object JavaScript bình thường:

const user = {

name: "Tung",

age: 20

};

ta có:

user.name

user.age

Tương tự:

const form = useForm();

thì:

form.register

form.handleSubmit

# **4\. Destructuring chỉ là JavaScript**

Người ta thường viết:

const {

register,

handleSubmit,

formState

} = useForm();

Đừng nghĩ đây là syntax đặc biệt của React Hook Form.

Nó chỉ là object destructuring.

Tương đương ý tưởng:

const form = useForm();

const register =

form.register;

const handleSubmit =

form.handleSubmit;

const formState =

form.formState;

Cho nên đọc:

const {

register,

handleSubmit

} = useForm();

thành:

Gọi useForm(), lấy hai công cụ register và handleSubmit mà nó cung cấp.

# **5\. Ba nhân vật chính hôm nay**

Giả sử:

const {

register,

handleSubmit,

formState

} = useForm();

Mental model:

useForm()

│

├── register

│ ↓

│ đăng ký input

│

├── handleSubmit

│ ↓

│ xử lý quá trình submit

│

└── formState

↓

trạng thái của form

Tạm thời nhớ như vậy.

# **6\. register — "input này thuộc form của tôi"**

Ví dụ:

<input

{...register("email")}

/>

Chưa cần hiểu dấu ... hôm nay.

Chỉ cần đọc:

React Hook Form ơi, hãy đăng ký input này với tên email.

Mental model:

&lt;input&gt;

│

│ register("email")

▼

React Hook Form

│

└── biết:

form có field "email"

Nếu:

<input

{...register("password")}

/>

thì RHF biết thêm:

Form

│

├── email

└── password

# **7\. Tên trong register() cực kỳ quan trọng**

Ví dụ:

register("email")

"email" chính là **field name**.

Tiếp:

register("password")

→ field password.

Sau này user nhập:

email:

<tung@gmail.com>

password:

12345678

RHF có thể tạo dữ liệu form kiểu:

{

email: "<tung@gmail.com>",

password: "12345678"

}

Bạn thấy mối liên hệ chưa?

register("email")

│

└──────────────┐

▼

data.email

register("password")

│

└──────────────┐

▼

data.password

Đây là thứ rất đáng nhớ.

# **8\. Ví dụ form đầu tiên**

import { useForm } from "react-hook-form";

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

Nhìn lần đầu sẽ có hai thứ hơi "ma thuật":

{...register("email")}

và:

handleSubmit(onSubmit)

Đừng lo.

Lesson 3 sẽ **mổ register()**.

Lesson 4 sẽ **mổ handleSubmit()**.

Hôm nay ta nhìn toàn bộ flow trước.

# **9\. Form này không có useState cho từng input**

Bạn có để ý không?

Không có:

const \[email, setEmail\] =

useState("");

const \[password, setPassword\] =

useState("");

Cũng không viết:

value={email}

onChange={(e) =>

setEmail(e.target.value)

}

Thay vào đó:

<input

{...register("email")}

/>

và:

<input

{...register("password")}

/>

RHF đảm nhiệm phần form management cho chúng ta.

# **10\. Chạy tay form này**

Code:

const {

register,

handleSubmit

} = useForm();

### **Bước 1 — Component render**

useForm() thiết lập hệ thống quản lý form.

LoginForm render

↓

useForm()

↓

RHF form management

### **Bước 2 — Inputs được đăng ký**

React gặp:

register("email")

và:

register("password")

Mental model:

RHF Form

│

├── email

└── password

### **Bước 3 — User nhập**

email:

<tung@gmail.com>

password:

12345678

RHF có cơ chế theo dõi các field đã đăng ký.

Ta chưa cần tự viết:

setEmail(...)

setPassword(...)

### **Bước 4 — User click Login**

Button:

&lt;button type="submit"&gt;

nằm trong:

&lt;form&gt;

→ form submit.

### **Bước 5 — handleSubmit**

Ta đã viết:

<form

onSubmit={

handleSubmit(onSubmit)

}

\>

RHF xử lý form submission.

Nếu form hợp lệ, nó gọi:

onSubmit(data);

### **Bước 6 — data**

Lúc đó:

function onSubmit(data) {

console.log(data);

}

data có thể là:

{

email: "<tung@gmail.com>",

password: "12345678"

}

Flow toàn bộ:

useForm()

↓

register("email")

register("password")

↓

User nhập dữ liệu

↓

Submit

↓

handleSubmit(...)

↓

RHF lấy + validate form data

↓

onSubmit(data)

↓

{

email: "...",

password: "..."

}

# **11\. Ai tạo data?**

Câu này rất quan trọng.

Bạn không viết:

const data = {

email,

password

};

Nhưng:

function onSubmit(data) {

lại có data.

Ai đưa vào?

**React Hook Form.**

Thông qua các field đã đăng ký:

register("email")

register("password")

RHF biết form có những field nào và có thể cung cấp values cho callback submit.

Mental:

register("email")

-

register("password")

↓

RHF quản lý các field

↓

handleSubmit

↓

collect / validate

↓

data

↓

onSubmit(data)

# **12\. Liên hệ với React form thuần**

Trước đây:

const \[email, setEmail\] =

useState("");

const \[password, setPassword\] =

useState("");

function handleSubmit(e) {

e.preventDefault();

const data = {

email,

password

};

console.log(data);

}

Bạn tự:

quản lý values

↓

tạo data

↓

submit

RHF:

const {

register,

handleSubmit

} = useForm();

function onSubmit(data) {

console.log(data);

}

register fields

↓

RHF quản lý form

↓

handleSubmit

↓

data được đưa vào callback

# **13\. handleSubmit KHÔNG phải onSubmit**

Hai cái này cực dễ lẫn.

Ta có:

function onSubmit(data) {

console.log(data);

}

Đây là **function của bạn**.

Còn:

handleSubmit

là function **React Hook Form cung cấp**.

Vậy:

handleSubmit(onSubmit)

đang kết hợp:

RHF

handleSubmit

│

│ sau khi xử lý form

▼

YOUR CODE

onSubmit(data)

Đừng nhập hai thằng thành một.

# **14\. Đọc dòng này bằng tiếng Việt**

<form

onSubmit={

handleSubmit(onSubmit)

}

\>

Có thể đọc:

"Khi form submit, hãy để React Hook Form xử lý việc submit/validation trước; nếu phù hợp thì gọi onSubmit của tôi với dữ liệu form."

Mental:

FORM SUBMIT

↓

RHF handleSubmit

↓

validation

/ \\

invalid valid

↓ ↓

errors onSubmit(data)

Chúng ta sẽ học chính xác hơn ở Lesson 4.

# **15\. Vậy formState là gì?**

Bây giờ nhân vật thứ ba:

const {

register,

handleSubmit,

formState

} = useForm();

formState chứa thông tin về **trạng thái của form**.

Ví dụ về mặt ý tưởng:

formState

│

├── errors

├── isDirty

├── dirtyFields

├── touchedFields

├── isValid

├── isSubmitting

└── ...

Nó không phải dữ liệu như:

{

email: "<tung@gmail.com>"

}

Mà là **metadata/trạng thái về form**.

# **16\. Phân biệt Form Data và Form State**

Rất đáng nhớ.

### **Form Data**

{

email: "<tung@gmail.com>",

password: "12345678"

}

Trả lời:

User nhập gì?

### **Form State**

Có lỗi không?

Field nào đã sửa?

Field nào đã chạm?

Form có valid không?

Đang submit không?

Trả lời:

Form hiện đang ở trạng thái nào?

Mental:

FORM

│

├── DATA

│ ├── email

│ └── password

│

└── STATE / METADATA

├── errors

├── isDirty

├── isValid

└── isSubmitting

# **17\. Ví dụ formState.errors**

Ta có thể destructure sâu hơn:

const {

register,

handleSubmit,

formState: {

errors

}

} = useForm();

Đừng hoảng syntax :)).

Tương đương ý tưởng:

const form = useForm();

const formState =

form.formState;

const errors =

formState.errors;

Sau này:

errors.email

có thể cho biết field email đang có lỗi validation.

# **18\. useForm() còn nhiều thứ nữa**

Nếu console conceptually:

const form = useForm();

thì API còn có những công cụ như:

register

handleSubmit

watch

getValues

setValue

reset

control

setError

clearErrors

trigger

formState

...

Nhìn nhiều thật.

Nhưng **không học một lần**.

Roadmap của chúng ta đang cố tình chia:

Lesson 2

useForm tổng thể

↓

Lesson 3

register

↓

Lesson 4

handleSubmit

↓

Lesson 5

validation

↓

Lesson 6

formState/errors

↓

...

Hôm nay chỉ cần biết useForm() là **điểm bắt đầu** để lấy các công cụ quản lý form.

# **19\. Một hiểu lầm cần tránh: useForm() không tạo HTML &lt;form&gt;**

Code:

const form = useForm();

không có nghĩa React Hook Form tự render:

&lt;form&gt;&lt;/form&gt;

Không.

Bạn vẫn viết:

return (

&lt;form&gt;

...

&lt;/form&gt;

);

Phân biệt:

&lt;form&gt;

\= HTML element

useForm()

\= Hook cung cấp form-management logic

Tên hơi giống nhau nên dễ nhập làm một.

# **20\. useForm() không gửi API cho bạn**

Một hiểu lầm khác:

useForm()

↓

Spring Boot

❌ Không.

RHF quản lý form.

Sau khi có:

onSubmit(data)

thì **bạn** quyết định làm gì:

async function onSubmit(data) {

await fetch(

"<http://localhost:8080/api/register>",

{

method: "POST",

headers: {

"Content-Type":

"application/json"

},

body: JSON.stringify(data)

}

);

}

Flow:

React Hook Form

↓

collect + validate data

↓

onSubmit(data)

↓

│

│ từ đây là code của bạn

▼

fetch / Axios

↓

HTTP

↓

Spring Boot

RHF không phải HTTP library.

# **21\. React Hook Form cũng không thay Zod**

Tách trách nhiệm tiếp:

React Hook Form

│

└── quản lý FORM

Zod

│

└── schema validation

Fetch / Axios

│

└── HTTP

Spring Boot

│

└── Backend

Sau này chúng ta ghép:

&lt;input&gt;

↓

React Hook Form

↓

Zod validation

↓

onSubmit(data)

↓

fetch

↓

Spring Boot

Mỗi thằng có trách nhiệm riêng.

# **22\. useForm() có thể nhận config**

Hiện tại:

useForm();

Nhưng sau này bạn sẽ gặp:

useForm({

defaultValues: {

email: "",

password: ""

}

});

hoặc khi ghép Zod:

useForm({

resolver: zodResolver(schema)

});

Mental model:

useForm({

configuration

})

↓

form management system

Tương tự gọi một function với options.

Chưa học resolver bây giờ.

# **23\. Ví dụ defaultValues để hiểu ý tưởng**

Ví dụ form Edit Profile.

User hiện tại:

{

name: "Tung",

email: "<tung@gmail.com>"

}

Ta có thể cấu hình:

const {

register,

handleSubmit

} = useForm({

defaultValues: {

name: "Tung",

email: "<tung@gmail.com>"

}

});

Ý tưởng:

useForm

│

├── field name

│ default = "Tung"

│

└── field email

default = "<tung@gmail.com>"

Sau này Lesson 7 học kỹ.

# **24\. Có cần useState nữa không?**

Một câu rất dễ hiểu sai:

Dùng React Hook Form rồi thì không bao giờ cần useState?

**Không.**

Ví dụ:

const \[showPassword, setShowPassword\] =

useState(false);

đây là UI state.

Bạn hoàn toàn có thể dùng:

React Hook Form

-

useState

trong cùng component.

Ví dụ:

RHF

├── email value

├── password value

└── validation

useState

└── showPassword true/false

Chọn công cụ theo dữ liệu cần quản lý.

# **25\. useForm() và React Hook rules**

Vì đây là Hook:

useForm()

nên bạn dùng theo Hook rules.

Ví dụ bình thường:

function RegisterForm() {

const form = useForm();

// ...

}

Không làm:

if (something) {

const form = useForm(); // ❌

}

Cũng giống:

useState

useEffect

useRef

Bạn đã biết nguyên tắc hook phải được gọi ổn định ở top level của component/custom hook.

# **26\. Chạy tay toàn bộ một lần nữa**

Cho code:

import { useForm } from "react-hook-form";

function RegisterForm() {

const {

register,

handleSubmit,

formState

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

{...register("username")}

/>

<input

{...register("email")}

/>

&lt;button type="submit"&gt;

Register

&lt;/button&gt;

&lt;/form&gt;

);

}

### **Render**

RegisterForm()

↓

useForm()

↓

form management được thiết lập

### **Register fields**

register("username")

register("email")

↓

RHF biết form có:

username

email

### **User nhập**

username = "tung"

email = "<tung@gmail.com>"

### **User Submit**

&lt;button type="submit"&gt;

↓

HTML form submit

↓

onSubmit event

↓

handleSubmit(onSubmit)

↓

RHF xử lý form

↓

data

↓

{

username: "tung",

email: "<tung@gmail.com>"

}

↓

onSubmit(data)

# **27\. Ba tầng đừng trộn với nhau**

Nhìn đoạn:

<form

onSubmit={handleSubmit(onSubmit)}

\>

có tới ba thứ:

① HTML / React event

onSubmit={...}

↓

② React Hook Form

handleSubmit(...)

↓

③ Function của bạn

onSubmit(data)

Mental model:

User clicks Submit

↓

&lt;form&gt; submit event

↓

RHF handleSubmit

↓

collect + validate

↓

your onSubmit(data)

Nếu bạn hiểu được sơ đồ này thì Lesson 4 sau này cực dễ.

# **28\. useForm() không phải nơi chứa tất cả input theo kiểu object state đơn giản**

Tạm thời chúng ta nói:

useForm()

→ quản lý form

nhưng đừng hình dung quá máy móc rằng bên trong nó chỉ đơn giản là:

const \[form, setForm\] = useState({

...

});

Không nên suy luận internals như vậy.

RHF có hệ thống registration, refs/subscriptions/form state riêng.

Ở mức hiện tại chỉ cần abstraction:

useForm()

↓

tạo/thiết lập form management

↓

trả về API để component sử dụng

Là đủ chính xác.

# **29\. So sánh với thứ bạn đã học**

Có thể liên hệ về **cách sử dụng Hook**, không phải nói chúng giống chức năng nhau:

const \[state, setState\] =

useState(initialValue);

Hook trả về những thứ bạn cần để quản lý state.

Tương tự:

const {

register,

handleSubmit,

formState

} = useForm();

Hook trả về những API bạn cần để quản lý form.

Mental:

useState()

↓

state-related API

useForm()

↓

form-related API

Chỉ là analogy để dễ đọc code.

# **30\. Nếu interviewer hỏi "useForm là gì?"**

Bạn có thể trả lời:

useForm is the main hook provided by React Hook Form. It initializes form management and provides APIs such as register, handleSubmit, formState, reset, and watch for registering fields, handling submission, validation, and tracking form state.

Không cần học thuộc từng chữ.

Ý chính:

useForm

↓

main hook

↓

form management

↓

returns form APIs

# **31\. Những gì cần nhớ sau Lesson 2**

### **Một**

const form = useForm();

useForm() là Hook chính của React Hook Form.

### **Hai**

Nó cung cấp các API quản lý form:

useForm()

│

├── register

├── handleSubmit

├── formState

├── reset

├── watch

└── ...

### **Ba**

const {

register,

handleSubmit

} = useForm();

chỉ là JavaScript destructuring.

### **Bốn**

Mental model ban đầu:

register

\= đăng ký field

handleSubmit

\= xử lý quá trình submit

formState

\= thông tin trạng thái của form

### **Năm**

Tên field:

register("email")

sẽ liên quan trực tiếp đến:

data.email

Ví dụ:

register("email")

register("password")

→ submit:

{

email: "...",

password: "..."

}

### **Sáu**

Đừng trộn trách nhiệm:

useForm()

↓

FORM MANAGEMENT

Zod

↓

SCHEMA VALIDATION

fetch / Axios

↓

HTTP REQUEST

Spring Boot

↓

BACKEND

# **32\. Câu nhớ của Lesson 2**

useForm()

↓

thiết lập hệ thống quản lý form

↓

trả về các công cụ

│

├── register

├── handleSubmit

├── formState

├── reset

├── watch

└── ...

Và câu quan trọng nhất:

**useForm() là điểm bắt đầu của React Hook Form. Nó không tạo &lt;form&gt; và không gửi API; nó cung cấp hệ thống và các API để component quản lý form.**

Lesson 2 đến đây là đủ. **Lesson 3 sẽ mổ sâu register()**, đặc biệt là dòng nhìn rất "ảo":

&lt;input {...register("email")} /&gt;

Chúng ta sẽ bung nó ra để xem register("email") trả về cái gì và tại sao lại có dấu ....