# 📲 Hướng Dẫn Tính Năng Mã QR Chia Sẻ Thông Tin Sinh Viên

## 🎯 Giới Thiệu

Tính năng mã QR cho phép **admin tạo mã QR cho từng sinh viên**, nhà tuyển dụng có thể **quét mã QR bằng điện thoại để xem thông tin sinh viên mà không cần đăng nhập MetaMask**.

### ✨ Lợi Ích
- ✅ Sinh viên có thể chia sẻ thông tin qua mã QR
- ✅ Nhà tuyển dụng quét QR để xem thông tin (không cần ví blockchain)
- ✅ Bảo tồn quyền riêng tư - chỉ chia sẻ thông tin sinh viên chi định
- ✅ Linh hoạt - có thể tạo, tải xuống, hoặc sao chép link

---

## 🚀 Cách Sử Dụng

### 1️⃣ Admin Tạo Mã QR

#### Bước 1: Đăng Nhập Admin Panel
- Truy cập trang admin: `/admin/students.html`
- Đăng nhập bằng tài khoản admin

#### Bước 2: Xem Danh Sách Sinh Viên
- Nhấp nút "Tải Danh Sách" để xem danh sách tất cả sinh viên
- Tìm sinh viên cần tạo QR

#### Bước 3: Tạo Mã QR
- Nhấp nút **📲 Tạo QR** ở cột "Hành động" của sinh viên
- Một modal sẽ hiện lên với:
  - 📸 Mã QR (300x300 pixels)
  - 🔗 Link công khai đầy đủ
  - 📥 Nút tải xuống mã QR (PNG)
  - 📋 Nút sao chép link

#### Bước 4: Chia Sẻ QR
- **In mã QR**: Nhấp "📥 Tải Xuống" và in ảnh
- **Chia sẻ link trực tiếp**: Nhấp "📋 Sao Chép Link" và gửi đến những người dùng

---

### 2️⃣ Nhà Tuyển Dụng Quét Mã QR

#### Cách 1: Quét QR Bằng Điện Thoại
1. Mở ứng dụng camera hoặc quét QR
2. Quét mã QR
3. Link sẽ mở trang xem thông tin sinh viên
4. Xem thông tin chi tiết (không cần đăng nhập)

#### Cách 2: Truy Cập Link Trực Tiếp
1. Nha tuyển dụng nhận link từ sinh viên
2. Dán link vào trình duyệt
3. Trang sẽ hiển thị thông tin sinh viên ngay lập tức

---

## 📋 Dữ Liệu Được Chia Sẻ

Khi quét QR, nhà tuyển dụng sẽ thấy:

### Thông Tin Cá Nhân
- ✅ Mã số sinh viên
- ✅ Họ tên
- ✅ Ngày sinh
- ✅ Ngành học
- ✅ Năm nhập học
- ✅ Địa chỉ ví (rút gọn)

### Bảng Điểm
- ✅ Tên môn học
- ✅ Học kỳ
- ✅ Điểm số

### Bằng Cấp & Chứng Chỉ
- ✅ Loại bằng
- ✅ Tổ chức cấp
- ✅ Ngày cấp
- ✅ Trạng thái (hiệu lực hoặc bị thu hồi)

---

## 🔒 Bảo Mật & Quyền Riêng Tư

### ✅ An Toàn
- Dữ liệu được lấy trực tiếp từ blockchain (public read)
- Không cần đăng nhập hay xác thực
- Không lưu trữ dữ liệu trên server

### 🛡️ Kiểm Soát
- Admin kiểm soát việc tạo QR
- Chỉ chia sẻ dữ liệu công khai
- Sinh viên có thể yêu cầu không chia sẻ

### ⚠️ Lưu Ý
- Dữ liệu trên blockchain là **công khai**
- Bất kỳ ai đoán được student ID cũng có thể xem thông tin
- Nếu cần bảo mật cao hơn, sử dụng trang `/student-info.html` (yêu cầu đăng nhập metamask)

---

## 🔧 Thông Tin Kỹ Thuật

### Cấu Trúc URL
```
http://localhost:8000/view-student-profile.html?id=STUDENT_ID
```

**Ví dụ:**
```
http://localhost:8000/view-student-profile.html?id=123456
```

### API QR Code
- Dùng dịch vụ **goQR.me** (https://api.qrserver.com)
- QR code được sinh động (không lưu trữ)
- Hỗ trợ kích thước từ 100x100 đến 1000x1000 pixels

### Tệp Liên Quan
- `frontend/view-student-profile.html` - Trang xem công khai
- `frontend/js/qrcode.js` - Logic tạo QR
- `frontend/admin/students.html` - Admin panel

---

## ❓ Câu Hỏi Thường Gặp

### Q: Làm sao biết QR code có hợp lệ không?
A: Quét QR code, nếu hiển thị thông tin sinh viên đúng là hợp lệ.

### Q: Có thể tạo QR cho bất kỳ AI không?
A: Không, chỉ admin mới có thể tạo QR từ admin panel.

### Q: Dữ liệu có bị độc không?
A: Dữ liệu được lấy trực tiếp từ blockchain, không qua server nên an toàn.

### Q: Có thể hủy/config QR không?
A: Không có cách hủy QR riêng. Nếu không muốn chia sẻ, đơn giản là không tạo QR.

### Q: Có thể thay đổi dữ liệu hiển thị không?
A: Dữ liệu phụ thuộc vào smart contract. Admin có thể cập nhật thông tin sinh viên, QR sẽ tự động hiển thị dữ liệu mới.

### Q: QR code có hết hạn không?
A: Không hết hạn, miễn là dữ liệu trên blockchain vẫn tồn tại.

---

## 📞 Liên Hệ & Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra kết nối Ganache/Ethereum
2. Đảm bảo smart contract đã deploy
3. Kiểm tra lại student ID có chính xác không
4. Xem console browser để debug lỗi

---

**Tài liệu này được cập nhật lần cuối: 2026**
