# ✅ Checklist Test - Tính Năng Mã QR

## 📋 Pre-requisites
- [ ] Ganache đang chạy (http://127.0.0.1:7545)
- [ ] Smart contract đã deploy
- [ ] MetaMask đã cài đặt & kết nối
- [ ] Admin account đã setup
- [ ] Có ít nhất 1 sinh viên trong hệ thống

---

## 🧪 Test Cases

### 1. GET Admin Panel
```
[ ] Mở: http://localhost:8000/admin/students.html
[ ] Trang load không lỗi
[ ] Có nút "Tải Danh Sách"
[ ] Sidebar/Navigation hiển thị đúng
```

### 2. Tạo Test Students
```
[ ] Chạy script: node scripts/create_test_students.js
[ ] Hoặc tạo thủ công qua admin panel
[ ] Tối thiểu 2-3 sinh viên để test
```

### 3. Load Students List
```
[ ] Nhấp "Tải Danh Sách"
[ ] Bảng sinh viên hiển thị
[ ] Mỗi sinh viên có nút "📲 Tạo QR"
[ ] Không có lỗi console (F12 > Console)
```

### 4. Generate QR Code
```
[ ] Nhấp "📲 Tạo QR" cạnh sinh viên
[ ] Modal hiện lên với:
  [ ] Tiêu đề sinh viên (họ tên)
  [ ] Hình ảnh QR code (300x300)
  [ ] Link công khai đầy đủ
  [ ] Nút "📥 Tải Xuống"
  [ ] Nút "📋 Sao Chép Link"
  [ ] Nút "Đóng"
```

### 5. Copy Link
```
[ ] Nhấp "📋 Sao Chép Link"
[ ] Alert hiện "✅ Đã sao chép link"
[ ] Paste link vào notepad/editor:
  ✓ http://localhost:8000/view-student-profile.html?id=STUDENT_ID
```

### 6. Download QR
```
[ ] Nhấp "📥 Tải Xuống"
[ ] File PNG được tải xuống
[ ] Tên file: student-STUDENT_ID-qr.png
[ ] Ảnh QR có thể xem được
```

### 7. View Public Profile (via Link)
```
[ ] Paste link vào browser:
  http://localhost:8000/view-student-profile.html?id=STUDENT_ID
[ ] Trang load không yêu cầu MetaMask
[ ] Hiển thị:
  [ ] Header xanh với tên sinh viên
  [ ] Thông tin cá nhân (MSSV, TÊN, ngày sinh, ngành, năm nhập)
  [ ] Bảng điểm (nếu có)
  [ ] Bằng cấp (nếu có)
[ ] Không có nút MetaMask connect
```

### 8. Error Handling - Invalid Student ID
```
[ ] Truy cập: view-student-profile.html?id=99999
[ ] Trang hiển thị error: "Sinh viên không tồn tại"
[ ] Nút "Tải Lại Trang"
```

### 9. Error Handling - No ID
```
[ ] Truy cập: view-student-profile.html (không có ?id)
[ ] Trang hiển thị error: "Không tìm thấy mã số sinh viên"
```

### 10. QR Code Scan (Mobile)
```
[ ] Tải xuống QR hoặc copy link
[ ] Mở mã QR bằng điện thoại
[ ] Quét QR bằng ứng dụng camera/QR reader
[ ] Link tự động mở, hiển thị thông tin sinh viên
```

### 11. Multiple QRs
```
[ ] Tạo QR cho 3-4 sinh viên khác nhau
[ ] Mỗi QR trỏ đến đúng sinh viên
[ ] Không có cross-reference (QR sinh viên A trỏ sinh viên B)
```

### 12. Browser Compatibility
```
Kiểm tra trên các trình duyệt:
[ ] Chrome
[ ] Firefox
[ ] Edge
[ ] Safari (nếu có)
```

---

## 🔍 Console Check

Mở Developer Tools (F12):

### Khi tạo QR:
```
[ ] Không có error liên quan đến qrcode.js
[ ] URL sinh động đúng format
```

### Khi view profile:
```
[ ] Không có lỗi kết nối Web3
[ ] Dữ liệu load từ contract thành công
[ ] Không có 404 cho view-student-profile.html
```

---

## 🎯 Regression Tests

Đảm bảo không có tác động tiêu cực:

```
[ ] Admin login vẫn hoạt động
[ ] Students list vẫn load đúng
[ ] Grades panel hoạt động bình thường
[ ] Degrees panel hoạt động bình thường
[ ] Verify-degree trang hoạt động
[ ] Student-info trang hoạt động (yêu cầu MetaMask)
```

---

## 📝 Bug Reports Template

Nếu phát hiện lỗi, ghi lại:

```
**Title**: [Brief description]
**Steps to Reproduce**:
1. ...
2. ...
3. ...

**Expected Result**: 
...

**Actual Result**:
...

**Console Error**: 
[Paste error from F12 console]

**Files Affected**:
- ...

**Priority**: [High/Medium/Low]
```

---

## ✨ Additional Tests (Optional)

```
[ ] Test với Ganache on different port
[ ] Test URL encode cho special characters
[ ] Test multiple QR generations từ switch student
[ ] Test modal close bằng ESC key (nếu support)
[ ] Test responsive design trên mobile screen
```

---

## 📊 Test Summary

Date: ______________  
Tester: ______________  
Total Tests: _____ / _____ ✅  
Failed: _____ ❌  
Status: [ ] PASS [ ] FAIL  

**Notes**:
```
__________________________________
__________________________________
__________________________________
```

---

**Checklist này phải được hoàn thành trước khi merge code vào production.**
