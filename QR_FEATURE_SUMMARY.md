# Tính Năng QR Chia Sẻ Thông Tin Sinh Viên - Tóm Tắt Thay Đổi

**Ngày**: 2026-03-13  
**Mục tiêu**: Cho phép sinh viên/admin tạo mã QR để chia sẻ thông tin công khai mà không cần MetaMask

---

## 📋 Các Tệp/Thư Mục Thay Đổi

### ✅ Tệp Mới Tạo

#### 1. `frontend/view-student-profile.html` - Trang Xem Công Khai
- **Mục đích**: Hiển thị thông tin sinh viên công khai (không cần đăng nhập MetaMask)
- **Tính năng**:
  - Lấy student ID từ URL parameter (`?id=STUDENT_ID`)
  - Kết nối Web3 read-only đến Ganache
  - Hiển thị thông tin cá nhân, bảng điểm, bằng cấp
  - UI thân thiện, responsive, không cần authentication
- **Đặc điểm**:
  - Không lưu trữ dữ liệu trên server (read-only từ blockchain)
  - Tự động format dữ liệu từ smart contract
  - Loading state, error handling

#### 2. `frontend/js/qrcode.js` - Logic Tạo Mã QR
- **Mục đích**: Xử lý logic tạo, hiển thị, tải xuống mã QR
- **Hàm chính**:
  - `generateStudentQRCode(studentId, studentName)` - Tạo QR code
  - `showQRModal(...)` - Hiển thị modal với QR code
  - `downloadQRCode(...)` - Tải xuống ảnh QR
  - `copyToClipboard(...)` - Sao chép link công khai
- **Pub API**:
  - Dùng goQR.me API để tạo QR code (300x300 pixels)

---

### 📝 Tệp Đã Cập Nhật

#### 1. `frontend/admin/students.html`
- **Thay đổi**: Thêm `<script src="../js/qrcode.js"></script>`
- **Lý do**: Load thư viện QR code helper

#### 2. `frontend/js/app.js` - Hàm `loadStudents()`
- **Thay đổi**:
  - Thêm cột "Hành động" vào bảng sinh viên
  - Thêm nút "📲 Tạo QR" cho mỗi sinh viên
  - Nút gọi `generateStudentQRCode(studentId, studentName)`

---

## 🎯 Quy Trình Sử Dụng

### Admin Tạo QR (3 Bước)
```
1. Vào /admin/students.html
2. Nhấp "Tải Danh Sách" 
3. Nhấp "📲 Tạo QR" cạnh sinh viên cần → Modal hiện lên
   └─ Hiển thị QR code
   └─ Link công khai: http://localhost:8000/view-student-profile.html?id=STUDENT_ID
   └─ Nút "Tải Xuống" hoặc "Sao Chép Link"
```

### Nhà Tuyển Dụng Xem Thông Tin (2 Cách)
```
Cách 1: Quét QR bằng điện thoại
  → Link tự động mở → Hiển thị thông tin sinh viên (không cần login)

Cách 2: Click link hoặc paste vào browser
  → Trực tiếp xem thông tin
```

---

## 🔒 Bảo Mật

- ✅ **Công khai**: Dữ liệu trên blockchain là công khai
- ✅ **Read-Only**: Trang view chỉ đọc dữ liệu, không sửa
- ✅ **Không Server**: Không lưu trữ dữ liệu trên server
- ✅ **Kiểm soát**: Admin quyết định tạo QR hay không

---

## 🧪 Cách Test

### 1. Chuẩn Bị
```bash
# Đảm bảo Ganache đang chạy (port 7545)
# Ensure smart contract đã deploy

# Tạo test students (nếu chưa có)
node scripts/create_test_students.js
```

### 2. Tạo QR
```
1. Mở http://localhost:8000/admin/students.html
2. Login với admin account
3. Nhấp "Tải Danh Sách"
4. Tìm sinh viên → Nhấp "📲 Tạo QR"
5. Modal hiện → Copy link hoặc tải QR
```

### 3. Test View Công Khai
```
1. Mở link từ QR hoặc paste vào browser:
   http://localhost:8000/view-student-profile.html?id=123456

2. Trang sẽ:
   - Tự động load dữ liệu từ blockchain
   - Hiển thị thông tin sinh viên
   - Không yêu cầu đăng nhập MetaMask
```

### 4. Test QR Code
```
1. Tải xuống QR code từ modal
2. Dùng điện thoại quét
3. Link sẽ mở, hiển thị thông tin sinh viên
```

---

## 📱 Link Công Khai Format

```
BASE: http://localhost:8000/view-student-profile.html?id=STUDENT_ID

Ví dụ:
- http://localhost:8000/view-student-profile.html?id=1
- http://localhost:8000/view-student-profile.html?id=123456
- http://localhost:8000/view-student-profile.html?id=999
```

---

## ✨ Thêm Vào Tương Lai (Optional)

Nếu muốn mở rộng tính năng:
- [ ] Thêm password/PIN bảo vệ QR
- [ ] Tạo shortlink (QR nhỏ hơn)
- [ ] Lưu history QR được tạo
- [ ] Email/SMS gửi link cho sinh viên
- [ ] Analytics - theo dõi ai xem thông tin
- [ ] Thêm digital signature để verify authentic

---

## 🎓 Tài Liệu

Xem chi tiết: **[README_QR_FEATURE.md](./README_QR_FEATURE.md)**

Hướng dẫn sử dụng chi tiết cho admin và nhà tuyển dụng.

---

**Status**: ✅ Hoàn Thành & Sẵn Test  
**Thay Đổi Ghi**: 13-03-2026
