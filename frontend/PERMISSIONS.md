# Hệ thống Phân quyền (Authorization System)

## 📋 Tổng quan
Hệ thống web hiện nay được chia ra thành các va vai trò (roles) với quyền hạn khác nhau:

## 👥 Các vai trò

### 1. **Admin** (Quản trị viên)
- **Yêu cầu:** Đăng nhập bằng tài khoản và mật khẩu
- **Quyền:**
  - ✅ Thêm sinh viên
  - ✅ Thêm điểm số
  - ✅ Cấp bằng cấp
  - ✅ Thu hồi bằng cấp
  - ✅ Xem danh sách sinh viên
  - ✅ Xem điểm số
  - ✅ Xem bằng cấp

### 2. **Nhà tuyển dụng** (Employer)
- **Yêu cầu:** Không cần đăng nhập
- **Quyền:**
  - ✅ Xác minh bằng cấp
  - Chỉ có thể xem/tra cứu thông tin công khai

### 3. **Sinh viên** (Student)
- **Yêu cầu:** Không cần đăng nhập
- **Quyền:**
  - ✅ Xác minh bằng cấp
  - Chỉ có thể xem/tra cứu thông tin công khai

### 4. **Khách** (Guest)
- **Yêu cầu:** Không cần đăng nhập
- **Quyền:**
  - ✅ Xem trang chủ
  - ✅ Xác minh bằng cấp

## 🔐 Đăng nhập Admin

### Tài khoản Demo:
- **Tên đăng nhập:** `admin`
- **Mật khẩu:** `admin@123`

### Cách đăng nhập:
1. Nhấp vào nút "Đăng nhập Admin" trên trang chủ
2. Hoặc truy cập: `frontend/login-admin.html`
3. Nhập tên đăng nhập và mật khẩu
4. Nhấp "Đăng nhập"
5. Sẽ chuyển hướng đến bảng điều khiển Admin

## 🔒 Quản lý Phiên (Session)

### Thời gian hết hạn:
- Phiên Admin có thời hạn **8 giờ**
- Sau khi hết hạn, bạn sẽ cần đăng nhập lại

### Đăng xuất:
- Nhấp nút "Đăng xuất" trong bảng điều khiển Admin
- Hoặc xóa dữ liệu lưu trữ (localStorage)

## 📁 Các trang

### Trang công khai (không cần đăng nhập):
- `/index.html` - Trang chủ
- `/verify-degree.html` - Xác minh bằng cấp

### Trang quản lý (cần đăng nhập Admin):
- `/admin/dashboard.html` - Bảng điều khiển
- `/admin/students.html` - Quản lý sinh viên
- `/admin/grades.html` - Quản lý điểm số
- `/admin/degrees.html` - Quản lý bằng cấp

## 🛡️ Bảo mật

### Cách hoạt động:
1. Tất cả phiên được lưu trữ trong `localStorage` của trình duyệt
2. Mỗi yêu cầu truy cập trang Admin đều được kiểm tra
3. Nếu không có phiên hợp lệ, sẽ chuyển hướng đến trang đăng nhập
4. Các nút "Thêm/Sửa/Xóa" được kiểm tra quyền trước khi thực hiện

### Thay đổi mật khẩu:
- **Để thay đổi mật khẩu Admin**, chỉnh sửa file `frontend/js/auth.js`
- Tìm dòng: `const ADMIN_PASSWORD = 'admin@123';`
- Thay đổi giá trị thành mật khẩu mới

```javascript
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'mật_khẩu_mới'; // Thay đổi tại đây
```

## 📝 Ví dụ sử dụng

### Sinh viên xem bằng cấp:
1. Truy cập `verify-degree.html`
2. Nhập mã số bằng cấp
3. Hệ thống sẽ hiển thị thông tin bằng (nếu hợp lệ)
4. **Không cần đăng nhập**

### Admin thêm sinh viên:
1. Đăng nhập tại `login-admin.html`
2. Vào `admin/students.html`
3. Điền thông tin sinh viên
4. Nhấp "Thêm Sinh viên"
5. **Yêu cầu**: Phải là Admin để thực hiện

### Nhà tuyển dụng xác minh bằng:
1. Truy cập `verify-degree.html`
2. Nhập mã số bằng cấp
3. Kiểm tra tính hợp lệ trên blockchain
4. **Không cần đăng nhập**

## 🔧 Tùy chỉnh

### Thêm vai trò mới:
```javascript
// Trong frontend/js/auth.js
const ROLES = {
    ADMIN: 'admin',
    STUDENT: 'student',
    EMPLOYER: 'employer',
    // Thêm role mới ở đây
    NEW_ROLE: 'new_role'
};
```

### Thêm hàm kiểm tra quyền:
```javascript
function canDoSomething() {
    return hasRole(ROLES.ADMIN); // Chỉ Admin mới được phép
}
```

## ⚠️ Lưu ý quan trọng

1. **Bảo mật:** 
   - Không công khai mật khẩu Admin trên công khai
   - Trong môi trường production, nên sử dụng backend authentication

2. **LocalStorage:**
   - Dữ liệu phiên được lưu trữ trong localStorage
   - Người dùng có thể xóa để đăng xuất

3. **Thời gian hết hạn:**
   - Phiên tự động hết hạn sau 8 giờ
   - Có thể thay đổi trong `frontend/js/auth.js`

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console (F12) để xem lỗi
2. Xóa localStorage và đăng nhập lại
3. Kiểm tra mật khẩu Admin trong `auth.js`
