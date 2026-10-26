# 🎯 Session 2: Bài 3 - URL Values (Đọc Dữ Liệu Từ Thanh Địa Chỉ URL)

Ứng dụng thực hành chuyên sâu về 3 Hooks quản lý dữ liệu URL trong React Router 6:
1. `useParams()` — Đọc Path Variables / Dynamic Route Parameters (`:city`, `:productId`)
2. `useSearchParams()` — Đọc và Ghi Query String (`?q=keyword&page=2&sort=asc`)
3. `useLocation()` — Kiểm tra đối tượng Location (`pathname`, `search`, `hash`, `state`, `key`)
4. **Spring Boot Mental Model** — So sánh trực quan `useParams` ↔ `@PathVariable`, `useSearchParams` ↔ `@RequestParam`

---

## 🚀 Khởi chạy ứng dụng

```bash
# 1. Di chuyển vào thư mục my-app
cd Session_2_React_Router/Bai3-URL_Values/my-app

# 2. Cài đặt các dependencies
npm install

# 3. Khởi chạy dev server trên Port 3022
npm run dev
```

Mở trình duyệt tại: **http://localhost:3022**

---

## 💡 Cấu trúc các trang Lab
- **Home**: Bản đồ tư duy 3 Hooks, giải phẫu cấu trúc URL (`Origin`, `Pathname`, `Search`, `Hash`).
- **Dynamic Params Lab**: Thử nghiệm `:city` (`/concerts/:city`) và nhiều params (`/shops/:shopId/products/:productId`).
- **Search Params Studio**: Bộ lọc thương mại điện tử thực tế đồng bộ 2 chiều với URL (Search input, Category filter, Sort, Pagination, One-click Copy URL).
- **Location Inspector**: So sánh `window.location` vs `useLocation()`, đo lường route transitions và phân biệt `location.search` vs `useSearchParams()`.
- **Spring Boot Bridge**: Bảng đối chiếu song song mã nguồn React Router và Spring Boot Controller.
- **Architect Quiz**: 5 câu hỏi sát hạch phỏng vấn Senior Frontend Engineer.
