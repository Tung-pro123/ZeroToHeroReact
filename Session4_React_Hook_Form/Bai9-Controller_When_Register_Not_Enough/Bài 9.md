# **LESSON 9: Controller — KHI register() KHÔNG ĐỦ**

Đến đây bạn đã biết cách RHF xử lý native input:

&lt;input {...register("username")} /&gt;

Mental model:

register("username")

↓

RHF trả về

name / onChange / onBlur / ref

↓

spread vào &lt;input&gt;

↓

RHF kết nối với input

Nhưng vấn đề xuất hiện khi chúng ta không dùng native &lt;input&gt; đơn giản nữa.

Ví dụ:

Custom Select

DatePicker

Autocomplete

React-Select

Material UI components

Custom UI components

Những component này đôi khi không thể tích hợp thuận tiện bằng:

{...register("field")}

Lúc đó ta có:

Controller

# **1\. Trước tiên: tại sao register() hoạt động tốt với &lt;input&gt;?**

Nhớ lại Lesson 3:

<input

{...register("email")}

/>

Conceptually:

<input

name="email"

onChange={...}

onBlur={...}

ref={...}

/>

Native input hiểu những thứ này rất tự nhiên.

Ví dụ:

<input

value="abc"

onChange={...}

/>

Browser + React đều biết:

value

→ giá trị input

onChange

→ input thay đổi

onBlur

→ mất focus

ref

→ DOM input

Cho nên:

RHF

↓

register()

↓

native input

là một cặp rất đẹp.

# **2\. Nhưng không phải component nào cũng giống &lt;input&gt;**

Giả sử chúng ta tự viết:

function Rating({

rating,

onRatingChange

}) {

return (

<>

<button

onClick={() =>

onRatingChange(1)

}

\>

```
        ⭐
```

&lt;/button&gt;

<button

onClick={() =>

onRatingChange(2)

}

\>

```
        ⭐⭐
```

&lt;/button&gt;

<button

onClick={() =>

onRatingChange(3)

}

\>

```
        ⭐⭐⭐
```

&lt;/button&gt;

&lt;/&gt;

);

}

Component này không dùng API:

value

onChange

mà dùng:

rating

onRatingChange

Bây giờ bạn làm:

<Rating

{...register("rating")}

/>

thì có vấn đề.

# **3\. Tại sao spread register() vào Rating không tự nhiên?**

Nhớ:

register("rating")

conceptually trả:

{

name: "rating",

onChange: ...,

onBlur: ...,

ref: ...

}

Nhưng Rating của chúng ta cần:

{

rating: ...,

onRatingChange: ...

}

Hai bên nói **hai ngôn ngữ khác nhau**:

React Hook Form

│

├── value / event-style change

├── onBlur

└── ref

Custom Rating

│

├── rating

└── onRatingChange

Ta cần một thằng đứng giữa để **nối hai bên lại**.

Đó chính là ý tưởng của:

Controller

# **4\. Controller là gì?**

Ở mức hiện tại, hãy nhớ:

**Controller là component của React Hook Form giúp kết nối RHF với controlled/custom components.**

Mental:

React Hook Form

│

▼

Controller

│

▼

Custom / Controlled

Component

Hay:

RHF

│

│ "value này"

│ "onChange này"

▼

Controller

│

│ mapping

▼

Custom Component

# **5\. Controller đến từ đâu?**

Import:

import {

useForm,

Controller

} from "react-hook-form";

Sau đó:

const {

control

} = useForm();

Bạn đã thấy control ở Lesson 8 với:

useWatch({

control,

name: "quantity"

});

Bây giờ nó xuất hiện tiếp.

# **6\. control nhắc lại**

Mental beginner:

useForm()

│

└── control

↓

đại diện/kết nối tới

hệ thống quản lý form

↓

Controller dùng nó để biết

"tôi thuộc form nào?"

Không cần đào sâu internal.

Chỉ cần:

const {

control

} = useForm();

rồi:

<Controller

control={control}

...

/>

# **7\. Syntax cơ bản của Controller**

Bạn sẽ thường thấy:

<Controller

name="fieldName"

control={control}

render={({ field }) => (

// component ở đây

)}

/>

Ban đầu nhìn hơi đáng sợ.

Ta tách từng phần.

Controller

│

├── name

│

├── control

│

└── render

↓

field

# **8\. name là gì?**

Rất giống:

register("email")

Với Controller:

<Controller

name="email"

...

/>

Nó nói:

Field này có tên là email.

Khi submit:

{

email: "..."

}

Mental:

register("email")

↓

field name = email

Controller

name="email"

↓

field name = email

# **9\. control là gì?**

<Controller

name="email"

control={control}

/>

Nó kết nối Controller với form được tạo bởi:

useForm()

Mental:

useForm()

↓

control

↓

Controller

↓

field "email"

# **10\. Phần khó nhất: render**

Ta có:

<Controller

name="rating"

control={control}

render={({ field }) => (

...

)}

/>

Đừng nghĩ đây là syntax ma thuật.

render chỉ là một prop nhận **function**.

Concept:

render={someFunction}

Ở đây function là:

({ field }) => (

...

)

RHF/Controller gọi function đó và cung cấp thông tin để bạn render component.

# **11\. field là gì?**

Đây là phần quan trọng nhất của Lesson 9.

Controller cung cấp cho chúng ta một object field.

Mental model:

field = {

name,

value,

onChange,

onBlur,

ref

}

Tùy integration, bạn chủ yếu sẽ quan tâm:

field.value

field.onChange

field.onBlur

field.ref

field.name

Nhìn quen không?

Rất giống những thứ chúng ta đã học với register().

# **12\. Tại sao field quan trọng?**

Vì field chính là **cầu nối giữa component và RHF**.

RHF

│

▼

field

┌─────┼──────┐

│ │ │

value onChange onBlur ...

│ │

▼ ▼

UI Component

Component nhận:

field.value

để biết giá trị hiện tại.

Khi component thay đổi:

field.onChange(newValue)

để báo lại RHF.

# **13\. Ví dụ đơn giản nhất với Controller**

Ta cố tình dùng native input trước để hiểu syntax:

function Example() {

const {

control,

handleSubmit

} = useForm({

defaultValues: {

username: ""

}

});

function onSubmit(data) {

console.log(data);

}

return (

<form

onSubmit={handleSubmit(onSubmit)}

\>

<Controller

name="username"

control={control}

render={({ field }) => (

&lt;input {...field} /&gt;

)}

/>

&lt;button type="submit"&gt;

Submit

&lt;/button&gt;

&lt;/form&gt;

);

}

# **14\. Nhưng native input cần Controller không?**

Thông thường:

<input

{...register("username")}

/>

đơn giản hơn.

Cho nên với native input:

register()

→ ưu tiên thông thường

Ví dụ trên chỉ để bạn hiểu Controller.

Đừng học xong rồi biến:

&lt;input {...register("name")} /&gt;

thành Controller hết.

Không cần.

# **15\. Bung &lt;input {...field} /&gt; ra**

Giả sử:

render={({ field }) => (

&lt;input {...field} /&gt;

)}

Mental:

render={({ field }) => (

<input

name={field.name}

value={field.value}

onChange={field.onChange}

onBlur={field.onBlur}

ref={field.ref}

/>

)}

Bây giờ chắc bạn thấy quen rồi.

Flow:

RHF

↓

Controller

↓

field

↓

value / onChange / onBlur / ref

↓

&lt;input&gt;

# **16\. Đây là controlled component**

Nhìn:

<input

value={field.value}

onChange={field.onChange}

/>

Bạn đã học từ Lesson 1:

value

-

onChange

↓

Controlled Component

Đây chính là lý do tên Controller rất hợp.

Nó đặc biệt hữu ích để RHF làm việc với **controlled components**.

# **17\. Flow hai chiều cực quan trọng**

Controller phải giải quyết hai chiều.

### **Chiều 1: RHF → Component**

RHF value

↓

field.value

↓

Component

↓

hiển thị value

### **Chiều 2: Component → RHF**

User thay đổi component

↓

onChange

↓

field.onChange(...)

↓

RHF

↓

update form value

Ghép lại:

RHF

/ \\

/ \\

field.value field.onChange

↓ ↑

↓ │

COMPONENT ── user change

Đây là **trái tim của Controller**.

# **18\. Bây giờ quay lại custom Rating**

Component:

function Rating({

rating,

onRatingChange

}) {

return (

&lt;div&gt;

<button

type="button"

onClick={() =>

onRatingChange(1)

}

\>

```
        1 ⭐
```

&lt;/button&gt;

<button

type="button"

onClick={() =>

onRatingChange(2)

}

\>

```
        2 ⭐
```

&lt;/button&gt;

<button

type="button"

onClick={() =>

onRatingChange(3)

}

\>

```
        3 ⭐
```

&lt;/button&gt;

&lt;p&gt;

Current rating:

{rating}

&lt;/p&gt;

&lt;/div&gt;

);

}

Nó muốn:

rating

onRatingChange

Trong khi Controller cho:

field.value

field.onChange

Vậy ta **map** chúng.

# **19\. Mapping Controller với custom component**

<Controller

name="rating"

control={control}

render={({ field }) => (

<Rating

rating={field.value}

onRatingChange={

field.onChange

}

/>

)}

/>

Đây chính là bản chất của Controller.

RHF Rating

──────────────────────────────

field.value → rating

field.onChange → onRatingChange

Bạn đang đóng vai trò adapter.

# **20\. Chạy tay Rating**

Default:

useForm({

defaultValues: {

rating: 1

}

});

RHF:

rating = 1

Controller:

field.value

↓

1

Ta truyền:

<Rating

rating={field.value}

/>

→

Rating receives:

rating = 1

UI:

Current rating: 1

# **21\. User click 3 ⭐**

Trong Rating:

onRatingChange(3);

Nhưng ta đã map:

onRatingChange={

field.onChange

}

Nên thực chất:

field.onChange(3);

Flow:

```
User click 3 ⭐
```

↓

Rating

↓

onRatingChange(3)

↓

field.onChange(3)

↓

RHF

↓

rating = 3

Sau đó Controller nhận value mới:

field.value = 3

Component:

rating = 3

UI:

Current rating: 3

Đây là toàn bộ phép thuật.

# **22\. Controller thực chất đang làm "adapter"**

Từ này rất đáng nhớ nếu bạn học Software Engineering:

RHF API

│

│ value

│ onChange

│

▼

CONTROLLER

│

│ map

│

▼

CUSTOM COMPONENT API

│

│ rating

│ onRatingChange

▼

UI

Controller giúp hai bên có API khác nhau nói chuyện được với nhau.

# **23\. Nếu component đã dùng value + onChange thì còn dễ hơn**

Giả sử custom component:

<MySelect

value={...}

onChange={...}

/>

Thì:

<Controller

name="country"

control={control}

render={({ field }) => (

<MySelect

value={field.value}

onChange={field.onChange}

/>

)}

/>

Hoặc nếu props tương thích đầy đủ:

render={({ field }) => (

&lt;MySelect {...field} /&gt;

)}

Nhưng **không phải component nào cũng nhận đúng shape của field**, nên mapping rõ ràng thường giúp bạn hiểu integration hơn.

# **24\. Đây là điểm khác biệt lớn với register**

### **register**

<input

{...register("email")}

/>

RHF trả props phù hợp với native input.

Mental:

register

↓

spread props

↓

input tự nối vào RHF

### **Controller**

<Controller

name="country"

control={control}

render={({ field }) => (

<CustomSelect

value={field.value}

onChange={field.onChange}

/>

)}

/>

Mental:

Controller

↓

cho bạn field

↓

bạn map field

vào custom component

# **25\. Controller vẫn có validation**

Bạn có thể viết:

<Controller

name="rating"

control={control}

rules={{

required:

"Rating is required"

}}

render={({ field }) => (

<Rating

rating={field.value}

onRatingChange={

field.onChange

}

/>

)}

/>

Bạn thấy khác register() một chút.

Với register:

register("username", {

required:

"Username is required"

})

Với Controller:

<Controller

name="rating"

rules={{

required:

"Rating is required"

}}

...

/>

# **26\. Validation flow vẫn y hệt**

Controller không tạo một hệ validation mới.

Vẫn:

User chọn Rating

↓

Controller

↓

RHF field

↓

Submit

↓

handleSubmit

↓

Validation

/ \\

FAIL PASS

↓ ↓

errors onSubmit(data)

Nếu lỗi:

errors.rating

giống những field khác.

# **27\. Controller có thể cho fieldState**

Bạn cũng sẽ gặp:

render={({

field,

fieldState

}) => (

...

)}

Mental:

field

↓

value + handlers của field

fieldState

↓

metadata/trạng thái của field

Ví dụ:

render={({

field,

fieldState

}) => (

<>

<MyInput

value={field.value}

onChange={field.onChange}

/>

{fieldState.error && (

&lt;p&gt;

{fieldState.error.message}

&lt;/p&gt;

)}

&lt;/&gt;

)}

# **28\. field vs fieldState**

Đừng nhầm.

field

│

├── value

├── onChange

├── onBlur

├── name

└── ref

Nó giúp **kết nối component với form**.

Còn:

fieldState

│

├── error

├── isDirty

├── isTouched

└── ...

nó mô tả **trạng thái của field đó**.

Mental:

field

→ DỮ LIỆU + KẾT NỐI

fieldState

→ METADATA

Nó giống tư duy chúng ta vừa phân biệt ở Lesson 8:

VALUE

≠

FORM/FIELD STATE

# **29\. Ví dụ validation + fieldState**

<Controller

name="rating"

control={control}

rules={{

required:

"Please choose a rating"

}}

render={({

field,

fieldState

}) => (

<>

<Rating

rating={field.value}

onRatingChange={

field.onChange

}

/>

{fieldState.error && (

&lt;p&gt;

{

fieldState

.error

.message

}

&lt;/p&gt;

)}

&lt;/&gt;

)}

/>

Nếu invalid:

fieldState.error

↓

message

↓

"Please choose a rating"

# **30\. Có thể vẫn dùng formState.errors**

Đương nhiên.

Ví dụ:

const {

control,

formState: {

errors

}

} = useForm();

và:

<Controller

name="rating"

control={control}

...

/>

{errors.rating && (

&lt;p&gt;

{errors.rating.message}

&lt;/p&gt;

)}

Vẫn được.

Hai cách phục vụ những cách tổ chức component khác nhau.

Ở mức fresher:

formState.errors

→ errors toàn form

fieldState.error

→ error của field Controller hiện tại

là đủ hiểu.

# **31\. Ví dụ thực tế: Custom Select**

Giả sử:

function CustomSelect({

value,

onValueChange

}) {

return (

<select

value={value}

onChange={(e) =>

onValueChange(

e.target.value

)

}

\>

&lt;option value=""&gt;

Select country

&lt;/option&gt;

&lt;option value="VN"&gt;

Vietnam

&lt;/option&gt;

&lt;option value="US"&gt;

United States

&lt;/option&gt;

&lt;/select&gt;

);

}

Component muốn:

value

onValueChange

# **32\. Kết nối CustomSelect với Controller**

<Controller

name="country"

control={control}

rules={{

required:

"Country is required"

}}

render={({ field }) => (

<CustomSelect

value={field.value}

onValueChange={

field.onChange

}

/>

)}

/>

Mapping:

Controller CustomSelect

field.value ──────► value

field.onChange ──────► onValueChange

User chọn:

Vietnam

↓

onValueChange("VN")

↓

field.onChange("VN")

↓

RHF

↓

country = "VN"

Submit:

{

country: "VN"

}

# **33\. Một case thực tế hơn: component trả object**

Đây là lý do Controller thực sự hữu ích.

Giả sử Select library trả:

{

label: "Vietnam",

value: "VN"

}

nhưng backend chỉ cần:

"VN"

Bạn có thể mapping:

<Controller

name="country"

control={control}

render={({ field }) => (

<CustomSelect

value={field.value}

onChange={(option) =>

field.onChange(

option.value

)

}

/>

)}

/>

Flow:

CustomSelect

↓

{

label: "Vietnam",

value: "VN"

}

↓

onChange(option)

↓

field.onChange(option.value)

↓

field.onChange("VN")

↓

RHF stores:

country = "VN"

Đây là điểm rất mạnh của Controller:

Bạn có thể **transform/map dữ liệu** giữa custom component và RHF.

# **34\. Một ví dụ khác: DatePicker**

Conceptually, DatePicker có thể có API:

<DatePicker

selected={someDate}

onChange={someFunction}

/>

Nó không dùng:

value

mà dùng:

selected

Controller:

<Controller

name="birthday"

control={control}

render={({ field }) => (

<DatePicker

selected={field.value}

onChange={field.onChange}

/>

)}

/>

Mapping:

field.value

↓

selected

DatePicker onChange

↓

field.onChange

Lại cùng một bản chất.

# **35\. Đừng học thuộc từng library**

Bạn không cần học:

React Select Controller syntax

MUI Controller syntax

DatePicker Controller syntax

Autocomplete Controller syntax

...

Hãy hỏi component đó:

① Nó nhận value bằng prop nào?

② Nó báo thay đổi bằng callback nào?

③ Callback trả dữ liệu dạng gì?

④ RHF muốn lưu dữ liệu dạng gì?

Sau đó mapping.

Ví dụ:

Custom component:

selectedValue

onSelectionChange

RHF:

field.value

field.onChange

→

<MyComponent

selectedValue={

field.value

}

onSelectionChange={

field.onChange

}

/>

Đó mới là hiểu Controller.

# **36\. register() vs Controller**

Bảng này rất quan trọng:

|                              | `register()`           | `Controller`         |
| ---------------------------- | ---------------------- | -------------------- |
| Native input                 | Rất phù hợp            | Thường không cần     |
| ---                          | ---                    | ---                  |
| Uncontrolled/native-friendly | Rất phù hợp            | Có thể dư thừa       |
| ---                          | ---                    | ---                  |
| Controlled custom component  | Có thể khó tích hợp    | Rất phù hợp          |
| ---                          | ---                    | ---                  |
| Custom prop names            | Khó spread trực tiếp   | Mapping dễ           |
| ---                          | ---                    | ---                  |
| value/onChange cần transform | Có thể cần xử lý riêng | Mapping rất tự nhiên |
| ---                          | ---                    | ---                  |
| Code                         | Ngắn hơn               | Dài hơn              |
| ---                          | ---                    | ---                  |

Rule beginner:

Native input?

↓

register() trước

Custom/controlled component

khó tích hợp bằng register?

↓

Controller

# **37\. Không phải cứ Custom Component là cần Controller**

Điểm này phải sửa mental ngay.

Giả sử bạn tự tạo:

function MyInput(props) {

return (

&lt;input {...props} /&gt;

);

}

Nó forward các props xuống native input.

Thì có thể:

<MyInput

{...register("email")}

/>

hoàn toàn ổn nếu component forward đúng ref/handlers cần thiết theo cách tương thích.

Cho nên:

Custom Component

≠

Controller bắt buộc

Câu hỏi đúng:

Component này có tích hợp thuận tiện với register() không?

# **38\. Không được register và Controller cùng một field**

Một lỗi beginner dễ mắc:

<Controller

name="email"

control={control}

render={({ field }) => (

<input

{...field}

{...register("email")}

/>

)}

/>

Không nên.

Bạn đang cố đăng ký/kết nối cùng field theo hai cách.

Mental:

email

├── register()

└── Controller

❌ double registration

Nếu đã:

Controller

thì field do Controller cung cấp đã là cách kết nối field đó với RHF.

# **39\. Controller và defaultValues**

Controlled component cần current value rõ ràng.

Ví dụ:

const {

control

} = useForm({

defaultValues: {

country: "",

rating: 1

}

});

Controller:

<Controller

name="country"

control={control}

...

/>

Mental:

defaultValues

↓

RHF

↓

Controller

↓

field.value

↓

Custom Component

Ví dụ:

country = ""

rating = 1

Ngay từ đầu rõ ràng.

# **40\. Controller không thay useForm()**

Đừng nghĩ:

register

→ useForm

Controller

→ không cần useForm

Không.

Controller vẫn thuộc hệ thống RHF:

useForm()

↓

control

↓

Controller

↓

field

↓

custom component

Bạn vẫn có:

handleSubmit

formState

reset

setValue

getValues

watch

...

# **41\. Controller không thay handleSubmit**

Form vẫn:

<form

onSubmit={handleSubmit(onSubmit)}

\>

Ví dụ:

Native username

↓

register()

Custom country

↓

Controller

Custom rating

↓

Controller

User Submit

↓

handleSubmit

↓

validate tất cả registered/controlled fields

↓

onSubmit(data)

Data có thể là:

{

username: "tung",

country: "VN",

rating: 3

}

RHF vẫn gom thành một form.

# **42\. Form có thể dùng cả register và Controller**

Đây mới là case thực tế.

function RegisterForm() {

const {

register,

control,

handleSubmit

} = useForm({

defaultValues: {

username: "",

country: "",

rating: 1

}

});

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

{...register(

"username"

)}

/>

<Controller

name="country"

control={control}

render={({ field }) => (

<CustomSelect

value={field.value}

onValueChange={

field.onChange

}

/>

)}

/>

<Controller

name="rating"

control={control}

render={({ field }) => (

<Rating

rating={field.value}

onRatingChange={

field.onChange

}

/>

)}

/>

&lt;button type="submit"&gt;

Register

&lt;/button&gt;

&lt;/form&gt;

);

}

Mental:

useForm

│

┌────────────┴────────────┐

│ │

register control

│ │

▼ ▼

Native Input Controller

username / \\

▼ ▼

CustomSelect Rating

│ │

└───┬────┘

│

▼

RHF Form

│

▼

handleSubmit

│

▼

onSubmit

# **43\. Chạy tay toàn bộ form**

Default:

{

username: "",

country: "",

rating: 1

}

User nhập:

username = "tung"

Native input:

&lt;input&gt;

↓

register

↓

RHF

↓

username = "tung"

User chọn Vietnam:

CustomSelect

↓

onValueChange("VN")

↓

field.onChange("VN")

↓

RHF

↓

country = "VN"

User chọn 3 sao:

Rating

↓

onRatingChange(3)

↓

field.onChange(3)

↓

RHF

↓

rating = 3

# **44\. Submit**

User:

Click Register

Flow:

submit event

↓

handleSubmit

↓

RHF lấy toàn bộ form values

↓

validation

↓

PASS

↓

onSubmit(data)

Data:

{

username: "tung",

country: "VN",

rating: 3

}

onSubmit không quan tâm:

username dùng register

country dùng Controller

rating dùng Controller

Nó chỉ nhận:

FORM DATA

Đây là điểm rất đẹp của RHF.

# **45\. Liên hệ với kiến thức React controlled/uncontrolled**

Bây giờ quay lại Lesson 1.

### **Native + register**

Mental đơn giản:

DOM/native input

↓

RHF register

↓

RHF tận dụng native/uncontrolled behavior

### **Controlled custom component + Controller**

RHF

↓

field.value

↓

Controlled Component

↓

user change

↓

field.onChange

↓

RHF

Vậy Controller không phải một khái niệm hoàn toàn mới.

Nó xây thẳng trên kiến thức:

value + onChange

\=

Controlled Component

mà bạn đã học từ đầu.

# **46\. Liên hệ với watch**

Giả sử country được quản lý bởi Controller:

<Controller

name="country"

...

/>

Bạn vẫn có thể:

const country =

watch("country");

Không có vấn đề.

Vì sau cùng:

Controller

↓

RHF stores country

↓

watch("country")

↓

theo dõi country

Controller chỉ thay đổi **cách component kết nối với RHF**, không biến field thành một hệ thống riêng.

# **47\. Liên hệ với setValue**

Tương tự:

setValue(

"country",

"VN"

);

Controller nhận:

field.value = "VN"

rồi custom component nhận value mới.

Flow:

setValue("country", "VN")

↓

RHF

↓

Controller field.value

↓

CustomSelect

↓

Vietnam

Các API từ Lesson 7 vẫn hoạt động.

# **48\. Liên hệ với reset**

reset({

username: "tung",

country: "VN",

rating: 3

});

Flow:

reset()

↓

RHF values mới

↓

username

→ native input

country

→ Controller

→ CustomSelect

rating

→ Controller

→ Rating

Tức là những kiến thức trước không bị thay thế.

Chúng ghép với nhau.

# **49\. Câu hỏi phỏng vấn: Controller là gì?**

Ở mức intern/fresher, câu này là đủ đẹp:

Controller is a component provided by React Hook Form for integrating controlled or custom components that are not convenient to register directly. It provides field properties such as value, onChange, onBlur, name, and ref, which can be mapped to the component's API.

Mental:

Controller

\=

CẦU NỐI / ADAPTER

RHF

↕

Controlled / Custom Component

# **50\. Câu hỏi phỏng vấn: Khi nào dùng register, khi nào dùng Controller?**

Bạn có thể trả lời:

I normally use register for native inputs or components that integrate naturally with React Hook Form. I use Controller when working with controlled or third-party components that require explicit value and onChange mapping.

Mental:

Native/simple

↓

register

Controlled/custom integration

↓

Controller

# **51\. Câu hỏi phỏng vấn: field.onChange làm gì?**

Nói đơn giản:

It reports the component's changed value back to React Hook Form so RHF can update that field.

Flow:

User

↓

Custom Component

↓

field.onChange(newValue)

↓

RHF

↓

field value updated

# **52\. Những lỗi cần tránh**

**Lỗi 1:** dùng Controller cho tất cả mọi thứ.

&lt;input {...register("email")} /&gt;

đã đủ thì cứ dùng.

**Lỗi 2:** tưởng custom component nào cũng cần Controller.

Nếu component tương thích với register, Controller có thể không cần.

**Lỗi 3:** double register:

<Controller

...

render={({ field }) => (

<input

{...field}

{...register("email")}

/>

)}

/>

❌

**Lỗi 4:** chỉ truyền value:

<MySelect

value={field.value}

/>

mà quên báo thay đổi:

onChange={field.onChange}

Khi đó:

RHF → Component

có đường đi,

nhưng:

Component → RHF

bị đứt.

**Lỗi 5:** chỉ truyền onChange mà không truyền value cho controlled component.

Bạn lại có chiều:

Component → RHF

nhưng thiếu:

RHF → Component

Với controlled integration, thường phải nghĩ **hai chiều**.

# **53\. Công thức giải mọi bài Controller**

Khi gặp một thư viện UI lạ, đừng hoảng.

Hỏi 4 câu:

① Component nhận VALUE bằng prop nào?

② Component báo CHANGE bằng prop/callback nào?

③ Callback trả ra dữ liệu gì?

④ RHF cần lưu dữ liệu gì?

Sau đó mapping:

RHF

│

field.value

│

▼

VALUE PROP CỦA

CUSTOM COMPONENT

│

│ User change

▼

CHANGE CALLBACK

│

▼

field.onChange(...)

│

▼

RHF

Nếu hiểu sơ đồ này, bạn không cần học thuộc integration của từng UI library.

# **54\. Tổng hợp register và Controller**

useForm()

│

┌──────────┴──────────┐

│ │

▼ ▼

register() control

│ │

▼ ▼

Native-friendly Controller

Component │

▼

field.value

field.onChange

field.onBlur

field.ref

│

▼

Controlled / Custom

Component

Cả hai cuối cùng đều:

↓

RHF FORM

↓

validation

↓

handleSubmit()

↓

onSubmit(data)

# **55\. Những gì cần nhớ sau Lesson 9**

**Một:**

register()

ưu tiên cho native/native-friendly inputs.

**Hai:**

Controller

giúp tích hợp controlled/custom components với RHF.

**Ba:**

<Controller

name="country"

control={control}

render={({ field }) => (

...

)}

/>

Ba phần quan trọng:

name

control

render

**Bốn:** field chứa cầu nối:

value

onChange

onBlur

name

ref

**Năm:** Controller thường là mapping:

field.value

↓

Custom Component value prop

Custom Component change

↓

field.onChange(...)

**Sáu:** Validation có thể khai báo qua:

rules={{ ... }}

**Bảy:** Không double-register một field bằng cả register() và Controller.

# **56\. Câu nhớ của Lesson 9**

NORMAL INPUT

register()

↓

&lt;input&gt;

CUSTOM / CONTROLLED COMPONENT

RHF

│

▼

Controller

│

┌──────┴──────┐

│ │

▼ ▲

field.value field.onChange

│ │

▼ │

CUSTOM COMPONENT

**register() phù hợp khi component có thể kết nối trực tiếp với RHF; Controller là adapter khi ta cần tự map field.value và field.onChange vào API của controlled/custom component.**

Vậy là phần kiến thức lõi của React Hook Form gần như đã đủ. **Lesson 10** sẽ không nhồi thêm một đống API mới nữa mà ghép toàn bộ lại thành một **Register Form thực tế**:

name

email

password

confirmPassword

↓

validation

↓

errors

↓

isDirty / isValid

↓

isSubmitting

↓

handleSubmit

↓

fetch API

↓

reset

Sau Lesson 10, ta có thể đóng **Giai đoạn 8 — React Hook Form** và sang **Giai đoạn 9 — Zod**.

NHỮNG CÂU HỎI THẤC MẮC VÀ CÂU TRẢ LỜI:  
function Rating({

rating,

onRatingChange

}) {

return (

&lt;div&gt;

<button

type="button"

onClick={() =>

onRatingChange(1)

}

\>

```
        1 ⭐
```

&lt;/button&gt;

<button

type="button"

onClick={() =>

onRatingChange(2)

}

\>

```
        2 ⭐
```

&lt;/button&gt;

<button

type="button"

onClick={() =>

onRatingChange(3)

}

\>

```
        3 ⭐
```

&lt;/button&gt;

&lt;p&gt;

Current rating:

{rating}

&lt;/p&gt;

&lt;/div&gt;

);

}

XONG KO DÙNG NATIVE HOOK FORM Ở ĐÂY LUÔN

## **57\. Đúng — Rating này hoàn toàn không biết React Hook Form là gì**

Chính xác. Component này:

function Rating({

rating,

onRatingChange

}) {

return (

&lt;div&gt;

<button

type="button"

onClick={() => onRatingChange(1)}

\>

```
        1 ⭐
```

&lt;/button&gt;

<button

type="button"

onClick={() => onRatingChange(2)}

\>

```
        2 ⭐
```

&lt;/button&gt;

<button

type="button"

onClick={() => onRatingChange(3)}

\>

```
        3 ⭐
```

&lt;/button&gt;

&lt;p&gt;

Current rating: {rating}

&lt;/p&gt;

&lt;/div&gt;

);

}

**không hề dùng React Hook Form bên trong.**

Nó chỉ là một React component bình thường:

Rating

│

├── nhận rating

│

└── nhận onRatingChange

Nó không biết:

register ❌

control ❌

Controller ❌

useForm ❌

field ❌

## **58\. Nếu KHÔNG có React Hook Form thì dùng Rating thế nào?**

Bạn hoàn toàn có thể dùng useState:

function App() {

const \[rating, setRating\] =

useState(1);

return (

<Rating

rating={rating}

onRatingChange={setRating}

/>

);

}

Flow:

App

│

│ rating = 1

│

▼

&lt;Rating rating={1} /&gt;

│

```
│ user click 3 ⭐
```

│

▼

onRatingChange(3)

│

▼

setRating(3)

│

▼

App render lại

│

▼

rating = 3

Tức Rating bản thân nó chẳng liên quan gì tới RHF.

# **59\. Vấn đề chỉ xuất hiện khi muốn đưa Rating vào RHF Form**

Bây giờ thay vì:

const \[rating, setRating\] =

useState(1);

ta muốn **React Hook Form quản lý rating**:

RHF Form Data

{

username: "tung",

email: "<tung@gmail.com>",

rating: 3

}

Lúc đó mới cần nối:

Rating

↕

React Hook Form

Và Controller đứng giữa.

# **60\. So sánh cực rõ**

### **Không dùng RHF**

const \[rating, setRating\] =

useState(1);

<Rating

rating={rating}

onRatingChange={setRating}

/>

Flow:

React State

│

│ rating

▼

Rating

│

│ onRatingChange(3)

▼

setRating(3)

### **Dùng RHF**

Ta không cần tự tạo:

const \[rating, setRating\] =

useState(1);

Thay vào đó:

<Controller

name="rating"

control={control}

render={({ field }) => (

<Rating

rating={field.value}

onRatingChange={

field.onChange

}

/>

)}

/>

Flow:

React Hook Form

│

│ field.value

▼

Rating

│

│ onRatingChange(3)

▼

field.onChange(3)

│

▼

React Hook Form

Bạn thấy hai phiên bản gần như cùng một pattern:

KHÔNG RHF CÓ RHF

rating field.value

↓ ↓

Rating Rating

↓ ↓

setRating(3) field.onChange(3)

↓ ↓

React State RHF

**Đây mới là bản chất Controller.**

# **61\. Vậy tại sao không viết RHF thẳng vào Rating?**

Ví dụ technically bạn có thể thiết kế component phụ thuộc trực tiếp vào RHF.

Nhưng thường không cần.

Nếu Rating chỉ nhận:

<Rating

rating={...}

onRatingChange={...}

/>

thì nó rất reusable.

Hôm nay dùng với useState:

<Rating

rating={rating}

onRatingChange={setRating}

/>

Ngày mai dùng với RHF:

<Rating

rating={field.value}

onRatingChange={field.onChange}

/>

Hoặc parent khác tự quản lý:

<Rating

rating={product.rating}

onRatingChange={handleRating}

/>

Rating chẳng cần quan tâm ai quản lý state.

Mental:

Rating

│

"Tôi chỉ cần 2 thứ"

│

┌────────┴────────┐

▼ ▼

rating onRatingChange

Còn bên ngoài muốn cung cấp hai thứ đó bằng cách nào là chuyện của bên ngoài.

# **62\. Đây chính là lý do Controller giống Adapter**

Rating nói:

Tôi muốn:

rating

onRatingChange

RHF nói:

Tôi cung cấp:

field.value

field.onChange

Controller cho ta chỗ để nối:

<Rating

rating={field.value}

onRatingChange={field.onChange}

/>

Tức là:

RHF Rating

field.value

──────────────────► rating

field.onChange

◄────────────────── onRatingChange

Hay dễ hiểu hơn:

React Hook Form

│

field.value = 3

│

▼

Controller

│

rating = 3

│

▼

Rating

│

```
       user click 2 ⭐
```

│

▼

onRatingChange(2)

│

▼

field.onChange(2)

│

▼

React Hook Form

rating = 2

# **63\. Câu bạn nên nhớ ở đoạn này**

**Custom component không cần biết React Hook Form tồn tại. Controller nằm ở bên ngoài để kết nối API của custom component với RHF.**

Ví dụ Rating chỉ cần biết:

rating

onRatingChange

Còn ai đưa chúng vào?

Có thể là useState

Có thể là React Hook Form

Có thể là parent component

Rating **không quan tâm**.

Và đây cũng là lý do ví dụ này dùng Controller: Rating không có API native kiểu mà register() có thể đơn giản spread vào; ta phải **map**:

field.value → rating

field.onChange → onRatingChange

Đó chính là phần quan trọng nhất của Lesson 9.

THẾ BÂY GIỜ người đưa vào là useState hoặc parent component là có sài controller nữa ko

## **64\. Không. Nếu useState hoặc Parent Component quản lý thì KHÔNG cần Controller**

Đây là chỗ quan trọng nhất để bạn chốt bản chất.

Controller **không thuộc về Rating**.

Controller chỉ xuất hiện khi bạn muốn:

**React Hook Form quản lý value của Rating.**

So sánh 3 trường hợp nhé.

## **65\. Trường hợp 1 — useState quản lý → KHÔNG Controller**

function App() {

const \[rating, setRating\] =

useState(1);

return (

<Rating

rating={rating}

onRatingChange={setRating}

/>

);

}

Ở đây:

useState

│

│ rating

▼

Rating

│

│ onRatingChange(3)

▼

setRating(3)

Ai quản lý rating?

useState ✅

React Hook Form không tham gia:

Controller ❌

useForm ❌

register ❌

## **66\. Trường hợp 2 — Parent Component quản lý → cũng KHÔNG Controller**

Ví dụ:

function Parent() {

const \[product, setProduct\] =

useState({

name: "iPhone",

rating: 1

});

function handleRatingChange(

newRating

) {

setProduct({

...product,

rating: newRating

});

}

return (

<Rating

rating={product.rating}

onRatingChange={

handleRatingChange

}

/>

);

}

Flow:

Parent State

product.rating = 1

│

▼

Rating

│

│ user click 3

▼

onRatingChange(3)

│

▼

handleRatingChange(3)

│

▼

setProduct(...)

│

▼

Parent State

product.rating = 3

Không có RHF.

→ Không cần Controller.

## **67\. Trường hợp 3 — React Hook Form quản lý → lúc này mới dùng Controller**

function ProductForm() {

const {

control,

handleSubmit

} = useForm({

defaultValues: {

rating: 1

}

});

return (

&lt;form&gt;

<Controller

name="rating"

control={control}

render={({ field }) => (

<Rating

rating={field.value}

onRatingChange={

field.onChange

}

/>

)}

/>

&lt;/form&gt;

);

}

Bây giờ:

React Hook Form

│

│ field.value

▼

Rating

│

│ onRatingChange(3)

▼

field.onChange(3)

│

▼

React Hook Form

rating = 3

→ Controller cần thiết vì chúng ta đang **nối RHF với custom controlled component**.

## **68\. Bạn có thể hiểu Controller là "cục chuyển đổi"**

Giả sử Rating có ổ cắm:

Rating cần:

rating

onRatingChange

### **useState đã khớp rất tự nhiên:**

rating

setRating

Nối thẳng:

<Rating

rating={rating}

onRatingChange={setRating}

/>

Không cần adapter.

RHF lại cung cấp thông qua Controller:

field.value

field.onChange

Ta cần map:

field.value

↓

rating

field.onChange

↓

onRatingChange

nên:

<Controller

...

render={({ field }) => (

<Rating

rating={field.value}

onRatingChange={

field.onChange

}

/>

)}

/>

## **69\. Nhưng chú ý một điểm: "Parent quản lý" chưa đủ để kết luận**

Câu:

"Parent component quản lý"

hơi rộng.

Vì Parent có thể quản lý bằng **useState**:

Parent

↓

useState

↓

Rating

→ không Controller

Nhưng Parent cũng có thể sở hữu **React Hook Form**:

Parent

↓

useForm()

↓

Controller

↓

Rating

→ có Controller

Cho nên câu hỏi chính xác không phải:

"Parent hay Child quản lý?"

Mà là:

**"Ai đang quản lý giá trị này?"**

## **70\. Ba trường hợp đặt cạnh nhau**

① React State

useState

↓

rating

↓

Rating

↓

setRating

Controller ❌

② Parent State

Parent useState

↓

product.rating

↓

Rating

↓

handleRatingChange

↓

Parent setState

Controller ❌

③ React Hook Form

useForm()

↓

control

↓

Controller

↓

field.value

↓

Rating

↓

field.onChange

↓

RHF

Controller ✅

## **71\. Vậy Controller KHÔNG phải để tạo custom component**

Đây có lẽ là chỗ bạn đang ráp lại kiến thức.

Không phải:

Custom Component

↓

Controller bắt buộc

❌ Sai.

Mà là:

Custom/controlled component

-

muốn RHF quản lý nó

-

register() không tích hợp thuận tiện

↓

Controller

Ví dụ Rating:

Rating

▲

│

Ai quản lý rating?

│

┌─────────────┼─────────────┐

▼ ▼ ▼

useState Parent State RHF

│ │ │

▼ ▼ ▼

trực trực Controller

tiếp tiếp │

│ │ ▼

└─────────────┴──────────► Rating

### **Câu nhớ chuẩn nhất:**

**Controller không phải để quản lý custom component nói chung. Nó là cầu nối khi React Hook Form cần quản lý một controlled/custom component không tiện kết nối bằng register().**

Nếu useState đang quản lý Rating thì cứ:

<Rating

rating={rating}

onRatingChange={setRating}

/>

**không có lý do gì nhét Controller vào cả.**