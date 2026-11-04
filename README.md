# Test-app — Todo App

Ứng dụng quản lý công việc (todo) viết bằng React + Vite.

## Tính năng

- Thêm công việc mới (nhấn Enter hoặc nút **Thêm**)
- Đánh dấu xong / chưa xong, hoặc đánh dấu tất cả cùng lúc
- Nhấp đúp vào một công việc để sửa (Enter để lưu, Esc để huỷ)
- Xoá từng công việc, hoặc xoá hết các việc đã xong
- Lọc: Tất cả / Chưa xong / Đã xong
- Tự lưu vào `localStorage`, nên tải lại trang không mất dữ liệu
- Hỗ trợ giao diện sáng/tối theo hệ điều hành

## Chạy dự án

```bash
npm install
npm run dev      # chạy server phát triển tại http://localhost:5173
npm run build    # build bản production vào thư mục dist/
npm run preview  # xem thử bản build
npm run lint     # kiểm tra code bằng ESLint
```
