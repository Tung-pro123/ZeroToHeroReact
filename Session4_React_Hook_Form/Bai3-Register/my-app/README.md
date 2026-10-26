# 🎯 Session 4: Bài 3 - register() — Đăng Ký Input

Ứng dụng thực hành mổ xẻ chuyên sâu về hàm `register()` trong React Hook Form:
1. Giải mã bản chất cú pháp spread: `<input {...register("email")} />`.
2. Mổ xẻ 4 thuộc tính cốt tử do `register()` trả về: `name`, `onChange`, `onBlur`, `ref`.
3. Cấu trúc dữ liệu lồng nhau (Nested data path): `register("user.profile.name")`.
4. Cạm bẫy kiểu dữ liệu số trong HTML `<input type="number">` và giải pháp `valueAsNumber: true`.
5. Cảnh báo cạm bẫy ghi đè (Override Trap) khi tự viết `onChange` sau cú pháp spread.

---

## 🚀 Khởi chạy ứng dụng

```bash
# 1. Di chuyển vào thư mục my-app
cd Session4_React_Hook_Form/Bai3-Register/my-app

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Khởi chạy dev server trên Port 3043
npm run dev
```

Mở trình duyệt tại: **http://localhost:3043**
