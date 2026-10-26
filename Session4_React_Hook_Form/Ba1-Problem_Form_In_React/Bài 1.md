# **LESSON 1: VẤN ĐỀ CỦA FORM TRONG REACT**

Bài này **chưa vội dùng React Hook Form**.

Tôi muốn bạn thấy rõ:

HTML Form

↓

React quản lý Form như thế nào?

↓

Controlled Component

↓

Form càng lớn → code càng nhiều

↓

React Hook Form sinh ra để giải quyết gì?

Nếu hiểu đoạn này thì sang useForm() và register() bạn sẽ thấy chúng rất hợp lý.

# **1\. Form HTML bình thường hoạt động thế nào?**

Tạm quên React.

HTML thuần:

&lt;form&gt;

&lt;input name="username" /&gt;

&lt;input name="email" /&gt;

&lt;button type="submit"&gt;Submit&lt;/button&gt;

&lt;/form&gt;

Browser tự quản lý giá trị bên trong &lt;input&gt;.

Ví dụ user nhập:

username: tung

email: <tung@gmail.com>

Bản thân DOM input đang giữ những giá trị đó.

Có thể hình dung:

&lt;input name="username"&gt;

│

└── value = "tung"

&lt;input name="email"&gt;

│

└── value = "<tung@gmail.com>"

Tức là browser/DOM hoàn toàn có khả năng quản lý input mà **không cần React state**.

Đây là ý rất quan trọng để lát nữa hiểu React Hook Form.

# **2\. Khi user gõ vào input thì chuyện gì xảy ra?**

Ví dụ:

&lt;input name="username" /&gt;

Ban đầu:

input.value = ""

User gõ:

T

DOM:

input.value = "T"

Gõ tiếp:

u

DOM:

input.value = "Tu"

Gõ tiếp:

n

input.value = "Tun"

rồi:

input.value = "Tung"

Browser tự làm chuyện này.

Không cần:

setUsername(...)

vì chúng ta chưa dùng React state để kiểm soát input.

# **3\. Vậy Form trong React thì sao?**

Trong React, bạn hoàn toàn có thể viết:

function RegisterForm() {

return (

&lt;form&gt;

&lt;input name="username" /&gt;

&lt;button type="submit"&gt;

Register

&lt;/button&gt;

&lt;/form&gt;

);

}

Input vẫn gõ được bình thường.

Điều này cực kỳ quan trọng:

**Input trong React không bắt buộc phải có useState.**

React render:

&lt;input name="username" /&gt;

ra DOM:

HTMLInputElement

và browser vẫn có khả năng quản lý value của nó.

# **4\. Nhưng chúng ta thường muốn React biết giá trị input**

Ví dụ bạn muốn:

User đang nhập username gì?

Một cách rất phổ biến mà bạn đã gặp là:

function RegisterForm() {

const \[username, setUsername\] =

useState("");

return (

<input

value={username}

onChange={(e) =>

setUsername(e.target.value)

}

/>

);

}

Bây giờ xuất hiện ba thứ:

state

value

onChange

Chúng liên quan cực kỳ chặt với nhau.

# **5\. value={username} có nghĩa gì?**

Code:

const \[username, setUsername\] =

useState("");

và:

&lt;input value={username} /&gt;

Ta đang nói với React:

Giá trị hiển thị của input này được điều khiển bởi username state.

Mental model:

React State

username = "Tung"

│

▼

value={username}

│

▼

&lt;input&gt;

│

▼

Tung

State quyết định input hiển thị gì.

# **6\. Nhưng nếu chỉ có value thì có vấn đề**

Ví dụ:

const \[username, setUsername\] =

useState("");

return (

&lt;input value={username} /&gt;

);

username ban đầu:

""

Input hiển thị:

""

User muốn gõ:

T

Nhưng React đang nói:

value của input = username

mà:

username = ""

Bạn chưa có logic cập nhật state.

Vì vậy chúng ta cần:

onChange

# **7\. onChange làm nhiệm vụ gì?**

Code đầy đủ:

const \[username, setUsername\] =

useState("");

<input

value={username}

onChange={(e) =>

setUsername(e.target.value)

}

/>

Bây giờ chạy tay thật chậm.

Ban đầu:

username = ""

React render:

value=""

UI:

\[ \]

User gõ:

T

Input phát sinh change event:

onChange

↓

e

Trong:

e.target

chính là input gây ra event.

Và:

e.target.value

lúc đó là:

"T"

nên:

setUsername("T");

# **8\. Sau setUsername("T") chuyện gì xảy ra?**

Bạn đã học phần này rồi:

setUsername("T")

↓

React schedule state update

↓

Component render lại

↓

username = "T"

↓

&lt;input value={username}&gt;

↓

&lt;input value="T"&gt;

User gõ tiếp u:

e.target.value = "Tu"

↓

setUsername("Tu")

↓

render

↓

username = "Tu"

↓

value="Tu"

Tiếp tục:

User gõ "Tung"

↓

onChange

↓

e.target.value

\= "Tung"

↓

setUsername("Tung")

↓

React render lại

↓

username = "Tung"

↓

value={username}

↓

Input hiển thị "Tung"

# **9\. Đây gọi là Controlled Component**

Input:

<input

value={username}

onChange={(e) =>

setUsername(e.target.value)

}

/>

được gọi là **controlled input/component** trong ngữ cảnh form.

Tại sao gọi là controlled?

Vì React state đang làm nguồn dữ liệu điều khiển value.

STATE

username

│

│ value

▼

INPUT

│

│ onChange

▼

setUsername()

│

└──────────────→ STATE

Hay vòng tròn:

State

↓

value

↓

Input

↓

User types

↓

onChange

↓

setState

↓

State

↓

Render

### **Câu nhớ**

**Controlled input = giá trị input được điều khiển bởi React state.**

# **10\. Tại sao Controlled Component lại hữu ích?**

Vì React luôn có giá trị hiện tại.

Ví dụ:

const \[username, setUsername\] =

useState("");

Muốn kiểm tra:

if (username.length < 3) {

// error

}

Muốn hiển thị:

&lt;p&gt;Hello {username}&lt;/p&gt;

Muốn disable:

&lt;button disabled={!username}&gt;

Register

&lt;/button&gt;

Muốn thay đổi từ code:

setUsername("");

→ input cũng reset.

Vì:

React State

↓

Input

React đang kiểm soát value.

# **11\. Một input thì quá đơn giản**

Ví dụ Login:

Email

Password

Ta có:

const \[email, setEmail\] =

useState("");

const \[password, setPassword\] =

useState("");

JSX:

<input

value={email}

onChange={(e) =>

setEmail(e.target.value)

}

/>

<input

type="password"

value={password}

onChange={(e) =>

setPassword(e.target.value)

}

/>

Vẫn ổn.

Không có vấn đề gì lớn.

# **12\. Nhưng thử Register Form thật hơn**

Giả sử:

Username

First Name

Last Name

Email

Phone

Password

Confirm Password

Age

Address

Nếu quản lý controlled hoàn toàn bằng từng state:

const \[username, setUsername\] =

useState("");

const \[firstName, setFirstName\] =

useState("");

const \[lastName, setLastName\] =

useState("");

const \[email, setEmail\] =

useState("");

const \[phone, setPhone\] =

useState("");

const \[password, setPassword\] =

useState("");

const \[confirmPassword, setConfirmPassword\] =

useState("");

const \[age, setAge\] =

useState("");

const \[address, setAddress\] =

useState("");

😐

Rồi JSX:

<input

value={username}

onChange={(e) =>

setUsername(e.target.value)

}

/>

<input

value={firstName}

onChange={(e) =>

setFirstName(e.target.value)

}

/>

<input

value={lastName}

onChange={(e) =>

setLastName(e.target.value)

}

/>

...

Bắt đầu thấy vấn đề.

# **13\. Chưa hết — còn validation**

Email phải:

required

đúng format email

Password:

required

\>= 8 ký tự

Age:

\>= 18

Confirm password:

phải giống password

Bây giờ có thể lại xuất hiện:

const \[emailError, setEmailError\] =

useState("");

const \[passwordError, setPasswordError\] =

useState("");

const \[ageError, setAgeError\] =

useState("");

const \[confirmPasswordError,

setConfirmPasswordError\] =

useState("");

Rồi:

value state

error state

validation

onChange

onBlur

submit

loading

reset

...

Form bắt đầu phình ra.

# **14\. Submit cũng cần xử lý**

Ví dụ:

function handleSubmit(e) {

e.preventDefault();

if (!email) {

setEmailError(

"Email is required"

);

return;

}

if (password.length < 8) {

setPasswordError(

"Password must be at least 8 characters"

);

return;

}

// ...

registerUser({

username,

email,

password

});

}

Form càng phức tạp:

Inputs tăng

↓

State tăng

↓

Event handling tăng

↓

Validation tăng

↓

Errors tăng

↓

Form logic tăng

Đây mới là vấn đề React Hook Form muốn giúp giải quyết.

# **15\. Có thể gom tất cả vào một object state không?**

Có.

Thay vì:

const \[username, setUsername\] =

useState("");

const \[email, setEmail\] =

useState("");

const \[password, setPassword\] =

useState("");

có thể:

const \[form, setForm\] = useState({

username: "",

email: "",

password: ""

});

Rồi:

function handleChange(e) {

const { name, value } = e.target;

setForm(prev => ({

...prev,

\[name\]: value

}));

}

Input:

<input

name="username"

value={form.username}

onChange={handleChange}

/>

<input

name="email"

value={form.email}

onChange={handleChange}

/>

Tốt hơn.

Nhưng chúng ta vẫn phải tự quản lý:

values

validation

errors

touched

dirty

submit

reset

...

Tức là:

React Hook Form không tồn tại chỉ vì useState không làm được form.

useState **làm được**.

RHF tồn tại vì form phức tạp có rất nhiều thứ phải quản lý và thư viện giúp tổ chức chúng thuận tiện hơn.

# **16\. Một vấn đề nữa: mỗi lần gõ với controlled input**

Bạn vừa chạy tay:

User gõ "T"

↓

onChange

↓

setUsername("T")

↓

render

Tiếp:

gõ "u"

↓

setUsername("Tu")

↓

render

Tiếp:

gõ "n"

↓

setUsername("Tun")

↓

render

Nghĩa là controlled input thường đi theo:

keystroke

↓

onChange

↓

setState

↓

render

Điều này **không có nghĩa controlled form là xấu hoặc React không chịu nổi việc render khi gõ**.

Đừng hiểu cực đoan kiểu:

useState form chậm, RHF nhanh.

Không đơn giản như vậy.

Nhưng React Hook Form được thiết kế để giảm việc bạn phải dùng React state làm trung tâm cho từng thay đổi của từng input, và cung cấp cơ chế subscription/form management hiệu quả hơn.

# **17\. Đây là lúc quay lại HTML input ban đầu**

Nhớ đầu bài không?

HTML:

&lt;input name="username" /&gt;

Browser vốn đã có khả năng giữ:

input.value

React Hook Form tận dụng rất nhiều cách tiếp cận này.

Thay vì bắt bạn luôn làm:

Input

↓

onChange

↓

setState

↓

React State

↓

value

↓

Input

RHF có thể đăng ký input và theo dõi/quản lý form mà không bắt bạn viết useState cho từng field theo cách controlled truyền thống.

Đây là lý do khái niệm **uncontrolled input** sẽ xuất hiện.

# **18\. Controlled vs Uncontrolled**

Đây là kiến thức quan trọng nhất của Lesson 1.

### **Controlled**

const \[name, setName\] =

useState("");

<input

value={name}

onChange={(e) =>

setName(e.target.value)

}

/>

Nguồn value chủ yếu nằm ở:

React State

Flow:

React State

↓

value

↓

Input

↓

onChange

↓

setState

↓

React State

### **Uncontrolled**

Ví dụ đơn giản:

&lt;input name="name" /&gt;

DOM input tự giữ giá trị hiện tại.

DOM Input

│

└── current value

Nếu cần truy cập trực tiếp DOM trong React, bạn đã học:

const inputRef = useRef(null);

&lt;input ref={inputRef} /&gt;

sau đó:

inputRef.current.value

RHF tận dụng hướng tiếp cận gần với uncontrolled/native inputs rất tốt, dù thư viện còn làm nhiều việc hơn chuyện "dùng ref".

# **19\. Đừng hiểu sai rằng RHF = useRef**

Không phải:

React Hook Form

\=

useRef wrapper

❌

RHF là cả hệ thống quản lý form:

React Hook Form

│

├── register fields

├── collect values

├── validation

├── errors

├── touched state

├── dirty state

├── submit

├── reset

├── watch

└── nhiều thứ khác

Việc tận dụng uncontrolled/native inputs là một phần trong cách nó hoạt động hiệu quả.

# **20\. Vậy React Hook Form là gì?**

Bây giờ mới định nghĩa.

**React Hook Form là thư viện giúp quản lý form trong React**, bao gồm những việc như:

register input

↓

theo dõi form values

↓

validation

↓

errors

↓

form state

↓

submit

↓

reset

Thay vì bạn tự xây toàn bộ hệ thống đó.

# **21\. So sánh ý tưởng**

### **React thuần**

Bạn tự làm:

Input

│

├── state

├── value

├── onChange

├── validation

├── error

├── touched

├── submit

└── reset

### **React Hook Form**

Input

│

▼

React Hook Form

│

├── values

├── validation

├── errors

├── dirty

├── touched

├── submit

└── reset

Không phải bạn không thể tự làm.

Mà là:

**Đây là bài toán phổ biến, nên không cần tự xây lại toàn bộ form-management infrastructure cho mỗi project.**

# **22\. Preview code RHF — CHƯA cần hiểu syntax**

React thuần:

const \[email, setEmail\] =

useState("");

const \[password, setPassword\] =

useState("");

return (

&lt;form&gt;

<input

value={email}

onChange={(e) =>

setEmail(e.target.value)

}

/>

<input

value={password}

onChange={(e) =>

setPassword(e.target.value)

}

/>

&lt;/form&gt;

);

RHF sau này sẽ trông kiểu:

const {

register,

handleSubmit

} = useForm();

return (

&lt;form onSubmit={handleSubmit(onSubmit)}&gt;

&lt;input {...register("email")} /&gt;

<input

{...register("password")}

/>

&lt;button type="submit"&gt;

Register

&lt;/button&gt;

&lt;/form&gt;

);

Bạn nhìn sẽ thấy biến mất:

email state

setEmail

password state

setPassword

value={...}

onChange={...}

Nhưng đừng nghĩ:

"RHF không quản lý value."

Có quản lý form.

Chỉ là **bạn không phải tự viết state + handler cho từng input theo cách trên**.

Lesson 2–3 chúng ta sẽ mổ chính xác useForm() và register() đang làm gì.

# **23\. Vậy Zod đang ở đâu?**

**Chưa liên quan trực tiếp trong bài này.**

Tạm tách:

React Hook Form

↓

FORM MANAGEMENT

Zod

↓

SCHEMA + VALIDATION

Sau này:

React Hook Form

-

Zod

↓

Form management

-

Schema validation

Đừng nhập hai khái niệm thành một ngay từ đầu.

Bạn hoàn toàn có thể dùng:

React Hook Form

mà không dùng Zod.

Và cũng có thể dùng:

Zod

mà không dùng React Hook Form.

# **24\. Ví dụ Register Form sau này**

Chúng ta hướng tới:

REGISTER FORM

│

┌──────────┴──────────┐

▼ ▼

React Hook Form Zod

│ │

manage form validate data

│ │

└──────────┬──────────┘

▼

Valid Data

│

▼

onSubmit

│

▼

fetch

│

▼

Spring Boot

Lúc đó tất cả kiến thức trước đây sẽ nối lại.

# **25\. Khi nào KHÔNG cần React Hook Form?**

Không phải thấy &lt;form&gt; là:

npm install react-hook-form

Ví dụ chỉ có:

Search: \[\_**\_**\_**\_**\]

và logic cực đơn giản thì:

const \[search, setSearch\] =

useState("");

hoàn toàn ổn.

Hoặc form hai field đơn giản cũng có thể chẳng cần library.

RHF bắt đầu rất có giá trị khi bạn có:

nhiều fields

validation

errors

touched/dirty state

submit state

reset/default values

reusable forms

complex forms

schema validation

# **26\. Liên hệ với kiến thức React bạn đã học**

Đây là lý do roadmap trước đây của chúng ta học:

State

↓

Events

↓

Refs

↓

Effects

rồi mới RHF.

Bây giờ bạn có thể hiểu RHF bằng kiến thức cũ.

Đặc biệt:

useState

→ hiểu controlled input

Events

→ hiểu onChange / onSubmit

Refs + DOM

→ hiểu uncontrolled input

You Might Not Need an Effect

→ biết form submit do user action

nên thường là Event Handler,

không phải Effect

Đống React theory vừa học **bắt đầu trả công rồi đấy** :)).

# **27\. Chạy tay toàn bộ Controlled Form**

Cho:

function LoginForm() {

const \[email, setEmail\] =

useState("");

function handleSubmit(e) {

e.preventDefault();

console.log(email);

}

return (

&lt;form onSubmit={handleSubmit}&gt;

<input

value={email}

onChange={(e) =>

setEmail(e.target.value)

}

/>

&lt;button type="submit"&gt;

Login

&lt;/button&gt;

&lt;/form&gt;

);

}

User gõ:

a

Flow:

Input change

↓

onChange

↓

e.target.value = "a"

↓

setEmail("a")

↓

render

↓

email = "a"

↓

input value = "a"

Gõ tiếp:

ab

onChange

↓

setEmail("ab")

↓

render

↓

email = "ab"

↓

input value = "ab"

Sau đó click:

Login

&lt;form&gt; submit event

↓

handleSubmit

↓

e.preventDefault()

↓

console.log(email)

↓

"ab"

Đây chính là hệ thống mà RHF sắp giúp chúng ta quản lý.

# **28\. Mental model cuối bài**

### **HTML/native input**

Browser DOM

↓

Input tự giữ value

### **Controlled React input**

React State

↓

value

↓

Input

↓

onChange

↓

setState

↓

React State

### **React Hook Form**

Mental model ban đầu:

INPUTS

│

▼

register(...)

│

▼

React Hook Form

Form Management

/ | \\

▼ ▼ ▼

values errors formState

\\ | /

└──────┼───────┘

▼

handleSubmit

↓

data

↓

API

# **29\. Những gì cần nhớ sau Lesson 1**

Không cần thuộc 29 mục. Chỉ cần chắc **6 ý**:

**1\. HTML input vốn có khả năng tự giữ value trong DOM.**

&lt;input /&gt;

không cần React state vẫn gõ được.

**2\. Controlled input dùng React state để điều khiển value.**

const \[name, setName\] =

useState("");

<input

value={name}

onChange={(e) =>

setName(e.target.value)

}

/>

**3\. Flow controlled:**

State

↓

value

↓

Input

↓

onChange

↓

setState

↓

render

**4\. Controlled form không sai.** Nhưng form lớn khiến chúng ta phải tự quản lý rất nhiều:

values

validation

errors

dirty

touched

submit

reset

...

**5\. React Hook Form giúp quản lý những vấn đề đó và tận dụng native/uncontrolled form behavior hiệu quả.**

**6\. RHF và Zod không phải cùng một thứ:**

React Hook Form

\= quản lý FORM

Zod

\= định nghĩa schema + validate DATA

## **Câu nhớ của Lesson 1**

**React Hook Form không xuất hiện vì React useState không làm được form. Nó xuất hiện vì khi form lớn lên, việc tự quản lý values, events, validation, errors và form state trở nên rườm rà.**

Và đây chính là cây cầu sang **Lesson 2: useForm() — trái tim của React Hook Form**.