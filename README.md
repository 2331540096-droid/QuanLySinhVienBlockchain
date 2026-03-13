# Blockchain Student Academic Management System

## Giới thiệu
Đây là hệ thống quản lý sinh viên, điểm số và bằng cấp dựa trên blockchain. Dự án sử dụng Ethereum (Ganache), smart contract Solidity, giao diện HTML + TailwindCSS, tích hợp MetaMask và Web3.js. Không cần backend truyền thống, mọi thao tác đều thực hiện trực tiếp với smart contract.

## 📚 Tài Liệu & Hướng Dẫn

### 📋 Báo Cáo Đề Án
**👉 [BÁO CÁO ĐỀ ÁN CHI TIẾT - Bấm vào đây](./BAO_CAO_DA_AN.md)**

Báo cáo bao gồm:
- ✅ Kiến trúc hệ thống (diagrams, flowchart)
- ✅ Phân tích chức năng & yêu cầu
- ✅ Thiết kế Smart Contract chi tiết
- ✅ Thiết kế Frontend (các file, functions)
- ✅ Bảo mật & Access Control
- ✅ Performance & Evaluation
- ✅ Hạn chế & Roadmap phát triển
- ✅ Kết luận & khuyến nghị

### 📖 Hướng Dẫn Sử Dụng
**👉 [HƯỚNG DẪN SỬ DỤNG - Bấm vào đây](./HUONG_DAN_SU_DUNG.md)**

Hướng dẫn bao gồm:
- ✅ Yêu cầu hệ thống
- ✅ Cách cài đặt chi tiết (step-by-step)
- ✅ Hướng dẫn sử dụng cho Admin
- ✅ Hướng dẫn sử dụng cho Sinh viên
- ✅ Hướng dẫn xác minh bằng cấp
- ✅ Câu hỏi thường gặp (FAQs)
- ✅ Bảo mật & lưu ý quan trọng

### 📲 Tính Năng Mã QR Chia Sẻ Thông Tin
**👉 [HƯỚNG DẪN MÃ QR - Bấm vào đây](./README_QR_FEATURE.md)**

Tính năng mới cho phép:
- ✅ Admin tạo mã QR cho sinh viên
- ✅ Nhà tuyển dụng quét QR xem thông tin (không cần MetaMask)
- ✅ Chia sẻ link công khai an toàn
- ✅ Tải xuống QR hoặc sao chép link
- ✅ **[Xem tóm tắt thay đổi](./QR_FEATURE_SUMMARY.md)**
- ✅ Bảo mật & lưu ý quan trọng

## Tính năng chính
1. **Quản lý hồ sơ sinh viên**
   - Thêm, cập nhật thông tin sinh viên (ID, tên, ngày sinh, ngành, năm nhập học, địa chỉ ví)
   - Mỗi sinh viên gắn với một địa chỉ ví Ethereum
2. **Quản lý điểm số**
   - Thêm điểm từng môn học, từng học kỳ
   - Xem bảng điểm, bảo vệ tính toàn vẹn bằng hash
3. **Cấp phát bằng cấp**
   - Cấp bằng cho sinh viên (ID bằng, loại bằng, ngày cấp, tổ chức cấp, timestamp blockchain)
   - Bằng cấp không thể sửa sau khi cấp
   - Xác thực bằng cấp công khai
4. **📲 Tạo & Chia Sẻ Mã QR** *(NEW)*
   - Admin tạo mã QR cho sinh viên
   - Nhà tuyển dụng quét QR xem thông tin mà không cần MetaMask
   - Chia sẻ link công khai hoặc tải xuống QR
   - [📚 Chi tiết →](./README_QR_FEATURE.md)

## Công nghệ sử dụng
- Smart Contract: Solidity
- Blockchain: Ganache (Ethereum local)
- Wallet: MetaMask
- Frontend: HTML + TailwindCSS
- Web3 interaction: Web3.js
- Không có backend truyền thống
- Môi trường phát triển: Visual Studio Code

## Cấu trúc dự án
```
project-root
│
├── contracts
│   └── StudentCredential.sol
│
├── migrations
│   └── 1_deploy_contract.js
│
├── frontend
│   ├── index.html
│   ├── verify-degree.html
│   │
│   ├── admin
│   │   ├── dashboard.html
│   │   ├── students.html
│   │   ├── grades.html
│   │   └── degrees.html
│   │
│   └── js
│       ├── web3.js
│       ├── contract.js
│       └── app.js
├── truffle-config.js
└── README.md
```

## Hướng dẫn cài đặt & chạy demo
### 1. Cài đặt môi trường

- Cài đặt [Node.js](https://nodejs.org/)
- Cài đặt [Ganache](https://trufflesuite.com/ganache/)
- Cài đặt [MetaMask](https://metamask.io/) (trình duyệt Chrome/Firefox)
- Cài đặt [Truffle](https://trufflesuite.com/truffle/) bằng lệnh:
   ```
   npm install -g truffle
   ```

### 2. Khởi động Ganache
- Mở Ganache, tạo mạng Ethereum local (mặc định HTTP://127.0.0.1:7545)

### 3. Biên dịch & triển khai smart contract
- Mở terminal tại thư mục dự án
- Chạy lệnh:
   ```
   truffle compile
   truffle migrate --reset
   ```
### 4. Chạy frontend

- Mở terminal tại thư mục frontend
- Chạy lệnh:
   ```
   python -m http.server 8000
   ```
- Truy cập: [http://localhost:8000](http://localhost:8000)

### 5. Kết nối MetaMask
- Thêm mạng Ganache vào MetaMask (HTTP://127.0.0.1:7545)
- Import tài khoản Ganache vào MetaMask bằng private key
- Đảm bảo MetaMask đang kết nối đúng mạng và tài khoản

### 6. Sử dụng hệ thống
- **Admin**: Truy cập các trang quản lý (/admin/students.html, /admin/grades.html, /admin/degrees.html)
- **Sinh viên**: Xem thông tin cá nhân, bảng điểm, bằng cấp
- **Xác thực bằng cấp**: Trang /verify-degree.html cho phép kiểm tra tính hợp lệ của bằng cấp

## Quyền truy cập
- **Admin**: Thêm/cập nhật sinh viên, thêm điểm, cấp bằng
- **Sinh viên**: Xem thông tin cá nhân, điểm, bằng
- **Bên thứ ba**: Xác thực bằng cấp

## Giao diện
- Sử dụng Tailwind CDN, thiết kế hiện đại, responsive, sidebar, card, badge, alert

## Lưu ý
- Mọi thao tác đều thực hiện trực tiếp với smart contract, không có backend truyền thống
- Đảm bảo MetaMask luôn kết nối đúng mạng và tài khoản
- Nếu gặp lỗi, kiểm tra lại kết nối Ganache, MetaMask, và contract đã migrate

## Liên hệ & hỗ trợ
Nếu cần hỗ trợ, hãy liên hệ nhóm phát triển hoặc tham khảo tài liệu Truffle, Ganache, MetaMask, Solidity.

---

**Chúc bạn trải nghiệm hệ thống quản lý sinh viên blockchain thành công!**
# Blockchain Student Management System

A decentralized student academic management system built on Ethereum using Solidity smart contracts, Web3.js, and a modern HTML/TailwindCSS frontend.

## Features

- **Student Profile Management**: Create and update student profiles with blockchain-linked wallet addresses
- **Grade/Transcript Management**: Secure grade recording with immutable transcript hashes
- **Degree & Certificate Issuing**: Issue and verify academic degrees with blockchain timestamps

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Truffle](https://trufflesuite.com/truffle/) (`npm install -g truffle`)
- [Ganache](https://trufflesuite.com/ganache/) (local Ethereum blockchain)
- [MetaMask](https://metamask.io/) browser extension

## Setup Instructions

1. **Clone or download the project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Ganache:**
   - Open Ganache and start a new workspace
   - Note the RPC server (usually http://127.0.0.1:7545)
   - Copy one of the private keys for MetaMask import

4. **Configure MetaMask:**
   - Import an account using a private key from Ganache
   - Add network: http://127.0.0.1:7545 with chain ID 1337

5. **Deploy smart contract:**
   ```bash
   truffle compile
   truffle migrate
   ```

6. **Update contract address:**
   - After migration, note the deployed contract address
   - Update `frontend/js/contract.js` with the actual contract address

7. **Start the frontend server:**
   ```bash
   cd frontend
   python -m http.server 8000
   ```

8. **Access the application:**
   - Open http://localhost:8000 in your browser
   - Connect MetaMask when prompted

## Project Structure

```
project-root/
├── contracts/              # Solidity smart contracts
├── migrations/             # Truffle migration scripts
├── frontend/               # HTML frontend
│   ├── admin/             # Admin pages
│   └── js/                # JavaScript files
├── truffle-config.js      # Truffle configuration
└── README.md              # This file
```

## Usage

### Admin Functions
- Access admin pages at `/admin/`
- Create student profiles
- Add grades
- Issue degrees

### Student Functions
- View personal profile and grades
- Access issued degrees

### Public Verification
- Verify degree authenticity at `/verify-degree.html`

## Smart Contract

The `StudentCredential.sol` contract handles:
- Student profile management
- Grade recording
- Degree issuance and verification
- Role-based access control

## Security Notes

- Only admin can create students, add grades, and issue degrees
- Degrees are immutable once issued (except revocation)
- All data is stored on the blockchain for transparency and immutability

## Development

To modify the smart contract:
1. Edit `contracts/StudentCredential.sol`
2. Run `truffle compile`
3. Run `truffle migrate --reset` to redeploy
4. Update contract address in frontend if changed