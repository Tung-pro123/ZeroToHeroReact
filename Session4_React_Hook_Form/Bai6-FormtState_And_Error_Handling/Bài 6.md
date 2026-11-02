# **LESSON 6: formState VÀ ERROR HANDLING**

Đến Lesson 5, flow của chúng ta đã thành:

register()

↓

đăng ký field + validation rules

↓

User nhập

↓

handleSubmit()

↓

validation

/ \\

FAIL PASS

↓ ↓

errors onSubmit(data)

Nhưng chúng ta mới dùng:

formState: { errors }

Trong khi formState còn có:

formState

│

├── errors

├── isDirty

├── dirtyFields

├── touchedFields

├── isValid

└── isSubmitting

Hôm nay mục tiêu là hiểu:

**formState không phải dữ liệu user nhập. Nó là thông tin mô tả trạng thái hiện tại của form.**

# **1\. formState là gì?**

Ta có:

const {

register,

handleSubmit,

formState

} = useForm();

formState chứa các thông tin về **tình trạng của form**.

Ví dụ:

Form hiện có lỗi không?

↓

errors

User đã thay đổi dữ liệu chưa?

↓

isDirty

Field nào đã thay đổi?

↓

dirtyFields

Field nào đã được tương tác rồi rời khỏi?

↓

touchedFields

Form hiện có valid không?

↓

isValid

Form có đang submit không?

↓

isSubmitting

# **2\. Phân biệt Form Data và Form State**

Cực kỳ quan trọng.

Giả sử user nhập:

username = "tung"

email = "<tung@gmail.com>"

Đây là **Form Data**:

{

username: "tung",

email: "<tung@gmail.com>"

}

Nó trả lời:

User nhập cái gì?

Còn:

errors

isDirty

dirtyFields

touchedFields

isValid

isSubmitting

là **Form State**.

Nó trả lời:

Form hiện đang ở trạng thái nào?

Mental model:

FORM

│

├── DATA

│ │

│ ├── username = "tung"

│ └── email = "<tung@gmail.com>"

│

└── STATE / METADATA

│

├── errors

├── isDirty

├── dirtyFields

├── touchedFields

├── isValid

└── isSubmitting

# **3\. Lấy formState**

Cách 1:

const {

formState

} = useForm();

Sau đó:

formState.errors

formState.isDirty

formState.dirtyFields

formState.touchedFields

formState.isValid

formState.isSubmitting

Nhưng thường bạn sẽ thấy destructuring:

const {

register,

handleSubmit,

formState: {

errors,

isDirty,

dirtyFields,

touchedFields,

isValid,

isSubmitting

}

} = useForm();

Đừng nghĩ đây là syntax đặc biệt của RHF.

Chỉ là JavaScript destructuring.

# **4\. Bung destructuring ra**

Code:

const {

formState: {

errors,

isDirty

}

} = useForm();

Có thể hình dung:

const form = useForm();

const formState =

form.formState;

const errors =

formState.errors;

const isDirty =

formState.isDirty;

Vậy:

formState: { errors }

chỉ có nghĩa:

Lấy property errors nằm bên trong property formState.

# **5\. errors — field nào đang lỗi?**

Đây là thằng bạn đã gặp.

Ví dụ:

<input

{...register("email", {

required:

"Email is required"

})}

/>

Nếu email không hợp lệ theo rule:

validation

↓

FAIL

↓

errors.email

Mental model:

errors = {

email: {

type: "required",

message: "Email is required"

}

};

Cho nên UI:

{errors.email && (

&lt;p&gt;{errors.email.message}&lt;/p&gt;

)}

# **6\. Chạy tay errors.email**

Ban đầu:

email = ""

Nhưng giả sử validation chưa chạy.

Ta chưa nhất thiết có error hiển thị ngay.

User bấm Submit:

Submit

↓

handleSubmit

↓

validate email

↓

required

↓

FAIL

↓

errors.email

Bây giờ:

errors.email.message

là:

"Email is required"

React render:

Email:

\[ \]

Email is required

# **7\. User sửa lỗi thì sao?**

User nhập:

<tung@gmail.com>

Khi RHF validation chạy lại theo mode/re-validation behavior tương ứng và field không còn vi phạm rule:

email

↓

validation

↓

PASS

↓

lỗi email được clear

Mental:

BEFORE

errors

└── email

└── "Email is required"

AFTER

errors

└── không còn email error

UI:

{errors.email && (

&lt;p&gt;{errors.email.message}&lt;/p&gt;

)}

không còn render message.

# **8\. isDirty — Form đã bị thay đổi chưa?**

Tên này ban đầu hơi khó hiểu.

dirty ở đây không phải:

Form bị "bẩn" :))

Mà là:

**Giá trị hiện tại của form có khác giá trị mặc định ban đầu hay không?**

Ví dụ:

useForm({

defaultValues: {

username: ""

}

});

Ban đầu:

username = ""

default username = ""

→ chưa thay đổi.

isDirty = false

# **9\. User gõ vào input**

User gõ:

t

Bây giờ:

default:

""

current:

"t"

khác nhau.

→

isDirty = true

Mental:

DEFAULT VALUES

↓

so sánh

↑

CURRENT VALUES

giống nhau

→ isDirty = false

khác nhau

→ isDirty = true

# **10\. Vì sao defaultValues quan trọng với dirty state?**

Giả sử:

const {

register,

formState: { isDirty }

} = useForm({

defaultValues: {

username: "",

email: ""

}

});

RHF có mốc:

{

username: "",

email: ""

}

để so sánh.

User đổi:

username:

"" → "tung"

→ form khác default.

isDirty = true

Vì vậy khi bạn cần dirty tracking chính xác, việc cung cấp defaultValues rõ ràng rất quan trọng.

# **11\. Một điểm hay: đổi rồi đổi lại**

Ban đầu:

username = ""

isDirty = false

User nhập:

username = "tung"

→

isDirty = true

Sau đó user xóa hết để trở lại:

username = ""

Nếu giá trị form trở lại đúng default:

current = ""

default = ""

thì form-level:

isDirty = false

Đây là lý do đừng hiểu:

isDirty = user đã từng chạm vào form.

Không đúng.

Nó liên quan đến **current form values so với default values**.

# **12\. Vậy "user đã từng sửa field nào" là thằng nào?**

Đó là:

dirtyFields

Đây là chỗ rất dễ nhầm với:

isDirty

Phân biệt:

isDirty

↓

toàn bộ FORM có đang khác default không?

dirtyFields

↓

FIELD nào đã được đánh dấu dirty?

# **13\. dirtyFields**

Giả sử:

useForm({

defaultValues: {

username: "",

email: "",

password: ""

}

});

Ban đầu:

dirtyFields = {}

User chỉ sửa username:

username:

"" → "tung"

Mental:

dirtyFields = {

username: true

};

User sửa thêm email:

dirtyFields = {

username: true,

email: true

};

# **14\. isDirty vs dirtyFields**

Đây là câu phải nhớ:

isDirty

\= trạng thái dirty ở mức FORM

dirtyFields

\= dirty ở mức FIELD

Ví dụ:

FORM

│

├── username ← dirty

│

├── email ← dirty

│

└── password ← chưa dirty

thì:

isDirty = true

và mental:

dirtyFields = {

username: true,

email: true

};

Hai thằng liên quan nhưng **không nên coi là cùng một giá trị dưới hai dạng**; RHF theo dõi chúng cho hai mục đích khác nhau.

# **15\. dirtyFields dùng để làm gì?**

Ví dụ Edit Profile:

Name:

Tung

Email:

<tung@gmail.com>

Phone:

0123456789

User chỉ sửa:

Phone

Bạn có thể cần biết:

field nào đã được chỉnh sửa?

→ dirtyFields.

Hoặc UI:

Username \*

để báo field đã chỉnh.

Hoặc logic phức tạp hơn:

chỉ gửi/quan tâm những field đã sửa

tùy application.

# **16\. touchedFields — user đã "chạm" field nào?**

Ví dụ:

Email input

User click vào:

\[ email \]

↑

focus

sau đó click sang password:

Email mất focus

↓

blur

RHF có thể đánh dấu:

touchedFields = {

email: true

};

Mental model:

focus field

↓

user tương tác

↓

rời field / blur

↓

touched

# **17\. Liên hệ với Lesson 3**

Bạn còn nhớ register() cung cấp:

name

onChange

onBlur

ref

Bây giờ các mảnh ghép bắt đầu nối lại:

onChange

↓

RHF biết field thay đổi

↓

dirty-related state

onBlur

↓

RHF biết user rời field

↓

touchedFields

Đây là lý do RHF cần những event handlers đó.

# **18\. Dirty khác Touched thế nào?**

Cực kỳ dễ nhầm.

Giả sử email ban đầu:

""

User click vào email nhưng **không nhập gì**.

Sau đó click ra ngoài.

Email:

"" → ""

Giá trị không đổi.

Nhưng user đã tương tác/rời field.

Mental:

touched

→ YES

dirty

→ NO

Vậy:

Touched

≠

Dirty

# **19\. Ví dụ thứ hai**

Default:

username = ""

User:

click username

↓

gõ "tung"

↓

click ra ngoài

Lúc này:

touched

→ true

dirty

→ true

Vì:

user đã tương tác/rời field

-

value khác default

# **20\. Bảng cực quan trọng**

| **Tình huống**                  | **Dirty** | **Touched**             |
| ------------------------------- | --------- | ----------------------- |
| Chưa làm gì                     | ❌        | ❌                      |
| ---                             | ---       | ---                     |
| Focus rồi blur, không đổi value | ❌        | ✅                      |
| ---                             | ---       | ---                     |
| Thay đổi value                  | thường ✅ | chưa nhất thiết đã blur |
| ---                             | ---       | ---                     |
| Thay đổi rồi blur               | ✅        | ✅                      |
| ---                             | ---       | ---                     |

Câu nhớ:

DIRTY

→ dữ liệu thay đổi

TOUCHED

→ user đã tương tác rồi rời field

# **21\. Touched rất hữu ích cho Error UX**

Giả sử form vừa xuất hiện.

Bạn không muốn lập tức:

Email is required

Password is required

Username is required

Age is required

đập vào mặt user trước khi họ làm gì.

Một UX có thể là:

User chưa tương tác

↓

chưa show error

User vào Email

↓

rời Email

↓

touchedFields.email = true

↓

nếu invalid

↓

show error

Concept:

{touchedFields.email &&

errors.email && (

&lt;p&gt;

{errors.email.message}

&lt;/p&gt;

)}

Không phải form nào cũng cần pattern này, nhưng đây là ví dụ tốt để hiểu touchedFields.

# **22\. isValid — form hiện có hợp lệ không?**

Đơn giản:

isValid

↓

form có vượt qua validation rules hiện tại không?

Ví dụ rules:

email required

password minLength 8

Nếu:

email = ""

password = "123"

→ invalid.

isValid = false

Nếu:

email = "<tung@gmail.com>"

password = "12345678"

và tất cả configured rules đều pass:

isValid = true

# **23\. isValid thường dùng để disable button**

Ví dụ:

const {

register,

handleSubmit,

formState: {

isValid

}

} = useForm({

mode: "onChange"

});

Button:

<button

type="submit"

disabled={!isValid}

\>

Register

&lt;/button&gt;

Flow:

Form invalid

↓

isValid = false

↓

!isValid = true

↓

button disabled

Khi form valid:

isValid = true

↓

!isValid = false

↓

button enabled

# **24\. Tại sao ví dụ trên dùng mode: "onChange"?**

Nếu mục tiêu UX là:

Button bật/tắt ngay khi user nhập.

Thì ta cần validity được cập nhật phù hợp trong quá trình nhập.

Mental:

User gõ

↓

validation chạy

↓

isValid cập nhật

↓

UI cập nhật button

Nên:

useForm({

mode: "onChange"

});

là một lựa chọn dễ hiểu cho kiểu UI này.

Không có nghĩa mọi form đều phải dùng onChange.

# **25\. isSubmitting — form có đang submit không?**

Thằng này cực kỳ thực tế.

Ví dụ:

async function onSubmit(data) {

await fetch("/api/register", {

method: "POST",

body: JSON.stringify(data)

});

}

Request có thể mất:

500ms

1s

2s

...

Trong khoảng đó user có thể click:

Register

Register

Register

Register

Không hay.

RHF cung cấp:

isSubmitting

để biết submit flow async đang diễn ra.

# **26\. Ví dụ isSubmitting**

const {

register,

handleSubmit,

formState: {

isSubmitting

}

} = useForm();

Button:

<button

type="submit"

disabled={isSubmitting}

\>

{isSubmitting

? "Registering..."

: "Register"}

&lt;/button&gt;

Mental:

BEFORE SUBMIT

isSubmitting = false

\[ Register \]

User submit:

handleSubmit

↓

validation pass

↓

async onSubmit(data)

↓

Promise đang pending

↓

isSubmitting = true

\[ Registering... \]

Request hoàn thành:

Promise settle

↓

isSubmitting = false

\[ Register \]

# **27\. isSubmitting không phải loading của mọi thứ**

Đừng hiểu:

isSubmitting

\= toàn bộ app đang loading

❌

Nó nói về trạng thái **submit của form**.

Ví dụ:

Page đang fetch products

→ không liên quan

Form đang submit register request

→ isSubmitting

Sau này TanStack Query cũng có mutation state riêng.

Đừng trộn các khái niệm loading với nhau.

# **28\. Ví dụ hoàn chỉnh**

import { useForm } from "react-hook-form";

function RegisterForm() {

const {

register,

handleSubmit,

formState: {

errors,

isDirty,

dirtyFields,

touchedFields,

isValid,

isSubmitting

}

} = useForm({

mode: "onChange",

defaultValues: {

username: "",

email: "",

password: ""

}

});

async function onSubmit(data) {

await new Promise((resolve) =>

setTimeout(resolve, 2000)

);

console.log(data);

}

return (

<form

onSubmit={handleSubmit(onSubmit)}

\>

&lt;div&gt;

<input

placeholder="Username"

{...register("username", {

required:

"Username is required"

})}

/>

{errors.username && (

&lt;p&gt;

{errors.username.message}

&lt;/p&gt;

)}

&lt;/div&gt;

&lt;div&gt;

<input

placeholder="Email"

{...register("email", {

required:

"Email is required"

})}

/>

{errors.email && (

&lt;p&gt;

{errors.email.message}

&lt;/p&gt;

)}

&lt;/div&gt;

&lt;div&gt;

<input

type="password"

placeholder="Password"

{...register("password", {

required:

"Password is required",

minLength: {

value: 8,

message:

"Password must be at least 8 characters"

}

})}

/>

{errors.password && (

&lt;p&gt;

{errors.password.message}

&lt;/p&gt;

)}

&lt;/div&gt;

&lt;p&gt;

Form dirty:

{isDirty ? " Yes" : " No"}

&lt;/p&gt;

&lt;p&gt;

Form valid:

{isValid ? " Yes" : " No"}

&lt;/p&gt;

<button

type="submit"

disabled={

!isValid || isSubmitting

}

\>

{isSubmitting

? "Registering..."

: "Register"}

&lt;/button&gt;

&lt;/form&gt;

);

}

dirtyFields và touchedFields chưa render ở đây, nhưng RHF vẫn cung cấp để bạn dùng khi cần.

# **29\. Chạy tay form này từ đầu**

Default:

{

username: "",

email: "",

password: ""

}

Ban đầu:

CURRENT VALUES

\=

DEFAULT VALUES

Nên:

isDirty = false

Form chưa thỏa validation:

isValid = false

Không submit:

isSubmitting = false

Mental:

isDirty false

isValid false

isSubmitting false

Button:

disabled =

!isValid || isSubmitting

\=

!false || false

\=

true || false

\=

true

→ button disabled.

# **30\. User nhập username**

username:

"" → "tung"

Current values khác default:

isDirty = true

Field username dirty:

dirtyFields = {

username: true

};

Nhưng email/password chưa valid.

isValid = false

Mental:

isDirty

true

dirtyFields

└── username

isValid

false

# **31\. User click email rồi click ra ngoài**

Email vẫn:

""

Value không thay đổi.

Nên email không dirty chỉ vì focus/blur.

Nhưng:

touchedFields

└── email

Mental:

email dirty?

NO

email touched?

YES

Và vì:

required

validation có thể báo:

Email is required

theo validation mode/revalidation flow của form.

# **32\. User hoàn thành tất cả**

username = "tung"

email =

"<tung@gmail.com>"

password =

"12345678"

Rules pass.

isDirty = true

isValid = true

isSubmitting = false

Button:

disabled =

!true || false

→

false || false

→

false

Button bật:

\[ Register \]

# **33\. User click Register**

Flow:

Click Register

↓

submit event

↓

handleSubmit

↓

validation

↓

VALID

↓

onSubmit(data)

↓

async operation bắt đầu

↓

isSubmitting = true

Button trở thành:

\[ Registering... \]

và:

disabled = true

# **34\. Sau 2 giây**

Promise hoàn thành:

await ...

↓

onSubmit hoàn thành

↓

isSubmitting = false

Button trở lại:

\[ Register \]

Toàn bộ:

USER EDIT FORM

↓

isDirty

↓

validation

↓

isValid

↓

SUBMIT

↓

isSubmitting

↓

async work

↓

isSubmitting false

# **35\. errors và isValid có giống nhau không?**

Không.

errors trả lời:

**Field nào đang lỗi và lỗi gì?**

Ví dụ:

errors

│

├── email

│ └── Email is required

│

└── password

└── Password must be at least...

isValid trả lời:

**Toàn form hiện có valid không?**

isValid = false

Mental:

errors

→ chi tiết

isValid

→ kết luận tổng thể

# **36\. isDirty và dirtyFields có giống nhau không?**

Cũng không.

isDirty

→ toàn form

dirtyFields

→ từng field

Ví dụ:

isDirty = true;

và:

dirtyFields = {

username: true

};

Một cái là:

Có sự thay đổi ở form không?

Một cái là:

Field nào được đánh dấu dirty?

# **37\. dirtyFields và touchedFields có giống nhau không?**

Không.

dirtyFields

→ field bị thay đổi

touchedFields

→ field đã được tương tác/rời khỏi

Ví dụ:

User click Email

↓

không nhập

↓

click ra ngoài

Có thể:

touchedFields.email = true

nhưng email vẫn không dirty vì value chưa đổi khỏi default.

# **38\. Bảng tổng hợp quan trọng nhất Lesson 6**

| `formState`     | **Câu hỏi nó trả lời**                     |
| --------------- | ------------------------------------------ |
| `errors`        | Field nào lỗi? Lỗi gì?                     |
| ---             | ---                                        |
| `isDirty`       | Form hiện có khác default values không?    |
| ---             | ---                                        |
| `dirtyFields`   | Field nào được đánh dấu dirty?             |
| ---             | ---                                        |
| `touchedFields` | Field nào đã được user tương tác/rời khỏi? |
| ---             | ---                                        |
| `isValid`       | Form hiện có hợp lệ không?                 |
| ---             | ---                                        |
| `isSubmitting`  | Submit flow hiện có đang chạy không?       |
| ---             | ---                                        |

Nếu nhớ được bảng này thì Lesson 6 gần như xong.

# **39\. Liên hệ tất cả kiến thức RHF đến giờ**

Bây giờ sơ đồ của chúng ta lớn hơn rất nhiều:

useForm()

│

┌────────────────┼────────────────┐

│ │ │

▼ ▼ ▼

register() handleSubmit() formState

│ │ │

│ │ ┌──────┼────────┐

│ │ ▼ ▼ ▼

│ │ errors isDirty isValid

│ │ ...

▼ │

INPUT │

│ │

│ user nhập │

▼ │

VALUES │

│ │

└────────┐ │

▼ ▼

SUBMIT EVENT

│

▼

handleSubmit

│

▼

validation

/ \\

FAIL PASS

│ │

▼ ▼

errors onSubmit(data)

│

▼

async/API work

│

▼

isSubmitting

Bây giờ useForm() không còn là một hộp đen nữa.

# **40\. Một nuance quan trọng về formState**

Bạn không cần tự làm:

const \[errors, setErrors\] =

useState({});

const \[isDirty, setIsDirty\] =

useState(false);

const \[isSubmitting, setIsSubmitting\] =

useState(false);

cho những trạng thái form mà RHF đã quản lý.

Đó chính là một phần giá trị của thư viện:

Bạn

↓

khai báo field + rules

RHF

↓

theo dõi form state

↓

cung cấp formState cho UI

Nhưng không có nghĩa:

"Dùng RHF là không bao giờ dùng useState."

Ví dụ:

const \[showPassword, setShowPassword\] =

useState(false);

vẫn hoàn toàn bình thường.

Vì:

showPassword

→ UI state của component

isSubmitting

→ form state do RHF quản lý

# **41\. Câu hỏi phỏng vấn: formState là gì?**

Bạn có thể trả lời:

formState contains metadata about the current state of a React Hook Form, such as validation errors, whether the form or fields have been modified, whether fields have been touched, whether the form is valid, and whether it is currently submitting.

Không cần thuộc nguyên văn.

Mental:

formState

\=

"FORM ĐANG Ở TRẠNG THÁI GÌ?"

# **42\. Nếu interviewer hỏi isDirty vs touchedFields**

Bạn có thể nói:

isDirty

→ current form values khác default values

touchedFields

→ field nào user đã tương tác/rời khỏi

Ví dụ cực đẹp:

User focus Email

↓

không nhập gì

↓

blur

Kết quả:

Email touched

→ YES

Email value changed

→ NO

Vậy:

Touched ≠ Dirty

# **43\. Những gì cần nhớ sau Lesson 6**

### **Một**

Form Data

≠

Form State

Form Data

→ user nhập gì

Form State

→ form đang như thế nào

### **Hai**

errors

→ lỗi validation chi tiết

### **Ba**

isDirty

→ form hiện khác default values không?

### **Bốn**

dirtyFields

→ field nào dirty?

### **Năm**

touchedFields

→ field nào user đã tương tác/rời khỏi?

### **Sáu**

isValid

→ form hiện valid không?

### **Bảy**

isSubmitting

→ submit flow đang chạy không?

# **44\. Câu nhớ của Lesson 6**

formState

│

┌─────────────┼─────────────┐

│ │ │

errors isDirty isValid

│ │ │

lỗi gì? đã thay đổi? hợp lệ?

│

├── dirtyFields

│ ↓

│ field nào đổi?

│

├── touchedFields

│ ↓

│ field nào đã tương tác?

│

└── isSubmitting

↓

đang submit?

**data cho biết user nhập gì; formState cho biết form hiện đang ở trạng thái nào.**

Và sau bài này chúng ta đã quản lý được **input + validation + error + trạng thái form**. Lesson 7 sẽ sang nhóm API giúp **chủ động điều khiển dữ liệu form**:

defaultValues

reset()

setValue()

getValues()

Đây là bài rất thực tế vì nó dẫn thẳng tới hai case phổ biến: **Create Form** và **Edit Form**.