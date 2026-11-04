# Test-app — Học tiếng Anh

Ứng dụng học từ vựng tiếng Anh cho người Việt, viết bằng React + Vite.

## Tính năng

- **5 chủ đề, 50 từ vựng**: Gia đình, Đồ ăn, Động vật, Công việc, Du lịch.
  Mỗi từ có phiên âm IPA, loại từ, nghĩa tiếng Việt và câu ví dụ.
- **Nghe phát âm** 🔊 bằng giọng đọc có sẵn của trình duyệt (Web Speech API).
- **3 chế độ luyện tập** (mỗi lượt 10 từ):
  - 🃏 **Flashcard**: lật thẻ, tự đánh giá "Đã nhớ" / "Chưa nhớ".
    Phím tắt: Space lật thẻ, ← chưa nhớ, → đã nhớ.
  - ✅ **Trắc nghiệm**: 4 lựa chọn, hỏi ngẫu nhiên chiều Anh → Việt hoặc Việt → Anh.
  - ⌨️ **Luyện viết**: xem nghĩa tiếng Việt rồi gõ lại từ tiếng Anh, có nút gợi ý.
- **Theo dõi tiến độ**: mỗi từ có 3 mức nhớ. Trả lời đúng thì lên 1 mức, sai thì về 0.
  Đạt mức 3 là "đã thuộc". Từ có mức nhớ thấp được ưu tiên ôn trước.
  Tiến độ lưu trong `localStorage` của trình duyệt.
- Giao diện sáng/tối theo hệ điều hành, dùng tốt trên điện thoại.

## Chạy dự án

```bash
npm install
npm run dev      # chạy server phát triển tại http://localhost:5173
npm run build    # build bản production vào thư mục dist/
npm run preview  # xem thử bản build
npm run lint     # kiểm tra code bằng ESLint
```

## Thêm từ vựng / chủ đề

Sửa file `src/data/topics.js`. Mỗi từ là một mảng:

```js
['word', '/IPA/', 'n' | 'v' | 'adj', 'nghĩa tiếng Việt', 'Example sentence.']
```

## Cấu trúc thư mục

```
src/
  App.jsx                 điều hướng giữa các màn hình
  data/topics.js          dữ liệu từ vựng
  data/modes.js           danh sách chế độ luyện tập
  lib/progress.js         lưu và tính mức nhớ
  lib/utils.js            xáo trộn, ưu tiên từ, phát âm
  components/             các màn hình và thành phần giao diện
```
