# 🔐 Hướng Dẫn CConfiguration - Xác Thực Dựa Trên MetaMask

## 📋 Thay Đổi Xác Thực (Authentication System Update)

Hệ thống đã được cập nhật từ xác thực username/password sang xác thực dựa trên **Ethereum Wallet Address (MetaMask)**.

### ✨ Tính Năng Mới

✅ **Admin Access** - Một địa chỉ ví được chỉ định làm Admin  
✅ **Student Access** - Tất cả các ví khác sẽ vào trang Student  
✅ **MetaMask Integration** - Kết nối trực tiếp qua MetaMask wallet  
✅ **Auto Routing** - Tự động chuyển hướng dựa trên quyền hạn  

---

## 🔧 SETUP & CONFIGURATION

### Step 1: Cấu Hình Địa Chỉ Admin Wallet

1. Mở file: `frontend/js/auth.js`
2. Tìm dòng:
```javascript
const ADMIN_WALLET_ADDRESS = '0x1234567890123456789012345678901234567890'; // Replace with actual admin wallet
```

3. **Thay thế** `0x1234567890123456789012345678901234567890` bằng địa chỉ Ethereum của bạn
   - Nếu sử dụng Ganache: Sử dụng một trong những account mặc định từ Ganache
   - Nếu sử dụng MetaMask trên Ganache: Import account từ Ganache vào MetaMask

**Ví dụ:**
```javascript
// ❌ Cũ (mặc định)
const ADMIN_WALLET_ADDRESS = '0x1234567890123456789012345678901234567890';

// ✅ Mới (ví dụ thực tế)
const ADMIN_WALLET_ADDRESS = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
```

### Step 2: Kiểm Tra MetaMask Configuration

1. **Cài đặt MetaMask** (nếu chưa có)
   - Chrome: https://chrome.google.com/webstore/detail/metamask
   - Firefox: https://addons.mozilla.org/firefox/addon/ether-metamask/

2. **Kết nối MetaMask với Ganache**
   - Ganache RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337`
   - Website sẽ tự động thêm network nếu chưa có

3. **Import Admin Account vào MetaMask** (nếu sử dụng account Ganache)
   - Lấy Private Key từ Ganache
   - MetaMask → Import Account → Paste Private Key

### Step 3: Khởi Động & Kiểm Tra

1. **Start Ganache**
   ```bash
   ganache-cli --d "your-seed-phrase" --p 7545
   ```

2. **Start Frontend Server**
   ```bash
   cd frontend
   python -m http.server 8000
   # Hoặc: npx http-server
   ```

3. **Truy Cập Hệ Thống**
   - Trang chủ: `http://localhost:8000`
   - Login: `http://localhost:8000/login-admin.html`

4. **Test Login**

   **Scenario 1: Đăng nhập với Admin Wallet**
   - Click "🦊 Kết Nối MetaMask"
   - Chọn admin account từ MetaMask
   - ✅ Sẽ redirect vào `/admin/dashboard.html`

   **Scenario 2: Đăng nhập với Non-Admin Wallet**
   - Click "🔄 Chuyển Ví / Tài Khoản Khác"
   - Chọn account khác từ MetaMask (non-admin)
   - ✅ Sẽ redirect vào `/student-info.html`

---

## 📝 How It Works - Quy Trình Xác Thực

### Luồng Xác Thực (Authentication Flow)

```
┌─────────────────┐
│  User Action    │
│ "Kết Nối        │
│  MetaMask"      │
└────────┬────────┘
         │
         ▼
┌──────────────────────┐
│ connectAndCheckWallet()│
│  Initialize Web3     │
│  Request Accounts    │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│ connectWallet()      │
│ (từ web3.js)         │
│ - Switch to Ganache  │
│ - Get userAccount    │
└────────┬─────────────┘
         │
         ▼
┌───────────────────────────────┐
│ loginWithMetaMask(walletAddr) │
│ (từ auth.js)                  │
│                               │
│ ① Normalize address           │
│ ② Check: isAdminWallet()?     │
│    - YES → role = ADMIN       │
│    - NO  → role = STUDENT     │
│ ③ Save session to localStorage│
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ checkUserRole()              │
│                              │
│ if (role === ADMIN)          │
│   → Redirect to              │
│   /admin/dashboard.html      │
│                              │
│ else (role === STUDENT)      │
│   → Redirect to              │
│   /student-info.html         │
└──────────────────────────────┘
```

### Kiểm Tra Quyền Hạn (Permission Check)

Các hàm xác thực từ `auth.js`:

```javascript
// Kiểm tra xem ví hiện tại có phải admin không
function isAdminWallet(walletAddress) {
    return walletAddress.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();
}

// Đăng nhập với MetaMask
function loginWithMetaMask(walletAddress) {
    // Xác định role
    // Lưu session
    // Trả về kết quả
}

// Kiểm tra admin
function isAdminLoggedIn() {
    const session = getCurrentSession();
    return session && session.role === ROLES.ADMIN;
}

// Bảo vệ trang admin
function protectAdminPage() {
    if (!isAdminLoggedIn()) {
        alert('❌ Bạn không có quyền!');
        window.location.href = '../login-admin.html';
    }
}
```

---

## 🔒 Bảo Mật & Lưu Ý Quan Trọng

### Session Management

- **Session Duration**: 8 hours
- **Storage**: localStorage (trong browser)
- **Logout**: Xóa session khi nhấn "Đăng Xuất"

### Wallet Address Comparison

```javascript
// IMPORTANT: Comparison phải case-insensitive
// Vì Ethereum addresses có thể có chữ hoa/thường khác nhau

// ❌ WRONG:
const isAdmin = walletAddress === ADMIN_WALLET_ADDRESS;

// ✅ CORRECT:
const isAdmin = walletAddress.toLowerCase() === ADMIN_WALLET_ADDRESS.toLowerCase();
```

### Security Considerations

⚠️ **For Development Only**
- Admin address được hard-code trong frontend
- Trong production, admin address nên được lấy từ smart contract hoặc backend

⚠️ **MetaMask Security**
- Người dùng phải ký giao dịch với private key
- Không có cách nào để chiếm quyền admin mà không có private key

⚠️ **Session Expiry**
- Session hết hạn sau 8 hours
- Người dùng cần login lại

---

## 🧪 Testing

### Test Cases

#### Test 1: Admin Login
```
1. Truy cập: http://localhost:8000/login-admin.html
2. Click "🦊 Kết Nối MetaMask"
3. Chọn admin account
4. ✅ Expected: Redirect to /admin/dashboard.html
5. ✅ Verify: Dashboard hiển thị "Admin" trong header
```

#### Test 2: Student Login
```
1. Click "🔄 Chuyển Ví / Tài Khoản Khác"
2. Chọn non-admin account
3. ✅ Expected: Redirect to /student-info.html
4. ✅ Verify: Hiển thị "Student" role
```

#### Test 3: Access Control
```
1. Login as Student
2. Truy cập trực tiếp: http://localhost:8000/admin/dashboard.html
3. ✅ Expected: Alert "Bạn không có quyền truy cập"
4. ✅ Redirect to /login-admin.html
```

#### Test 4: Logout & Re-login
```
1. Admin logged in
2. Click "Đăng Xuất"
3. ✅ Session xóa
4. ✅ Redirect to /index.html
5. Truy cập admin page
6. ✅ Expected: Redirect to login
```

---

## 📱 Ganache Account List

Khi sử dụng Ganache, các account mặc định (từ deterministic seed):

```
Account 0: 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1 (DEFAULT ADMIN)
Account 1: 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0
Account 2: 0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b
Account 3: 0xE11BA2b4D45Eaed5996Cd0823687343734687142
Account 4: 0xd03ea8624C8C5987235048901fB614fDca36cEA0
Account 5: 0xce2CC360A69fAC5E5c1798a3dAa89f29B5f5470a
Account 6: 0xD38dC92c4b16B8a039A8A54b33d82Cbe64076C21
Account 7: 0x1dF62f291b2E969fB4bd591C6A855d3339f65786
Account 8: 0x610Bb1713992d4C1239F91Caf67dA906368e4519
Account 9: 0x855FA758c3d786D7ef155B01D7Ee8D962E58181E
```

**Recommended**: Sử dụng Account 0 (`0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1`) làm Admin

---

## 🔄 Migration từ Hệ Thống Cũ

Nếu bạn đã sử dụng hệ thống xác thực username/password cũ:

1. **Clear localStorage**
   ```javascript
   // Mở DevTools (F12) → Console
   localStorage.clear()
   ```

2. **Update frontend scripts**
   - ✅ auth.js (đã cập nhật)
   - ✅ login-admin.html (đã cập nhật)
   - ✅ web3.js (tương thích)

3. **No smart contract changes needed**
   - Smart contract không thay đổi
   - Xác thực là frontend-only

---

## ❓ Troubleshooting

### Problem: "MetaMask không được tìm thấy"
**Solution**: Cài đặt MetaMask extension từ Chrome Web Store

### Problem: "Kết nối ví thất bại"
**Solution**: 
- Kiểm tra MetaMask extension đã được enable không
- Tải lại trang (F5)
- Kiểm tra console (F12) để xem lỗi chi tiết

### Problem: "Không mở được admin dashboard"
**Solution**:
- Kiểm tra đã đăng nhập bằng admin wallet không
- Clear localStorage và login lại
- Kiểm tra ADMIN_WALLET_ADDRESS trong auth.js

### Problem: "Ganache network không hiển thị"
**Solution**:
- MetaMask sẽ tự động thêm Ganache network
- Hoặc thêm thủ công:
  - Network Name: Ganache Local
  - RPC URL: http://127.0.0.1:7545
  - Chain ID: 1337

---

## 📞 Support

Nếu có bất kỳ vấn đề hoặc câu hỏi, vui lòng:
1. Kiểm tra console (F12) cho lỗi chi tiết
2. Xem file `auth.js` và `login-admin.html` để hiểu luồng
3. Đảm bảo ADMIN_WALLET_ADDRESS được cấu hình đúng

---

**Version**: 1.0  
**Last Updated**: 2026-03-13  
**Compatibility**: Ethereum, MetaMask, Ganache
