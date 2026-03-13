# 📋 Hướng dẫn Cập nhật Smart Contract - Phân Quyền Sinh Viên

## 🔄 Thay đổi được thực hiện

Smart Contract `StudentCredential.sol` đã được cập nhật để hỗ trợ **phân quyền sinh viên**. Giờ sinh viên chỉ có thể xem thông tin của ví họ sở hữu, không được xem thông tin ví khác.

### Các thay đổi chính:

#### 1. **Thêm Mapping Wallet → Student ID**
```solidity
mapping(address => uint256) public walletToStudentId;
```
- Lưu trữ mối liên hệ giữa địa chỉ ví và mã sinh viên

#### 2. **Cập nhật hàm `createStudent`**
- Tự động thêm mapping khi tạo sinh viên
- Kiểm tra wallet address hợp lệ

#### 3. **Thêm 4 hàm mới cho sinh viên:**

##### a. `getStudentIdByWallet(address walletAddress)`
```javascript
// Lấy mã sinh viên từ ví
const studentId = await contract.methods.getStudentIdByWallet(userAccount).call();
```

##### b. `getStudentByWallet(address walletAddress)`
```javascript
// Lấy toàn bộ thông tin sinh viên từ ví của chính mình
const student = await contract.methods.getStudentByWallet(userAccount).call();
```

##### c. `getStudentGradesByWallet(address walletAddress)`
```javascript
// Lấy điểm số sinh viên từ ví
const grades = await contract.methods.getStudentGradesByWallet(userAccount).call();
```

##### d. `getStudentDegreesByWallet(address walletAddress)`
```javascript
// Lấy bằng cấp sinh viên từ ví
const degreeIds = await contract.methods.getStudentDegreesByWallet(userAccount).call();
```

---

## 🚀 Cách Cập nhật Contract trên Blockchain

### Bước 1: Compile lại Smart Contract
```bash
cd path/to/project
truffle compile
```
Điều này sẽ tạo file `build/contracts/StudentCredential.json` mới với ABI cập nhật.

### Bước 2: Deploy Contract Mới
```bash
truffle migrate --reset
```
Lệnh này sẽ:
- Xóa contract cũ
- Deploy contract mới
- In ra địa chỉ contract mới

### Bước 3: Cập nhật CONTRACT_ADDRESS trong `frontend/js/contract.js`
```javascript
// Cấy địa chỉ mới từ output của `truffle migrate`
const CONTRACT_ADDRESS = '0x...' // (địa chỉ mới)
```

### Bước 4: Cập nhật ABI trong `frontend/js/contract.js`
- Copy toàn bộ ABI từ file `build/contracts/StudentCredential.json`
- Dán vào biến `CONTRACT_ABI` trong `contract.js`

---

## 🔒 Cách Hoạt Động - Phân Quyền

### Trước đây:
```
Sinh viên A (ví 0x111) → Có thể tra cứu MSSV của sinh viên B
```

### Sau khi cập nhật:
```
Sinh viên A (ví 0x111) → Chỉ có thể tra cứu thông tin của ví 0x111
Sinh viên A (ví 0x111) → Không được xem thông tin ví 0x222 (sinh viên B)
```

### Logic kiểm tra:
```javascript
// Kiểm tra xem ví hiện tại có khớp với ví sinh viên không
if (studentWallet !== userAccount) {
    // Từ chối truy cập
    alert('Bạn chỉ được xem thông tin của chính mình!');
    return;
}
// Cho phép xem thông tin
```

---

## 📝 Ví dụ Sử Dụng API Mới

### Sinh viên xem thông tin của chính mình:
```javascript
// Lấy ID sinh viên từ ví hiện tại
const studentId = await contract.methods.getStudentIdByWallet(userAccount).call();

// Lấy thông tin sinh viên
const student = await contract.methods.getStudentByWallet(userAccount).call();
console.log(student.fullName); // Tên sinh viên
console.log(student.dateOfBirth); // Ngày sinh
console.log(student.course); // Khóa học

// Lấy điểm số
const grades = await contract.methods.getStudentGradesByWallet(userAccount).call();

// Lấy bằng cấp
const degreeIds = await contract.methods.getStudentDegreesByWallet(userAccount).call();
```

---

## ✅ Danh sách Kiểm Tra

- [ ] Compile contract: `truffle compile`
- [ ] Deploy mới: `truffle migrate --reset`
- [ ] Copy địa chỉ contract mới
- [ ] Cập nhật CONTRACT_ADDRESS trong contract.js
- [ ] Copy ABI mới vào contract.js
- [ ] Test: Đăng nhập ví sinh viên A
- [ ] Test: Cố gắng tra cứu MSSV của sinh viên B
- [ ] Kết quả: Nhận được thông báo lỗi "Bạn chỉ được xem thông tin của chính mình!"

---

## 🐛 Khắc Phục Sự Cố

### "Student not found for this wallet"
- Ý nghĩa: Sinh viên chưa được tạo trong hệ thống
- Cách sửa: Admin cần thêm sinh viên vào hệ thống trước

### "Ví hiện tại không khớp với ví sinh viên"
- Cách sửa: Sinh viên cần chuyển sang ví chính xác trong MetaMask

### Các hàm mới không được tìm thấy
- Nguyên nhân: ABI chưa được cập nhật
- Cách sửa: Kiểm tra lại file `contract.js` và ABI

---

## 📚 Tài liệu Liên Quan

- Smart Contract: `contracts/StudentCredential.sol`
- Frontend: 
  - `frontend/student-info.html`
  - `frontend/js/contract.js`
  - `frontend/js/auth.js`

---

**Ngày cập nhật:** 13/03/2026  
**Phiên bản:** 2.0
