# ⚡ Quick Start - MetaMask Authentication

## 🎯 5 Phút Setup

### Step 1️⃣: Cấu Hình Admin Wallet (1 phút)

**File**: `frontend/js/auth.js` (dòng 4)

```javascript
// Thay dòng này:
const ADMIN_WALLET_ADDRESS = '0x1234567890123456789012345678901234567890';

// Bằng địa chỉ Ganache của bạn:
const ADMIN_WALLET_ADDRESS = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
```

💡 **Tip**: Lấy địa chỉ từ Ganache account đầu tiên

---

### Step 2️⃣: Khởi Động Ganache (1 phút)

```bash
ganache-cli --p 7545
```

Hoặc dùng Ganache GUI

---

### Step 3️⃣: Khởi Động Frontend (1 phút)

```bash
cd frontend
python -m http.server 8000
```

---

### Step 4️⃣: Import Admin Account vào MetaMask (1 phút)

1. Mở MetaMask
2. Import Account → Private Key
3. Paste private key từ Ganache (account 0)
4. Tạo password

---

### Step 5️⃣: Test Login (1 phút)

1. Truy cập: `http://localhost:8000/login-admin.html`
2. Click "🦊 Kết Nối MetaMask"
3. Chọn imported account
4. ✅ Sẽ redirect vào Admin Dashboard

---

## 🧪 Kiểm Tra

### ✅ Admin Login
```
Kết nối với admin wallet (0x90F8bf...) 
  → Dashboard hiển thị
  → Trang chủ của bạn!
```

### ✅ Student Login
```
Kết nối với wallet khác (không admin)
  → Redirect vào student-info.html
```

### ✅ Access Control
```
Đăng nhập student
→ Truy cập admin/dashboard.html
→ Alert: "Bạn không có quyền"
→ Redirect vào login
```

---

## 🔐 Địa Chỉ Ganache Mặc Định

Nếu sử dụng `ganache-cli --d "seed phrase"`:

```
Account 0: 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1  ← USE THIS FOR ADMIN
Account 1: 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0
Account 2: 0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b
...
```

---

## 📚 Tài liệu Đầy Đủ

Để hiểu chi tiết hơn:
- 📖 `CONFIGURATION_GUIDE.md` - Setup & configuration đầy đủ
- 📋 `CHANGES_SUMMARY.md` - Danh sách thay đổi

---

## ❓ Vấn Đề Thường Gặp

### "MetaMask không tìm thấy"
→ Cài đặt MetaMask extension

### "Ganache network không hiển thị"
→ Tự động thêm, hoặc:
- Network: Ganache Local
- RPC: http://127.0.0.1:7545
- Chain ID: 1337

### "Redirect sai trang"
→ Kiểm tra ADMIN_WALLET_ADDRESS trong auth.js

---

## ✨ Đó là thế!

🎉 Bây giờ bạn đã sử dụng MetaMask để quản lý quyền hạn!

**Tiếp theo**: Khám phá Admin Dashboard để tạo sinh viên & bằng cấp

---

See also: `CONFIGURATION_GUIDE.md` for advanced setup
