# **LESSON 5: VALIDATION VỚI REACT HOOK FORM**

Đến hiện tại chúng ta có:

Lesson 2

useForm()

↓

tạo hệ thống quản lý form

Lesson 3

register()

↓

đăng ký input với RHF

Lesson 4

handleSubmit()

↓

submit → validate → onSubmit(data)

Nhưng ở Lesson 4 có một hộp chúng ta chưa mở:

User Submit

↓

handleSubmit

↓

┌─────────────┐

│ VALIDATION │ ← HÔM NAY

└─────────────┘

↓

Valid?

/ \\

No Yes

↓ ↓

errors onSubmit(data)

Hôm nay ta học validation **built-in của React Hook Form** trước.

Zod để Giai đoạn 9.

# **1\. Validation là gì?**

Validation đơn giản là:

**Kiểm tra dữ liệu có thỏa mãn các rule mà chúng ta yêu cầu hay không.**

Ví dụ Register Form:

username

→ bắt buộc nhập

email

→ bắt buộc

→ phải đúng format

password

→ bắt buộc

→ ít nhất 8 ký tự

age

→ ít nhất 18

User nhập:

username = ""

password = "123"

age = 15

Validation:

username required

→ FAIL

password minLength 8

→ FAIL

age min 18

→ FAIL

Form:

INVALID

# **2\. Validation rule được đặt ở đâu?**

Bạn còn nhớ:

register("email")

không?

register() có thể nhận argument thứ hai:

register("email", {

// validation rules

})

Mental model:

register(

"fieldName",

{

validation rules

}

)

Ví dụ:

register("username", {

required: true

})

Nghĩa là:

Field:

username

Rule:

required

# **3\. Rule đầu tiên: required**

Ví dụ:

<input

{...register("username", {

required: true

})}

/>

User nhập:

username = ""

Submit:

handleSubmit

↓

validate username

↓

required?

↓

username rỗng

↓

FAIL

Nếu:

username = "tung"

thì:

required

↓

PASS

# **4\. Nhưng required: true chưa có message đẹp**

Nếu viết:

register("username", {

required: true

})

RHF biết field bị lỗi.

Nhưng thường chúng ta muốn message:

Username is required

Có thể viết:

register("username", {

required: "Username is required"

})

Bây giờ:

username = ""

↓

required FAIL

↓

error

↓

message:

"Username is required"

Đây là pattern bạn sẽ gặp rất nhiều:

register("field", {

required: "Error message"

})

# **5\. Error đi đâu?**

Giả sử:

const {

register,

handleSubmit,

formState: { errors }

} = useForm();

Nếu username lỗi:

errors.username

sẽ chứa thông tin lỗi.

Về mental model:

errors = {

username: {

type: "required",

message: "Username is required"

}

}

Đừng coi object trên là cam kết toàn bộ internal structure trong mọi trường hợp; ta dùng nó để hiểu các phần quan trọng như type và message.

UI thường viết:

{errors.username && (

&lt;p&gt;{errors.username.message}&lt;/p&gt;

)}

Flow:

validation FAIL

↓

errors.username

↓

errors.username.message

↓

"Username is required"

↓

UI

errors chúng ta sẽ đào sâu hơn ở Lesson 6.

# **6\. Ví dụ hoàn chỉnh với required**

function RegisterForm() {

const {

register,

handleSubmit,

formState: { errors }

} = useForm();

function onSubmit(data) {

console.log(data);

}

return (

<form

onSubmit={handleSubmit(onSubmit)}

\>

<input

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

&lt;button type="submit"&gt;

Register

&lt;/button&gt;

&lt;/form&gt;

);

}

# **7\. Chạy tay trường hợp username rỗng**

Ban đầu:

username = ""

User click:

Register

Flow:

submit event

↓

handleSubmit

↓

validate registered fields

↓

username

↓

required

↓

FAIL

↓

errors.username được tạo/cập nhật

↓

message:

"Username is required"

↓

onSubmit(data)

KHÔNG chạy

React render UI:

\[ \]

Username is required

\[ Register \]

# **8\. User nhập username rồi submit lại**

User nhập:

tung

Submit:

handleSubmit

↓

username required?

↓

PASS

↓

không còn lỗi required đó

↓

FORM VALID

↓

onSubmit(data)

Data:

{

username: "tung"

}

# **9\. minLength**

Password thường cần:

ít nhất 8 ký tự

RHF:

register("password", {

minLength: 8

})

Nhưng nếu muốn message:

register("password", {

minLength: {

value: 8,

message:

"Password must be at least 8 characters"

}

})

Cấu trúc:

minLength

│

├── value

│ ↓

│ 8

│

└── message

↓

"Password must..."

# **10\. Tại sao lúc thì viết số, lúc lại object?**

Bạn có thể viết ngắn:

minLength: 8

khi chỉ cần rule.

Hoặc:

minLength: {

value: 8,

message:

"Password must be at least 8 characters"

}

khi muốn cả:

rule value

-

error message

Mental:

minLength: 8

≈

ít nhất 8 ký tự

Còn:

minLength: {

value: 8,

message: "..."

}

≈

ít nhất 8 ký tự

nếu sai:

hiển thị message này

# **11\. Kết hợp required + minLength**

Đây là chuyện rất bình thường.

<input

type="password"

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

Field password có hai rule:

password

│

├── required

│

└── minLength = 8

# **12\. Chạy tay password**

### **Trường hợp 1**

password = ""

Validation:

required

↓

FAIL

Error:

Password is required

### **Trường hợp 2**

password = "123"

Nó có dữ liệu nên:

required

↓

PASS

Nhưng:

minLength 8

↓

3 < 8

↓

FAIL

Error:

Password must be at least 8 characters

### **Trường hợp 3**

password = "12345678"

required

↓

PASS

minLength

↓

PASS

Field hợp lệ.

# **13\. maxLength**

Tương tự:

register("username", {

maxLength: {

value: 30,

message:

"Username must not exceed 30 characters"

}

})

Mental:

username.length <= 30

Nếu:

31 ký tự

→ FAIL.

# **14\. min và max**

Dùng cho giá trị số.

Ví dụ age:

<input

type="number"

{...register("age", {

min: {

value: 18,

message:

"You must be at least 18"

}

})}

/>

Rule:

age >= 18

User:

age = 16

→ FAIL.

User:

age = 20

→ PASS.

# **15\. Nhớ vấn đề type="number" từ Lesson 3**

Ta đã nói:

&lt;input type="number"&gt;

không có nghĩa mọi thứ tự động trở thành JavaScript number theo cách bạn mong muốn.

RHF hỗ trợ:

register("age", {

valueAsNumber: true,

min: {

value: 18,

message:

"You must be at least 18"

}

})

valueAsNumber giúp RHF đưa value về number cho field này.

Ví dụ:

User nhập:

20

thay vì data:

{

age: "20"

}

ta muốn:

{

age: 20

}

Điểm này sau này cực quan trọng khi sang Zod.

# **16\. pattern**

Ví dụ bạn muốn kiểm tra bằng regular expression.

register("email", {

pattern: {

value: /.../,

message: "Invalid email"

}

})

Mental:

email

↓

test against pattern

↓

match?

/ \\

no yes

↓ ↓

error PASS

Hoặc ví dụ dễ nhìn hơn với username:

register("username", {

pattern: {

value: /^\[a-zA-Z0-9\]+\$/,

message:

"Username can only contain letters and numbers"

}

})

Nếu:

tung123

→ PASS.

Nếu:

tung@123

→ FAIL.

# **17\. Có nên tự viết regex email khổng lồ không?**

Không cần ám ảnh chuyện đó.

Bạn sẽ thấy rất nhiều regex email trên Internet, nhưng email validation thực tế có nhiều edge case.

Ở giai đoạn học RHF, điều cần hiểu là:

pattern

↓

validation dựa trên RegExp

Sau này khi dùng Zod:

z.email()

hoặc API tương ứng theo phiên bản Zod bạn dùng sẽ làm schema dễ đọc hơn nhiều.

Quan trọng hơn:

Frontend email validation

≠

email thực sự tồn tại

Muốn biết email tồn tại còn là bài toán khác.

# **18\. validate — custom validation**

Đây là rule rất quan trọng.

Built-in rules xử lý được:

required

minLength

maxLength

min

max

pattern

Nhưng giả sử business rule của bạn là:

Username không được là "admin".

Không có:

notAdmin: true

:))

Lúc đó dùng:

validate

Ví dụ:

register("username", {

validate: (value) =>

value !== "admin"

})

Mental:

value

↓

custom function

↓

true / false

Nếu return:

true

→ PASS.

Nếu:

false

→ FAIL.

# **19\. Nhưng muốn custom message thì sao?**

Có thể return:

true

khi hợp lệ.

Hoặc return error message khi không hợp lệ.

Ví dụ:

register("username", {

validate: (value) =>

value !== "admin" ||

"Username cannot be admin"

})

Nhìn syntax này có thể hơi lạ.

Ta bung nó ra.

# **20\. Bung validate ra cho dễ hiểu**

Code:

(value) =>

value !== "admin" ||

"Username cannot be admin"

Có thể hiểu tương đương logic:

function validateUsername(value) {

if (value !== "admin") {

return true;

}

return "Username cannot be admin";

}

Nếu:

value = "tung"

thì:

"tung" !== "admin"

↓

true

↓

PASS

Nếu:

value = "admin"

thì:

"admin" !== "admin"

↓

false

↓

return error message

↓

FAIL

# **21\. Ví dụ validation nhiều rule**

<input

{...register("username", {

required:

"Username is required",

minLength: {

value: 3,

message:

"Username must have at least 3 characters"

},

maxLength: {

value: 20,

message:

"Username must not exceed 20 characters"

},

pattern: {

value: /^\[a-zA-Z0-9\]+\$/,

message:

"Only letters and numbers are allowed"

},

validate: (value) =>

value !== "admin" ||

"Username cannot be admin"

})}

/>

Mental:

username

↓

required

↓

minLength

↓

maxLength

↓

pattern

↓

custom validate

↓

VALID / INVALID

Không nhất thiết phải nhồi nhiều rule như vậy trong mọi form; đây chỉ để bạn thấy chúng có thể kết hợp.

# **22\. Khi nào validation chạy?**

Câu này quan trọng hơn việc thuộc syntax.

Bạn có thể đang nghĩ:

RHF validation chỉ chạy lúc Submit đúng không?

Không hẳn.

useForm() có thể cấu hình validation mode.

Ví dụ:

useForm({

mode: "onSubmit"

});

hoặc:

useForm({

mode: "onBlur"

});

hoặc:

useForm({

mode: "onChange"

});

# **23\. mode: "onSubmit"**

Đây là mode mặc định cho lần validation ban đầu.

const {

register,

handleSubmit

} = useForm({

mode: "onSubmit"

});

Mental đơn giản:

User nhập

↓

chưa cần báo validation ngay

User Submit

↓

validation

Ví dụ user để email trống.

Chưa submit:

\[ email input \]

không nhất thiết hiện lỗi ngay

Bấm Submit:

Email is required

# **24\. mode: "onBlur"**

useForm({

mode: "onBlur"

});

Flow:

User focus email

↓

nhập / không nhập

↓

click sang field khác

↓

email blur

↓

validate email

Ví dụ:

Email:

\[ \] ← đang focus

User click Password

↓

Email blur

↓

required validation

↓

"Email is required"

Nhớ Lesson 3:

register()

↓

onBlur

Bây giờ bạn thấy onBlur bắt đầu có tác dụng rồi.

# **25\. mode: "onChange"**

useForm({

mode: "onChange"

});

Validation có thể diễn ra khi value thay đổi.

Mental:

User gõ

↓

onChange

↓

validate

↓

form/error state cập nhật

Ví dụ password:

1

↓

< 8

↓

invalid

12

↓

< 8

↓

invalid

12345678

↓

\>= 8

↓

valid

onChange đem lại feedback sớm nhưng cũng khiến validation/form-state updates xảy ra thường xuyên hơn.

Không phải lúc nào cũng cần.

# **26\. Đừng học mode theo kiểu "cái nào tốt nhất?"**

Không có:

onSubmit = dở

onBlur = tốt

onChange = tốt nhất

❌

Nó là UX decision.

Ví dụ:

onSubmit

→ đơn giản

→ không làm phiền user khi đang nhập

onBlur

→ feedback khi user rời field

onChange

→ feedback rất sớm / liên tục

Tùy form.

# **27\. Validation Flow đầy đủ**

Giả sử:

const {

register,

handleSubmit,

formState: { errors }

} = useForm();

Field:

<input

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

User nhập:

123

Submit:

submit event

↓

handleSubmit

↓

RHF lấy registered fields

↓

password = "123"

↓

Validation Rules

│

├── required

│ ↓

│ PASS

│

└── minLength 8

↓

FAIL

↓

errors.password

↓

message

↓

"Password must be at least 8 characters"

Và:

onSubmit(data)

không chạy.

# **28\. Error UI hoạt động như thế nào?**

Ta có:

{errors.password && (

&lt;p&gt;

{errors.password.message}

&lt;/p&gt;

)}

Chạy tay.

Nếu không có error:

errors.password

là falsy/undefined.

→ &lt;p&gt; không render.

Nếu có:

errors.password = {

type: "minLength",

message:

"Password must be at least 8 characters"

};

thì:

errors.password && (...)

true.

→ render:

&lt;p&gt;

Password must be at least 8 characters

&lt;/p&gt;

# **29\. Một Register Form hoàn chỉnh ở mức hiện tại**

import { useForm } from "react-hook-form";

function RegisterForm() {

const {

register,

handleSubmit,

formState: { errors }

} = useForm();

function onSubmit(data) {

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

"Username is required",

minLength: {

value: 3,

message:

"Username must be at least 3 characters"

}

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

&lt;div&gt;

<input

type="number"

placeholder="Age"

{...register("age", {

valueAsNumber: true,

required:

"Age is required",

min: {

value: 18,

message:

"You must be at least 18"

}

})}

/>

{errors.age && (

&lt;p&gt;

{errors.age.message}

&lt;/p&gt;

)}

&lt;/div&gt;

&lt;button type="submit"&gt;

Register

&lt;/button&gt;

&lt;/form&gt;

);

}

Đừng cố thuộc code.

Nhìn cấu trúc:

useForm

↓

register field

↓

attach validation rules

↓

handleSubmit

↓

validate

/ \\

fail pass

↓ ↓

errors data

↓ ↓

UI onSubmit

# **30\. Chạy tay Register Form trên**

Giả sử user nhập:

username = "tu"

email = ""

password = "123"

age = 16

Submit.

### **Username**

required

↓

PASS

minLength 3

↓

length = 2

↓

FAIL

Error:

Username must be at least 3 characters

### **Email**

required

↓

FAIL

Error:

Email is required

### **Password**

required

↓

PASS

minLength 8

↓

length = 3

↓

FAIL

Error:

Password must be at least 8 characters

### **Age**

required

↓

PASS

min 18

↓

16 < 18

↓

FAIL

Error:

You must be at least 18

Form:

INVALID

Cho nên:

onSubmit(data)

**không chạy**.

# **31\. User sửa lại**

username = "tung"

email = "<tung@gmail.com>"

password = "12345678"

age = 20

Với các rule hiện tại:

username

required → PASS

minLength → PASS

email

required → PASS

password

required → PASS

minLength → PASS

age

required → PASS

min → PASS

→ Form valid.

RHF gọi:

onSubmit(data);

Data:

{

username: "tung",

email: "<tung@gmail.com>",

password: "12345678",

age: 20

}

Lưu ý: trong ví dụ này email mới chỉ required; nếu muốn kiểm tra format thì phải thêm rule tương ứng.

# **32\. validate có thể dùng dữ liệu field khác không?**

Có, và đây là chỗ bạn sẽ gặp khi làm:

Password

Confirm Password

Rule:

confirmPassword

\===

password

Có thể làm bằng RHF built-in/custom validation với getValues().

Ví dụ concept:

validate: (value) =>

value === getValues("password") ||

"Passwords do not match"

Nhưng **chưa đào sâu ở đây**, vì getValues() nằm ở Lesson 7.

Sau này Zod cũng xử lý cross-field validation rất đẹp bằng schema/refinement.

Hiện tại chỉ cần nhớ:

validate

\= custom rule khi built-in rules không đủ

# **33\. Built-in validation và Zod khác nhau thế nào?**

Hiện tại chúng ta đang làm:

register("password", {

required: "...",

minLength: {

value: 8,

message: "..."

}

})

Tức validation rules nằm gần từng input.

Sau này với Zod:

const schema = z.object({

email: z.email(),

password: z

.string()

.min(8)

});

Mental:

RHF built-in validation

↓

rules đặt qua register()

Zod

↓

validation tập trung trong schema

Đừng vội kết luận cái nào "thay thế hoàn toàn" cái nào. Khi học Zod + RHF chúng ta sẽ ghép chúng đúng cách.

# **34\. Frontend validation vẫn không phải Security**

Nhắc lại vì cực quan trọng.

Bạn viết:

register("age", {

min: 18

})

User bình thường qua UI:

age = 15

↓

RHF chặn submit callback

Nhưng attacker/user vẫn có thể:

Postman / curl / code khác

↓

POST /api/register

↓

{

"age": 15

}

không đi qua React Hook Form của bạn.

Vì vậy:

React Hook Form validation

↓

Frontend validation

↓

UX + early feedback

Spring Boot validation

↓

Backend validation

↓

BẮT BUỘC

Nếu Java Spring:

@NotBlank

@Email

@Size(min = 8)

@Min(18)

vẫn cần ở backend tùy DTO/business rule.

# **35\. Bảng tổng hợp các rule hôm nay**

| **Rule**        | **Ý nghĩa**                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------- |
| `required`      | Bắt buộc có giá trị                                                                                |
| ---             | ---                                                                                                |
| `minLength`     | Độ dài tối thiểu                                                                                   |
| ---             | ---                                                                                                |
| `maxLength`     | Độ dài tối đa                                                                                      |
| ---             | ---                                                                                                |
| `min`           | Giá trị tối thiểu                                                                                  |
| ---             | ---                                                                                                |
| `max`           | Giá trị tối đa                                                                                     |
| ---             | ---                                                                                                |
| `pattern`       | Phải match RegExp                                                                                  |
| ---             | ---                                                                                                |
| `validate`      | Custom validation function                                                                         |
| ---             | ---                                                                                                |
| `valueAsNumber` | Chuyển giá trị phù hợp sang number; đây là value transformation option, không phải validation rule |
| ---             | ---                                                                                                |

Đặc biệt nhớ:

validate

là cửa thoát khi:

built-in rules không diễn tả được business rule

# **36\. Toàn bộ kiến thức từ Lesson 2 → 5 bắt đầu nối lại**

Bây giờ code:

const {

register,

handleSubmit,

formState: { errors }

} = useForm();

function onSubmit(data) {

console.log(data);

}

và:

<form

onSubmit={handleSubmit(onSubmit)}

\>

<input

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

&lt;button type="submit"&gt;

Submit

&lt;/button&gt;

&lt;/form&gt;

không còn magic nữa.

Bạn có thể đọc:

useForm()

↓

cho tôi hệ thống quản lý form

register("username", rules)

↓

đăng ký field username

-

gắn validation rules

{...register(...)}

↓

spread name/onChange/onBlur/ref...

vào input

handleSubmit(onSubmit)

↓

tạo submit handler

User Submit

↓

RHF validate

INVALID

↓

errors.username

↓

hiện message

VALID

↓

onSubmit(data)

# **37\. Những gì cần nhớ sau Lesson 5**

**Một:** Validation rules nằm ở argument thứ hai của register():

register("password", {

required: "...",

minLength: {

value: 8,

message: "..."

}

})

**Hai:** Các built-in rule quan trọng:

required

minLength

maxLength

min

max

pattern

**Ba:** Khi built-in rule không đủ:

validate: (value) => ...

**Bốn:** Validation fail:

handleSubmit

↓

INVALID

↓

errors

↓

success callback không chạy

**Năm:** Validation pass:

handleSubmit

↓

VALID

↓

onSubmit(data)

**Sáu:** Thời điểm validation có thể cấu hình:

onSubmit

onBlur

onChange

**Bảy:** RHF validation chỉ là frontend validation. Backend vẫn phải validate.

# **38\. Câu nhớ của Lesson 5**

register(

"field",

VALIDATION RULES

)

↓

User nhập

↓

handleSubmit

↓

Validation

/ \\

INVALID VALID

↓ ↓

errors onSubmit(data)

↓

UI

**register() không chỉ nói cho RHF "field này tồn tại"; argument thứ hai còn có thể nói "field này phải thỏa những điều kiện gì".**

Và bây giờ có một thứ xuất hiện liên tục mà ta vẫn mới chỉ dùng sơ sơ:

formState: { errors }

Ngoài errors, RHF còn có:

isDirty

dirtyFields

touchedFields

isValid

isSubmitting

Đó là **Lesson 6 — formState và Error Handling**.