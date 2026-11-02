# **LESSON 8: watch() VÀ useWatch() — THEO DÕI GIÁ TRỊ FORM**

Ở Lesson 7 chúng ta đã học:

setValue()

→ CODE → FORM

getValues()

→ FORM → CODE

Ví dụ:

const email = getValues("email");

Nhưng có một vấn đề:

getValues() chỉ **đọc giá trị tại thời điểm nó được gọi**.

Nó không có nghĩa:

email thay đổi

↓

getValues tự thông báo cho component

↓

UI tự cập nhật

Nếu UI của chúng ta cần **phản ứng khi một field thay đổi**, ta cần:

watch()

useWatch()

Mental model của Lesson 8:

getValues()

↓

READ

watch / useWatch

↓

SUBSCRIBE / THEO DÕI

↓

value thay đổi

↓

React render UI phù hợp

# **1\. Bài toán đầu tiên**

Giả sử form:

<input

{...register("username")}

/>

&lt;p&gt;

Hello ...

&lt;/p&gt;

Ta muốn khi user gõ:

t

↓

Hello t

tu

↓

Hello tu

tun

↓

Hello tun

tung

↓

Hello tung

Tức UI phải phản ứng theo giá trị username.

Flow mong muốn:

username thay đổi

↓

component biết

↓

render lại

↓

UI hiển thị username mới

Đây chính là bài toán của watch.

# **2\. watch() là gì?**

Lấy từ useForm():

const {

register,

watch

} = useForm();

Sau đó:

const username =

watch("username");

Có thể đọc:

RHF, hãy cho component này theo dõi giá trị của field username.

Ví dụ:

function ProfileForm() {

const {

register,

watch

} = useForm({

defaultValues: {

username: ""

}

});

const username =

watch("username");

return (

<>

<input

{...register("username")}

/>

&lt;p&gt;

Hello {username}

&lt;/p&gt;

&lt;/&gt;

);

}

# **3\. Chạy tay watch()**

Ban đầu:

username = ""

Dòng:

const username =

watch("username");

cho render hiện tại:

username = ""

UI:

\[ \]

Hello

User gõ:

t

RHF biết field thay đổi thông qua field đã register().

Input

↓

onChange

↓

RHF biết username thay đổi

↓

watch("username") đang quan tâm field này

↓

component/render liên quan được cập nhật

↓

username = "t"

↓

UI

↓

Hello t

Tiếp tục:

"tu"

↓

Hello tu

"tun"

↓

Hello tun

"tung"

↓

Hello tung

# **4\. Đây là khác biệt lớn với getValues()**

Giả sử:

const username =

getValues("username");

Đừng nghĩ:

username thay đổi

↓

getValues tự kích hoạt render

Không.

getValues() chỉ đọc current value khi code đó được thực thi.

Mental:

getValues("username")

↓

"Giá trị username NGAY LÚC NÀY là gì?"

Còn:

watch("username")

mental:

"Tôi quan tâm username.

Khi nó thay đổi,

UI/render của tôi cần biết."

# **5\. Analogy cực dễ nhớ**

Hãy tưởng tượng giá Bitcoin.

### **getValues()**

Bạn mở app lúc 10:00:

Bitcoin = \$100,000

Sau đó đóng app.

Giá thay đổi:

\$101,000

\$102,000

Bạn không biết.

Bạn chỉ **đọc một lần**.

### **watch()**

Bạn bật live price:

\$100,000

↓

\$101,000

↓

\$102,000

↓

UI cập nhật

Đó là:

READ

vs

SUBSCRIBE

# **6\. watch() có thể theo dõi một field**

Ví dụ:

const email =

watch("email");

Nếu email:

""

↓

"t"

↓

"tu"

↓

"tung@"

↓

"<tung@gmail.com>"

email trong các render tương ứng sẽ phản ánh value mới.

UI:

&lt;p&gt;

Current email: {email}

&lt;/p&gt;

# **7\. Có thể watch nhiều field**

Ví dụ:

const \[

firstName,

lastName

\] = watch(\[

"firstName",

"lastName"

\]);

Sau đó:

&lt;p&gt;

Full name:

{firstName} {lastName}

&lt;/p&gt;

Mental:

firstName ──┐

├── watch

lastName ───┘

↓

render

↓

Full Name UI

User nhập:

firstName = "Thanh"

lastName = "Tung"

UI:

Full name: Thanh Tung

# **8\. Có thể watch() toàn bộ form**

Nếu gọi:

const values = watch();

thì bạn đang theo dõi form values rộng hơn/toàn bộ form.

Ví dụ:

const values = watch();

return (

<>

<input

{...register("username")}

/>

<input

{...register("email")}

/>

&lt;pre&gt;

{JSON.stringify(

values,

null,

2

)}

&lt;/pre&gt;

&lt;/&gt;

);

User nhập:

username = "tung"

email = "<tung@gmail.com>"

UI có thể hiện:

{

"username": "tung",

"email": "<tung@gmail.com>"

}

# **9\. Nhưng đừng watch() cả form bừa bãi**

Giả sử form có:

50 fields

nhưng component chỉ cần biết:

country

để quyết định hiển thị Province hay State.

Bạn không cần:

const values = watch();

rồi quan tâm cả 50 field.

Ý tưởng tốt hơn:

const country =

watch("country");

Mental:

Chỉ cần country

↓

theo dõi country

Nguyên tắc:

**Theo dõi đúng dữ liệu mà UI thực sự cần.**

# **10\. Use case cực phổ biến: Conditional UI**

Form:

Account Type

(o) Personal

( ) Company

Nếu user chọn:

Company

thì hiện thêm:

Company Name

Tax Code

Nếu Personal:

ẩn chúng đi

Đây là bài toán hoàn hảo cho watch.

# **11\. Ví dụ Conditional UI**

function RegisterForm() {

const {

register,

watch

} = useForm({

defaultValues: {

accountType: "personal"

}

});

const accountType =

watch("accountType");

return (

&lt;form&gt;

<select

{...register(

"accountType"

)}

\>

&lt;option value="personal"&gt;

Personal

&lt;/option&gt;

&lt;option value="company"&gt;

Company

&lt;/option&gt;

&lt;/select&gt;

{accountType ===

"company" && (

<>

<input

{...register(

"companyName"

)}

placeholder="Company Name"

/>

<input

{...register(

"taxCode"

)}

placeholder="Tax Code"

/>

&lt;/&gt;

)}

&lt;/form&gt;

);

}

# **12\. Chạy tay ví dụ trên**

Default:

accountType = "personal"

Dòng:

const accountType =

watch("accountType");

→

accountType = "personal"

Điều kiện:

accountType === "company"

→ false.

UI:

Account Type

\[ Personal ▼ \]

không có Company Name

không có Tax Code

# **13\. User chọn Company**

Input thay đổi:

accountType

"personal"

↓

"company"

RHF nhận thay đổi.

watch("accountType") đang theo dõi nó.

accountType thay đổi

↓

render liên quan

↓

accountType = "company"

↓

condition

↓

true

UI:

Account Type

\[ Company ▼ \]

Company Name

\[ \]

Tax Code

\[ \]

Đây là lý do watch() tồn tại.

# **14\. Có cần useEffect không?**

Người mới rất dễ làm kiểu:

const accountType =

watch("accountType");

const \[

showCompanyFields,

setShowCompanyFields

\] = useState(false);

useEffect(() => {

setShowCompanyFields(

accountType === "company"

);

}, \[accountType\]);

Sau đó:

{showCompanyFields && (

...

)}

Không cần.

Vì:

showCompanyFields

là derived data từ:

accountType

Ta đã học ở:

You Might Not Need an Effect

Cứ:

{accountType === "company" && (

...

)}

là đủ.

Mental:

accountType

↓

derive during render

↓

show / hide UI

Không cần:

watch

↓

Effect

↓

setState

↓

render

# **15\. watch() không phải useEffect**

Đừng nhầm:

watch("country")

với:

useEffect(...)

watch() giúp bạn quan sát form value để render logic có thể sử dụng nó.

useEffect():

synchronize with external system

Ví dụ:

country thay đổi

↓

chỉ thay đổi UI

→ thường render logic.

Còn:

country thay đổi

↓

cần synchronize với external map library

→ lúc đó Effect có thể liên quan.

# **16\. Vậy useWatch() là gì?**

Bây giờ đến thằng thứ hai:

useWatch()

Nếu watch() đã theo dõi được field thì tại sao còn useWatch()?

Mental ban đầu:

watch()

↓

API lấy từ useForm()

↓

theo dõi field trong context của form

useWatch()

↓

một React Hook riêng

↓

subscribe vào form value

↓

giúp cô lập subscription/re-render

ở component/hook sử dụng nó tốt hơn

Điểm quan trọng nhất:

useWatch() đặc biệt hữu ích khi muốn một component con chỉ subscribe vào field mà nó cần, thay vì làm component chứa useForm() phải quan tâm rộng hơn.

# **17\. Syntax cơ bản của useWatch()**

Import:

import {

useForm,

useWatch

} from "react-hook-form";

useWatch cần biết form/control nào nó đang theo dõi.

Ví dụ:

const {

register,

control

} = useForm();

Sau đó:

const username =

useWatch({

control,

name: "username"

});

Bạn thấy xuất hiện một thằng mới:

control

# **18\. control là gì?**

Ở mức hiện tại, đừng đào internal của RHF.

Chỉ cần mental:

useForm()

│

├── register

├── handleSubmit

├── formState

└── control

control là object/API nội bộ mà các RHF APIs/components như useWatch/Controller có thể dùng để kết nối với hệ thống quản lý form.

Mental đơn giản:

control

↓

"form control của RHF"

↓

giúp useWatch biết:

"Tôi đang subscribe form nào?"

Lesson 9 Controller chúng ta sẽ gặp control lần nữa.

# **19\. Ví dụ useWatch()**

import {

useForm,

useWatch

} from "react-hook-form";

function ProfileForm() {

const {

register,

control

} = useForm({

defaultValues: {

username: ""

}

});

const username =

useWatch({

control,

name: "username"

});

return (

<>

<input

{...register("username")}

/>

&lt;p&gt;

Hello {username}

&lt;/p&gt;

&lt;/&gt;

);

}

Flow vẫn quen thuộc:

User gõ username

↓

RHF field thay đổi

↓

useWatch subscription

↓

username mới

↓

render

↓

Hello tung

# **20\. Thế khác watch() ở đâu?**

Ví dụ đơn giản:

const username =

watch("username");

và:

const username =

useWatch({

control,

name: "username"

});

đều có thể cho bạn current username để UI phản ứng.

Nhưng khác biệt quan trọng nằm ở **phạm vi subscription/render**.

Mental đơn giản:

watch()

↓

thường dùng ngay ở component

đang sở hữu useForm()

useWatch()

↓

hook chuyên cho subscription

↓

có thể cô lập việc theo dõi

ở component sử dụng nó

# **21\. Ví dụ để thấy lý do useWatch tồn tại**

Giả sử form lớn:

CheckoutForm

│

├── Name

├── Email

├── Address

├── City

├── Country

├── ShippingMethod

├── Coupon

├── Note

└── ShippingPrice

ShippingPrice chỉ phụ thuộc:

shippingMethod

Ta không muốn tư duy:

CheckoutForm khổng lồ

↓

theo dõi mọi thứ chỉ để

ShippingPrice biết shippingMethod

Ta có thể tách:

CheckoutForm

│

├── CustomerFields

│

├── AddressFields

│

└── ShippingSection

│

└── useWatch("shippingMethod")

Subscription nằm gần component thực sự cần dữ liệu.

# **22\. Ví dụ component con với useWatch**

function ShippingPrice({

control

}) {

const shippingMethod =

useWatch({

control,

name: "shippingMethod"

});

const price =

shippingMethod === "express"

? 50000

: 20000;

return (

&lt;p&gt;

Shipping: {price}

&lt;/p&gt;

);

}

Parent:

function CheckoutForm() {

const {

register,

control

} = useForm({

defaultValues: {

shippingMethod:

"standard"

}

});

return (

&lt;form&gt;

<select

{...register(

"shippingMethod"

)}

\>

&lt;option value="standard"&gt;

Standard

&lt;/option&gt;

&lt;option value="express"&gt;

Express

&lt;/option&gt;

&lt;/select&gt;

<ShippingPrice

control={control}

/>

&lt;/form&gt;

);

}

# **23\. Chạy tay ví dụ Shipping**

Ban đầu:

shippingMethod

\=

"standard"

ShippingPrice:

const shippingMethod =

useWatch({

control,

name: "shippingMethod"

});

→ "standard".

Calculation:

shippingMethod === "express"

→ false.

Price:

20000

UI:

Shipping: 20000

# **24\. User chọn Express**

shippingMethod

"standard"

↓

"express"

RHF cập nhật field.

ShippingPrice đang subscribe:

shippingMethod changed

↓

useWatch nhận value mới

↓

ShippingPrice render lại

↓

shippingMethod = "express"

↓

price = 50000

UI:

Shipping: 50000

Điểm đáng chú ý:

Logic theo dõi shippingMethod được đặt ngay trong component ShippingPrice cần nó.

# **25\. watch() vs useWatch() bằng sơ đồ**

### **watch()**

FormComponent

│

├── useForm()

│

├── watch("country")

│

├── register(...)

│

└── render conditional UI

Rất tiện khi form nhỏ/vừa và parent cần value.

### **useWatch()**

Form

│

├── useForm()

│ └── control

│

├── Input A

├── Input B

│

└── ChildComponent

│

└── useWatch({

control,

name: "field"

})

Thích hợp khi muốn subscription nằm ở component cụ thể.

# **26\. Có phải lúc nào cũng dùng useWatch vì "performance tốt hơn"?**

Không.

Đừng biến nó thành:

watch = xấu ❌

useWatch = tốt ✅

Không đúng.

Nếu form đơn giản:

const accountType =

watch("accountType");

return (

<>

...

{accountType === "company" &&

&lt;CompanyFields /&gt;}

&lt;/&gt;

);

rất rõ ràng.

Không cần cố biến mọi thứ thành useWatch.

Câu hỏi nên là:

Component hiện tại chỉ cần

theo dõi vài field đơn giản?

↓

watch() có thể đủ

Muốn subscription được cô lập

ở component/hook cụ thể?

↓

useWatch()

# **27\. Khi nào KHÔNG cần watch()?**

Cái này cực quan trọng.

Giả sử bạn chỉ cần data khi Submit:

function onSubmit(data) {

console.log(data);

}

Thì:

Không cần watch.

RHF đã đưa:

data

cho bạn.

Đừng làm:

const username =

watch("username");

const email =

watch("email");

const password =

watch("password");

function onSubmit() {

fetch(... {

username,

email,

password

});

}

trong khi chỉ cần:

function onSubmit(data) {

console.log(data);

}

# **28\. Khi nào không cần watch() — case thứ hai**

Bạn chỉ cần value khi user click:

\[ Check Email \]

Thì:

function handleCheck() {

const email =

getValues("email");

...

}

có thể đủ.

Không cần subscribe liên tục.

Mental:

UI có cần phản ứng

MỖI KHI value thay đổi?

│

┌──┴──┐

│ │

YES NO

│ │

▼ ▼

watch getValues

Đây là rule cực hữu ích.

# **29\. watch() không thay thế getValues()**

Chúng giải quyết hai bài toán khác nhau.

### **Bài toán A**

Khi user click button, tôi muốn lấy email hiện tại.

const email =

getValues("email");

### **Bài toán B**

Khi user thay đổi country, UI phải lập tức thay đổi.

const country =

watch("country");

Câu hỏi khác nhau → tool khác nhau.

# **30\. watch() cũng không thay thế formState**

Ví dụ:

const email =

watch("email");

cho bạn:

email value

Còn:

formState.errors.email

cho bạn:

validation error

Còn:

formState.dirtyFields.email

cho bạn:

dirty metadata

Mental:

watch

↓

FIELD VALUE

formState

↓

FORM/FIELD METADATA

# **31\. Và watch() không thay thế setValue()**

watch

→ đọc/theo dõi

setValue

→ ghi/thay đổi

Có thể nhớ như:

RHF FIELD

"country"

/ \\

/ \\

watch setValue

↑ ↓

READ / WRITE /

SUBSCRIBE UPDATE

# **32\. Ví dụ kết hợp watch + setValue**

Giả sử:

Same as billing address?

\[✓\]

Nếu checked:

shippingAddress

\=

billingAddress

Bạn có thể gặp logic sử dụng:

watch

↓

biết checkbox hiện tại

getValues

↓

đọc billing address

setValue

↓

đặt shipping address

Nhưng phải cẩn thận xem logic là **derived UI**, **user event**, hay synchronization thực sự; không nên cứ thấy watch là quăng vào useEffect.

Điều quan trọng là bạn bắt đầu thấy các API phối hợp:

watch

→ theo dõi

getValues

→ đọc snapshot

setValue

→ ghi

reset

→ reset/reinitialize

# **33\. Một ví dụ rất thực tế: Password Strength UI**

Form:

const {

register,

watch

} = useForm({

defaultValues: {

password: ""

}

});

const password =

watch("password");

Ta derive:

let strength = "Weak";

if (password.length >= 12) {

strength = "Strong";

} else if (

password.length >= 8

) {

strength = "Medium";

}

UI:

<input

type="password"

{...register("password")}

/>

&lt;p&gt;

Strength: {strength}

&lt;/p&gt;

Flow:

User nhập password

↓

watch("password")

↓

password mới

↓

derive strength

↓

render

Ví dụ:

"123"

↓

Weak

"12345678"

↓

Medium

"123456789012"

↓

Strong

# **34\. Có cần state cho strength không?**

Không nhất thiết.

Sai mental model:

const \[

strength,

setStrength

\] = useState("");

useEffect(() => {

...

setStrength(...);

}, \[password\]);

Trong trường hợp strength chỉ được tính từ password, ta có thể derive trực tiếp:

const password =

watch("password");

const strength =

getPasswordStrength(

password

);

Flow:

password

↓

render

↓

derive strength

↓

UI

Đúng kiến thức React bạn đã học:

**Derived data → tính trong render.**

# **35\. watch và re-render — hiểu đúng**

Điểm này đáng nhớ.

Khi bạn sử dụng:

watch("username")

để component quan tâm đến username, field thay đổi có thể làm component liên quan render lại để nhận value mới.

Đây **không phải lỗi**.

Nếu UI cần:

Hello {username}

thì UI phải render lại khi username đổi.

Vấn đề không phải:

"Re-render là xấu."

Mà là:

"Component nào thực sự cần biết sự thay đổi?"

Nếu form lớn và chỉ một component nhỏ cần value:

useWatch

có thể giúp đặt subscription ở phạm vi hẹp hơn.

# **36\. Đừng nhầm RHF với "không re-render"**

Ở Lesson 1 chúng ta nói RHF không yêu cầu React state làm trung tâm cho mỗi keystroke của mọi native input.

Nhưng điều đó **không có nghĩa**:

RHF

\=

không bao giờ re-render

Sai.

Nếu bạn yêu cầu:

watch("username")

vì UI phụ thuộc username:

&lt;p&gt;{username}&lt;/p&gt;

thì khi username đổi, React cần cập nhật UI.

Điều đúng hơn là:

RHF cố gắng quản lý form và subscriptions hiệu quả; bạn không cần tự biến mọi field thành controlled state.

# **37\. watch() với defaultValues**

Giả sử:

useForm({

defaultValues: {

country: "VN"

}

});

và:

const country =

watch("country");

Ngay render ban đầu, mental:

country

↓

"VN"

Đây là một lý do nữa defaultValues rất hữu ích:

watch field

↓

có initial value rõ ràng

thay vì phải suy nghĩ:

undefined?

empty?

server value?

# **38\. Tổng hợp getValues, watch, useWatch**

| **API**       | **Ý nghĩa chính**                                                            |
| ------------- | ---------------------------------------------------------------------------- |
| `getValues()` | Đọc current form values tại thời điểm gọi                                    |
| ---           | ---                                                                          |
| `watch()`     | Theo dõi form value, tiện dùng từ useForm()                                  |
| ---           | ---                                                                          |
| `useWatch()`  | Hook chuyên subscribe value, hữu ích để cô lập subscription ở component/hook |
| ---           | ---                                                                          |
| `setValue()`  | Programmatically cập nhật value                                              |
| ---           | ---                                                                          |

Mental:

getValues

→ SNAPSHOT

watch

→ SUBSCRIBE

useWatch

→ SUBSCRIBE CÓ PHẠM VI HẸP HƠN

setValue

→ WRITE

# **39\. Chọn cái nào?**

Hãy hỏi:

Tôi chỉ cần value khi event xảy ra?

↓

getValues()

UI cần phản ứng khi value thay đổi?

↓

watch()

Form/component lớn và tôi muốn

component cụ thể subscribe field?

↓

useWatch()

Tôi muốn code thay đổi field?

↓

setValue()

Đây là cách chọn dựa trên **bài toán**, không phải thuộc API.

# **40\. Một ví dụ tổng hợp**

import {

useForm,

useWatch

} from "react-hook-form";

function PricePreview({

control

}) {

const quantity =

useWatch({

control,

name: "quantity"

});

const price = 100000;

const total =

(quantity ?? 0) \* price;

return (

&lt;p&gt;

Total: {total}

&lt;/p&gt;

);

}

function OrderForm() {

const {

register,

control,

getValues,

setValue,

handleSubmit

} = useForm({

defaultValues: {

product: "",

quantity: 1

}

});

function showCurrentProduct() {

console.log(

getValues("product")

);

}

function setFiveItems() {

setValue(

"quantity",

5,

{

shouldDirty: true

}

);

}

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

{...register("product")}

/>

<input

type="number"

{...register(

"quantity",

{

valueAsNumber: true

}

)}

/>

<PricePreview

control={control}

/>

<button

type="button"

onClick={

showCurrentProduct

}

\>

Show Product

&lt;/button&gt;

<button

type="button"

onClick={setFiveItems}

\>

Set Quantity = 5

&lt;/button&gt;

&lt;button type="submit"&gt;

Order

&lt;/button&gt;

&lt;/form&gt;

);

}

Trong ví dụ này có đủ:

defaultValues

↓

product = ""

quantity = 1

getValues("product")

↓

đọc product khi click

setValue("quantity", 5)

↓

code thay quantity

useWatch("quantity")

↓

PricePreview theo dõi quantity

handleSubmit

↓

validate/submit form

# **41\. Chạy tay ví dụ tổng hợp**

Ban đầu:

product = ""

quantity = 1

PricePreview:

quantity = 1

price = 100000

total

\=

1 × 100000

\=

100000

UI:

Product

\[ \]

Quantity

\[ 1 \]

Total: 100000

# **42\. User nhập product**

product =

"Keyboard"

PricePreview không cần product.

Nó chỉ subscribe:

quantity

Mental:

product thay đổi

↓

PricePreview không quan tâm product

Đây chính là ý tưởng của việc subscription có phạm vi rõ ràng.

# **43\. User đổi quantity**

1 → 3

useWatch nhận:

quantity = 3

PricePreview render:

total

\=

3 × 100000

\=

300000

UI:

Total: 300000

# **44\. User click Set Quantity = 5**

Event handler:

setValue(

"quantity",

5,

{

shouldDirty: true

}

);

Flow:

Click

↓

setValue

↓

quantity = 5

↓

RHF cập nhật field

↓

useWatch đang subscribe quantity

↓

PricePreview nhận 5

↓

render

↓

Total = 500000

Bạn thấy các API bắt đầu kết nối với nhau rồi.

# **45\. User click Show Product**

Handler:

getValues("product");

Nếu current value:

Keyboard

→ console:

Keyboard

Nhưng getValues() không tạo subscription.

Nó chỉ:

CLICK

↓

READ NOW

↓

"Keyboard"

# **46\. User Submit**

Order

↓

submit event

↓

handleSubmit

↓

validation

↓

onSubmit(data)

Data:

{

product: "Keyboard",

quantity: 5

}

Như vậy:

watch/useWatch

không thay đổi submit flow mà bạn đã học.

Chúng chỉ bổ sung khả năng:

**React UI cần biết một form value thay đổi ngay trong lúc user đang thao tác.**

# **47\. Câu hỏi phỏng vấn: watch() dùng để làm gì?**

Bạn có thể trả lời:

watch is used to subscribe to form values in React Hook Form so the UI can react when those values change.

Ví dụ:

Conditional fields

Live preview

Password strength

Dependent UI

# **48\. Câu hỏi phỏng vấn: getValues() vs watch()**

Câu trả lời rất đẹp:

getValues() reads the current form values without subscribing to their changes, while watch() subscribes to form values so the component can react when they change.

Mental:

getValues

→ READ NOW

watch

→ KEEP WATCHING

# **49\. Câu hỏi phỏng vấn: watch() vs useWatch()**

Bạn có thể trả lời ở mức intern/fresher:

Both can observe form values. watch is provided by useForm and is convenient for observing values in the form component, while useWatch is a dedicated hook that can isolate the subscription/re-render closer to the component that actually needs the value.

Không cần đào sâu internal subscription mechanism hơn mức này lúc này.

# **50\. Những gì cần nhớ sau Lesson 8**

**Một:**

getValues("email")

→ đọc current value.

Không subscribe.

**Hai:**

watch("email")

→ theo dõi email để render logic phản ứng khi email thay đổi.

**Ba:**

watch(\[

"firstName",

"lastName"

\])

→ theo dõi nhiều fields.

**Bốn:**

watch()

→ có thể theo dõi rộng/toàn form, nhưng đừng dùng bừa nếu chỉ cần một field.

**Năm:**

useWatch({

control,

name: "quantity"

})

→ hook chuyên cho subscription và có thể đặt subscription gần component cần value.

**Sáu:**

watch

≠

useEffect

Value chỉ dùng để derive UI thì derive trực tiếp trong render.

**Bảy:**

Nếu chỉ cần data khi submit:

onSubmit(data)

→ không cần watch tất cả field.

# **51\. Câu nhớ của Lesson 8**

FORM VALUE

│

┌────────────┼────────────┐

│ │ │

▼ ▼ ▼

getValues() watch() useWatch()

│ │ │

▼ ▼ ▼

READ NOW SUBSCRIBE SUBSCRIBE

tiện trong gần component

form component cần value

Và ghép với Lesson 7:

RHF FORM

│

┌────────────────┼────────────────┐

│ │ │

▼ ▼ ▼

setValue() getValues() watch()

│ │ │

▼ ▼ ▼

WRITE READ NOW KEEP WATCHING

**getValues() hỏi: "Giá trị bây giờ là gì?" — watch() / useWatch() nói: "Giá trị này thay đổi thì tôi cần biết."**

Sau Lesson 8, các native HTML input như:

&lt;input {...register("name")} /&gt;

đã khá ngon rồi.

Nhưng rồi bạn gặp một component kiểu:

DatePicker

Custom Select

Autocomplete

Material UI Select

React-Select

nó không còn hoạt động đơn giản như native &lt;input&gt; nữa.

Lúc đó register() có thể không phải cách tích hợp phù hợp, và ta cần **Lesson 9 — Controller: khi register() không đủ**.

NHỮNG CÂU HỎI THẮC MẮC VÀ CÂU TRẢ LỜI:

# **11\. Ví dụ Conditional UI**

function RegisterForm() {

const {

register,

watch

} = useForm({

defaultValues: {

accountType: "personal"

}

});

const accountType =

watch("accountType");

return (

&lt;form&gt;

<select

{...register(

"accountType"

)}

\>

&lt;option value="personal"&gt;

Personal

&lt;/option&gt;

&lt;option value="company"&gt;

Company

&lt;/option&gt;

&lt;/select&gt;

{accountType ===

"company" && (

<>

<input

{...register(

"companyName"

)}

placeholder="Company Name"

/>

<input

{...register(

"taxCode"

)}

placeholder="Tax Code"

/>

&lt;/&gt;

)}

&lt;/form&gt;

);

}

với code này tôi nhớ ta sài dirty check nó thay đổi cx dc mà đk:

Đúng là **dirtyFields cũng có thể cho bạn biết accountType đã bị thay đổi**, nhưng nó **không thay thế watch() trong bài toán Conditional UI này**. Hai thằng trả lời **hai câu hỏi khác nhau**.

## **52\. watch và dirtyFields khác bản chất**

Giả sử:

defaultValues: {

accountType: "personal"

}

### **watch("accountType") hỏi:**

**Giá trị hiện tại của accountType là gì?**

const accountType = watch("accountType");

Có thể nhận:

"personal"

hoặc:

"company"

Nên ta làm được:

{accountType === "company" && (

&lt;CompanyFields /&gt;

)}

### **dirtyFields.accountType hỏi:**

**Field accountType có được thay đổi so với trạng thái ban đầu hay không?**

Ví dụ:

dirtyFields.accountType

thường cho ta thông tin kiểu:

true

chứ **không cho biết value hiện tại là "company" hay "personal"**.

# **53\. Ví dụ sẽ thấy ngay vấn đề**

Default:

accountType = "personal"

Ban đầu:

current value = "personal"

watch("accountType")

→ "personal"

dirtyFields.accountType

→ chưa dirty

User đổi:

personal

↓

company

Lúc này:

watch("accountType")

→ "company"

dirtyFields.accountType

→ true

Đến đây nhìn có vẻ cả hai đều dùng được:

{dirtyFields.accountType && (

&lt;CompanyFields /&gt;

)}

và:

{accountType === "company" && (

&lt;CompanyFields /&gt;

)}

**Nhưng ý nghĩa hoàn toàn khác nhau.**

# **54\. Chỉ cần thêm option thứ 3 là thấy sai ngay**

Giả sử:

&lt;select {...register("accountType")}&gt;

&lt;option value="personal"&gt;

Personal

&lt;/option&gt;

&lt;option value="company"&gt;

Company

&lt;/option&gt;

&lt;option value="student"&gt;

Student

&lt;/option&gt;

&lt;/select&gt;

Default:

personal

User chọn:

student

Thì:

dirtyFields.accountType

→ true

Nhưng nếu viết:

{dirtyFields.accountType && (

&lt;CompanyFields /&gt;

)}

thì bạn lại hiện **CompanyFields** 😆

Trong khi current value là:

student

Còn watch:

const accountType =

watch("accountType");

cho:

"student"

nên:

{accountType === "company" && (

&lt;CompanyFields /&gt;

)}

→ false.

Đúng.

# **55\. Kể cả chỉ có 2 option cũng không nên dùng dirty để quyết định UI**

Giả sử chỉ:

personal

company

Bạn có thể thấy:

default = personal

đã thay đổi

→ chắc chắn company

và suy ra từ dirty.

Nhưng đây là kiểu dùng **metadata để đoán value**.

Bạn thực sự muốn hỏi:

Account type **hiện tại có phải company không?**

Thì hãy lấy **value**:

watch("accountType")

chứ không hỏi:

Field này đã thay đổi chưa?

dirtyFields.accountType

Hai câu hỏi khác nhau.

# **56\. Đây chính là khác biệt giữa Value và Form State**

Nhớ Lesson 6:

FORM

│

├── VALUE

│ ↓

│ accountType = "company"

│

└── METADATA

↓

accountType dirty = true

watch():

watch("accountType")

↓

VALUE

↓

"company"

dirtyFields:

dirtyFields.accountType

↓

METADATA

↓

true

Cho nên:

watch

→ "NÓ ĐANG LÀ GÌ?"

dirty

→ "NÓ CÓ BỊ THAY ĐỔI KHÔNG?"

# **57\. Khi nào dirtyFields mới đúng bài toán?**

Ví dụ Edit Profile:

Username

\[ tung \]

Email

\[ <tung@gmail.com> \]

Bạn muốn hiện:

"You have unsaved changes"

khi user sửa gì đó.

→ isDirty rất hợp:

{isDirty && (

&lt;p&gt;You have unsaved changes&lt;/p&gt;

)}

Hoặc muốn biết email có bị chỉnh không:

{dirtyFields.email && (

&lt;span&gt;Email has been modified&lt;/span&gt;

)}

Đây đúng là câu hỏi:

**Field có bị thay đổi không?**

Còn Conditional UI:

Nếu accountType HIỆN TẠI

là "company"

↓

hiện Company Fields

thì:

const accountType =

watch("accountType");

{accountType === "company" && (

&lt;CompanyFields /&gt;

)}

mới đúng bản chất.

# **58\. Câu nhớ cực ngắn**

watch()

→ VALUE

→ "Giá trị hiện tại là gì?"

dirtyFields

→ STATE / METADATA

→ "Field đã thay đổi chưa?"

Vì vậy với:

{accountType === "company" && (...)}

**watch() là đúng tool**, còn dirtyFields không nên dùng để suy ra accountType hiện tại.

Đây cũng chính là lý do Lesson 6 và Lesson 8 tách riêng: **formState mô tả tình trạng của form, còn watch theo dõi dữ liệu của form.**