/**
 * QR Code Generation Helper
 * Tạo mã QR để chia sẻ thông tin sinh viên
 */

/**
 * Get the actual host URL for QR code link
 */
function getQRCodeURL() {
    const host = window.location.host;
    const protocol = window.location.protocol;
    return `${protocol}//${host}`;
}

/**
 * Generate QR Code for student profile
 * Points to student-view.html
 * @param {number} studentId - Student ID
 * @param {string} studentName - Student Name
 */
async function generateStudentQRCode(studentId, studentName) {
    try {
        // Create the public link - point to student-view.html
        const baseURL = getQRCodeURL();
        const currentPath = window.location.pathname;
        const filePath = currentPath.substring(0, currentPath.lastIndexOf('/')) + '/student-view.html';
        const profileURL = `${baseURL}${filePath}?id=${studentId}`;

        console.log('QR Code URL:', profileURL);

        // Use QR Code API from goQR
        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(profileURL)}`;

        // Create modal to show QR
        showQRModal(qrCodeURL, profileURL, studentId, studentName);

        return qrCodeURL;
    } catch (error) {
        console.error('Error generating QR code:', error);
        alert('❌ Lỗi khi tạo mã QR: ' + error.message);
    }
}

/**
 * Show QR Code in modal dialog
 */
function showQRModal(qrCodeURL, profileURL, studentId, studentName) {
    // Create modal HTML
    const modalHTML = `
        <div id="qrModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-2xl max-w-md w-full">
                <!-- Header -->
                <div class="bg-sky-600 text-white p-6 rounded-t-lg">
                    <h2 class="text-2xl font-bold">Mã QR Sinh Viên</h2>
                    <p class="text-sky-100 text-sm mt-1">${studentName}</p>
                </div>

                <!-- Content -->
                <div class="p-8">
                    <div class="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
                        <img src="${qrCodeURL}" alt="QR Code" class="w-full h-auto" />
                    </div>

                    <!-- Info -->
                    <div class="mb-6">
                        <p class="text-xs uppercase font-semibold text-slate-500 mb-2">Thông Tin Liên Kết</p>
                        <p class="text-sm text-slate-900 font-mono break-all bg-slate-50 p-3 rounded border border-slate-200 mb-2">${profileURL}</p>
                        <p class="text-xs text-slate-500">
                            💡 Nhà tuyển dụng có thể quét mã QR này bằng điện thoại để xem thông tin sinh viên mà không cần đăng nhập.
                        </p>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3">
                        <button 
                            onclick="downloadQRCode('${qrCodeURL}', 'student-${studentId}-qr')"
                            class="flex-1 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 font-semibold text-sm transition"
                        >
                            📥 Tải Xuống
                        </button>
                        <button 
                            onclick="copyToClipboard('${profileURL}'); alert('✅ Đã sao chép link!')"
                            class="flex-1 bg-slate-200 text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-300 font-semibold text-sm transition"
                        >
                            📋 Sao Chép Link
                        </button>
                    </div>
                </div>

                <!-- Close Button -->
                <div class="border-t border-slate-200 p-4 bg-slate-50 rounded-b-lg">
                    <button 
                        onclick="document.getElementById('qrModal').remove()"
                        class="w-full bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 font-semibold text-sm transition"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('qrModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Close modal when clicking outside
    document.getElementById('qrModal').addEventListener('click', (e) => {
        if (e.target.id === 'qrModal') {
            e.target.remove();
        }
    });
}

/**
 * Download QR code image
 */
function downloadQRCode(qrCodeURL, fileName) {
    const link = document.createElement('a');
    link.href = qrCodeURL;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('✅ Đang tải xuống mã QR...');
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Feedback is handled by calling function
    }).catch(err => {
        console.error('Could not copy text:', err);
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}
