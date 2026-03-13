# 🎓 Hệ Thống Quản Lý Bằng Cấp Blockchain - Hướng Dẫn Sử Dụng

## 📋 Mục Lục
1. [Giới Thiệu](#giới-thiệu)
2. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
3. [Hướng Dẫn Cài Đặt](#hướng-dẫn-cài-đặt)
4. [Hướng Dẫn Sử Dụng Admin](#hướng-dẫn-sử-dụng-admin)
5. [Hướng Dẫn Sử Dụng Sinh Viên](#hướng-dẫn-sử-dụng-sinh-viên)
6. [Hướng Dẫn Xác Minh Bằng](#hướng-dẫn-xác-minh-bằng)
7. [Câu Hỏi Thường Gặp](#câu-hỏi-thường-gặp)

---

## 🎯 Giới Thiệu

**Hệ Thống Quản Lý Bằng Cấp Blockchain** là nền tảng số hóa hoàn toàn dựa trên công nghệ blockchain để quản lý và xác minh bằng cấp sinh viên một cách **an toàn, minh bạch và không thể giả mạo**.

### Tính Năng Chính:
- ✅ **Quản lý sinh viên**: Thêm, cập nhật thông tin sinh viên
- ✅ **Quản lý điểm số**: Ghi nhận điểm số từng môn, từng học kỳ
- ✅ **Cấp bằng cấp**: Cấp bằng với mã số **8 chữ số random** độc nhất vô nhị
- ✅ **Thu hồi bằng**: Chỉ Admin mới có thể thu hồi bằng đã cấp
- ✅ **Xác minh bằng**: Công khai xác minh tính hợp lệ của bằng cấp
- ✅ **Lưu trữ trên Blockchain**: Dữ liệu không thể chỉnh sửa hoặc xóa được

---

## 💻 Yêu Cầu Hệ Thống

### Phần Cứng
- Máy tính / Laptop với kết nối internet
- RAM tối thiểu 2GB
- Ổ cứng trống 500MB

### Phần Mềm
- **Trình duyệt web**: Chrome, Firefox, Edge hoặc Safari (bản mới nhất)
- **MetaMask**: Ví điện tử Ethereum - Tải tại https://metamask.io
- **Node.js & npm** (để chạy developers): Tải tại https://nodejs.org

### Cài đặt MetaMask (Bắt Buộc)
1. Truy cập https://metamask.io
2. Nhấn **"Download"** và chọn trình duyệt của bạn
3. Nhấn **"Add to Chrome"** (hoặc trình duyệt tương ứng)
4. Nhấn **"Add Extension"**
5. Hoàn tất quá trình cài đặt

---

## 🚀 Hướng Dẫn Cài Đặt

### Bước 1: Thiết Lập Blockchain (Ganache)
```bash
# Tải Ganache từ: https://www.trufflesuite.com/ganache
# Sau khi cài đặt, mở Ganache
# - Thiết lập RPC Server: http://127.0.0.1:7545
# - Network ID: 1337
```

### Bước 2: Cải Thiện & Deploy Smart Contract
```bash
# Mở Terminal/PowerShell tại thư mục dự án
cd path/to/BlockChain_QuanLySinhVien/test

# Cài đặt dependencies
npm install

# Deploy smart contract
truffle migrate --reset
```

### Bước 3: Chạy Ứng Dụng Web
```bash
# Cách 1: Dùng Live Server (VS Code)
- Chuột phải vào file index.html → "Open with Live Server"

# Cách 2: Dùng Python
cd frontend
python -m http.server 8000
# Truy cập: http://localhost:8000
```

### Bước 4: Kết Nối MetaMask
1. Mở ứng dụng trong trình duyệt
2. Nhấn **"Kết Nối Ví"** hoặc **"Connect Wallet"**
3. MetaMask sẽ yêu cầu xác nhận → Nhấn **"Kết Nối"**
4. Chọn mạng **Ganache Local** (hoặc thêm nếu chưa tồn tại)

---

## 🔐 Hướng Dẫn Sử Dụng Admin

### Đăng Nhập Admin Panel
1. Truy cập trang chủ, nhấn **"Admin Login"**
2. Nhập thông tin:
   - **Tên đăng nhập**: `admin`
   - **Mật khẩu**: `admin@123`
3. Nhấn **"Đăng Nhập"** → Chuyển hướng đến Admin Dashboard

### 1️⃣ Quản Lý Sinh Viên

#### Thêm Sinh Viên Mới
1. Vào **Admin Panel → Sinh Viên**
2. Điền form **"Thêm Sinh Viên Mới"**:
   - **Mã số Sinh viên**: 001 (không được trùng)
   - **Họ và Tên**: Nguyễn Văn A
   - **Ngày Sinh**: 01/01/2000
   - **Ngành học**: Công Nghệ Thông Tin
   - **Năm Nhập học**: 2022
   - **Địa chỉ Ví**: 0x123... (địa chỉ MetaMask của sinh viên)
3. Nhấn **"Thêm Sinh viên"**

#### Xem Danh Sách Sinh Viên
1. Nhấn **"Tải Danh Sách Sinh Viên"**
2. Bảng hiển thị tất cả sinh viên đã thêm

### 2️⃣ Quản Lý Điểm Số

#### Thêm Điểm
1. Vào **Admin Panel → Điểm Số**
2. Điền form **"Thêm Điểm"**:
   - **Mã số Sinh viên**: 001
   - **Môn học**: Lập Trình Java
   - **Học kỳ**: Học Kỳ 1
   - **Điểm**: 85
3. Nhấn **"Thêm Điểm"**

#### Xem Điểm
1. Nhập **Mã số Sinh viên** trong form **"Xem Điểm"**
2. Nhấn **"Xem Điểm"**
3. Bảng hiển thị tất cả môn học và điểm tương ứng

### 3️⃣ Quản Lý Bằng Cấp

#### Cấp Bằng
1. Vào **Admin Panel → Bằng Cấp**
2. Điền form **"Cấp Bằng"**:
   - **Mã số Sinh viên**: 001
   - **Loại Bằng**: Cử Nhân Công Nghệ Thông Tin
   - **Tổ chức Cấp bằng**: Đại Học XYZ
3. Nhấn **"Cấp Bằng"**

**📌 Quan trọng**: 
- Hệ thống sẽ **tự động tạo mã bằng 8 chữ số** (VD: `45782193`)
- **Thông báo sẽ hiển thị mã bằng** - Vui lòng lưu lại!
- Nhấn **"Sao chép"** để sao chép mã vào clipboard

#### Thu Hồi Bằng
1. Nhập **Mã số Bằng** (8 chữ số) trong form **"Thu hồi Bằng"**
   - Hoặc nhấn **"Sao chép"** từ bảng Xem Bằng ở dưới
2. Nhấn **"Thu hồi Bằng"**
3. Bằng sẽ được đánh dấu là **"Đã thu hồi"** và không còn hợp lệ

#### Xem Bằng Sinh Viên
1. Nhập **Mã số Sinh viên**
2. Nhấn **"Xem Bằng"**
3. Bảng hiển thị:
   - 🔑 Mã bằng (8 chữ số)
   - Loại bằng
   - Tổ chức cấp
   - Trạng thái (Hợp lệ/Đã thu hồi)
4. Nhấn **"Sao chép"** để sao chép mã bằng tự động vào form Thu hồi

#### Lịch Sử Cấp Gần Đây
1. Nhấn **"📋 Lịch sử cấp gần đây"**
2. Xem toàn bộ bằng vừa cấp với chi tiết

---

## 👨‍🎓 Hướng Dẫn Sử Dụng Sinh Viên

### Truy Cập Trang Sinh Viên

#### Cách 1: Từ Trang Chủ
1. Truy cập trang chủ ứng dụng
2. Nhấn **"👤 Tra Cứu Sinh Viên"** hoặc **"Student Info"**

#### Cách 2: URL Trực Tiếp
- Truy cập: `http://localhost:8000/frontend/student-info.html`

### Xem Thông Tin Cá Nhân
1. Nhập **Mã số Sinh viên** (VD: 001)
2. Nhấn **"Tra Cứu"**
3. Xem thông tin:
   - Họ tên
   - Ngày sinh
   - Ngành học
   - Năm nhập học
   - Địa chỉ ví

### Xem Kết Quả Học Tập
1. Nhập **Mã số Sinh viên**
2. Nhấn **"Xem Điểm"**
3. Xem bảng điểm chi tiết từng môn, từng học kỳ

### Xem Bằng Cấp Cá Nhân
1. Nhập **Mã số Sinh viên**
2. Nhấn **"Xem Bằng Cấp"**
3. Xem danh sách bằng đã cấp:
   - Mã bằng (8 chữ số)
   - Loại bằng
   - Tổ chức cấp
   - Trạng thái

---

## ✅ Hướng Dẫn Xác Minh Bằng

### Ai Có Thể Xác Minh?
- ✓ Nhà tuyển dụng
- ✓ Các tổ chức kiểm chứng
- ✓ Bất kỳ ai có mã bằng

### Quy Trình Xác Minh

#### Bước 1: Truy Cập Trang Xác Minh
1. Truy cập trang chủ
2. Nhấn **"🔍 Xác Minh Bằng"** hoặc **"Verify Degree"**

#### Bước 2: Lấy Mã Bằng
Mã bằng là dãy **8 chữ số** (VD: `12345678`)

Cách lấy mã:
- **Cách 1**: Admin cấp bằng sẽ thông báo mã ngay
- **Cách 2**: Sinh viên xem trong phần "Xem Bằng Cấp"
- **Cách 3**: Admin xem trong "Xem Bằng Sinh viên"

#### Bước 3: Nhập Mã & Xác Minh
1. Nhập **Mã số Bằng** (8 chữ số)
2. Nhấn **"Xác Minh"**
3. Xem kết quả:

**✅ Nếu Bằng Hợp Lệ:**
```
Bằng hợp lệ ✓
├─ Mã số bằng: 45782193
├─ Mã số sinh viên: 001
├─ Loại bằng: Cử Nhân CNTT
├─ Ngày cấp: 12/03/2026
└─ Tổ chức cấp: Đại Học XYZ
```

**❌ Nếu Bằng Không Hợp Lệ:**
```
Bằng không hợp lệ ✗
- Bằng đã bị thu hồi hoặc không tồn tại
```

---

## ❓ Câu Hỏi Thường Gặp

### ❓ Mã bằng là gì?
**Trả lời**: Mã bằng là một dãy **8 chữ số random** độc nhất vô nhị được tạo tự động khi Admin cấp bằng. VD: `12345678`, `45782193`, v.v.

### ❓ Làm sao để lấy mã bằng?
**Trả lời**: 
- Admin sẽ cấp mã ngay khi cấp bằng (hiển thị trong thông báo)
- Hoặc xem trong "Admin → Bằng Cấp → Xem Bằng Sinh viên"
- Nhấn nút **"Sao chép"** để sao chép mã nhanh

### ❓ Mã bằng có thể thay đổi được không?
**Trả lời**: **KHÔNG**. Mã bằng được lưu trữ trên blockchain và không thể chỉnh sửa hoặc xóa.

### ❓ Nếu quên mã bằng phải làm sao?
**Trả lời**: 
1. Liên hệ với Admin để xem danh sách bằng
2. Hoặc yêu cầu Admin cấp bằng mới

### ❓ Ai có quyền thu hồi bằng?
**Trả lời**: **Chỉ Admin** mới có quyền thu hồi bằng.

### ❓ Bằng bị thu hồi có thể khôi phục được không?
**Trả lời**: **KHÔNG**. Khi bằng bị thu hồi, nó sẽ bị đánh dấu là không hợp lệ vĩnh viễn.

### ❓ Làm sao xác minh bằng của người khác?
**Trả lời**:
1. Yêu cầu người đó cung cấp **mã số bằng** (8 chữ số)
2. Truy cập trang **"Xác Minh Bằng"**
3. Nhập mã bằng
4. Hệ thống trả về kết quả hợp lệ/không hợp lệ

### ❓ Dữ liệu có được lưu trữ an toàn không?
**Trả lời**: **CÓ**. Tất cả dữ liệu được lưu trữ trên **blockchain Ethereum** công khai, bất biến và không thể bị hack hoặc làm mất mát.

### ❓ Làm sao nếu không có MetaMask?
**Trả lời**:
1. Cài đặt MetaMask tại: https://metamask.io
2. Tạo tài khoản mới
3. Kết nối với ứng dụng

### ❓ Cần phải trả tiền để xác minh bằng không?
**Trả lời**: **KHÔNG**. Xác minh bằng hoàn toàn **MIỄN PHÍ** và công khai.

### ❓ Đổi mật khẩu Admin như thế nào?
**Trả lời**: 
- Mật khẩu mặc định: `admin@123`
- Để thay đổi, liên hệ với nhà phát triển
- (Chỉnh sửa trong file `js/auth.js`)

### ❓ Ứng dụng có hoạt động offline được không?
**Trả lời**: **KHÔNG**. Ứng dụng cần kết nối internet để giao tiếp với blockchain Ganache.

---

## 📞 Hỗ Trợ & Liên Hệ

Nếu gặp sự cố hoặc có câu hỏi:
- 📧 Email: support@example.com
- 💬 Chat: https://chat.example.com
- 📱 Hotline: 0xxx-xxx-xxxx

---

## 🔒 Bảo Mật & Lưu Ý

### Quy Tắc An Toàn

⚠️ **QUAN TRỌNG**:
1. **Không chia sẻ seed phrase hoặc private key** của MetaMask
2. **Không cho phép người khác vào ứng dụng Admin**
3. **Lưu mã bằng** ở nơi an toàn nếu cần tra cứu sau
4. **Cập nhật mật khẩu Admin** định kỳ (yêu cầu Dev)
5. **Backup dữ liệu** blockchain định kỳ

### Khuyến Nghị

✅ Nên làm:
- ✓ Sử dụng trình duyệt cập nhật mới nhất
- ✓ Kích hoạt hai yếu tố xác thực (2FA) cho MetaMask
- ✓ Ghi chép lại seed phrase MetaMask ở nơi an toàn
- ✓ Kiểm tra kỹ thông tin trước khi cấp bằng

❌ Không nên làm:
- ✗ Chia sẻ private key MetaMask
- ✗ Cấp bằng sai trên blockchain
- ✗ Để công khai mã bằng chưa xác minh

---

## 📊 Hiểu Về Blockchain

### Blockchain Là Gì?
Blockchain là một cơ sở dữ liệu **phân tán, bất biến và minh bạch**:
- **Phân tán**: Dữ liệu lưu trữ trên nhiều máy tính
- **Bất biến**: Dữ liệu không thể chỉnh sửa hay xóa sau khi tạo
- **Minh bạch**: Mọi giao dịch đều công khai và có thể kiểm chứng

### Tại Sao Dùng Blockchain Cho Bằng Cấp?
1. ✅ **An toàn**: Không thể giả mạo hoặc chỉnh sửa
2. ✅ **Minh bạch**: Mọi người có thể xác minh
3. ✅ **Lâu dài**: Dữ liệu tồn tại vĩnh viễn
4. ✅ **Chi phí thấp**: Không cần tổ chức trung gian
5. ✅ **Tốc độ**: Xác minh nhanh chóng

---

## 📝 Lịch Sử Phiên Bản

### v1.0 (12/03/2026)
- ✅ Quản lý sinh viên
- ✅ Quản lý điểm số
- ✅ Cấp bằng với mã 8 chữ số
- ✅ Thu hồi bằng
- ✅ Xác minh bằng công khai
- ✅ Giao diện TailwindCSS đẹp mắt

---

**© 2026 Blockchain Student Management System · Phiên Bản 1.0**

**Cảm ơn bạn đã sử dụng ứng dụng! 🙏**
