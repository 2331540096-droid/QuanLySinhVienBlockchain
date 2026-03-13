// Application logic
let consoleOutput = [];

// Store for recently issued degrees
const RECENT_DEGREES_STORAGE = 'recent_degrees';
const DEGREE_ID_MAPPING_STORAGE = 'degree_id_mapping'; // Map random ID to real contract ID

// Override console.log to capture logs
const originalLog = console.log;
console.log = function(...args) {
    consoleOutput.push('[LOG] ' + args.join(' '));
    originalLog.apply(console, args);
};

const originalError = console.error;
console.error = function(...args) {
    consoleOutput.push('[ERROR] ' + args.join(' '));
    originalError.apply(console, args);
};

// ================================
// ADMIN PAGE PROTECTION
// ================================

/**
 * Protect admin pages - only allow admin wallet to access
 */
function protectAdminPage() {
    // Wait a bit for localStorage to be fully loaded
    setTimeout(() => {
        const session = JSON.parse(localStorage.getItem('user_session') || 'null');
        
        console.log('Protecting admin page...');
        console.log('Session:', session);
        
        if (!session || session.role !== 'admin') {
            console.error('Unauthorized access to admin page');
            alert('❌ Bạn không có quyền truy cập trang này. Vui lòng đăng nhập bằng tài khoản Admin!');
            window.location.href = '../login-admin.html';
            return false;
        }
        
        console.log('✅ Admin authorization verified');
        return true;
    }, 300);
}

/**
 * Logout function - clear session and redirect
 */
function logout() {
    localStorage.removeItem('user_session');
    localStorage.removeItem('user_role');
    localStorage.removeItem('connected_wallet');
    console.log('User logged out');
    window.location.href = '../login-admin.html';
}

/**
 * Auto-reconnect to saved wallet for student (trên trang student-info)
 */
async function autoReconnectStudentWallet(savedWalletAddress) {
    try {
        console.log('RECONNECT: Bắt đầu kết nối lại ví sinh viên:', savedWalletAddress);
        
        if (!initWeb3()) {
            console.log('RECONNECT: Web3 init thất bại');
            return false;
        }

        // Get connected accounts
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });
        
        console.log('RECONNECT: Các ví có sẵn:', accounts);
        
        if (!accounts || accounts.length === 0) {
            console.log('RECONNECT: Không có ví nào được kết nối');
            return false;
        }

        // Find saved wallet in accounts
        const normalizedSavedWallet = savedWalletAddress.toLowerCase();
        const found = accounts.find(acc => acc.toLowerCase() === normalizedSavedWallet);
        
        if (found) {
            userAccount = found;
            console.log('RECONNECT: ✅ Tìm thấy ví đã lưu:', userAccount);
            return true;
        } else {
            console.log('RECONNECT: Ví đã lưu không nằm trong các ví MetaMask hiện tại');
            console.log('RECONNECT: Ví đã lưu:', normalizedSavedWallet);
            console.log('RECONNECT: Các ví hiện tại:', accounts.map(a => a.toLowerCase()));
            return false;
        }
    } catch (error) {
        console.error('RECONNECT: Lỗi:', error);
        return false;
    }
}

/**
 * Auto-connect wallet on page load
 */
async function autoConnectWallet() {
    try {
        console.log('AUTOCONNECT: Bắt đầu kết nối ví...');
        if (initWeb3()) {
            // Get connected accounts
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            });
            
            console.log('AUTOCONNECT: Tài khoản MetaMask:', accounts);
            
            if (accounts && accounts.length > 0) {
                const walletAddress = accounts[0];
                userAccount = walletAddress;
                console.log('AUTOCONNECT: Ví được kết nối:', walletAddress);
                
                // Setup session with wallet address
                const result = loginWithMetaMask(walletAddress);
                console.log('AUTOCONNECT: Kết quả đăng nhập:', result);
                
                // Show greeting message based on role
                if (result.success) {
                    if (result.role === 'admin') {
                        console.log('👋 Xin chào Admin! Chuyển hướng tới dashboard...');
                        // Show greeting on admin pages
                        const greetingEl = document.getElementById('adminGreeting');
                        if (greetingEl) {
                            greetingEl.innerHTML = `<div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                                <p class="font-bold">👋 Xin chào Admin!</p>
                                <p class="text-sm">Ví: ${walletAddress}</p>
                            </div>`;
                        }
                        // Check current page - if on login page, redirect to dashboard
                        const currentPage = window.location.pathname;
                        if (currentPage.includes('login') || currentPage === '/' || currentPage.endsWith('index.html')) {
                            setTimeout(() => {
                                console.log('Chuyển hướng đến dashboard...');
                                window.location.href = 'admin/dashboard.html';
                            }, 1000);
                        }
                    } else {
                        console.log('👋 Xin chào Sinh viên!');
                        const greetingEl = document.getElementById('studentGreeting');
                        if (greetingEl) {
                            greetingEl.innerHTML = `<div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
                                <p class="font-bold">👋 Xin chào Sinh viên!</p>
                                <p class="text-sm">Ví: ${walletAddress}</p>
                            </div>`;
                        }
                    }
                }
            } else {
                console.log('AUTOCONNECT: Không có ví được kết nối');
            }
        }
    } catch (error) {
        console.error('AUTOCONNECT: Lỗi:', error);
    }
}

// Display console in page
function showDebugPanel() {
    let debugPanel = document.getElementById('debugPanel');
    if (!debugPanel) {
        debugPanel = document.createElement('div');
        debugPanel.id = 'debugPanel';
        debugPanel.style.cssText = 'position: fixed; bottom: 10px; right: 10px; width: 400px; height: 300px; background: black; color: lime; font-family: monospace; font-size: 11px; padding: 10px; overflow-y: auto; z-index: 10000; border: 1px solid lime;';
        document.body.appendChild(debugPanel);
    }
    debugPanel.innerHTML = '<strong>Debug Console:</strong><br>' + consoleOutput.slice(-50).join('<br>');
}

setInterval(showDebugPanel, 1000);

// ================================
// Degree ID Generation & Mapping
// ================================

/**
 * Generate a random 8-digit degree ID
 */
function generateRandomDegreeId() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

/**
 * Save mapping between random ID (public) and contract ID (internal)
 */
function saveDegreeIdMapping(randomId, contractId) {
    const mapping = JSON.parse(localStorage.getItem(DEGREE_ID_MAPPING_STORAGE) || '{}');
    mapping[randomId] = contractId.toString();
    localStorage.setItem(DEGREE_ID_MAPPING_STORAGE, JSON.stringify(mapping));
    console.log(`Saved mapping: ${randomId} -> ${contractId}`);
}

/**
 * Get contract ID from random public ID
 */
function getContractIdFromRandomId(randomId) {
    const mapping = JSON.parse(localStorage.getItem(DEGREE_ID_MAPPING_STORAGE) || '{}');
    return mapping[randomId];
}

/**
 * Get random ID from contract ID
 */
function getRandomIdFromContractId(contractId) {
    const mapping = JSON.parse(localStorage.getItem(DEGREE_ID_MAPPING_STORAGE) || '{}');
    for (const [randomId, mappedContractId] of Object.entries(mapping)) {
        if (mappedContractId === contractId.toString()) {
            return randomId;
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');

    // Auto-connect MetaMask on admin pages
    autoConnectWallet();

    // Connect wallet button
    const connectBtn = document.getElementById('connectWallet');
    console.log('Connect button element:', connectBtn);

    if (connectBtn) {
        connectBtn.addEventListener('click', function() {
            console.log('Connect wallet button clicked');
            connectWallet();
        });
        console.log('Event listener attached to connect button');
    } else {
        console.error('Connect wallet button not found!');
    }

    // Load admin address on admin pages
    const adminAddressEl = document.getElementById('adminAddress');
    if (adminAddressEl) {
        console.log('Admin address element found, skipping...');
    }

    // Student management
    const addStudentForm = document.getElementById('addStudentForm');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', addStudent);
    }

    const loadStudentsBtn = document.getElementById('loadStudents');
    if (loadStudentsBtn) {
        loadStudentsBtn.addEventListener('click', loadStudents);
    }

    // Grade management
    const addGradeForm = document.getElementById('addGradeForm');
    if (addGradeForm) {
        addGradeForm.addEventListener('submit', addGrade);
    }

    const viewGradesForm = document.getElementById('viewGradesForm');
    if (viewGradesForm) {
        viewGradesForm.addEventListener('submit', viewGrades);
    }

    // Degree management
    const issueDegreeForm = document.getElementById('issueDegreeForm');
    if (issueDegreeForm) {
        issueDegreeForm.addEventListener('submit', issueDegree);
    }

    const viewDegreesForm = document.getElementById('viewDegreesForm');
    if (viewDegreesForm) {
        viewDegreesForm.addEventListener('submit', viewDegrees);
    }

    // Degree verification
    const verifyForm = document.getElementById('verifyForm');
    if (verifyForm) {
        verifyForm.addEventListener('submit', verifyDegree);
    }
});

async function autoConnectWallet() {
    try {
        if (window.ethereum) {
            console.log('MetaMask detected, requesting connection...');
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Account connected:', accounts[0]);
            
            // Check if user is admin
            try {
                const contract = getContract();
                const admin = await contract.methods.admin().call();
                console.log('Contract admin address:', admin);
                console.log('Current account:', accounts[0]);
                console.log('Is admin?', admin.toLowerCase() === accounts[0].toLowerCase());
            } catch (e) {
                console.error('Error checking admin:', e.message);
            }
        } else {
            console.warn('MetaMask not installed');
        }
    } catch (error) {
        console.warn('User rejected connection:', error.message);
    }
}

async function loadAdminAddress() {
    try {
        const contract = getContract();
        const admin = await contract.methods.admin().call();
        document.getElementById('adminAddress').textContent = admin;
    } catch (error) {
        console.error('Error loading admin address:', error);
        document.getElementById('adminAddress').textContent = 'Error loading';
    }
}

async function addStudent(event) {
    event.preventDefault();
    console.log('addStudent() called');

    // Check if MetaMask is available
    if (!window.ethereum) {
        console.error('MetaMask not detected');
        alert('Vui lòng cài đặt MetaMask!');
        return;
    }

    // Check admin permission
    if (!canAddStudents()) {
        console.log('User is not admin, showing alert');
        alert('Bạn không có quyền thêm sinh viên. Chỉ Admin được phép!');
        return;
    }

    console.log('Admin permission granted, proceeding...');

    const studentId = document.getElementById('studentId').value;
    const fullName = document.getElementById('fullName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const course = document.getElementById('course').value;
    const enrollmentYear = parseInt(document.getElementById('enrollmentYear').value);
    const walletAddress = document.getElementById('walletAddress').value;

    console.log('Form data:', { studentId, fullName, dateOfBirth, course, enrollmentYear, walletAddress });

    try {
        const contract = getContract();
        console.log('Contract obtained:', contract);
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Accounts:', accounts);
        
        if (!accounts || accounts.length === 0) {
            alert('Không có tài khoản MetaMask được phát hiện!');
            return;
        }
        
        const account = accounts[0];
        console.log('Using account:', account);

        console.log('Calling createStudent...');
        await contract.methods.createStudent(studentId, fullName, dateOfBirth, course, enrollmentYear, walletAddress)
            .send({ from: account });

        console.log('Student added successfully');
        alert('Sinh viên đã được thêm thành công!');
        event.target.reset();
    } catch (error) {
        console.error('Lỗi khi thêm sinh viên:', error);
        alert('Lỗi khi thêm sinh viên: ' + error.message);
    }
}

async function loadStudents() {
    try {
        console.log('loadStudents() called');
        const contract = getContract();
        console.log('Contract:', contract);
        const studentsTable = document.getElementById('studentsTable');
        console.log('Students table element:', studentsTable);

        // Get all student IDs from the contract
        console.log('Calling getAllStudentIds...');
        const studentIds = await contract.methods.getAllStudentIds().call();
        console.log('Student IDs retrieved:', studentIds);
        console.log('Number of students:', studentIds.length);
        
        let html = '<table class="w-full table-auto"><thead><tr><th class="px-4 py-2">Mã SV</th><th class="px-4 py-2">Họ tên</th><th class="px-4 py-2">Ngành học</th><th class="px-4 py-2">Địa chỉ ví</th><th class="px-4 py-2">Hành động</th></tr></thead><tbody>';

        // Load each student
        for (let studentId of studentIds) {
            try {
                console.log('Loading student:', studentId);
                const student = await contract.methods.getStudent(studentId).call();
                console.log('Student data:', student);
                if (student.exists) {
                    html += `<tr>
                        <td class="border px-4 py-2">${student.studentId}</td>
                        <td class="border px-4 py-2">${student.fullName}</td>
                        <td class="border px-4 py-2">${student.course}</td>
                        <td class="border px-4 py-2">${student.walletAddress.substring(0, 10)}...</td>
                        <td class="border px-4 py-2">
                            <button 
                                onclick="generateStudentQRCode(${student.studentId}, '${student.fullName}')"
                                class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm font-semibold transition"
                            >
                                📲 Tạo QR
                            </button>
                        </td>
                    </tr>`;
                }
            } catch (e) {
                console.error('Error loading student:', e);
                // Student doesn't exist, continue
            }
        }

        html += '</tbody></table>';
        studentsTable.innerHTML = html;
        console.log('HTML rendered:', html.substring(0, 100) + '...');
        
        if (studentIds.length === 0) {
            studentsTable.innerHTML = '<p class="text-gray-600 mt-4">Chưa có sinh viên nào được thêm.</p>';
            console.log('No students found');
        }
    } catch (error) {
        console.error('Lỗi khi tải danh sách sinh viên:', error);
        console.error('Error stack:', error.stack);
        alert('Lỗi khi tải danh sách sinh viên: ' + error.message);
    }
}

/**
 * Tìm kiếm ví của sinh viên dựa vào MSSV
 */
async function getStudentWallet(studentId) {
    try {
        const contract = getContract();
        console.log('Tìm kiếm ví cho sinh viên:', studentId);
        
        // Gọi function từ smart contract để lấy thông tin sinh viên
        const student = await contract.methods.getStudent(studentId).call();
        
        if (!student || !student.walletAddress) {
            console.error('Không tìm thấy sinh viên với MSSV:', studentId);
            return null;
        }
        
        console.log('Tìm thấy ví sinh viên:', student.walletAddress);
        return student.walletAddress.toLowerCase();
    } catch (error) {
        console.error('Lỗi khi tìm kiếm ví sinh viên:', error);
        return null;
    }
}

async function addGrade(event) {
    event.preventDefault();

    // Check admin permission
    if (!canAddGrades()) {
        alert('Bạn không có quyền thêm điểm. Chỉ Admin được phép!');
        return;
    }

    const studentId = document.getElementById('gradeStudentId').value;
    const subjectName = document.getElementById('subjectName').value;
    const semester = document.getElementById('semester').value;
    const score = parseInt(document.getElementById('score').value);

    // Kiểm tra điểm số
    if (score < 0 || score > 100) {
        alert('Điểm số phải trong khoảng 0-100!');
        return;
    }

    try {
        console.log('Bắt đầu thêm điểm cho sinh viên:', studentId);
        
        // Tìm kiếm ví của sinh viên
        const studentWallet = await getStudentWallet(studentId);
        
        if (!studentWallet) {
            alert('❌ Không tìm thấy sinh viên với MSSV: ' + studentId + '\nVui lòng kiểm tra lại!');
            return;
        }
        
        console.log('Ví sinh viên tìm thấy:', studentWallet);
        
        const contract = getContract();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        console.log('Thêm điểm:', {
            studentId: studentId,
            studentWallet: studentWallet,
            subjectName: subjectName,
            semester: semester,
            score: score
        });

        // Lưu điểm vào smart contract
        await contract.methods.addGrade(studentId, subjectName, semester, score)
            .send({ from: account });

        console.log('Thêm điểm thành công');
        alert('✅ Điểm đã được thêm thành công!\n' +
              'MSSV: ' + studentId + '\n' +
              'Môn: ' + subjectName + '\n' +
              'Điểm: ' + score);
        event.target.reset();
    } catch (error) {
        console.error('Lỗi khi thêm điểm:', error);
        alert('❌ Lỗi khi thêm điểm: ' + error.message);
    }
}

async function viewGrades(event) {
    event.preventDefault();

    const studentId = document.getElementById('viewStudentId').value;
    console.log('viewGrades() called with studentId:', studentId);

    try {
        const contract = getContract();
        console.log('Getting grades for student:', studentId);
        
        // Lấy thông tin sinh viên để hiển thị ví
        let studentInfo = null;
        let studentWallet = 'N/A';
        let studentName = 'N/A';
        
        try {
            studentInfo = await contract.methods.getStudent(studentId).call();
            if (studentInfo) {
                studentWallet = studentInfo.walletAddress;
                studentName = studentInfo.fullName;
                console.log('Student info:', studentInfo);
            }
        } catch (error) {
            console.log('Không thể lấy thông tin sinh viên:', error.message);
        }
        
        const grades = await contract.methods.getStudentGrades(studentId).call();
        console.log('Grades found:', grades);

        const gradesTable = document.getElementById('gradesTable');
        
        if (!grades || grades.length === 0) {
            gradesTable.innerHTML = '<p class="text-gray-600 mt-4">Sinh viên này không có điểm nào.</p>';
            return;
        }

        // Hiển thị thông tin sinh viên
        let html = '';
        html += '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">';
        html += '<p class="text-blue-700"><strong>MSSV:</strong> ' + studentId + '</p>';
        html += '<p class="text-blue-700"><strong>Tên:</strong> ' + studentName + '</p>';
        html += '<p class="text-blue-700"><strong>Ví:</strong> <code class="bg-blue-100 px-2 py-1 rounded">' + studentWallet + '</code></p>';
        html += '</div>';
        
        html += '<table class="w-full table-auto border-collapse"><thead><tr class="bg-gray-200"><th class="border px-4 py-2">Môn học</th><th class="border px-4 py-2">Học kỳ</th><th class="border px-4 py-2">Điểm</th></tr></thead><tbody>';

        grades.forEach(grade => {
            html += `<tr>
                <td class="border px-4 py-2">${grade.subjectName}</td>
                <td class="border px-4 py-2">${grade.semester}</td>
                <td class="border px-4 py-2 text-center font-bold text-green-600">${grade.score}</td>
            </tr>`;
        });

        html += '</tbody></table>';
        gradesTable.innerHTML = html;
    } catch (error) {
        console.error('Lỗi khi tải điểm:', error);
        console.error('Error details:', error.message, error.stack);
        const gradesTable = document.getElementById('gradesTable');
        gradesTable.innerHTML = '<p class="text-red-600 mt-4">Lỗi khi tải điểm: ' + error.message + '</p>';
    }
}

async function issueDegree(event) {
    event.preventDefault();

    // Check admin permission
    if (!canIssueDegrees()) {
        alert('Bạn không có quyền cấp bằng. Chỉ Admin được phép!');
        return;
    }

    const studentId = document.getElementById('degreeStudentId').value;
    const degreeType = document.getElementById('degreeType').value;
    const issuingOrganization = document.getElementById('issuingOrganization').value;

    try {
        console.log('Cấp bằng cho sinh viên:', studentId);
        
        // Tìm ví sinh viên từ MSSV
        const studentWallet = await getStudentWallet(studentId);
        
        if (!studentWallet) {
            alert('❌ Không tìm thấy sinh viên với MSSV: ' + studentId + '\nVui lòng kiểm tra lại!');
            return;
        }
        
        console.log('Ví sinh viên tìm thấy:', studentWallet);
        
        const contract = getContract();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Get nextDegreeId before issuing (this will be the internal contract ID)
        const nextDegreeIdBefore = await contract.methods.nextDegreeId().call();
        console.log('Internal degree ID sẽ được tạo:', nextDegreeIdBefore);

        await contract.methods.issueDegree(studentId, degreeType, issuingOrganization)
            .send({ from: account });

        // Generate random 8-digit public ID
        const randomDegreeId = generateRandomDegreeId();
        const realDegreeId = nextDegreeIdBefore;
        
        // Save mapping
        saveDegreeIdMapping(randomDegreeId, realDegreeId);
        console.log('Generated random ID:', randomDegreeId, 'for contract ID:', realDegreeId);

        // Lưu thông tin bằng theo ví sinh viên
        const degreesByWallet = JSON.parse(localStorage.getItem('degreesByWallet') || '{}');
        if (!degreesByWallet[studentWallet]) {
            degreesByWallet[studentWallet] = [];
        }
        
        const degreeInfo = {
            randomDegreeId: randomDegreeId,
            contractDegreeId: realDegreeId.toString(),
            studentId: studentId,
            studentWallet: studentWallet,
            degreeType: degreeType,
            issuingOrganization: issuingOrganization,
            issuedAt: new Date().toISOString()
        };
        
        degreesByWallet[studentWallet].push(degreeInfo);
        localStorage.setItem('degreesByWallet', JSON.stringify(degreesByWallet));
        console.log('Đã lưu bằng cho ví:', studentWallet, degreeInfo);

        // Save to localStorage for quick reference
        const recentDegrees = JSON.parse(localStorage.getItem(RECENT_DEGREES_STORAGE) || '[]');
        recentDegrees.unshift(degreeInfo);
        // Keep only last 20 degrees
        localStorage.setItem(RECENT_DEGREES_STORAGE, JSON.stringify(recentDegrees.slice(0, 20)));

        // Display success message with random degree ID
        const successMessage = `✅ Bằng đã được cấp thành công!\n\n📋 Thông tin bằng cấp:\n- 🔑 Mã số bằng: ${randomDegreeId}\n- Mã số sinh viên: ${studentId}\n- Ví sinh viên: ${studentWallet}\n- Loại bằng: ${degreeType}\n- Tổ chức: ${issuingOrganization}\n\n💾 Mã bằng đã được lưu lại theo ví sinh viên!`;
        
        alert(successMessage);

        // Display the result below the form
        const resultDiv = document.createElement('div');
        resultDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
        resultDiv.innerHTML = `
            <h4 class="font-bold mb-2">✅ Bằng cấp đã được cấp thành công</h4>
            <p><strong>🔑 Mã số bằng:</strong> <span class="font-bold text-lg text-green-800 font-mono">${randomDegreeId}</span> 
                <button type="button" class="ml-2 bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700" onclick="copyToClipboard('${randomDegreeId}')">📋 Sao chép</button>
            </p>
            <p><strong>Mã số sinh viên:</strong> ${studentId}</p>
            <p><strong>Ví sinh viên:</strong> <code class="bg-green-200 px-2 py-1 rounded text-xs">${studentWallet}</code></p>
            <p><strong>Loại bằng:</strong> ${degreeType}</p>
            <p><strong>Tổ chức cấp:</strong> ${issuingOrganization}</p>
            <p class="mt-2 text-sm italic">💡 Mã bằng đã được lưu lại theo ví sinh viên</p>
        `;

        // Remove previous result if exists
        const formContainer = document.getElementById('issueDegreeForm').parentElement;
        const previousResult = formContainer.querySelector('.bg-green-100');
        if (previousResult) {
            previousResult.remove();
        }

        // Add result after form
        document.getElementById('issueDegreeForm').parentElement.appendChild(resultDiv);

        event.target.reset();
    } catch (error) {
        console.error('Lỗi khi cấp bằng:', error);
        alert('Lỗi khi cấp bằng: ' + error.message);
    }
}

async function revokeDegree(event) {
    event.preventDefault();

    // Check admin permission
    if (!canRevokeDegrees()) {
        alert('Bạn không có quyền thu hồi bằng. Chỉ Admin được phép!');
        return;
    }

    const randomDegreeId = document.getElementById('revokeDegreeId').value;
    
    // Convert random ID to contract ID
    const contractDegreeId = getContractIdFromRandomId(randomDegreeId);
    
    if (!contractDegreeId) {
        alert(`❌ Lỗi: Không tìm thấy bằng với mã số ${randomDegreeId}. Vui lòng kiểm tra lại!`);
        return;
    }

    try {
        const contract = getContract();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        console.log(`Revoking degree: Random ID ${randomDegreeId} -> Contract ID ${contractDegreeId}`);

        await contract.methods.revokeDegree(contractDegreeId)
            .send({ from: account });

        alert(`✅ Bằng số ${randomDegreeId} đã được thu hồi thành công!`);
        event.target.reset();
    } catch (error) {
        console.error('Lỗi khi thu hồi bằng:', error);
        alert('Lỗi khi thu hồi bằng: ' + error.message);
    }
}

async function viewDegrees(event) {
    event.preventDefault();

    const studentId = document.getElementById('viewDegreeStudentId').value;
    console.log('viewDegrees() called with studentId:', studentId);

    try {
        // Lấy thông tin sinh viên để hiển thị ví
        let studentInfo = null;
        let studentWallet = 'N/A';
        let studentName = 'N/A';
        
        try {
            studentInfo = await getStudentWallet(studentId);
            if (studentInfo) {
                studentWallet = studentInfo;
                // Lấy tên sinh viên từ contract
                const contract = getContract();
                const student = await contract.methods.getStudent(studentId).call();
                if (student) {
                    studentName = student.fullName;
                }
                console.log('Student wallet:', studentWallet);
            }
        } catch (error) {
            console.log('Không thể lấy thông tin sinh viên:', error.message);
        }
        
        const contract = getContract();
        console.log('Getting degrees for student:', studentId);
        const degreeIds = await contract.methods.getDegreesByStudent(studentId).call();
        console.log('Degree IDs found:', degreeIds);

        const degreesTable = document.getElementById('degreesTable');
        
        if (!degreeIds || degreeIds.length === 0) {
            let html = '';
            html += '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">';
            html += '<p class="text-blue-700"><strong>MSSV:</strong> ' + studentId + '</p>';
            html += '<p class="text-blue-700"><strong>Tên:</strong> ' + studentName + '</p>';
            html += '<p class="text-blue-700"><strong>Ví:</strong> <code class="bg-blue-100 px-2 py-1 rounded">' + studentWallet + '</code></p>';
            html += '</div>';
            html += '<p class="text-gray-600 mt-4">Sinh viên này không có bằng nào.</p>';
            degreesTable.innerHTML = html;
            return;
        }

        // Hiển thị thông tin sinh viên
        let html = '';
        html += '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">';
        html += '<p class="text-blue-700"><strong>MSSV:</strong> ' + studentId + '</p>';
        html += '<p class="text-blue-700"><strong>Tên:</strong> ' + studentName + '</p>';
        html += '<p class="text-blue-700"><strong>Ví:</strong> <code class="bg-blue-100 px-2 py-1 rounded">' + studentWallet + '</code></p>';
        html += '</div>';
        
        html += '<table class="w-full table-auto border-collapse"><thead><tr class="bg-gray-200"><th class="border px-4 py-2">🔑 Mã bằng</th><th class="border px-4 py-2">Loại bằng</th><th class="border px-4 py-2">Tổ chức</th><th class="border px-4 py-2">Trạng thái</th><th class="border px-4 py-2">Hành động</th></tr></thead><tbody>';

        for (let contractDegreeId of degreeIds) {
            try {
                console.log('Loading degree:', contractDegreeId);
                const result = await contract.methods.verifyDegree(contractDegreeId).call();
                console.log('Degree result:', result);
                
                // Handle both array and object return formats
                const isValid = Array.isArray(result) ? result[0] : result.isValid;
                const degree = Array.isArray(result) ? result[1] : result.degree;
                
                console.log('isValid:', isValid, 'degree:', degree);
                
                // Get random ID from contract ID
                const randomDegreeId = getRandomIdFromContractId(contractDegreeId);
                const displayId = randomDegreeId || contractDegreeId; // Fallback to contract ID if no mapping
                
                const status = degree.revoked ? 'Đã thu hồi' : 'Hợp lệ';
                const statusClass = degree.revoked ? 'text-red-600' : 'text-green-600';

                html += `<tr>
                    <td class="border px-4 py-2"><strong class="text-lg font-mono">${displayId}</strong></td>
                    <td class="border px-4 py-2">${degree.degreeType}</td>
                    <td class="border px-4 py-2">${degree.issuingOrganization}</td>
                    <td class="border px-4 py-2 ${statusClass}">${status}</td>
                    <td class="border px-4 py-2">
                        <button type="button" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600" onclick="copyDegreeId('${displayId}')">📋 Sao chép</button>
                    </td>
                </tr>`;
            } catch (e) {
                console.error('Error loading degree:', contractDegreeId, e);
            }
        }

        html += '</tbody></table>';
        degreesTable.innerHTML = html;
    } catch (error) {
        console.error('Lỗi khi tải bằng:', error);
        console.error('Error details:', error.message, error.stack);
        const degreesTable = document.getElementById('degreesTable');
        degreesTable.innerHTML = '<p class="text-red-600 mt-4">Lỗi khi tải bằng: ' + error.message + '</p>';
    }
}

// Helper function to copy degree ID to clipboard
function copyDegreeId(degreeId) {
    navigator.clipboard.writeText(degreeId).then(() => {
        alert(`✅ Đã sao chép mã bằng: ${degreeId}`);
        document.getElementById('revokeDegreeId').value = degreeId;
        document.getElementById('revokeDegreeId').focus();
    }).catch(err => {
        console.error('Lỗi sao chép:', err);
        alert('Lỗi sao chép mã bằng');
    });
}

async function verifyDegree(event) {
    event.preventDefault();

    const randomDegreeId = document.getElementById('degreeId').value;
    
    // Convert random ID to contract ID
    const contractDegreeId = getContractIdFromRandomId(randomDegreeId);
    
    if (!contractDegreeId) {
        const resultDiv = document.getElementById('verificationResult');
        const resultContent = document.getElementById('resultContent');
        
        resultContent.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <h4 class="font-bold">❌ Bằng không hợp lệ</h4>
                <p>Bằng với mã số <strong>${randomDegreeId}</strong> không tồn tại hoặc chưa được đăng ký trong hệ thống.</p>
            </div>
        `;

        resultDiv.classList.remove('hidden');
        return;
    }

    try {
        const contract = getContract();
        const result = await contract.methods.verifyDegree(contractDegreeId).call();
        
        // Handle both array and object return formats
        const isValid = Array.isArray(result) ? result[0] : result.isValid;
        const degree = Array.isArray(result) ? result[1] : result.degree;

        const resultDiv = document.getElementById('verificationResult');
        const resultContent = document.getElementById('resultContent');

        if (isValid && !degree.revoked) {
            resultContent.innerHTML = `
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <h4 class="font-bold">✅ Bằng hợp lệ</h4>
                    <p><strong>🔑 Mã số bằng:</strong> <span class="font-mono font-bold">${randomDegreeId}</span></p>
                    <p><strong>Mã số sinh viên:</strong> ${degree.studentId}</p>
                    <p><strong>Loại bằng:</strong> ${degree.degreeType}</p>
                    <p><strong>Ngày cấp:</strong> ${new Date(degree.issueDate * 1000).toLocaleDateString('vi-VN')}</p>
                    <p><strong>Tổ chức cấp:</strong> ${degree.issuingOrganization}</p>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <h4 class="font-bold">❌ Bằng không hợp lệ</h4>
                    <p>Bằng số <strong>${randomDegreeId}</strong> đã bị thu hồi hoặc không tồn tại.</p>
                </div>
            `;
        }

        resultDiv.classList.remove('hidden');
    } catch (error) {
        console.error('Lỗi khi xác minh bằng:', error);
        alert('Lỗi khi xác minh bằng: ' + error.message);
    }
}

// ================================
// Helper Functions
// ================================

/**
 * Copy degree ID to clipboard and fill into revoke form
 */
function copyToClipboard(text, fieldId) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`✅ Đã sao chép mã bằng: ${text}`);
        if (fieldId && document.getElementById(fieldId)) {
            document.getElementById(fieldId).value = text;
            document.getElementById(fieldId).focus();
        }
    }).catch(err => {
        console.error('Lỗi sao chép:', err);
        alert('Lỗi sao chép mã bằng. Vui lòng thử lại!');
    });
}

/**
 * Copy degree ID and auto-fill revoke form
 */
function copyDegreeId(degreeId) {
    copyToClipboard(degreeId, 'revokeDegreeId');
}

/**
 * Show recent issued degrees
 */
function showRecentDegrees() {
    const recentDegrees = JSON.parse(localStorage.getItem(RECENT_DEGREES_STORAGE) || '[]');
    
    if (recentDegrees.length === 0) {
        alert('Chưa có mã bằng nào được cấp gần đây');
        return;
    }
    
    let message = '📋 Các bằng cấp vừa được cấp (gần đây):\n\n';
    recentDegrees.forEach((degree, index) => {
        const randomId = degree.randomDegreeId || degree.degreeId; // Support both old and new format
        message += `${index + 1}. 🔑 ${randomId} - SV: ${degree.studentId} - ${degree.degreeType}\n   Ngày: ${degree.issuedAt}\n`;
    });
    
    alert(message);
}