# HƯỚNG DẪN DEBUG VẤN ĐỀ HIỂN THỊ CÂU HỎI

## Bước 1: Kiểm tra ứng dụng cơ bản

Trước tiên, hãy mở file `test_simple.html` để kiểm tra xem ứng dụng có hoạt động cơ bản không:

1. Mở file `test_simple.html` trong trình duyệt
2. Bạn sẽ thấy 2 câu hỏi mẫu được hiển thị đẹp
3. Thử nhấn "Câu tiếp theo" và "Xem đáp án"

Nếu file này hiển thị tốt, vấn đề nằm ở việc parse PDF.

## Bước 2: Debug với PDF thực tế

### Cách mở Developer Tools:
- **Chrome/Edge**: Nhấn F12 hoặc Ctrl+Shift+I
- **Firefox**: Nhấn F12 hoặc Ctrl+Shift+I
- **Safari**: Nhấn Cmd+Option+I

### Các bước debug:

1. **Mở file `newapp.html`** trong trình duyệt
2. **Mở Developer Tools** (F12)
3. **Chuyển sang tab Console**
4. **Tải lên file PDF** của bạn
5. **Quan sát các thông báo trong Console**

### Các thông báo quan trọng cần chú ý:

```
=== BẮT ĐẦU PHÂN TÍCH PDF ===
Độ dài text: [số]
Preview 1000 ký tự đầu: [nội dung]
Sử dụng pattern: [tên pattern]
Tìm thấy [số] khối câu hỏi
```

### Nếu thấy lỗi:
- **"KHÔNG TÌM THẤY CÂU HỎI NÀO!"**: PDF của bạn có định dạng khác với những gì code đang hỗ trợ
- **Lỗi màu đỏ**: Có vấn đề với JavaScript

## Bước 3: Cung cấp thông tin debug

Khi gặp vấn đề, hãy cung cấp:

1. **Screenshot của Console** (chụp màn hình tab Console)
2. **Nội dung text từ Console** (copy/paste)
3. **Mô tả định dạng PDF** của bạn:
   - Có "Question ID" không?
   - Có "ID:" không?
   - Có số thứ tự (1., 2., 3.) không?
   - Đáp án có dạng A., B., C., D. không?

## Bước 4: Test với file mẫu

Tôi đã tạo file `demo_questions.txt` với định dạng mẫu. Bạn có thể:

1. Copy nội dung từ `demo_questions.txt`
2. Tạo file PDF mới với nội dung đó
3. Test với file PDF mẫu này

## Các pattern được hỗ trợ:

1. **Pattern 1**: Question ID + ID + Correct Answer + Rationale
2. **Pattern 2**: ID: + Correct Answer + Explanation  
3. **Pattern 3**: Số thứ tự + câu hỏi + đáp án A, B, C, D
4. **Pattern 4**: Câu hỏi + đáp án + giải thích
5. **Pattern 5**: Dấu chấm hỏi + đáp án

## Ví dụ định dạng được hỗ trợ:

```
Question ID abc12345
ID: def67890
[Đoạn văn]
Câu hỏi?
A. Đáp án A
B. Đáp án B  
C. Đáp án C
D. Đáp án D
Correct Answer: B
Rationale: Giải thích tại sao B đúng
```

Hoặc:

```
1. [Đoạn văn] Câu hỏi?
A. Đáp án A
B. Đáp án B
C. Đáp án C  
D. Đáp án D
Đáp án: B
Giải thích: B là đáp án đúng
```

## Liên hệ hỗ trợ:

Nếu vẫn gặp vấn đề, hãy cung cấp:
1. Screenshot Console
2. Mẫu nội dung PDF (1-2 câu hỏi đầu)
3. Mô tả chi tiết vấn đề gặp phải 